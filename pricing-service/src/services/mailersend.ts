import { EmailParams, MailerSend, Recipient, Sender } from "mailersend";

const sentFrom = new Sender(
  process.env.MAILERSEND_FROM_EMAIL || "",
  process.env.MAILERSEND_FROM_NAME
);

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY || "",
});

const sendEmail = async ({
  toEmail,
  emailSubject,
  emailHtml,
}: {
  toEmail: string;
  emailSubject: string;
  emailHtml: string;
}) => {
  try {
    // Send email logic here
    const recipients = [new Recipient(toEmail)];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject(emailSubject)
      .setHtml(emailHtml);

    await mailerSend.email.send(emailParams);

    console.log("Email sent successfully");
  } catch (error) {
    console.log("Error sending email: ", error);
    throw error;
  }
};

export default {
  sendEmail,
};
