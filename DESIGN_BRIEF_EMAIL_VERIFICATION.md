# Email Verification Gate - Design Brief

## Overview

This document specifies the implementation of a 6-digit email verification system to protect the Semantic Disclosure application from unauthorized access. The system ensures that only users with pre-registered email addresses can access client data.

---

## Security Goals

1. **Whitelist-only access** - Only pre-registered emails in Airtable can receive verification codes
2. **Server-side enforcement** - The data API itself rejects requests without valid tokens
3. **Time-limited codes** - Verification codes expire after 10 minutes
4. **Session tokens** - Valid tokens allow access for 7 days before re-verification required
5. **No client-side secrets** - All validation happens server-side; frontend cannot be bypassed

---

## System Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend  │────▶│  /send-code │────▶│  Airtable   │────▶│ Email Svc   │
│   (Browser) │     │  (n8n)      │     │  (Storage)  │     │ (SendGrid)  │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
       │                                       │
       │            ┌─────────────┐            │
       └───────────▶│/verify-code │◀───────────┘
                    │  (n8n)      │
                    └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  Returns    │
                    │  Token      │
                    └─────────────┘
                           │
       ┌───────────────────┘
       ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend  │────▶│  /get-data  │────▶│  Airtable   │
│   (+ Token) │     │  (n8n)      │     │  (Validate) │
└─────────────┘     └─────────────┘     └─────────────┘
```

---

## Airtable Schema

### Option A: Add Fields to Existing Accounts Table

If you have an existing table with client/user emails, add these fields:

| Field Name | Field Type | Description |
|------------|------------|-------------|
| `Email` | Email | **Existing** - The whitelist of authorized emails |
| `Verification_Code` | Single line text | 6-digit code (e.g., "482917") |
| `Code_Expires_At` | Date (include time) | When the code becomes invalid |
| `Access_Token` | Single line text | 32-character random token |
| `Token_Expires_At` | Date (include time) | When token expires (re-verification needed) |
| `Last_Verified_At` | Date (include time) | Timestamp of last successful verification |

### Option B: Separate Verification Table

Create a new table `Email_Verification` with:

| Field Name | Field Type | Description |
|------------|------------|-------------|
| `Email` | Email | Primary identifier (must exist in accounts table) |
| `Verification_Code` | Single line text | 6-digit code |
| `Code_Expires_At` | Date (include time) | Code expiry timestamp |
| `Access_Token` | Single line text | 32-character token |
| `Token_Expires_At` | Date (include time) | Token expiry timestamp |
| `Last_Verified_At` | Date (include time) | Audit timestamp |
| `Linked_Account` | Link to Accounts | Reference to main account record |

### Field Constraints

- `Verification_Code`: Exactly 6 numeric digits, stored as string to preserve leading zeros
- `Access_Token`: 32 alphanumeric characters (a-z, A-Z, 0-9)
- All timestamp fields should use ISO 8601 format

---

## Backend API Specifications

### Base URL
```
https://n8n.intelechia.com/webhook/
```

---

### Endpoint 1: Send Verification Code

**Purpose**: Validate email is whitelisted, generate code, send email

**Webhook URL**: `POST /send-verification-code`

**Request**:
```json
{
  "email": "user@example.com"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Verification code sent"
}
```

**Error Responses**:

| Status | Response | Condition |
|--------|----------|-----------|
| 400 | `{ "success": false, "error": "Email is required" }` | Missing email |
| 400 | `{ "success": false, "error": "Invalid email format" }` | Malformed email |
| 403 | `{ "success": false, "error": "Email not registered" }` | Email not in whitelist |
| 429 | `{ "success": false, "error": "Please wait before requesting another code" }` | Rate limit (optional) |
| 500 | `{ "success": false, "error": "Failed to send code" }` | Email service failure |

**n8n Workflow Logic**:

```
1. TRIGGER: Webhook receives POST request

2. VALIDATE INPUT:
   - Check email field exists
   - Validate email format (regex: ^[^\s@]+@[^\s@]+\.[^\s@]+$)

3. CHECK WHITELIST:
   - Query Airtable: Find record where Email = input.email
   - If no record found → Return 403 "Email not registered"

4. GENERATE CODE:
   - Generate random 6-digit number: Math.floor(100000 + Math.random() * 900000)
   - Convert to string (preserves leading zeros conceptually)

5. CALCULATE EXPIRY:
   - Set expiry = current timestamp + 10 minutes
   - Format as ISO 8601: "2024-01-15T14:30:00.000Z"

6. UPDATE AIRTABLE:
   - Update the found record:
     - Verification_Code = generated code
     - Code_Expires_At = calculated expiry

