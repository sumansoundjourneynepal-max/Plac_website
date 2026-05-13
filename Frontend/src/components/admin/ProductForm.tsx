

//new

// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { X, Upload, Trash2, Plus, Image as ImageIcon } from "lucide-react"
// import type { Product } from "../../context/ProductContext"

// interface ProductFormProps {
//   product?: Product | null
//   onSubmit: (formData: FormData) => Promise<void>
//   onCancel: () => void
//   loading?: boolean
// }

// interface BowlSetImage {
//   file: File | null
//   url: string 
//   id?: string
// }

// interface BowlSetItem {
//   code: string
//   size: string
//   weight: number
//   musicalNote: string
//   inStock: boolean
//   images: BowlSetImage[]
// }

// interface FormState {
//   id: string
//   name: string
//   price: number
//   weight: number
//   size: string
//   tone: string
//   type: string
//   musicalNote: string
//   brand: string
//   category: string
//   soundInstrument: string
//   description: string
//   details: string[]
//   careInstructions: string[]
//   inStock: boolean
//   rating: number
//   reviewCount: number
//   seoKeywords: string
//   seoTitle: string
//   seoDescription: string
//   video: string
//   audio: string
//   isSet: boolean
//   setItems: BowlSetItem[]
// }

// const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onCancel, loading = false }) => {
//   const [activeTab, setActiveTab] = useState<"product" | "seo">("product")
//   const [imageFiles, setImageFiles] = useState<File[]>([])
//   const [videoFile, setVideoFile] = useState<File | null>(null)
//   const [existingImages, setExistingImages] = useState<string[]>([])
//   const [uploadProgress, setUploadProgress] = useState(0)
//   const [formData, setFormData] = useState<FormState>({
//     id: "",
//     name: "",
//     price: 0,
//     weight: 0,
//     size: "",
//     tone: "",
//     type: "",
//     musicalNote: "",
//     brand: "OMSound Nepal",
//     category: "",
//     soundInstrument: "",
//     description: "",
//     details: [""],
//     careInstructions: [""],
//     inStock: true,
//     rating: 0,
//     reviewCount: 0,
//     seoKeywords: "",
//     seoTitle: "",
//     seoDescription: "",
//     video: "",
//     audio: "",
//     isSet: false,
//     setItems: [],
//   })

//   useEffect(() => {
//     if (product) {
//       const productSetItems = (product as any)?.setItems || []
//       const parsedSetItems = Array.isArray(productSetItems) 
//         ? productSetItems.map((item: any, index: number) => {
//             // Handle images - could be array of URLs or single URL
//             let images: BowlSetImage[] = []
//             if (Array.isArray(item.images)) {
//               images = item.images.map((img: string | any, imgIndex: number) => ({
//                 file: null,
//                 url: typeof img === 'string' ? img : img.url || "",
//                 id: `bowl-${index}-img-${imgIndex}`
//               }))
//             } else if (item.image) {
//               // For backward compatibility with single image field
//               images = [{
//                 file: null,
//                 url: item.image,
//                 id: `bowl-${index}-img-0`
//               }]
//             }
            
//             return {
//               code: item.code || "",
//               size: item.size || "",
//               weight: item.weight || 0,
//               musicalNote: item.musicalNote || "",
//               inStock: item.inStock !== undefined ? item.inStock : true,
//               images: images
//             }
//           })
//         : []
      
//       setFormData({
//         id: product.id || "",
//         name: product.name || "",
//         price: product.price || 0,
//         weight: product.weight || 0,
//         size: product.size || "",
//         tone: product.tone || "",
//         type: product.type || "",
//         musicalNote: product.musicalNote || "",
//         brand: product.brand || "OMSound Nepal",
//         category: product.category || "",
//         soundInstrument: product.soundInstrument || "",
//         description: product.description || "",
//         details: product.details?.length ? product.details : [""],
//         careInstructions: product.careInstructions?.length ? product.careInstructions : [""],
//         inStock: product.inStock ?? true,
//         rating: product.rating || 0,
//         reviewCount: product.reviewCount || 0,
//         seoKeywords: product.seoKeywords || "",
//         seoTitle: product.seoTitle || "",
//         seoDescription: product.seoDescription || "",
//         video: product.video || "",
//         audio: product.audio || "",
//         isSet: (product as any)?.isSet || false,
//         setItems: parsedSetItems,
//       })
//       setExistingImages(product.images || [])
//     } else {
//       // Generate unique ID for new products
//       setFormData((prev) => ({
//         ...prev,
//         id: `bowl-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
//       }))
//     }
//   }, [product])

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]:
//         type === "checkbox"
//           ? (e.target as HTMLInputElement).checked
//           : type === "number"
//             ? Number.parseFloat(value) || 0
//             : value,
//     }))
//   }

//   const handleArrayChange = (field: "details" | "careInstructions", index: number, value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: prev[field].map((item, i) => (i === index ? value : item)),
//     }))
//   }

//   const addArrayItem = (field: "details" | "careInstructions") => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: [...prev[field], ""],
//     }))
//   }

//   const removeArrayItem = (field: "details" | "careInstructions", index: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: prev[field].filter((_, i) => i !== index),
//     }))
//   }

//   const updateSetItem = (
//     index: number,
//     field: keyof BowlSetItem,
//     value: string | number | boolean | BowlSetImage[]
//   ) => {
//     setFormData((prev) => ({
//       ...prev,
//       setItems: prev.setItems.map((item, i) =>
//         i === index ? { ...item, [field]: value } : item
//       ),
//     }))
//   }

//   const addSetItem = () => {
//     setFormData((prev) => ({
//       ...prev,
//       setItems: [
//         ...prev.setItems,
//         { 
//           code: `S${prev.setItems.length + 1}`, 
//           size: "", 
//           weight: 0, 
//           musicalNote: "", 
//           inStock: true,
//           images: []
//         }
//       ],
//     }))
//   }

//   const removeSetItem = (index: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       setItems: prev.setItems.filter((_, i) => i !== index),
//     }))
//   }

//   const handleSetItemImagesUpload = (bowlIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || [])
    
//     const validFiles = files.filter((file) => {
//       const isValidType = ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(file.type)
//       const isValidSize = file.size <= 10 * 1024 * 1024 // 10MB
//       return isValidType && isValidSize
//     })

//     if (validFiles.length > 0) {
//       const currentBowl = formData.setItems[bowlIndex]
//       const currentImages = currentBowl?.images || []
      
//       // Calculate how many more images we can add (max 3 per bowl)
//       const availableSlots = 3 - currentImages.length
//       const filesToAdd = validFiles.slice(0, availableSlots)
      
//       if (filesToAdd.length === 0) {
//         alert("Maximum 3 images per bowl. Please remove some images first.")
//         return
//       }
      
//       const newImages: BowlSetImage[] = filesToAdd.map(file => ({
//         file,
//         url: "",
//         id: `bowl-${bowlIndex}-img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
//       }))
      
//       const updatedImages = [...currentImages, ...newImages]
//       updateSetItem(bowlIndex, "images", updatedImages)
//     } else {
//       alert("Please upload valid image files (JPEG, PNG, GIF, WebP) under 10MB")
//     }
//   }

//   const removeSetItemImage = (bowlIndex: number, imageIndex: number) => {
//     const currentBowl = formData.setItems[bowlIndex]
//     if (!currentBowl) return
    
//     const updatedImages = currentBowl.images.filter((_, i) => i !== imageIndex)
//     updateSetItem(bowlIndex, "images", updatedImages)
//   }

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || [])
//     const validFiles = files.filter((file) => {
//       const isValidType = ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(file.type)
//       const isValidSize = file.size <= 10 * 1024 * 1024 // 10MB
//       return isValidType && isValidSize
//     })

//     setImageFiles((prev) => [...prev, ...validFiles])
//   }

//   const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file && file.size <= 50 * 1024 * 1024) {
//       // 50MB
//       setVideoFile(file)
//     }
//   }

//   const removeImage = (index: number, isExisting = false) => {
//     if (isExisting) {
//       setExistingImages((prev) => prev.filter((_, i) => i !== index))
//     } else {
//       setImageFiles((prev) => prev.filter((_, i) => i !== index))
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()

//     console.log("=== FORM SUBMIT START ===")
//     console.log("Form data state:", formData)
//     console.log("Image files:", imageFiles)
//     console.log("Video file:", videoFile)
//     console.log("Existing images:", existingImages)

//     // Basic validation for all products
//     if (
//       !formData.name ||
//       !formData.price ||
//       !formData.category ||
//       !formData.description
//     ) {
//       alert("Please fill all required fields")
//       return
//     }

//     if (!formData.isSet) {
//       // Single product validation
//       if (!formData.size || !formData.weight || !formData.tone || !formData.type || !formData.musicalNote) {
//         alert("Please complete single bowl details")
//         return
//       }
      
//       // Single products require main product images
//       if (imageFiles.length === 0 && existingImages.length === 0) {
//         alert("Please upload at least one image for the product")
//         return
//       }
//     } else {
//       // Bowl set validation
//       const valid = formData.setItems.some(i => i.size && i.weight > 0 && i.code)
//       if (!valid) {
//         alert("Please add at least one bowl to the set with size, weight, and code")
//         return
//       }
      
//       // Bowl sets require at least one bowl with at least one image OR main product images
//       const hasBowlImages = formData.setItems.some(bowl => bowl.images.length > 0)
//       const hasMainImages = imageFiles.length > 0 || existingImages.length > 0
      
//       if (!hasBowlImages && !hasMainImages) {
//         alert("Please upload at least one image for the set (either main product images or images for individual bowls)")
//         return
//       }
      
//       // Validate bowl images (optional, but if present, max 3)
//       for (const bowl of formData.setItems) {
//         if (bowl.images.length > 3) {
//           alert(`Bowl ${bowl.code} has too many images. Maximum 3 images per bowl.`)
//           return
//         }
//       }
//     }

//     try {
//       setUploadProgress(10)

//       const submitData = new FormData()

//       // Add basic fields with validation
//       submitData.append("id", formData.id.trim())
//       submitData.append("name", formData.name.trim())
//       submitData.append("price", formData.price.toString())
//       submitData.append("brand", formData.brand.trim())
//       submitData.append("category", formData.category.trim())
//       submitData.append("soundInstrument", formData.soundInstrument.trim())
//       submitData.append("description", formData.description.trim())
//       submitData.append("inStock", formData.inStock.toString())
//       submitData.append("rating", formData.rating.toString())
//       submitData.append("reviewCount", formData.reviewCount.toString())
//       submitData.append("seoKeywords", formData.seoKeywords.trim())
//       submitData.append("seoTitle", formData.seoTitle.trim())
//       submitData.append("seoDescription", formData.seoDescription.trim())
//       submitData.append("video", formData.video.trim())
//       submitData.append("audio", formData.audio.trim())
//       submitData.append("isSet", formData.isSet.toString())

//       // Add single product fields only if not a set
//       if (!formData.isSet) {
//         submitData.append("size", formData.size.trim())
//         submitData.append("weight", formData.weight.toString())
//         submitData.append("tone", formData.tone.trim())
//         submitData.append("type", formData.type.trim())
//         submitData.append("musicalNote", formData.musicalNote.trim())
//       } else {
//         // For bowl sets, we still need to send default values for validation
//         submitData.append("size", "Various")
//         submitData.append("weight", "0")
//         submitData.append("tone", "Full Range")
//         submitData.append("type", "Therapeutic Set")
//         submitData.append("musicalNote", "Multiple Notes")
//       }

//       setUploadProgress(30)

//       // Add set items if this is a set
//       if (formData.isSet) {
//         // Prepare set items for JSON
//         const setItemsForJson = formData.setItems.map((item, bowlIndex) => ({
//           code: item.code,
//           size: item.size,
//           weight: item.weight,
//           musicalNote: item.musicalNote,
//           inStock: item.inStock,
//           images: item.images.map(img => img.url).filter(url => url) // Only include URLs, not files
//         }))
//         submitData.append("setItems", JSON.stringify(setItemsForJson))
        
//         // Add individual bowl images
//         formData.setItems.forEach((item, bowlIndex) => {
//           item.images.forEach((img, imgIndex) => {
//             if (img.file) {
//               submitData.append(`setItem_${bowlIndex}_image_${imgIndex}`, img.file)
//             }
//             if (img.url) {
//               submitData.append(`setItem_${bowlIndex}_imageUrl_${imgIndex}`, img.url)
//             }
//           })
//         })
//       }

//       // Add arrays - ensure they're not empty
//       const filteredDetails = formData.details.filter((item) => item.trim() !== "")
//       if (filteredDetails.length > 0) {
//         filteredDetails.forEach((detail) => {
//           submitData.append("details", detail.trim())
//         })
//       } else {
//         // Add at least one empty detail to avoid validation issues
//         submitData.append("details", "Handcrafted singing bowl")
//       }

//       const filteredInstructions = formData.careInstructions.filter((item) => item.trim() !== "")
//       if (filteredInstructions.length > 0) {
//         filteredInstructions.forEach((instruction) => {
//           submitData.append("careInstructions", instruction.trim())
//         })
//       } else {
//         // Add default care instruction
//         submitData.append("careInstructions", "Clean with soft cloth")
//       }

//       // Add existing images (only if they exist)
//       if (existingImages.length > 0) {
//         existingImages.forEach((image) => {
//           submitData.append("existingImages", image)
//         })
//       }

//       setUploadProgress(50)

//       // Add new image files (only if they exist)
//       if (imageFiles.length > 0) {
//         imageFiles.forEach((file) => {
//           submitData.append("images", file)
//         })
//       }

//       setUploadProgress(70)

//       // Add video file
//       if (videoFile) {
//         submitData.append("video", videoFile)
//       }

//       setUploadProgress(90)

//       console.log("FormData contents:")
//       for (const [key, value] of submitData.entries()) {
//         console.log(key, value)
//       }

//       await onSubmit(submitData)

//       setUploadProgress(100)

//       // Reset form
//       setImageFiles([])
//       setVideoFile(null)
//       setExistingImages([])
//       setUploadProgress(0)

//       console.log("=== FORM SUBMIT SUCCESS ===")
//     } catch (error) {
//       setUploadProgress(0)
//       console.error("Form submission error:", error)
//       console.log("=== FORM SUBMIT ERROR ===")
//     }
//   }

//   const generateSEOSuggestions = () => {
//     if (!formData.name) return []

//     const suggestions = [
//       `${formData.name.toLowerCase()}`,
//       `${formData.name.toLowerCase()} singing bowl`,
//       `buy ${formData.name.toLowerCase()}`,
//       "himalayan singing bowl",
//       "sound healing bowl",
//       "meditation bowl",
//       "tibetan bowl",
//       "nepal singing bowl",
//     ]

//     if (formData.size) suggestions.push(`${formData.size.toLowerCase()} singing bowl`)
//     if (formData.tone) suggestions.push(`${formData.tone.toLowerCase()} tone bowl`)

//     return suggestions
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex justify-between items-center">
//             <h2 className="text-xl font-semibold text-gray-900">{product ? "Edit Product" : "Add New Product"}</h2>
//             <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
//               <X size={24} />
//             </button>
//           </div>

//           <div className="flex border-b border-gray-200 mt-4">
//             <button
//               onClick={() => setActiveTab("product")}
//               className={`px-4 py-2 font-medium ${
//                 activeTab === "product" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
//               }`}
//             >
//               Product Details
//             </button>
//             <button
//               onClick={() => setActiveTab("seo")}
//               className={`px-4 py-2 font-medium ${
//                 activeTab === "seo" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
//               }`}
//             >
//               SEO & Marketing
//             </button>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6">
//           {activeTab === "product" ? (
//             <div className="space-y-6">
//               {/* Product ID Field */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Product ID *</label>
//                 <input
//                   type="text"
//                   name="id"
//                   value={formData.id}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="e.g., bowl-himalayan-harmony-001"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">
//                   Unique identifier for this product (used in URLs and database)
//                 </p>
//               </div>

//               {/* Bowl Set Toggle */}
//               <div className="flex items-center gap-3 mt-4">
//                 <input
//                   type="checkbox"
//                   checked={formData.isSet}
//                   onChange={(e) =>
//                     setFormData((prev) => ({ ...prev, isSet: e.target.checked }))
//                   }
//                   className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                 />
//                 <span className="text-sm font-medium">
//                   This product is a Singing Bowl Set
//                 </span>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
//                   <input
//                     type="number"
//                     name="price"
//                     value={formData.price}
//                     onChange={handleInputChange}
//                     required
//                     min="0"
//                     step="0.01"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
//                   <select
//                     name="category"
//                     value={formData.category}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="">Select Category</option>
//                     <option value="Traditional">Traditional</option>
//                     <option value="Premium">Premium</option>
//                     <option value="Professional">Professional</option>
//                     <option value="Luxury">Luxury</option>
//                   </select>
//                 </div>
//                  <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Sound Instrument *</label>
//                   <select
//                     name="soundInstrument"
//                     value={formData.soundInstrument}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="">Select Instrument</option>
//                     <option value="Singing Bowl">Singing Bowls</option>
//                     <option value="Tingsha">Tingsha</option>
//                     <option value="Gong">Gong</option>
//                   </select>
//                 </div>

