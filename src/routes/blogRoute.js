import { Router } from "express";
import BlogController from "../controllers/blogController.js"

const router = Router()
const instanceBlogContoller = new BlogController()
router.get('/', instanceBlogContoller.getAllBlogs)
router.get('/:id', instanceBlogContoller.getBlogById)

export default router
