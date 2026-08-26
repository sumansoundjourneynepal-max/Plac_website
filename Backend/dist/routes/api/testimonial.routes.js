"use strict";
// import { Router } from 'express';
// import {
//   getActiveTestimonials,
//   getTestimonialById,
//   createTestimonial,
//   updateTestimonial,
//   deleteTestimonial
// } from '../../controllers/testimonial.controller';
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = require("express");
const testimonial_controller_1 = require("../../controllers/testimonial.controller");
const router = (0, express_1.Router)();
router.get("/", testimonial_controller_1.getActiveTestimonials);
router.get("/admin", testimonial_controller_1.getAllTestimonials);
router.post("/", testimonial_controller_1.createTestimonial);
router.put("/:id", testimonial_controller_1.updateTestimonial);
router.delete("/:id", testimonial_controller_1.deleteTestimonial);
exports.default = router;
