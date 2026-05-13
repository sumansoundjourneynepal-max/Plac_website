// // src/controllers/product.controller.ts
// import type { Request, Response } from "express"
// import { Product } from "../models/product.model"
// import { uploadToCloudinary, uploadImages } from "../utils/cloudinary"
// import type { Express } from "express"

// interface UploadedFiles {
//   images?: Express.Multer.File[]
//   video?: Express.Multer.File[]
//   [key: string]: Express.Multer.File[] | undefined
// }

// interface ProductRequestBody {
//   id: string
//   name: string
//   price: string | number
//   size: string
//   tone: string
//   weight: string | number
//   type: string
//   musicalNote?: string
//   bowlCode: string
//   brand: string
//   category: string
//   soundInstrument: string
//   description: string
//   details: string | string[]
//   careInstructions: string | string[]
//   inStock: string | boolean
//   rating: string | number
//   reviewCount: string | number
//   seoTitle?: string
//   seoDescription?: string
//   seoKeywords?: string
//   video?: string
//   audio?: string
//   existingImages?: string | string[]
//   isSet?: string | boolean
//   setItems?: string
// }

// const groupFilesByFieldname = (rawFiles: Express.Multer.File[]): UploadedFiles => {
//   const files: UploadedFiles = {};
  
//   rawFiles.forEach((file) => {
//     if (!files[file.fieldname]) {
//       files[file.fieldname] = [];
//     }
//     files[file.fieldname]!.push(file);
//   });
  
//   return files;
// }

// const processBowlSetItems = (setItemsStr: string | undefined): any[] => {
//   console.log("=== PROCESS BOWL SET ITEMS START ===")
  
//   if (!setItemsStr || setItemsStr === "[]" || setItemsStr === "") {
//     console.log("No set items provided, returning empty array")
//     return []
//   }

//   try {
//     const setItems = JSON.parse(setItemsStr)
    
//     if (!Array.isArray(setItems)) {
//       return []
//     }

//     const processedSetItems = setItems.map((item: any) => ({
//       code: item.code?.trim() || "",
//       size: item.size?.trim() || "",
//       weight: typeof item.weight === 'string' ? Number.parseFloat(item.weight) || 0 : item.weight || 0,
//       musicalNote: item.musicalNote?.trim() || "",
//       inStock: item.inStock === "true" || item.inStock === true,
//     }))
    
//     console.log("Processed set items:", processedSetItems)
//     console.log("=== PROCESS BOWL SET ITEMS END ===")
//     return processedSetItems
//   } catch (error) {
//     console.error("Error processing set items:", error)
//     return []
//   }
// }

// export const getProducts = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const products = await Product.find().sort({ createdAt: -1 })
//     res.json(products)
//   } catch (error: unknown) {
//     console.error("Error fetching products:", error)
//     const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
//     res.status(500).json({ message: "Error fetching products", error: errorMessage })
//   }
// }

// export const getProductById = async (req: Request, res: Response): Promise<void> => {
//   try {
//     let product = await Product.findById(req.params.id).catch(() => null)

//     if (!product) {
//       product = await Product.findOne({ id: req.params.id })
//     }

//     if (!product) {
//       res.status(404).json({ message: "Product not found" })
//       return
//     }
//     res.json(product)
//   } catch (error: unknown) {
//     console.error("Error fetching product:", error)
//     const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
//     res.status(500).json({ message: "Error fetching product", error: errorMessage })
//   }
// }

// export const getProductsForShop = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const products = await Product.find({ inStock: true }).sort({ createdAt: -1 })
//     res.json(products)
//   } catch (error: unknown) {
//     console.error("Error fetching products for shop:", error)
//     const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
//     res.status(500).json({ message: "Error fetching products", error: errorMessage })
//   }
// }

// export const createProduct = async (req: Request<{}, {}, ProductRequestBody>, res: Response): Promise<void> => {
//   try {
//     console.log("=== CREATE PRODUCT START ===")
//     console.log("Request body:", req.body)
    
//     const productData = req.body
    
//     let files: UploadedFiles = {}
    
//     if (req.files && typeof req.files === 'object' && !Array.isArray(req.files)) {
//       const filesObj = req.files as { [fieldname: string]: Express.Multer.File[] };
//       files = filesObj;
//       console.log("Files object keys:", Object.keys(files));
//       console.log("Images count:", files.images ? files.images.length : 0);
//       console.log("Video count:", files.video ? files.video.length : 0);
//     }

//     if (!productData || Object.keys(productData).length === 0) {
//       console.error("Empty request body received")
//       res.status(400).json({
//         message: "Request body is empty",
//         received: productData,
//       })
//       return
//     }

//     const isSet = productData.isSet === "true" || productData.isSet === true
//     console.log("\nIs set product?", isSet)
    
