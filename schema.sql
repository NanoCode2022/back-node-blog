DROP DATABASE IF EXISTS app_blogs;
CREATE DATABASE app_blogs;

USE app_blogs;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  user_id INT,
  year TIMESTAMP NOT NULL DEFAULT (NOW()),
  FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE tags(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE post_tags(
  posts_id INT REFERENCES posts(id),
  tags_id INT REFERENCES tags(id),
  PRIMARY KEY(posts_id, tags_id)
);

INSERT INTO users (name, password, email) VALUES
('john', '123', '5jV2H@example.com'),
('max', '12335', 'exampel@gmil.com');


INSERT INTO posts (id, title, content, user_id) VALUES
(1,'introduction to react', 'this is a blog post about react', 1),
(2, 'react hooks tutorial', 'this is a blog post about react hooks', 2),
(3, 'building a blog with react and node.js', 'this is a blog post about building a blog with react and node.js', 1);

INSERT INTO tags(name) VALUES
('react'),
('frontend'),
('javascript'),
('hooks'),
('state management'),
('node.js'),
('fullstack');

INSERT INTO post_tags(posts_id, tags_id) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 4),
(2, 5),
(3, 6),
(3, 7);
