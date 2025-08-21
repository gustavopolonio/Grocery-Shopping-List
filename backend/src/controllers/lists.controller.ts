import { Request, Response } from "express";
import z from "zod";
import { prisma } from "@/lib/prisma";
import { CategoryWithProducts } from "@/@types/product";

export async function getList(req: Request, res: Response) {
  const clerkUserId = req.clerkUserId;

  const getListParamsSchema = z.object({
    lang: z
      .string()
      .optional()
      .default("en-US")
      .transform((val) =>
        val.toLocaleLowerCase() === "pt-br" ? "ptBR" : "enUS"
      ),
    listId: z.uuid(),
  });

  const { lang, listId } = getListParamsSchema.parse(req.params);

  try {
    const list = await prisma.list.findUnique({
      where: {
        id: listId,
        listMember: {
          some: {
            profile: { clerkUserId },
          },
        },
      },
      select: {
        name: true,
        createdAt: true,
        listMember: {
          select: {
            profile: {
              select: {
                id: true,
                username: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
    });

    if (!list) {
      res.status(404).json({ message: "List not found" });
      return;
    }

    const [normalProducts, customProducts] = await Promise.all([
      prisma.listItem.findMany({
        where: { listId, productId: { not: null } },
        select: {
          id: true,
          quantity: true,
          note: true,
          createdAt: true,
          addedByUser: {
            select: { username: true },
          },
          product: {
            select: {
              id: true,
              icon: true,
              productTranslation: {
                where: { language: lang },
                select: { name: true },
              },
              productCategory: {
                select: {
                  category: {
                    select: {
                      id: true,
                      icon: true,
                      categoryTranslation: {
                        where: { language: lang },
                        select: { name: true },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      }),
      prisma.listItem.findMany({
        where: { listId, customProductId: { not: null } },
        select: {
          id: true,
          quantity: true,
          note: true,
          createdAt: true,
          addedByUser: {
            select: { username: true },
          },
          customProduct: {
            select: {
              id: true,
              icon: true,
              name: true,
              userCustomProductCategory: {
                select: {
                  category: {
                    select: {
                      id: true,
                      icon: true,
                      categoryTranslation: {
                        where: { language: lang },
                        select: { name: true },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      }),
    ]);

    // Group normal products by category
    const productsByCategory = normalProducts.reduce<
      Record<string, CategoryWithProducts>
    >((acc, item) => {
      const product = item.product;
      if (!product) return acc;

      product.productCategory.forEach(({ category }) => {
        const categoryId = category.id;

        if (!acc[categoryId]) {
          acc[categoryId] = {
            id: category.id,
            icon: category.icon,
            name: category.categoryTranslation[0]?.name ?? "",
            products: [],
            userCustomProducts: [],
          };
        }

        acc[categoryId].products.push({
          id: product.id,
          icon: product.icon,
          name: product.productTranslation[0]?.name ?? "",
          quantity: item.quantity,
          note: item.note,
          addedBy: item.addedByUser.username,
          createdAt: item.createdAt,
        });
      });

      return acc;
    }, {});

    // Group custom products by category (merge with normal product categories if exist)
    customProducts.forEach((item) => {
      const customProduct = item.customProduct;
      if (!customProduct) return;

      customProduct.userCustomProductCategory.forEach(({ category }) => {
        const categoryId = category.id;

        if (!productsByCategory[categoryId]) {
          productsByCategory[categoryId] = {
            id: category.id,
            icon: category.icon,
            name: category.categoryTranslation[0]?.name ?? "",
            products: [],
            userCustomProducts: [],
          };
        }

        productsByCategory[categoryId].userCustomProducts.push({
          id: customProduct.id,
          icon: customProduct.icon,
          name: customProduct.name,
          quantity: item.quantity,
          note: item.note,
          addedBy: item.addedByUser.username,
          createdAt: item.createdAt,
        });
      });
    });

    // Convert grouped object to array
    const categories = Object.values(productsByCategory);

    res.status(200).json({ list, categories });
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
