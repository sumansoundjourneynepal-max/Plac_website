import { Router } from 'express';
import { getPublishedPress, getPressBySlug } from '../../controllers/press.controller';

const router = Router();

router.get('/', getPublishedPress);        // GET /api/press
router.get('/:slug', getPressBySlug);      // GET /api/press/:slug

export default router;
