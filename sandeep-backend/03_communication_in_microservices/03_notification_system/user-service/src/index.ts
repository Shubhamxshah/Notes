import { Hono } from "hono";
import { dbConnect } from "../config/db";
import userRoutes from "../controllers/user.controller";
import { hc } from "hono/client";
import { Queue } from 'bullmq';
import type { NotificationAppType } from "../../notification-service/src/index";

export const client = hc<NotificationAppType>("http://localhost:3001/");


export const queue = new Queue('NotificationQueue');


const app = new Hono().route("/user", userRoutes);

dbConnect();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export type AppType = typeof app;

export default app;
