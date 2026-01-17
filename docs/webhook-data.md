# Webhook Data Documentation

This document describes the data structure returned by the n8n "Client Summary" webhook.

## Overview

The webhook fetches data from **6 sources** and returns a pre-grouped master record with separate buckets for each data type.

## Data Sources

| Source | Type | Table/Calendar ID | Bucket |
|--------|------|-------------------|--------|
| **Client Info** | Airtable | `tbl0uHmtLkGyDnSP9` | `client` |
| **Case Master View** | Airtable | `tblgynOzESGvAXAsK` | `cases` |
| **Applications** | Airtable | `tbl6XtHs9g5iwd7qi` | `applications` |
| **Hearings-Interviews** | Google Calendar | `c_2117d3d5...` | `hearings` |
| **RK Lacy Law Events** | Google Calendar | `c_ae631b21...` | `events` |
| **Case & Event Notes** | Xano API | HTTP Request | `caseNotes` |

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
│ Case Master │  │ Hearings    │  │ Events      │  │             │
│ View        │  │ Calendar    │  │ Calendar    │  │             │
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
                    │  (groups by source,          │
                    │   normalizes calendar data)  │
                    └──────────────────────────────┘
                                   │
                                   ▼
                         Master Record Response
```

## Response Format (6-Bucket Master Record)

The webhook returns a **single master record** with data pre-grouped into 6 buckets:

```json
{
  "_meta": {
    "generatedAt": "2026-01-14T12:00:00.000Z",
    "recordCounts": {
      "clientInfo": 1,
      "cases": 3,
      "applications": 2,
      "hearings": 2,
      "events": 3,
      "caseNotes": 5,
      "unknown": 0
    }
  },
  "client": { ... },
  "cases": [ ... ],
  "applications": [ ... ],
  "hearings": [ ... ],
  "events": [ ... ],
  "caseNotes": [ ... ]
}
```

### Bucket Structure

| Bucket | Type | Description |
|--------|------|-------------|
| `_meta` | Object | Metadata including generation time and record counts |
| `client` | Object | Single client info record |
| `cases` | Array | Case Master View records |
| `applications` | Array | Application records with `_parentCaseId` links |
| `hearings` | Array | Normalized calendar events from Hearings-Interviews |
| `events` | Array | Normalized calendar events from RK Lacy Law Events |
| `caseNotes` | Array | Case and event notes from Xano API |

## Client Bucket

Single object with client information:

```json
{
  "_recordId": "recCLIENT123",
  "id": "recCLIENT123",
  "Client Name": "Rodriguez Garcia, Maria Elena",
  "First Name": "Maria",
  "Last Name": "Rodriguez Garcia",
  "A#": "234-567-890",
  "DOB": "1995-03-22",
  "Country of Origin": "Guatemala",
  "Phone": "(615) 555-1234",
  "Email": "maria.rodriguez@email.com",
  "Address": "123 Main Street, Nashville, TN 37203",
  "Emergency Contact": "Jose Rodriguez - (615) 555-5678"
}
```

### Key Client Fields

| Field | Type | Description |
|-------|------|-------------|
| `_recordId` | String | Airtable record ID (provenance) |
| `Client Name` | String | Full display name |
| `First Name` | String | First name |
| `Last Name` | String | Family/last name |
| `A#` | String | Alien number |
| `DOB` | String (date) | Date of birth |
| `Country of Origin` | String | Country of origin |
| `Phone` | String | Phone number |
| `Email` | String | Email address |

## Cases Bucket

Array of case records from Case Master View:

```json
{
  "_recordId": "recCASE001",
  "id": "recCASE001",
  "Client_ID_Airtable": "recCLIENT123",
  "Matter Type": "SIJ - Davidson County",
  "Case Status": "Active",
  "Court": "Memphis Immigration Court",
  "Judge": "Hon. Patricia Williams",
  "Next Hearing": "2025-02-15T09:00:00.000Z",
  "Filing Deadline": "2025-02-01",
  "Case Number": "A234-567-890",
  "SIJ Case Status": "Pending Custody Order",
  "SIJ County": "Davidson"
}
```

### Key Case Fields

| Field | Type | Description |
|-------|------|-------------|
| `_recordId` | String | Airtable record ID (provenance) |
| `Client_ID_Airtable` | String | Link to client record |
| `Matter Type` | String | Case type description |
| `Case Status` | String | Current status |
| `Court` | String | Court name |
| `Judge` | String | Assigned judge |
| `Next Hearing` | String (datetime) | Next hearing date/time |

