import { Request, Response } from "express";
import { verifyWebhook } from "@clerk/express/webhooks";
import { prisma } from "@/lib/prisma";

export async function handleClerkWebhook(req: Request, res: Response) {
  try {
    const evt = await verifyWebhook(req);

    const eventType = evt.type;

    if (eventType === "user.created") {
      const freePlan = await prisma.plan.findUnique({
        where: {
          name: "FREE",
        },
      });

      if (!freePlan) {
        res.status(404).send({ message: "Plan not found" });
        return;
      }

      const { id: userId, first_name, last_name, image_url } = evt.data;
      const fullName = `${first_name} ${last_name}`;

      await prisma.profile.create({
        data: {
          clerkUserId: userId,
          username: fullName,
          avatarUrl: image_url,
          planId: freePlan.id,
        },
      });

      res.status(200).json({ message: "Webhook received - profile created" });
    }

    return;
  } catch {
    res.status(400).send("Error verifying webhook");
    return;
  }
}