7. SEND EMAIL:
   - To: input.email
   - Subject: "Your Verification Code"
   - Body: (see Email Template section below)

8. RETURN SUCCESS:
   - { "success": true, "message": "Verification code sent" }
```

**Email Template**:
```
Subject: Your Verification Code - Semantic Disclosure

Your verification code is: {{CODE}}

This code will expire in 10 minutes.

If you did not request this code, please ignore this email.

---
This is an automated message. Please do not reply.
```

---

### Endpoint 2: Verify Code & Issue Token

**Purpose**: Validate the code, issue access token

**Webhook URL**: `POST /verify-code`

**Request**:
```json
{
  "email": "user@example.com",
  "code": "482917"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "token": "a8f3k2m9p4q7r1s6t0u3v8w2x5y9z1b4",
  "expiresAt": "2024-01-22T14:30:00.000Z"
}
```

**Error Responses**:

| Status | Response | Condition |
|--------|----------|-----------|
| 400 | `{ "success": false, "error": "Email and code are required" }` | Missing fields |
| 403 | `{ "success": false, "error": "Invalid or expired code" }` | Wrong code or expired |
| 403 | `{ "success": false, "error": "Email not registered" }` | Email not in whitelist |

**n8n Workflow Logic**:

```
1. TRIGGER: Webhook receives POST request

2. VALIDATE INPUT:
   - Check email and code fields exist
   - Validate code is 6 digits

3. FIND RECORD:
   - Query Airtable: Find record where Email = input.email
   - If no record found → Return 403 "Email not registered"

4. VALIDATE CODE:
   - Check: record.Verification_Code === input.code
   - Check: record.Code_Expires_At > current timestamp
   - If either fails → Return 403 "Invalid or expired code"

5. GENERATE TOKEN:
   - Generate 32-character random alphanumeric string
   - Characters: abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789

6. CALCULATE TOKEN EXPIRY:
   - Set expiry = current timestamp + 7 days
   - Format as ISO 8601

7. UPDATE AIRTABLE:
   - Update the record:
     - Verification_Code = "" (clear it)
     - Code_Expires_At = "" (clear it)
     - Access_Token = generated token
     - Token_Expires_At = calculated expiry
     - Last_Verified_At = current timestamp

8. RETURN TOKEN:
   - { "success": true, "token": "...", "expiresAt": "..." }
```

---

### Endpoint 3: Get Data (Modified Existing)

**Purpose**: Return client data ONLY if valid token provided

**Webhook URL**: `GET /get-data` (modify existing data endpoint)

**Request**:
```
GET /webhook/c68fda2a-9302-4efb-930b-7063b85ef595?recordId=recXXX&token=a8f3k2m9...
```

Or via header:
```
GET /webhook/c68fda2a-9302-4efb-930b-7063b85ef595?recordId=recXXX
Authorization: Bearer a8f3k2m9...
```

**Success Response** (200):
```json
{
  // Existing data response - unchanged
}
```

**Error Responses**:

| Status | Response | Condition |
|--------|----------|-----------|
| 401 | `{ "success": false, "error": "Authentication required" }` | No token provided |
| 401 | `{ "success": false, "error": "Invalid or expired token" }` | Bad/expired token |

**n8n Workflow Logic (ADD to existing workflow)**:

```
1. EXTRACT TOKEN:
   - Check query param: ?token=xxx
   - OR check header: Authorization: Bearer xxx

2. VALIDATE TOKEN:
   - If no token → Return 401 "Authentication required"
   - Query Airtable: Find record where Access_Token = token
   - If no record found → Return 401 "Invalid or expired token"
   - If record.Token_Expires_At < current timestamp → Return 401 "Invalid or expired token"

3. PROCEED WITH EXISTING LOGIC:
   - Continue with current data fetch using recordId
   - Return data as normal
```

---

## Frontend Implementation

### New Constants

Add to the constants section (around line 148):

```javascript
// Verification API endpoints
const SEND_CODE_URL = 'https://n8n.intelechia.com/webhook/[YOUR-SEND-CODE-WEBHOOK-ID]';
const VERIFY_CODE_URL = 'https://n8n.intelechia.com/webhook/[YOUR-VERIFY-CODE-WEBHOOK-ID]';