//                 {/* Single Product Fields - Only show when NOT a set */}
//                 {!formData.isSet && (
//                   <>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Size *</label>
//                       <select
//                         name="size"
//                         value={formData.size}
//                         onChange={handleInputChange}
//                         required={!formData.isSet}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       >
//                         <option value="">Select Size</option>
//                         <option value="Small">Small</option>
//                         <option value="Medium">Medium</option>
//                         <option value="Large">Large</option>
//                         <option value="Various">Various</option>
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg) *</label>
//                       <input
//                         type="number"
//                         name="weight"
//                         value={formData.weight}
//                         onChange={handleInputChange}
//                         required={!formData.isSet}
//                         min="0"
//                         step="0.01"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="Weight in kilograms"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Tone *</label>
//                       <select
//                         name="tone"
//                         value={formData.tone}
//                         onChange={handleInputChange}
//                         required={!formData.isSet}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       >
//                         <option value="">Select Tone</option>
//                         <option value="Low">Low</option>
//                         <option value="Medium">Medium</option>
//                         <option value="High">High</option>
//                         <option value="Full Range">Full Range</option>
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
//                       <select
//                         name="type"
//                         value={formData.type}
//                         onChange={handleInputChange}
//                         required={!formData.isSet}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       >
//                         <option value="">Select Type</option>
//                         <option value="Therapeutic">Therapeutic</option>
//                         <option value="Decorative">Decorative</option>
//                         <option value="Sound Bath">Sound Bath</option>
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Musical Note *</label>
//                       <input
//                         type="text"
//                         name="musicalNote"
//                         value={formData.musicalNote}
//                         onChange={handleInputChange}
//                         required={!formData.isSet}
//                         placeholder="e.g., F4, C3"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       />
//                     </div>
//                   </>
//                 )}

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
//                   <input
//                     type="text"
//                     name="brand"
//                     value={formData.brand}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>

//               {/* Bowl Set Section - Only show when IS a set */}
//               {formData.isSet && (
//                 <div className="border rounded-md p-4 bg-gray-50">
//                   <div className="flex justify-between items-center mb-3">
//                     <h3 className="text-lg font-medium">
//                       Singing Bowl Set Items
//                     </h3>
//                     <button
//                       type="button"
//                       onClick={addSetItem}
//                       className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
//                     >
//                       <Plus size={14} />
//                       Add Bowl
//                     </button>
//                   </div>

//                   {formData.setItems.length === 0 ? (
//                     <div className="text-center py-4 text-gray-500">
//                       No bowls added yet. Click "Add Bowl" to start.
//                     </div>
//                   ) : (
//                     <div className="space-y-4">
//                       {formData.setItems.map((item, bowlIndex) => (
//                         <div key={bowlIndex} className="border rounded-md p-4 bg-white">
//                           <div className="flex justify-between items-center mb-3">
//                             <h4 className="font-medium">Bowl #{bowlIndex + 1}</h4>
//                             <button
//                               type="button"
//                               onClick={() => removeSetItem(bowlIndex)}
//                               className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
//                               title="Remove bowl"
//                             >
//                               <Trash2 size={16} />
//                             </button>
//                           </div>
                          
//                           <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
//                             {/* Code */}
//                             <div className="md:col-span-2">
//                               <label className="block text-sm font-medium text-gray-700 mb-1">Code *</label>
//                               <input
//                                 value={item.code}
//                                 onChange={(e) =>
//                                   updateSetItem(bowlIndex, "code", e.target.value)
//                                 }
//                                 className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
//                                 placeholder="e.g., S1"
//                                 required
//                               />
//                             </div>
                            
//                             {/* Size - Text input for inches */}
//                             <div className="md:col-span-3">
//                               <label className="block text-sm font-medium text-gray-700 mb-1">Size (inches) *</label>
//                               <input
//                                 type="text"
//                                 value={item.size}
//                                 onChange={(e) =>
//                                   updateSetItem(bowlIndex, "size", e.target.value)
//                                 }
//                                 className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
//                                 placeholder="e.g., 4.5, 5-6, or 5 inches"
//                                 required
//                               />
//                               <p className="text-xs text-gray-500 mt-1">
//                                 Enter size in inches (e.g., 4.5, 5-6, or 5 inches)
//                               </p>
//                             </div>
                            
//                             {/* Weight */}
//                             <div className="md:col-span-3">
//                               <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg) *</label>
//                               <input
//                                 type="number"
//                                 step="0.01"
//                                 min="0"
//                                 value={item.weight}
//                                 onChange={(e) =>
//                                   updateSetItem(bowlIndex, "weight", Number(e.target.value))
//                                 }
//                                 className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
//                                 placeholder="Weight in kg"
//                                 required
//                               />
//                             </div>
                            
//                             {/* Musical Note */}
//                             <div className="md:col-span-2">
//                               <label className="block text-sm font-medium text-gray-700 mb-1">Musical Note *</label>
//                               <input
//                                 value={item.musicalNote}
//                                 onChange={(e) =>
//                                   updateSetItem(bowlIndex, "musicalNote", e.target.value)
//                                 }
//                                 className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
//                                 placeholder="e.g., C4, F#3"
//                                 required
//                               />
//                             </div>
                            
//                             {/* In Stock */}
//                             <div className="md:col-span-2">
//                               <label className="block text-sm font-medium text-gray-700 mb-1">In Stock</label>
//                               <div className="flex items-center h-8">
//                                 <input
//                                   type="checkbox"
//                                   checked={item.inStock}
//                                   onChange={(e) =>
//                                     updateSetItem(bowlIndex, "inStock", e.target.checked)
//                                   }
//                                   className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                                 />
//                                 <span className="ml-2 text-sm text-gray-600">
//                                   {item.inStock ? "Available" : "Out of Stock"}
//                                 </span>
//                               </div>
//                             </div>
//                           </div>
                          
//                           {/* Multiple Images Upload */}
//                           <div className="mt-4">
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                               Bowl Images (Max 3 images) - Optional
//                             </label>
                            
//                             {/* Image Previews */}
//                             {item.images.length > 0 && (
//                               <div className="mb-4">
//                                 <p className="text-sm text-gray-600 mb-2">Uploaded Images ({item.images.length}/3):</p>
//                                 <div className="flex flex-wrap gap-3">
//                                   {item.images.map((img, imgIndex) => (
//                                     <div key={imgIndex} className="relative">
//                                       <div className="h-24 w-24 border rounded-md overflow-hidden bg-gray-100">
//                                         <img
//                                           src={img.file ? URL.createObjectURL(img.file) : img.url || "/placeholder.svg?height=96&width=96"}
//                                           alt={`Bowl ${item.code} image ${imgIndex + 1}`}
//                                           className="h-full w-full object-cover"
//                                         />
//                                       </div>
//                                       <button
//                                         type="button"
//                                         onClick={() => removeSetItemImage(bowlIndex, imgIndex)}
//                                         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
//                                         title="Remove image"
//                                       >
//                                         <X size={12} />
//                                       </button>
//                                       <div className="text-xs text-gray-500 mt-1 text-center">
//                                         Image {imgIndex + 1}
//                                       </div>
//                                     </div>
//                                   ))}
//                                 </div>
//                               </div>
//                             )}
                            
//                             {/* Upload Button - Only show if less than 3 images */}
//                             {item.images.length < 3 && (
//                               <div>
//                                 <input
//                                   type="file"
//                                   accept="image/jpeg,image/png,image/gif,image/webp"
//                                   onChange={(e) => handleSetItemImagesUpload(bowlIndex, e)}
//                                   className="hidden"
//                                   id={`set-item-images-${bowlIndex}`}
//                                   multiple
//                                 />
//                                 <label
//                                   htmlFor={`set-item-images-${bowlIndex}`}
//                                   className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-md cursor-pointer hover:bg-blue-100"
//                                 >
//                                   <ImageIcon size={16} />
//                                   <span className="text-sm font-medium">
//                                     Add {3 - item.images.length} More Image{item.images.length < 2 ? "s" : ""}
//                                   </span>
//                                 </label>
//                                 <p className="text-xs text-gray-500 mt-1">
//                                   Upload up to {3 - item.images.length} image{3 - item.images.length > 1 ? "s" : ""} for this bowl
//                                 </p>
//                               </div>
//                             )}
                            
//                             {item.images.length >= 3 && (
//                               <div className="text-sm text-green-600 bg-green-50 p-2 rounded border border-green-200">
//                                 ✓ Maximum 3 images reached for this bowl
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   <div className="mt-4 text-xs text-gray-500">
//                     Tip: Each bowl in the set can have its own size (in inches), weight, musical note, and up to 3 images. For bowl sets, you can either upload main product images OR individual bowl images.
//                   </div>
//                 </div>
//               )}

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                   required
//                   rows={4}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Detailed product description..."
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Product Details</label>
//                   {formData.details.map((detail, index) => (
//                     <div key={index} className="flex gap-2 mb-2">
//                       <input
//                         type="text"
//                         value={detail}
//                         onChange={(e) => handleArrayChange("details", index, e.target.value)}
//                         className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="Product specification"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeArrayItem("details", index)}
//                         className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   ))}
//                   <button
//                     type="button"
//                     onClick={() => addArrayItem("details")}
//                     className="flex items-center px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//                   >
//                     <Plus size={16} className="mr-1" />
//                     Add Detail
//                   </button>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Care Instructions</label>
//                   {formData.careInstructions.map((instruction, index) => (
//                     <div key={index} className="flex gap-2 mb-2">
//                       <input
//                         type="text"
//                         value={instruction}
//                         onChange={(e) => handleArrayChange("careInstructions", index, e.target.value)}
//                         className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="Care instruction"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeArrayItem("careInstructions", index)}
//                         className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   ))}
//                   <button
//                     type="button"
//                     onClick={() => addArrayItem("careInstructions")}
//                     className="flex items-center px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//                   >
//                     <Plus size={16} className="mr-1" />
//                     Add Instruction
//                   </button>
//                 </div>
//               </div>

//               {/* Media Upload Section */}
//               <div className="space-y-4">
//                 <h3 className="text-lg font-medium text-gray-900">Product Media Files</h3>
                
//                 {!formData.isSet && (
//                   <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded border border-blue-200 mb-2">
//                     <strong>Note:</strong> Single products require at least one main product image.
//                   </div>
//                 )}
                
//                 {formData.isSet && (
//                   <div className="text-sm text-green-600 bg-green-50 p-3 rounded border border-green-200 mb-2">
//                     <strong>Note:</strong> Bowl sets can have either main product images OR individual bowl images. 
//                     You don't need to upload both, but at least one type of image is required.
//                   </div>
//                 )}

//                 {/* Existing Images */}
//                 {existingImages.length > 0 && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Current Product Images</label>
//                     <div className="flex flex-wrap gap-2">
//                       {existingImages.map((image, index) => (
//                         <div key={index} className="relative">
//                           <img
//                             src={image || "/placeholder.svg?height=80&width=80"}
//                             alt={`Existing ${index}`}
//                             className="h-20 w-20 object-cover rounded border"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => removeImage(index, true)}
//                             className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
//                           >
//                             <X size={14} />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Image Upload */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     {formData.isSet ? "Main Product Images (Optional)" : "Upload New Product Images *"}
//                   </label>
//                   <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//                     <Upload className="mx-auto h-12 w-12 text-gray-400" />
//                     <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop images</p>
//                     <input
//                       type="file"
//                       multiple
//                       accept="image/jpeg,image/png,image/gif,image/webp"
//                       onChange={handleImageUpload}
//                       className="hidden"
//                       id="image-upload"
//                     />
//                     <label
//                       htmlFor="image-upload"
//                       className="mt-2 inline-block px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600"
//                     >
//                       Choose Images
//                     </label>
//                   </div>

//                   {imageFiles.length > 0 && (
//                     <div className="mt-4">
//                       <p className="text-sm font-medium text-gray-700 mb-2">New Product Images:</p>
//                       <div className="flex flex-wrap gap-2">
//                         {imageFiles.map((file, index) => (
//                           <div key={index} className="relative">
//                             <img
//                               src={URL.createObjectURL(file) || "/placeholder.svg"}
//                               alt={`New ${index}`}
//                               className="h-20 w-20 object-cover rounded border"
//                             />
//                             <button
//                               type="button"
//                               onClick={() => removeImage(index, false)}
//                               className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
//                             >
//                               <X size={14} />
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Video Upload */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Upload Product Video File (Optional)</label>
//                   <input
//                     type="file"
//                     accept="video/mp4,video/webm,video/ogg"
//                     onChange={handleVideoUpload}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                   {videoFile && (
//                     <div className="mt-2">
//                       <p className="text-sm text-gray-600">Selected: {videoFile.name}</p>
//                       <button
//                         type="button"
//                         onClick={() => setVideoFile(null)}
//                         className="text-red-500 text-sm hover:text-red-700"
//                       >
//                         Remove video
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 {/* Video URL - only show if no video file is selected */}
//                 {!videoFile && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Or Product Video URL (Optional)</label>
//                     <input
//                       type="url"
//                       name="video"
//                       value={formData.video}
//                       onChange={handleInputChange}
//                       placeholder="https://example.com/video.mp4"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     <p className="text-xs text-gray-500 mt-1">
//                       You can either upload a video file above or provide a video URL here
//                     </p>
//                   </div>
//                 )}

//                 {/* Audio URL */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Audio Sample URL (Optional)</label>
//                   <input
//                     type="url"
//                     name="audio"
//                     value={formData.audio}
//                     onChange={handleInputChange}
//                     placeholder="https://example.com/audio.mp3"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>

//               <div className="flex items-center space-x-4">
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     name="inStock"
//                     checked={formData.inStock}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                   />
//                   <span className="ml-2 text-sm font-medium text-gray-700">Product In Stock</span>
//                 </label>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
//                   <input
//                     type="number"
//                     name="rating"
//                     value={formData.rating}
//                     onChange={handleInputChange}
//                     min="0"
//                     max="5"
//                     step="0.1"
//                     className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Review Count</label>
//                   <input
//                     type="number"
//                     name="reviewCount"
//                     value={formData.reviewCount}
//                     onChange={handleInputChange}
//                     min="0"
//                     className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               <div className="bg-blue-50 p-4 rounded-md">
//                 <h3 className="text-lg font-medium text-blue-800 mb-2">SEO Preview</h3>
//                 <div className="space-y-2">
//                   <p className="text-blue-700 font-medium">
//                     {formData.seoTitle || `${formData.name} - Authentic Himalayan Singing Bowl | OMSound Nepal`}
//                   </p>
//                   <p className="text-gray-600 text-sm">
//                     {formData.seoDescription || `${formData.description.substring(0, 150)}...`}
//                   </p>
//                   <p className="text-gray-500 text-xs">URL: https://omsoundnepal.com/product/{formData.id}</p>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">SEO Title</label>
//                 <input
//                   type="text"
//                   name="seoTitle"
//                   value={formData.seoTitle}
//                   onChange={handleInputChange}
//                   placeholder="Auto-generated if empty"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">
//                   Recommended length: 50-60 characters ({formData.seoTitle.length}/60)
//                 </p>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">SEO Description</label>
//                 <textarea
//                   name="seoDescription"
//                   value={formData.seoDescription}
//                   onChange={handleInputChange}
//                   rows={3}
//                   placeholder="Auto-generated if empty"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">
//                   Recommended length: 150-160 characters ({formData.seoDescription.length}/160)
//                 </p>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">SEO Keywords</label>
//                 <textarea
//                   name="seoKeywords"
//                   value={formData.seoKeywords}
//                   onChange={handleInputChange}
//                   rows={3}
//                   placeholder="Comma-separated keywords"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <div className="mt-2">
//                   <p className="text-xs text-gray-500 mb-1">Suggested keywords:</p>
//                   <div className="flex flex-wrap gap-1">
//                     {generateSEOSuggestions().map((keyword, index) => (
//                       <button
//                         key={index}
//                         type="button"
//                         onClick={() => {
//                           const currentKeywords = formData.seoKeywords
//                           const newKeywords = currentKeywords ? `${currentKeywords}, ${keyword}` : keyword
//                           setFormData((prev) => ({ ...prev, seoKeywords: newKeywords }))
//                         }}
//                         className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200"
//                       >
//                         + {keyword}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {uploadProgress > 0 && uploadProgress < 100 && (
//             <div className="mt-4">
//               <div className="w-full bg-gray-200 rounded-full h-2.5">
//                 <div
//                   className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
//                   style={{ width: `${uploadProgress}%` }}
//                 ></div>
//               </div>
//               <p className="text-xs text-gray-500 mt-1">Processing: {uploadProgress}%</p>
//             </div>
//           )}

//           <div className="flex justify-between pt-6 border-t border-gray-200 mt-6">
//             <button
//               type="button"
//               onClick={onCancel}
//               className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <div className="flex space-x-2">
//               {activeTab === "product" && (
//                 <button
//                   type="button"
//                   onClick={() => setActiveTab("seo")}
//                   className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//                 >
//                   Continue to SEO
//                 </button>
//               )}
//               {activeTab === "seo" && (
//                 <button
//                   type="button"
//                   onClick={() => setActiveTab("product")}
//                   className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//                 >
//                   Back to Product
//                 </button>
//               )}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
//               >
//                 {loading ? "Processing..." : product ? "Update Product" : "Create Product"}
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default ProductForm

















//new
// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { X, Upload, Trash2, Plus } from "lucide-react"
// import type { Product } from "../../context/ProductContext"

// interface ProductFormProps {
//   product?: Product | null
//   onSubmit: (formData: FormData) => Promise<void>
//   onCancel: () => void
//   loading?: boolean
// }

// interface BowlSetItem {
//   code: string
//   size: string
//   weight: number
//   musicalNote: string
//   inStock: boolean
// }

// interface FormState {
//   id: string
//   name: string
//   price: number
//   weight: number
//   size: string
//   tone: string
//   type: string
//   musicalNote: string
//   brand: string
//   category: string
//   soundInstrument: string
//   description: string
//   details: string[]
//   careInstructions: string[]
//   inStock: boolean
//   rating: number
//   reviewCount: number
//   seoKeywords: string
//   seoTitle: string
//   seoDescription: string
//   video: string
//   audio: string
//   isSet: boolean
//   setItems: BowlSetItem[]
// }

