/**
 * MOCK DATA FOR TESTING
 *
 * This file provides sample data to test the widget without a live webhook.
 * Load this file BEFORE widget.html to use mock data.
 *
 * This mock data uses the REAL API format (flat array with array-wrapped values)
 * to test the DataTransformer functionality.
 *
 * Usage:
 *   <script src="mock-data.js"></script>
 *   <script src="config.js"></script>
 *   ... widget.html content ...
 */

window.MOCK_DATA = [
  {
    "id": "recCASE001",
    "createdTime": "2024-08-20T14:30:00.000Z",
    "Client Name": "Rodriguez Garcia, Maria Elena",
    "First Name": ["Maria"],
    "Family Name": ["Rodriguez Garcia"],
    "Middle Name": ["Elena"],
    "A#": ["234-567-890"],
    "DOB": ["1995-03-22"],
    "Age": "29",
    "Country": ["Guatemala"],
    "Phone Number": ["(615) 555-1234"],
    "Client Email": ["maria.rodriguez@email.com"],
    "Address": ["123 Main Street, Nashville, TN 37203"],
    "Entry Date": ["2022-06-15"],
    "Entry Status": ["EWI"],
    "Case Tags": ["SIJ", "USCIS Pending", "Priority"],
    "Case Manager": "Sarah Johnson",
    "MCH Attny": ["recATTY001"],
    "Client_ID_Airtable": ["recCLIENT123"],

    // Court fields
    "Hearing Date/Time": ["2025-02-15T09:00:00.000Z"],
    "Court/Office": ["Memphis Immigration Court"],
    "Judge": ["recJUDGE001"],
    "Judge text": "Hon. Patricia Williams",
    "Hearing Type": ["Individual"],
    "City Court In": "Memphis",
    "Days to Next Hearing": 34,
    "Pleadings Due Date": "2025-02-01",
    "NTA Date": "2022-08-15",

    // SIJ fields
    "SIJ Case Status": "Pending Custody Order",
    "SIJ County": "Davidson",
    "Date Custody Filed": "2024-08-20",
    "SIJ Eligible (child)": "Yes",
    "JDR Ct Date": "2025-01-28",

    // FOIA fields
    "FOIA Receipt": "2024-09-15",
    "FOIA #": "2024-FOI-12345",
    "FOIA PIN #": "847291",
    "USCIS FOIA Stage": "Received",
    "FBI Record Stage": ["Requested"],

    // Button/Link fields
    "box link": { "label": "Box", "url": "https://app.box.com/s/example123" },
    "AMINO": { "label": "AMINO", "url": "https://rklacylaw.softr.app/client-info?recordId=recCLIENT123" },
    "Activity Details": { "label": "Edit", "url": "https://rklacylaw.softr.app/legacy-cmv-details?recordId=recCASE001" },
    "FOIA Button": { "label": "USCIS FOIA", "url": "https://egov.uscis.gov/casestatus/landing.do" },

    // Error/NaN fields (should be filtered out)
    "SIJ Visa Availability": { "specialValue": "NaN" },
    "Appeal Engagement Deadline": { "error": "#ERROR" },
    "Family Name (Pretty)": { "error": "#ERROR!" },

    // Internal fields (should be hidden)
    "Record ID": "recCASE001",
    "Case Master View Record ID": "recCASE001",
    "Today Date": "2025-01-12T21:49:53.337Z",
    "Edit Client Info": ["recCLIENT123"],

    // Case type identifier
    "Description": "SIJ - Davidson County (0)",
    "Matter": "Special Immigrant Juvenile Status",
    "Relief Sought": ["SIJ"],
    "File Case Status": "Active",

    // Notes
    "Case Notes": "Client appeared with counsel. Case continued for individual hearing.",
    "Activity": "Intake completed",

    // Uncategorized fields (Tier 3)
    "Some_New_Field_2025": "Value without semantic mapping",
    "Internal_Tracking_Code": "ABC-XYZ-789"
  },
  {
    "id": "recCASE002",
    "createdTime": "2024-11-15T10:00:00.000Z",
    "Client Name": "Rodriguez Garcia, Maria Elena",
    "First Name": ["Maria"],
    "Family Name": ["Rodriguez Garcia"],
    "Middle Name": ["Elena"],
    "A#": ["234-567-890"],
    "DOB": ["1995-03-22"],
    "Age": "29",
    "Country": ["Guatemala"],
    "Phone Number": ["(615) 555-1234"],
    "Client Email": ["maria.rodriguez@email.com"],
    "Address": ["123 Main Street, Nashville, TN 37203"],
    "Client_ID_Airtable": ["recCLIENT123"],

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
    "USCIS K Button": { "label": "USCIS Contract", "url": "https://app.documint.me/integrations/airtable?template_id=example" },
    "AMINO": { "label": "AMINO", "url": "https://rklacylaw.softr.app/client-info?recordId=recCLIENT123" },

    // Error fields (filtered)
    "SIJ Visa Availability": { "specialValue": "NaN" },
    "Calculate FOIA pending": { "specialValue": "NaN" },

    // Case type
    "Description": "USCIS - I-360 Appeal - BIA (0)",
    "Relief Sought": ["Special Immigrant Juvenile Status"],
    "File Case Status": "Active",

    // Internal (hidden)
    "Record ID": "recCASE002",
    "Case Master View Record ID": "recCASE002"
  },
  {
    "id": "recCASE003",
    "createdTime": "2025-01-10T08:00:00.000Z",
    "Client Name": "Rodriguez Garcia, Maria Elena",
    "First Name": ["Maria"],
    "Family Name": ["Rodriguez Garcia"],
    "A#": ["234-567-890"],
    "DOB": ["1995-03-22"],
    "Country": ["Guatemala"],
    "Phone Number": ["(615) 555-1234"],
    "Client_ID_Airtable": ["recCLIENT123"],

    // Appeal fields
    "Appeal Status": "Pending",
    "Appeal Due Date": "2025-04-15",
    "Appeal Receipt Date": "2025-01-10",
    "Brief Due Date": "2025-03-15",
    "Appeal Forum": "Board of Immigration Appeals",

    // Button fields
    "Appeal Contract Button": { "label": "Appeal Contract", "url": "https://app.documint.me/integrations/airtable?template_id=appeal" },

    // Case type
    "Description": "Appeal - BIA (0)",
    "Relief Sought": ["Motion to Reopen"],

    // Error fields
    "AAF Deadline": { "error": "#ERROR" },

    // Internal
    "Record ID": "recCASE003",
    "Case Master View Record ID": "recCASE003"
  }
];

