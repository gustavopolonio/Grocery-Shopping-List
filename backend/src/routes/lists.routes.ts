import { Router } from "express";
import {
  getList,
  createList,
  updateList,
} from "@/controllers/lists.controller";

const router = Router();

router.get("{/:lang}/:listId", getList);
router.post("/", createList);
router.patch("/:listId", updateList);

export { router as listsRoutes };
