/**
 * MOCK DATA FOR TESTING
 * 
 * This file provides sample data to test the widget without a live webhook.
 * Load this file BEFORE widget.html to use mock data.
 * 
 * Usage:
 *   <script src="mock-data.js"></script>
 *   <script src="config.js"></script>
 *   ... widget.html content ...
 */

window.MOCK_DATA = {
  clientInfo: {
    recordId: "recCLIENT123",
    fields: {
      "Client Name": "Maria Elena Rodriguez Garcia",
      "A#": "234-567-890",
      "DOB": "1995-03-22",
      "Country": "Guatemala",
      "Age": "29",
      "Phone Number": "6155551234",
      "Client Email": "maria.rodriguez@email.com",
      "Address": "123 Main Street, Nashville, TN 37203",
      "Entry Date": "2022-06-15",
      "Entry Status": "EWI",
      "Case Manager": "Sarah Johnson",
      "MCH Attny": "David Chen",
      "Case Tags": "SIJ, USCIS Pending, Priority"
    }
  },
  
  cases: [
    {
      recordId: "recCASE001",
      caseIdentifier: "SIJ - Davidson County",
      fields: {
        "Hearing Date/Time": "2025-02-15T09:00:00",
        "Court/Office": "Memphis Immigration Court",
        "Judge": "Hon. Patricia Williams",
        "SIJ Case Status": "Pending Custody Order",
        "SIJ County": "Davidson",
        "Date Custody Filed": "2024-08-20",
        "SIJ Eligible (child)": "Yes",
        "JDR Ct Date": "2025-01-28",
        "Relief Sought": "Special Immigrant Juvenile Status",
        "File Case Status": "Active",
        "Case Tags": "SIJ, Court",
        "FOIA Receipt": "2024-09-15",
        "FOIA #": "2024-FOI-12345",
        "FOIA PIN #": "847291",
        "USCIS FOIA Stage": "Received",
        "FBI Record Stage": "Requested",
        "Pleadings Due Date": "2025-02-01",
        "NTA Date": "2022-08-15",
        "Master Hearing Notes": "Client appeared with counsel. Case continued for individual hearing.",
        "ICH Prep Notes": "Review country conditions documentation before hearing.",
        "Some New Field 2025": "Value that won't have a semantic mapping"
      }
    },
    {
      recordId: "recCASE002", 
      caseIdentifier: "USCIS - I-360",
      fields: {
        "USCIS Receipt Date": "2024-11-20",
        "USCIS Receipt Number": "SRC2411234567",
        "I-360 Receipt Number": "SRC2411234567",
        "I-360 Mailed Date": "2024-11-15",
        "Current USCIS application": "I-360 (SIJ)",
        "Priority Date (I-360)": "2024-11-20",
        "Biometric Notice Date": "2024-12-05",
        "RFE Due Date": "2025-03-01",
        "RFE/RFI (topic)": "Birth Certificate Authentication",
        "Relief Sought": "Special Immigrant Juvenile Status",
        "File Case Status": "Active",
        "USCIS Notes": "Biometrics completed 12/10/2024. Awaiting adjudication.",
        "EAD Stage": "Filed",
        "EAD Receipt Date": "2024-11-20",
        "EAD Eligible Date": "2024-11-20",
        "Another Unrecognized Field": "Random data here",
        "Internal_Tracking_Code": "ABC-XYZ-789"
      }
    },
    {
      recordId: "recCASE003",
      caseIdentifier: "Appeal - BIA",
      fields: {
        "Appeal Status": "Pending",
        "Appeal Due Date": "2025-04-15",
        "Appeal Receipt Date": "2025-01-10",
        "Brief Due Date": "2025-03-15",
        "Appeal Forum": "Board of Immigration Appeals",
        "Appeal Notes": "Appealing denial of motion to change venue.",
        "Relief Sought": "Motion to Reopen"
      }
    }
  ]
};

console.log('Mock data loaded. Widget will use mock data instead of webhook.');