// Verification storage key
const VERIFICATION_STORAGE_KEY = 'semantic-disclosure-auth-v1';
```

### localStorage Schema

```javascript
// Stored under key: 'semantic-disclosure-auth-v1'
{
  "email": "user@example.com",
  "token": "a8f3k2m9p4q7r1s6t0u3v8w2x5y9z1b4",
  "expiresAt": "2024-01-22T14:30:00.000Z"
}
```

### Verification Functions

```javascript
/**
 * Check if user has valid authentication
 * @returns {object|null} Auth data if valid, null if not
 */
function getValidAuth() {
  try {
    const stored = localStorage.getItem(VERIFICATION_STORAGE_KEY);
    if (!stored) return null;

    const auth = JSON.parse(stored);
    const expiresAt = new Date(auth.expiresAt);

    // Check if token is expired (with 1 minute buffer)
    if (expiresAt <= new Date(Date.now() + 60000)) {
      localStorage.removeItem(VERIFICATION_STORAGE_KEY);
      return null;
    }

    return auth;
  } catch (e) {
    localStorage.removeItem(VERIFICATION_STORAGE_KEY);
    return null;
  }
}

/**
 * Store authentication data
 * @param {string} email
 * @param {string} token
 * @param {string} expiresAt - ISO 8601 timestamp
 */
function storeAuth(email, token, expiresAt) {
  localStorage.setItem(VERIFICATION_STORAGE_KEY, JSON.stringify({
    email,
    token,
    expiresAt
  }));
}

/**
 * Clear authentication (logout)
 */
function clearAuth() {
  localStorage.removeItem(VERIFICATION_STORAGE_KEY);
}

/**
 * Request verification code
 * @param {string} email
 * @returns {Promise<{success: boolean, error?: string}>}
 */
async function requestVerificationCode(email) {
  try {
    const response = await fetch(SEND_CODE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim().toLowerCase() })
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, error: 'Network error. Please try again.' };
  }
}

/**
 * Verify code and get token
 * @param {string} email
 * @param {string} code
 * @returns {Promise<{success: boolean, token?: string, expiresAt?: string, error?: string}>}
 */
async function verifyCode(email, code) {
  try {
    const response = await fetch(VERIFY_CODE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        code: code.trim()
      })
    });

    const data = await response.json();

    if (data.success && data.token) {
      storeAuth(email, data.token, data.expiresAt);
    }

    return data;
  } catch (error) {
    return { success: false, error: 'Network error. Please try again.' };
  }
}

/**
 * Get auth token for API requests
 * @returns {string|null}
 */
function getAuthToken() {
  const auth = getValidAuth();
  return auth ? auth.token : null;
}
```

### Modified Data Fetch

Update the existing `init()` function's fetch call to include the token:

```javascript
// In init() function, modify the fetch call:
const token = getAuthToken();
const response = await fetch(`${DATA_URL}?recordId=${recordId}&token=${encodeURIComponent(token)}`);

// Handle 401 responses
if (response.status === 401) {
  clearAuth();
  showVerificationModal();
  return;
}
```

### Verification UI - Modal HTML

Add this modal HTML inside the `<body>` tag, before the `#app` div:

```html
<!-- Email Verification Modal -->
<div id="verification-modal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 hidden items-center justify-center">
  <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">

    <!-- Header -->
    <div class="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 text-white text-center">
      <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      </div>
      <h2 class="text-2xl font-bold">Verification Required</h2>
      <p class="text-blue-100 mt-2">Please verify your email to continue</p>
    </div>

    <!-- Email Step -->
    <div id="email-step" class="p-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
      <input type="email"
             id="verification-email"
             placeholder="Enter your registered email"
             class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
             autocomplete="email">

      <div id="email-error" class="mt-2 text-red-600 text-sm hidden"></div>

      <button id="send-code-btn"
              onclick="handleSendCode()"
              class="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
        <span>Send Verification Code</span>
        <svg id="send-code-spinner" class="hidden animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
      </button>
    </div>

    <!-- Code Step (hidden initially) -->
    <div id="code-step" class="p-6 hidden">
      <p class="text-gray-600 text-sm mb-4">
        We sent a 6-digit code to <strong id="sent-to-email"></strong>
      </p>

      <label class="block text-sm font-medium text-gray-700 mb-2">Verification Code</label>
      <input type="text"
             id="verification-code"
             placeholder="Enter 6-digit code"
             maxlength="6"
             pattern="[0-9]*"
             inputmode="numeric"
             class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-center text-2xl tracking-widest font-mono"
             autocomplete="one-time-code">

      <div id="code-error" class="mt-2 text-red-600 text-sm hidden"></div>

      <button id="verify-code-btn"
              onclick="handleVerifyCode()"
              class="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
        <span>Verify & Continue</span>
        <svg id="verify-code-spinner" class="hidden animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
      </button>

      <div class="mt-4 text-center">
        <button onclick="handleResendCode()"
                id="resend-btn"
                class="text-blue-600 hover:text-blue-800 text-sm font-medium">
          Resend Code
        </button>
        <span class="text-gray-400 mx-2">|</span>
        <button onclick="handleBackToEmail()"
                class="text-gray-600 hover:text-gray-800 text-sm">
          Use different email
        </button>
      </div>
    </div>

  </div>
</div>
```

