/**
 * MOCK DATA FOR TESTING
 *
 * This file provides sample data to test the widget without a live webhook.
 * Load this file BEFORE widget.html to use mock data.
 *
 * This mock data uses the n8n webhook master record format:
 * - Pre-grouped into 5 buckets: client, cases, applications, hearings, events
 * - Client is a single record object
 * - Cases, applications, hearings, events are arrays
 * - Each record has _recordId or _id for provenance tracking
 *
 * Usage:
 *   <script src="mock-data.js"></script>
 *   <script src="config.js"></script>
 *   ... widget.html content ...
 */

window.MOCK_DATA = {
  "_meta": {
    "generatedAt": "2026-01-14T00:20:24.500Z",
    "recordCounts": {
      "clientInfo": 1,
      "cases": 3,
      "applications": 2,
      "hearings": 2,
      "events": 3,
      "unknown": 0
    }
  },

  // Client Info - single record
  "client": {
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
    "Emergency Contact": "Jose Rodriguez - (615) 555-5678",
    "Gender": "Female",
    "Pronouns": "she/her"
  },

  // Cases - from Case Master View table
  "cases": [
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
      "Case Notes": "Client appeared with counsel. Case continued for individual hearing. Judge receptive to SIJ case.",
      "Relief Sought": "SIJ",
      "SIJ Case Status": "Pending Custody Order",
      "SIJ County": "Davidson",
      "Date Custody Filed": "2024-08-20",
      "SIJ Eligible (child)": true,
      "JDR Ct Date": "2025-01-28",
      "NTA Date": "2022-08-15",
      "Hearing Type": "Individual",
      "City Court In": "Memphis",
      "FOIA Receipt": "2024-09-15",
      "FOIA #": "2024-FOI-12345",
      "USCIS FOIA Stage": "Received",
      "FBI Record Stage": "Requested"
    },
    {
      "_recordId": "recCASE002",
      "id": "recCASE002",
      "Client_ID_Airtable": "recCLIENT123",
      "Matter Type": "USCIS - I-360",
      "Case Status": "Active",
      "USCIS Receipt Number": "SRC2411234567",
      "Priority Date": "2024-11-20",
      "Relief Sought": "Special Immigrant Juvenile Status",
      "EAD Stage": "Filed",
      "EAD Receipt Date": "2024-11-20",
      "EAD Eligible Date": "2024-11-20",
      "USCIS Receipt Date": "2024-11-20",
      "I-360 Receipt Number": "SRC2411234567",
      "I-360 Mailed Date": "2024-11-15",
      "Current USCIS application": "I-360 (SIJ)",
      "Priority Date (I-360)": "2024-11-20",
      "Biometric Notice Date": "2024-12-05",
      "RFE Due Date": "2025-03-01",
      "RFE/RFI (topic)": "Birth Certificate Authentication"
    },
    {
      "_recordId": "recCASE003",
      "id": "recCASE003",
      "Client_ID_Airtable": "recCLIENT123",
      "Matter Type": "Appeal - BIA",
      "Case Status": "Active",
      "Relief Sought": "Motion to Reopen",
      "Appeal Status": "Pending",
      "Appeal Due Date": "2025-04-15",
      "Appeal Receipt Date": "2025-01-10",
      "Brief Due Date": "2025-03-15",
      "Appeal Forum": "Board of Immigration Appeals"
    }
  ],

  // Applications - from Applications table
  "applications": [
    {
      "_recordId": "recAPP001",
      "_parentCaseId": "recCASE002",
      "id": "recAPP001",
      "Case Master": ["recCASE002"],
      "Application Type": "I-360",
      "Form Number": "I-360",
      "Filing Date": "2024-11-15",
      "Receipt Number": "SRC2411234567",
      "Decision": null,
      "Decision Date": null,
      "RFE Date": "2025-02-01",
      "RFE Response Due": "2025-03-01",
      "Biometrics Date": "2024-12-05",
      "Status": "Pending",
      "Notes": "Initial SIJ petition filed. Awaiting biometrics completion."
    },
    {
      "_recordId": "recAPP002",
      "_parentCaseId": "recCASE002",
      "id": "recAPP002",
      "Case Master": ["recCASE002"],
      "Application Type": "I-765",
      "Form Number": "I-765",
      "Filing Date": "2024-11-18",
      "Receipt Number": "SRC2411234568",
      "Decision": null,
      "Decision Date": null,
      "Status": "Pending",
      "Notes": "EAD application filed concurrently with I-360."
    }
  ],

  // Hearings - from Google Calendar (Hearings-Interviews calendar)
  "hearings": [
    {
      "_id": "evt001",
      "_calendarType": "hearing",
      "title": "Individual Hearing - Immigration Court",
      "description": "Individual hearing for Maria Rodriguez. Bring all evidence and witnesses. Judge: Hon. Patricia Williams",
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
    },
    {
      "_id": "evt002",
      "_calendarType": "hearing",
      "title": "JDR Court Date - Davidson County",
      "description": "SIJ custody hearing. Need to bring client and GAL.",
      "location": "Davidson County Juvenile Court, Nashville, TN",
      "startDateTime": "2025-01-28T14:00:00-06:00",
      "endDateTime": "2025-01-28T15:30:00-06:00",
      "isAllDay": false,
      "htmlLink": "https://calendar.google.com/event?eid=evt002",
      "meetLink": null,
      "status": "confirmed",
      "attendees": [],
      "created": "2024-12-15T10:00:00.000Z",
      "updated": "2024-12-15T10:00:00.000Z"
    }
  ],

  // Events - from Google Calendar (RK Lacy Law Events calendar)
  "events": [
    {
      "_id": "evt003",
      "_calendarType": "general",
      "title": "Biometrics Appointment - USCIS",
      "description": "Biometrics appointment for I-360 application.",
      "location": "USCIS Nashville Field Office, 711 Broad St, Nashville, TN 37203",
      "startDateTime": "2025-02-05T10:30:00-06:00",
      "endDateTime": "2025-02-05T11:00:00-06:00",
      "isAllDay": false,
      "htmlLink": "https://calendar.google.com/event?eid=evt003",
      "meetLink": null,
      "status": "confirmed",
      "attendees": [],
      "created": "2024-12-20T10:00:00.000Z",
      "updated": "2024-12-20T10:00:00.000Z"
    },
    {
      "_id": "evt004",
      "_calendarType": "general",
      "title": "RFE Response Deadline",
      "description": "Deadline to respond to Request for Evidence for I-360.",
      "location": null,
      "startDateTime": "2025-03-01",
      "endDateTime": "2025-03-02",
      "isAllDay": true,
      "htmlLink": "https://calendar.google.com/event?eid=evt004",
      "meetLink": null,
      "status": "confirmed",
      "attendees": [],
      "created": "2024-12-25T10:00:00.000Z",
      "updated": "2024-12-25T10:00:00.000Z"
    },
    {
      "_id": "evt005",
      "_calendarType": "general",
      "title": "Brief Due Date - BIA Appeal",
      "description": "Appellant's brief due for BIA appeal.",
      "location": null,
      "startDateTime": "2025-03-15",
      "endDateTime": "2025-03-16",
      "isAllDay": true,
      "htmlLink": "https://calendar.google.com/event?eid=evt005",
      "meetLink": null,
      "status": "confirmed",
      "attendees": [],
      "created": "2025-01-05T10:00:00.000Z",
      "updated": "2025-01-05T10:00:00.000Z"
    }
  ]
};