// const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onCancel, loading = false }) => {
//   const [activeTab, setActiveTab] = useState<"product" | "seo">("product")
//   const [imageFiles, setImageFiles] = useState<File[]>([])
//   const [videoFile, setVideoFile] = useState<File | null>(null)
//   const [existingImages, setExistingImages] = useState<string[]>([])
//   const [uploadProgress, setUploadProgress] = useState(0)
//   const [formData, setFormData] = useState<FormState>({
//     id: "",
//     name: "",
//     price: 0,
//     weight: 0,
//     size: "",
//     tone: "",
//     type: "",
//     musicalNote: "",
//     brand: "OMSound Nepal",
//     category: "",
//     soundInstrument: "",
//     description: "",
//     details: [""],
//     careInstructions: [""],
//     inStock: true,
//     rating: 0,
//     reviewCount: 0,
//     seoKeywords: "",
//     seoTitle: "",
//     seoDescription: "",
//     video: "",
//     audio: "",
//     isSet: false,
//     setItems: [],
//   })

//   useEffect(() => {
//     if (product) {
//       const productSetItems = (product as any)?.setItems || []
//       const parsedSetItems = Array.isArray(productSetItems) 
//         ? productSetItems.map((item: any, index: number) => ({
//             code: item.code || "",
//             size: item.size || "",
//             weight: item.weight || 0,
//             musicalNote: item.musicalNote || "",
//             inStock: item.inStock !== undefined ? item.inStock : true,
//           }))
//         : []
      
//       setFormData({
//         id: product.id || "",
//         name: product.name || "",
//         price: product.price || 0,
//         weight: product.weight || 0,
//         size: product.size || "",
//         tone: product.tone || "",
//         type: product.type || "",
//         musicalNote: product.musicalNote || "",
//         brand: product.brand || "OMSound Nepal",
//         category: product.category || "",
//         soundInstrument: product.soundInstrument || "",
//         description: product.description || "",
//         details: product.details?.length ? product.details : [""],
//         careInstructions: product.careInstructions?.length ? product.careInstructions : [""],
//         inStock: product.inStock ?? true,
//         rating: product.rating || 0,
//         reviewCount: product.reviewCount || 0,
//         seoKeywords: product.seoKeywords || "",
//         seoTitle: product.seoTitle || "",
//         seoDescription: product.seoDescription || "",
//         video: product.video || "",
//         audio: product.audio || "",
//         isSet: (product as any)?.isSet || false,
//         setItems: parsedSetItems,
//       })
//       setExistingImages(product.images || [])
//     } else {
//       // Generate unique ID for new products
//       setFormData((prev) => ({
//         ...prev,
//         id: `bowl-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
//       }))
//     }
//   }, [product])

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]:
//         type === "checkbox"
//           ? (e.target as HTMLInputElement).checked
//           : type === "number"
//             ? Number.parseFloat(value) || 0
//             : value,
//     }))
//   }

//   const handleArrayChange = (field: "details" | "careInstructions", index: number, value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: prev[field].map((item, i) => (i === index ? value : item)),
//     }))
//   }

//   const addArrayItem = (field: "details" | "careInstructions") => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: [...prev[field], ""],
//     }))
//   }

//   const removeArrayItem = (field: "details" | "careInstructions", index: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: prev[field].filter((_, i) => i !== index),
//     }))
//   }

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || [])
//     const validFiles = files.filter((file) => {
//       const isValidType = ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(file.type)
//       const isValidSize = file.size <= 10 * 1024 * 1024 // 10MB
//       return isValidType && isValidSize
//     })

//     setImageFiles((prev) => [...prev, ...validFiles])
//   }

//   const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file && file.size <= 50 * 1024 * 1024) {
//       // 50MB
//       setVideoFile(file)
//     }
//   }

//   const removeImage = (index: number, isExisting = false) => {
//     if (isExisting) {
//       setExistingImages((prev) => prev.filter((_, i) => i !== index))
//     } else {
//       setImageFiles((prev) => prev.filter((_, i) => i !== index))
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()

//     console.log("=== FORM SUBMIT START ===")
//     console.log("Form data state:", formData)
//     console.log("Image files:", imageFiles)
//     console.log("Video file:", videoFile)
//     console.log("Existing images:", existingImages)

//     // Basic validation for all products
//     if (
//       !formData.name ||
//       !formData.price ||
//       !formData.category ||
//       !formData.description
//     ) {
//       alert("Please fill all required fields")
//       return
//     }

//     if (!formData.isSet) {
//       // Single product validation
//       if (!formData.size || !formData.weight || !formData.tone || !formData.type || !formData.musicalNote) {
//         alert("Please complete single bowl details")
//         return
//       }
      
//       // Single products require images
//       if (imageFiles.length === 0 && existingImages.length === 0) {
//         alert("Please upload at least one image for the product")
//         return
//       }
//     } else {
//       // MODIFIED: Bowl set validation - only check for images, not individual bowls
//       if (imageFiles.length === 0 && existingImages.length === 0) {
//         alert("Please upload at least one image for the bowl set")
//         return
//       }
      
//       // Optional: You could still check if there are any set items
//       // if (formData.setItems.length === 0) {
//       //   alert("Please add at least one bowl to the set")
//       //   return
//       // }
//     }

//     try {
//       setUploadProgress(10)

//       const submitData = new FormData()

//       // Add basic fields with validation
//       submitData.append("id", formData.id.trim())
//       submitData.append("name", formData.name.trim())
//       submitData.append("price", formData.price.toString())
//       submitData.append("brand", formData.brand.trim())
//       submitData.append("category", formData.category.trim())
//       submitData.append("soundInstrument", formData.soundInstrument.trim())
//       submitData.append("description", formData.description.trim())
//       submitData.append("inStock", formData.inStock.toString())
//       submitData.append("rating", formData.rating.toString())
//       submitData.append("reviewCount", formData.reviewCount.toString())
//       submitData.append("seoKeywords", formData.seoKeywords.trim())
//       submitData.append("seoTitle", formData.seoTitle.trim())
//       submitData.append("seoDescription", formData.seoDescription.trim())
//       submitData.append("video", formData.video.trim())
//       submitData.append("audio", formData.audio.trim())
//       submitData.append("isSet", formData.isSet.toString())

//       // Add single product fields only if not a set
//       if (!formData.isSet) {
//         submitData.append("size", formData.size.trim())
//         submitData.append("weight", formData.weight.toString())
//         submitData.append("tone", formData.tone.trim())
//         submitData.append("type", formData.type.trim())
//         submitData.append("musicalNote", formData.musicalNote.trim())
//       } else {
//         // For bowl sets, we still need to send default values for validation
//         submitData.append("size", "Various")
//         submitData.append("weight", "0")
//         submitData.append("tone", "Full Range")
//         submitData.append("type", "Therapeutic Set")
//         submitData.append("musicalNote", "Multiple Notes")
//       }

//       setUploadProgress(30)

//       // Add set items if this is a set
//       if (formData.isSet) {
//         // Prepare set items for JSON - NO IMAGES INCLUDED
//         const setItemsForJson = formData.setItems.map((item) => ({
//           code: item.code,
//           size: item.size,
//           weight: item.weight,
//           musicalNote: item.musicalNote,
//           inStock: item.inStock,
//         }))
//         submitData.append("setItems", JSON.stringify(setItemsForJson))
//       }

//       // Add arrays - ensure they're not empty
//       const filteredDetails = formData.details.filter((item) => item.trim() !== "")
//       if (filteredDetails.length > 0) {
//         filteredDetails.forEach((detail) => {
//           submitData.append("details", detail.trim())
//         })
//       } else {
//         // Add at least one empty detail to avoid validation issues
//         submitData.append("details", "Handcrafted singing bowl")
//       }

//       const filteredInstructions = formData.careInstructions.filter((item) => item.trim() !== "")
//       if (filteredInstructions.length > 0) {
//         filteredInstructions.forEach((instruction) => {
//           submitData.append("careInstructions", instruction.trim())
//         })
//       } else {
//         // Add default care instruction
//         submitData.append("careInstructions", "Clean with soft cloth")
//       }

//       // Add existing images (only if they exist)
//       if (existingImages.length > 0) {
//         existingImages.forEach((image) => {
//           submitData.append("existingImages", image)
//         })
//       }

//       setUploadProgress(50)

//       // Add new image files (only if they exist)
//       if (imageFiles.length > 0) {
//         imageFiles.forEach((file) => {
//           submitData.append("images", file)
//         })
//       }

//       setUploadProgress(70)

//       // Add video file
//       if (videoFile) {
//         submitData.append("video", videoFile)
//       }

//       setUploadProgress(90)

//       console.log("FormData contents:")
//       for (const [key, value] of submitData.entries()) {
//         if (value instanceof File) {
//           console.log(key, `File: ${value.name} (${value.type})`)
//         } else {
//           console.log(key, value)
//         }
//       }

//       await onSubmit(submitData)

//       setUploadProgress(100)

//       // Reset form
//       setImageFiles([])
//       setVideoFile(null)
//       setExistingImages([])
//       setUploadProgress(0)

//       console.log("=== FORM SUBMIT SUCCESS ===")
//     } catch (error) {
//       setUploadProgress(0)
//       console.error("Form submission error:", error)
//       console.log("=== FORM SUBMIT ERROR ===")
//     }
//   }

//   const generateSEOSuggestions = () => {
//     if (!formData.name) return []

//     const suggestions = [
//       `${formData.name.toLowerCase()}`,
//       `${formData.name.toLowerCase()} singing bowl`,
//       `buy ${formData.name.toLowerCase()}`,
//       "himalayan singing bowl",
//       "sound healing bowl",
//       "meditation bowl",
//       "tibetan bowl",
//       "nepal singing bowl",
//     ]

//     if (formData.size) suggestions.push(`${formData.size.toLowerCase()} singing bowl`)
//     if (formData.tone) suggestions.push(`${formData.tone.toLowerCase()} tone bowl`)

//     return suggestions
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex justify-between items-center">
//             <h2 className="text-xl font-semibold text-gray-900">{product ? "Edit Product" : "Add New Product"}</h2>
//             <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
//               <X size={24} />
//             </button>
//           </div>

//           <div className="flex border-b border-gray-200 mt-4">
//             <button
//               onClick={() => setActiveTab("product")}
//               className={`px-4 py-2 font-medium ${
//                 activeTab === "product" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
//               }`}
//             >
//               Product Details
//             </button>
//             <button
//               onClick={() => setActiveTab("seo")}
//               className={`px-4 py-2 font-medium ${
//                 activeTab === "seo" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
//               }`}
//             >
//               SEO & Marketing
//             </button>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6">
//           {activeTab === "product" ? (
//             <div className="space-y-6">
//               {/* Product ID Field */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Product ID *</label>
//                 <input
//                   type="text"
//                   name="id"
//                   value={formData.id}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="e.g., bowl-himalayan-harmony-001"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">
//                   Unique identifier for this product (used in URLs and database)
//                 </p>
//               </div>

//               {/* Bowl Set Toggle */}
//               <div className="flex items-center gap-3 mt-4">
//                 <input
//                   type="checkbox"
//                   checked={formData.isSet}
//                   onChange={(e) =>
//                     setFormData((prev) => ({ ...prev, isSet: e.target.checked }))
//                   }
//                   className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                 />
//                 <span className="text-sm font-medium">
//                   This product is a Singing Bowl Set
//                 </span>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
//                   <input
//                     type="number"
//                     name="price"
//                     value={formData.price}
//                     onChange={handleInputChange}
//                     required
//                     min="0"
//                     step="0.01"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
//                   <select
//                     name="category"
//                     value={formData.category}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="">Select Category</option>
//                     <option value="Traditional">Traditional</option>
//                     <option value="Premium">Premium</option>
//                     <option value="Professional">Professional</option>
//                     <option value="Luxury">Luxury</option>
//                   </select>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Sound Instrument *</label>
//                   <select
//                     name="soundInstrument"
//                     value={formData.soundInstrument}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="">Select Instrument</option>
//                     <option value="Singing Bowl">Singing Bowls</option>
//                     <option value="Tingsha">Tingsha</option>
//                     <option value="Gong">Gong</option>
//                   </select>
//                 </div>

//                 {/* Single Product Fields - Only show when NOT a set */}
//                 {!formData.isSet && (
//                   <>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Size *</label>
//                       <select
//                         name="size"
//                         value={formData.size}
//                         onChange={handleInputChange}
//                         required={!formData.isSet}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       >
//                         <option value="">Select Size</option>
//                         <option value="Small">Small</option>
//                         <option value="Medium">Medium</option>
//                         <option value="Large">Large</option>
//                         <option value="Various">Various</option>
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg) *</label>
//                       <input
//                         type="number"
//                         name="weight"
//                         value={formData.weight}
//                         onChange={handleInputChange}
//                         required={!formData.isSet}
//                         min="0"
//                         step="0.01"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="Weight in kilograms"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Tone *</label>
//                       <select
//                         name="tone"
//                         value={formData.tone}
//                         onChange={handleInputChange}
//                         required={!formData.isSet}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       >
//                         <option value="">Select Tone</option>
//                         <option value="Low">Low</option>
//                         <option value="Medium">Medium</option>
//                         <option value="High">High</option>
//                         <option value="Full Range">Full Range</option>
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
//                       <select
//                         name="type"
//                         value={formData.type}
//                         onChange={handleInputChange}
//                         required={!formData.isSet}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       >
//                         <option value="">Select Type</option>
//                         <option value="Therapeutic">Therapeutic</option>
//                         <option value="Decorative">Decorative</option>
//                         <option value="Sound Bath">Sound Bath</option>
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Musical Note *</label>
//                       <input
//                         type="text"
//                         name="musicalNote"
//                         value={formData.musicalNote}
//                         onChange={handleInputChange}
//                         required={!formData.isSet}
//                         placeholder="e.g., F4, C3"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       />
//                     </div>
//                   </>
//                 )}

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
//                   <input
//                     type="text"
//                     name="brand"
//                     value={formData.brand}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>

//               {/* The bowl set section has been removed */}

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                   required
//                   rows={4}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Detailed product description..."
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Product Details</label>
//                   {formData.details.map((detail, index) => (
//                     <div key={index} className="flex gap-2 mb-2">
//                       <input
//                         type="text"
//                         value={detail}
//                         onChange={(e) => handleArrayChange("details", index, e.target.value)}
//                         className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="Product specification"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeArrayItem("details", index)}
//                         className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   ))}
//                   <button
//                     type="button"
//                     onClick={() => addArrayItem("details")}
//                     className="flex items-center px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//                   >
//                     <Plus size={16} className="mr-1" />
//                     Add Detail
//                   </button>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Care Instructions</label>
//                   {formData.careInstructions.map((instruction, index) => (
//                     <div key={index} className="flex gap-2 mb-2">
//                       <input
//                         type="text"
//                         value={instruction}
//                         onChange={(e) => handleArrayChange("careInstructions", index, e.target.value)}
//                         className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="Care instruction"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeArrayItem("careInstructions", index)}
//                         className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   ))}
//                   <button
//                     type="button"
//                     onClick={() => addArrayItem("careInstructions")}
//                     className="flex items-center px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//                   >
//                     <Plus size={16} className="mr-1" />
//                     Add Instruction
//                   </button>
//                 </div>
//               </div>

//               {/* Media Upload Section */}
//               <div className="space-y-4">
//                 <h3 className="text-lg font-medium text-gray-900">Product Images</h3>
                
//                 {formData.isSet && (
//                   <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded border border-blue-200 mb-2">
//                     <strong>Note:</strong> For bowl sets, upload main product images here. These images will represent the entire set.
//                   </div>
//                 )}

//                 {/* Existing Images */}
//                 {existingImages.length > 0 && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Current Product Images</label>
//                     <div className="flex flex-wrap gap-2">
//                       {existingImages.map((image, index) => (
//                         <div key={index} className="relative">
//                           <img
//                             src={image || "/placeholder.svg?height=80&width=80"}
//                             alt={`Existing ${index}`}
//                             className="h-20 w-20 object-cover rounded border"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => removeImage(index, true)}
//                             className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
//                           >
//                             <X size={14} />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Image Upload */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Upload Product Images *
//                   </label>
//                   <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//                     <Upload className="mx-auto h-12 w-12 text-gray-400" />
//                     <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop images</p>
//                     <input
//                       type="file"
//                       multiple
//                       accept="image/jpeg,image/png,image/gif,image/webp"
//                       onChange={handleImageUpload}
//                       className="hidden"
//                       id="image-upload"
//                     />
//                     <label
//                       htmlFor="image-upload"
//                       className="mt-2 inline-block px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600"
//                     >
//                       Choose Images
//                     </label>
//                   </div>

//                   {imageFiles.length > 0 && (
//                     <div className="mt-4">
//                       <p className="text-sm font-medium text-gray-700 mb-2">New Product Images:</p>
//                       <div className="flex flex-wrap gap-2">
//                         {imageFiles.map((file, index) => (
//                           <div key={index} className="relative">
//                             <img
//                               src={URL.createObjectURL(file) || "/placeholder.svg"}
//                               alt={`New ${index}`}
//                               className="h-20 w-20 object-cover rounded border"
//                             />
//                             <button
//                               type="button"
//                               onClick={() => removeImage(index, false)}
//                               className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
//                             >
//                               <X size={14} />
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Video Upload */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Upload Product Video File (Optional)</label>
//                   <input
//                     type="file"
//                     accept="video/mp4,video/webm,video/ogg"
//                     onChange={handleVideoUpload}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                   {videoFile && (
//                     <div className="mt-2">
//                       <p className="text-sm text-gray-600">Selected: {videoFile.name}</p>
//                       <button
//                         type="button"
//                         onClick={() => setVideoFile(null)}
//                         className="text-red-500 text-sm hover:text-red-700"
//                       >
//                         Remove video
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 {/* Video URL - only show if no video file is selected */}
//                 {!videoFile && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Or Product Video URL (Optional)</label>
//                     <input
//                       type="url"
//                       name="video"
//                       value={formData.video}
//                       onChange={handleInputChange}
//                       placeholder="https://example.com/video.mp4"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     <p className="text-xs text-gray-500 mt-1">
//                       You can either upload a video file above or provide a video URL here
//                     </p>
//                   </div>
//                 )}