### Verification UI - JavaScript Handlers

```javascript
// State for verification flow
let verificationEmail = '';

/**
 * Show the verification modal
 */
function showVerificationModal() {
  const modal = document.getElementById('verification-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.getElementById('verification-email').focus();
}

/**
 * Hide the verification modal
 */
function hideVerificationModal() {
  const modal = document.getElementById('verification-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

/**
 * Show email step, hide code step
 */
function showEmailStep() {
  document.getElementById('email-step').classList.remove('hidden');
  document.getElementById('code-step').classList.add('hidden');
}

/**
 * Show code step, hide email step
 */
function showCodeStep() {
  document.getElementById('email-step').classList.add('hidden');
  document.getElementById('code-step').classList.remove('hidden');
  document.getElementById('sent-to-email').textContent = verificationEmail;
  document.getElementById('verification-code').focus();
}

/**
 * Handle send code button click
 */
async function handleSendCode() {
  const emailInput = document.getElementById('verification-email');
  const errorDiv = document.getElementById('email-error');
  const btn = document.getElementById('send-code-btn');
  const spinner = document.getElementById('send-code-spinner');

  const email = emailInput.value.trim().toLowerCase();

  // Validate email format
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errorDiv.textContent = 'Please enter a valid email address';
    errorDiv.classList.remove('hidden');
    return;
  }

  // Clear previous errors
  errorDiv.classList.add('hidden');

  // Show loading state
  btn.disabled = true;
  spinner.classList.remove('hidden');

  try {
    const result = await requestVerificationCode(email);

    if (result.success) {
      verificationEmail = email;
      showCodeStep();
    } else {
      errorDiv.textContent = result.error || 'Failed to send code. Please try again.';
      errorDiv.classList.remove('hidden');
    }
  } finally {
    btn.disabled = false;
    spinner.classList.add('hidden');
  }
}

/**
 * Handle verify code button click
 */
async function handleVerifyCode() {
  const codeInput = document.getElementById('verification-code');
  const errorDiv = document.getElementById('code-error');
  const btn = document.getElementById('verify-code-btn');
  const spinner = document.getElementById('verify-code-spinner');

  const code = codeInput.value.trim();

  // Validate code format
  if (!code || !/^\d{6}$/.test(code)) {
    errorDiv.textContent = 'Please enter a valid 6-digit code';
    errorDiv.classList.remove('hidden');
    return;
  }

  // Clear previous errors
  errorDiv.classList.add('hidden');

  // Show loading state
  btn.disabled = true;
  spinner.classList.remove('hidden');

  try {
    const result = await verifyCode(verificationEmail, code);

    if (result.success) {
      hideVerificationModal();
      // Proceed with app initialization
      init();
    } else {
      errorDiv.textContent = result.error || 'Invalid code. Please try again.';
      errorDiv.classList.remove('hidden');
      codeInput.value = '';
      codeInput.focus();
    }
  } finally {
    btn.disabled = false;
    spinner.classList.add('hidden');
  }
}

/**
 * Handle resend code
 */
async function handleResendCode() {
  const resendBtn = document.getElementById('resend-btn');
  const originalText = resendBtn.textContent;

  resendBtn.disabled = true;
  resendBtn.textContent = 'Sending...';

  try {
    const result = await requestVerificationCode(verificationEmail);

    if (result.success) {
      resendBtn.textContent = 'Code sent!';
      setTimeout(() => {
        resendBtn.textContent = originalText;
        resendBtn.disabled = false;
      }, 3000);
    } else {
      resendBtn.textContent = 'Failed - try again';
      setTimeout(() => {
        resendBtn.textContent = originalText;
        resendBtn.disabled = false;
      }, 2000);
    }
  } catch {
    resendBtn.textContent = originalText;
    resendBtn.disabled = false;
  }
}

/**
 * Handle back to email step
 */
function handleBackToEmail() {
  document.getElementById('verification-code').value = '';
  document.getElementById('code-error').classList.add('hidden');
  showEmailStep();
  document.getElementById('verification-email').focus();
}

// Add enter key handlers
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('verification-email')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSendCode();
  });

  document.getElementById('verification-code')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleVerifyCode();
  });
});
```

