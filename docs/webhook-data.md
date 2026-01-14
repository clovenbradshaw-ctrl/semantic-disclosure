# Webhook Data Documentation

This document describes the data structure returned by the n8n "Client Summary" webhook.

## Overview

The webhook fetches data from **4 sources** and returns a flat array of records, each labeled with its source table.

## Data Sources

| Source | Type | Table/Calendar ID | Lookup Method |
|--------|------|-------------------|---------------|
| **Client Info** | Airtable | `tbl0uHmtLkGyDnSP9` | Direct record by ID |
| **Case Master View** | Airtable | `tblgynOzESGvAXAsK` | Filter by `Client_ID_Airtable` |
| **Applications** | Airtable | `tbl6XtHs9g5iwd7qi` | Filter by `Case Master` (from Case Master View) |
| **Events** | Google Calendar | 2 calendars (see below) | Query by client record ID |

### Google Calendar Sources

1. **Hearings-Interviews**: `c_2117d3d5346290d1f9769d5d8a60b1a82da31ecb4080f981cfb0b9f25590a298@group.calendar.google.com`
2. **RK Lacy Law Events**: `c_ae631b2171ddcf4f882cd2e6d11a39e19480876fac7794206fca70e734ab9d1f@group.calendar.google.com`

## Data Flow

```
Webhook Request (with record ID)
       │
       ▼
┌─────────────────────────────────┐
│  Get Client Info (by ID)        │
└─────────────────────────────────┘
       │
       ├────────────────┬────────────────┬─────────────────┐
       ▼                ▼                ▼                 ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│ Case Master │  │ Calendar 1  │  │ Calendar 2  │  │             │
│ View        │  │ (Hearings)  │  │ (Events)    │  │             │
└─────────────┘  └─────────────┘  └─────────────┘  │             │
       │                │                │         │             │
       │                └────────────────┴─────────┘             │
       ▼                                                         │
┌─────────────┐                                                  │
│Applications │                                                  │
└─────────────┘                                                  │
       │                                                         │
       └─────────────────────────────────────────────────────────┘
                                    │
                                    ▼
                     ┌──────────────────────────────┐
                     │  Label and Filter Data       │
                     │  (adds _sourceTable, filters │
                     │   empty fields)              │
                     └──────────────────────────────┘
                                    │
                                    ▼
                          Webhook Response
```

## Response Format

The webhook returns a **flat array** of JSON objects. Each object includes:

- `_sourceTable`: String identifying the data source
- All non-empty fields from the source record

### Example Response

```json
[
  {
    "_sourceTable": "Client Info",
    "id": "recCLIENT123",
    "Client Name": "Rodriguez Garcia, Maria Elena",
    "First Name": ["Maria"],
    "Family Name": ["Rodriguez Garcia"],
    "A#": ["234-567-890"],
    "DOB": ["1995-03-22"],
    "Country": ["Guatemala"],
    "Phone Number": ["(615) 555-1234"]
  },
  {
    "_sourceTable": "Case Master View",
    "id": "recCASE001",
    "Description": "SIJ - Davidson County (0)",
    "Relief Sought": ["SIJ"],
    "Hearing Date/Time": ["2025-02-15T09:00:00.000Z"],
    "Court/Office": ["Memphis Immigration Court"],
    "SIJ Case Status": "Pending Custody Order"
  },
  {
    "_sourceTable": "Events",
    "id": "evt001",
    "summary": "Individual Hearing - Immigration Court",
    "start": { "dateTime": "2025-02-15T09:00:00-06:00" },
    "end": { "dateTime": "2025-02-15T11:00:00-06:00" },
    "location": "Memphis Immigration Court"
  },
  {
    "_sourceTable": "Applications",
    "id": "recAPP001",
    "Application Type": "I-360",
    "Status": "Pending"
  }
]
```

### `_sourceTable` Values

| Value | Description |
|-------|-------------|
| `"Client Info"` | Base client record from Airtable |
| `"Case Master View"` | Case records linked to this client |
| `"Events"` | Google Calendar events from either calendar |
| `"Applications"` | Application records linked to cases |

## Field Filtering

The webhook automatically filters out fields with:

- `null` values
- `undefined` values
- Empty strings (`""`)
- Empty arrays (`[]`)
- Empty objects (`{}`)

This keeps the response payload minimal and focused on meaningful data.

## Airtable Field Format Notes

### Array-Wrapped Values

Many Airtable fields come wrapped in arrays, even for single values:

```json
{
  "First Name": ["Maria"],           // Array with single value
  "Country": ["Guatemala"],          // Array with single value
  "Case Tags": ["SIJ", "Priority"]   // Array with multiple values
}
```

### Button/Link Fields

Button fields from Airtable come as objects:

```json
{
  "box link": { "label": "Box", "url": "https://app.box.com/..." },
  "AMINO": { "label": "AMINO", "url": "https://rklacylaw.softr.app/..." }
}
```

### Error Values

Some formula fields may contain error values that should be filtered:

