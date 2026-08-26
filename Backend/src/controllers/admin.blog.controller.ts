// controllers/admin.blog.controller.ts
// import { RequestHandler } from 'express';
// import Blog from '../models/blog.model';

// // Create new blog
// export const createBlog: RequestHandler = async (req, res) => {
//   try {
//     const { title, slug, excerpt, content, category, featuredImage, author, status } = req.body;

//     const blog = await Blog.create({
//       title,
//       slug,
//       excerpt,
//       content,
//       category,
//       featuredImage,
//       author,
//       status,
//       publishedAt: status === 'published' ? new Date() : undefined,
//     });

//     res.status(201).json(blog);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


// controllers/admin.blog.controller.ts
import { RequestHandler } from 'express';
import Blog, { IBlog } from '../models/blog.model';

// Create new blog
export const createBlog: RequestHandler = async (req, res) => {
  try {
    const { title, slug, excerpt, content, category, featuredImage, author, status } = req.body;

    // Create the blog document
    const blog: IBlog = await Blog.create({
      title,
      slug,
      excerpt,
      content,
      category,
      featuredImage,
      author,
      status,
      publishedAt: status === 'published' ? new Date() : null,
    });

    // Send back a plain object with string dates for frontend
    res.status(201).json({
      id: blog._id.toString(), // convert ObjectId to string
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      category: blog.category,
      featuredImage: blog.featuredImage || '',
      author: blog.author,
      status: blog.status,
      createdAt: blog.createdAt.toISOString(),
      updatedAt: blog.updatedAt.toISOString(),
      publishedAt: blog.publishedAt ? blog.publishedAt.toISOString() : null
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};