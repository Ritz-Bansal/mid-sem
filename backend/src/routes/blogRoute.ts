import express from "express";
import { createBlogController, getALlBlogsController, getSpecificBlogController, presignController } from "../controller/blogController";

const blogRouter = express.Router();

blogRouter.get("/blogs", getALlBlogsController);
blogRouter.get("/blogs/:id", getSpecificBlogController);

blogRouter.post("/presign", presignController);
blogRouter.post("/blogs", createBlogController);

export default blogRouter;