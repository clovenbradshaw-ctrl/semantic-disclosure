# Client At-a-Glance Widget

A dynamic, key-agnostic client summary widget for Softr that displays Airtable data with semantic intelligence and full data provenance.

## Features

- **Three-tier display system**: Semantic narrative → Formatted labels → Raw triplets
- **No data loss**: Every non-empty field is displayed somewhere
- **Key-dynamic**: Adapts to field changes without code modifications  
- **Provenance tracking**: Every value traceable to source record
- **Dual view modes**: Structured accordion view + Natural language narrative
- **Multi-case support**: Handles clients with multiple Case Master View records

## File Structure

```
client-glance/
├── config.js       # Definition layer (edit when fields change)
├── widget.html     # Main widget (rarely needs editing)
├── mock-data.js    # Sample data for testing
└── README.md       # This file
```

## Quick Start

### 1. Test Locally

Open `widget.html` in a browser with mock data:

```html
<!-- In widget.html, add before closing </body> -->
<script src="mock-data.js"></script>
```

Or visit: `widget.html?recordId=test123`

### 2. Deploy to GitHub Pages

1. Push to GitHub repository
2. Enable GitHub Pages (Settings → Pages → Source: main branch)
3. Access at: `https://yourusername.github.io/client-glance/widget.html`

### 3. Embed in Softr

Add a Custom Code block with an iframe:

```html
<iframe 
  src="https://yourusername.github.io/client-glance/widget.html?recordId={{record_id}}"
  width="100%" 
  height="600" 
  frameborder="0">
</iframe>
```

Or embed directly by copying widget.html content into a Custom Code block.

### 4. Configure Webhook

In `widget.html`, replace the placeholder:

```javascript
const WEBHOOK_URL = 'https://your-n8n-instance.com/webhook/client-glance';
```

---

## Webhook Contract

The widget expects the webhook to return JSON in this format:

### Request

```http
GET /webhook/client-glance?recordId=recXXXXXXXXX
Accept: application/json
```

### Response

```json
{
  "clientInfo": {
    "recordId": "recCLIENT123",
    "fields": {
      "Client Name": "Maria Rodriguez",
      "A#": "234-567-890",
      "DOB": "1995-03-22",
      "Country": "Guatemala",
      "Phone Number": "6155551234",
      ...
    }
  },
  "cases": [
    {
      "recordId": "recCASE001",
      "caseIdentifier": "SIJ - Davidson County",
      "fields": {
        "Hearing Date/Time": "2025-02-15T09:00:00",
        "Court/Office": "Memphis Immigration Court",
        "SIJ Case Status": "Pending Custody Order",
        ...
      }
    },
    {
      "recordId": "recCASE002",
      "caseIdentifier": "USCIS - I-360",
      "fields": {
        "USCIS Receipt Date": "2024-11-20",
        "USCIS Receipt Number": "SRC2411234567",
        ...
      }
    }
  ]
}
```

### Field Rules

- **Include all non-empty fields** from both Client Info and Case Master View
- **`caseIdentifier`**: Human-readable label for each case (e.g., "SIJ - Davidson County")
- **Dates**: ISO 8601 format (`2025-02-15` or `2025-02-15T09:00:00`)
- **Arrays**: Will be joined with commas
- **Objects**: Will be JSON stringified

### n8n Webhook Example

```javascript
// In n8n Function node after Airtable queries

const clientRecord = $input.first().json;
const caseRecords = $input.all().slice(1).map(item => item.json);

return {
  clientInfo: {
    recordId: clientRecord.id,
    fields: clientRecord.fields
  },
  cases: caseRecords.map(rec => ({
    recordId: rec.id,
    caseIdentifier: rec.fields['Case Tags'] || rec.fields['Relief Sought'] || `Case ${rec.id.slice(-4)}`,
    fields: rec.fields
  }))
};
```

---

## Maintenance Guide

### When a Field is Renamed

1. Open `config.js`
2. Find the old field name in `SEMANTIC_ROLES`
3. Change the key to the new field name

```javascript
// Before
"Hearing Date/Time": { ... }

// After  
"Next Court Date": { ... }
```

### When a Field is Added

**Option A: Add to `SEMANTIC_ROLES` (Tier 1 treatment)**

