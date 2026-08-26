import { Router } from 'express';
import { createBlog } from '../../controllers/admin.blog.controller';

const router = Router();
router.post('/', createBlog);  
export default router;
