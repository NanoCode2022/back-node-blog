import { Router } from "express";
import BlogController from "../controllers/blogController.js"

const router = Router()
const instanceBlogContoller = new BlogController()
router.get('/', instanceBlogContoller.getAllBlogs)
router.get('/:id', instanceBlogContoller.getBlogById)
router.post('/', instanceBlogContoller.createBlog)
router.delete('/:id', instanceBlogContoller.deleteBlog)

export default router