//     if (isSet) {
//       const requiredFields: (keyof ProductRequestBody)[] = [
//         "id", "name", "price", "category", "soundInstrument", "description",
//       ]
      
//       const missingFields: string[] = []
//       const emptyFields: string[] = []

//       for (const field of requiredFields) {
//         if (!productData[field]) {
//           missingFields.push(field)
//         } else if (productData[field] === "") {
//           emptyFields.push(field)
//         }
//       }

//       if (missingFields.length > 0 || emptyFields.length > 0) {
//         res.status(400).json({
//           message: "Validation failed",
//           missingFields,
//           emptyFields,
//         })
//         return
//       }
//     } else {
//       const requiredFields: (keyof ProductRequestBody)[] = [
//         "id", "name", "price", "weight", "size", "tone", "type",
//         "soundInstrument", "bowlCode", "category", "description",
//       ]

//       const missingFields: string[] = []
//       const emptyFields: string[] = []

//       for (const field of requiredFields) {
//         if (!productData[field]) {
//           missingFields.push(field)
//         } else if (productData[field] === "") {
//           emptyFields.push(field)
//         }
//       }

//       if (missingFields.length > 0 || emptyFields.length > 0) {
//         res.status(400).json({
//           message: "Validation failed",
//           missingFields,
//           emptyFields,
//         })
//         return
//       }
//     }

//     let imageUrls: string[] = []
//     let videoUrl = ""

//     if (files.images && files.images.length > 0) {
//       try {
//         console.log("\nUploading main product images:", files.images.length)
//         imageUrls = await uploadImages(files.images, "products")
//         console.log("Main images uploaded successfully:", imageUrls)
//       } catch (uploadError: unknown) {
//         console.error("Image upload error:", uploadError)
//         const errorMessage = uploadError instanceof Error ? uploadError.message : "Image upload failed"
//         res.status(400).json({ message: "Failed to upload images", error: errorMessage })
//         return
//       }
//     } else {
//       console.log("No image files found in request");
//     }

//     if (files.video && files.video.length > 0) {
//       try {
//         console.log("Uploading video:", files.video[0].originalname);
//         console.log("Video file size:", files.video[0].size);
//         console.log("Video file mimetype:", files.video[0].mimetype);
        
//         const uploadResult = await uploadToCloudinary(files.video[0].buffer, "products/videos", files.video[0].mimetype)
//         videoUrl = uploadResult
//         console.log("Video uploaded successfully:", videoUrl)
//       } catch (uploadError: unknown) {
//         console.error("Video upload error:", uploadError)
//         const errorMessage = uploadError instanceof Error ? uploadError.message : "Video upload failed"
//         res.status(400).json({ message: "Failed to upload video", error: errorMessage })
//         return
//       }
//     }

//     let setItems: any[] = []
//     if (isSet) {
//       setItems = processBowlSetItems(productData.setItems)
//       console.log("Processed set items:", setItems)
      
//       if (setItems.length === 0) {
//         console.log("No bowl set items provided - creating set without individual bowls")
//       } else {
//         for (const bowl of setItems) {
//           if (!bowl.code || !bowl.size || bowl.weight <= 0) {
//             console.error("Invalid bowl data:", bowl)
//             res.status(400).json({ 
//               message: "Each bowl in the set must have a code, size, and valid weight" 
//             })
//             return
//           }
//         }
//       }
//     }

//     console.log("\nValidating images...")
//     console.log("Main image URLs:", imageUrls)
    
//     if (imageUrls.length === 0) {
//       console.error("No main product images provided")
//       res.status(400).json({ 
//         message: "At least one image is required for the product" 
//       })
//       return
//     }

//     const details = Array.isArray(productData.details)
//       ? productData.details.filter((detail: string) => detail && detail.trim() !== "")
//       : typeof productData.details === "string" && productData.details.trim() !== ""
//         ? [productData.details.trim()]
//         : []

//     const careInstructions = Array.isArray(productData.careInstructions)
//       ? productData.careInstructions.filter((instruction: string) => instruction && instruction.trim() !== "")
//       : typeof productData.careInstructions === "string" && productData.careInstructions.trim() !== ""
//         ? [productData.careInstructions.trim()]
//         : []

//     const price = typeof productData.price === "string" ? Number.parseFloat(productData.price) : productData.price
//     if (isNaN(price) || price <= 0) {
//       console.error("Invalid price:", productData.price)
//       res.status(400).json({ message: "Price must be a valid positive number" })
//       return
//     }

//     let weight = 0
//     if (!isSet) {
//       weight = typeof productData.weight === "string" ? Number.parseFloat(productData.weight) : productData.weight
//       if (isNaN(weight) || weight <= 0) {
//         console.error("Invalid weight:", productData.weight)
//         res.status(400).json({ message: "Weight must be a valid positive number" })
//         return
//       }
//     }

