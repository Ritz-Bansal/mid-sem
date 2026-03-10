import { Router } from "express";
import authRoute from "./authRoute";
import blogRouter from "./blogRoute";
import { authMiddleware } from "../middleware/auth";

const router = Router();

console.log("inside the app");
router.use("/auth", authRoute);

router.use(authMiddleware);
router.use("/blogs", blogRouter);

export default router;