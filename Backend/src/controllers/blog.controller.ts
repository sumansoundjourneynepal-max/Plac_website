// import { Request, Response } from 'express';
// import Blog from '../models/blog.model';

// // Get all published blogs
// export const getPublishedBlogs = async (req: Request, res: Response) => {
//   try {
//     const blogs = await Blog.find({ status: 'published' }).sort({ publishedAt: -1 });
//     res.status(200).json(blogs);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Get single blog by slug
// export const getBlogBySlug = async (req: Request, res: Response) => {
//   try {
//     const blog = await Blog.findOne({ slug: req.params.slug, status: 'published' });
//     if (!blog) return res.status(404).json({ message: 'Blog not found' });
//     res.status(200).json(blog);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


import { RequestHandler } from 'express';
import Blog from '../models/blog.model';

// Get all published blogs
export const getPublishedBlogs: RequestHandler = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: 'published' }).sort({ publishedAt: -1 });
    res.status(200).json(blogs);   
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single blog by slug
export const getBlogBySlug: RequestHandler = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, status: 'published' });
    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });  
      return;   // optional but okay
    }

    res.status(200).json(blog);  
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
