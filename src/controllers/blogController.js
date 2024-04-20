import BlogModel from '../models/blogModel.js'
class BlogController {

  async getAllBlogs(req, res) {
    try {
      const blog = await BlogModel.getAll();
      console.log(blog)
      res.json(blog)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Failed to retrieve blogs' });
    }
  }

  async getBlogById(req, res) {
    try {
      const { id } = req.params
      console.log(id)
      const blog = await BlogModel.getAllById(id);
      console.log(blog)
      if (blog) return res.json(blog)
      res.status(404).json({ error: 'Blog not found' });
    } catch (err) {
      console.log(err)
    }
  }

}


export default BlogController;
