import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json([]);
});

router.get('/:id', (req, res) => {
  res.json(null);
});

export default router;
