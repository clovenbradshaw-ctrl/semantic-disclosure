/**
 * MOCK DATA FOR TESTING
 *
 * This file provides sample data to test the widget without a live webhook.
 * Load this file BEFORE widget.html to use mock data.
 *
 * This mock data uses the actual n8n webhook format:
 * - { records: [...] } wrapper
 * - Each record has _sourceTable field
 * - Flat field structure (not nested in "fields")
 *
 * Usage:
 *   <script src="mock-data.js"></script>
 *   <script src="config.js"></script>
 *   ... widget.html content ...
 */

window.MOCK_DATA = {
  "records": [
    // Client Info record
    {
      "_sourceTable": "Client Info",
      "id": "recCLIENT123",
      "createdTime": "2024-08-20T14:30:00.000Z",
      "Client Name": "Rodriguez Garcia, Maria Elena",
      "First Name": "Maria",
      "Family Name": "Rodriguez Garcia",
      "Middle Name": "Elena",
      "A#": "234-567-890",
      "DOB": "1995-03-22",
      "Age": "29",
      "Country": "Guatemala",
      "Phone Number": "(615) 555-1234",
      "Client Email": "maria.rodriguez@email.com",
      "Address": "123 Main Street, Nashville, TN 37203",
      "Entry Date": "2022-06-15",
      "Entry Status": "EWI",
      "Gender": "Female",
      "Pronouns": "she/her",
      "Case Manager": {
        "id": "usrCM001",
        "email": "sarah.johnson@lawfirm.com",
        "name": "Sarah Johnson"
      },
      "AMINO": { "label": "AMINO", "url": "https://rklacylaw.softr.app/client-info?recordId=recCLIENT123" },
      "Kenect Thread": { "label": "Kenect", "url": "https://kenect.com/thread/123" },
      "box link": { "label": "Box", "url": "https://app.box.com/s/example123" },

      // Fields with errors/NaN (should be filtered)
      "SIJ Visa Availability": { "specialValue": "NaN" },
      "Days to Next Hearing": { "specialValue": "NaN" },
      "Today Date": "2026-01-14T00:20:24.500Z"
    },

    // Case Master View record 1 - SIJ Case
    {
      "_sourceTable": "Case Master View",
      "id": "recCASE001",
      "createdTime": "2024-08-20T14:30:00.000Z",
      "Client Name": "Rodriguez Garcia, Maria Elena",
      "Description": "SIJ - Davidson County (0)",
      "File Case Status": "Active",
      "Relief Sought": "SIJ",
      "Matter": "Special Immigrant Juvenile Status",
      "Case Tags": "SIJ, USCIS Pending, Priority",

      // Court fields
      "Hearing Date/Time": "2025-02-15T09:00:00.000Z",
      "Court/Office": "Memphis Immigration Court",
      "Judge text": "Hon. Patricia Williams",
      "Hearing Type": "Individual",
      "City Court In": "Memphis",
      "Days to Next Hearing": 34,
      "Pleadings Due Date": "2025-02-01",
      "NTA Date": "2022-08-15",

      // SIJ fields
      "SIJ Case Status": "Pending Custody Order",
      "SIJ County": "Davidson",
      "Date Custody Filed": "2024-08-20",
      "SIJ Eligible (child)": true,
      "JDR Ct Date": "2025-01-28",

      // FOIA fields
      "FOIA Receipt": "2024-09-15",
      "FOIA #": "2024-FOI-12345",
      "FOIA PIN #": "847291",
      "USCIS FOIA Stage": "Received",
      "FBI Record Stage": "Requested",

      // Button fields
      "Activity Details": { "label": "Edit", "url": "https://rklacylaw.softr.app/legacy-cmv-details?recordId=recCASE001" },
      "FOIA Button": { "label": "USCIS FOIA", "url": "https://egov.uscis.gov/casestatus/landing.do" },
      "Court K Button": { "label": "Court K", "url": "https://documint.me/court-k/recCASE001" },

      // Notes
      "Case Notes": "Client appeared with counsel. Case continued for individual hearing. Judge receptive to SIJ case.",

      // Error fields (should be filtered)
      "SIJ Visa Availability": { "specialValue": "NaN" },
      "Appeal Engagement Deadline": { "error": "#ERROR" },
      "OYD ": { "error": "#ERROR" },
      "Today Date": "2026-01-14T00:20:24.500Z",

      // Last Modified
      "Last Modified By": {
        "id": "usrCM001",
        "email": "sarah.johnson@lawfirm.com",
        "name": "Sarah Johnson"
      }
    },

    // Case Master View record 2 - USCIS I-360
    {
      "_sourceTable": "Case Master View",
      "id": "recCASE002",
      "createdTime": "2024-11-15T10:00:00.000Z",
      "Client Name": "Rodriguez Garcia, Maria Elena",
      "Description": "USCIS - I-360 (0)",
      "File Case Status": "Active",
      "Relief Sought": "Special Immigrant Juvenile Status",

      // USCIS I-360 fields
      "USCIS Receipt Date": "2024-11-20",
      "USCIS Receipt Number": "SRC2411234567",
      "I-360 Receipt Number": "SRC2411234567",
      "I-360 Mailed Date": "2024-11-15",
      "Current USCIS application": "I-360 (SIJ)",
      "Priority Date (I-360)": "2024-11-20",
      "Biometric Notice Date": "2024-12-05",
      "RFE Due Date": "2025-03-01",
      "RFE/RFI (topic)": "Birth Certificate Authentication",

      // EAD fields
      "EAD Stage": "Filed",
      "EAD Receipt Date": "2024-11-20",
      "EAD Eligible Date": "2024-11-20",
      "EAD Sent Date": "2024-11-18",

      // Button fields
      "USCIS K Button": { "label": "USCIS Contract", "url": "https://documint.me/uscis-k/recCASE002" },
      "Activity Details": { "label": "Edit", "url": "https://rklacylaw.softr.app/legacy-cmv-details?recordId=recCASE002" },

      // Error fields
      "SIJ Visa Availability": { "specialValue": "NaN" },
      "Calculate FOIA pending": { "specialValue": "NaN" },
      "Today Date": "2026-01-14T00:20:24.500Z"
    },

    // Case Master View record 3 - Appeal
    {
      "_sourceTable": "Case Master View",
      "id": "recCASE003",
      "createdTime": "2025-01-10T08:00:00.000Z",
      "Client Name": "Rodriguez Garcia, Maria Elena",
      "Description": "Appeal - BIA (0)",
      "File Case Status": "Active",
      "Relief Sought": "Motion to Reopen",

      // Appeal fields
      "Appeal Status": "Pending",
      "Appeal Due Date": "2025-04-15",
      "Appeal Receipt Date": "2025-01-10",
      "Brief Due Date": "2025-03-15",
      "Appeal Forum": "Board of Immigration Appeals",

      // Button fields
      "Appeal Contract Button": { "label": "Appeal Contract", "url": "https://documint.me/appeal/recCASE003" },
      "Activity Details": { "label": "Edit", "url": "https://rklacylaw.softr.app/legacy-cmv-details?recordId=recCASE003" },

      // Error fields
      "AAF Deadline": { "error": "#ERROR" },
      "Today Date": "2026-01-14T00:20:24.500Z"
    },

    // Events record 1 - Court Hearing
    {
      "_sourceTable": "Events",
      "id": "recEVENT001",
      "createdTime": "2024-12-01T10:00:00.000Z",
      "Client Name": "Rodriguez Garcia, Maria Elena",
      "Description": "Individual Hearing - Immigration Court",
      "Start Date": "2025-02-15T09:00:00.000Z",
      "End Date": "2025-02-15T11:00:00.000Z",
      "Location": "Memphis Immigration Court, 80 Monroe Ave, Memphis, TN 38103",
      "Activity Details": { "label": "Edit", "url": "https://example.com/event/recEVENT001" },
      "Today Date": "2026-01-14T00:20:24.500Z"
    },

    // Events record 2 - JDR Court Date
    {
      "_sourceTable": "Events",
      "id": "recEVENT002",
      "createdTime": "2024-12-15T10:00:00.000Z",
      "Client Name": "Rodriguez Garcia, Maria Elena",
      "Description": "JDR Court Date - Davidson County",
      "Start Date": "2025-01-28T14:00:00.000Z",
      "End Date": "2025-01-28T15:30:00.000Z",
      "Location": "Davidson County Juvenile Court, Nashville, TN",
      "Activity Details": { "label": "Edit", "url": "https://example.com/event/recEVENT002" },
      "Today Date": "2026-01-14T00:20:24.500Z"
    },

    // Events record 3 - Biometrics
    {
      "_sourceTable": "Events",
      "id": "recEVENT003",
      "createdTime": "2024-12-20T10:00:00.000Z",
      "Client Name": "Rodriguez Garcia, Maria Elena",
      "Description": "Biometrics Appointment - USCIS",
      "Start Date": "2025-02-05T10:30:00.000Z",
      "End Date": "2025-02-05T11:00:00.000Z",
      "Location": "USCIS Nashville Field Office, 711 Broad St, Nashville, TN 37203",
      "Activity Details": { "label": "Edit", "url": "https://example.com/event/recEVENT003" },
      "Today Date": "2026-01-14T00:20:24.500Z"
    },

    // Applications record 1 - I-360
    {
      "_sourceTable": "Applications",
      "id": "recAPP001",
      "createdTime": "2024-11-15T10:00:00.000Z",
      "Client Name": "Rodriguez Garcia, Maria Elena",
      "Description": "I-360 (SIJ)",
      "Current USCIS application": "I-360: Filed",
      "Case Master View ID": "recCASE002",
      "Receipt Number": "SRC2411234567",
      "Filed Date": "2024-11-15",
      "Status": "Pending",
      "Activity Details": { "label": "Edit", "url": "https://example.com/application/recAPP001" },
      "Today Date": "2026-01-14T00:20:24.500Z"
    },

    // Applications record 2 - I-765 (EAD)
    {
      "_sourceTable": "Applications",
      "id": "recAPP002",
      "createdTime": "2024-11-18T10:00:00.000Z",
      "Client Name": "Rodriguez Garcia, Maria Elena",
      "Description": "I-765 (EAD)",
      "Current USCIS application": "I-765: Filed",
      "Case Master View ID": "recCASE002",
      "Receipt Number": "SRC2411234568",
      "Filed Date": "2024-11-18",
      "Status": "Pending",
      "Activity Details": { "label": "Edit", "url": "https://example.com/application/recAPP002" },
      "Today Date": "2026-01-14T00:20:24.500Z"
    }
  ]
};

