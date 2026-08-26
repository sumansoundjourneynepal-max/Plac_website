// import { Router } from 'express';
// import {
//   getActiveTestimonials,
//   getTestimonialById,
//   createTestimonial,
//   updateTestimonial,
//   deleteTestimonial
// } from '../../controllers/testimonial.controller';

// const router = Router();

// // Public
// router.get('/', getActiveTestimonials);

// // Admin
// router.get('/:id', getTestimonialById);
// router.post('/', createTestimonial);
// router.put('/:id', updateTestimonial);
// router.delete('/:id', deleteTestimonial);

// export default router;



// import { Router } from "express"
// import {
//   getActiveTestimonials,
//   getAllTestimonials,
//   createTestimonial,
//   updateTestimonial,
//   deleteTestimonial
// } from "../../controllers/testimonial.controller"

// const router = Router()

// // Public
// router.get("/", getActiveTestimonials)

// // Admin
// router.get("/admin", getAllTestimonials)
// router.post("/", createTestimonial)
// router.put("/:id", updateTestimonial)
// router.delete("/:id", deleteTestimonial)

// export default router

import { Router } from "express"
import {
  getActiveTestimonials,
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} from "../../controllers/testimonial.controller"

const router = Router()

router.get("/", getActiveTestimonials)
router.get("/admin", getAllTestimonials)
router.post("/", createTestimonial)
router.put("/:id", updateTestimonial)
router.delete("/:id", deleteTestimonial)

export default router