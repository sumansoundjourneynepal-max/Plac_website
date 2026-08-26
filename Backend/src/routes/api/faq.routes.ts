import { Router } from "express";
import { getPublishedFaqs } from "../../controllers/faq.controller";

const router = Router();
router.get("/", getPublishedFaqs);

export default router;
