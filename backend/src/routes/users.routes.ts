import { Router } from "express";
import { getAuthenticadeUserLists } from "@/controllers/users.controller";

const router = Router();

router.get("/lists", getAuthenticadeUserLists);

export { router as usersRoutes };