console.log('[MockData] Loaded mock data with', window.MOCK_DATA.records.length, 'records in n8n webhook format');

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
      { "type": "singleLineText", "id": "fldlf5jBOykNJB6Ua", "name": "Family Name" },
      { "type": "singleLineText", "id": "fldqfL0TSX0PG6ryK", "name": "Middle Name" },
      { "type": "date", "id": "fldPOZneyibSaPvJs", "name": "DOB", "options": { "dateFormat": { "name": "local" } } },
      { "type": "formula", "id": "fldjyMymORa2eZUo5", "name": "Age", "options": { "result": { "type": "number" } } },
      { "type": "singleSelect", "id": "fldF6Qo9nPOwsNf8L", "name": "Country" },
      { "type": "singleLineText", "id": "fldi5aJiKvggzjN7U", "name": "Phone Number" },
      { "type": "email", "id": "fldMeCBF6VPqzTMnu", "name": "Client Email" },
      { "type": "singleLineText", "id": "fldw4LBZtGs7BlLHb", "name": "Address" },
      { "type": "date", "id": "fldvwCdlfHd7VuKIR", "name": "Entry Date" },
      { "type": "singleLineText", "id": "fldz1PMJuDditJbKD", "name": "Entry Status" },
      { "type": "button", "id": "fldwu1dhsD7EaJON6", "name": "AMINO" },
      { "type": "button", "id": "fld8b6Wme484ytNNV", "name": "Kenect Thread" }
    ]
  },
  {
    "id": "tblgynOzESGvAXAsK",
    "name": "Case Master View",
    "primaryFieldId": "fldDesc001",
    "fields": [
      { "type": "singleLineText", "id": "fldDesc001", "name": "Description" },
      { "type": "singleLineText", "id": "fldMatter001", "name": "Matter" },
      { "type": "multipleSelects", "id": "fldReliefSought001", "name": "Relief Sought" },
      { "type": "singleLineText", "id": "fldFileStatus001", "name": "File Case Status" },
      { "type": "multipleSelects", "id": "fldCaseTags001", "name": "Case Tags" },
      { "type": "dateTime", "id": "fldHearingDateTime001", "name": "Hearing Date/Time" },
      { "type": "singleLineText", "id": "fldCourtOffice001", "name": "Court/Office" },
      { "type": "singleLineText", "id": "fldJudgeText001", "name": "Judge text" },
      { "type": "singleSelect", "id": "fldHearingType001", "name": "Hearing Type" },
      { "type": "singleSelect", "id": "fldSIJStatus001", "name": "SIJ Case Status" },
      { "type": "singleLineText", "id": "fldSIJCounty001", "name": "SIJ County" },
      { "type": "date", "id": "fldCustodyFiled001", "name": "Date Custody Filed" },
      { "type": "date", "id": "fldJDRDate001", "name": "JDR Ct Date" },
      { "type": "date", "id": "fldUSCISReceipt001", "name": "USCIS Receipt Date" },
      { "type": "singleLineText", "id": "fldUSCISReceiptNum001", "name": "USCIS Receipt Number" },
      { "type": "singleLineText", "id": "fldI360Receipt001", "name": "I-360 Receipt Number" },
      { "type": "date", "id": "fldRFEDue001", "name": "RFE Due Date" },
      { "type": "singleSelect", "id": "fldEADStage001", "name": "EAD Stage" },
      { "type": "singleSelect", "id": "fldAppealStatus001", "name": "Appeal Status" },
      { "type": "date", "id": "fldBriefDue001", "name": "Brief Due Date" },
      { "type": "richText", "id": "fldCaseNotes001", "name": "Case Notes" },
      { "type": "button", "id": "fldActivityDetails001", "name": "Activity Details" }
    ]
  },
  {
    "id": "tblEvents001",
    "name": "Events",
    "primaryFieldId": "fldEvtDesc001",
    "fields": [
      { "type": "singleLineText", "id": "fldEvtDesc001", "name": "Description" },
      { "type": "dateTime", "id": "fldStartDate001", "name": "Start Date" },
      { "type": "dateTime", "id": "fldEndDate001", "name": "End Date" },
      { "type": "singleLineText", "id": "fldLocation001", "name": "Location" }
    ]
  },
  {
    "id": "tblApps001",
    "name": "Applications",
    "primaryFieldId": "fldAppDesc001",
    "fields": [
      { "type": "singleLineText", "id": "fldAppDesc001", "name": "Description" },
      { "type": "singleLineText", "id": "fldCurrentApp001", "name": "Current USCIS application" },
      { "type": "singleLineText", "id": "fldReceiptNum001", "name": "Receipt Number" },
      { "type": "date", "id": "fldFiledDate001", "name": "Filed Date" },
      { "type": "singleSelect", "id": "fldAppStatus001", "name": "Status" }
    ]
  }
];