//     const newProductData: any = {
//       id: productData.id.trim(),
//       name: productData.name.trim(),
//       price,
//       size: isSet ? "Various" : (productData.size?.trim() || ""),
//       tone: isSet ? "Full Range" : (productData.tone?.trim() || ""),
//       type: isSet ? "Therapeutic Set" : (productData.type?.trim() || ""),
//       weight: isSet ? 0 : weight,
//       musicalNote: isSet ? "Multiple Notes" : (productData.musicalNote?.trim() || ""),
//       bowlCode: isSet ? "N/A" : (productData.bowlCode?.trim() || ""),
//       brand: (productData.brand || "OMSound Nepal").trim(),
//       category: productData.category.trim(),
//       soundInstrument: productData.soundInstrument.trim(),
//       images: imageUrls,
//       video: videoUrl || (productData.video ? productData.video.trim() : ""),
//       audio: productData.audio ? productData.audio.trim() : "",
//       description: productData.description.trim(),
//       details,
//       careInstructions,
//       inStock: productData.inStock === "true" || productData.inStock === true,
//       rating: typeof productData.rating === "string" ? Number.parseFloat(productData.rating) || 0 : productData.rating || 0,
//       reviewCount: typeof productData.reviewCount === "string" ? Number.parseInt(productData.reviewCount) || 0 : productData.reviewCount || 0,
//       seoTitle: productData.seoTitle ? productData.seoTitle.trim() : "",
//       seoDescription: productData.seoDescription ? productData.seoDescription.trim() : "",
//       seoKeywords: productData.seoKeywords ? productData.seoKeywords.trim() : "",
//       isSet,
//     }
    
//     if (isSet && setItems.length > 0) {
//       newProductData.setItems = setItems
//     }

//     console.log("\nCreating product with processed data:", JSON.stringify(newProductData, null, 2))

//     const product = new Product(newProductData)
//     await product.save()

//     console.log("Product created successfully:", product)
//     console.log("=== CREATE PRODUCT END ===")
//     res.status(201).json(product)
//   } catch (error: unknown) {
//     console.error("Error creating product:", error)
//     const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
//     res.status(400).json({ message: "Error creating product", error: errorMessage })
//   }
// }

// export const updateProduct = async (
//   req: Request<{ id: string }, {}, ProductRequestBody>,
//   res: Response,
// ): Promise<void> => {
//   try {
//     console.log("=== UPDATE PRODUCT START ===")
//     const productData = req.body

//     console.log("Updating product with ID:", req.params.id)
    
//     let files: UploadedFiles = {}
    
//     if (req.files && typeof req.files === 'object' && !Array.isArray(req.files)) {
//       const filesObj = req.files as { [fieldname: string]: Express.Multer.File[] };
//       files = filesObj;
//       console.log("Update files keys:", Object.keys(files));
//       console.log("Update images count:", files.images ? files.images.length : 0);
//       console.log("Update video count:", files.video ? files.video.length : 0);
//     }

//     let existingProduct = await Product.findById(req.params.id).catch(() => null)

//     if (!existingProduct) {
//       existingProduct = await Product.findOne({ id: req.params.id })
//     }

//     if (!existingProduct) {
//       console.error("Product not found:", req.params.id)
//       res.status(404).json({ message: "Product not found" })
//       return
//     }

//     let imageUrls: string[] = []
//     let videoUrl = ""

//     if (productData.existingImages) {
//       const existingImages = Array.isArray(productData.existingImages)
//         ? productData.existingImages
//         : [productData.existingImages]
//       imageUrls = existingImages.filter((img: string) => img && img.trim() !== "")
//       console.log("Existing images from form:", imageUrls)
//     } else {
//       imageUrls = existingProduct.images || []
//       console.log("Keeping existing images from DB:", imageUrls)
//     }

//     if (files.images && files.images.length > 0) {
//       try {
//         console.log("Uploading new images:", files.images.length)
//         const newImageUrls = await uploadImages(files.images, "products")
//         imageUrls = [...imageUrls, ...newImageUrls]
//         console.log("New images uploaded:", newImageUrls)
//       } catch (uploadError: unknown) {
//         console.error("Image upload error:", uploadError)
//         const errorMessage = uploadError instanceof Error ? uploadError.message : "Image upload failed"
//         res.status(400).json({ message: "Failed to upload images", error: errorMessage })
//         return
//       }
//     }

//     if (files.video && files.video.length > 0) {
//       try {
//         console.log("Uploading new video:", files.video[0].originalname)
//         console.log("Video file size:", files.video[0].size)
//         console.log("Video file mimetype:", files.video[0].mimetype)
        
