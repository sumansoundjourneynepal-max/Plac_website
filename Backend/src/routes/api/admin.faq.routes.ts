import { Router } from "express";
import {
  createFaq,
  getAllFaqs,
  updateFaq,
  deleteFaq,
} from "../../controllers/admin.faq.controller";

const router = Router();

router.get("/", getAllFaqs);
router.post("/", createFaq);
router.put("/:id", updateFaq);
router.delete("/:id", deleteFaq);

export default router;