console.log('[MockData] Loaded mock schema with', window.MOCK_SCHEMA.length, 'tables');

/**
 * MOCK GOOGLE CALENDAR DATA
 * Sample calendar events in Google Calendar API format
 */
window.GOOGLE_CALENDAR_DATA = [
  {
    "id": "evt001",
    "summary": "Individual Hearing - Immigration Court",
    "start": { "dateTime": "2025-02-15T09:00:00-06:00" },
    "end": { "dateTime": "2025-02-15T11:00:00-06:00" },
    "location": "Memphis Immigration Court, 80 Monroe Ave, Memphis, TN 38103",
    "description": "Individual hearing for Maria Rodriguez. Bring all evidence and witnesses. Judge: Hon. Patricia Williams"
  },
  {
    "id": "evt002",
    "summary": "JDR Court Date - Davidson County",
    "start": { "dateTime": "2025-01-28T14:00:00-06:00" },
    "end": { "dateTime": "2025-01-28T15:30:00-06:00" },
    "location": "Davidson County Juvenile Court, Nashville, TN",
    "description": "SIJ custody hearing. Need to bring client and GAL."
  },
  {
    "id": "evt003",
    "summary": "Biometrics Appointment - USCIS",
    "start": { "dateTime": "2025-02-05T10:30:00-06:00" },
    "end": { "dateTime": "2025-02-05T11:00:00-06:00" },
    "location": "USCIS Nashville Field Office, 711 Broad St, Nashville, TN 37203",
    "description": "Biometrics appointment for I-360 application."
  },
  {
    "id": "evt004",
    "summary": "RFE Response Deadline",
    "start": { "date": "2025-03-01" },
    "end": { "date": "2025-03-02" },
    "description": "Deadline to respond to Request for Evidence for I-360."
  },
  {
    "id": "evt005",
    "summary": "Brief Due Date - BIA Appeal",
    "start": { "date": "2025-03-15" },
    "end": { "date": "2025-03-16" },
    "description": "Appellant's brief due for BIA appeal."
  }
];

console.log('[MockData] Loaded mock Google Calendar data with', window.GOOGLE_CALENDAR_DATA.length, 'events');