//         const uploadResult = await uploadToCloudinary(files.video[0].buffer, "products/videos", files.video[0].mimetype)
//         videoUrl = uploadResult
//         console.log("New video uploaded successfully:", videoUrl)
//       } catch (uploadError: unknown) {
//         console.error("Video upload error:", uploadError)
//         const errorMessage = uploadError instanceof Error ? uploadError.message : "Video upload failed"
//         res.status(400).json({ message: "Failed to upload video", error: errorMessage })
//         return
//       }
//     } else if (productData.video !== undefined && productData.video !== "") {
//       videoUrl = productData.video.trim()
//       console.log("Using video URL from form:", videoUrl)
//     } else {
//       videoUrl = existingProduct.video || ""
//       console.log("Keeping existing video:", videoUrl)
//     }

//     const isSet = productData.isSet !== undefined 
//       ? productData.isSet === "true" || productData.isSet === true 
//       : existingProduct.isSet

//     console.log("Is set product?", isSet)

//     let setItems: any[] = existingProduct.setItems || []
//     if (isSet && productData.setItems !== undefined) {
//       setItems = processBowlSetItems(productData.setItems)
//       console.log("Processed set items:", setItems)
      
//       if (setItems.length === 0) {
//         console.log("No bowl set items provided for update")
//       }
//     } else if (!isSet) {
//       setItems = []
//     }

//     console.log("\nValidating images for update...")
//     console.log("Main image URLs:", imageUrls)
    
//     if (imageUrls.length === 0) {
//       console.error("No main product images provided for update")
//       res.status(400).json({ message: "At least one image is required for the product" })
//       return
//     }

//     const details = Array.isArray(productData.details)
//       ? productData.details.filter((detail: string) => detail.trim() !== "")
//       : typeof productData.details === "string" && productData.details.trim() !== ""
//         ? [productData.details.trim()]
//         : []

//     const careInstructions = Array.isArray(productData.careInstructions)
//       ? productData.careInstructions.filter((instruction: string) => instruction.trim() !== "")
//       : typeof productData.careInstructions === "string" && productData.careInstructions.trim() !== ""
//         ? [productData.careInstructions.trim()]
//         : []

//     const updateData: any = {
//       id: productData.id?.trim() || existingProduct.id,
//       name: productData.name?.trim() || existingProduct.name,
//       price: productData.price !== undefined
//         ? (typeof productData.price === "string" ? Number.parseFloat(productData.price) : productData.price)
//         : existingProduct.price,
//       size: isSet ? "Various" : (productData.size?.trim() || existingProduct.size),
//       tone: isSet ? "Full Range" : (productData.tone?.trim() || existingProduct.tone),
//       type: isSet ? "Therapeutic Set" : (productData.type?.trim() || existingProduct.type),
//       weight: isSet ? 0 : (productData.weight !== undefined  
//         ? (typeof productData.weight === "string" ? Number.parseFloat(productData.weight) : productData.weight)
//         : existingProduct.weight),
//       // FIXED: Properly handles empty string for musicalNote
//       musicalNote: isSet ? "Multiple Notes" : (productData.musicalNote !== undefined ? (productData.musicalNote?.trim() || "") : existingProduct.musicalNote),
//       bowlCode: isSet ? "N/A" : (productData.bowlCode?.trim() || (existingProduct as any).bowlCode || ""),
//       brand: productData.brand?.trim() || existingProduct.brand,
//       category: productData.category?.trim() || existingProduct.category,
//       soundInstrument: productData.soundInstrument?.trim() || existingProduct.soundInstrument,
//       images: imageUrls,
//       video: videoUrl,
//       audio: productData.audio !== undefined ? productData.audio.trim() : existingProduct.audio,
//       description: productData.description?.trim() || existingProduct.description,
//       details: details.length > 0 ? details : existingProduct.details,
//       careInstructions: careInstructions.length > 0 ? careInstructions : existingProduct.careInstructions,
//       inStock: productData.inStock !== undefined
//         ? (productData.inStock === "true" || productData.inStock === true)
//         : existingProduct.inStock,
//       rating: productData.rating !== undefined
//         ? (typeof productData.rating === "string" ? Number.parseFloat(productData.rating) : productData.rating)
//         : existingProduct.rating,
//       reviewCount: productData.reviewCount !== undefined
//         ? (typeof productData.reviewCount === "string" ? Number.parseInt(productData.reviewCount) : productData.reviewCount)
//         : existingProduct.reviewCount,
//       seoTitle: productData.seoTitle !== undefined ? productData.seoTitle.trim() : existingProduct.seoTitle,
//       seoDescription: productData.seoDescription !== undefined ? productData.seoDescription.trim() : existingProduct.seoDescription,
//       seoKeywords: productData.seoKeywords !== undefined ? productData.seoKeywords.trim() : existingProduct.seoKeywords,
//       isSet,
//       setItems,
//     }

//     console.log("\nUpdating with video:", videoUrl)
//     console.log("Updating with data:", JSON.stringify(updateData, null, 2))

//     const product = await Product.findByIdAndUpdate(existingProduct._id, updateData, {
//       new: true,
//       runValidators: true,
//     })

