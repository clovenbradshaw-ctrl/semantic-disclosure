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
