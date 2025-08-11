import "dotenv/config";
import express from "express";
import { clerkMiddleware } from "@clerk/express";
import { env } from "@/env";
import { clerkWebhooksRoutes } from "@/routes/webhooks/clerk.route";

const app = express();

app.use(clerkMiddleware({}));

app.use("/api/webhooks", clerkWebhooksRoutes);

app.listen(env.PORT, () => {
  console.log(`App listening on port: ${env.PORT}`);
});