console.log('[MockData] Loaded mock data with 5-bucket master record format');
console.log('[MockData] Record counts:', window.MOCK_DATA._meta.recordCounts);

/**
 * MOCK SCHEMA for testing schema-driven display
 * This simulates the Airtable schema structure that would come from the API.
 */
window.MOCK_SCHEMA = [
  {
    "id": "tbl0uHmtLkGyDnSP9",
    "name": "Client Info",
    "primaryFieldId": "fldbxM9rf4oyjaF1L",
    "fields": [
      { "type": "formula", "id": "fldbxM9rf4oyjaF1L", "name": "Client Name", "options": { "result": { "type": "singleLineText" } } },
      { "type": "singleLineText", "id": "fldDX51SGmqWies0q", "name": "A#" },
      { "type": "singleLineText", "id": "fldx4sNMO72i7xHf5", "name": "First Name" },
      { "type": "singleLineText", "id": "fldlf5jBOykNJB6Ua", "name": "Last Name" },
      { "type": "date", "id": "fldPOZneyibSaPvJs", "name": "DOB", "options": { "dateFormat": { "name": "local" } } },
      { "type": "singleSelect", "id": "fldF6Qo9nPOwsNf8L", "name": "Country of Origin" },
      { "type": "singleLineText", "id": "fldi5aJiKvggzjN7U", "name": "Phone" },
      { "type": "email", "id": "fldMeCBF6VPqzTMnu", "name": "Email" },
      { "type": "singleLineText", "id": "fldw4LBZtGs7BlLHb", "name": "Address" },
      { "type": "singleLineText", "id": "fldEmergency001", "name": "Emergency Contact" }
    ]
  },
  {
    "id": "tblgynOzESGvAXAsK",
    "name": "Case Master View",
    "primaryFieldId": "fldDesc001",
    "fields": [
      { "type": "singleLineText", "id": "fldClientIdAt", "name": "Client_ID_Airtable" },
      { "type": "singleLineText", "id": "fldMatterType001", "name": "Matter Type" },
      { "type": "singleLineText", "id": "fldCaseStatus001", "name": "Case Status" },
      { "type": "singleLineText", "id": "fldCourt001", "name": "Court" },
      { "type": "singleLineText", "id": "fldJudge001", "name": "Judge" },
      { "type": "dateTime", "id": "fldNextHearing001", "name": "Next Hearing" },
      { "type": "date", "id": "fldFilingDeadline001", "name": "Filing Deadline" },
      { "type": "singleLineText", "id": "fldUSCISReceipt001", "name": "USCIS Receipt Number" },
      { "type": "date", "id": "fldPriorityDate001", "name": "Priority Date" },
      { "type": "singleLineText", "id": "fldCaseNumber001", "name": "Case Number" }
    ]
  },
  {
    "id": "tbl6XtHs9g5iwd7qi",
    "name": "Applications",
    "primaryFieldId": "fldAppType001",
    "fields": [
      { "type": "multipleRecordLinks", "id": "fldCaseMaster001", "name": "Case Master" },
      { "type": "singleLineText", "id": "fldAppType001", "name": "Application Type" },
      { "type": "singleLineText", "id": "fldFormNumber001", "name": "Form Number" },
      { "type": "date", "id": "fldFilingDate001", "name": "Filing Date" },
      { "type": "singleLineText", "id": "fldReceiptNum001", "name": "Receipt Number" },
      { "type": "singleSelect", "id": "fldDecision001", "name": "Decision" },
      { "type": "date", "id": "fldDecisionDate001", "name": "Decision Date" },
      { "type": "date", "id": "fldRFEDate001", "name": "RFE Date" },
      { "type": "date", "id": "fldRFEResponseDue001", "name": "RFE Response Due" },
      { "type": "date", "id": "fldBiometricsDate001", "name": "Biometrics Date" }
    ]
  }
];

