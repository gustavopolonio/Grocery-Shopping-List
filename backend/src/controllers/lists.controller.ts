import { Request, Response } from "express";
import z from "zod";
import { prisma } from "@/lib/prisma";

export async function createList(req: Request, res: Response) {
  const clerkUserId = req.clerkUserId;

  const itemFieldSchema = z.object({
    itemId: z.uuid(),
    quantity: z.number().min(1),
    note: z.string().optional(),
    isCustom: z.boolean().optional().default(false),
  });

  const createListBodySchema = z.object({
    listName: z
      .string()
      .min(3, { error: "List name must be at least 3 caracters" }),
    listItems: z.array(itemFieldSchema),
  });

  const { listName, listItems } = createListBodySchema.parse(req.body);

  const profile = await prisma.profile.findUnique({
    where: {
      clerkUserId,
    },
  });

  if (!profile) {
    res.status(404).send({ message: "User profile not found" });
    return;
  }

  const newList = await prisma.list.create({
    data: {
      name: listName,
      ownerId: profile.id,
      listMember: {
        create: {
          profileId: profile.id,
          role: "OWNER",
        },
      },
      listItem: {
        create: listItems.map((item) => ({
          addedBy: profile.id,
          quantity: item.quantity,
          note: item.note,
          ...(item.isCustom
            ? {
                customProductId: item.itemId,
              }
            : {
                productId: item.itemId,
              }),
        })),
      },
    },
  });

  const newListFormatted = {
    id: newList.id,
    name: newList.name,
    listMember: [
      {
        profile: {
          id: profile.id,
          username: profile.username,
          avatarUrl: profile.avatarUrl,
        },
      },
    ],
    itemsCount: listItems.length,
  };

  try {
    res.status(201).json({ newList: newListFormatted });
    return;
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ message: error });
      return;
    }
    res.status(500).send({ message: "Unknown error" });
    return;
  }
}
