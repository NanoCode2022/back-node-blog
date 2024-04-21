import { readJSON } from "../util.js";
const { blogPosts } = readJSON('./db.json');
class BlogModel {

  static async getAll() {
    try {
      return blogPosts;
    } catch (error) {
      console.error('Error reading JSON file:', error);
      return null;
    }
  }

  static async getAllById(id) {
    try {

      console.log(id)
      const blog = await blogPosts.find(blog => blog.id == id);
      console.log({ blog })
      return blog

    } catch (err) {
      console.log(err)
    }
  }

  static async createBlog(input) {
    try {
      blogPosts.push(input)
      const response = 'blog was created successfully'
      return response
    } catch (err) {
      console.log(err)
    }
  }

  static async deleteBlog(id) {
    try {

      const findBlog = blogPosts.findIndex(blog => blog.id == id);
      console.log(findBlog)

      if (findBlog === -1) { return false }

      blogPosts.splice(findBlog, 1)
      return true

    } catch (err) {
      console.log(err)
    }
  }
}


export default BlogModel;

