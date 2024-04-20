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
}


export default BlogModel;