```javascript
SEMANTIC_ROLES: {
  // ... existing fields ...
  
  "New Field Name": {
    role: "new_field_role",           // Unique identifier
    group: "Court",                    // Which accordion group
    template: "hearing on {value:date}",  // How to narrate it
    dataType: "date",                  // For formatting
    priority: 5,                       // Sort order within group
    narrativePosition: "temporal"      // Optional: for sentence composition
  }
}
```

**Option B: Let pattern matching handle it (Tier 2)**

If the field name contains keywords matching `FIELD_GROUP_PATTERNS`, it will auto-categorize. New fields with "hearing", "court", "date" etc. will land in appropriate groups.

**Option C: Do nothing (Tier 3)**

Unknown fields appear in "Uncategorized" with full triplet display: `[Source] → Field Name → Value`

### When a New Case Type is Added

Add patterns to `FIELD_GROUP_PATTERNS`:

```javascript
FIELD_GROUP_PATTERNS: [
  // ... existing patterns ...
  { group: "NewCaseType", pattern: /newtype|specific|keywords/i }
]
```

Add to `GROUP_ORDER` for display ordering:

```javascript
GROUP_ORDER: [
  "Identity",
  "Court",
  "NewCaseType",  // Add here
  // ... rest
]
```

### Template Syntax

| Syntax | Effect |
|--------|--------|
| `{value}` | Raw value |
| `{value:date}` | Formatted date (Mar 22, 2025) |
| `{value:datetime}` | Formatted datetime (Mar 22, 2025, 9:00 AM) |
| `{value:lowercase}` | Lowercase value |
| `{value:phone}` | Formatted phone ((615) 555-1234) |

### Narrative Composition

Fields with `narrativePosition` participate in sentence building:

- `temporal`: Upcoming events/deadlines → "has a hearing on..."
- `spatial`: Locations → "in Memphis Immigration Court"
- `status`: Case statuses → "SIJ pending custody order"

---

## Tier System Explained

| Tier | Condition | Display | Example |
|------|-----------|---------|---------|
| **1** | Field in `SEMANTIC_ROLES` | Natural sentence fragment | "hearing on Feb 15, 2025" |
| **2** | Field matches `FIELD_GROUP_PATTERNS` or has inferable data type | Formatted label: value | Hearing Date: Feb 15, 2025 |
| **3** | No match | Raw triplet | [Case #1] → Unknown_Field → "value" |

**Key principle**: Tier determines presentation, not visibility. All data appears somewhere.

---

## Customization

### Change Appearance

Edit CSS variables in `widget.html`:

```css
:root {
  --bg-primary: #fafaf9;
  --accent-blue: #0369a1;
  --font-sans: 'IBM Plex Sans', sans-serif;
  /* ... */
}
```

### Change Default Expanded Groups

In `widget.html`, modify:

```javascript
Renderer.state.expandedGroups.add('Court');
Renderer.state.expandedGroups.add('SIJ');
Renderer.state.expandedGroups.add('USCIS');
```

### Hide More Internal Fields

Add to `DISPLAY.hiddenFields` in `config.js`:

```javascript
hiddenFields: [
  "Record ID",
  /^Internal_/,      // Regex: anything starting with Internal_
  "Specific Field",  // Exact match
]
```

### Change Date Format

Edit `DISPLAY` in `config.js`:

```javascript
DISPLAY: {
  dateFormat: { year: 'numeric', month: 'long', day: 'numeric' },
  // Results in: "February 15, 2025" instead of "Feb 15, 2025"
}
```

---

## Troubleshooting

### Widget shows "No Record ID"

- Ensure URL has `?recordId=recXXXXXX`
- In Softr, map the record ID to the URL parameter

### Widget shows "Error Loading Data"

- Check browser console for details
- Verify webhook URL is correct and accessible
- Check webhook returns valid JSON

### Fields appearing in wrong group

- Add explicit mapping to `SEMANTIC_ROLES` in `config.js`
- Or adjust regex in `FIELD_GROUP_PATTERNS`

### Dates showing wrong format

- Ensure source data is ISO 8601 format
- Check `dataType: "date"` is set in `SEMANTIC_ROLES`

### New field not showing

- Verify it has a non-empty value
- Check it's not matching a `hiddenFields` pattern

---

## Version History

- **1.0.0** - Initial release with three-tier system, dual views, provenance tracking

---

## License

MIT - Use freely, attribution appreciated.