## Applications Bucket

Array of USCIS applications with parent case links:

```json
{
  "_recordId": "recAPP001",
  "_parentCaseId": "recCASE002",
  "id": "recAPP001",
  "Case Master": ["recCASE002"],
  "Application Type": "I-360",
  "Form Number": "I-360",
  "Filing Date": "2024-11-15",
  "Receipt Number": "SRC2411234567",
  "Status": "Pending",
  "RFE Date": "2025-02-01",
  "RFE Response Due": "2025-03-01",
  "Biometrics Date": "2024-12-05"
}
```

### Key Application Fields

| Field | Type | Description |
|-------|------|-------------|
| `_recordId` | String | Airtable record ID (provenance) |
| `_parentCaseId` | String | Link to parent case (extracted from Case Master) |
| `Application Type` | String | Application type (e.g., I-360, I-765) |
| `Form Number` | String | USCIS form number |
| `Receipt Number` | String | USCIS receipt number |
| `Status` | String | Application status |
| `Filing Date` | String (date) | Date filed |

## Hearings Bucket

Array of normalized calendar events from Hearings-Interviews calendar:

```json
{
  "_id": "evt001",
  "_calendarType": "hearing",
  "title": "Individual Hearing - Immigration Court",
  "description": "Individual hearing for Maria Rodriguez",
  "location": "Memphis Immigration Court, 80 Monroe Ave, Memphis, TN 38103",
  "startDateTime": "2025-02-15T09:00:00-06:00",
  "endDateTime": "2025-02-15T11:00:00-06:00",
  "isAllDay": false,
  "htmlLink": "https://calendar.google.com/event?eid=evt001",
  "meetLink": null,
  "status": "confirmed",
  "attendees": [
    {
      "email": "attorney@lawfirm.com",
      "name": "Sarah Johnson",
      "responseStatus": "accepted"
    }
  ],
  "created": "2024-12-01T10:00:00.000Z",
  "updated": "2024-12-01T10:00:00.000Z"
}
```

## Events Bucket

Array of normalized calendar events from RK Lacy Law Events calendar:

```json
{
  "_id": "evt003",
  "_calendarType": "general",
  "title": "Biometrics Appointment - USCIS",
  "description": "Biometrics appointment for I-360 application.",
  "location": "USCIS Nashville Field Office",
  "startDateTime": "2025-02-05T10:30:00-06:00",
  "endDateTime": "2025-02-05T11:00:00-06:00",
  "isAllDay": false,
  "htmlLink": "https://calendar.google.com/event?eid=evt003",
  "status": "confirmed",
  "attendees": []
}
```

### Normalized Calendar Fields

| Field | Type | Description |
|-------|------|-------------|
| `_id` | String | Google Calendar event ID (provenance) |
| `_calendarType` | String | `"hearing"` or `"general"` |
| `title` | String | Event title (from `summary`) |
| `description` | String | Event description |
| `location` | String | Event location |
| `startDateTime` | String (datetime) | Start date/time |
| `endDateTime` | String (datetime) | End date/time |
| `isAllDay` | Boolean | Whether event is all-day |
| `htmlLink` | String (URL) | Link to Google Calendar event |
| `meetLink` | String (URL) | Google Meet link if available |
| `status` | String | Event status (confirmed, tentative, cancelled) |
| `attendees` | Array | List of attendees with email, name, responseStatus |

### All-Day Events

All-day events have `isAllDay: true` and date-only strings in startDateTime/endDateTime:

```json
{
  "_id": "evt004",
  "_calendarType": "general",
  "title": "RFE Response Deadline",
  "startDateTime": "2025-03-01",
  "endDateTime": "2025-03-02",
  "isAllDay": true
}
```

## Case Notes Bucket

Array of case and event notes from Xano API:

```json
{
  "id": 12345,
  "Activity": "Phone Call",
  "Type": "Call",
  "Date": "2025-01-15T14:30:00.000Z",
  "Description": "Discussed case status with client",
  "Contact": "Maria Rodriguez",
  "Client_PP_ID": "PP-12345",
  "Matter": "SIJ - Davidson County",
  "RecordId": "rec123456",
  "Created_By": "Sarah Johnson",
  "Softr_Link_to_clients": "https://app.softr.io/...",
  "Updated": "2025-01-15T14:35:00.000Z",
  "Modified": "2025-01-15T14:35:00.000Z",
  "Due_Date": null,
  "Last_Update_By": "Sarah Johnson",
  "unix_timestamp": "1736952600",
  "time_raw": "14:30",
  "tags": ["follow-up", "client-communication"],
  "pp_note_id": "note-001",
  "matter": "SIJ - Davidson County",
  "matter_id": "recCASE001",
  "source": "xano",
  "client_airtable_id": "recCLIENT123",
  "eventId": null
}
```

