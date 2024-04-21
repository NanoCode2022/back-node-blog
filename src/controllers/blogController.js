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

  async createBlog(req, res) {
    try {
      const result = req.body
      console.log(result)
      if (Object.keys(result).length === 0) {

        return res.status(400).json({ message: 'Error' })
      }
      const newBlog = await BlogModel.createBlog(result)
      res.json(newBlog)
    } catch (err) {
      console.log(err)
    }
  }

  async deleteBlog(req, res) {
    const id = req.params.id
    console.log(id)
    const result = await BlogModel.deleteBlog(id)
    console.log(result)

    if (result) {

      return res.status(200).json({ message: 'Blog deleted successfully' })
    }

    return res.status(404).json({ message: 'Blog not found' })

  }

}


export default BlogController;