//                 {/* Audio URL */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Audio Sample URL (Optional)</label>
//                   <input
//                     type="url"
//                     name="audio"
//                     value={formData.audio}
//                     onChange={handleInputChange}
//                     placeholder="https://example.com/audio.mp3"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>

//               <div className="flex items-center space-x-4">
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     name="inStock"
//                     checked={formData.inStock}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                   />
//                   <span className="ml-2 text-sm font-medium text-gray-700">Product In Stock</span>
//                 </label>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
//                   <input
//                     type="number"
//                     name="rating"
//                     value={formData.rating}
//                     onChange={handleInputChange}
//                     min="0"
//                     max="5"
//                     step="0.1"
//                     className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Review Count</label>
//                   <input
//                     type="number"
//                     name="reviewCount"
//                     value={formData.reviewCount}
//                     onChange={handleInputChange}
//                     min="0"
//                     className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               <div className="bg-blue-50 p-4 rounded-md">
//                 <h3 className="text-lg font-medium text-blue-800 mb-2">SEO Preview</h3>
//                 <div className="space-y-2">
//                   <p className="text-blue-700 font-medium">
//                     {formData.seoTitle || `${formData.name} - Authentic Himalayan Singing Bowl | OMSound Nepal`}
//                   </p>
//                   <p className="text-gray-600 text-sm">
//                     {formData.seoDescription || `${formData.description.substring(0, 150)}...`}
//                   </p>
//                   <p className="text-gray-500 text-xs">URL: https://omsoundnepal.com/product/{formData.id}</p>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">SEO Title</label>
//                 <input
//                   type="text"
//                   name="seoTitle"
//                   value={formData.seoTitle}
//                   onChange={handleInputChange}
//                   placeholder="Auto-generated if empty"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">
//                   Recommended length: 50-60 characters ({formData.seoTitle.length}/60)
//                 </p>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">SEO Description</label>
//                 <textarea
//                   name="seoDescription"
//                   value={formData.seoDescription}
//                   onChange={handleInputChange}
//                   rows={3}
//                   placeholder="Auto-generated if empty"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">
//                   Recommended length: 150-160 characters ({formData.seoDescription.length}/160)
//                 </p>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">SEO Keywords</label>
//                 <textarea
//                   name="seoKeywords"
//                   value={formData.seoKeywords}
//                   onChange={handleInputChange}
//                   rows={3}
//                   placeholder="Comma-separated keywords"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <div className="mt-2">
//                   <p className="text-xs text-gray-500 mb-1">Suggested keywords:</p>
//                   <div className="flex flex-wrap gap-1">
//                     {generateSEOSuggestions().map((keyword, index) => (
//                       <button
//                         key={index}
//                         type="button"
//                         onClick={() => {
//                           const currentKeywords = formData.seoKeywords
//                           const newKeywords = currentKeywords ? `${currentKeywords}, ${keyword}` : keyword
//                           setFormData((prev) => ({ ...prev, seoKeywords: newKeywords }))
//                         }}
//                         className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200"
//                       >
//                         + {keyword}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {uploadProgress > 0 && uploadProgress < 100 && (
//             <div className="mt-4">
//               <div className="w-full bg-gray-200 rounded-full h-2.5">
//                 <div
//                   className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
//                   style={{ width: `${uploadProgress}%` }}
//                 ></div>
//               </div>
//               <p className="text-xs text-gray-500 mt-1">Processing: {uploadProgress}%</p>
//             </div>
//           )}

//           <div className="flex justify-between pt-6 border-t border-gray-200 mt-6">
//             <button
//               type="button"
//               onClick={onCancel}
//               className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <div className="flex space-x-2">
//               {activeTab === "product" && (
//                 <button
//                   type="button"
//                   onClick={() => setActiveTab("seo")}
//                   className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//                 >
//                   Continue to SEO
//                 </button>
//               )}
//               {activeTab === "seo" && (
//                 <button
//                   type="button"
//                   onClick={() => setActiveTab("product")}
//                   className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//                 >
//                   Back to Product
//                 </button>
//               )}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
//               >
//                 {loading ? "Processing..." : product ? "Update Product" : "Create Product"}
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default ProductForm




//just updated

// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { X, Upload, Trash2, Plus } from "lucide-react"
// import type { Product } from "../../context/ProductContext"

// interface ProductFormProps {
//   product?: Product | null
//   onSubmit: (formData: FormData) => Promise<void>
//   onCancel: () => void
//   loading?: boolean
// }

// interface BowlSetItem {
//   code: string
//   size: string
//   weight: number
//   musicalNote: string
//   inStock: boolean
// }

// interface FormState {
//   id: string
//   name: string
//   price: number
//   weight: number
//   size: string
//   tone: string
//   type: string
//   musicalNote: string
//   brand: string
//   category: string
//   soundInstrument: string
//   description: string
//   details: string[]
//   careInstructions: string[]
//   inStock: boolean
//   rating: number
//   reviewCount: number
//   seoKeywords: string
//   seoTitle: string
//   seoDescription: string
//   video: string
//   audio: string
//   isSet: boolean
//   setItems: BowlSetItem[]
// }

// const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onCancel, loading = false }) => {
//   const [activeTab, setActiveTab] = useState<"product" | "seo">("product")
//   const [imageFiles, setImageFiles] = useState<File[]>([])
//   const [videoFile, setVideoFile] = useState<File | null>(null)
//   const [existingImages, setExistingImages] = useState<string[]>([])
//   const [uploadProgress, setUploadProgress] = useState(0)
//   const [formData, setFormData] = useState<FormState>({
//     id: "",
//     name: "",
//     price: 0,
//     weight: 0,
//     size: "",
//     tone: "",
//     type: "",
//     musicalNote: "",
//     brand: "OMSound Nepal",
//     category: "",
//     soundInstrument: "",
//     description: "",
//     details: [""],
//     careInstructions: [""],
//     inStock: true,
//     rating: 0,
//     reviewCount: 0,
//     seoKeywords: "",
//     seoTitle: "",
//     seoDescription: "",
//     video: "",
//     audio: "",
//     isSet: false,
//     setItems: [],
//   })

//   useEffect(() => {
//     if (product) {
//       const productSetItems = (product as any)?.setItems || []
//       const parsedSetItems = Array.isArray(productSetItems) 
//         ? productSetItems.map((item: any, index: number) => ({
//             code: item.code || "",
//             size: item.size || "",
//             weight: item.weight || 0,
//             musicalNote: item.musicalNote || "",
//             inStock: item.inStock !== undefined ? item.inStock : true,
//           }))
//         : []
      
//       setFormData({
//         id: product.id || "",
//         name: product.name || "",
//         price: product.price || 0,
//         weight: product.weight || 0,
//         size: product.size || "",
//         tone: product.tone || "",
//         type: product.type || "",
//         musicalNote: product.musicalNote || "",
//         brand: product.brand || "OMSound Nepal",
//         category: product.category || "",
//         soundInstrument: product.soundInstrument || "",
//         description: product.description || "",
//         details: product.details?.length ? product.details : [""],
//         careInstructions: product.careInstructions?.length ? product.careInstructions : [""],
//         inStock: product.inStock ?? true,
//         rating: product.rating || 0,
//         reviewCount: product.reviewCount || 0,
//         seoKeywords: product.seoKeywords || "",
//         seoTitle: product.seoTitle || "",
//         seoDescription: product.seoDescription || "",
//         video: product.video || "",
//         audio: product.audio || "",
//         isSet: (product as any)?.isSet || false,
//         setItems: parsedSetItems,
//       })
//       setExistingImages(product.images || [])
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         id: `bowl-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
//       }))
//     }
//   }, [product])

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]:
//         type === "checkbox"
//           ? (e.target as HTMLInputElement).checked
//           : type === "number"
//             ? Number.parseFloat(value) || 0
//             : value,
//     }))
//   }

//   const handleArrayChange = (field: "details" | "careInstructions", index: number, value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: prev[field].map((item, i) => (i === index ? value : item)),
//     }))
//   }

//   const addArrayItem = (field: "details" | "careInstructions") => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: [...prev[field], ""],
//     }))
//   }

//   const removeArrayItem = (field: "details" | "careInstructions", index: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: prev[field].filter((_, i) => i !== index),
//     }))
//   }

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || [])
//     const validFiles = files.filter((file) => {
//       const isValidType = ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(file.type)
//       const isValidSize = file.size <= 10 * 1024 * 1024
//       return isValidType && isValidSize
//     })

//     setImageFiles((prev) => [...prev, ...validFiles])
//   }

//   const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file && file.size <= 100 * 1024 * 1024) {
//       setVideoFile(file)
//       setFormData((prev) => ({ ...prev, video: "" }))
//     }
//   }

//   const removeImage = (index: number, isExisting = false) => {
//     if (isExisting) {
//       setExistingImages((prev) => prev.filter((_, i) => i !== index))
//     } else {
//       setImageFiles((prev) => prev.filter((_, i) => i !== index))
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()

//     console.log("=== FORM SUBMIT START ===")
//     console.log("Form data state:", formData)
//     console.log("Image files:", imageFiles)
//     console.log("Video file:", videoFile)
//     console.log("Existing images:", existingImages)

//     if (
//       !formData.name ||
//       !formData.price ||
//       !formData.category ||
//       !formData.description
//     ) {
//       alert("Please fill all required fields")
//       return
//     }

//     if (!formData.isSet) {
//       if (!formData.size || !formData.weight || !formData.tone || !formData.type || !formData.musicalNote) {
//         alert("Please complete single bowl details")
//         return
//       }
      
//       if (imageFiles.length === 0 && existingImages.length === 0) {
//         alert("Please upload at least one image for the product")
//         return
//       }
//     } else {
//       if (imageFiles.length === 0 && existingImages.length === 0) {
//         alert("Please upload at least one image for the bowl set")
//         return
//       }
//     }

//     try {
//       setUploadProgress(10)

//       const submitData = new FormData()

//       submitData.append("id", formData.id.trim())
//       submitData.append("name", formData.name.trim())
//       submitData.append("price", formData.price.toString())
//       submitData.append("brand", formData.brand.trim())
//       submitData.append("category", formData.category.trim())
//       submitData.append("soundInstrument", formData.soundInstrument.trim())
//       submitData.append("description", formData.description.trim())
//       submitData.append("inStock", formData.inStock.toString())
//       submitData.append("rating", formData.rating.toString())
//       submitData.append("reviewCount", formData.reviewCount.toString())
//       submitData.append("seoKeywords", formData.seoKeywords.trim())
//       submitData.append("seoTitle", formData.seoTitle.trim())
//       submitData.append("seoDescription", formData.seoDescription.trim())
//       submitData.append("audio", formData.audio.trim())
//       submitData.append("isSet", formData.isSet.toString())

//       if (!formData.isSet) {
//         submitData.append("size", formData.size.trim())
//         submitData.append("weight", formData.weight.toString())
//         submitData.append("tone", formData.tone.trim())
//         submitData.append("type", formData.type.trim())
//         submitData.append("musicalNote", formData.musicalNote.trim())
//       } else {
//         submitData.append("size", "Various")
//         submitData.append("weight", "0")
//         submitData.append("tone", "Full Range")
//         submitData.append("type", "Therapeutic Set")
//         submitData.append("musicalNote", "Multiple Notes")
//       }

//       setUploadProgress(30)

//       if (formData.isSet) {
//         const setItemsForJson = formData.setItems.map((item) => ({
//           code: item.code,
//           size: item.size,
//           weight: item.weight,
//           musicalNote: item.musicalNote,
//           inStock: item.inStock,
//         }))
//         submitData.append("setItems", JSON.stringify(setItemsForJson))
//       }

//       const filteredDetails = formData.details.filter((item) => item.trim() !== "")
//       if (filteredDetails.length > 0) {
//         filteredDetails.forEach((detail) => {
//           submitData.append("details", detail.trim())
//         })
//       } else {
//         submitData.append("details", "Handcrafted singing bowl")
//       }

//       const filteredInstructions = formData.careInstructions.filter((item) => item.trim() !== "")
//       if (filteredInstructions.length > 0) {
//         filteredInstructions.forEach((instruction) => {
//           submitData.append("careInstructions", instruction.trim())
//         })
//       } else {
//         submitData.append("careInstructions", "Clean with soft cloth")
//       }

//       if (existingImages.length > 0) {
//         existingImages.forEach((image) => {
//           submitData.append("existingImages", image)
//         })
//       }

//       setUploadProgress(50)

//       if (imageFiles.length > 0) {
//         imageFiles.forEach((file) => {
//           submitData.append("images", file)
//         })
//       }

//       setUploadProgress(70)

//       if (videoFile) {
//         submitData.append("video", videoFile)
//       } else if (formData.video && formData.video.trim() !== "") {
//         submitData.append("video", formData.video.trim())
//       }

//       setUploadProgress(90)

//       console.log("FormData contents:")
//       for (const [key, value] of submitData.entries()) {
//         if (value instanceof File) {
//           console.log(key, `File: ${value.name} (${value.type})`)
//         } else {
//           console.log(key, value)
//         }
//       }

//       await onSubmit(submitData)

//       setUploadProgress(100)

//       setImageFiles([])
//       setVideoFile(null)
//       setExistingImages([])
//       setUploadProgress(0)

//       console.log("=== FORM SUBMIT SUCCESS ===")
//     } catch (error) {
//       setUploadProgress(0)
//       console.error("Form submission error:", error)
//       console.log("=== FORM SUBMIT ERROR ===")
//     }
//   }

//   const generateSEOSuggestions = () => {
//     if (!formData.name) return []

//     const suggestions = [
//       `${formData.name.toLowerCase()}`,
//       `${formData.name.toLowerCase()} singing bowl`,
//       `buy ${formData.name.toLowerCase()}`,
//       "himalayan singing bowl",
//       "sound healing bowl",
//       "meditation bowl",
//       "tibetan bowl",
//       "nepal singing bowl",
//     ]

//     if (formData.size) suggestions.push(`${formData.size.toLowerCase()} singing bowl`)
//     if (formData.tone) suggestions.push(`${formData.tone.toLowerCase()} tone bowl`)

//     return suggestions
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex justify-between items-center">
//             <h2 className="text-xl font-semibold text-gray-900">{product ? "Edit Product" : "Add New Product"}</h2>
//             <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
//               <X size={24} />
//             </button>
//           </div>

//           <div className="flex border-b border-gray-200 mt-4">
//             <button
//               onClick={() => setActiveTab("product")}
//               className={`px-4 py-2 font-medium ${
//                 activeTab === "product" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
//               }`}
//             >
//               Product Details
//             </button>
//             <button
//               onClick={() => setActiveTab("seo")}
//               className={`px-4 py-2 font-medium ${
//                 activeTab === "seo" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
//               }`}
//             >
//               SEO & Marketing
//             </button>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6">
//           {activeTab === "product" ? (
//             <div className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Product ID *</label>
//                 <input
//                   type="text"
//                   name="id"
//                   value={formData.id}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="e.g., bowl-himalayan-harmony-001"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">
//                   Unique identifier for this product (used in URLs and database)
//                 </p>
//               </div>

//               <div className="flex items-center gap-3 mt-4">
//                 <input
//                   type="checkbox"
//                   checked={formData.isSet}
//                   onChange={(e) =>
//                     setFormData((prev) => ({ ...prev, isSet: e.target.checked }))
//                   }
//                   className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                 />
//                 <span className="text-sm font-medium">
//                   This product is a Singing Bowl Set
//                 </span>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
//                   <input
//                     type="number"
//                     name="price"
//                     value={formData.price}
//                     onChange={handleInputChange}
//                     required
//                     min="0"
//                     step="0.01"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
//                   <select
//                     name="category"
//                     value={formData.category}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="">Select Category</option>
//                     <option value="Traditional">Traditional</option>
//                     <option value="Premium">Premium</option>
//                     <option value="Professional">Professional</option>
//                     <option value="Luxury">Luxury</option>
//                   </select>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Sound Instrument *</label>
//                   <select
//                     name="soundInstrument"
//                     value={formData.soundInstrument}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="">Select Instrument</option>
//                     <option value="Singing Bowl">Singing Bowls</option>
//                     <option value="Tingsha">Tingsha</option>
//                     <option value="Gong">Gong</option>
//                   </select>
//                 </div>

//                 {!formData.isSet && (
//                   <>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Size *</label>
//                       <select
//                         name="size"
//                         value={formData.size}
//                         onChange={handleInputChange}
//                         required={!formData.isSet}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       >
//                         <option value="">Select Size</option>
//                         <option value="Small">Small</option>
//                         <option value="Medium">Medium</option>
//                         <option value="Large">Large</option>
//                         <option value="Various">Various</option>
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg) *</label>
//                       <input
//                         type="number"
//                         name="weight"
//                         value={formData.weight}
//                         onChange={handleInputChange}
//                         required={!formData.isSet}
//                         min="0"
//                         step="0.01"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="Weight in kilograms"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Tone *</label>
//                       <select
//                         name="tone"
//                         value={formData.tone}
//                         onChange={handleInputChange}
//                         required={!formData.isSet}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       >
//                         <option value="">Select Tone</option>
//                         <option value="Low">Low</option>
//                         <option value="Medium">Medium</option>
//                         <option value="High">High</option>
//                         <option value="Full Range">Full Range</option>
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
//                       <select
//                         name="type"
//                         value={formData.type}
//                         onChange={handleInputChange}
//                         required={!formData.isSet}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       >
//                         <option value="">Select Type</option>
//                         <option value="Therapeutic">Therapeutic</option>
//                         <option value="Decorative">Decorative</option>
//                         <option value="Sound Bath">Sound Bath</option>
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Musical Note *</label>
//                       <input
//                         type="text"
//                         name="musicalNote"
//                         value={formData.musicalNote}
//                         onChange={handleInputChange}
//                         required={!formData.isSet}
//                         placeholder="e.g., F4, C3"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       />
//                     </div>
//                   </>
//                 )}

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
//                   <input
//                     type="text"
//                     name="brand"
//                     value={formData.brand}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                   required
//                   rows={4}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Detailed product description..."
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Product Details</label>
//                   {formData.details.map((detail, index) => (
//                     <div key={index} className="flex gap-2 mb-2">
//                       <input
//                         type="text"
//                         value={detail}
//                         onChange={(e) => handleArrayChange("details", index, e.target.value)}
//                         className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="Product specification"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeArrayItem("details", index)}
//                         className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   ))}
//                   <button
//                     type="button"
//                     onClick={() => addArrayItem("details")}
//                     className="flex items-center px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//                   >
//                     <Plus size={16} className="mr-1" />
//                     Add Detail
//                   </button>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Care Instructions</label>
//                   {formData.careInstructions.map((instruction, index) => (
//                     <div key={index} className="flex gap-2 mb-2">
//                       <input
//                         type="text"
//                         value={instruction}
//                         onChange={(e) => handleArrayChange("careInstructions", index, e.target.value)}
//                         className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="Care instruction"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeArrayItem("careInstructions", index)}
//                         className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   ))}
//                   <button
//                     type="button"
//                     onClick={() => addArrayItem("careInstructions")}
//                     className="flex items-center px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//                   >
//                     <Plus size={16} className="mr-1" />
//                     Add Instruction
//                   </button>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <h3 className="text-lg font-medium text-gray-900">Product Images</h3>
                
