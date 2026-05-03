# Contact Form Contract

**Service**: Formspree (`https://formspree.io`)
**Endpoint**: `https://formspree.io/f/${VITE_FORMSPREE_ID}`
**Method**: `POST`
**Content-Type**: `application/json`

---

## Request

```json
{
  "name":    "<string>  required  MIN 2 chars, MAX 100 chars",
  "email":   "<string>  required  valid RFC 5322 email address",
  "message": "<string>  required  MIN 10 chars, MAX 2000 chars"
}
```

### Headers

```
Accept: application/json
Content-Type: application/json
```

### Example

```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "message": "Hi Shivam, I saw your portfolio and would love to chat about a senior role."
}
```

---

## Response

### 200 OK — Submission accepted

```json
{ "ok": true }
```

**UI behaviour**: Hide the form; show an inline success message with a "Send another message" reset link.

### 422 Unprocessable Entity — Validation error

```json
{
  "errors": [
    { "field": "email", "message": "must be a valid email" }
  ]
}
```

**UI behaviour**: Display per-field error messages beneath each invalid input; keep the form visible and populated.

### 429 Too Many Requests — Rate limited

```json
{ "error": "Too many requests" }
```

**UI behaviour**: Display a generic error message ("Something went wrong — please try again later or email directly at [email link]"); show direct email and LinkedIn links prominently.

### 5xx Server Error

**UI behaviour**: Same as 429 — display fallback contact links; log error to browser console (no user-facing technical details).

---

## Client-side Validation (before submission)

| Field | Rule | Error message |
|---|---|---|
| `name` | Required; MIN 2 chars | "Please enter your name" |
| `email` | Required; valid email pattern | "Please enter a valid email address" |
| `message` | Required; MIN 10 chars | "Message must be at least 10 characters" |

Validation runs on field blur and on submit attempt. The Send button is disabled during the `submitting` state to prevent double-submission.

---

## Environment Variable

```bash
VITE_FORMSPREE_ID=<your-formspree-form-id>
```

Stored in `.env.local` (not committed). A `.env.example` file is committed with the key name and a placeholder value.

---

## Fallback Behaviour (FR-004 requirement)

When the form service is unavailable (network error, 5xx, or `VITE_FORMSPREE_ID` not set), the Contact section MUST display:
1. The visitor's typed content is NOT lost (form stays populated)
2. Inline error message with direct email link: `mailto:mauryashivam050@gmail.com`
3. LinkedIn profile link as a second fallback channel

The direct email and LinkedIn links are always visible below the form — they are permanent, not conditional fallbacks.
