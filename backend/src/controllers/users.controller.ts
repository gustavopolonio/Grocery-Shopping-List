import { Request, Response } from "express";
import { prisma } from "@/lib/prisma";

export async function getAuthenticadeUserLists(req: Request, res: Response) {
  const clerkUserId = req.clerkUserId;

  try {
    const lists = await prisma.list.findMany({
      where: {
        listMember: {
          some: {
            profile: {
              clerkUserId,
            },
          },
        },
      },
      select: {
        id: true,
        name: true,
        listMember: {
          select: {
            profile: {
              select: { id: true, username: true, avatarUrl: true },
            },
          },
        },
        _count: {
          select: { listItem: true },
        },
      },
    });

    const listsFormatted = lists.map(({ _count, ...rest }) => ({
      ...rest,
      itemsCount: _count.listItem,
    }));

    res.status(200).json({ lists: listsFormatted });
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
