import { Router } from "express";
import { getCategoryItems } from "@/controllers/items.controller";

const router = Router({ mergeParams: true });

router.get("/", getCategoryItems);

export { router as itemsRoutes };
