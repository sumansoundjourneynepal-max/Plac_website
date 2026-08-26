"use strict";
// // routes/review.routes.ts
// import { Router } from "express" 
// import {
//   createReview,
//   getReviewsByProductId,
//   getReviewsByUserId,
//   getReviewById,
//   updateReview,
//   deleteReview,
//   getReviewStatsForProduct,
// } from "../controllers/review.controller"
Object.defineProperty(exports, "__esModule", { value: true });
// const router = Router() 
// router.get("/product/:productId", getReviewsByProductId)
// router.get("/user/:userId", getReviewsByUserId)
// router.get("/stats/:productId", getReviewStatsForProduct)
// router.get("/:id", getReviewById)
// router.post("/", createReview)
// router.put("/:id", updateReview)
// router.delete("/:id", deleteReview)
// export default router 
const express_1 = require("express");
const review_controller_1 = require("../controllers/review.controller");
const router = (0, express_1.Router)();
router.post("/", review_controller_1.createReview);
router.get("/product/:productId", review_controller_1.getReviewsByProductId);
// ADMIN
router.get("/admin/all", review_controller_1.getAllReviewsAdmin);
router.put("/admin/reply/:id", review_controller_1.adminReplyToReview);
exports.default = router;