//     if (!product) {
//       res.status(404).json({ message: "Product not found" })
//       return
//     }

//     console.log("Product updated successfully:", product)
//     console.log("=== UPDATE PRODUCT END ===")
//     res.json(product)
//   } catch (error: unknown) {
//     console.error("Error updating product:", error)
//     const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
//     res.status(400).json({ message: "Error updating product", error: errorMessage })
//   }
// }

// export const deleteProduct = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
//   try {
//     let product = await Product.findByIdAndDelete(req.params.id).catch(() => null)

//     if (!product) {
//       product = await Product.findOneAndDelete({ id: req.params.id })
//     }

//     if (!product) {
//       res.status(404).json({ message: "Product not found" })
//       return
//     }

//     res.json({ message: "Product deleted successfully", deletedProduct: product })
//   } catch (error: unknown) {
//     console.error("Error deleting product:", error)
//     const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
//     res.status(500).json({ message: "Error deleting product", error: errorMessage })
//   }
// }

// export const getProductsByInstrument = async (req: Request, res: Response) => {
//   try {
//     const name = req.params.name.toLowerCase()

//     const products = await Product.find({
//       soundInstrument: { $regex: new RegExp("^" + name + "$", "i") }
//     })

//     res.json(products)
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch products", error })
//   }
// }






//new

// src/controllers/product.controller.ts
import type { Request, Response } from "express"
import { Product } from "../models/product.model"
import { uploadToCloudinary, uploadImages } from "../utils/cloudinary"
import type { Express } from "express"
import NodeCache from 'node-cache'

// Cache TTL = 10 minutes (600 seconds), check period = 60 seconds
const productCache = new NodeCache({ stdTTL: 600, checkperiod: 60 });

interface UploadedFiles {
  images?: Express.Multer.File[]
  video?: Express.Multer.File[]
  [key: string]: Express.Multer.File[] | undefined
}

interface ProductRequestBody {
  id: string
  name: string
  price: string | number
  size: string
  tone: string
  weight: string | number
  type: string
  musicalNote?: string
  bowlCode: string
  brand: string
  category: string
  soundInstrument: string
  description: string
  details: string | string[]
  careInstructions: string | string[]
  inStock: string | boolean
  rating: string | number
  reviewCount: string | number
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
  video?: string
  audio?: string
  existingImages?: string | string[]
  isSet?: string | boolean
  setItems?: string
}

const groupFilesByFieldname = (rawFiles: Express.Multer.File[]): UploadedFiles => {
  const files: UploadedFiles = {};
  
  rawFiles.forEach((file) => {
    if (!files[file.fieldname]) {
      files[file.fieldname] = [];
    }
    files[file.fieldname]!.push(file);
  });
  
  return files;
}

const processBowlSetItems = (setItemsStr: string | undefined): any[] => {
  console.log("=== PROCESS BOWL SET ITEMS START ===")
  
  if (!setItemsStr || setItemsStr === "[]" || setItemsStr === "") {
    console.log("No set items provided, returning empty array")
    return []
  }

  try {
    const setItems = JSON.parse(setItemsStr)
    
    if (!Array.isArray(setItems)) {
      return []
    }

    const processedSetItems = setItems.map((item: any) => ({
      code: item.code?.trim() || "",
      size: item.size?.trim() || "",
      weight: typeof item.weight === 'string' ? Number.parseFloat(item.weight) || 0 : item.weight || 0,
      musicalNote: item.musicalNote?.trim() || "",
      inStock: item.inStock === "true" || item.inStock === true,
    }))
    
    console.log("Processed set items:", processedSetItems)
    console.log("=== PROCESS BOWL SET ITEMS END ===")
    return processedSetItems
  } catch (error) {
    console.error("Error processing set items:", error)
    return []
  }
}

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find().sort({ createdAt: -1 })
    res.json(products)
  } catch (error: unknown) {
    console.error("Error fetching products:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    res.status(500).json({ message: "Error fetching products", error: errorMessage })
  }
}

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    let product = await Product.findById(req.params.id).catch(() => null)

    if (!product) {
      product = await Product.findOne({ id: req.params.id })
    }

    if (!product) {
      res.status(404).json({ message: "Product not found" })
      return
    }
    res.json(product)
  } catch (error: unknown) {
    console.error("Error fetching product:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    res.status(500).json({ message: "Error fetching product", error: errorMessage })
  }
}

export const getProductsForShop = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check cache first
    const cachedProducts = productCache.get('products_for_shop');
    if (cachedProducts) {
      console.log('✅ Serving products from cache');
      res.json(cachedProducts);
      return;
    }

    // Cache miss – fetch from database
    console.log('🔄 Cache miss – fetching from database');
    const products = await Product.find({ inStock: true }).sort({ createdAt: -1 });
    
    // Store in cache
    productCache.set('products_for_shop', products);
    
    res.json(products);
  } catch (error: unknown) {
    console.error("Error fetching products for shop:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    res.status(500).json({ message: "Error fetching products", error: errorMessage })
  }
}

