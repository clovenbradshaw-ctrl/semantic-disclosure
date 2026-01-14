/**
 * CLIENT GLANCE - DEFINITION LAYER
 *
 * This file controls how fields are interpreted and displayed.
 * Update this file when Airtable fields change.
 *
 * MAINTENANCE GUIDE:
 * - Field renamed? Update the fieldName in SEMANTIC_ROLES
 * - New field added? Add to SEMANTIC_ROLES or let it fall through to pattern matching
 * - New case type? Add patterns to FIELD_GROUPS
 * - Want prettier sentences? Edit the template in SEMANTIC_ROLES
 *
 * ARCHITECTURE:
 * - MATTER_TYPES: Define case types (Asylum, SIJ, etc.) and their detection rules
 * - SEMANTIC_TUPLES: Group related fields into coherent display units
 * - FIELD_CLASSIFICATION: Distinguish meaningful data from structural plumbing
 * - FIELD_PRIORITY_TIERS: Define which fields are most important
 */

const ClientGlanceConfig = {

  // ==========================================================================
  // MATTER TYPES - Case type definitions
  // Each matter type represents a distinct legal proceeding
  // ==========================================================================

  MATTER_TYPES: {
    asylum: {
      id: 'asylum',
      label: 'Asylum',
      shortLabel: 'ASY',
      color: '#0369a1', // blue
      // Patterns to detect this matter type from case name/description
      detectPatterns: [/asylum/i, /i-589/i, /defensive/i, /affirmative/i],
      // Status field for this matter
      statusField: 'Asylum Case Status',
      // Fields that belong to this matter type
      relatedFields: [
        'Asylum Case Status', 'I-589 Filed/Receipt Date', 'Asylum Interview Date',
        'I589 Filing Strategy', 'I589 Biom Status', 'Asylum Intake Status',
        'Aff. I589 Receipt #', 'I-589 Venue', 'I589 Sent in Mail Date', 'I589 Mail Status'
      ]
    },
    sij: {
      id: 'sij',
      label: 'SIJ',
      shortLabel: 'SIJ',
      color: '#15803d', // green
      detectPatterns: [/\bsij\b/i, /juvenile/i, /custody/i, /jdr/i],
      statusField: 'SIJ Case Status',
      relatedFields: [
        'SIJ Case Status', 'SIJ Case Status (Revised)', 'SIJ County', 'SIJ Eligible (child)',
        'Date Custody Filed', 'SIJS Decision', 'SIJ Engaged Date', 'JDR Ct Date'
      ]
    },
    uvisa: {
      id: 'uvisa',
      label: 'U-Visa',
      shortLabel: 'U',
      color: '#7c3aed', // purple
      detectPatterns: [/u-visa/i, /u visa/i, /uvisa/i],
      statusField: 'U-Visa Status',
      relatedFields: [
        'U-Visa Status', 'U-Visa Cert Date', 'U-Visa Receipt Date',
        'U-Visa Prima Facie', 'U-Visa Approval Date', 'U-Visa Certification Status'
      ]
    },
    bond: {
      id: 'bond',
      label: 'Bond',
      shortLabel: 'BND',
      color: '#b45309', // amber
      detectPatterns: [/bond/i, /detention/i],
      statusField: 'Bond Stage',
      relatedFields: [
        'Bond Stage', 'Amount of Bond', 'Date Bond Granted', 'Bond Status'
      ]
    },
    family: {
      id: 'family',
      label: 'Family Petition',
      shortLabel: 'FAM',
      color: '#be123c', // rose
      detectPatterns: [/family/i, /i-130/i, /petition/i, /fam\./i],
      statusField: null,
      relatedFields: []
    },
    removal: {
      id: 'removal',
      label: 'Removal Defense',
      shortLabel: 'REM',
      color: '#dc2626', // red
      detectPatterns: [/removal/i, /deportation/i, /eoir/i],
      statusField: 'Final IM Case Status',
      relatedFields: []
    }
  },

  // ==========================================================================
  // SEMANTIC TUPLES - Logical groupings of related fields
  // Each tuple represents a coherent unit of information
  // ==========================================================================

  SEMANTIC_TUPLES: {
    // Core Identity Tuple - always show together
    identity: {
      label: 'Client Identity',
      priority: 1,
      fields: [
        { name: 'Client Name', required: true },
        { name: 'A#', required: true },
        { name: 'DOB', format: 'date' },
        { name: 'Age' },
        { name: 'Country' },
        { name: 'Gender' },
        { name: 'Entry Date', format: 'date' },
        { name: 'Entry Status' },
        { name: 'Place of Entry' }
      ]
    },

    // Court/EOIR Tuple
    court: {
      label: 'Court Proceedings',
      priority: 2,
      matterAgnostic: true, // Applies to any matter with court dates
      fields: [
        { name: 'Hearing Date/Time', format: 'datetime', urgency: true },
        { name: 'Court/Office' },
        { name: 'Judge' },
        { name: 'Hearing Type' },
        { name: 'Merits Final Decision' },
        { name: 'Merits Final Decision Date', format: 'date' },
        { name: 'IJ Order detail' },
        { name: 'Pleadings Due Date', format: 'date', urgency: true },
        { name: 'NTA Date', format: 'date' },
        { name: 'Final IM Case Status' }
      ]
    },

    // Asylum Tuple
    asylum: {
      label: 'Asylum Case',
      priority: 3,
      matterType: 'asylum',
      fields: [
        { name: 'Asylum Case Status', displayAs: 'status' },
        { name: 'I-589 Filed/Receipt Date', format: 'date' },
        { name: 'Asylum Interview Date', format: 'date', urgency: true },
        { name: 'I589 Filing Strategy' },
        { name: 'I589 Biom Status' },
        { name: 'Aff. I589 Receipt #' }
      ]
    },

    // SIJ Tuple
    sij: {
      label: 'SIJ Case',
      priority: 4,
      matterType: 'sij',
      fields: [
        { name: 'SIJ Case Status', displayAs: 'status' },
        { name: 'SIJ County' },
        { name: 'JDR Ct Date', format: 'date', urgency: true },
        { name: 'Date Custody Filed', format: 'date' },
        { name: 'SIJS Decision', displayAs: 'status' },
        { name: 'SIJ Eligible (child)' }
      ]
    },

    // U-Visa Tuple
    uvisa: {
      label: 'U-Visa Case',
      priority: 5,
      matterType: 'uvisa',
      fields: [
        { name: 'U-Visa Status', displayAs: 'status' },
        { name: 'U-Visa Cert Date', format: 'date' },
        { name: 'U-Visa Receipt Date', format: 'date' },
        { name: 'U-Visa Prima Facie', format: 'date' },
        { name: 'U-Visa Approval Date', format: 'date' }
      ]
    },

    // EAD/Work Authorization Tuple
    ead: {
      label: 'Work Authorization',
      priority: 6,
      matterAgnostic: true,
      fields: [
        { name: 'EAD Stage', displayAs: 'status' },
        { name: 'EAD Receipt Date', format: 'date' },
        { name: 'EAD Approval Date', format: 'date' },
        { name: 'EAD Sent Date', format: 'date' },
        { name: 'EAD Eligible Date', format: 'date' }
      ]
    },

    // USCIS Applications Tuple
    uscis: {
      label: 'USCIS Applications',
      priority: 7,
      matterAgnostic: true,
      fields: [
        { name: 'Current USCIS application' },
        { name: 'USCIS Receipt Number' },
        { name: 'USCIS Receipt Date', format: 'date' },
        { name: 'I-360 Receipt Number' },
        { name: 'I-360 Approval Date', format: 'date' },
        { name: 'Priority Date (I-360)', format: 'date' },
        { name: 'RFE Due Date', format: 'date', urgency: true },
        { name: 'RFE/RFI (topic)' },
        { name: 'Biometric Notice Date', format: 'date' }
      ]
    },

    // Bond Tuple
    bond: {
      label: 'Bond/Detention',
      priority: 8,
      matterType: 'bond',
      fields: [
        { name: 'Bond Stage', displayAs: 'status' },
        { name: 'Bond Status', displayAs: 'status' },
        { name: 'Amount of Bond', format: 'currency' },
        { name: 'Date Bond Granted', format: 'date' }
      ]
    },

    // Appeals Tuple
    appeals: {
      label: 'Appeals',
      priority: 9,
      matterAgnostic: true,
      fields: [
        { name: 'Appeal Status', displayAs: 'status' },
        { name: 'Appeal Due Date', format: 'date', urgency: true },
        { name: 'Appeal Receipt Date', format: 'date' },
        { name: 'Brief Due Date', format: 'date', urgency: true },
        { name: 'Brief Filed Date', format: 'date' },
        { name: 'Appeal Decision' },
        { name: 'Appeal Forum' }
      ]
    },

    // FOIA/Records Tuple
    foia: {
      label: 'FOIA & Records',
      priority: 10,
      matterAgnostic: true,
      fields: [
        { name: 'FOIA Receipt', format: 'date' },
        { name: 'FOIA #' },
        { name: 'USCIS FOIA Stage', displayAs: 'status' },
        { name: 'ICE FOIA Stage', displayAs: 'status' },
        { name: 'FBI Record Stage', displayAs: 'status' },
        { name: 'FBI Record Date', format: 'date' },
        { name: 'OBIM Record Status', displayAs: 'status' }
      ]
    },

    // Contact Tuple
    contact: {
      label: 'Contact Information',
      priority: 11,
      fields: [
        { name: 'Phone Number', format: 'phone' },
        { name: 'Client Email', format: 'email' },
        { name: 'Address' }
      ]
    },

    // Management Tuple
    management: {
      label: 'Case Management',
      priority: 12,
      fields: [
        { name: 'Case Manager' },
        { name: 'MCH Attny' },
        { name: 'Relief Sought' },
        { name: 'Case Tags' },
        { name: 'File Case Status', displayAs: 'status' }
      ]
    }
  },

  // ==========================================================================
  // FIELD CLASSIFICATION - Semantic vs Structural field detection
  // ==========================================================================

  FIELD_CLASSIFICATION: {
    // Fields that are always structural (never show to users)
    structuralPatterns: [
      // Record IDs and internal references
      /^recordId$/i,
      /^id$/i,
      /_id$/i,
      /^airtable_/i,
      /^PPID$/i,
      /Record ID$/i,
      /^Client ID$/i,
      /^ID$/,  // Integer ID field
      /^Unique ID/i,

      // Link fields (navigation, not data)
      /^Link to /i,
      /^Edit /i,
      /^View /i,
      /^Open /i,
      /^Go to /i,
      /^New.*URL$/i,
      /^New.*UTM$/i,
      /Tab Link$/i,

      // Sync/automation fields
      /sync$/i,
      /^Push/i,
      /^Sync/i,
      /Calculator$/i,
      /^calc$/i,
      /calc$/i,
      /Trigger$/i,
      /^xano/i,
      /^Last.*Update$/i,

      // Internal URLs and pages
      /Softr.*Page/i,
      /Kenect/i,
      /Box.*Link/i,
      /Gmail.*Search/i,
      /Practice.*Panther/i,
      /Details Page$/i,
      /^box_/i,
      /^Box_/i,

      // Lookup/rollup references (usually just IDs or duplicates)
      /\(from.*\)$/,
      /Rollup$/i,
      /Lookup$/i,

      // Search/matching fields
      /Search.*Options/i,
      /Search.*Terms/i,
      /^.*search.*$/i,
      /Message Match$/i,
      /Email Matching$/i,

      // Calculation/formula fields
      /^Calculation/i,
      /^Formula/i,
      /Formula$/i,

      // Sorting/ordering fields
      /^Sorting/i,
      /^sorting/i,

      // HTML/embed fields
      /HTML$/i,
      /^.*embed$/i,
      /Import HTML$/i,
      /Profile HTML$/i,

      // Count/aggregate fields
      /^COUNT/i,

      // SMS/folder fields
      /^sms/i,
      /Folder$/i,

      // Quarter/period fields (usually for reporting)
      /Quarter$/i,

      // Calendar automation fields
      /Calendar Event Create$/i,
      /Compare Address$/i,
      /Concat Relationship$/i,
      /Address Formula$/i,

      // Testing/audit fields
      /^TESTER/i,
      /^Audit/i,
      /^Data Test/i,

      // Auto-generated
      /^Table \d+/,
      /^Field \d+$/,

      // Pretty/URL variants (duplicates of real fields)
      /Pretty.*URL$/i,
      /URL.*Pretty$/i,
      /_Pretty$/i
    ],

    // Airtable field types that are structural
    structuralTypes: [
      'autoNumber',
      'createdBy',
      'lastModifiedBy',
      'count'
    ],

    // Field types that MIGHT be structural (check name patterns)
    maybeStructuralTypes: [
      'formula',
      'rollup',
      'multipleRecordLinks',
      'button'
    ],

    // Patterns that indicate meaningful data (override structural detection)
    meaningfulPatterns: [
      /name/i,
      /status/i,
      /date/i,
      /phone/i,
      /email/i,
      /address/i,
      /country/i,
      /amount/i,
      /notes?$/i,
      /receipt/i,
      /decision/i,
      /judge/i,
      /court/i,
      /hearing/i
    ],

    // Airtable types that are always meaningful
    meaningfulTypes: [
      'singleLineText',
      'multilineText',
      'richText',
      'email',
      'phoneNumber',
      'date',
      'dateTime',
      'currency',
      'singleSelect',
      'multipleSelects',
      'checkbox',
      'attachment'
    ]
  },

  // ==========================================================================
  // FIELD PRIORITY TIERS - Most important fields
  // ==========================================================================

  FIELD_PRIORITY_TIERS: {
    // Tier 1: Critical (Top 8) - Always show in header/summary
    critical: [
      'Client Name',
      'A#',
      'Hearing Date/Time',
      'File Case Status',
      'Court/Office',
      'DOB',
      'Judge',
      'Country'
    ],

    // Tier 2: Important (Next 12) - Show in overview
    important: [
      'Case Type',
      'Relief Sought',
      'Asylum Case Status',
      'SIJ Case Status',
      'EAD Stage',
      'USCIS Receipt Number',
      'Case Manager',
      'Phone Number',
      'Merits Final Decision',
      'Entry Date',
      'I-589 Filed/Receipt Date',
      'Appeal Status'
    ],

    // Fields that should trigger urgency indicators
    urgencyFields: [
      'Hearing Date/Time',
      'Pleadings Due Date',
      'RFE Due Date',
      'Appeal Due Date',
      'Brief Due Date',
      'Asylum Interview Date',
      'JDR Ct Date',
      'EAD Eligible Date'
    ]
  },
  
  // ==========================================================================
  // SEMANTIC ROLES - Tier 1
  // Exact field name → how to narrate it
  // These get the prettiest treatment
  // ==========================================================================
  
  SEMANTIC_ROLES: {
    // --- Identity ---
    "Client Name": {
      role: "client_name",
      group: "Identity",
      template: "{value}",
      priority: 1
    },
    "Full Client Name": {
      role: "client_name_full",
      group: "Identity",
      template: "{value}",
      priority: 1
    },
    "Family Name": {
      role: "family_name",
      group: "Identity",
      template: "{value}",
      priority: 1
    },
    "A#": {
      role: "a_number",
      group: "Identity",
      template: "A# {value}",
      priority: 2
    },
    "DOB": {
      role: "date_of_birth",
      group: "Identity",
      template: "born {value:date}",
      dataType: "date",
      priority: 3
    },
    "Country": {
      role: "country_of_origin",
      group: "Identity",
      template: "from {value}",
      priority: 4
    },
    "Country of Origin": {
      role: "country_of_origin_alt",
      group: "Identity",
      template: "from {value}",
      priority: 4
    },
    "Age": {
      role: "age",
      group: "Identity",
      template: "age {value}",
      priority: 5
    },

    // --- Court Proceedings ---
    "Hearing Date/Time": {
      role: "upcoming_hearing",
      group: "Court",
      template: "hearing on {value:datetime}",
      dataType: "datetime",
      priority: 1,
      narrativePosition: "temporal"
    },
    "Court/Office": {
      role: "court_location",
      group: "Court",
      template: "in {value}",
      priority: 2,
      narrativePosition: "spatial"
    },
    "Judge": {
      role: "assigned_judge",
      group: "Court",
      template: "before {value}",
      priority: 3
    },
    "Merits Final Decision": {
      role: "merits_decision",
      group: "Court",
      template: "merits decision: {value}",
      priority: 4
    },
    "Merits Final Decision Date": {
      role: "merits_decision_date",
      group: "Court",
      template: "decided {value:date}",
      dataType: "date",
      priority: 5
    },
    "IJ Order detail": {
      role: "ij_order",
      group: "Court",
      template: "IJ ordered {value}",
      priority: 6
    },
    "Pleadings Due Date": {
      role: "pleadings_due",
      group: "Court",
      template: "pleadings due {value:date}",
      dataType: "date",
      priority: 7
    },
    "NTA Date": {
      role: "nta_date",
      group: "Court",
      template: "NTA dated {value:date}",
      dataType: "date",
      priority: 8
    },

    // --- SIJ ---
    "SIJ Case Status": {
      role: "sij_status",
      group: "SIJ",
      template: "SIJ {value:lowercase}",
      priority: 1,
      narrativePosition: "status"
    },
    "SIJ Case Status (Revised)": {
      role: "sij_status_revised",
      group: "SIJ",
      template: "SIJ status: {value}",
      priority: 2
    },
    "SIJ County": {
      role: "sij_county",
      group: "SIJ",
      template: "in {value} County",
      priority: 3
    },
    "SIJ Eligible (child)": {
      role: "sij_eligible",
      group: "SIJ",
      template: "SIJ eligible: {value}",
      priority: 4
    },
    "Date Custody Filed": {
      role: "custody_filed",
      group: "SIJ",
      template: "custody filed {value:date}",
      dataType: "date",
      priority: 5
    },
    "SIJS Decision": {
      role: "sij_decision",
      group: "SIJ",
      template: "SIJS {value:lowercase}",
      priority: 6
    },
    "SIJ Engaged Date": {
      role: "sij_engaged",
      group: "SIJ",
      template: "SIJ engaged {value:date}",
      dataType: "date",
      priority: 7
    },
    "JDR Ct Date": {
      role: "jdr_date",
      group: "SIJ",
      template: "JDR court {value:date}",
      dataType: "date",
      priority: 8
    },

    // --- USCIS Applications ---
    "USCIS Receipt Date": {
      role: "uscis_receipt_date",
      group: "USCIS",
      template: "filed {value:date}",
      dataType: "date",
      priority: 1
    },
    "USCIS Receipt Number": {
      role: "uscis_receipt_number",
      group: "USCIS",
      template: "receipt {value}",
      priority: 2
    },
    "I-360 Receipt Number": {
      role: "i360_receipt",
      group: "USCIS",
      template: "I-360 {value}",
      priority: 3
    },
    "I-360 Approval Date": {
      role: "i360_approval",
      group: "USCIS",
      template: "I-360 approved {value:date}",
      dataType: "date",
      priority: 4
    },
    "I-360 Mailed Date": {
      role: "i360_mailed",
      group: "USCIS",
      template: "I-360 mailed {value:date}",
      dataType: "date",
      priority: 5
    },
    "Priority Date (I-360)": {
      role: "priority_date",
      group: "USCIS",
      template: "priority date {value:date}",
      dataType: "date",
      priority: 6
    },
    "RFE Due Date": {
      role: "rfe_due",
      group: "USCIS",
      template: "RFE due {value:date}",
      dataType: "date",
      priority: 7,
      narrativePosition: "temporal"
    },
    "RFE/RFI (topic)": {
      role: "rfe_topic",
      group: "USCIS",
      template: "RFE regarding {value}",
      priority: 8
    },
    "Application Decision Notice Date": {
      role: "decision_notice_date",
      group: "USCIS",
      template: "decision {value:date}",
      dataType: "date",
      priority: 9
    },
    "Biometric Notice Date": {
      role: "biometrics_date",
      group: "USCIS",
      template: "biometrics {value:date}",
      dataType: "date",
      priority: 10
    },
    "Current USCIS application": {
      role: "current_uscis_app",
      group: "USCIS",
      template: "pending {value}",
      priority: 11
    },

    // --- EAD ---
    "EAD Receipt Date": {
      role: "ead_receipt_date",
      group: "EAD",
      template: "EAD filed {value:date}",
      dataType: "date",
      priority: 1
    },
    "EAD Approval Date": {
      role: "ead_approval",
      group: "EAD",
      template: "EAD approved {value:date}",
      dataType: "date",
      priority: 2
    },
    "EAD Stage": {
      role: "ead_stage",
      group: "EAD",
      template: "EAD {value:lowercase}",
      priority: 3
    },
    "EAD Sent Date": {
      role: "ead_sent",
      group: "EAD",
      template: "EAD sent {value:date}",
      dataType: "date",
      priority: 4
    },
    "EAD Eligible Date": {
      role: "ead_eligible",
      group: "EAD",
      template: "EAD eligible {value:date}",
      dataType: "date",
      priority: 5
    },
    "# of EADs": {
      role: "ead_count",
      group: "EAD",
      template: "{value} EADs",
      priority: 6
    },

    // --- FOIA ---
    "FOIA Receipt": {
      role: "foia_receipt",
      group: "FOIA",
      template: "FOIA received {value:date}",
      dataType: "date",
      priority: 1
    },
    "FOIA #": {
      role: "foia_number",
      group: "FOIA",
      template: "FOIA #{value}",
      priority: 2
    },
    "FOIA PIN #": {
      role: "foia_pin",
      group: "FOIA",
      template: "PIN {value}",
      priority: 3
    },
    "FOIA CD Date": {
      role: "foia_cd_date",
      group: "FOIA",
      template: "FOIA CD {value:date}",
      dataType: "date",
      priority: 4
    },
    "USCIS FOIA Stage": {
      role: "uscis_foia_stage",
      group: "FOIA",
      template: "USCIS FOIA {value:lowercase}",
      priority: 5
    },
    "ICE FOIA Stage": {
      role: "ice_foia_stage",
      group: "FOIA",
      template: "ICE FOIA {value:lowercase}",
      priority: 6
    },
    "FBI Record Stage": {
      role: "fbi_stage",
      group: "FOIA",
      template: "FBI {value:lowercase}",
      priority: 7
    },
    "FBI Record Date": {
      role: "fbi_date",
      group: "FOIA",
      template: "FBI records {value:date}",
      dataType: "date",
      priority: 8
    },
    "FBI Print Record Sent": {
      role: "fbi_sent",
      group: "FOIA",
      template: "FBI sent {value:date}",
      dataType: "date",
      priority: 9
    },
    "FBI Req Type": {
      role: "fbi_req_type",
      group: "FOIA",
      template: "FBI {value}",
      priority: 10
    },
    "OBIM Record Status": {
      role: "obim_status",
      group: "FOIA",
      template: "OBIM {value:lowercase}",
      priority: 11
    },

    // --- Appeals ---
    "Appeal Status": {
      role: "appeal_status",
      group: "Appeals",
      template: "appeal {value:lowercase}",
      priority: 1,
      narrativePosition: "status"
    },
    "Appeal Due Date": {
      role: "appeal_due",
      group: "Appeals",
      template: "appeal due {value:date}",
      dataType: "date",
      priority: 2,
      narrativePosition: "temporal"
    },
    "Appeal Receipt Date": {
      role: "appeal_receipt",
      group: "Appeals",
      template: "appeal filed {value:date}",
      dataType: "date",
      priority: 3
    },
    "Brief Due Date": {
      role: "brief_due",
      group: "Appeals",
      template: "brief due {value:date}",
      dataType: "date",
      priority: 4,
      narrativePosition: "temporal"
    },
    "Brief Filed Date": {
      role: "brief_filed",
      group: "Appeals",
      template: "brief filed {value:date}",
      dataType: "date",
      priority: 5
    },
    "Appeal Decision": {
      role: "appeal_decision",
      group: "Appeals",
      template: "appeal {value:lowercase}",
      priority: 6
    },
    "Appeal Decision Date": {
      role: "appeal_decision_date",
      group: "Appeals",
      template: "decided {value:date}",
      dataType: "date",
      priority: 7
    },
    "Appeal Forum": {
      role: "appeal_forum",
      group: "Appeals",
      template: "at {value}",
      priority: 8
    },

    // --- U-Visa ---
    "U-Visa Status": {
      role: "uvisa_status",
      group: "U-Visa",
      template: "U-Visa {value:lowercase}",
      priority: 1
    },
    "U-Visa Cert Date": {
      role: "uvisa_cert_date",
      group: "U-Visa",
      template: "certified {value:date}",
      dataType: "date",
      priority: 2
    },
    "U-Visa Receipt Date": {
      role: "uvisa_receipt",
      group: "U-Visa",
      template: "U-Visa filed {value:date}",
      dataType: "date",
      priority: 3
    },
    "U-Visa Prima Facie": {
      role: "uvisa_prima_facie",
      group: "U-Visa",
      template: "prima facie {value:date}",
      dataType: "date",
      priority: 4
    },
    "U-Visa Approval Date": {
      role: "uvisa_approval",
      group: "U-Visa",
      template: "U-Visa approved {value:date}",
      dataType: "date",
      priority: 5
    },
    "U-Visa Certification Status": {
      role: "uvisa_cert_status",
      group: "U-Visa",
      template: "certification {value:lowercase}",
      priority: 6
    },

    // --- Applications (generic) ---
    "Name": {
      role: "app_name",
      group: "Applications",
      template: "{value}",
      priority: 1
    },
    "Application": {
      role: "app_form",
      group: "Applications",
      template: "{value}",
      priority: 2
    },
    "Application Type": {
      role: "app_type",
      group: "Applications",
      template: "{value}",
      priority: 2
    },
    "Receipt Number": {
      role: "receipt_number",
      group: "Applications",
      template: "receipt #{value}",
      priority: 3
    },
    "Receipt Date": {
      role: "app_receipt_date",
      group: "Applications",
      template: "received {value:date}",
      dataType: "date",
      priority: 4
    },
    "Filing Date": {
      role: "filing_date",
      group: "Applications",
      template: "filed {value:date}",
      dataType: "date",
      priority: 5
    },
    "Sent Out": {
      role: "app_sent_date",
      group: "Applications",
      template: "sent {value:date}",
      dataType: "date",
      priority: 6
    },
    "Decision": {
      role: "app_decision",
      group: "Applications",
      template: "decision: {value}",
      priority: 7
    },
    "Decision Notice Date": {
      role: "decision_notice_date",
      group: "Applications",
      template: "decision {value:date}",
      dataType: "date",
      priority: 8
    },
    "Prima Facie": {
      role: "prima_facie_date",
      group: "Applications",
      template: "prima facie {value:date}",
      dataType: "date",
      priority: 9
    },
    "RFE Date": {
      role: "rfe_date",
      group: "Applications",
      template: "RFE issued {value:date}",
      dataType: "date",
      priority: 10
    },
    "RFE Response Due": {
      role: "rfe_response_due",
      group: "Applications",
      template: "RFE due {value:date}",
      dataType: "date",
      priority: 11,
      narrativePosition: "temporal"
    },
    "RFE/RFI (Topic)": {
      role: "rfe_topic_app",
      group: "Applications",
      template: "RFE: {value}",
      priority: 12
    },
    "Biometrics Date": {
      role: "biometrics_date",
      group: "Applications",
      template: "biometrics {value:date}",
      dataType: "date",
      priority: 13
    },
    "Status": {
      role: "app_status",
      group: "Applications",
      template: "{value}",
      priority: 14,
      narrativePosition: "status"
    },
    "Active": {
      role: "app_active",
      group: "Applications",
      template: "active: {value}",
      priority: 15
    },

    // --- Asylum ---
    "Asylum Case Status": {
      role: "asylum_status",
      group: "Asylum",
      template: "asylum {value:lowercase}",
      priority: 1,
      narrativePosition: "status"
    },
    "I-589 Filed/Receipt Date": {
      role: "i589_filed",
      group: "Asylum",
      template: "I-589 filed {value:date}",
      dataType: "date",
      priority: 2
    },
    "Asylum Interview Date": {
      role: "asylum_interview",
      group: "Asylum",
      template: "interview {value:date}",
      dataType: "date",
      priority: 3,
      narrativePosition: "temporal"
    },
    "I589 Filing Strategy": {
      role: "i589_strategy",
      group: "Asylum",
      template: "strategy: {value}",
      priority: 4
    },
    "I589 Biom Status": {
      role: "i589_biom_status",
      group: "Asylum",
      template: "biometrics {value:lowercase}",
      priority: 5
    },
    "Asylum Intake Status": {
      role: "asylum_intake_status",
      group: "Asylum",
      template: "intake: {value}",
      priority: 6
    },
    "Aff. I589 Receipt #": {
      role: "i589_aff_receipt",
      group: "Asylum",
      template: "I-589 receipt {value}",
      priority: 7
    },

    // --- Case Outcomes ---
    "Final IM Case Status": {
      role: "final_case_status",
      group: "Court",
      template: "{value}",
      priority: 12,
      narrativePosition: "status"
    },
    "Verified Inventory Case": {
      role: "inventory_status",
      group: "Court",
      template: "inventory: {value}",
      priority: 13
    },

    // --- Bond/Detention ---
    "Bond Stage": {
      role: "bond_stage",
      group: "Bond",
      template: "bond {value:lowercase}",
      priority: 1
    },
    "Amount of Bond": {
      role: "bond_amount",
      group: "Bond",
      template: "${value} bond",
      priority: 2
    },
    "Date Bond Granted": {
      role: "bond_granted",
      group: "Bond",
      template: "bond granted {value:date}",
      dataType: "date",
      priority: 3
    },
    "Bond Status": {
      role: "bond_status",
      group: "Bond",
      template: "bond {value:lowercase}",
      priority: 4
    },
    "Detained": {
      role: "detained_status",
      group: "Bond",
      template: "detained: {value}",
      priority: 5
    },
    "Detainment Status / Location": {
      role: "detention_location",
      group: "Bond",
      template: "at {value}",
      priority: 6
    },

    // --- Contact ---
    "Phone Number": {
      role: "phone",
      group: "Contact",
      template: "{value:phone}",
      dataType: "phone",
      priority: 1
    },
    "Phone": {
      role: "phone_alt",
      group: "Contact",
      template: "{value:phone}",
      dataType: "phone",
      priority: 1
    },
    "Client Email": {
      role: "email",
      group: "Contact",
      template: "{value}",
      priority: 2
    },
    "Email": {
      role: "email_alt",
      group: "Contact",
      template: "{value}",
      priority: 2
    },
    "Address": {
      role: "address",
      group: "Contact",
      template: "{value}",
      priority: 3
    },
    "Assigned Users Emails": {
      role: "assigned_staff",
      group: "Contact",
      template: "assigned to {value}",
      priority: 4
    },

    // --- Case Management ---
    "Case Manager": {
      role: "case_manager",
      group: "Management",
      template: "CM: {value}",
      priority: 1
    },
    "MCH Attny": {
      role: "attorney",
      group: "Management",
      template: "attorney: {value}",
      priority: 2
    },
    "Relief Sought": {
      role: "relief_sought",
      group: "Management",
      template: "seeking {value}",
      priority: 3
    },
    "Case Tags": {
      role: "case_tags",
      group: "Management",
      template: "{value}",
      priority: 4
    },
    "File Case Status": {
      role: "file_status",
      group: "Management",
      template: "file {value:lowercase}",
      priority: 5
    },
    "Intake Manager": {
      role: "intake_manager",
      group: "Management",
      template: "intake: {value}",
      priority: 6
    },
    "Matter": {
      role: "matter_description",
      group: "Management",
      template: "{value}",
      priority: 7
    },
    "Description": {
      role: "case_description",
      group: "Management",
      template: "{value}",
      priority: 8
    },

    // --- Entry/Immigration Status ---
    "Entry Date": {
      role: "entry_date",
      group: "Identity",
      template: "entered {value:date}",
      dataType: "date",
      priority: 6
    },
    "Entry Status": {
      role: "entry_status",
      group: "Identity",
      template: "entry: {value}",
      priority: 7
    },
    "Place of Entry": {
      role: "place_of_entry",
      group: "Identity",
      template: "at {value}",
      priority: 8
    },

    // --- Asylum (additional fields) ---
    "I589 Filing Strategy": {
      role: "i589_strategy",
      group: "Asylum",
      template: "strategy: {value}",
      priority: 4
    },
    "I-589 Venue": {
      role: "i589_venue",
      group: "Asylum",
      template: "venue: {value}",
      priority: 5
    },
    "I589 Sent in Mail Date": {
      role: "i589_sent",
      group: "Asylum",
      template: "I-589 mailed {value:date}",
      dataType: "date",
      priority: 6
    },
    "I589 Mail Status": {
      role: "i589_mail_status",
      group: "Asylum",
      template: "mail {value:lowercase}",
      priority: 7
    },

    // --- Court (additional fields) ---
    "Judge text": {
      role: "judge_name",
      group: "Court",
      template: "before {value}",
      priority: 3
    },
    "Hearing Type": {
      role: "hearing_type",
      group: "Court",
      template: "{value} hearing",
      priority: 4
    },
    "Court File Type": {
      role: "court_file_type",
      group: "Court",
      template: "{value}",
      priority: 9
    },
    "City Court In": {
      role: "court_city",
      group: "Court",
      template: "in {value}",
      priority: 10
    },
    "Days to Next Hearing": {
      role: "days_to_hearing",
      group: "Court",
      template: "{value} days until hearing",
      priority: 11
    },

    // --- Financial ---
    "Initial Retainer $": {
      role: "initial_retainer",
      group: "Financial",
      template: "retainer: ${value}",
      priority: 1
    },
    "Monthly Pmt $": {
      role: "monthly_payment",
      group: "Financial",
      template: "monthly: ${value}",
      priority: 2
    },
    "Total Contract $": {
      role: "total_contract",
      group: "Financial",
      template: "total: ${value}",
      priority: 3
    }
  },

  // ==========================================================================
  // FIELD GROUP PATTERNS - Tier 2 Fallback
  // Regex patterns to categorize fields not in SEMANTIC_ROLES
  // Order matters - first match wins
  // ==========================================================================

  FIELD_GROUP_PATTERNS: [
    { group: "Calendar", pattern: /calendar|gcal|appointment|meeting|schedule/i },
    { group: "Court", pattern: /hearing|court|judge|eoir|ich|merits|pleading|nta/i },
    { group: "SIJ", pattern: /sij|custody|jdr|juvenile/i },
    { group: "USCIS", pattern: /uscis|i-\d{3}|receipt|biometric|rfe|rfi/i },
    { group: "EAD", pattern: /ead|work.*auth|employment.*auth/i },
    { group: "FOIA", pattern: /foia|fbi|obim|ice.*record|cbp.*record/i },
    { group: "Appeals", pattern: /appeal|brief|bia|bria/i },
    { group: "U-Visa", pattern: /u-visa|u visa|uvisa|certification/i },
    { group: "Asylum", pattern: /asylum|i-589|credible.*fear|fear.*interview/i },
    { group: "Bond", pattern: /bond|detention|ice.*custody/i },
    { group: "TPS", pattern: /tps|temporary.*protected/i },
    { group: "DACA", pattern: /daca|deferred.*action/i },
    { group: "Travel", pattern: /i-131|travel.*parole|advance.*parole/i },
    { group: "Contact", pattern: /phone|email|address|city|state|zip/i },
    { group: "Identity", pattern: /name|dob|birth|age|country|a#|a-number/i },
    { group: "Management", pattern: /manager|attorney|atty|assigned|status|tag/i },
    { group: "Documents", pattern: /document|file|box|link|url|scan/i },
    { group: "Dates", pattern: /date|time|deadline|due/i },
    { group: "Financial", pattern: /contract|payment|invoice|fee|retainer/i }
  ],

  // ==========================================================================
  // DATA TYPE INFERENCE - For Tier 2/3 formatting
  // ==========================================================================

  DATA_TYPE_PATTERNS: [
    { type: "date", pattern: /^\d{4}-\d{2}-\d{2}$/ },
    { type: "datetime", pattern: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/ },
    { type: "phone", pattern: /^[\d\s\-\(\)\+]+$/, minLength: 10 },
    { type: "email", pattern: /@/ },
    { type: "url", pattern: /^https?:\/\// },
    { type: "currency", pattern: /^\$?[\d,]+\.?\d*$/ },
    { type: "boolean", pattern: /^(true|false|yes|no|checked|unchecked)$/i },
    { type: "receipt", pattern: /^[A-Z]{3}\d{10,}$/i }
  ],

  // ==========================================================================
  // NARRATIVE COMPOSITION RULES
  // How to assemble Tier 1 fields into sentences
  // ==========================================================================

  NARRATIVE_TEMPLATES: {
    // Identity sentence - always first
    identity: {
      order: 1,
      compose: (fields, pronouns) => {
        const name = fields.find(f => f.role === 'client_name');
        const aNum = fields.find(f => f.role === 'a_number');
        const dob = fields.find(f => f.role === 'date_of_birth');
        const country = fields.find(f => f.role === 'country_of_origin');
        const age = fields.find(f => f.role === 'age');

        if (!name) return null;

        let parts = [name.rendered];
        if (aNum) parts.push(`(${aNum.rendered})`);
        if (dob) parts.push(dob.rendered);
        if (country) parts.push(country.rendered);

        return parts.join(' ');
      }
    },

    // Upcoming events - temporal urgency
    temporal: {
      order: 2,
      compose: (fields, pronouns = { subject: 'They' }) => {
        const temporalFields = fields
          .filter(f => f.narrativePosition === 'temporal')
          .filter(f => {
            if (f.dataType === 'date' || f.dataType === 'datetime') {
              try {
                return new Date(f.value) >= new Date();
              } catch { return true; }
            }
            return true;
          })
          .sort((a, b) => new Date(a.value) - new Date(b.value));

        if (temporalFields.length === 0) return null;

        const next = temporalFields[0];
        // Use "has" for They (plural agreement in formal usage) or singular
        const verb = pronouns.subject === 'They' ? 'have' : 'has';
        let sentence = `${pronouns.subject} ${verb} ${next.rendered}`;

        // Add location if available
        const location = fields.find(f => f.narrativePosition === 'spatial');
        if (location && next.group === location.group) {
          sentence += ` ${location.rendered}`;
        }

        return sentence;
      }
    },

    // Case statuses
    status: {
      order: 3,
      compose: (fields, pronouns) => {
        const statusFields = fields.filter(f => f.narrativePosition === 'status');
        if (statusFields.length === 0) return null;

        const grouped = {};
        statusFields.forEach(f => {
          if (!grouped[f.group]) grouped[f.group] = [];
          grouped[f.group].push(f);
        });

        const sentences = Object.entries(grouped).map(([group, items]) => {
          if (items.length === 1) {
            return items[0].rendered;
          }
          return `${group}: ${items.map(i => i.rendered).join(', ')}`;
        });

        return sentences.join('. ');
      }
    }
  },

  // ==========================================================================
  // GROUP DISPLAY ORDER
  // Controls the order groups appear in structured view
  // ==========================================================================

  GROUP_ORDER: [
    "Identity",
    "Court",
    "SIJ",
    "USCIS",
    "Applications",
    "EAD",
    "Asylum",
    "U-Visa",
    "Appeals",
    "Bond",
    "FOIA",
    "TPS",
    "DACA",
    "Travel",
    "Contact",
    "Management",
    "Financial",
    "Documents",
    "Dates",
    "Uncategorized"
  ],

  // ==========================================================================
  // DISPLAY SETTINGS
  // ==========================================================================

  DISPLAY: {
    // Fields to always show in header regardless of tier
    headerFields: ["client_name", "a_number", "date_of_birth", "country_of_origin"],

    // Fields to hide from display (internal/computed)
    hiddenFields: [
      // Record metadata
      "Record ID",
      "Case Master View Record ID",
      "Case Master View // Activities",
      "Created At",
      "Created date",
      "Created Date",
      "Created Airtable Record",
      "createdTime",
      "Created",
      "Last Modified",
      "Last Modified By",
      "Airtable_Last_Modified",
      "Created Quarter",

      // Internal IDs and references
      /^.*_ID.*$/i,
      /_id$/,
      /^Edit Client Info/,
      /^Client_ID/,
      /^Client ID$/,
      /^PP ID/,
      /^PPID$/,
      /^Hearing Event ID/,
      /^Event Ids/,
      /^Case Events$/,
      /^Data Test/,
      /^Table \d+/,
      /^ID$/,
      /^Unique ID/,
      "recordId",
      "airtable_client_info_id",

      // Computed/formula fields
      /^Calculation/,
      /^Field \d+$/,
      /^Push/,
      /^Sync/,
      /Calculator$/,
      /^Est\./,
      /calc$/i,
      "Email Blank Formula",
      "Address Formula",
      "Compare Address",
      "Concat Relationship",

      // Internal URLs and generators
      /Gen$/,
      /Track Link$/,
      /Email Writer$/,
      "Client Details Page",
      "Open Client Page",
      "Softr Client Page",
      "New case note URL",
      "New Client Event UTM",
      "Relationship Tab Link",
      "Calendar Event Create",

      // Box/external storage
      /^box_/,
      /^Box_/,
      "box_shared_link",
      "box_embed",
      "Box_Folder_ID",
      "Last Box URL Update",

      // Rollup/lookup duplicates
      /\(from.*\)$/,
      /Rollup$/,
      /Lookup$/,

      // Search/matching fields
      "Name Search Options",
      "name search 2.0",
      "Phone search options",
      "Gmail_Search_Terms",
      "JSON for Email Matching",
      "SMS Message Match",
      "smsFolder",

      // Sorting/pretty/URL variants
      /Pretty$/,
      /Pretty.*URL$/,
      "Full_Name_Pretty_URL",
      "Full_Name_Normal_Pretty",
      "sortingLastModAndFamily",
      "Sorting 5 day + -",

      // HTML/embed fields
      "Profile HTML",
      "Bahr Import HTML",
      "Address Rich Text Formatted",

      // Sync/trigger fields
      "Sync Date",
      "xanoSyncTrigger",

      // Error-prone computed fields
      "Family Name (Pretty)",
      "Client Name (Pretty)",
      "Good Date Field",

      // Timestamps that duplicate other fields
      "Today Date",
      "Update Tracker EADs",
      "Update Tracker EAD Pers",
      "engagementNoteLastModified",
      "Compiled Notes",
      "Soonest Event",
      "Recent Hearing",
      "Calculation 5",
      "Calculation 12",

      // Tester/audit fields
      /^TESTER/,
      /^Audit/,

      // Count/aggregate fields
      "COUNT as one",

      // Kenect/communication internal
      "Kenect Link",
      "Kenect Thread",

      // Invoice/lookup
      "Invoiced Lookup"
    ],

    // Maximum fields to show per group before collapsing
    maxFieldsPerGroup: 8,

    // Date format
    dateFormat: { year: 'numeric', month: 'short', day: 'numeric' },
    dateTimeFormat: { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }
  },

  // ==========================================================================
  // MAIN TABS CONFIGURATION - NEW ARCHITECTURE
  // Content-centric navigation (not source-table centric)
  // ==========================================================================

  MAIN_TABS: {
    overview: {
      id: 'overview',
      label: 'Overview',
      icon: '📊',
      description: 'Summary view with short narrative and matter cards',
      sourceTables: ['Client Info', 'Case Master View'],
      viewType: 'overview', // Special view type
      defaultFields: [], // Uses FIELD_PRIORITY_TIERS.critical + important
      alwaysHidden: []
    },
    matters: {
      id: 'matters',
      label: 'Matters',
      icon: '📁',
      description: 'Case Master View records organized by matter type',
      sourceTables: ['Case Master View'],
      viewType: 'tupelized', // Display using SEMANTIC_TUPLES
      // Matters are directly tied to Case Master View records
      // Each case tab represents a distinct Case Master View record
      hasSubmenu: true,
      submenuOptions: 'matterTypes', // Dynamically populated from detected matters
      defaultFields: [
        'File Case Status',
        'Asylum Case Status',
        'SIJ Case Status',
        'Court/Office',
        'Judge',
        'Hearing Date/Time',
        'Hearing Type',
        'Relief Sought',
        'Merits Final Decision',
        'Appeal Status',
        'USCIS Receipt Number',
        'EAD Stage'
      ],
      alwaysHidden: [
        'Edit Client Info',
        'AMINO',
        'Invoiced',
        'Audit25-Q1',
        'OYD Calculator',
        'OYD',
        'Client Name' // Already in header
      ]
    },
    hearings: {
      id: 'hearings',
      label: 'Hearings',
      icon: '⚖️',
      description: 'Court hearings and interviews from Hearings-Interviews calendar',
      sourceTables: ['Hearings', 'Google Calendar - Hearings'],
      viewType: 'events', // Same event display format
      showMatterLabels: true,
      groupByUrgency: true,
      defaultFields: [
        'Event Name',
        'Start Date',
        'End Date',
        'Location',
        'Description',
        'Attendees',
        'Calendar Link',
        'Status'
      ],
      alwaysHidden: [
        '_id',
        '_calendarType',
        'created',
        'updated',
        'isAllDay'
      ]
    },
    events: {
      id: 'events',
      label: 'Events',
      icon: '📅',
      description: 'General calendar events - appointments, deadlines, and reminders',
      sourceTables: ['Events', 'Google Calendar - Events'],
      viewType: 'events', // Dedicated events view for Google Calendar data
      // Show matter label on each event
      showMatterLabels: true,
      // Group events by urgency (Urgent, Upcoming, Scheduled, Past)
      groupByUrgency: true,
      defaultFields: [
        'Event Name',
        'Start Date',
        'End Date',
        'Location',
        'Description',
        'Attendees',
        'Calendar Link',
        'Meeting Link',
        'Status'
      ],
      alwaysHidden: [
        '_id',
        '_calendarType',
        'created',
        'updated',
        'isAllDay',
        'AMINO',
        'Audit25-Q1',
        'Push',
        'Archive Event',
        'Edit Client Info',
        'Event Ids',
        'Before Buffer Minutes',
        'Precise Start Time UTC',
        'Last Updated Core Events'
      ]
    },
    applications: {
      id: 'applications',
      label: 'Applications',
      icon: '📋',
      description: 'USCIS filings and status',
      sourceTables: ['Applications'],
      viewType: 'cards', // Card display for each application
      showMatterLabels: true,
      defaultFields: [
        'Name',
        'Application',
        'Status',
        'Active',
        'Receipt Number',
        'Receipt Date',
        'Sent Out',
        'Decision Notice Date',
        'Prima Facie',
        'RFE Due Date',
        'RFE/RFI (Topic)',
        'Notes'
      ],
      alwaysHidden: [
        'Amino',
        'Edit Client Info',
        'Created By'
      ]
    },
    notes: {
      id: 'notes',
      label: 'Notes',
      icon: '📝',
      description: 'Case notes unified across matters',
      sourceTables: ['Case Master View', 'Events'],
      viewType: 'notes', // Unified notes feed with matter labels
      showMatterLabels: true,
      // Fields that contain notes
      noteFields: [
        'Case Notes',
        'Hearing Notes',
        'Court Action Items',
        'Notes',
        'Master Hearing Notes'
      ],
      defaultFields: [
        'Case Notes',
        'Hearing Notes',
        'Court Action Items'
      ],
      alwaysHidden: []
    },
    timeline: {
      id: 'timeline',
      label: 'Timeline',
      icon: '⏱️',
      description: 'All dates from every field, grouped by semantic category',
      sourceTables: ['Client Info', 'Case Master View', 'Hearings', 'Events', 'Applications'],
      viewType: 'timeline',
      showMatterLabels: true,
      // Date fields are now dynamically extracted from ALL fields using SEMANTIC_ROLES
      // The extractAllDateFields() method scans all processed fields for date values
      // and groups them by their semantic group (Court, SIJ, USCIS, EAD, etc.)
      defaultFields: [],
      alwaysHidden: []
    },
    client: {
      id: 'client',
      label: 'Client Info',
      icon: '👤',
      description: 'Contact and demographic information',
      sourceTables: ['Client Info'],
      viewType: 'structured',
      defaultFields: [
        'Client Name',
        'A#',
        'First Name',
        'Family Name',
        'Middle Name',
        'DOB',
        'Age',
        'Country',
        'Phone Number',
        'Client Email',
        'Address',
        'Gender',
        'Pronouns',
        'Place of Entry',
        'Entry Date',
        'Entry Status'
      ],
      alwaysHidden: [
        'recordId',
        'airtable_client_info_id',
        'A_number_airtable',
        'Link to Practice Panther',
        'PracticePanther',
        'Softr Client Page',
        'Client Details Page',
        'Kenect Link',
        'Kenect Thread',
        'AMINO',
        'box_shared_link',
        'Box Sync Start',
        'CMV sync',
        'xanoEngagementNote',
        'bahr_import_flatpack_data',
        'PPID',
        'Created At',
        'Events',
        'Events 2',
        'Edit Client Info'
      ]
    }
  },

  // ==========================================================================
  // NARRATIVE CONFIGURATION - Short and Long narrative templates
  // ==========================================================================

  NARRATIVE_CONFIG: {
    short: {
      maxSentences: 4,
      maxWords: 75,
      sections: ['identity_brief', 'matters_brief', 'next_date', 'ead_brief'],
      // Template: "{name} (A# {a_number}), {age}, from {country}, has {matter_count} active matters..."
    },
    long: {
      maxSentences: null,
      maxWords: null,
      sections: [
        'identity_full',
        'matters_full',
        'ead_full',
        'applications',
        'events',
        'management',
        'notes'
      ]
    }
  },

  // ==========================================================================
  // FIELD DISPLAY TYPES - How to render different value types
  // ==========================================================================

  FIELD_DISPLAY_TYPES: {
    // Short text - single line
    shortText: {
      maxLength: 50,
      truncate: true
    },
    // Long text - expandable
    longText: {
      previewLines: 3,
      expandable: true,
      maxLength: 500
    },
    // Rich text - formatted
    richText: {
      previewLines: 3,
      expandable: true,
      renderMarkdown: true
    },
    // URLs - smart link display
    url: {
      showDomain: true,
      smartIcons: {
        'airtable.com': { icon: '🔗', label: 'Airtable' },
        'softr.io': { icon: '📄', label: 'Softr' },
        'drive.google.com': { icon: '📁', label: 'Drive' },
        'practicepanther': { icon: '📋', label: 'PP' }
      }
    },
    // Dates - smart formatting with urgency
    date: {
      showRelative: true,
      urgencyThresholds: {
        urgent: 7,    // days - red
        upcoming: 30, // days - yellow
        scheduled: 90 // days - green
      }
    },
    // Status - pill/badge
    status: {
      colorMap: {
        active: 'green',
        current: 'green',
        engaged: 'green',
        pending: 'yellow',
        waiting: 'yellow',
        approved: 'blue',
        granted: 'blue',
        complete: 'blue',
        denied: 'red',
        dismissed: 'red',
        closed: 'gray'
      }
    },
    // Contact fields
    phone: {
      format: '(xxx) xxx-xxxx',
      clickable: true
    },
    email: {
      clickable: true
    },
    // Currency
    currency: {
      symbol: '$',
      decimals: 2
    }
  },

  // LocalStorage key for user field preferences
  STORAGE_KEY: 'clientGlance_fieldPrefs',

  // LocalStorage key for view preferences
  VIEW_PREFS_KEY: 'clientGlance_viewPrefs'
};

// Export for use in widget
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ClientGlanceConfig;
}
