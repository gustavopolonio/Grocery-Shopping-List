import { Request, Response } from "express";
import z from "zod";
import { prisma } from "@/lib/prisma";

export async function getCategoryItems(req: Request, res: Response) {
  const getItemsParamsSchema = z.object({
    lang: z
      .string()
      .optional()
      .default("en-US")
      .transform((val) =>
        val.toLocaleLowerCase() === "pt-br" ? "ptBR" : "enUS"
      ),
  });

  const { lang } = getItemsParamsSchema.parse(req.params);

  try {
    const categoriesWithItems = await prisma.category.findMany({
      select: {
        icon: true,
        categoryTranslation: {
          where: { language: lang },
          select: { name: true },
        },
        productCategory: {
          select: {
            product: {
              select: {
                id: true,
                icon: true,
                productTranslation: {
                  where: { language: lang },
                  select: { name: true },
                },
              },
            },
          },
        },
        userCustomProductCategory: {
          select: {
            userCustomProduct: {
              select: { id: true, icon: true, name: true },
            },
          },
        },
      },
    });

    const categoriesWithItemsFormatted = categoriesWithItems.map(
      ({
        categoryTranslation,
        productCategory,
        icon,
        userCustomProductCategory,
      }) => ({
        icon,
        name: categoryTranslation[0]?.name ?? "",
        userCustomProducts: userCustomProductCategory.map(
          ({ userCustomProduct }) => ({
            id: userCustomProduct.id,
            icon: userCustomProduct.icon,
            name: userCustomProduct.name,
          })
        ),
        products: productCategory.map(({ product }) => ({
          id: product.id,
          icon: product.icon,
          name: product.productTranslation[0]?.name ?? "",
        })),
      })
    );

    res.status(200).json({ categories: categoriesWithItemsFormatted });
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
