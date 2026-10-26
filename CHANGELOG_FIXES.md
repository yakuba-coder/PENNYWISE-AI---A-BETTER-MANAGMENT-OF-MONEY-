# Pennywise AI fixes

## Gemini chat and Hindsight memory

- Restored Hindsight recall in `api/gemini.js`; the previous temporary-disable assignment has been removed.
- The chat request's `memoryEnabled` flag now controls recall and retention. When enabled, the backend attempts recall before Gemini and attempts retention for explicit memory requests after Gemini replies.
- Memory failures are logged with operation, HTTP status, and duration (without logging credentials); ordinary Gemini chat continues if recall fails.
- Retention is skipped for messages that appear to contain sensitive credentials and is only attempted for explicit memory/financial-goal requests.
- The default Gemini model is now `gemini-3.8-flash`, the stable model ID listed in Google Gemini API documentation. A configured `GEMINI_MODEL` environment variable overrides this default.
- API routes use Vercel's named `GET` / `POST` exports to return Web `Response` objects correctly.
- Gemini and Hindsight network requests have bounded timeouts. Vercel function max duration is configured to 30 seconds; plan limits may override this.
- `/api/health` and `/api/memory-status` report configuration only, not live connectivity.

## Important verification note

No real Gemini or Hindsight credentials are included in this ZIP. Live provider connectivity, successful retention, and persistent recall must be tested after the environment variables are configured in Vercel. A successful HTTP response from a memory endpoint is surfaced as a retention receipt; use the separate follow-up recall test to verify persistence.

- Updated the sample Vercel environment configuration to use `GEMINI_MODEL=gemini-3.8-flash`.
