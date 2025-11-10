import { Resend } from "resend";

const resend = new Resend("re_jLW6Kotq_Nqe5xz7LiAu6Yn6Yi6T68MBx");

export const sendMail = async (
  email: string,
  message: string,
  subject: string,
  to: string[]
) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Sandeepdev <sandeep@saaster.tech>",
      to: to,
      subject: subject,
      html: message,
    });

    if (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send email");
    }

    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
