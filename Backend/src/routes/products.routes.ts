import { Router } from 'express';

const router = Router();

// This route file is mounted alongside product.routes.ts
router.get('/', (req, res, next) => {
  next();
});

export default router;