### Case Notes Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | Integer | Unique note identifier |
| `Activity` | String | Activity title/summary |
| `Type` | String (enum) | Note type (Call, Email, Meeting, Task, Case Note, Note) |
| `Date` | String (timestamp) | Date/time of activity |
| `Description` | String | Detailed note content |
| `Contact` | String | Contact person name |
| `Client_PP_ID` | String | Client PP identifier |
| `Matter` | String | Matter/case name |
| `RecordId` | String | Record identifier |
| `Created_By` | String | User who created the note |
| `Softr_Link_to_clients` | String (URL) | Link to Softr client record |
| `Updated` | String (timestamp) | Last update timestamp |
| `Modified` | String (timestamp) | Last modified timestamp |
| `Due_Date` | String (timestamp) | Due date for tasks |
| `Last_Update_By` | String | User who last updated |
| `unix_timestamp` | String | Unix timestamp of activity |
| `time_raw` | String | Raw time value |
| `tags` | Array[String] | Associated tags |
| `pp_note_id` | String | PP note identifier |
| `matter_id` | String | Matter/case record ID (links to cases) |
| `source` | String | Data source identifier |
| `client_airtable_id` | String | Client Airtable record ID |
| `eventId` | String | Linked event ID (links to events) |

### Note Linking

Notes are linked to related entities via:
- `matter_id` - Links to cases in the `cases` bucket
- `eventId` - Links to events in the `events` or `hearings` buckets
- `client_airtable_id` - Links to the client record

## Field Filtering

The webhook automatically filters out fields with:

- `null` values
- `undefined` values
- Empty strings (`""`)
- Empty arrays (`[]`)
- Empty objects (`{}`)

## Triplet Conversion

Each field can be converted to a triplet with full provenance:

```javascript
{
  subject: "recCASE001",           // Which record
  predicate: "SIJ Case Status",    // Which field
  object: "Pending Custody Order", // The value
  provenance: {
    source: "cases",               // Which bucket
    table: "Case Master View",     // Original table name
    recordId: "recCASE001"         // ID to trace back
  }
}
```

## n8n Workflow Reference

**Workflow Name**: Client Summary
**Workflow ID**: `jstKXUSVFd3o8eOh`
**Webhook Path**: `c68fda2a-9302-4efb-930b-7063b85ef595`

### Key Nodes

1. **Webhook** - Entry point, receives `recordId` parameter
2. **Get Client** - Fetches Client Info by ID
3. **Get Cases** - Finds Case Master View records by `Client_ID_Airtable`
4. **Get Applications** - Finds Applications by `Case Master`
5. **Get Hearings** - Fetches from Hearings-Interviews calendar
6. **Get Events** - Fetches from RK Lacy Law Events calendar
7. **Merge Airtable** - Combines Airtable data
8. **Merge Calendars** - Combines calendar data
9. **Merge All** - Combines all sources
10. **Label and Filter Data** - Groups data into 5 buckets and normalizes
11. **Respond to Webhook1** - Returns the master record

## Widget Processing

The widget detects and handles both the new master record format and the legacy flat array format:

```javascript
// Detect master record format
function isMasterRecordFormat(data) {
  const hasClient = data.client && typeof data.client === 'object';
  const hasCases = Array.isArray(data.cases);
  const hasMeta = data._meta && typeof data._meta === 'object';
  return (hasClient && hasCases) || hasMeta;
}

// Transform to normalized widget format
if (isMasterRecordFormat(rawData)) {
  return transformMasterRecord(rawData);
} else {
  return transformFlatArray(rawData);
}
```

## Legacy Format (for backwards compatibility)

The widget also supports the older flat array format with `_sourceTable` labels:

```json
{
  "records": [
    { "_sourceTable": "Client Info", ... },
    { "_sourceTable": "Case Master View", ... },
    { "_sourceTable": "Applications", ... },
    { "_sourceTable": "Events", ... }
  ]
}
```

## Version History

- **2026-01-14**: Updated to 5-bucket master record format with separate hearings
- **2025-01-14**: Added JSON Schema files for webhook response validation
- **2025-01-14**: Initial documentation
