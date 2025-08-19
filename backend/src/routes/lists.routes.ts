import { Router } from "express";
import { createList } from "@/controllers/lists.controller";

const router = Router();

router.post("/", createList);

export { router as listsRoutes };
