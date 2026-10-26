import { json } from "../lib/server.js";

export function GET() {
  const configured = Boolean(process.env.HINDSIGHT_API_KEY && process.env.HINDSIGHT_BANK_ID);
  return json(200, {
    enabled: configured,
    configured,
    required: false,
    mode: process.env.DEMO_MODE !== "false" ? "single-user-demo" : "configured",
    message: configured
      ? "Hindsight credentials are configured. Live recall and retention are reported per chat request."
      : "Hindsight is not configured. Add HINDSIGHT_API_KEY and HINDSIGHT_BANK_ID in Vercel."
  });
}
