import "dotenv/config";
import express from "express";
import { clerkMiddleware } from "@clerk/express";
import { env } from "@/env";

const app = express();

app.use(clerkMiddleware());

app.listen(env.PORT, () => {
  console.log(`App listening on port: ${env.PORT}`);
});
