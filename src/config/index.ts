import dotenv from "dotenv";
dotenv.config();

const config = {
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "3000"),
  database: {
    name: process.env.DB_NAME || "servicebookingtest",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "admin",
    host: process.env.DB_HOST || "127.0.0.1",
    port: parseInt(process.env.DB_PORT || "3306"),
  },
  smtp: {
    host: process.env.SMTP_HOST || "smtp.ethereal.email",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    user: process.env.SMTP_USER || "user@example.com",
    password: process.env.SMTP_PASSWORD || "password",
    from: process.env.SMTP_FROM || '"Your App" <noreply@example.com>',
  },
};

export default config;

// docker run -d --name=mailpit --restart unless-stopped -p 8025:8025 -p 1025:1025 axllent/mailpit
