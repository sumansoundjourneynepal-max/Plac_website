import { Router } from 'express';
import { getPublishedBlogs, getBlogBySlug } from '../../controllers/blog.controller';

const router = Router();

router.get('/', getPublishedBlogs);        // GET /api/blogs
router.get('/:slug', getBlogBySlug);      // GET /api/blogs/:slug

export default router;
