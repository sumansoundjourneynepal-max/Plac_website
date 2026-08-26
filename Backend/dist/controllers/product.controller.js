"use strict";
// import type { Request, Response } from "express"
// import { Product } from "../models/product.model"
// import { uploadToCloudinary, uploadImages } from "../utils/cloudinary"
// import type { Express } from "express"
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsByInstrument = exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductsForShop = exports.getProductById = exports.getProducts = void 0;
const product_model_1 = require("../models/product.model");
const cloudinary_1 = require("../utils/cloudinary");
const groupFilesByFieldname = (rawFiles) => {
    const files = {};
    rawFiles.forEach((file) => {
        if (!files[file.fieldname]) {
            files[file.fieldname] = [];
        }
        files[file.fieldname].push(file);
    });
    return files;
};
const processBowlSetItems = (setItemsStr) => {
    console.log("=== PROCESS BOWL SET ITEMS START ===");
    if (!setItemsStr || setItemsStr === "[]" || setItemsStr === "") {
        console.log("No set items provided, returning empty array");
        return [];
    }
    try {
        const setItems = JSON.parse(setItemsStr);
        if (!Array.isArray(setItems)) {
            return [];
        }
        const processedSetItems = setItems.map((item) => {
            var _a, _b, _c;
            return ({
                code: ((_a = item.code) === null || _a === void 0 ? void 0 : _a.trim()) || "",
                size: ((_b = item.size) === null || _b === void 0 ? void 0 : _b.trim()) || "",
                weight: typeof item.weight === 'string' ? Number.parseFloat(item.weight) || 0 : item.weight || 0,
                musicalNote: ((_c = item.musicalNote) === null || _c === void 0 ? void 0 : _c.trim()) || "",
                inStock: item.inStock === "true" || item.inStock === true,
            });
        });
        console.log("Processed set items:", processedSetItems);
        console.log("=== PROCESS BOWL SET ITEMS END ===");
        return processedSetItems;
    }
    catch (error) {
        console.error("Error processing set items:", error);
        return [];
    }
};
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.Product.find().sort({ createdAt: -1 });
        res.json(products);
    }
    catch (error) {
        console.error("Error fetching products:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        res.status(500).json({ message: "Error fetching products", error: errorMessage });
    }
});
exports.getProducts = getProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let product = yield product_model_1.Product.findById(req.params.id).catch(() => null);
        if (!product) {
            product = yield product_model_1.Product.findOne({ id: req.params.id });
        }
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.json(product);
    }
    catch (error) {
        console.error("Error fetching product:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        res.status(500).json({ message: "Error fetching product", error: errorMessage });
    }
});
exports.getProductById = getProductById;
const getProductsForShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.Product.find({ inStock: true }).sort({ createdAt: -1 });
        res.json(products);
    }
    catch (error) {
        console.error("Error fetching products for shop:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        res.status(500).json({ message: "Error fetching products", error: errorMessage });
    }
});
exports.getProductsForShop = getProductsForShop;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    try {
        console.log("=== CREATE PRODUCT START ===");
        console.log("Request body:", req.body);
        const productData = req.body;
        let files = {};
        if (req.files && typeof req.files === 'object' && !Array.isArray(req.files)) {
            const filesObj = req.files;
            files = filesObj;
            console.log("Files object keys:", Object.keys(files));
            console.log("Images count:", files.images ? files.images.length : 0);
            console.log("Video count:", files.video ? files.video.length : 0);
        }
        if (!productData || Object.keys(productData).length === 0) {
            console.error("Empty request body received");
            res.status(400).json({
                message: "Request body is empty",
                received: productData,
            });
            return;
        }
        const isSet = productData.isSet === "true" || productData.isSet === true;
        console.log("\nIs set product?", isSet);
        if (isSet) {
            const requiredFields = [
                "id", "name", "price", "category", "soundInstrument", "description",
            ];
            const missingFields = [];
            const emptyFields = [];
            for (const field of requiredFields) {
                if (!productData[field]) {
                    missingFields.push(field);
                }
                else if (productData[field] === "") {
                    emptyFields.push(field);
                }
            }
            if (missingFields.length > 0 || emptyFields.length > 0) {
                res.status(400).json({
                    message: "Validation failed",
                    missingFields,
                    emptyFields,
                });
                return;
            }
        }
        else {
            const requiredFields = [
                "id", "name", "price", "weight", "size", "tone", "type",
                "soundInstrument", "bowlCode", "category", "description",
            ];
            const missingFields = [];
            const emptyFields = [];
            for (const field of requiredFields) {
                if (!productData[field]) {
                    missingFields.push(field);
                }
                else if (productData[field] === "") {
                    emptyFields.push(field);
                }
            }
            if (missingFields.length > 0 || emptyFields.length > 0) {
                res.status(400).json({
                    message: "Validation failed",
                    missingFields,
                    emptyFields,
                });
                return;
            }
        }
        let imageUrls = [];
        let videoUrl = "";
        if (files.images && files.images.length > 0) {
            try {
                console.log("\nUploading main product images:", files.images.length);
                imageUrls = yield (0, cloudinary_1.uploadImages)(files.images, "products");
                console.log("Main images uploaded successfully:", imageUrls);
            }
            catch (uploadError) {
                console.error("Image upload error:", uploadError);
                const errorMessage = uploadError instanceof Error ? uploadError.message : "Image upload failed";
                res.status(400).json({ message: "Failed to upload images", error: errorMessage });
                return;
            }
        }
        else {
            console.log("No image files found in request");
        }
        if (files.video && files.video.length > 0) {
            try {
                console.log("Uploading video:", files.video[0].originalname);
                console.log("Video file size:", files.video[0].size);
                console.log("Video file mimetype:", files.video[0].mimetype);
                const uploadResult = yield (0, cloudinary_1.uploadToCloudinary)(files.video[0].buffer, "products/videos", files.video[0].mimetype);
                videoUrl = uploadResult;
                console.log("Video uploaded successfully:", videoUrl);
            }
            catch (uploadError) {
                console.error("Video upload error:", uploadError);
                const errorMessage = uploadError instanceof Error ? uploadError.message : "Video upload failed";
                res.status(400).json({ message: "Failed to upload video", error: errorMessage });
                return;
            }
        }
        let setItems = [];
        if (isSet) {
            setItems = processBowlSetItems(productData.setItems);
            console.log("Processed set items:", setItems);
            if (setItems.length === 0) {
                console.log("No bowl set items provided - creating set without individual bowls");
            }
            else {
                for (const bowl of setItems) {
                    if (!bowl.code || !bowl.size || bowl.weight <= 0) {
                        console.error("Invalid bowl data:", bowl);
                        res.status(400).json({
                            message: "Each bowl in the set must have a code, size, and valid weight"
                        });
                        return;
                    }
                }
            }
        }
        console.log("\nValidating images...");
        console.log("Main image URLs:", imageUrls);
        if (imageUrls.length === 0) {
            console.error("No main product images provided");
            res.status(400).json({
                message: "At least one image is required for the product"
            });
            return;
        }
        const details = Array.isArray(productData.details)
            ? productData.details.filter((detail) => detail && detail.trim() !== "")
            : typeof productData.details === "string" && productData.details.trim() !== ""
                ? [productData.details.trim()]
                : [];
        const careInstructions = Array.isArray(productData.careInstructions)
            ? productData.careInstructions.filter((instruction) => instruction && instruction.trim() !== "")
            : typeof productData.careInstructions === "string" && productData.careInstructions.trim() !== ""
                ? [productData.careInstructions.trim()]
                : [];
        const price = typeof productData.price === "string" ? Number.parseFloat(productData.price) : productData.price;
        if (isNaN(price) || price <= 0) {
            console.error("Invalid price:", productData.price);
            res.status(400).json({ message: "Price must be a valid positive number" });
            return;
        }
        let weight = 0;
        if (!isSet) {
            weight = typeof productData.weight === "string" ? Number.parseFloat(productData.weight) : productData.weight;
            if (isNaN(weight) || weight <= 0) {
                console.error("Invalid weight:", productData.weight);
                res.status(400).json({ message: "Weight must be a valid positive number" });
                return;
            }
        }
        const newProductData = {
            id: productData.id.trim(),
            name: productData.name.trim(),
            price,
            size: isSet ? "Various" : (((_a = productData.size) === null || _a === void 0 ? void 0 : _a.trim()) || ""),
            tone: isSet ? "Full Range" : (((_b = productData.tone) === null || _b === void 0 ? void 0 : _b.trim()) || ""),
            type: isSet ? "Therapeutic Set" : (((_c = productData.type) === null || _c === void 0 ? void 0 : _c.trim()) || ""),
            weight: isSet ? 0 : weight,
            musicalNote: isSet ? "Multiple Notes" : (((_d = productData.musicalNote) === null || _d === void 0 ? void 0 : _d.trim()) || ""),
            bowlCode: isSet ? "N/A" : (((_e = productData.bowlCode) === null || _e === void 0 ? void 0 : _e.trim()) || ""),
            brand: (productData.brand || "OMSound Nepal").trim(),
            category: productData.category.trim(),
            soundInstrument: productData.soundInstrument.trim(),
            images: imageUrls,
            video: videoUrl || (productData.video ? productData.video.trim() : ""),
            audio: productData.audio ? productData.audio.trim() : "",
            description: productData.description.trim(),
            details,
            careInstructions,
            inStock: productData.inStock === "true" || productData.inStock === true,
            rating: typeof productData.rating === "string" ? Number.parseFloat(productData.rating) || 0 : productData.rating || 0,
            reviewCount: typeof productData.reviewCount === "string" ? Number.parseInt(productData.reviewCount) || 0 : productData.reviewCount || 0,
            seoTitle: productData.seoTitle ? productData.seoTitle.trim() : "",
            seoDescription: productData.seoDescription ? productData.seoDescription.trim() : "",
            seoKeywords: productData.seoKeywords ? productData.seoKeywords.trim() : "",
            isSet,
        };
        if (isSet && setItems.length > 0) {
            newProductData.setItems = setItems;
        }
        console.log("\nCreating product with processed data:", JSON.stringify(newProductData, null, 2));
        const product = new product_model_1.Product(newProductData);
        yield product.save();
        console.log("Product created successfully:", product);
        console.log("=== CREATE PRODUCT END ===");
        res.status(201).json(product);
    }
    catch (error) {
        console.error("Error creating product:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        res.status(400).json({ message: "Error creating product", error: errorMessage });
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    try {
        console.log("=== UPDATE PRODUCT START ===");
        const productData = req.body;
        console.log("Updating product with ID:", req.params.id);
        let files = {};
        if (req.files && typeof req.files === 'object' && !Array.isArray(req.files)) {
            const filesObj = req.files;
            files = filesObj;
            console.log("Update files keys:", Object.keys(files));
            console.log("Update images count:", files.images ? files.images.length : 0);
            console.log("Update video count:", files.video ? files.video.length : 0);
        }
        let existingProduct = yield product_model_1.Product.findById(req.params.id).catch(() => null);
        if (!existingProduct) {
            existingProduct = yield product_model_1.Product.findOne({ id: req.params.id });
        }
        if (!existingProduct) {
            console.error("Product not found:", req.params.id);
            res.status(404).json({ message: "Product not found" });
            return;
        }
        let imageUrls = [];
        let videoUrl = "";
        if (productData.existingImages) {
            const existingImages = Array.isArray(productData.existingImages)
                ? productData.existingImages
                : [productData.existingImages];
            imageUrls = existingImages.filter((img) => img && img.trim() !== "");
            console.log("Existing images from form:", imageUrls);
        }
        else {
            imageUrls = existingProduct.images || [];
            console.log("Keeping existing images from DB:", imageUrls);
        }
        if (files.images && files.images.length > 0) {
            try {
                console.log("Uploading new images:", files.images.length);
                const newImageUrls = yield (0, cloudinary_1.uploadImages)(files.images, "products");
                imageUrls = [...imageUrls, ...newImageUrls];
                console.log("New images uploaded:", newImageUrls);
            }
            catch (uploadError) {
                console.error("Image upload error:", uploadError);
                const errorMessage = uploadError instanceof Error ? uploadError.message : "Image upload failed";
                res.status(400).json({ message: "Failed to upload images", error: errorMessage });
                return;
            }
        }
        if (files.video && files.video.length > 0) {
            try {
                console.log("Uploading new video:", files.video[0].originalname);
                console.log("Video file size:", files.video[0].size);
                console.log("Video file mimetype:", files.video[0].mimetype);
                const uploadResult = yield (0, cloudinary_1.uploadToCloudinary)(files.video[0].buffer, "products/videos", files.video[0].mimetype);
                videoUrl = uploadResult;
                console.log("New video uploaded successfully:", videoUrl);
            }
            catch (uploadError) {
                console.error("Video upload error:", uploadError);
                const errorMessage = uploadError instanceof Error ? uploadError.message : "Video upload failed";
                res.status(400).json({ message: "Failed to upload video", error: errorMessage });
                return;
            }
        }
        else if (productData.video !== undefined && productData.video !== "") {
            videoUrl = productData.video.trim();
            console.log("Using video URL from form:", videoUrl);
        }
        else {
            videoUrl = existingProduct.video || "";
            console.log("Keeping existing video:", videoUrl);
        }
        const isSet = productData.isSet !== undefined
            ? productData.isSet === "true" || productData.isSet === true
            : existingProduct.isSet;
        console.log("Is set product?", isSet);
        let setItems = existingProduct.setItems || [];
        if (isSet && productData.setItems !== undefined) {
            setItems = processBowlSetItems(productData.setItems);
            console.log("Processed set items:", setItems);
            if (setItems.length === 0) {
                console.log("No bowl set items provided for update");
            }
        }
        else if (!isSet) {
            setItems = [];
        }
        console.log("\nValidating images for update...");
        console.log("Main image URLs:", imageUrls);
        if (imageUrls.length === 0) {
            console.error("No main product images provided for update");
            res.status(400).json({ message: "At least one image is required for the product" });
            return;
        }
        const details = Array.isArray(productData.details)
            ? productData.details.filter((detail) => detail.trim() !== "")
            : typeof productData.details === "string" && productData.details.trim() !== ""
                ? [productData.details.trim()]
                : [];
        const careInstructions = Array.isArray(productData.careInstructions)
            ? productData.careInstructions.filter((instruction) => instruction.trim() !== "")
            : typeof productData.careInstructions === "string" && productData.careInstructions.trim() !== ""
                ? [productData.careInstructions.trim()]
                : [];
        const updateData = {
            id: ((_a = productData.id) === null || _a === void 0 ? void 0 : _a.trim()) || existingProduct.id,
            name: ((_b = productData.name) === null || _b === void 0 ? void 0 : _b.trim()) || existingProduct.name,
            price: productData.price !== undefined
                ? (typeof productData.price === "string" ? Number.parseFloat(productData.price) : productData.price)
                : existingProduct.price,
            size: isSet ? "Various" : (((_c = productData.size) === null || _c === void 0 ? void 0 : _c.trim()) || existingProduct.size),
            tone: isSet ? "Full Range" : (((_d = productData.tone) === null || _d === void 0 ? void 0 : _d.trim()) || existingProduct.tone),
            type: isSet ? "Therapeutic Set" : (((_e = productData.type) === null || _e === void 0 ? void 0 : _e.trim()) || existingProduct.type),
            weight: isSet ? 0 : (productData.weight !== undefined
                ? (typeof productData.weight === "string" ? Number.parseFloat(productData.weight) : productData.weight)
                : existingProduct.weight),
            // FIXED: Properly handles empty string for musicalNote
            musicalNote: isSet ? "Multiple Notes" : (productData.musicalNote !== undefined ? (((_f = productData.musicalNote) === null || _f === void 0 ? void 0 : _f.trim()) || "") : existingProduct.musicalNote),
            bowlCode: isSet ? "N/A" : (((_g = productData.bowlCode) === null || _g === void 0 ? void 0 : _g.trim()) || existingProduct.bowlCode || ""),
            brand: ((_h = productData.brand) === null || _h === void 0 ? void 0 : _h.trim()) || existingProduct.brand,
            category: ((_j = productData.category) === null || _j === void 0 ? void 0 : _j.trim()) || existingProduct.category,
            soundInstrument: ((_k = productData.soundInstrument) === null || _k === void 0 ? void 0 : _k.trim()) || existingProduct.soundInstrument,
            images: imageUrls,
            video: videoUrl,
            audio: productData.audio !== undefined ? productData.audio.trim() : existingProduct.audio,
            description: ((_l = productData.description) === null || _l === void 0 ? void 0 : _l.trim()) || existingProduct.description,
            details: details.length > 0 ? details : existingProduct.details,
            careInstructions: careInstructions.length > 0 ? careInstructions : existingProduct.careInstructions,
            inStock: productData.inStock !== undefined
                ? (productData.inStock === "true" || productData.inStock === true)
                : existingProduct.inStock,
            rating: productData.rating !== undefined
                ? (typeof productData.rating === "string" ? Number.parseFloat(productData.rating) : productData.rating)
                : existingProduct.rating,
            reviewCount: productData.reviewCount !== undefined
                ? (typeof productData.reviewCount === "string" ? Number.parseInt(productData.reviewCount) : productData.reviewCount)
                : existingProduct.reviewCount,
            seoTitle: productData.seoTitle !== undefined ? productData.seoTitle.trim() : existingProduct.seoTitle,
            seoDescription: productData.seoDescription !== undefined ? productData.seoDescription.trim() : existingProduct.seoDescription,
            seoKeywords: productData.seoKeywords !== undefined ? productData.seoKeywords.trim() : existingProduct.seoKeywords,
            isSet,
            setItems,
        };
        console.log("\nUpdating with video:", videoUrl);
        console.log("Updating with data:", JSON.stringify(updateData, null, 2));
        const product = yield product_model_1.Product.findByIdAndUpdate(existingProduct._id, updateData, {
            new: true,
            runValidators: true,
        });
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        console.log("Product updated successfully:", product);
        console.log("=== UPDATE PRODUCT END ===");
        res.json(product);
    }
    catch (error) {
        console.error("Error updating product:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        res.status(400).json({ message: "Error updating product", error: errorMessage });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let product = yield product_model_1.Product.findByIdAndDelete(req.params.id).catch(() => null);
        if (!product) {
            product = yield product_model_1.Product.findOneAndDelete({ id: req.params.id });
        }
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.json({ message: "Product deleted successfully", deletedProduct: product });
    }
    catch (error) {
        console.error("Error deleting product:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        res.status(500).json({ message: "Error deleting product", error: errorMessage });
    }
});
exports.deleteProduct = deleteProduct;
const getProductsByInstrument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.params.name.toLowerCase();
        const products = yield product_model_1.Product.find({
            soundInstrument: { $regex: new RegExp("^" + name + "$", "i") }
        });
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch products", error });
    }
});
exports.getProductsByInstrument = getProductsByInstrument;
