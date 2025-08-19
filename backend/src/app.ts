import "dotenv/config";
import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { env } from "@/env";
import { clerkWebhooksRoutes } from "@/routes/webhooks/clerk.route";
import { usersRoutes } from "@/routes/users.routes";
import { itemsRoutes } from "@/routes/items.routes";
import { verifyAuth } from "@/middlewares/verify-auth";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(clerkMiddleware({}));

app.use("/api/webhooks", clerkWebhooksRoutes);
app.use("/users/me", verifyAuth, usersRoutes);
app.use("{/:lang}/category-items", itemsRoutes);

app.listen(env.PORT, () => {
  console.log(`App listening on port: ${env.PORT}`);
});