### Modified init() Function

Replace the existing `init()` function entry point:

```javascript
/**
 * Application entry point with auth check
 */
async function initWithAuth() {
  // Check for valid authentication
  const auth = getValidAuth();

  if (!auth) {
    // No valid auth - show verification modal
    showVerificationModal();
    return;
  }

  // Has valid auth - proceed with normal init
  await init();
}

/**
 * Modified init() - called after successful verification
 */
async function init() {
  const recordId = getRecordId();

  if (!recordId) {
    renderError('Missing recordId parameter. Please provide a recordId in the URL.');
    return;
  }

  // Get the auth token
  const token = getAuthToken();

  if (!token) {
    showVerificationModal();
    return;
  }

  try {
    // Fetch schema in parallel with data
    const schemaPromise = fetchSchemaAndBuildRegistry();

    // Fetch data WITH the auth token
    const response = await fetch(`${DATA_URL}?recordId=${recordId}&token=${encodeURIComponent(token)}`);

    // Handle authentication errors
    if (response.status === 401) {
      clearAuth();
      showVerificationModal();
      return;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Wait for schema
    await schemaPromise;

    // Process and render
    window.currentData = processDataWithFlatpack(data);
    renderData(window.currentData);

  } catch (error) {
    console.error('Failed to load data:', error);
    renderError('Failed to load data. Please try again later.');
  }
}

// Auto-initialize with auth check
initWithAuth().then(() => {
  // Only start refresh if we're authenticated and have data
  if (getValidAuth() && window.currentData) {
    startRefreshCountdown();
  }
});
```

---

## Security Considerations

### Code Generation
- Use cryptographically secure random number generation
- In n8n JavaScript node: `Math.floor(100000 + Math.random() * 900000).toString()`
- For higher security, use: `crypto.randomInt(100000, 999999).toString()`

### Token Generation
- 32 characters from alphanumeric set = ~190 bits of entropy
- In n8n JavaScript node:
```javascript
const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
let token = '';
for (let i = 0; i < 32; i++) {
  token += chars.charAt(Math.floor(Math.random() * chars.length));
}
return token;
```

### Rate Limiting
Consider implementing rate limits in n8n:
- Max 3 code requests per email per hour
- Max 5 failed verification attempts per email per hour
- Can be implemented with an Airtable field tracking attempts

### Token Storage
- localStorage is accessible to any JavaScript on the same origin
- For higher security, consider HttpOnly cookies (requires backend support)
- Current approach is acceptable for this use case

---

## Testing Checklist

### Send Code Endpoint
- [ ] Returns success for whitelisted email
- [ ] Returns 403 for non-whitelisted email
- [ ] Returns 400 for missing/invalid email
- [ ] Code is stored in Airtable
- [ ] Email is actually sent
- [ ] Code expires after 10 minutes

### Verify Code Endpoint
- [ ] Returns token for correct code
- [ ] Returns 403 for wrong code
- [ ] Returns 403 for expired code
- [ ] Token is stored in Airtable
- [ ] Code is cleared after successful verification
- [ ] Token expires after 7 days

### Data Endpoint
- [ ] Returns data with valid token
- [ ] Returns 401 with no token
- [ ] Returns 401 with invalid token
- [ ] Returns 401 with expired token

### Frontend
- [ ] Shows modal when no token
- [ ] Email validation works
- [ ] Code input accepts only 6 digits
- [ ] Loading states display correctly
- [ ] Error messages display correctly
- [ ] Successful verification proceeds to app
- [ ] Resend code works
- [ ] "Use different email" works
- [ ] Token persists across page refresh
- [ ] Expired token triggers re-verification

---

## Deployment Steps

1. **Airtable**: Add verification fields to your table
2. **n8n**: Create `/send-verification-code` webhook
3. **n8n**: Create `/verify-code` webhook
4. **n8n**: Modify existing data webhook to require token
5. **Email Service**: Configure SendGrid/Mailgun in n8n
6. **Frontend**: Add modal HTML
7. **Frontend**: Add verification JavaScript functions
8. **Frontend**: Modify init() to check auth
9. **Test**: Full flow testing
10. **Deploy**: Push changes live

---

## Future Enhancements

1. **Logout button** - Allow users to manually clear their session
2. **Session info display** - Show logged-in email and expiry
3. **Remember device** - Longer token expiry for trusted devices
4. **Audit logging** - Track all verification attempts
5. **Admin panel** - View active sessions, revoke tokens
6. **SMS verification** - Alternative to email for faster verification
