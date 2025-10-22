import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: "https://e0ca273ef4dc3e1a723d4a13ca8450bc@o4510213912788992.ingest.us.sentry.io/4510213915869184",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});