console.log('[MockData] Loaded mock data in real API format (flat array with', window.MOCK_DATA.length, 'case records)');

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
      { "type": "singleSelect", "id": "fldF6Qo9nPOwsNf8L", "name": "Country", "options": { "choices": [
        { "id": "selgnUDpv11nS8tut", "name": "Guatemala" },
        { "id": "selohV3CuLGHhvNi6", "name": "El Salvador" },
        { "id": "selukwMldRBJUEhvB", "name": "Honduras" },
        { "id": "selDr4ZxFQxoPwQ0u", "name": "Mexico" }
      ]}},
      { "type": "singleLineText", "id": "fldi5aJiKvggzjN7U", "name": "Phone Number" },
      { "type": "email", "id": "fldMeCBF6VPqzTMnu", "name": "Client Email" },
      { "type": "singleLineText", "id": "fldw4LBZtGs7BlLHb", "name": "Address" },
      { "type": "date", "id": "fldvwCdlfHd7VuKIR", "name": "Entry Date" },
      { "type": "singleLineText", "id": "fldz1PMJuDditJbKD", "name": "Entry Status" },
      { "type": "multipleRecordLinks", "id": "fld8ugFfxlFa4QBNm", "name": "Case Manager" },
      { "type": "multipleRecordLinks", "id": "fldmE0jojh4NJ3VZ9", "name": "Case Master View // Activities" },
      { "type": "button", "id": "fldwu1dhsD7EaJON6", "name": "AMINO" },
      { "type": "button", "id": "fld8b6Wme484ytNNV", "name": "Kenect Thread" },
      { "type": "multilineText", "id": "fldlwOebIlds9BvCm", "name": "bahr_import_flatpack_data" },
      { "type": "richText", "id": "fldMetadata001", "name": "Metadata" },
      { "type": "richText", "id": "fldClientNotes001", "name": "Client Notes" },
      { "type": "url", "id": "fldInvoicedUrl001", "name": "Invoiced URL" },
      { "type": "lastModifiedTime", "id": "fld5EzazEikyJlvwU", "name": "Airtable_Last_Modified" },
      { "type": "autoNumber", "id": "fldAutoNum001", "name": "ID" }
    ]
  },
  {
    "id": "tblgynOzESGvAXAsK",
    "name": "Case Master View",
    "primaryFieldId": "fldDesc001",
    "fields": [
      { "type": "singleLineText", "id": "fldDesc001", "name": "Description" },
      { "type": "singleLineText", "id": "fldMatter001", "name": "Matter" },
      { "type": "multipleSelects", "id": "fldReliefSought001", "name": "Relief Sought", "options": { "choices": [
        { "id": "selSIJ001", "name": "SIJ" },
        { "id": "selAsylum001", "name": "Asylum" },
        { "id": "selU-Visa001", "name": "U-Visa" }
      ]}},
      { "type": "singleLineText", "id": "fldFileStatus001", "name": "File Case Status" },
      { "type": "multipleSelects", "id": "fldCaseTags001", "name": "Case Tags", "options": { "choices": [] }},

      // Court fields
      { "type": "dateTime", "id": "fldHearingDateTime001", "name": "Hearing Date/Time", "options": { "dateFormat": { "name": "local" }, "timeFormat": { "name": "12hour" } } },
      { "type": "singleLineText", "id": "fldCourtOffice001", "name": "Court/Office" },
      { "type": "singleLineText", "id": "fldJudgeText001", "name": "Judge text" },
      { "type": "multipleRecordLinks", "id": "fldJudge001", "name": "Judge" },
      { "type": "singleSelect", "id": "fldHearingType001", "name": "Hearing Type", "options": { "choices": [
        { "id": "selInd001", "name": "Individual" },
        { "id": "selMaster001", "name": "Master Calendar" }
      ]}},
      { "type": "singleLineText", "id": "fldCityCourtIn001", "name": "City Court In" },
      { "type": "formula", "id": "fldDaysToHearing001", "name": "Days to Next Hearing", "options": { "result": { "type": "number" } } },
      { "type": "date", "id": "fldPleadingsDue001", "name": "Pleadings Due Date" },
      { "type": "date", "id": "fldNTADate001", "name": "NTA Date" },

      // SIJ fields
      { "type": "singleSelect", "id": "fldSIJStatus001", "name": "SIJ Case Status", "options": { "choices": [
        { "id": "selPending001", "name": "Pending Custody Order" },
        { "id": "selGranted001", "name": "Granted" },
        { "id": "selFiled001", "name": "I-360 Filed" }
      ]}},
      { "type": "singleLineText", "id": "fldSIJCounty001", "name": "SIJ County" },
      { "type": "date", "id": "fldCustodyFiled001", "name": "Date Custody Filed" },
      { "type": "checkbox", "id": "fldSIJEligible001", "name": "SIJ Eligible (child)" },
      { "type": "date", "id": "fldJDRDate001", "name": "JDR Ct Date" },
      { "type": "multilineText", "id": "fldSIJNotes001", "name": "SIJS Notes" },

      // USCIS fields
      { "type": "date", "id": "fldUSCISReceipt001", "name": "USCIS Receipt Date" },
      { "type": "singleLineText", "id": "fldUSCISReceiptNum001", "name": "USCIS Receipt Number" },
      { "type": "singleLineText", "id": "fldI360Receipt001", "name": "I-360 Receipt Number" },
      { "type": "date", "id": "fldI360Mailed001", "name": "I-360 Mailed Date" },
      { "type": "date", "id": "fldI360Approval001", "name": "I-360 Approval Date" },
      { "type": "date", "id": "fldPriorityDate001", "name": "Priority Date (I-360)" },
      { "type": "singleLineText", "id": "fldCurrentUSCISApp001", "name": "Current USCIS application" },
      { "type": "date", "id": "fldBiometricDate001", "name": "Biometric Notice Date" },
      { "type": "date", "id": "fldRFEDue001", "name": "RFE Due Date" },
      { "type": "singleLineText", "id": "fldRFETopic001", "name": "RFE/RFI (topic)" },

      // EAD fields
      { "type": "singleSelect", "id": "fldEADStage001", "name": "EAD Stage", "options": { "choices": [
        { "id": "selFiled001", "name": "Filed" },
        { "id": "selApproved001", "name": "Approved" },
        { "id": "selPending001", "name": "Pending" }
      ]}},
      { "type": "date", "id": "fldEADReceipt001", "name": "EAD Receipt Date" },
      { "type": "date", "id": "fldEADApproval001", "name": "EAD Approval Date" },
      { "type": "date", "id": "fldEADEligible001", "name": "EAD Eligible Date" },
      { "type": "date", "id": "fldEADSent001", "name": "EAD Sent Date" },
      { "type": "multilineText", "id": "fldEADComments001", "name": "EAD Comments" },

      // FOIA fields
      { "type": "date", "id": "fldFOIAReceipt001", "name": "FOIA Receipt" },
      { "type": "singleLineText", "id": "fldFOIANum001", "name": "FOIA #" },
      { "type": "singleLineText", "id": "fldFOIAPIN001", "name": "FOIA PIN #" },
      { "type": "date", "id": "fldFOIACDDate001", "name": "FOIA CD Date" },
      { "type": "singleSelect", "id": "fldUSCISFOIA001", "name": "USCIS FOIA Stage", "options": { "choices": [
        { "id": "selReceived001", "name": "Received" },
        { "id": "selRequested001", "name": "Requested" },
        { "id": "selComplete001", "name": "Complete" }
      ]}},
      { "type": "singleSelect", "id": "fldICEFOIA001", "name": "ICE FOIA Stage" },
      { "type": "singleSelect", "id": "fldFBIStage001", "name": "FBI Record Stage" },
      { "type": "date", "id": "fldFBIDate001", "name": "FBI Record Date" },
      { "type": "url", "id": "fldFBILink001", "name": "FBI Hyperlink" },
      { "type": "url", "id": "fldUSCISFOIALink001", "name": "USCIS FOIA Link" },
      { "type": "multilineText", "id": "fldFOIANotes001", "name": "FOIA Notes" },

      // Appeal fields
      { "type": "singleSelect", "id": "fldAppealStatus001", "name": "Appeal Status", "options": { "choices": [
        { "id": "selPending001", "name": "Pending" },
        { "id": "selFiled001", "name": "Filed" },
        { "id": "selDecided001", "name": "Decided" }
      ]}},
      { "type": "date", "id": "fldAppealDue001", "name": "Appeal Due Date" },
      { "type": "date", "id": "fldAppealReceipt001", "name": "Appeal Receipt Date" },
      { "type": "date", "id": "fldBriefDue001", "name": "Brief Due Date" },
      { "type": "date", "id": "fldBriefFiled001", "name": "Brief Filed Date" },
      { "type": "singleLineText", "id": "fldAppealForum001", "name": "Appeal Forum" },
      { "type": "singleSelect", "id": "fldAppealDecision001", "name": "Appeal Decision" },
      { "type": "date", "id": "fldAppealDecisionDate001", "name": "Appeal Decision Date" },
      { "type": "richText", "id": "fldAppealNotes001", "name": "Appeal Notes" },

      // Bond fields
      { "type": "singleSelect", "id": "fldBondStage001", "name": "Bond Stage" },
      { "type": "singleLineText", "id": "fldBondAmount001", "name": "Amount of Bond" },
      { "type": "date", "id": "fldBondGranted001", "name": "Date Bond Granted" },

      // U-Visa fields
      { "type": "singleSelect", "id": "fldUVisaStatus001", "name": "U-Visa Status" },
      { "type": "date", "id": "fldUVisaCert001", "name": "U-Visa Cert Date" },
      { "type": "date", "id": "fldUVisaReceipt001", "name": "U-Visa Receipt Date" },
      { "type": "singleLineText", "id": "fldUVisaReceiptNum001", "name": "U-Visa Receipt #" },

      // Asylum fields
      { "type": "singleSelect", "id": "fldAsylumStatus001", "name": "Asylum Case Status" },
      { "type": "date", "id": "fldI589Filed001", "name": "I-589 Filed/Receipt Date" },
      { "type": "date", "id": "fldAsylumInterview001", "name": "Asylum Interview Date" },
      { "type": "singleLineText", "id": "fldI589Strategy001", "name": "I589 Filing Strategy" },

      // Notes fields
      { "type": "richText", "id": "fldCaseNotes001", "name": "Case Notes" },
      { "type": "multilineText", "id": "fldEngagementNotes001", "name": "Engagement Notes" },

      // Button fields
      { "type": "button", "id": "fldInvoiced001", "name": "Invoiced" },
      { "type": "button", "id": "fldBoxLink001", "name": "box link" },
      { "type": "button", "id": "fldFOIAButton001", "name": "FOIA Button" },
      { "type": "button", "id": "fldActivityDetails001", "name": "Activity Details" },
      { "type": "button", "id": "fldAMINO001", "name": "AMINO" },
      { "type": "button", "id": "fldUSCISK001", "name": "USCIS K Button" },
      { "type": "button", "id": "fldCourtK001", "name": "Court K Button" },
      { "type": "button", "id": "fldAppealContract001", "name": "Appeal Contract Button" },

      // Internal/System fields
      { "type": "lastModifiedTime", "id": "fldLastMod001", "name": "Last Modified" },
      { "type": "lastModifiedBy", "id": "fldLastModBy001", "name": "Last Modified By" },
      { "type": "createdTime", "id": "fldCreated001", "name": "Created At" },
      { "type": "formula", "id": "fldRecordId001", "name": "Record ID", "options": { "result": { "type": "singleLineText" } } },
      { "type": "formula", "id": "fldCMVRecordId001", "name": "Case Master View Record ID", "options": { "result": { "type": "singleLineText" } } }
    ]
  }
];

