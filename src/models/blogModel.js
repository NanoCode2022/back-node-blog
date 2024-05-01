import { readJSON } from "../util.js";
import { connection } from "../dataBase.js";

const { blogPosts } = readJSON('./db.json');
const tags_array = (blog) => (
  {
    id: blog.id,
    title: blog.title,
    content: blog.content,
    year: blog.year,
    user_id: blog.user_id,
    user_name: blog.user_name,
    tags: blog.tags ? blog.tags.split(',') : []
  }
)
const query_get = `SELECT posts.id, posts.title, posts.content, posts.year, users.id AS user_id, users.name AS user_name, GROUP_CONCAT(tags.name) AS tags 
FROM posts 
LEFT JOIN users ON posts.user_id = users.id 
LEFT JOIN post_tags ON posts.id = post_tags.posts_id 
LEFT JOIN tags ON post_tags.tags_id = tags.id 
GROUP BY posts.id`

const query_get_id = `SELECT posts.id, posts.title, posts.content, posts.year, users.id AS user_id, users.name AS user_name, GROUP_CONCAT(tags.name) AS tags 
FROM posts 
LEFT JOIN users ON posts.user_id = users.id 
LEFT JOIN post_tags ON posts.id = post_tags.posts_id 
LEFT JOIN tags ON post_tags.tags_id = tags.id 
WHERE posts.id = ?
GROUP BY posts.id`

class BlogModel {

  static async getAll() {
    try {
      const [list_blogs] = await connection.query(query_get);
      const blogs = list_blogs.map(tags_array)
      return blogs;
    } catch (error) {
      console.error('Error reading JSON file:', error);
      return null;
    }
  }

  static async getAllById(id) {
    try {

      const [blog] = await connection.query(query_get_id, [id])

      const blog_check = blog.map(tags_array)

      console.log({ blog_check })
      return blog_check

    } catch (err) {
      console.log(err)
    }
  }

  static async createBlog(input) {
    try {
      const { id, title, content, tags, user_id } = input
      console.log(tags)

      await connection.beginTransaction();

      const [new_blog] = await connection.query(`INSERT INTO posts (id, title, content, user_id) VALUES (?, ?, ?, ?)`, [id, title, content, user_id]);
      const post_id = new_blog.insertId

      const tag_ids = []
      for (const tag of tags) {
        let [tag_result] = await connection.query(`SELECT id FROM tags WHERE name = ?`, [tag]);
        console.log('tag result:', tag_result)
        if (tag_result.length === 0) {
          const insertTagResult = await connection.query(`INSERT INTO tags (name) VALUES (?)`, [tag]);
          tag_result = { id: insertTagResult.insertId };
        }
        if (tag_result.length > 0 && tag_result[0].id) {
          tag_ids.push(tag_result[0].id);
        }
      }

      const tag_values = tag_ids.map(tag_id => [post_id, tag_id])
      await connection.query(`INSERT INTO post_tags (posts_id, tags_id) VALUES ?`, [tag_values]);

      await connection.commit();
      console.log(post_id)
      const response = 'blog was created successfully'
      return response
    } catch (err) {
      await connection.rollback();
      console.log(err)
      return err
    }
  }

  static async deleteBlog(id) {
    try {

      const [find_blog] = await connection.query(`SELECT id FROM posts WHERE id = ?`, [id])
      console.log(find_blog)


      if (find_blog.length === 0) return false

      const [result] = await connection.query(`DELETE FROM posts WHERE id = ?`, [id])

      if (result.affectedRows === 0) return false

      return true

    } catch (err) {
      console.log(err)
    }
  }
}


export default BlogModel;