//                 {formData.isSet && (
//                   <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded border border-blue-200 mb-2">
//                     <strong>Note:</strong> For bowl sets, upload main product images here. These images will represent the entire set.
//                   </div>
//                 )}

//                 {existingImages.length > 0 && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Current Product Images</label>
//                     <div className="flex flex-wrap gap-2">
//                       {existingImages.map((image, index) => (
//                         <div key={index} className="relative">
//                           <img
//                             src={image || "/placeholder.svg?height=80&width=80"}
//                             alt={`Existing ${index}`}
//                             className="h-20 w-20 object-cover rounded border"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => removeImage(index, true)}
//                             className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
//                           >
//                             <X size={14} />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Upload Product Images *
//                   </label>
//                   <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//                     <Upload className="mx-auto h-12 w-12 text-gray-400" />
//                     <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop images</p>
//                     <input
//                       type="file"
//                       multiple
//                       accept="image/jpeg,image/png,image/gif,image/webp"
//                       onChange={handleImageUpload}
//                       className="hidden"
//                       id="image-upload"
//                     />
//                     <label
//                       htmlFor="image-upload"
//                       className="mt-2 inline-block px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600"
//                     >
//                       Choose Images
//                     </label>
//                   </div>

//                   {imageFiles.length > 0 && (
//                     <div className="mt-4">
//                       <p className="text-sm font-medium text-gray-700 mb-2">New Product Images:</p>
//                       <div className="flex flex-wrap gap-2">
//                         {imageFiles.map((file, index) => (
//                           <div key={index} className="relative">
//                             <img
//                               src={URL.createObjectURL(file) || "/placeholder.svg"}
//                               alt={`New ${index}`}
//                               className="h-20 w-20 object-cover rounded border"
//                             />
//                             <button
//                               type="button"
//                               onClick={() => removeImage(index, false)}
//                               className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
//                             >
//                               <X size={14} />
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Upload Product Video (Optional)</label>
//                   <input
//                     type="file"
//                     accept="video/mp4,video/webm,video/ogg"
//                     onChange={handleVideoUpload}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                   {videoFile && (
//                     <div className="mt-2">
//                       <p className="text-sm text-gray-600">Selected: {videoFile.name}</p>
//                       <button
//                         type="button"
//                         onClick={() => setVideoFile(null)}
//                         className="text-red-500 text-sm hover:text-red-700"
//                       >
//                         Remove video
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 {!videoFile && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Or Product Video URL (Optional)</label>
//                     <input
//                       type="url"
//                       name="video"
//                       value={formData.video}
//                       onChange={handleInputChange}
//                       placeholder="https://example.com/video.mp4"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     <p className="text-xs text-gray-500 mt-1">
//                       You can either upload a video file above or provide a video URL here
//                     </p>
//                   </div>
//                 )}

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Audio Sample URL (Optional)</label>
//                   <input
//                     type="url"
//                     name="audio"
//                     value={formData.audio}
//                     onChange={handleInputChange}
//                     placeholder="https://example.com/audio.mp3"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>

//               <div className="flex items-center space-x-4">
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     name="inStock"
//                     checked={formData.inStock}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                   />
//                   <span className="ml-2 text-sm font-medium text-gray-700">Product In Stock</span>
//                 </label>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
//                   <input
//                     type="number"
//                     name="rating"
//                     value={formData.rating}
//                     onChange={handleInputChange}
//                     min="0"
//                     max="5"
//                     step="0.1"
//                     className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Review Count</label>
//                   <input
//                     type="number"
//                     name="reviewCount"
//                     value={formData.reviewCount}
//                     onChange={handleInputChange}
//                     min="0"
//                     className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               <div className="bg-blue-50 p-4 rounded-md">
//                 <h3 className="text-lg font-medium text-blue-800 mb-2">SEO Preview</h3>
//                 <div className="space-y-2">
//                   <p className="text-blue-700 font-medium">
//                     {formData.seoTitle || `${formData.name} - Authentic Himalayan Singing Bowl | OMSound Nepal`}
//                   </p>
//                   <p className="text-gray-600 text-sm">
//                     {formData.seoDescription || `${formData.description.substring(0, 150)}...`}
//                   </p>
//                   <p className="text-gray-500 text-xs">URL: https://omsoundnepal.com/product/{formData.id}</p>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">SEO Title</label>
//                 <input
//                   type="text"
//                   name="seoTitle"
//                   value={formData.seoTitle}
//                   onChange={handleInputChange}
//                   placeholder="Auto-generated if empty"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">
//                   Recommended length: 50-60 characters ({formData.seoTitle.length}/60)
//                 </p>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">SEO Description</label>
//                 <textarea
//                   name="seoDescription"
//                   value={formData.seoDescription}
//                   onChange={handleInputChange}
//                   rows={3}
//                   placeholder="Auto-generated if empty"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">
//                   Recommended length: 150-160 characters ({formData.seoDescription.length}/160)
//                 </p>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">SEO Keywords</label>
//                 <textarea
//                   name="seoKeywords"
//                   value={formData.seoKeywords}
//                   onChange={handleInputChange}
//                   rows={3}
//                   placeholder="Comma-separated keywords"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <div className="mt-2">
//                   <p className="text-xs text-gray-500 mb-1">Suggested keywords:</p>
//                   <div className="flex flex-wrap gap-1">
//                     {generateSEOSuggestions().map((keyword, index) => (
//                       <button
//                         key={index}
//                         type="button"
//                         onClick={() => {
//                           const currentKeywords = formData.seoKeywords
//                           const newKeywords = currentKeywords ? `${currentKeywords}, ${keyword}` : keyword
//                           setFormData((prev) => ({ ...prev, seoKeywords: newKeywords }))
//                         }}
//                         className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200"
//                       >
//                         + {keyword}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {uploadProgress > 0 && uploadProgress < 100 && (
//             <div className="mt-4">
//               <div className="w-full bg-gray-200 rounded-full h-2.5">
//                 <div
//                   className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
//                   style={{ width: `${uploadProgress}%` }}
//                 ></div>
//               </div>
//               <p className="text-xs text-gray-500 mt-1">Processing: {uploadProgress}%</p>
//             </div>
//           )}

//           <div className="flex justify-between pt-6 border-t border-gray-200 mt-6">
//             <button
//               type="button"
//               onClick={onCancel}
//               className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <div className="flex space-x-2">
//               {activeTab === "product" && (
//                 <button
//                   type="button"
//                   onClick={() => setActiveTab("seo")}
//                   className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//                 >
//                   Continue to SEO
//                 </button>
//               )}
//               {activeTab === "seo" && (
//                 <button
//                   type="button"
//                   onClick={() => setActiveTab("product")}
//                   className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//                 >
//                   Back to Product
//                 </button>
//               )}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
//               >
//                 {loading ? "Processing..." : product ? "Update Product" : "Create Product"}
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default ProductForm


//just new

// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { X, Upload, Trash2, Plus } from "lucide-react"
// import type { Product } from "../../context/ProductContext"

// interface ProductFormProps {
//   product?: Product | null
//   onSubmit: (formData: FormData) => Promise<void>
//   onCancel: () => void
//   loading?: boolean
// }

// interface BowlSetItem {
//   code: string
//   size: string
//   weight: number
//   musicalNote: string
//   inStock: boolean
// }

// interface FormState {
//   id: string
//   name: string
//   price: number
//   weight: number
//   size: string
//   tone: string
//   type: string
//   musicalNote: string
//   brand: string
//   category: string
//   soundInstrument: string
//   description: string
//   details: string[]
//   careInstructions: string[]
//   inStock: boolean
//   rating: number
//   reviewCount: number
//   seoKeywords: string
//   seoTitle: string
//   seoDescription: string
//   video: string
//   audio: string
//   isSet: boolean
//   setItems: BowlSetItem[]
// }

// const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onCancel, loading = false }) => {
//   const [activeTab, setActiveTab] = useState<"product" | "seo">("product")
//   const [imageFiles, setImageFiles] = useState<File[]>([])
//   const [videoFile, setVideoFile] = useState<File | null>(null)
//   const [existingImages, setExistingImages] = useState<string[]>([])
//   const [uploadProgress, setUploadProgress] = useState(0)
//   const [formData, setFormData] = useState<FormState>({
//     id: "",
//     name: "",
//     price: 0,
//     weight: 0,
//     size: "",
//     tone: "",
//     type: "",
//     musicalNote: "",
//     brand: "OMSound Nepal",
//     category: "",
//     soundInstrument: "",
//     description: "",
//     details: [""],
//     careInstructions: [""],
//     inStock: true,
//     rating: 0,
//     reviewCount: 0,
//     seoKeywords: "",
//     seoTitle: "",
//     seoDescription: "",
//     video: "",
//     audio: "",
//     isSet: false,
//     setItems: [],
//   })

//   useEffect(() => {
//     if (product) {
//       const productSetItems = (product as any)?.setItems || []
//       const parsedSetItems = Array.isArray(productSetItems) 
//         ? productSetItems.map((item: any) => ({
//             code: item.code || "",
//             size: item.size || "",
//             weight: item.weight || 0,
//             musicalNote: item.musicalNote || "",
//             inStock: item.inStock !== undefined ? item.inStock : true,
//           }))
//         : []
      
//       setFormData({
//         id: product.id || "",
//         name: product.name || "",
//         price: product.price || 0,
//         weight: product.weight || 0,
//         size: product.size || "",
//         tone: product.tone || "",
//         type: product.type || "",
//         musicalNote: product.musicalNote || "",
//         brand: product.brand || "OMSound Nepal",
//         category: product.category || "",
//         soundInstrument: product.soundInstrument || "",
//         description: product.description || "",
//         details: product.details?.length ? product.details : [""],
//         careInstructions: product.careInstructions?.length ? product.careInstructions : [""],
//         inStock: product.inStock ?? true,
//         rating: product.rating || 0,
//         reviewCount: product.reviewCount || 0,
//         seoKeywords: product.seoKeywords || "",
//         seoTitle: product.seoTitle || "",
//         seoDescription: product.seoDescription || "",
//         video: product.video || "",
//         audio: product.audio || "",
//         isSet: (product as any)?.isSet || false,
//         setItems: parsedSetItems,
//       })
//       setExistingImages(product.images || [])
//       setVideoFile(null) // Reset video file when loading existing product
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         id: `bowl-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
//       }))
//     }
//   }, [product])

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]:
//         type === "checkbox"
//           ? (e.target as HTMLInputElement).checked
//           : type === "number"
//             ? Number.parseFloat(value) || 0
//             : value,
//     }))
//   }

//   const handleArrayChange = (field: "details" | "careInstructions", index: number, value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: prev[field].map((item, i) => (i === index ? value : item)),
//     }))
//   }

//   const addArrayItem = (field: "details" | "careInstructions") => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: [...prev[field], ""],
//     }))
//   }

//   const removeArrayItem = (field: "details" | "careInstructions", index: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: prev[field].filter((_, i) => i !== index),
//     }))
//   }

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || [])
//     const validFiles = files.filter((file) => {
//       const isValidType = ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(file.type)
//       const isValidSize = file.size <= 10 * 1024 * 1024
//       return isValidType && isValidSize
//     })

//     setImageFiles((prev) => [...prev, ...validFiles])
//   }

//   const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file && file.size <= 100 * 1024 * 1024) {
//       setVideoFile(file)
//       // Clear the video URL when uploading a new file
//       setFormData((prev) => ({ ...prev, video: "" }))
//     } else if (file) {
//       alert("Video file is too large. Maximum size is 100MB.")
//     }
//   }

//   const removeImage = (index: number, isExisting = false) => {
//     if (isExisting) {
//       setExistingImages((prev) => prev.filter((_, i) => i !== index))
//     } else {
//       setImageFiles((prev) => prev.filter((_, i) => i !== index))
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()

//     console.log("=== FORM SUBMIT START ===")
//     console.log("Form data state:", formData)
//     console.log("Image files:", imageFiles)
//     console.log("Video file:", videoFile)
//     console.log("Existing images:", existingImages)

//     if (
//       !formData.name ||
//       !formData.price ||
//       !formData.category ||
//       !formData.description
//     ) {
//       alert("Please fill all required fields")
//       return
//     }

//     if (!formData.isSet) {
//       if (!formData.size || !formData.weight || !formData.tone || !formData.type || !formData.musicalNote) {
//         alert("Please complete single bowl details")
//         return
//       }
      
//       if (imageFiles.length === 0 && existingImages.length === 0) {
//         alert("Please upload at least one image for the product")
//         return
//       }
//     } else {
//       if (imageFiles.length === 0 && existingImages.length === 0) {
//         alert("Please upload at least one image for the bowl set")
//         return
//       }
//     }

//     try {
//       setUploadProgress(10)

//       const submitData = new FormData()

//       submitData.append("id", formData.id.trim())
//       submitData.append("name", formData.name.trim())
//       submitData.append("price", formData.price.toString())
//       submitData.append("brand", formData.brand.trim())
//       submitData.append("category", formData.category.trim())
//       submitData.append("soundInstrument", formData.soundInstrument.trim())
//       submitData.append("description", formData.description.trim())
//       submitData.append("inStock", formData.inStock.toString())
//       submitData.append("rating", formData.rating.toString())
//       submitData.append("reviewCount", formData.reviewCount.toString())
//       submitData.append("seoKeywords", formData.seoKeywords.trim())
//       submitData.append("seoTitle", formData.seoTitle.trim())
//       submitData.append("seoDescription", formData.seoDescription.trim())
//       submitData.append("audio", formData.audio.trim())
//       submitData.append("isSet", formData.isSet.toString())

//       if (!formData.isSet) {
//         submitData.append("size", formData.size.trim())
//         submitData.append("weight", formData.weight.toString())
//         submitData.append("tone", formData.tone.trim())
//         submitData.append("type", formData.type.trim())
//         submitData.append("musicalNote", formData.musicalNote.trim())
//       } else {
//         submitData.append("size", "Various")
//         submitData.append("weight", "0")
//         submitData.append("tone", "Full Range")
//         submitData.append("type", "Therapeutic Set")
//         submitData.append("musicalNote", "Multiple Notes")
//       }

//       setUploadProgress(30)

//       if (formData.isSet) {
//         const setItemsForJson = formData.setItems.map((item) => ({
//           code: item.code,
//           size: item.size,
//           weight: item.weight,
//           musicalNote: item.musicalNote,
//           inStock: item.inStock,
//         }))
//         submitData.append("setItems", JSON.stringify(setItemsForJson))
//       }

//       const filteredDetails = formData.details.filter((item) => item.trim() !== "")
//       if (filteredDetails.length > 0) {
//         filteredDetails.forEach((detail) => {
//           submitData.append("details", detail.trim())
//         })
//       } else {
//         submitData.append("details", "Handcrafted singing bowl")
//       }

//       const filteredInstructions = formData.careInstructions.filter((item) => item.trim() !== "")
//       if (filteredInstructions.length > 0) {
//         filteredInstructions.forEach((instruction) => {
//           submitData.append("careInstructions", instruction.trim())
//         })
//       } else {
//         submitData.append("careInstructions", "Clean with soft cloth")
//       }

//       if (existingImages.length > 0) {
//         existingImages.forEach((image) => {
//           submitData.append("existingImages", image)
//         })
//       }

//       setUploadProgress(50)

//       if (imageFiles.length > 0) {
//         imageFiles.forEach((file) => {
//           submitData.append("images", file)
//         })
//       }

//       setUploadProgress(70)

//       // Handle video - priority: new video file > video URL
//       if (videoFile) {
//         submitData.append("video", videoFile)
//         console.log("Appending video file:", videoFile.name)
//       } else if (formData.video && formData.video.trim() !== "") {
//         submitData.append("video", formData.video.trim())
//         console.log("Appending video URL:", formData.video)
//       }
//       // If no video file and no video URL, don't append anything (keep existing)

//       setUploadProgress(90)

//       console.log("FormData contents:")
//       for (const [key, value] of submitData.entries()) {
//         if (value instanceof File) {
//           console.log(key, `File: ${value.name} (${value.type}, ${value.size} bytes)`)
//         } else {
//           console.log(key, value)
//         }
//       }

//       await onSubmit(submitData)

//       setUploadProgress(100)

//       // Reset form after successful submission
//       setImageFiles([])
//       setVideoFile(null)
//       setExistingImages([])
//       setUploadProgress(0)

//       console.log("=== FORM SUBMIT SUCCESS ===")
//     } catch (error) {
//       setUploadProgress(0)
//       console.error("Form submission error:", error)
//       console.log("=== FORM SUBMIT ERROR ===")
//     }
//   }

//   const generateSEOSuggestions = () => {
//     if (!formData.name) return []

//     const suggestions = [
//       `${formData.name.toLowerCase()}`,
//       `${formData.name.toLowerCase()} singing bowl`,
//       `buy ${formData.name.toLowerCase()}`,
//       "himalayan singing bowl",
//       "sound healing bowl",
//       "meditation bowl",
//       "tibetan bowl",
//       "nepal singing bowl",
//     ]

//     if (formData.size) suggestions.push(`${formData.size.toLowerCase()} singing bowl`)
//     if (formData.tone) suggestions.push(`${formData.tone.toLowerCase()} tone bowl`)

//     return suggestions
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex justify-between items-center">
//             <h2 className="text-xl font-semibold text-gray-900">{product ? "Edit Product" : "Add New Product"}</h2>
//             <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
//               <X size={24} />
//             </button>
//           </div>

//           <div className="flex border-b border-gray-200 mt-4">
//             <button
//               onClick={() => setActiveTab("product")}
//               className={`px-4 py-2 font-medium ${
//                 activeTab === "product" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
//               }`}
//             >
//               Product Details
//             </button>
//             <button
//               onClick={() => setActiveTab("seo")}
//               className={`px-4 py-2 font-medium ${
//                 activeTab === "seo" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
//               }`}
//             >
//               SEO & Marketing
//             </button>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6">
//           {activeTab === "product" ? (
//             <div className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Product ID *</label>
//                 <input
//                   type="text"
//                   name="id"
//                   value={formData.id}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="e.g., bowl-himalayan-harmony-001"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">
//                   Unique identifier for this product (used in URLs and database)
//                 </p>
//               </div>

//               <div className="flex items-center gap-3 mt-4">
//                 <input
//                   type="checkbox"
//                   checked={formData.isSet}
//                   onChange={(e) =>
//                     setFormData((prev) => ({ ...prev, isSet: e.target.checked }))
//                   }
//                   className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                 />
//                 <span className="text-sm font-medium">
//                   This product is a Singing Bowl Set
//                 </span>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
//                   <input
//                     type="number"
//                     name="price"
//                     value={formData.price}
//                     onChange={handleInputChange}
//                     required
//                     min="0"
//                     step="0.01"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
//                   <select
//                     name="category"
//                     value={formData.category}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="">Select Category</option>
//                     <option value="Traditional">Traditional</option>
//                     <option value="Premium">Premium</option>
//                     <option value="Professional">Professional</option>
//                     <option value="Luxury">Luxury</option>
//                   </select>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Sound Instrument *</label>
//                   <select
//                     name="soundInstrument"
//                     value={formData.soundInstrument}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="">Select Instrument</option>
//                     <option value="Singing Bowl">Singing Bowls</option>
//                     <option value="Tingsha">Tingsha</option>
//                     <option value="Gong">Gong</option>
//                   </select>
//                 </div>

//                 {!formData.isSet && (
//                   <>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Size *</label>
//                       <select
//                         name="size"
//                         value={formData.size}
//                         onChange={handleInputChange}
//                         required={!formData.isSet}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       >
//                         <option value="">Select Size</option>
//                         <option value="Small">Small</option>
//                         <option value="Medium">Medium</option>
//                         <option value="Large">Large</option>
//                         <option value="Various">Various</option>
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg) *</label>
//                       <input
//                         type="number"
//                         name="weight"
//                         value={formData.weight}
//                         onChange={handleInputChange}
//                         required={!formData.isSet}
//                         min="0"
//                         step="0.01"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="Weight in kilograms"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Tone *</label>
//                       <select
//                         name="tone"
//                         value={formData.tone}
//                         onChange={handleInputChange}
//                         required={!formData.isSet}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       >
//                         <option value="">Select Tone</option>
//                         <option value="Low">Low</option>
//                         <option value="Medium">Medium</option>
//                         <option value="High">High</option>
//                         <option value="Full Range">Full Range</option>
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
//                       <select
//                         name="type"
//                         value={formData.type}
//                         onChange={handleInputChange}
//                         required={!formData.isSet}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       >
//                         <option value="">Select Type</option>
//                         <option value="Therapeutic">Therapeutic</option>
//                         <option value="Decorative">Decorative</option>
//                         <option value="Sound Bath">Sound Bath</option>
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Musical Note *</label>
//                       <input
//                         type="text"
//                         name="musicalNote"
//                         value={formData.musicalNote}
//                         onChange={handleInputChange}
//                         required={!formData.isSet}
//                         placeholder="e.g., F4, C3"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       />
//                     </div>
//                   </>
//                 )}

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
//                   <input
//                     type="text"
//                     name="brand"
//                     value={formData.brand}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                   required
//                   rows={4}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Detailed product description..."
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Product Details</label>
//                   {formData.details.map((detail, index) => (
//                     <div key={index} className="flex gap-2 mb-2">
//                       <input
//                         type="text"
//                         value={detail}
//                         onChange={(e) => handleArrayChange("details", index, e.target.value)}
//                         className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="Product specification"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeArrayItem("details", index)}
//                         className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   ))}
//                   <button
//                     type="button"
//                     onClick={() => addArrayItem("details")}
//                     className="flex items-center px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//                   >
//                     <Plus size={16} className="mr-1" />
//                     Add Detail
//                   </button>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Care Instructions</label>
//                   {formData.careInstructions.map((instruction, index) => (
//                     <div key={index} className="flex gap-2 mb-2">
//                       <input
//                         type="text"
//                         value={instruction}
//                         onChange={(e) => handleArrayChange("careInstructions", index, e.target.value)}
//                         className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="Care instruction"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeArrayItem("careInstructions", index)}
//                         className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   ))}
//                   <button
//                     type="button"
//                     onClick={() => addArrayItem("careInstructions")}
//                     className="flex items-center px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//                   >
//                     <Plus size={16} className="mr-1" />
//                     Add Instruction
//                   </button>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <h3 className="text-lg font-medium text-gray-900">Product Images</h3>
                
//                 {formData.isSet && (
//                   <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded border border-blue-200 mb-2">
//                     <strong>Note:</strong> For bowl sets, upload main product images here. These images will represent the entire set.
//                   </div>
//                 )}

//                 {existingImages.length > 0 && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Current Product Images</label>
//                     <div className="flex flex-wrap gap-2">
//                       {existingImages.map((image, index) => (
//                         <div key={index} className="relative">
//                           <img
//                             src={image || "/placeholder.svg?height=80&width=80"}
//                             alt={`Existing ${index}`}
//                             className="h-20 w-20 object-cover rounded border"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => removeImage(index, true)}
//                             className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
//                           >
//                             <X size={14} />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Upload Product Images *
//                   </label>
//                   <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//                     <Upload className="mx-auto h-12 w-12 text-gray-400" />
//                     <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop images</p>
//                     <input
//                       type="file"
//                       multiple
//                       accept="image/jpeg,image/png,image/gif,image/webp"
//                       onChange={handleImageUpload}
//                       className="hidden"
//                       id="image-upload"
//                     />
//                     <label
//                       htmlFor="image-upload"
//                       className="mt-2 inline-block px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600"
//                     >
//                       Choose Images
//                     </label>
//                   </div>

//                   {imageFiles.length > 0 && (
//                     <div className="mt-4">
//                       <p className="text-sm font-medium text-gray-700 mb-2">New Product Images:</p>
//                       <div className="flex flex-wrap gap-2">
//                         {imageFiles.map((file, index) => (
//                           <div key={index} className="relative">
//                             <img
//                               src={URL.createObjectURL(file) || "/placeholder.svg"}
//                               alt={`New ${index}`}
//                               className="h-20 w-20 object-cover rounded border"
//                             />
//                             <button
//                               type="button"
//                               onClick={() => removeImage(index, false)}
//                               className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
//                             >
//                               <X size={14} />
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Upload Product Video (Optional)</label>
//                   <input
//                     type="file"
//                     accept="video/mp4,video/webm,video/ogg,video/quicktime"
//                     onChange={handleVideoUpload}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                   {videoFile && (
//                     <div className="mt-2">
//                       <p className="text-sm text-green-600">Selected: {videoFile.name}</p>
//                       <button
//                         type="button"
//                         onClick={() => setVideoFile(null)}
//                         className="text-red-500 text-sm hover:text-red-700"
//                       >
//                         Remove video
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 {!videoFile && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Or Product Video URL (Optional)</label>
//                     <input
//                       type="url"
//                       name="video"
//                       value={formData.video}
//                       onChange={handleInputChange}
//                       placeholder="https://example.com/video.mp4"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     <p className="text-xs text-gray-500 mt-1">
//                       You can either upload a video file above or provide a video URL here
//                     </p>
//                   </div>
//                 )}

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Audio Sample URL (Optional)</label>
//                   <input
//                     type="url"
//                     name="audio"
//                     value={formData.audio}
//                     onChange={handleInputChange}
//                     placeholder="https://example.com/audio.mp3"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>

//               <div className="flex items-center space-x-4">
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     name="inStock"
//                     checked={formData.inStock}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                   />
//                   <span className="ml-2 text-sm font-medium text-gray-700">Product In Stock</span>
//                 </label>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
//                   <input
//                     type="number"
//                     name="rating"
//                     value={formData.rating}
//                     onChange={handleInputChange}
//                     min="0"
//                     max="5"
//                     step="0.1"
//                     className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Review Count</label>
//                   <input
//                     type="number"
//                     name="reviewCount"
//                     value={formData.reviewCount}
//                     onChange={handleInputChange}
//                     min="0"
//                     className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               <div className="bg-blue-50 p-4 rounded-md">
//                 <h3 className="text-lg font-medium text-blue-800 mb-2">SEO Preview</h3>
//                 <div className="space-y-2">
//                   <p className="text-blue-700 font-medium">
//                     {formData.seoTitle || `${formData.name} - Authentic Himalayan Singing Bowl | OMSound Nepal`}
//                   </p>
//                   <p className="text-gray-600 text-sm">
//                     {formData.seoDescription || `${formData.description.substring(0, 150)}...`}
//                   </p>
//                   <p className="text-gray-500 text-xs">URL: https://omsoundnepal.com/product/{formData.id}</p>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">SEO Title</label>
//                 <input
//                   type="text"
//                   name="seoTitle"
//                   value={formData.seoTitle}
//                   onChange={handleInputChange}
//                   placeholder="Auto-generated if empty"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">
//                   Recommended length: 50-60 characters ({formData.seoTitle.length}/60)
//                 </p>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">SEO Description</label>
//                 <textarea
//                   name="seoDescription"
//                   value={formData.seoDescription}
//                   onChange={handleInputChange}
//                   rows={3}
//                   placeholder="Auto-generated if empty"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">
//                   Recommended length: 150-160 characters ({formData.seoDescription.length}/160)
//                 </p>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">SEO Keywords</label>
//                 <textarea
//                   name="seoKeywords"
//                   value={formData.seoKeywords}
//                   onChange={handleInputChange}
//                   rows={3}
//                   placeholder="Comma-separated keywords"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <div className="mt-2">
//                   <p className="text-xs text-gray-500 mb-1">Suggested keywords:</p>
//                   <div className="flex flex-wrap gap-1">
//                     {generateSEOSuggestions().map((keyword, index) => (
//                       <button
//                         key={index}
//                         type="button"
//                         onClick={() => {
//                           const currentKeywords = formData.seoKeywords
//                           const newKeywords = currentKeywords ? `${currentKeywords}, ${keyword}` : keyword
//                           setFormData((prev) => ({ ...prev, seoKeywords: newKeywords }))
//                         }}
//                         className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200"
//                       >
//                         + {keyword}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {uploadProgress > 0 && uploadProgress < 100 && (
//             <div className="mt-4">
//               <div className="w-full bg-gray-200 rounded-full h-2.5">
//                 <div
//                   className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
//                   style={{ width: `${uploadProgress}%` }}
//                 ></div>
//               </div>
//               <p className="text-xs text-gray-500 mt-1">Processing: {uploadProgress}%</p>
//             </div>
//           )}

//           <div className="flex justify-between pt-6 border-t border-gray-200 mt-6">
//             <button
//               type="button"
//               onClick={onCancel}
//               className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <div className="flex space-x-2">
//               {activeTab === "product" && (
//                 <button
//                   type="button"
//                   onClick={() => setActiveTab("seo")}
//                   className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//                 >
//                   Continue to SEO
//                 </button>
//               )}
//               {activeTab === "seo" && (
//                 <button
//                   type="button"
//                   onClick={() => setActiveTab("product")}
//                   className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//                 >
//                   Back to Product
//                 </button>
//               )}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
//               >
//                 {loading ? "Processing..." : product ? "Update Product" : "Create Product"}
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default ProductForm

// just new 1
// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { X, Upload, Trash2, Plus } from "lucide-react"
// import type { Product } from "../../context/ProductContext"

// interface ProductFormProps {
//   product?: Product | null
//   onSubmit: (formData: FormData) => Promise<void>
//   onCancel: () => void
//   loading?: boolean
// }

// interface BowlSetItem {
//   code: string
//   size: string
//   weight: number
//   musicalNote: string
//   inStock: boolean
// }

// interface FormState {
//   id: string
//   name: string
//   price: number
//   weight: number
//   size: string
//   tone: string
//   type: string
//   musicalNote: string
//   bowlCode: string
//   brand: string
//   category: string
//   soundInstrument: string
//   description: string
//   details: string[]
//   careInstructions: string[]
//   inStock: boolean
//   rating: number
//   reviewCount: number
//   seoKeywords: string
//   seoTitle: string
//   seoDescription: string
//   video: string
//   audio: string
//   isSet: boolean
//   setItems: BowlSetItem[]
// }

// const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onCancel, loading = false }) => {
//   const [activeTab, setActiveTab] = useState<"product" | "seo">("product")
//   const [imageFiles, setImageFiles] = useState<File[]>([])
//   const [videoFile, setVideoFile] = useState<File | null>(null)
//   const [existingImages, setExistingImages] = useState<string[]>([])
//   const [uploadProgress, setUploadProgress] = useState(0)
//   const [formData, setFormData] = useState<FormState>({
//     id: "",
//     name: "",
//     price: 0,
//     weight: 0,
//     size: "",
//     tone: "",
//     type: "",
//     musicalNote: "",
//     bowlCode: "",
//     brand: "OMSound Nepal",
//     category: "",
//     soundInstrument: "",
//     description: "",
//     details: [""],
//     careInstructions: [""],
//     inStock: true,
//     rating: 0,
//     reviewCount: 0,
//     seoKeywords: "",
//     seoTitle: "",
//     seoDescription: "",
//     video: "",
//     audio: "",
//     isSet: false,
//     setItems: [],
//   })

//   useEffect(() => {
//     if (product) {
//       const productSetItems = (product as any)?.setItems || []
//       const parsedSetItems = Array.isArray(productSetItems) 
//         ? productSetItems.map((item: any) => ({
//             code: item.code || "",
//             size: item.size || "",
//             weight: item.weight || 0,
//             musicalNote: item.musicalNote || "",
//             inStock: item.inStock !== undefined ? item.inStock : true,
//           }))
//         : []
      
//       setFormData({
//         id: product.id || "",
//         name: product.name || "",
//         price: product.price || 0,
//         weight: product.weight || 0,
//         size: product.size || "",
//         tone: product.tone || "",
//         type: product.type || "",
//         musicalNote: product.musicalNote || "",
//         bowlCode: (product as any).bowlCode || "",
//         brand: product.brand || "OMSound Nepal",
//         category: product.category || "",
//         soundInstrument: product.soundInstrument || "",
//         description: product.description || "",
//         details: product.details?.length ? product.details : [""],
//         careInstructions: product.careInstructions?.length ? product.careInstructions : [""],
//         inStock: product.inStock ?? true,
//         rating: product.rating || 0,
//         reviewCount: product.reviewCount || 0,
//         seoKeywords: product.seoKeywords || "",
//         seoTitle: product.seoTitle || "",
//         seoDescription: product.seoDescription || "",
//         video: product.video || "",
//         audio: product.audio || "",
//         isSet: (product as any)?.isSet || false,
//         setItems: parsedSetItems,
//       })
//       setExistingImages(product.images || [])
//       setVideoFile(null)
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         id: `bowl-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
//       }))
//     }
//   }, [product])

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]:
//         type === "checkbox"
//           ? (e.target as HTMLInputElement).checked
//           : type === "number"
//             ? Number.parseFloat(value) || 0
//             : value,
//     }))
//   }

//   const handleArrayChange = (field: "details" | "careInstructions", index: number, value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: prev[field].map((item, i) => (i === index ? value : item)),
//     }))
//   }

//   const addArrayItem = (field: "details" | "careInstructions") => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: [...prev[field], ""],
//     }))
//   }

//   const removeArrayItem = (field: "details" | "careInstructions", index: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: prev[field].filter((_, i) => i !== index),
//     }))
//   }

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || [])
//     const validFiles = files.filter((file) => {
//       const isValidType = ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(file.type)
//       const isValidSize = file.size <= 10 * 1024 * 1024
//       return isValidType && isValidSize
//     })

//     setImageFiles((prev) => [...prev, ...validFiles])
//   }

//   const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file && file.size <= 100 * 1024 * 1024) {
//       setVideoFile(file)
//       setFormData((prev) => ({ ...prev, video: "" }))
//     } else if (file) {
//       alert("Video file is too large. Maximum size is 100MB.")
//     }
//   }

//   const removeImage = (index: number, isExisting = false) => {
//     if (isExisting) {
//       setExistingImages((prev) => prev.filter((_, i) => i !== index))
//     } else {
//       setImageFiles((prev) => prev.filter((_, i) => i !== index))
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()

//     console.log("=== FORM SUBMIT START ===")
//     console.log("Form data state:", formData)
//     console.log("Image files:", imageFiles)
//     console.log("Video file:", videoFile)
//     console.log("Existing images:", existingImages)

//     if (
//       !formData.name ||
//       !formData.price ||
//       !formData.category ||
//       !formData.description
//     ) {
//       alert("Please fill all required fields")
//       return
//     }

//     if (!formData.isSet) {
//       if (!formData.size || !formData.weight || !formData.tone || !formData.type || !formData.musicalNote || !formData.bowlCode) {
//         alert("Please complete all single bowl details (Size, Weight, Tone, Type, Musical Note, Bowl Code)")
//         return
//       }
      
//       if (imageFiles.length === 0 && existingImages.length === 0) {
//         alert("Please upload at least one image for the product")
//         return
//       }
//     } else {
//       if (imageFiles.length === 0 && existingImages.length === 0) {
//         alert("Please upload at least one image for the bowl set")
//         return
//       }
//     }

//     try {
//       setUploadProgress(10)

//       const submitData = new FormData()

//       submitData.append("id", formData.id.trim())
//       submitData.append("name", formData.name.trim())
//       submitData.append("price", formData.price.toString())
//       submitData.append("brand", formData.brand.trim())
//       submitData.append("category", formData.category.trim())
//       submitData.append("soundInstrument", formData.soundInstrument.trim())
//       submitData.append("description", formData.description.trim())
//       submitData.append("inStock", formData.inStock.toString())
//       submitData.append("rating", formData.rating.toString())
//       submitData.append("reviewCount", formData.reviewCount.toString())
//       submitData.append("seoKeywords", formData.seoKeywords.trim())
//       submitData.append("seoTitle", formData.seoTitle.trim())
//       submitData.append("seoDescription", formData.seoDescription.trim())
//       submitData.append("audio", formData.audio.trim())
//       submitData.append("isSet", formData.isSet.toString())

//       if (!formData.isSet) {
//         submitData.append("size", formData.size.trim())
//         submitData.append("weight", formData.weight.toString())
//         submitData.append("tone", formData.tone.trim())
//         submitData.append("type", formData.type.trim())
//         submitData.append("musicalNote", formData.musicalNote.trim())
//         submitData.append("bowlCode", formData.bowlCode.trim())
//       } else {
//         submitData.append("size", "Various")
//         submitData.append("weight", "0")
//         submitData.append("tone", "Full Range")
//         submitData.append("type", "Therapeutic Set")
//         submitData.append("musicalNote", "Multiple Notes")
//         submitData.append("bowlCode", "N/A")
//       }

//       setUploadProgress(30)

//       if (formData.isSet) {
//         const setItemsForJson = formData.setItems.map((item) => ({
//           code: item.code,
//           size: item.size,
//           weight: item.weight,
//           musicalNote: item.musicalNote,
//           inStock: item.inStock,
//         }))
//         submitData.append("setItems", JSON.stringify(setItemsForJson))
//       }

//       const filteredDetails = formData.details.filter((item) => item.trim() !== "")
//       if (filteredDetails.length > 0) {
//         filteredDetails.forEach((detail) => {
//           submitData.append("details", detail.trim())
//         })
//       } else {
//         submitData.append("details", "Handcrafted singing bowl")
//       }

//       const filteredInstructions = formData.careInstructions.filter((item) => item.trim() !== "")
//       if (filteredInstructions.length > 0) {
//         filteredInstructions.forEach((instruction) => {
//           submitData.append("careInstructions", instruction.trim())
//         })
//       } else {
//         submitData.append("careInstructions", "Clean with soft cloth")
//       }

//       if (existingImages.length > 0) {
//         existingImages.forEach((image) => {
//           submitData.append("existingImages", image)
//         })
//       }

//       setUploadProgress(50)

//       if (imageFiles.length > 0) {
//         imageFiles.forEach((file) => {
//           submitData.append("images", file)
//         })
//       }

//       setUploadProgress(70)

//       if (videoFile) {
//         submitData.append("video", videoFile)
//         console.log("Appending video file:", videoFile.name)
//       } else if (formData.video && formData.video.trim() !== "") {
//         submitData.append("video", formData.video.trim())
//         console.log("Appending video URL:", formData.video)
//       }

//       setUploadProgress(90)

//       console.log("FormData contents:")
//       for (const [key, value] of submitData.entries()) {
//         if (value instanceof File) {
//           console.log(key, `File: ${value.name} (${value.type}, ${value.size} bytes)`)
//         } else {
//           console.log(key, value)
//         }
//       }

//       await onSubmit(submitData)

//       setUploadProgress(100)

//       setImageFiles([])
//       setVideoFile(null)
//       setExistingImages([])
//       setUploadProgress(0)

//       console.log("=== FORM SUBMIT SUCCESS ===")
//     } catch (error) {
//       setUploadProgress(0)
//       console.error("Form submission error:", error)
//       console.log("=== FORM SUBMIT ERROR ===")
//     }
//   }

//   const generateSEOSuggestions = () => {
//     if (!formData.name) return []

//     const suggestions = [
//       `${formData.name.toLowerCase()}`,
//       `${formData.name.toLowerCase()} singing bowl`,
//       `buy ${formData.name.toLowerCase()}`,
//       "himalayan singing bowl",
//       "sound healing bowl",
//       "meditation bowl",
//       "tibetan bowl",
//       "nepal singing bowl",
//     ]

//     if (formData.size) suggestions.push(`${formData.size.toLowerCase()} singing bowl`)
//     if (formData.tone) suggestions.push(`${formData.tone.toLowerCase()} tone bowl`)

//     return suggestions
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex justify-between items-center">
//             <h2 className="text-xl font-semibold text-gray-900">{product ? "Edit Product" : "Add New Product"}</h2>
//             <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
//               <X size={24} />
//             </button>
//           </div>

//           <div className="flex border-b border-gray-200 mt-4">
//             <button
//               onClick={() => setActiveTab("product")}
//               className={`px-4 py-2 font-medium ${
//                 activeTab === "product" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
//               }`}
//             >
//               Product Details
//             </button>
//             <button
//               onClick={() => setActiveTab("seo")}
//               className={`px-4 py-2 font-medium ${
//                 activeTab === "seo" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
//               }`}
//             >
//               SEO & Marketing
//             </button>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6">
//           {activeTab === "product" ? (
//             <div className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Product ID *</label>
//                 <input
//                   type="text"
//                   name="id"
//                   value={formData.id}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="e.g., bowl-himalayan-harmony-001"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">
//                   Unique identifier for this product (used in URLs and database)
//                 </p>
//               </div>

//               <div className="flex items-center gap-3 mt-4">
//                 <input
//                   type="checkbox"
//                   checked={formData.isSet}
//                   onChange={(e) =>
//                     setFormData((prev) => ({ ...prev, isSet: e.target.checked }))
//                   }
//                   className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                 />
//                 <span className="text-sm font-medium">
//                   This product is a Singing Bowl Set
//                 </span>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
//                   <input
//                     type="number"
//                     name="price"
//                     value={formData.price}
//                     onChange={handleInputChange}
//                     required
//                     min="0"
//                     step="0.01"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
//                   <select
//                     name="category"
//                     value={formData.category}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="">Select Category</option>
//                     <option value="Traditional">Traditional</option>
//                     <option value="Premium">Premium</option>
//                     <option value="Professional">Professional</option>
//                     <option value="Luxury">Luxury</option>
//                   </select>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Sound Instrument *</label>
//                   <select
//                     name="soundInstrument"
//                     value={formData.soundInstrument}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="">Select Instrument</option>
//                     <option value="Singing Bowl">Singing Bowls</option>
//                     <option value="Tingsha">Tingsha</option>
//                     <option value="Gong">Gong</option>
//                   </select>
//                 </div>

//                 {!formData.isSet && (
//                   <>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Size *</label>
//                       <select
//                         name="size"
//                         value={formData.size}
//                         onChange={handleInputChange}
//                         required={!formData.isSet}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       >
//                         <option value="">Select Size</option>
//                         <option value="Small">Small</option>
//                         <option value="Medium">Medium</option>
//                         <option value="Large">Large</option>
//                         <option value="Various">Various</option>
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg) *</label>
//                       <input
//                         type="number"
//                         name="weight"
//                         value={formData.weight}
//                         onChange={handleInputChange}
//                         required={!formData.isSet}
//                         min="0"
//                         step="0.01"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="Weight in kilograms"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Tone *</label>
//                       <select
//                         name="tone"
//                         value={formData.tone}
//                         onChange={handleInputChange}
//                         required={!formData.isSet}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       >
//                         <option value="">Select Tone</option>
//                         <option value="Low">Low</option>
//                         <option value="Medium">Medium</option>
//                         <option value="High">High</option>
//                         <option value="Full Range">Full Range</option>
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
//                       <select
//                         name="type"
//                         value={formData.type}
//                         onChange={handleInputChange}
//                         required={!formData.isSet}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       >
//                         <option value="">Select Type</option>
//                         <option value="Therapeutic">Therapeutic</option>
//                         <option value="Decorative">Decorative</option>
//                         <option value="Sound Bath">Sound Bath</option>
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Musical Note *</label>
//                       <input
//                         type="text"
//                         name="musicalNote"
//                         value={formData.musicalNote}
//                         onChange={handleInputChange}
//                         // required={!formData.isSet}
//                         placeholder="e.g., F4, C3"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Bowl Code *</label>
//                       <input
//                         type="text"
//                         name="bowlCode"
//                         value={formData.bowlCode}
//                         onChange={handleInputChange}
//                         required={!formData.isSet}
//                         placeholder="e.g., SB-001, HB-2024"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       />
//                       <p className="text-xs text-gray-500 mt-1">Unique code for this singing bowl (e.g., SB-001, HB-2024)</p>
//                     </div>
//                   </>
//                 )}

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
//                   <input
//                     type="text"
//                     name="brand"
//                     value={formData.brand}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                   required
//                   rows={4}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Detailed product description..."
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Product Details</label>
//                   {formData.details.map((detail, index) => (
//                     <div key={index} className="flex gap-2 mb-2">
//                       <input
//                         type="text"
//                         value={detail}
//                         onChange={(e) => handleArrayChange("details", index, e.target.value)}
//                         className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="Product specification"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeArrayItem("details", index)}
//                         className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   ))}
//                   <button
//                     type="button"
//                     onClick={() => addArrayItem("details")}
//                     className="flex items-center px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//                   >
//                     <Plus size={16} className="mr-1" />
//                     Add Detail
//                   </button>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Care Instructions</label>
//                   {formData.careInstructions.map((instruction, index) => (
//                     <div key={index} className="flex gap-2 mb-2">
//                       <input
//                         type="text"
//                         value={instruction}
//                         onChange={(e) => handleArrayChange("careInstructions", index, e.target.value)}
//                         className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="Care instruction"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeArrayItem("careInstructions", index)}
//                         className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   ))}
//                   <button
//                     type="button"
//                     onClick={() => addArrayItem("careInstructions")}
//                     className="flex items-center px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//                   >
//                     <Plus size={16} className="mr-1" />
//                     Add Instruction
//                   </button>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <h3 className="text-lg font-medium text-gray-900">Product Images</h3>
                
//                 {formData.isSet && (
//                   <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded border border-blue-200 mb-2">
//                     <strong>Note:</strong> For bowl sets, upload main product images here. These images will represent the entire set.
//                   </div>
//                 )}

//                 {existingImages.length > 0 && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Current Product Images</label>
//                     <div className="flex flex-wrap gap-2">
//                       {existingImages.map((image, index) => (
//                         <div key={index} className="relative">
//                           <img
//                             src={image || "/placeholder.svg?height=80&width=80"}
//                             alt={`Existing ${index}`}
//                             className="h-20 w-20 object-cover rounded border"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => removeImage(index, true)}
//                             className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
//                           >
//                             <X size={14} />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Upload Product Images *
//                   </label>
//                   <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//                     <Upload className="mx-auto h-12 w-12 text-gray-400" />
//                     <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop images</p>
//                     <input
//                       type="file"
//                       multiple
//                       accept="image/jpeg,image/png,image/gif,image/webp"
//                       onChange={handleImageUpload}
//                       className="hidden"
//                       id="image-upload"
//                     />
//                     <label
//                       htmlFor="image-upload"
//                       className="mt-2 inline-block px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600"
//                     >
//                       Choose Images
//                     </label>
//                   </div>

//                   {imageFiles.length > 0 && (
//                     <div className="mt-4">
//                       <p className="text-sm font-medium text-gray-700 mb-2">New Product Images:</p>
//                       <div className="flex flex-wrap gap-2">
//                         {imageFiles.map((file, index) => (
//                           <div key={index} className="relative">
//                             <img
//                               src={URL.createObjectURL(file) || "/placeholder.svg"}
//                               alt={`New ${index}`}
//                               className="h-20 w-20 object-cover rounded border"
//                             />
//                             <button
//                               type="button"
//                               onClick={() => removeImage(index, false)}
//                               className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
//                             >
//                               <X size={14} />
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Upload Product Video (Optional)</label>
//                   <input
//                     type="file"
//                     accept="video/mp4,video/webm,video/ogg,video/quicktime"
//                     onChange={handleVideoUpload}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                   {videoFile && (
//                     <div className="mt-2">
//                       <p className="text-sm text-green-600">Selected: {videoFile.name}</p>
//                       <button
//                         type="button"
//                         onClick={() => setVideoFile(null)}
//                         className="text-red-500 text-sm hover:text-red-700"
//                       >
//                         Remove video
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 {!videoFile && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Or Product Video URL (Optional)</label>
//                     <input
//                       type="url"
//                       name="video"
//                       value={formData.video}
//                       onChange={handleInputChange}
//                       placeholder="https://example.com/video.mp4"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     <p className="text-xs text-gray-500 mt-1">
//                       You can either upload a video file above or provide a video URL here
//                     </p>
//                   </div>
//                 )}

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Audio Sample URL (Optional)</label>
//                   <input
//                     type="url"
//                     name="audio"
//                     value={formData.audio}
//                     onChange={handleInputChange}
//                     placeholder="https://example.com/audio.mp3"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>

//               <div className="flex items-center space-x-4">
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     name="inStock"
//                     checked={formData.inStock}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                   />
//                   <span className="ml-2 text-sm font-medium text-gray-700">Product In Stock</span>
//                 </label>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
//                   <input
//                     type="number"
//                     name="rating"
//                     value={formData.rating}
//                     onChange={handleInputChange}
//                     min="0"
//                     max="5"
//                     step="0.1"
//                     className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Review Count</label>
//                   <input
//                     type="number"
//                     name="reviewCount"
//                     value={formData.reviewCount}
//                     onChange={handleInputChange}
//                     min="0"
//                     className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               <div className="bg-blue-50 p-4 rounded-md">
//                 <h3 className="text-lg font-medium text-blue-800 mb-2">SEO Preview</h3>
//                 <div className="space-y-2">
//                   <p className="text-blue-700 font-medium">
//                     {formData.seoTitle || `${formData.name} - Authentic Himalayan Singing Bowl | OMSound Nepal`}
//                   </p>
//                   <p className="text-gray-600 text-sm">
//                     {formData.seoDescription || `${formData.description.substring(0, 150)}...`}
//                   </p>
//                   <p className="text-gray-500 text-xs">URL: https://omsoundnepal.com/product/{formData.id}</p>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">SEO Title</label>
//                 <input
//                   type="text"
//                   name="seoTitle"
//                   value={formData.seoTitle}
//                   onChange={handleInputChange}
//                   placeholder="Auto-generated if empty"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">
//                   Recommended length: 50-60 characters ({formData.seoTitle.length}/60)
//                 </p>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">SEO Description</label>
//                 <textarea
//                   name="seoDescription"
//                   value={formData.seoDescription}
//                   onChange={handleInputChange}
//                   rows={3}
//                   placeholder="Auto-generated if empty"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">
//                   Recommended length: 150-160 characters ({formData.seoDescription.length}/160)
//                 </p>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">SEO Keywords</label>
//                 <textarea
//                   name="seoKeywords"
//                   value={formData.seoKeywords}
//                   onChange={handleInputChange}
//                   rows={3}
//                   placeholder="Comma-separated keywords"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <div className="mt-2">
//                   <p className="text-xs text-gray-500 mb-1">Suggested keywords:</p>
//                   <div className="flex flex-wrap gap-1">
//                     {generateSEOSuggestions().map((keyword, index) => (
//                       <button
//                         key={index}
//                         type="button"
//                         onClick={() => {
//                           const currentKeywords = formData.seoKeywords
//                           const newKeywords = currentKeywords ? `${currentKeywords}, ${keyword}` : keyword
//                           setFormData((prev) => ({ ...prev, seoKeywords: newKeywords }))
//                         }}
//                         className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200"
//                       >
//                         + {keyword}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {uploadProgress > 0 && uploadProgress < 100 && (
//             <div className="mt-4">
//               <div className="w-full bg-gray-200 rounded-full h-2.5">
//                 <div
//                   className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
//                   style={{ width: `${uploadProgress}%` }}
//                 ></div>
//               </div>
//               <p className="text-xs text-gray-500 mt-1">Processing: {uploadProgress}%</p>
//             </div>
//           )}

//           <div className="flex justify-between pt-6 border-t border-gray-200 mt-6">
//             <button
//               type="button"
//               onClick={onCancel}
//               className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <div className="flex space-x-2">
//               {activeTab === "product" && (
//                 <button
//                   type="button"
//                   onClick={() => setActiveTab("seo")}
//                   className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//                 >
//                   Continue to SEO
//                 </button>
//               )}
//               {activeTab === "seo" && (
//                 <button
//                   type="button"
//                   onClick={() => setActiveTab("product")}
//                   className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//                 >
//                   Back to Product
//                 </button>
//               )}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
//               >
//                 {loading ? "Processing..." : product ? "Update Product" : "Create Product"}
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default ProductForm




"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, Upload, Trash2, Plus } from "lucide-react"
import type { Product } from "../../context/ProductContext"

interface ProductFormProps {
  product?: Product | null
  onSubmit: (formData: FormData) => Promise<void>
  onCancel: () => void
  loading?: boolean
}

interface BowlSetItem {
  code: string
  size: string
  weight: number
  musicalNote: string
  inStock: boolean
}

interface FormState {
  id: string
  name: string
  price: number
  weight: number
  size: string
  tone: string
  type: string
  musicalNote: string
  bowlCode: string
  brand: string
  category: string
  soundInstrument: string
  description: string
  details: string[]
  careInstructions: string[]
  inStock: boolean
  rating: number
  reviewCount: number
  seoKeywords: string
  seoTitle: string
  seoDescription: string
  video: string
  audio: string
  isSet: boolean
  setItems: BowlSetItem[]
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onCancel, loading = false }) => {
  const [activeTab, setActiveTab] = useState<"product" | "seo">("product")
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [existingImages, setExistingImages] = useState<string[]>([])
  const [uploadProgress, setUploadProgress] = useState(0)
  const [formData, setFormData] = useState<FormState>({
    id: "",
    name: "",
    price: 0,
    weight: 0,
    size: "",
    tone: "",
    type: "",
    musicalNote: "",
    bowlCode: "",
    brand: "OMSound Nepal",
    category: "",
    soundInstrument: "",
    description: "",
    details: [""],
    careInstructions: [""],
    inStock: true,
    rating: 0,
    reviewCount: 0,
    seoKeywords: "",
    seoTitle: "",
    seoDescription: "",
    video: "",
    audio: "",
    isSet: false,
    setItems: [],
  })

  useEffect(() => {
    if (product) {
      const productSetItems = (product as any)?.setItems || []
      const parsedSetItems = Array.isArray(productSetItems) 
        ? productSetItems.map((item: any) => ({
            code: item.code || "",
            size: item.size || "",
            weight: item.weight || 0,
            musicalNote: item.musicalNote || "",
            inStock: item.inStock !== undefined ? item.inStock : true,
          }))
        : []
      
      setFormData({
        id: product.id || "",
        name: product.name || "",
        price: product.price || 0,
        weight: product.weight || 0,
        size: product.size || "",
        tone: product.tone || "",
        type: product.type || "",
        musicalNote: product.musicalNote || "",
        bowlCode: (product as any).bowlCode || "",
        brand: product.brand || "OMSound Nepal",
        category: product.category || "",
        soundInstrument: product.soundInstrument || "",
        description: product.description || "",
        details: product.details?.length ? product.details : [""],
        careInstructions: product.careInstructions?.length ? product.careInstructions : [""],
        inStock: product.inStock ?? true,
        rating: product.rating || 0,
        reviewCount: product.reviewCount || 0,
        seoKeywords: product.seoKeywords || "",
        seoTitle: product.seoTitle || "",
        seoDescription: product.seoDescription || "",
        video: product.video || "",
        audio: product.audio || "",
        isSet: (product as any)?.isSet || false,
        setItems: parsedSetItems,
      })
      setExistingImages(product.images || [])
      setVideoFile(null)
    } else {
      setFormData((prev) => ({
        ...prev,
        id: `bowl-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      }))
    }
  }, [product])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number"
            ? Number.parseFloat(value) || 0
            : value,
    }))
  }

  const handleArrayChange = (field: "details" | "careInstructions", index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }))
  }

  const addArrayItem = (field: "details" | "careInstructions") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }))
  }

  const removeArrayItem = (field: "details" | "careInstructions", index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const validFiles = files.filter((file) => {
      const isValidType = ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(file.type)
      const isValidSize = file.size <= 10 * 1024 * 1024
      return isValidType && isValidSize
    })

    setImageFiles((prev) => [...prev, ...validFiles])
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.size <= 100 * 1024 * 1024) {
      setVideoFile(file)
      setFormData((prev) => ({ ...prev, video: "" }))
    } else if (file) {
      alert("Video file is too large. Maximum size is 100MB.")
    }
  }

  const removeImage = (index: number, isExisting = false) => {
    if (isExisting) {
      setExistingImages((prev) => prev.filter((_, i) => i !== index))
    } else {
      setImageFiles((prev) => prev.filter((_, i) => i !== index))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log("=== FORM SUBMIT START ===")
    console.log("Form data state:", formData)
    console.log("Image files:", imageFiles)
    console.log("Video file:", videoFile)
    console.log("Existing images:", existingImages)

    if (
      !formData.name ||
      !formData.price ||
      !formData.category ||
      !formData.description
    ) {
      alert("Please fill all required fields")
      return
    }

    if (!formData.isSet) {
      // UPDATED: Musical Note is now optional - removed from validation
      if (!formData.size || !formData.weight || !formData.tone || !formData.type || !formData.bowlCode) {
        alert("Please complete all required single bowl details (Size, Weight, Tone, Type, Bowl Code)")
        return
      }
      
      if (imageFiles.length === 0 && existingImages.length === 0) {
        alert("Please upload at least one image for the product")
        return
      }
    } else {
      if (imageFiles.length === 0 && existingImages.length === 0) {
        alert("Please upload at least one image for the bowl set")
        return
      }
    }

    try {
      setUploadProgress(10)

      const submitData = new FormData()

      submitData.append("id", formData.id.trim())
      submitData.append("name", formData.name.trim())
      submitData.append("price", formData.price.toString())
      submitData.append("brand", formData.brand.trim())
      submitData.append("category", formData.category.trim())
      submitData.append("soundInstrument", formData.soundInstrument.trim())
      submitData.append("description", formData.description.trim())
      submitData.append("inStock", formData.inStock.toString())
      submitData.append("rating", formData.rating.toString())
      submitData.append("reviewCount", formData.reviewCount.toString())
      submitData.append("seoKeywords", formData.seoKeywords.trim())
      submitData.append("seoTitle", formData.seoTitle.trim())
      submitData.append("seoDescription", formData.seoDescription.trim())
      submitData.append("audio", formData.audio.trim())
      submitData.append("isSet", formData.isSet.toString())

      if (!formData.isSet) {
        submitData.append("size", formData.size.trim())
        submitData.append("weight", formData.weight.toString())
        submitData.append("tone", formData.tone.trim())
        submitData.append("type", formData.type.trim())
        submitData.append("musicalNote", formData.musicalNote.trim()) // Optional - can be empty string
        submitData.append("bowlCode", formData.bowlCode.trim())
      } else {
        submitData.append("size", "Various")
        submitData.append("weight", "0")
        submitData.append("tone", "Full Range")
        submitData.append("type", "Therapeutic Set")
        submitData.append("musicalNote", "Multiple Notes")
        submitData.append("bowlCode", "N/A")
      }

      setUploadProgress(30)

      if (formData.isSet) {
        const setItemsForJson = formData.setItems.map((item) => ({
          code: item.code,
          size: item.size,
          weight: item.weight,
          musicalNote: item.musicalNote,
          inStock: item.inStock,
        }))
        submitData.append("setItems", JSON.stringify(setItemsForJson))
      }

      const filteredDetails = formData.details.filter((item) => item.trim() !== "")
      if (filteredDetails.length > 0) {
        filteredDetails.forEach((detail) => {
          submitData.append("details", detail.trim())
        })
      } else {
        submitData.append("details", "Handcrafted singing bowl")
      }

      const filteredInstructions = formData.careInstructions.filter((item) => item.trim() !== "")
      if (filteredInstructions.length > 0) {
        filteredInstructions.forEach((instruction) => {
          submitData.append("careInstructions", instruction.trim())
        })
      } else {
        submitData.append("careInstructions", "Clean with soft cloth")
      }

      if (existingImages.length > 0) {
        existingImages.forEach((image) => {
          submitData.append("existingImages", image)
        })
      }

      setUploadProgress(50)

      if (imageFiles.length > 0) {
        imageFiles.forEach((file) => {
          submitData.append("images", file)
        })
      }

      setUploadProgress(70)

      if (videoFile) {
        submitData.append("video", videoFile)
        console.log("Appending video file:", videoFile.name)
      } else if (formData.video && formData.video.trim() !== "") {
        submitData.append("video", formData.video.trim())
        console.log("Appending video URL:", formData.video)
      }

      setUploadProgress(90)

      console.log("FormData contents:")
      for (const [key, value] of submitData.entries()) {
        if (value instanceof File) {
          console.log(key, `File: ${value.name} (${value.type}, ${value.size} bytes)`)
        } else {
          console.log(key, value)
        }
      }

      await onSubmit(submitData)

      setUploadProgress(100)

      setImageFiles([])
      setVideoFile(null)
      setExistingImages([])
      setUploadProgress(0)

      console.log("=== FORM SUBMIT SUCCESS ===")
    } catch (error) {
      setUploadProgress(0)
      console.error("Form submission error:", error)
      console.log("=== FORM SUBMIT ERROR ===")
    }
  }

  const generateSEOSuggestions = () => {
    if (!formData.name) return []

    const suggestions = [
      `${formData.name.toLowerCase()}`,
      `${formData.name.toLowerCase()} singing bowl`,
      `buy ${formData.name.toLowerCase()}`,
      "himalayan singing bowl",
      "sound healing bowl",
      "meditation bowl",
      "tibetan bowl",
      "nepal singing bowl",
    ]

    if (formData.size) suggestions.push(`${formData.size.toLowerCase()} singing bowl`)
    if (formData.tone) suggestions.push(`${formData.tone.toLowerCase()} tone bowl`)

    return suggestions
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">{product ? "Edit Product" : "Add New Product"}</h2>
            <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>

          <div className="flex border-b border-gray-200 mt-4">
            <button
              onClick={() => setActiveTab("product")}
              className={`px-4 py-2 font-medium ${
                activeTab === "product" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
              }`}
            >
              Product Details
            </button>
            <button
              onClick={() => setActiveTab("seo")}
              className={`px-4 py-2 font-medium ${
                activeTab === "seo" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
              }`}
            >
              SEO & Marketing
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {activeTab === "product" ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product ID *</label>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., bowl-himalayan-harmony-001"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Unique identifier for this product (used in URLs and database)
                </p>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <input
                  type="checkbox"
                  checked={formData.isSet}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, isSet: e.target.checked }))
                  }
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium">
                  This product is a Singing Bowl Set
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Category</option>
                    <option value="Traditional">Traditional</option>
                    <option value="Premium">Premium</option>
                    <option value="Professional">Professional</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sound Instrument *</label>
                  <select
                    name="soundInstrument"
                    value={formData.soundInstrument}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Instrument</option>
                    <option value="Singing Bowl">Singing Bowls</option>
                    <option value="Tingsha">Tingsha</option>
                    <option value="Gong">Gong</option>
                  </select>
                </div>

                {!formData.isSet && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Size *</label>
                      <select
                        name="size"
                        value={formData.size}
                        onChange={handleInputChange}
                        required={!formData.isSet}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Size</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                        <option value="Various">Various</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg) *</label>
                      <input
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleInputChange}
                        required={!formData.isSet}
                        min="0"
                        step="0.01"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Weight in kilograms"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tone *</label>
                      <select
                        name="tone"
                        value={formData.tone}
                        onChange={handleInputChange}
                        required={!formData.isSet}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Tone</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Full Range">Full Range</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        required={!formData.isSet}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Type</option>
                        <option value="Therapeutic">Therapeutic</option>
                        <option value="Decorative">Decorative</option>
                        <option value="Sound Bath">Sound Bath</option>
                      </select>
                    </div>

                    {/* UPDATED: Musical Note - Optional field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Musical Note (Optional)</label>
                      <input
                        type="text"
                        name="musicalNote"
                        value={formData.musicalNote}
                        onChange={handleInputChange}
                        placeholder="e.g., F4, C3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bowl Code *</label>
                      <input
                        type="text"
                        name="bowlCode"
                        value={formData.bowlCode}
                        onChange={handleInputChange}
                        required={!formData.isSet}
                        placeholder="e.g., SB-001, HB-2024"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">Unique code for this singing bowl (e.g., SB-001, HB-2024)</p>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Detailed product description..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Details</label>
                  {formData.details.map((detail, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={detail}
                        onChange={(e) => handleArrayChange("details", index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Product specification"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem("details", index)}
                        className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem("details")}
                    className="flex items-center px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                  >
                    <Plus size={16} className="mr-1" />
                    Add Detail
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Care Instructions</label>
                  {formData.careInstructions.map((instruction, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={instruction}
                        onChange={(e) => handleArrayChange("careInstructions", index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Care instruction"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem("careInstructions", index)}
                        className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem("careInstructions")}
                    className="flex items-center px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                  >
                    <Plus size={16} className="mr-1" />
                    Add Instruction
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Product Images</h3>
                
                {formData.isSet && (
                  <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded border border-blue-200 mb-2">
                    <strong>Note:</strong> For bowl sets, upload main product images here. These images will represent the entire set.
                  </div>
                )}

                {existingImages.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Product Images</label>
                    <div className="flex flex-wrap gap-2">
                      {existingImages.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image || "/placeholder.svg?height=80&width=80"}
                            alt={`Existing ${index}`}
                            className="h-20 w-20 object-cover rounded border"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index, true)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Product Images *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop images</p>
                    <input
                      type="file"
                      multiple
                      accept="image/jpeg,image/png,image/gif,image/webp"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="mt-2 inline-block px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600"
                    >
                      Choose Images
                    </label>
                  </div>

                  {imageFiles.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">New Product Images:</p>
                      <div className="flex flex-wrap gap-2">
                        {imageFiles.map((file, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(file) || "/placeholder.svg"}
                              alt={`New ${index}`}
                              className="h-20 w-20 object-cover rounded border"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index, false)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Product Video (Optional)</label>
                  <input
                    type="file"
                    accept="video/mp4,video/webm,video/ogg,video/quicktime"
                    onChange={handleVideoUpload}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {videoFile && (
                    <div className="mt-2">
                      <p className="text-sm text-green-600">Selected: {videoFile.name}</p>
                      <button
                        type="button"
                        onClick={() => setVideoFile(null)}
                        className="text-red-500 text-sm hover:text-red-700"
                      >
                        Remove video
                      </button>
                    </div>
                  )}
                </div>

                {!videoFile && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Or Product Video URL (Optional)</label>
                    <input
                      type="url"
                      name="video"
                      value={formData.video}
                      onChange={handleInputChange}
                      placeholder="https://example.com/video.mp4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      You can either upload a video file above or provide a video URL here
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Audio Sample URL (Optional)</label>
                  <input
                    type="url"
                    name="audio"
                    value={formData.audio}
                    onChange={handleInputChange}
                    placeholder="https://example.com/audio.mp3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">Product In Stock</span>
                </label>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    min="0"
                    max="5"
                    step="0.1"
                    className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Review Count</label>
                  <input
                    type="number"
                    name="reviewCount"
                    value={formData.reviewCount}
                    onChange={handleInputChange}
                    min="0"
                    className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="text-lg font-medium text-blue-800 mb-2">SEO Preview</h3>
                <div className="space-y-2">
                  <p className="text-blue-700 font-medium">
                    {formData.seoTitle || `${formData.name} - Authentic Himalayan Singing Bowl | OMSound Nepal`}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {formData.seoDescription || `${formData.description.substring(0, 150)}...`}
                  </p>
                  <p className="text-gray-500 text-xs">URL: https://omsoundnepal.com/product/{formData.id}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SEO Title</label>
                <input
                  type="text"
                  name="seoTitle"
                  value={formData.seoTitle}
                  onChange={handleInputChange}
                  placeholder="Auto-generated if empty"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Recommended length: 50-60 characters ({formData.seoTitle.length}/60)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SEO Description</label>
                <textarea
                  name="seoDescription"
                  value={formData.seoDescription}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Auto-generated if empty"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Recommended length: 150-160 characters ({formData.seoDescription.length}/160)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SEO Keywords</label>
                <textarea
                  name="seoKeywords"
                  value={formData.seoKeywords}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Comma-separated keywords"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="mt-2">
                  <p className="text-xs text-gray-500 mb-1">Suggested keywords:</p>
                  <div className="flex flex-wrap gap-1">
                    {generateSEOSuggestions().map((keyword, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          const currentKeywords = formData.seoKeywords
                          const newKeywords = currentKeywords ? `${currentKeywords}, ${keyword}` : keyword
                          setFormData((prev) => ({ ...prev, seoKeywords: newKeywords }))
                        }}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200"
                      >
                        + {keyword}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Processing: {uploadProgress}%</p>
            </div>
          )}

          <div className="flex justify-between pt-6 border-t border-gray-200 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <div className="flex space-x-2">
              {activeTab === "product" && (
                <button
                  type="button"
                  onClick={() => setActiveTab("seo")}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Continue to SEO
                </button>
              )}
              {activeTab === "seo" && (
                <button
                  type="button"
                  onClick={() => setActiveTab("product")}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Back to Product
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Processing..." : product ? "Update Product" : "Create Product"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductForm