"use strict";
// // routes/product.routes.ts
// import express from "express"
// import {
//   createProduct,
//   getProducts,
//   getProductById,
//   updateProduct,
//   deleteProduct,
//   getProductsForShop,
// } from "../controllers/product.controller"
// import { uploadFiles } from "../utils/multer"
// import { asyncHandler } from "../utils/asyncHandler.utils"
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const router = express.Router()
// // Add logging middleware
// router.use((req, res, next) => {
//   console.log(`${req.method} ${req.path}`)
//   console.log("Headers:", req.headers)
//   next()
// })
// // Public routes
// router.get("/shop", asyncHandler(getProductsForShop))
// router.get("/:id", asyncHandler(getProductById)) // This will handle both MongoDB _id and custom id
// // Admin routes - Make sure these come after the specific routes
// router.get("/", asyncHandler(getProducts))
// // Add specific logging for POST route
// router.post(
//   "/",
//   (req, res, next) => {
//     console.log("POST /products - Before multer")
//     next()
//   },
//   uploadFiles,
//   (req, res, next) => {
//     console.log("POST /products - After multer")
//     console.log("Body:", req.body)
//     console.log("Files:", req.files)
//     next()
//   },
//   asyncHandler(createProduct),
// )
// router.put("/:id", uploadFiles, asyncHandler(updateProduct))
// router.delete("/:id", asyncHandler(deleteProduct))
// export default router
//new
// // routes/product.routes.ts
// import express from "express"
// import {
//   createProduct,
//   getProducts,
//   getProductById,
//   updateProduct,
//   deleteProduct,
//   getProductsForShop,
//   getProductsByInstrument,
// } from "../controllers/product.controller"
// import { uploadFiles } from "../utils/multer"
// import { asyncHandler } from "../utils/asyncHandler.utils"
// const router = express.Router()
// // Add logging middleware
// router.use((req, res, next) => {
//   console.log(`${req.method} ${req.path}`)
//   console.log("Headers:", req.headers)
//   next()
// })
// // Public routes
// router.get("/shop", asyncHandler(getProductsForShop))
// router.get("/:id", asyncHandler(getProductById)) // This will handle both MongoDB _id and custom id
// // Admin routes - Make sure these come after the specific routes
// router.get("/", asyncHandler(getProducts))
// // Add specific logging for POST route
// router.post(
//   "/",
//   (req, res, next) => {
//     console.log("POST /products - Before multer")
//     next()
//   },
//   uploadFiles,
//   (req, res, next) => {
//     console.log("POST /products - After multer")
//     console.log("Body:", req.body)
//     console.log("Files:", req.files)
//     next()
//   },
//   asyncHandler(createProduct),
// )
// router.put("/:id", uploadFiles, asyncHandler(updateProduct))
// router.delete("/:id", asyncHandler(deleteProduct))
// router.get("/instrument/:name", getProductsByInstrument)
// export default router
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product.controller");
const multer_1 = require("../utils/multer");
const asyncHandler_utils_1 = require("../utils/asyncHandler.utils");
const router = express_1.default.Router();
router.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    console.log("Headers:", req.headers);
    next();
});
router.get("/shop", (0, asyncHandler_utils_1.asyncHandler)(product_controller_1.getProductsForShop));
router.get("/:id", (0, asyncHandler_utils_1.asyncHandler)(product_controller_1.getProductById));
router.get("/", (0, asyncHandler_utils_1.asyncHandler)(product_controller_1.getProducts));
router.post("/", (req, res, next) => {
    console.log("POST /products - Before multer");
    next();
}, multer_1.uploadFiles, (req, res, next) => {
    console.log("POST /products - After multer");
    console.log("Body:", req.body);
    console.log("Files:", req.files);
    next();
}, (0, asyncHandler_utils_1.asyncHandler)(product_controller_1.createProduct));
router.put("/:id", multer_1.uploadFiles, (0, asyncHandler_utils_1.asyncHandler)(product_controller_1.updateProduct));
router.delete("/:id", (0, asyncHandler_utils_1.asyncHandler)(product_controller_1.deleteProduct));
router.get("/instrument/:name", product_controller_1.getProductsByInstrument);
exports.default = router;
