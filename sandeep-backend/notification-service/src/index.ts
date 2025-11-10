import { Hono } from "hono";
import type { AppType } from "../../user-service/src/index";
import { hc } from "hono/client";
import { Worker } from "bullmq";
import IORedis from "ioredis";

import notificationRoutes from "./controllers/notification.controller";
import { sendMail } from "./util/sendMail";

const app = new Hono().route("/", notificationRoutes);
const client = hc<AppType>("http://localhost:3000/");
const connection = new IORedis({ maxRetriesPerRequest: null });

app.get("/", async (c) => {
  return c.text("Hello Hono!");
});

const worker = new Worker(
  "NotificationQueue",
  async (job) => {
    if (job.name === "welcome-email") {
      //TODO: check user already DB mein hai ya fr nhi
      //RPC call
      await sendMail(
        job.data.email,
        "Welcome to our platform",
        "Welcome Email",
        [job.data.email]
      );
    }
  },
  { connection }
);

export type NotificationAppType = typeof app;

export default {
  fetch: app.fetch,
  port: 3001,
};