console.log('[MockData] Loaded mock schema with', window.MOCK_SCHEMA.length, 'tables');

/**
 * Legacy flat format converter - for backwards compatibility testing
 * Converts the new 5-bucket format back to flat array with _sourceTable
 */
window.convertToFlatFormat = function(masterRecord) {
  const records = [];

  // Client Info record
  if (masterRecord.client) {
    records.push({
      _sourceTable: 'Client Info',
      ...masterRecord.client
    });
  }

  // Case Master View records
  for (const caseRecord of (masterRecord.cases || [])) {
    records.push({
      _sourceTable: 'Case Master View',
      ...caseRecord
    });
  }

  // Applications records
  for (const appRecord of (masterRecord.applications || [])) {
    records.push({
      _sourceTable: 'Applications',
      ...appRecord
    });
  }

  // Hearings (from Google Calendar - Hearings)
  for (const hearing of (masterRecord.hearings || [])) {
    records.push({
      _sourceTable: 'Hearings',
      id: hearing._id,
      ...hearing
    });
  }

  // Events (from Google Calendar - Events)
  for (const event of (masterRecord.events || [])) {
    records.push({
      _sourceTable: 'Events',
      id: event._id,
      ...event
    });
  }

  return { records };
};

console.log('[MockData] Legacy flat format converter available as window.convertToFlatFormat()');
