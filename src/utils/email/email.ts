import path from "path";
import fs from "fs";
import handlebars from "handlebars";
import transporter from "./transporter";
import config from "../../config";
import logger from "../logger";

interface SendPasswordResetEmailParams {
  email: string;
  resetUrl: string;
}

export const sendPasswordResetEmail = async (
  email: string,
  resetUrl: string
) => {
  try {
    const templatePath = path.join(__dirname, "templates/password-reset.hbs");
    const source = fs.readFileSync(templatePath, "utf-8").toString();
    const template = handlebars.compile(source);
    const html = template({ resetUrl });

    const mailOptions = {
      from: config.smtp.from,
      to: email,
      subject: "Password Reset Request",
      html,
    };
    console.log(mailOptions, transporter, "mailOptions");

    await transporter.sendMail(mailOptions);
    logger.info(`Password reset email sent to ${email}`);
  } catch (error) {
    logger.error("Error sending password reset email:", error);
    throw new Error("Failed to send password reset email");
  }
};