console.log('[MockData] Loaded mock schema with', window.MOCK_SCHEMA.length, 'tables');

/**
 * MOCK GOOGLE CALENDAR DATA
 * Sample calendar events in Google Calendar API format
 * Load this data via window.GOOGLE_CALENDAR_DATA to populate the Events tab
 */
window.GOOGLE_CALENDAR_DATA = [
  {
    "id": "evt001",
    "summary": "Individual Hearing - Immigration Court",
    "start": {
      "dateTime": "2025-02-15T09:00:00-06:00"
    },
    "end": {
      "dateTime": "2025-02-15T11:00:00-06:00"
    },
    "location": "Memphis Immigration Court, 80 Monroe Ave, Memphis, TN 38103",
    "description": "Individual hearing for Maria Rodriguez. Bring all evidence and witnesses. Judge: Hon. Patricia Williams",
    "attendees": [
      { "email": "sarah.johnson@lawfirm.com", "displayName": "Sarah Johnson", "responseStatus": "accepted" },
      { "email": "maria.rodriguez@email.com", "displayName": "Maria Rodriguez", "responseStatus": "accepted" }
    ],
    "organizer": {
      "email": "calendar@lawfirm.com",
      "displayName": "Law Office"
    },
    "htmlLink": "https://calendar.google.com/calendar/event?eid=evt001"
  },
  {
    "id": "evt002",
    "summary": "JDR Court Date - Davidson County",
    "start": {
      "dateTime": "2025-01-28T14:00:00-06:00"
    },
    "end": {
      "dateTime": "2025-01-28T15:30:00-06:00"
    },
    "location": "Davidson County Juvenile Court, 100 Courthouse Square, Nashville, TN",
    "description": "SIJ custody hearing. Need to bring client and GAL. Documents prepared.",
    "attendees": [
      { "email": "sarah.johnson@lawfirm.com", "displayName": "Sarah Johnson", "responseStatus": "accepted" }
    ],
    "organizer": {
      "email": "calendar@lawfirm.com",
      "displayName": "Law Office"
    },
    "htmlLink": "https://calendar.google.com/calendar/event?eid=evt002"
  },
  {
    "id": "evt003",
    "summary": "Biometrics Appointment - USCIS",
    "start": {
      "dateTime": "2025-02-05T10:30:00-06:00"
    },
    "end": {
      "dateTime": "2025-02-05T11:00:00-06:00"
    },
    "location": "USCIS Nashville Field Office, 711 Broad St, Nashville, TN 37203",
    "description": "Biometrics appointment for I-360 application. Bring appointment notice and ID.",
    "attendees": [
      { "email": "maria.rodriguez@email.com", "displayName": "Maria Rodriguez", "responseStatus": "needsAction" }
    ],
    "organizer": {
      "email": "uscis@uscis.gov",
      "displayName": "USCIS"
    },
    "htmlLink": "https://calendar.google.com/calendar/event?eid=evt003"
  },
  {
    "id": "evt004",
    "summary": "Client Consultation - New Case Review",
    "start": {
      "dateTime": "2025-01-20T15:00:00-06:00"
    },
    "end": {
      "dateTime": "2025-01-20T16:00:00-06:00"
    },
    "location": "Office - Conference Room A",
    "description": "Initial consultation to discuss case strategy and gather documents.",
    "attendees": [
      { "email": "sarah.johnson@lawfirm.com", "displayName": "Sarah Johnson", "responseStatus": "accepted" },
      { "email": "paralegal@lawfirm.com", "displayName": "Lisa Paralegal", "responseStatus": "accepted" }
    ],
    "organizer": {
      "email": "sarah.johnson@lawfirm.com",
      "displayName": "Sarah Johnson"
    },
    "htmlLink": "https://calendar.google.com/calendar/event?eid=evt004"
  },
  {
    "id": "evt005",
    "summary": "RFE Response Deadline",
    "start": {
      "date": "2025-03-01"
    },
    "end": {
      "date": "2025-03-02"
    },
    "description": "Deadline to respond to Request for Evidence for I-360. Need birth certificate authentication.",
    "organizer": {
      "email": "calendar@lawfirm.com",
      "displayName": "Law Office"
    }
  },
  {
    "id": "evt006",
    "summary": "Brief Due Date - BIA Appeal",
    "start": {
      "date": "2025-03-15"
    },
    "end": {
      "date": "2025-03-16"
    },
    "description": "Appellant's brief due for BIA appeal. Case: A234-567-890",
    "organizer": {
      "email": "calendar@lawfirm.com",
      "displayName": "Law Office"
    }
  },
  {
    "id": "evt007",
    "summary": "Master Calendar Hearing - Past",
    "start": {
      "dateTime": "2024-12-10T09:00:00-06:00"
    },
    "end": {
      "dateTime": "2024-12-10T10:00:00-06:00"
    },
    "location": "Memphis Immigration Court",
    "description": "Initial master calendar hearing. Case continued to individual hearing.",
    "attendees": [
      { "email": "sarah.johnson@lawfirm.com", "displayName": "Sarah Johnson", "responseStatus": "accepted" }
    ],
    "organizer": {
      "email": "calendar@lawfirm.com",
      "displayName": "Law Office"
    },
    "status": "confirmed"
  },
  {
    "id": "evt008",
    "summary": "Document Pickup",
    "start": {
      "dateTime": "2024-11-20T14:00:00-06:00"
    },
    "end": {
      "dateTime": "2024-11-20T14:30:00-06:00"
    },
    "location": "Office",
    "description": "Client to pick up filed documents.",
    "status": "confirmed"
  }
];

console.log('[MockData] Loaded mock Google Calendar data with', window.GOOGLE_CALENDAR_DATA.length, 'events');
