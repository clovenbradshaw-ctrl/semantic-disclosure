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
 */

const ClientGlanceConfig = {
  
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

    // --- Bond ---
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

    // --- Contact ---
    "Phone Number": {
      role: "phone",
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
    "Address": {
      role: "address",
      group: "Contact",
      template: "{value}",
      priority: 3
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
      "Created At",
      "Created date",
      "Created Airtable Record",
      "createdTime",
      "Last Modified",
      "Last Modified By",
      "Airtable_Last_Modified",

      // Internal IDs and references
      /^.*_ID.*$/i,
      /_id$/,
      /^Edit Client Info/,
      /^Client_ID/,
      /^PP ID/,
      /^Hearing Event ID/,
      /^Event Ids/,
      /^Case Events$/,
      /^Data Test/,
      /^Table \d+/,

      // Computed/formula fields
      /^Calculation/,
      /^Field \d+$/,
      /^Push/,
      /^Sync/,
      /Calculator$/,
      /^Est\./,
      /calc$/i,

      // Internal URLs and generators
      /Gen$/,
      /Track Link$/,
      /Email Writer$/,

      // Rollup/lookup duplicates
      /\(from.*\)$/,

      // Error-prone computed fields
      "Family Name (Pretty)",
      "Client Name (Pretty)",
      "Good Date Field",

      // Search/internal fields
      "Name Search Options",

      // Timestamps that duplicate other fields
      "Today Date",
      "Update Tracker EADs",
      "Update Tracker EAD Pers",
      "engagementNoteLastModified",
      "Compiled Notes",
      "Soonest Event",
      "Recent Hearing",

      // Tester fields
      /^TESTER/,
      /^Audit/
    ],

    // Maximum fields to show per group before collapsing
    maxFieldsPerGroup: 8,

    // Date format
    dateFormat: { year: 'numeric', month: 'short', day: 'numeric' },
    dateTimeFormat: { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }
  },

  // ==========================================================================
  // MAIN TABS CONFIGURATION
  // Organizes data by source table into tabs
  // Users can customize which fields to show (stored in localStorage)
  // ==========================================================================

  MAIN_TABS: {
    client: {
      id: 'client',
      label: 'Client Info',
      icon: '👤',
      sourceTables: ['Client Info'],
      // Default fields to show (field names from Airtable)
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
        'Case Manager',
        'ICH Atty',
        'Place of Entry',
        'Entry Date'
      ],
      // Fields that are always hidden (internal/computed)
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
    },
    cases: {
      id: 'cases',
      label: 'Cases',
      icon: '📁',
      sourceTables: ['Case Master View'],
      defaultFields: [
        'Client Name',
        'Case Type',
        'File Case Status',
        'Asylum Case Status',
        'Case Tags',
        'Court/Office',
        'Judge',
        'Hearing Date/Time',
        'Hearing Type',
        'Relief Sought',
        'Merits Final Decision',
        'Merits Final Decision Date',
        'Appeal Status',
        'SIJ Case Status',
        'USCIS Receipt Number',
        'FBI Record Stage',
        'Case Notes'
      ],
      alwaysHidden: [
        'Edit Client Info',
        'AMINO',
        'Invoiced',
        'Audit25-Q1',
        'OYD Calculator',
        'OYD'
      ]
    },
    events: {
      id: 'events',
      label: 'Events',
      icon: '📅',
      sourceTables: ['Events'],
      defaultFields: [
        'Event Name',
        'Hearing Date/Time',
        'Event Hearing Type',
        'Court/Office',
        'Judge',
        'MCH Attny',
        'DHS ACC',
        'Client Notice Date',
        '10 day Client Notice',
        'Supplement Filed Date',
        'Hearing Notes',
        'Court Action Items',
        'Archive Status'
      ],
      alwaysHidden: [
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
      sourceTables: ['Applications'],
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
        'NVC Case Number',
        'Cert County/State',
        'Notes',
        'Tracking Number'
      ],
      alwaysHidden: [
        'Amino',
        'Edit Client Info',
        'Created By'
      ]
    }
  },

  // LocalStorage key for user field preferences
  STORAGE_KEY: 'clientGlance_fieldPrefs'
};

// Export for use in widget
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ClientGlanceConfig;
}
