import { Router } from "express";
import { getList, createList } from "@/controllers/lists.controller";

const router = Router();

router.get("{/:lang}/:listId", getList);
router.post("/", createList);

export { router as listsRoutes };