```json
{
  "SIJ Visa Availability": { "specialValue": "NaN" },
  "Appeal Deadline": { "error": "#ERROR" }
}
```

## Google Calendar Event Format

Events follow the Google Calendar API format:

```json
{
  "_sourceTable": "Events",
  "id": "evt001",
  "summary": "Event Title",
  "start": {
    "dateTime": "2025-02-15T09:00:00-06:00"
  },
  "end": {
    "dateTime": "2025-02-15T11:00:00-06:00"
  },
  "location": "Location string",
  "description": "Event description",
  "htmlLink": "https://calendar.google.com/calendar/event?eid=...",
  "attendees": [
    {
      "email": "user@example.com",
      "displayName": "User Name",
      "responseStatus": "accepted"
    }
  ]
}
```

### All-Day Events

All-day events use `date` instead of `dateTime`:

```json
{
  "start": { "date": "2025-03-01" },
  "end": { "date": "2025-03-02" }
}
```

## n8n Workflow Reference

**Workflow Name**: Client Summary
**Workflow ID**: `jstKXUSVFd3o8eOh`
**Webhook Path**: `c68fda2a-9302-4efb-930b-7063b85ef595`

### Key Nodes

1. **Webhook** - Entry point, receives `recordId` parameter
2. **Get a record1** - Fetches Client Info by ID
3. **Search records3** - Finds Case Master View records by `Client_ID_Airtable`
4. **Search records5** - Finds Applications by `Case Master` (linked from Case Master View)
5. **Get many events / Get many events1** - Fetches from both Google Calendars
6. **Label and Filter Data** - JavaScript node that combines and labels all data
7. **Respond to Webhook1** - Returns the combined array

## Usage in Widget

The widget should handle this flat array format by:

1. Grouping records by `_sourceTable`
2. Unwrapping array values for display
3. Filtering out error/NaN values
4. Rendering appropriate UI for each source type

### Example Client-Side Processing

```javascript
function processWebhookResponse(data) {
  const grouped = {
    clientInfo: null,
    cases: [],
    events: [],
    applications: []
  };

  for (const record of data) {
    switch (record._sourceTable) {
      case 'Client Info':
        grouped.clientInfo = record;
        break;
      case 'Case Master View':
        grouped.cases.push(record);
        break;
      case 'Events':
        grouped.events.push(record);
        break;
      case 'Applications':
        grouped.applications.push(record);
        break;
    }
  }

  return grouped;
}
```

## JSON Schemas

Two JSON Schema files are available for development and validation:

### Airtable Export Schema

**File:** [`airtable-export-schema.json`](./airtable-export-schema.json)

Validates the webhook response data structure. Key features:

- **Separate subschemas** for each source table (`clientInfoRecord`, `caseMasterViewRecord`, `applicationRecord`, `eventRecord`)
- **Discriminated union** using `oneOf` with `_sourceTable` as the discriminator
- **Reusable definitions** for common patterns:
  - `valueOrError` - Formula fields that may contain `{ specialValue: "NaN" }` or `{ error: "#ERROR" }`
  - `linkObject` - Button/link fields with `label` and `url`
  - `personObject` - Collaborator fields with `id`, `email`, and `name`
  - `attachmentObject` - File attachment metadata
  - `dateTimeObject` - Google Calendar date/time format
- **Explicit nullable fields** using `"type": ["string", "null"]` syntax
- **Extensible** with `additionalProperties: true` to allow new fields without breaking validation

### n8n Workflow Schema

**File:** [`n8n-workflow-schema.json`](./n8n-workflow-schema.json)

Validates n8n workflow JSON exports. Key features:

- **Node type discrimination** using `oneOf` for specific node types:
  - `webhookNode` - Webhook trigger configuration
  - `codeNode` - JavaScript/Python code execution
  - `airtableNode` - Airtable CRUD operations
  - `googleCalendarNode` - Google Calendar operations
  - `respondToWebhookNode` - Webhook response configuration
  - `genericNode` - Fallback for other node types
- **Connection validation** ensuring proper node linking
- **Resource locator objects** for dynamic field selections
- **Credential reference validation**

### Using the Schemas

```javascript
// Validate webhook response
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import airtableSchema from './docs/airtable-export-schema.json';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const validate = ajv.compile(airtableSchema);

const webhookData = await fetchWebhookData();
if (!validate(webhookData)) {
  console.error('Validation errors:', validate.errors);
}
```

### Schema Design Principles

1. **DRY (Don't Repeat Yourself)** - Common patterns extracted to `definitions`
2. **Explicit nullability** - Fields that can be `null` are explicitly typed
3. **Discriminated unions** - `_sourceTable` distinguishes record types
4. **Extensibility** - `additionalProperties: true` allows schema evolution
5. **Self-documenting** - Descriptions on all definitions and key properties

## Version History

- **2025-01-14**: Added JSON Schema files for webhook response and n8n workflow validation
- **2025-01-14**: Initial documentation based on n8n workflow `jstKXUSVFd3o8eOh`
