import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGO_URI || "",
  dnsServers: (process.env.DNS_SERVERS || "1.1.1.1,8.8.8.8")
    .split(",")
    .map((server) => server.trim())
    .filter(Boolean),
  jwtSecret: process.env.JWT_SECRET || "",
  clientOrigins: (process.env.CLIENT_ORIGIN || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  firebaseProjectId: process.env.FIREBASE_PROJECT_ID || "",
  registrationsWorkbookPath: process.env.REGISTRATIONS_WORKBOOK_PATH || "./data/dhruaval.xlsx",
  notificationEmail: process.env.NOTIFICATION_EMAIL || "registrationbci@gmail.com",
  smtpHost: process.env.SMTP_HOST || "smtp.gmail.com",
  smtpPort: Number(process.env.SMTP_PORT) || 587,
  smtpUser: process.env.SMTP_USER || "",
  smtpPass: process.env.SMTP_PASS || "",
};