export const createProduct = async (req: Request<{}, {}, ProductRequestBody>, res: Response): Promise<void> => {
  try {
    console.log("=== CREATE PRODUCT START ===")
    console.log("Request body:", req.body)
    
    const productData = req.body
    
    let files: UploadedFiles = {}
    
    if (req.files && typeof req.files === 'object' && !Array.isArray(req.files)) {
      const filesObj = req.files as { [fieldname: string]: Express.Multer.File[] };
      files = filesObj;
      console.log("Files object keys:", Object.keys(files));
      console.log("Images count:", files.images ? files.images.length : 0);
      console.log("Video count:", files.video ? files.video.length : 0);
    }

    if (!productData || Object.keys(productData).length === 0) {
      console.error("Empty request body received")
      res.status(400).json({
        message: "Request body is empty",
        received: productData,
      })
      return
    }

    const isSet = productData.isSet === "true" || productData.isSet === true
    console.log("\nIs set product?", isSet)
    
    if (isSet) {
      const requiredFields: (keyof ProductRequestBody)[] = [
        "id", "name", "price", "category", "soundInstrument", "description",
      ]
      
      const missingFields: string[] = []
      const emptyFields: string[] = []

      for (const field of requiredFields) {
        if (!productData[field]) {
          missingFields.push(field)
        } else if (productData[field] === "") {
          emptyFields.push(field)
        }
      }

      if (missingFields.length > 0 || emptyFields.length > 0) {
        res.status(400).json({
          message: "Validation failed",
          missingFields,
          emptyFields,
        })
        return
      }
    } else {
      const requiredFields: (keyof ProductRequestBody)[] = [
        "id", "name", "price", "weight", "size", "tone", "type",
        "soundInstrument", "bowlCode", "category", "description",
      ]

      const missingFields: string[] = []
      const emptyFields: string[] = []

      for (const field of requiredFields) {
        if (!productData[field]) {
          missingFields.push(field)
        } else if (productData[field] === "") {
          emptyFields.push(field)
        }
      }

      if (missingFields.length > 0 || emptyFields.length > 0) {
        res.status(400).json({
          message: "Validation failed",
          missingFields,
          emptyFields,
        })
        return
      }
    }

    let imageUrls: string[] = []
    let videoUrl = ""

    if (files.images && files.images.length > 0) {
      try {
        console.log("\nUploading main product images:", files.images.length)
        imageUrls = await uploadImages(files.images, "products")
        console.log("Main images uploaded successfully:", imageUrls)
      } catch (uploadError: unknown) {
        console.error("Image upload error:", uploadError)
        const errorMessage = uploadError instanceof Error ? uploadError.message : "Image upload failed"
        res.status(400).json({ message: "Failed to upload images", error: errorMessage })
        return
      }
    } else {
      console.log("No image files found in request");
    }

    if (files.video && files.video.length > 0) {
      try {
        console.log("Uploading video:", files.video[0].originalname);
        console.log("Video file size:", files.video[0].size);
        console.log("Video file mimetype:", files.video[0].mimetype);
        
        const uploadResult = await uploadToCloudinary(files.video[0].buffer, "products/videos", files.video[0].mimetype)
        videoUrl = uploadResult
        console.log("Video uploaded successfully:", videoUrl)
      } catch (uploadError: unknown) {
        console.error("Video upload error:", uploadError)
        const errorMessage = uploadError instanceof Error ? uploadError.message : "Video upload failed"
        res.status(400).json({ message: "Failed to upload video", error: errorMessage })
        return
      }
    }

    let setItems: any[] = []
    if (isSet) {
      setItems = processBowlSetItems(productData.setItems)
      console.log("Processed set items:", setItems)
      
      if (setItems.length === 0) {
        console.log("No bowl set items provided - creating set without individual bowls")
      } else {
        for (const bowl of setItems) {
          if (!bowl.code || !bowl.size || bowl.weight <= 0) {
            console.error("Invalid bowl data:", bowl)
            res.status(400).json({ 
              message: "Each bowl in the set must have a code, size, and valid weight" 
            })
            return
          }
        }
      }
    }

    console.log("\nValidating images...")
    console.log("Main image URLs:", imageUrls)
    
    if (imageUrls.length === 0) {
      console.error("No main product images provided")
      res.status(400).json({ 
        message: "At least one image is required for the product" 
      })
      return
    }

    const details = Array.isArray(productData.details)
      ? productData.details.filter((detail: string) => detail && detail.trim() !== "")
      : typeof productData.details === "string" && productData.details.trim() !== ""
        ? [productData.details.trim()]
        : []

    const careInstructions = Array.isArray(productData.careInstructions)
      ? productData.careInstructions.filter((instruction: string) => instruction && instruction.trim() !== "")
      : typeof productData.careInstructions === "string" && productData.careInstructions.trim() !== ""
        ? [productData.careInstructions.trim()]
        : []

    const price = typeof productData.price === "string" ? Number.parseFloat(productData.price) : productData.price
    if (isNaN(price) || price <= 0) {
      console.error("Invalid price:", productData.price)
      res.status(400).json({ message: "Price must be a valid positive number" })
      return
    }

    let weight = 0
    if (!isSet) {
      weight = typeof productData.weight === "string" ? Number.parseFloat(productData.weight) : productData.weight
      if (isNaN(weight) || weight <= 0) {
        console.error("Invalid weight:", productData.weight)
        res.status(400).json({ message: "Weight must be a valid positive number" })
        return
      }
    }

    const newProductData: any = {
      id: productData.id.trim(),
      name: productData.name.trim(),
      price,
      size: isSet ? "Various" : (productData.size?.trim() || ""),
      tone: isSet ? "Full Range" : (productData.tone?.trim() || ""),
      type: isSet ? "Therapeutic Set" : (productData.type?.trim() || ""),
      weight: isSet ? 0 : weight,
      musicalNote: isSet ? "Multiple Notes" : (productData.musicalNote?.trim() || ""),
      bowlCode: isSet ? "N/A" : (productData.bowlCode?.trim() || ""),
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
    }
    
    if (isSet && setItems.length > 0) {
      newProductData.setItems = setItems
    }

    console.log("\nCreating product with processed data:", JSON.stringify(newProductData, null, 2))

    const product = new Product(newProductData)
    await product.save()

    // Invalidate products cache after creating a new product
    productCache.del('products_for_shop');
    console.log('🗑️ Products cache cleared after creation');

    console.log("Product created successfully:", product)
    console.log("=== CREATE PRODUCT END ===")
    res.status(201).json(product)
  } catch (error: unknown) {
    console.error("Error creating product:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    res.status(400).json({ message: "Error creating product", error: errorMessage })
  }
}

export const updateProduct = async (
  req: Request<{ id: string }, {}, ProductRequestBody>,
  res: Response,
): Promise<void> => {
  try {
    console.log("=== UPDATE PRODUCT START ===")
    const productData = req.body

    console.log("Updating product with ID:", req.params.id)
    
    let files: UploadedFiles = {}
    
    if (req.files && typeof req.files === 'object' && !Array.isArray(req.files)) {
      const filesObj = req.files as { [fieldname: string]: Express.Multer.File[] };
      files = filesObj;
      console.log("Update files keys:", Object.keys(files));
      console.log("Update images count:", files.images ? files.images.length : 0);
      console.log("Update video count:", files.video ? files.video.length : 0);
    }

    let existingProduct = await Product.findById(req.params.id).catch(() => null)

    if (!existingProduct) {
      existingProduct = await Product.findOne({ id: req.params.id })
    }

    if (!existingProduct) {
      console.error("Product not found:", req.params.id)
      res.status(404).json({ message: "Product not found" })
      return
    }

    let imageUrls: string[] = []
    let videoUrl = ""

    if (productData.existingImages) {
      const existingImages = Array.isArray(productData.existingImages)
        ? productData.existingImages
        : [productData.existingImages]
      imageUrls = existingImages.filter((img: string) => img && img.trim() !== "")
      console.log("Existing images from form:", imageUrls)
    } else {
      imageUrls = existingProduct.images || []
      console.log("Keeping existing images from DB:", imageUrls)
    }

    if (files.images && files.images.length > 0) {
      try {
        console.log("Uploading new images:", files.images.length)
        const newImageUrls = await uploadImages(files.images, "products")
        imageUrls = [...imageUrls, ...newImageUrls]
        console.log("New images uploaded:", newImageUrls)
      } catch (uploadError: unknown) {
        console.error("Image upload error:", uploadError)
        const errorMessage = uploadError instanceof Error ? uploadError.message : "Image upload failed"
        res.status(400).json({ message: "Failed to upload images", error: errorMessage })
        return
      }
    }

    if (files.video && files.video.length > 0) {
      try {
        console.log("Uploading new video:", files.video[0].originalname)
        console.log("Video file size:", files.video[0].size)
        console.log("Video file mimetype:", files.video[0].mimetype)
        
        const uploadResult = await uploadToCloudinary(files.video[0].buffer, "products/videos", files.video[0].mimetype)
        videoUrl = uploadResult
        console.log("New video uploaded successfully:", videoUrl)
      } catch (uploadError: unknown) {
        console.error("Video upload error:", uploadError)
        const errorMessage = uploadError instanceof Error ? uploadError.message : "Video upload failed"
        res.status(400).json({ message: "Failed to upload video", error: errorMessage })
        return
      }
    } else if (productData.video !== undefined && productData.video !== "") {
      videoUrl = productData.video.trim()
      console.log("Using video URL from form:", videoUrl)
    } else {
      videoUrl = existingProduct.video || ""
      console.log("Keeping existing video:", videoUrl)
    }

    const isSet = productData.isSet !== undefined 
      ? productData.isSet === "true" || productData.isSet === true 
      : existingProduct.isSet

    console.log("Is set product?", isSet)

    let setItems: any[] = existingProduct.setItems || []
    if (isSet && productData.setItems !== undefined) {
      setItems = processBowlSetItems(productData.setItems)
      console.log("Processed set items:", setItems)
      
      if (setItems.length === 0) {
        console.log("No bowl set items provided for update")
      }
    } else if (!isSet) {
      setItems = []
    }

    console.log("\nValidating images for update...")
    console.log("Main image URLs:", imageUrls)
    
    if (imageUrls.length === 0) {
      console.error("No main product images provided for update")
      res.status(400).json({ message: "At least one image is required for the product" })
      return
    }

    const details = Array.isArray(productData.details)
      ? productData.details.filter((detail: string) => detail.trim() !== "")
      : typeof productData.details === "string" && productData.details.trim() !== ""
        ? [productData.details.trim()]
        : []

    const careInstructions = Array.isArray(productData.careInstructions)
      ? productData.careInstructions.filter((instruction: string) => instruction.trim() !== "")
      : typeof productData.careInstructions === "string" && productData.careInstructions.trim() !== ""
        ? [productData.careInstructions.trim()]
        : []

    const updateData: any = {
      id: productData.id?.trim() || existingProduct.id,
      name: productData.name?.trim() || existingProduct.name,
      price: productData.price !== undefined
        ? (typeof productData.price === "string" ? Number.parseFloat(productData.price) : productData.price)
        : existingProduct.price,
      size: isSet ? "Various" : (productData.size?.trim() || existingProduct.size),
      tone: isSet ? "Full Range" : (productData.tone?.trim() || existingProduct.tone),
      type: isSet ? "Therapeutic Set" : (productData.type?.trim() || existingProduct.type),
      weight: isSet ? 0 : (productData.weight !== undefined  
        ? (typeof productData.weight === "string" ? Number.parseFloat(productData.weight) : productData.weight)
        : existingProduct.weight),
      // FIXED: Properly handles empty string for musicalNote
      musicalNote: isSet ? "Multiple Notes" : (productData.musicalNote !== undefined ? (productData.musicalNote?.trim() || "") : existingProduct.musicalNote),
      bowlCode: isSet ? "N/A" : (productData.bowlCode?.trim() || (existingProduct as any).bowlCode || ""),
      brand: productData.brand?.trim() || existingProduct.brand,
      category: productData.category?.trim() || existingProduct.category,
      soundInstrument: productData.soundInstrument?.trim() || existingProduct.soundInstrument,
      images: imageUrls,
      video: videoUrl,
      audio: productData.audio !== undefined ? productData.audio.trim() : existingProduct.audio,
      description: productData.description?.trim() || existingProduct.description,
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
    }

    console.log("\nUpdating with video:", videoUrl)
    console.log("Updating with data:", JSON.stringify(updateData, null, 2))

    const product = await Product.findByIdAndUpdate(existingProduct._id, updateData, {
      new: true,
      runValidators: true,
    })

    if (!product) {
      res.status(404).json({ message: "Product not found" })
      return
    }

    // Invalidate products cache after updating a product
    productCache.del('products_for_shop');
    console.log('🗑️ Products cache cleared after update');

    console.log("Product updated successfully:", product)
    console.log("=== UPDATE PRODUCT END ===")
    res.json(product)
  } catch (error: unknown) {
    console.error("Error updating product:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    res.status(400).json({ message: "Error updating product", error: errorMessage })
  }
}

export const deleteProduct = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    let product = await Product.findByIdAndDelete(req.params.id).catch(() => null)

    if (!product) {
      product = await Product.findOneAndDelete({ id: req.params.id })
    }

    if (!product) {
      res.status(404).json({ message: "Product not found" })
      return
    }

    // Invalidate products cache after deleting a product
    productCache.del('products_for_shop');
    console.log('🗑️ Products cache cleared after deletion');

    res.json({ message: "Product deleted successfully", deletedProduct: product })
  } catch (error: unknown) {
    console.error("Error deleting product:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    res.status(500).json({ message: "Error deleting product", error: errorMessage })
  }
}

export const getProductsByInstrument = async (req: Request, res: Response) => {
  try {
    const name = req.params.name.toLowerCase()

    const products = await Product.find({
      soundInstrument: { $regex: new RegExp("^" + name + "$", "i") }
    })

    res.json(products)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error })
  }
}




