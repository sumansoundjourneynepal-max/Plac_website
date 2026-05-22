import express from "express";
import {
  getProducts,
  getProductsForShop,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller";

const router = express.Router();

// Public routes
router.get("/shop", getProductsForShop);
router.get("/:id", getProductById);

// Admin routes
router.get("/", getProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
