import express, { Router } from "express";
import { handleClerkWebhook } from "@/controllers/clerk-webhook.controller";

const router = Router();

router.post(
  "/clerk",
  express.raw({ type: "application/json" }),
  handleClerkWebhook
);

export { router as clerkWebhooksRoutes };
