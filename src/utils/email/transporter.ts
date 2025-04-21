import nodemailer from "nodemailer";
import config from "../../config";

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: config.smtp.secure, // true for 465, false for other ports
  auth: {
    user: config.smtp.user,
    pass: config.smtp.password,
  },
  tls: {
    rejectUnauthorized: false, // Disable TLS certificate validation for local testing
  },
});

transporter.verify((error) => {
  if (error) {
    console.error("Error with mail transporter:", error);
  } else {
    console.log("Mail transporter is ready to send emails");
  }
});

export default transporter;
