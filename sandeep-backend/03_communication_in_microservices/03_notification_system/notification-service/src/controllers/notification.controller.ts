import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { Resend } from "resend";
import { z } from "zod";
import { sendMail } from "../util/sendMail";

const app = new Hono().post(
  "/send-notification",
  zValidator(
    "json",
    z.object({
      email: z.string().email(),
      message: z.string().min(1, "Message cannot be empty"),
    })
  ),
  async (c) => {
    const { email, message } = c.req.valid("json");

    try {
      console.log(`Sending notification to ${email}: ${message}`);
      await sendMail(email, `<p>${message}</p>`, "OTP", [email]);
      console.log("Notification sent successfully");

      return c.json({ message: "Notification sent successfully" }, 200);
    } catch (error) {
      console.error("Error sending notification:", error);
      return c.json({ error: "Failed to send notification" }, 500);
    }
  }
);

export default app;
