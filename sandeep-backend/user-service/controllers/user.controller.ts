import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import User from "../models/user.model";
import { client, queue } from "../src";
import { retry } from "../src/utils/retries";

const app = new Hono()
  .post(
    "/register/send-otp",
    zValidator(
      "json",
      z.object({
        email: z.string().email(),
      })
    ),
    async (c) => {
      const { email } = c.req.valid("json");

      try {
        console.log(`Sending OTP to ${email}`);
        const res = await retry(async () => {
          const res = await client["send-notification"].$post({
            json: {
              email: email,
              message: "<p>OTP:123456</p>",
            },
          });

          if (!res.ok) {
            throw new Error("Notification service returned " + res.status);
          }
          return res;
        });

        if (!res.ok) {
          console.error("Failed to send OTP:", res.statusText);
          return c.json({ error: "Failed to send OTP" }, 500);
        }
        return c.json({ message: "OTP sent successfully" }, 200);
      } catch (error) {
        console.error("Error sending OTP:", error);
        return c.json({ error: "Failed to send OTP" }, 500);
      }
    }
  )
  .post(
    "/register",
    zValidator(
      "json",
      z.object({
        email: z.string().email(),
        otp: z
          .number()
          .int()
          .min(100000, "OTP must be a 6-digit number")
          .max(999999, "OTP must be a 6-digit number"),
        password: z
          .string()
          .min(6, "Password must be at least 6 characters long"),
      })
    ),
    async (c) => {
      const { email, password, otp } = c.req.valid("json");
      if (otp !== 123456) {
        // Replace with actual OTP validation logic
        return c.json({ error: "Invalid OTP" }, 400);
      }
      try {
        await User.create({
          email,
          password,
        });

        queue.add("welcome-email", { email });
        console.log(`User created with email: ${email}`);

        return c.json({ message: "User created successfully" }, 201);
      } catch (error) {
        console.error("Error creating user:", error);
        return c.json({ error: "Failed to create user" }, 500);
      }
    }
  )
  .get("/get-user", (c) => {
    return c.json({
      message: "Hello Hono!",
    });
  });

export default app;
