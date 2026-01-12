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
    "USCIS FOIA Stage": {
      role: "uscis_foia_stage",
      group: "FOIA",
      template: "USCIS FOIA {value:lowercase}",
      priority: 4
    },
    "ICE FOIA Stage": {
      role: "ice_foia_stage",
      group: "FOIA",
      template: "ICE FOIA {value:lowercase}",
      priority: 5
    },
    "FBI Record Stage": {
      role: "fbi_stage",
      group: "FOIA",
      template: "FBI records {value:lowercase}",
      priority: 6
    },
    "OBIM Record Status": {
      role: "obim_status",
      group: "FOIA",
      template: "OBIM {value:lowercase}",
      priority: 7
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
      priority: 1
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
      priority: 3
    },
    "I589 Filing Strategy": {
      role: "i589_strategy",
      group: "Asylum",
      template: "strategy: {value}",
      priority: 4
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
      compose: (fields) => {
        const name = fields.find(f => f.role === 'client_name');
        const aNum = fields.find(f => f.role === 'a_number');
        const dob = fields.find(f => f.role === 'date_of_birth');
        const country = fields.find(f => f.role === 'country_of_origin');
        
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
      compose: (fields) => {
        const temporalFields = fields
          .filter(f => f.narrativePosition === 'temporal')
          .filter(f => {
            if (f.dataType === 'date' || f.dataType === 'datetime') {
              return new Date(f.value) >= new Date();
            }
            return true;
          })
          .sort((a, b) => new Date(a.value) - new Date(b.value));
        
        if (temporalFields.length === 0) return null;
        
        const next = temporalFields[0];
        let sentence = `has ${next.rendered}`;
        
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
      compose: (fields) => {
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
    headerFields: ["client_name", "a_number", "dob"],
    
    // Fields to hide from display (internal/computed)
    hiddenFields: [
      "Record ID",
      "Created At",
      "Last Modified",
      "Airtable_Last_Modified",
      /^Calculation/,
      /^Field \d+$/,
      /_id$/,
      /^Push/,
      /^Sync/
    ],
    
    // Maximum fields to show per group before collapsing
    maxFieldsPerGroup: 8,
    
    // Date format
    dateFormat: { year: 'numeric', month: 'short', day: 'numeric' },
    dateTimeFormat: { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }
  }
};

// Export for use in widget
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ClientGlanceConfig;
}
