// import type React from "react"
// import { useState, useEffect } from "react"
// import { useParams, Link, useNavigate } from "react-router-dom"
// import { ShoppingCart, Minus, Plus, ArrowLeft, Star } from "lucide-react"
// import SEOHelmet from "../components/seo/SEOHelmet"
// import { getProductSEO } from "../data/seoData"
// import { useCart } from "../context/CartContext"
// import { useAuth } from "../context/AuthContext"
// import { productService, type Product } from "../services/product.service"
// import ProductImageGallery from "../components/product/ProductImageGallery"
// import ProductReviews from "../components/product/ProductReviews"
// import ProductCard from "../components/shop/ProductCard"
// import LoginModal from "../components/auth/LoginModal"
// import AnimatedSection from "../components/utils/AnimatedSection"

// // Error boundary component
// const ErrorBoundary = ({ children, fallback }: { children: React.ReactNode; fallback: React.ReactNode }) => {
//   try {
//     return <>{children}</>
//   } catch (error) {
//     console.error("ProductPage Error:", error)
//     return <>{fallback}</>
//   }
// }

// // Loading component
// const LoadingSpinner = () => (
//   <div className="min-h-screen pt-24 bg-ivory flex items-center justify-center">
//     <div className="text-center">
//       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
//       <p className="text-charcoal">Loading product...</p>
//     </div>
//   </div>
// )

// // Error component
// const ErrorDisplay = ({ message, onRetry }: { message: string; onRetry?: () => void }) => (
//   <div className="min-h-screen pt-24 bg-ivory">
//     <div className="container-custom py-16 text-center">
//       <h2 className="text-2xl font-serif text-charcoal mb-4">Something went wrong</h2>
//       <p className="mb-8 text-charcoal/80">{message}</p>
//       <div className="flex gap-4 justify-center">
//         {onRetry && (
//           <button onClick={onRetry} className="btn-primary">
//             Try Again
//           </button>
//         )}
//         <Link to="/shop" className="btn-secondary">
//           Return to Shop
//         </Link>
//       </div>
//     </div>
//   </div>
// )

// // Product not found component
// const ProductNotFound = () => (
//   <div className="min-h-screen pt-24 bg-ivory">
//     <SEOHelmet
//       title="Product Not Found | OMSound Nepal"
//       description="The product you're looking for doesn't exist or has been removed."
//       noindex={true}
//       keywords=""
//     />
//     <div className="container-custom py-16 text-center">
//       <h2 className="text-2xl font-serif text-charcoal mb-4">Product Not Found</h2>
//       <p className="mb-8 text-charcoal/80">The product you're looking for doesn't exist or has been removed.</p>
//       <Link to="/shop" className="btn-primary">
//         Return to Shop
//       </Link>
//     </div>
//   </div>
// )

// const ProductPage = () => {
//   const { id } = useParams<{ id: string }>()
//   const navigate = useNavigate()
//   const [quantity, setQuantity] = useState(1)
//   const [activeTab, setActiveTab] = useState<"details" | "reviews">("details")
//   const [showLoginModal, setShowLoginModal] = useState(false)
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [product, setProduct] = useState<Product | null>(null)
//   const [relatedProducts, setRelatedProducts] = useState<Product[]>([])

//   const { addToCart } = useCart()
//   const { user } = useAuth()

//   // Fetch product data
//   useEffect(() => {
//     const fetchProduct = async () => {
//       if (!id) {
//         setError("Product ID is required")
//         setIsLoading(false)
//         return
//       }

//       try {
//         setIsLoading(true)
//         setError(null)

//         const productData = await productService.getProductById(id)
//         setProduct(productData)

//         const allProducts = await productService.getProductsForShop()
//         let related = allProducts
//           .filter((p) => p.category === productData.category && p.id !== productData.id)
//           .slice(0, 4)

//         if (related.length < 4) {
//           const additional = allProducts
//             .filter((p) => p.id !== productData.id && !related.some((rp) => rp.id === p.id))
//             .slice(0, 4 - related.length)
//           related = [...related, ...additional]
//         }

//         setRelatedProducts(related)
//       } catch (err) {
//         console.error("Error fetching product:", err)
//         const errorMessage = err instanceof Error ? err.message : "Failed to load product"
//         setError(errorMessage)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchProduct()
//     window.scrollTo(0, 0)
//   }, [id])

//   const getSafeSEO = () => {
//     try {
//       if (!product) {
//         return {
//           title: "Product Not Found | OMSound Nepal",
//           description: "The product you're looking for doesn't exist.",
//           keywords: "",
//           image: "",
//           type: "website" as const,
//           structuredData: undefined,
//         }
//       }
//       return getProductSEO(product.name, product.description, product.price, product.images?.[0] || "")
//     } catch (err) {
//       console.error("SEO generation error:", err)
//       return {
//         title: "OMSound Nepal",
//         description: "Authentic Tibetan singing bowls and sound healing instruments",
//         keywords: "",
//         image: "",
//         type: "website" as const,
//         structuredData: undefined,
//       }
//     }
//   }

//   const seo = getSafeSEO()

//   const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))
//   const increaseQuantity = () => setQuantity((prev) => prev + 1)

//   const handleAddToCart = () => {
//     if (!user) return setShowLoginModal(true)
//     if (!product) return setError("Product data is not available")

//     const productForCart = {
//       ...product,
//       image: product.images?.[0] || "",
//     }
//     addToCart(productForCart, quantity)
//   }

//   const handleBuyNow = () => {
//     if (!user) return setShowLoginModal(true)
//     if (!product) return setError("Product data is not available")

//     const productForCart = {
//       ...product,
//       image: product.images?.[0] || "",
//     }
//     addToCart(productForCart, quantity)
//     navigate("/cart")
//   }

//   const handleLoginSuccess = () => {
//     if (!product) return setError("Product data is not available after login")
//     const productForCart = {
//       ...product,
//       image: product.images?.[0] || "",
//     }
//     addToCart(productForCart, quantity)
//   }

//   const renderStars = (rating: number) => {
//     const safeRating = typeof rating === "number" && !isNaN(rating) ? rating : 0
//     return Array.from({ length: 5 }, (_, index) => (
//       <Star
//         key={index}
//         size={16}
//         className={`${
//           index < Math.floor(safeRating)
//             ? "text-gold fill-gold"
//             : index < safeRating
//             ? "text-gold fill-gold opacity-50"
//             : "text-gold/30"
//         }`}
//       />
//     ))
//   }

//   const retryLoad = () => {
//     setError(null)
//     setIsLoading(true)
//     window.location.reload()
//   }

//   if (isLoading) return <LoadingSpinner />
//   if (error && !product) return <ErrorDisplay message={error} onRetry={retryLoad} />
//   if (!product) return <ProductNotFound />

//   return (
//     <ErrorBoundary
//       fallback={<ErrorDisplay message="An unexpected error occurred while displaying the product." onRetry={retryLoad} />}
//     >
//       <div className="min-h-screen pt-24 bg-navy">
//         <SEOHelmet
//           title={seo.title}
//           description={seo.description}
//           keywords={seo.keywords || ""}
//           image={seo.image || ""}
//           type={seo.type}
//           structuredData={seo.structuredData}
//           url={`https://omsoundnepal.com/product/${product.id}`}
//         />

//         {error && (
//           <div className="bg-red-500 text-white p-4 text-center">
//             <p>{error}</p>
//             <button onClick={() => setError(null)} className="ml-4 underline hover:no-underline">
//               Dismiss
//             </button>
//           </div>
//         )}

//         <div className="container-custom py-16">
//           <Link to="/shop" className="inline-flex items-center text-gold hover:text-gold/80 transition-colors mb-6">
//             <ArrowLeft size={16} className="mr-1" />
//             Back to Shop
//           </Link>

//           <div className="bg-navy/50 rounded-lg overflow-hidden shadow-lg mb-16">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
//               <div>
//                 <ErrorBoundary
//                   fallback={<div className="bg-gray-200 h-96 rounded flex items-center justify-center">Image unavailable</div>}
//                 >
//                   <ProductImageGallery images={product.images || []} video={product.video} audio={product.audio} productName={product.name} />
//                 </ErrorBoundary>
//               </div>

//               <div>
//                 <AnimatedSection>
//                   <div className="mb-4">
//                     <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">
//                       {product.category || "Uncategorized"}
//                     </span>
//                   </div>

//                   <h1 className="font-serif text-3xl lg:text-4xl text-gold mb-4">{product.name}</h1>

//                   <div className="flex items-center gap-3 mb-4">
//                     <div className="flex items-center">{renderStars(product.rating || 0)}</div>
//                     <span className="text-ivory/70">
//                       {(product.rating || 0).toFixed(1)} ({product.reviewCount || 0} reviews)
//                     </span>
//                   </div>

//                   <div className="mb-6">
//                     <span className="text-3xl font-serif text-ivory">${product.price}</span>
//                   </div>

//                   <div className="flex flex-wrap gap-2 mb-6">
//                     {product.size && <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">{product.size}</span>}
//                     {product.tone && <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">{product.tone} Tone</span>}
//                     {product.musicalNote && <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">{product.musicalNote}</span>}
//                     {product.type && <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">{product.type}</span>}
//                   </div>

//                   <p className="text-ivory/80 mb-8 text-lg leading-relaxed">{product.description}</p>

//                   {product.inStock ? (
//                     <>
//                       <div className="flex items-center mb-6">
//                         <span className="text-ivory mr-4">Quantity:</span>
//                         <div className="flex items-center">
//                           <button onClick={decreaseQuantity} className="p-2 bg-charcoal text-ivory rounded-l-md hover:bg-charcoal/80 transition-colors" disabled={quantity <= 1}>
//                             <Minus size={16} />
//                           </button>
//                           <div className="w-16 bg-navy text-ivory py-2 text-center font-medium border-t border-b border-charcoal/20">{quantity}</div>
//                           <button onClick={increaseQuantity} className="p-2 bg-charcoal text-ivory rounded-r-md hover:bg-charcoal/80 transition-colors">
//                             <Plus size={16} />
//                           </button>
//                         </div>
//                       </div>

//                       <div className="flex flex-col sm:flex-row gap-4 mb-6">
//                         <button onClick={handleAddToCart} className="flex-1 btn-primary flex items-center justify-center" disabled={!product.inStock}>
//                           <ShoppingCart size={18} className="mr-2" />
//                           Add to Cart
//                         </button>
//                         <button onClick={handleBuyNow} className="flex-1 bg-gold text-charcoal py-3 px-6 rounded-md font-medium hover:bg-opacity-90 transition-colors" disabled={!product.inStock}>
//                           Buy Now
//                         </button>
//                       </div>
//                     </>
//                   ) : (
//                     <div className="mb-6">
//                       <div className="bg-charcoal/50 text-ivory/70 py-3 px-4 rounded text-center mb-4">Currently Out of Stock</div>
//                       <p className="text-ivory/60 text-sm">Sign up for notifications when this product is back in stock.</p>
//                     </div>
//                   )}

//                   <div className="flex items-center justify-center py-3 px-4 bg-navy/30 rounded-md text-sm text-ivory/70">
//                     <span>Free worldwide shipping on orders over $100</span>
//                   </div>
//                 </AnimatedSection>
//               </div>
//             </div>
//           </div>

//           <div className="mb-16">
//             <div className="flex border-b border-gold/20 mb-8">
//               <button
//                 onClick={() => setActiveTab("details")}
//                 className={`px-6 py-3 font-medium transition-colors ${
//                   activeTab === "details" ? "text-gold border-b-2 border-gold" : "text-ivory/70 hover:text-ivory"
//                 }`}
//               >
//                 Product Details
//               </button>
//               <button
//                 onClick={() => setActiveTab("reviews")}
//                 className={`px-6 py-3 font-medium transition-colors ${
//                   activeTab === "reviews" ? "text-gold border-b-2 border-gold" : "text-ivory/70 hover:text-ivory"
//                 }`}
//               >
//                 Reviews ({product.reviewCount || 0})
//               </button>
//             </div>

//             {activeTab === "details" ? (
//               <AnimatedSection>
//                 <div className="bg-navy/30 rounded-lg p-8">
//                   <h3 className="font-serif text-2xl text-ivory mb-6">Product Specifications</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                     <div>
//                       <h4 className="font-serif text-lg text-gold mb-4">Details</h4>
//                       <ul className="space-y-3 text-ivory/80">
//                         {product.details?.map((detail, index) => (
//                           <li key={index} className="flex items-baseline">
//                             <span className="text-gold mr-3">•</span>
//                             <span>{detail}</span>
//                           </li>
//                         )) || <li className="text-ivory/60">No details available</li>}
//                       </ul>
//                     </div>
//                     <div>
//                       <h4 className="font-serif text-lg text-gold mb-4">Care Instructions</h4>
//                       <ul className="space-y-3 text-ivory/80">
//                         {product.careInstructions?.map((instruction, index) => (
//                           <li key={index} className="flex items-baseline">
//                             <span className="text-gold mr-3">•</span>
//                             <span>{instruction}</span>
//                           </li>
//                         )) || (
//                           <>
//                             <li className="flex items-baseline">
//                               <span className="text-gold mr-3">•</span>
//                               <span>Clean with a soft, dry cloth after use</span>
//                             </li>
//                             <li className="flex items-baseline">
//                               <span className="text-gold mr-3">•</span>
//                               <span>Store on provided cushion in a dry place</span>
//                             </li>
//                             <li className="flex items-baseline">
//                               <span className="text-gold mr-3">•</span>
//                               <span>Avoid extreme temperatures and humidity</span>
//                             </li>
//                             <li className="flex items-baseline">
//                               <span className="text-gold mr-3">•</span>
//                               <span>Use lemon juice sparingly to remove tarnish</span>
//                             </li>
//                           </>
//                         )}
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </AnimatedSection>
//             ) : (
//               <ErrorBoundary fallback={<div className="text-ivory/60 text-center py-8">Reviews unavailable</div>}>
//                 <ProductReviews
//                   productId={product.id}               // required
//                   productName={product.name}           // required
//                   productImage={product.images?.[0]}   // optional
//                 />
//               </ErrorBoundary>
//             )}
//           </div>

//           {relatedProducts.length > 0 && (
//             <div>
//               <h2 className="font-serif text-2xl text-gold mb-8">You May Also Like</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 {relatedProducts.map((relatedProduct, index) => (
//                   <AnimatedSection key={relatedProduct.id} delay={0.1 * index}>
//                     <ErrorBoundary fallback={<div className="bg-gray-200 h-64 rounded">Product unavailable</div>}>
//                       <ProductCard product={relatedProduct} />
//                     </ErrorBoundary>
//                   </AnimatedSection>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onSuccess={handleLoginSuccess} />
//       </div>
//     </ErrorBoundary>
//   )
// }

// export default ProductPage







//just new
// /Users/apekshagyawali/Downloads/OMSound/OMSound-main/Frontend/src/pages/ProductPage.tsx
// /Users/apekshagyawali/Downloads/OMSound/OMSound-main/Frontend/src/pages/ProductPage.tsx
// import type React from "react"
// import { useState, useEffect } from "react"
// import { useParams, Link, useNavigate } from "react-router-dom"
// import { ShoppingCart, Minus, Plus, ArrowLeft, Star, Package, X } from "lucide-react"
// import SEOHelmet from "../components/seo/SEOHelmet"
// import { getProductSEO } from "../data/seoData"
// import { useCart } from "../context/CartContext"
// import { useAuth } from "../context/AuthContext"
// import { productService, type Product, type BowlSetItem } from "../services/product.service"
// import ProductImageGallery from "../components/product/ProductImageGallery"
// import ProductReviews from "../components/product/ProductReviews"
// import ProductCard from "../components/shop/ProductCard"
// import LoginModal from "../components/auth/LoginModal"
// import AnimatedSection from "../components/utils/AnimatedSection"

// // Error boundary component
// const ErrorBoundary = ({ children, fallback }: { children: React.ReactNode; fallback: React.ReactNode }) => {
//   try {
//     return <>{children}</>
//   } catch (error) {
//     console.error("ProductPage Error:", error)
//     return <>{fallback}</>
//   }
// }

// // Loading component
// const LoadingSpinner = () => (
//   <div className="min-h-screen pt-24 bg-ivory flex items-center justify-center">
//     <div className="text-center">
//       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
//       <p className="text-charcoal">Loading product...</p>
//     </div>
//   </div>
// )

// // Error component
// const ErrorDisplay = ({ message, onRetry }: { message: string; onRetry?: () => void }) => (
//   <div className="min-h-screen pt-24 bg-ivory">
//     <div className="container-custom py-16 text-center">
//       <h2 className="text-2xl font-serif text-charcoal mb-4">Something went wrong</h2>
//       <p className="mb-8 text-charcoal/80">{message}</p>
//       <div className="flex gap-4 justify-center">
//         {onRetry && (
//           <button onClick={onRetry} className="btn-primary">
//             Try Again
//           </button>
//         )}
//         <Link to="/shop" className="btn-secondary">
//           Return to Shop
//         </Link>
//       </div>
//     </div>
//   </div>
// )

// // Product not found component
// const ProductNotFound = () => (
//   <div className="min-h-screen pt-24 bg-ivory">
//     <SEOHelmet
//       title="Product Not Found | OMSound Nepal"
//       description="The product you're looking for doesn't exist or has been removed."
//       noindex={true}
//       keywords=""
//     />
//     <div className="container-custom py-16 text-center">
//       <h2 className="text-2xl font-serif text-charcoal mb-4">Product Not Found</h2>
//       <p className="mb-8 text-charcoal/80">The product you're looking for doesn't exist or has been removed.</p>
//       <Link to="/shop" className="btn-primary">
//         Return to Shop
//       </Link>
//     </div>
//   </div>
// )

// // Full Screen Image Modal Component
// const ImageModal: React.FC<{
//   imageUrl: string
//   alt: string
//   isOpen: boolean
//   onClose: () => void
// }> = ({ imageUrl, alt, isOpen, onClose }) => {
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
    
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return (
//     <div 
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
//       onClick={onClose}
//     >
//       <div className="relative max-w-5xl max-h-[90vh] w-full">
//         <button
//           onClick={onClose}
//           className="absolute -top-12 right-0 text-white hover:text-gold transition-colors z-10 bg-black/50 rounded-full p-2"
//         >
//           <X size={28} />
//         </button>
//         <div className="relative w-full h-full">
//           <img
//             src={imageUrl}
//             alt={alt}
//             className="w-full h-full object-contain max-h-[80vh] rounded-lg"
//             onClick={(e) => e.stopPropagation()}
//           />
//           <div className="text-white text-center mt-4 text-lg font-medium">{alt}</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Bowl Set Display Component - FIXED VERSION
// const BowlSetDisplay: React.FC<{ setItems: BowlSetItem[] }> = ({ setItems }) => {
//   const [selectedImage, setSelectedImage] = useState<{url: string, alt: string} | null>(null);

//   if (!setItems || setItems.length === 0) return null;

//   const handleImageClick = (imageUrl: string, bowlCode: string, imgIndex: number) => {
//     setSelectedImage({
//       url: imageUrl,
//       alt: `Bowl ${bowlCode} - Image ${imgIndex + 1}`
//     });
//   };

//   return (
//     <>
//       <div className="mt-6 bg-navy/30 rounded-lg p-6">
//         <div className="flex items-center gap-2 mb-4">
//           <Package className="text-gold" size={20} />
//           <h3 className="font-serif text-xl text-ivory">This Set Includes:</h3>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {setItems.map((bowl, index) => (
//             <div key={index} className="bg-navy/50 rounded-lg p-4 border border-gold/20">
//               <div className="flex justify-between items-start mb-2">
//                 <h4 className="font-medium text-gold">Bowl {bowl.code}</h4>
//                 <span className={`text-xs px-2 py-1 rounded ${bowl.inStock ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
//                   {bowl.inStock ? 'In Stock' : 'Out of Stock'}
//                 </span>
//               </div>
              
//               <div className="space-y-2 mb-3">
//                 <div className="flex justify-between text-sm text-ivory/80">
//                   <span>Size:</span>
//                   <span className="text-gold">{bowl.size}</span>
//                 </div>
//                 <div className="flex justify-between text-sm text-ivory/80">
//                   <span>Weight:</span>
//                   <span className="text-gold">{bowl.weight} kg</span>
//                 </div>
//                 <div className="flex justify-between text-sm text-ivory/80">
//                   <span>Musical Note:</span>
//                   <span className="text-gold">{bowl.musicalNote}</span>
//                 </div>
//               </div>

//               {/* Bowl Images WITH HOVER FEATURE */}
//               {bowl.images && bowl.images.length > 0 && (
//                 <div className="mt-3">
//                   <p className="text-xs text-ivory/60 mb-2">Hover over images to enlarge</p>
//                   <div className="flex gap-2 overflow-x-auto">
//                     {bowl.images.slice(0, 3).map((image, imgIndex) => (
//                       <div 
//                         key={imgIndex} 
//                         className="flex-shrink-0 relative group"
//                       >
//                         <button
//                           onClick={() => handleImageClick(image, bowl.code, imgIndex)}
//                           className="relative"
//                         >
//                           <img
//                             src={image}
//                             alt={`Bowl ${bowl.code} image ${imgIndex + 1}`}
//                             className="h-16 w-16 rounded-md object-cover border border-gold/20 cursor-pointer hover:border-gold transition-colors"
//                           />
                          
//                           {/* Hover overlay */}
//                           <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
//                             <span className="text-xs text-white">Click to view full</span>
//                           </div>
//                         </button>
                        
//                         {/* Hover popup - Large image appears when hovering */}
//                         <div className="fixed invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 z-50 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-navy p-4 rounded-lg shadow-2xl border-2 border-gold/50">
//                           <img
//                             src={image}
//                             alt={`Bowl ${bowl.code} image ${imgIndex + 1} - enlarged`}
//                             className="w-full h-full object-contain"
//                           />
//                           <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-sm p-2 text-center rounded-b-lg">
//                             Bowl {bowl.code} - Image {imgIndex + 1}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
                  
//                   {/* Image counter */}
//                   {bowl.images.length > 3 && (
//                     <div className="text-xs text-ivory/60 mt-1">
//                       +{bowl.images.length - 3} more image{bowl.images.length - 3 > 1 ? 's' : ''}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
        
//         {/* Hover instruction */}
//         <div className="mt-4 pt-3 border-t border-gold/10 text-center">
//           <p className="text-sm text-gold italic">✨ Hover over any bowl image to see a large preview ✨</p>
//         </div>
//       </div>

//       {/* Full Screen Image Modal for click */}
//       {selectedImage && (
//         <ImageModal
//           imageUrl={selectedImage.url}
//           alt={selectedImage.alt}
//           isOpen={!!selectedImage}
//           onClose={() => setSelectedImage(null)}
//         />
//       )}
//     </>
//   );
// };

// const ProductPage = () => {
//   const { id } = useParams<{ id: string }>()
//   const navigate = useNavigate()
//   const [quantity, setQuantity] = useState(1)
//   const [activeTab, setActiveTab] = useState<"details" | "reviews">("details")
//   const [showLoginModal, setShowLoginModal] = useState(false)
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [product, setProduct] = useState<Product | null>(null)
//   const [relatedProducts, setRelatedProducts] = useState<Product[]>([])

//   const { addToCart } = useCart()
//   const { user } = useAuth()

//   // Fetch product data
//   useEffect(() => {
//     const fetchProduct = async () => {
//       if (!id) {
//         setError("Product ID is required")
//         setIsLoading(false)
//         return
//       }

//       try {
//         setIsLoading(true)
//         setError(null)

//         const productData = await productService.getProductById(id)
//         console.log("Product data:", productData)
//         setProduct(productData)

//         const allProducts = await productService.getProductsForShop()
//         let related = allProducts
//           .filter((p) => p.category === productData.category && p.id !== productData.id)
//           .slice(0, 4)

//         if (related.length < 4) {
//           const additional = allProducts
//             .filter((p) => p.id !== productData.id && !related.some((rp) => rp.id === p.id))
//             .slice(0, 4 - related.length)
//           related = [...related, ...additional]
//         }

//         setRelatedProducts(related)
//       } catch (err) {
//         console.error("Error fetching product:", err)
//         const errorMessage = err instanceof Error ? err.message : "Failed to load product"
//         setError(errorMessage)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchProduct()
//     window.scrollTo(0, 0)
//   }, [id])

//   const getSafeSEO = () => {
//     try {
//       if (!product) {
//         return {
//           title: "Product Not Found | OMSound Nepal",
//           description: "The product you're looking for doesn't exist.",
//           keywords: "",
//           image: "",
//           type: "website" as const,
//           structuredData: undefined,
//         }
//       }
//       return getProductSEO(product.name, product.description, product.price, product.images?.[0] || "")
//     } catch (err) {
//       console.error("SEO generation error:", err)
//       return {
//         title: "OMSound Nepal",
//         description: "Authentic Tibetan singing bowls and sound healing instruments",
//         keywords: "",
//         image: "",
//         type: "website" as const,
//         structuredData: undefined,
//       }
//     }
//   }

//   const seo = getSafeSEO()

//   const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))
//   const increaseQuantity = () => setQuantity((prev) => prev + 1)

//   const handleAddToCart = () => {
//     if (!user) return setShowLoginModal(true)
//     if (!product) return setError("Product data is not available")

//     const productForCart = {
//       ...product,
//       image: product.images?.[0] || "",
//     }
//     addToCart(productForCart, quantity)
//   }

//   const handleBuyNow = () => {
//     if (!user) return setShowLoginModal(true)
//     if (!product) return setError("Product data is not available")

//     const productForCart = {
//       ...product,
//       image: product.images?.[0] || "",
//     }
//     addToCart(productForCart, quantity)
//     navigate("/cart")
//   }

//   const handleLoginSuccess = () => {
//     if (!product) return setError("Product data is not available after login")
//     const productForCart = {
//       ...product,
//       image: product.images?.[0] || "",
//     }
//     addToCart(productForCart, quantity)
//   }

//   const renderStars = (rating: number) => {
//     const safeRating = typeof rating === "number" && !isNaN(rating) ? rating : 0
//     return Array.from({ length: 5 }, (_, index) => (
//       <Star
//         key={index}
//         size={16}
//         className={`${
//           index < Math.floor(safeRating)
//             ? "text-gold fill-gold"
//             : index < safeRating
//             ? "text-gold fill-gold opacity-50"
//             : "text-gold/30"
//         }`}
//       />
//     ))
//   }

//   const retryLoad = () => {
//     setError(null)
//     setIsLoading(true)
//     window.location.reload()
//   }

//   if (isLoading) return <LoadingSpinner />
//   if (error && !product) return <ErrorDisplay message={error} onRetry={retryLoad} />
//   if (!product) return <ProductNotFound />

//   return (
//     <ErrorBoundary
//       fallback={<ErrorDisplay message="An unexpected error occurred while displaying the product." onRetry={retryLoad} />}
//     >
//       <div className="min-h-screen pt-24 bg-navy">
//         <SEOHelmet
//           title={seo.title}
//           description={seo.description}
//           keywords={seo.keywords || ""}
//           image={seo.image || ""}
//           type={seo.type}
//           structuredData={seo.structuredData}
//           url={`https://omsoundnepal.com/product/${product.id}`}
//         />

//         {error && (
//           <div className="bg-red-500 text-white p-4 text-center">
//             <p>{error}</p>
//             <button onClick={() => setError(null)} className="ml-4 underline hover:no-underline">
//               Dismiss
//             </button>
//           </div>
//         )}

//         <div className="container-custom py-16">
//           <Link to="/shop" className="inline-flex items-center text-gold hover:text-gold/80 transition-colors mb-6">
//             <ArrowLeft size={16} className="mr-1" />
//             Back to Shop
//           </Link>

//           <div className="bg-navy/50 rounded-lg overflow-hidden shadow-lg mb-16">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
//               <div>
//                 <ErrorBoundary
//                   fallback={<div className="bg-gray-200 h-96 rounded flex items-center justify-center">Image unavailable</div>}
//                 >
//                   <ProductImageGallery images={product.images || []} video={product.video} audio={product.audio} productName={product.name} />
//                 </ErrorBoundary>
//               </div>

//               <div>
//                 <AnimatedSection>
//                   <div className="flex items-center gap-3 mb-4">
//                     <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">
//                       {product.category || "Uncategorized"}
//                     </span>
//                     {product.isSet && (
//                       <span className="text-sm bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full flex items-center gap-1">
//                         <Package size={12} />
//                         Bowl Set
//                       </span>
//                     )}
//                   </div>

//                   <h1 className="font-serif text-3xl lg:text-4xl text-gold mb-4">{product.name}</h1>

//                   <div className="flex items-center gap-3 mb-4">
//                     <div className="flex items-center">{renderStars(product.rating || 0)}</div>
//                     <span className="text-ivory/70">
//                       {(product.rating || 0).toFixed(1)} ({product.reviewCount || 0} reviews)
//                     </span>
//                   </div>

//                   <div className="mb-6">
//                     <span className="text-3xl font-serif text-ivory">${product.price}</span>
//                     {product.isSet && (
//                       <span className="text-sm text-ivory/60 ml-2">
//                         ({product.setItems?.length || 0} bowls)
//                       </span>
//                     )}
//                   </div>

//                   {/* Show bowl set details for sets, single product details for single items */}
//                   {product.isSet ? (
//                     // Bowl set details
//                     <div className="mb-6">
//                       <div className="flex flex-wrap gap-2 mb-4">
//                         <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">
//                           {product.size || "Various Sizes"}
//                         </span>
//                         <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">
//                           {product.tone || "Multiple Tones"}
//                         </span>
//                         <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">
//                           {product.type || "Therapeutic Set"}
//                         </span>
//                       </div>
                      
//                       {/* Bowl Set Items Display */}
//                       {product.setItems && product.setItems.length > 0 && (
//                         <BowlSetDisplay setItems={product.setItems} />
//                       )}
//                     </div>
//                   ) : (
//                     // Single product details
//                     <div className="flex flex-wrap gap-2 mb-6">
//                       {product.size && <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">{product.size}</span>}
//                       {product.tone && <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">{product.tone} Tone</span>}
//                       {product.musicalNote && <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">{product.musicalNote}</span>}
//                       {product.type && <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">{product.type}</span>}
//                     </div>
//                   )}

//                   <p className="text-ivory/80 mb-8 text-lg leading-relaxed">{product.description}</p>

//                   {product.inStock ? (
//                     <>
//                       <div className="flex items-center mb-6">
//                         <span className="text-ivory mr-4">Quantity:</span>
//                         <div className="flex items-center">
//                           <button onClick={decreaseQuantity} className="p-2 bg-charcoal text-ivory rounded-l-md hover:bg-charcoal/80 transition-colors" disabled={quantity <= 1}>
//                             <Minus size={16} />
//                           </button>
//                           <div className="w-16 bg-navy text-ivory py-2 text-center font-medium border-t border-b border-charcoal/20">{quantity}</div>
//                           <button onClick={increaseQuantity} className="p-2 bg-charcoal text-ivory rounded-r-md hover:bg-charcoal/80 transition-colors">
//                             <Plus size={16} />
//                           </button>
//                         </div>
//                       </div>

//                       <div className="flex flex-col sm:flex-row gap-4 mb-6">
//                         <button onClick={handleAddToCart} className="flex-1 btn-primary flex items-center justify-center" disabled={!product.inStock}>
//                           <ShoppingCart size={18} className="mr-2" />
//                           Add to Cart
//                         </button>
//                         <button onClick={handleBuyNow} className="flex-1 bg-gold text-charcoal py-3 px-6 rounded-md font-medium hover:bg-opacity-90 transition-colors" disabled={!product.inStock}>
//                           Buy Now
//                         </button>
//                       </div>
//                     </>
//                   ) : (
//                     <div className="mb-6">
//                       <div className="bg-charcoal/50 text-ivory/70 py-3 px-4 rounded text-center mb-4">Currently Out of Stock</div>
//                       <p className="text-ivory/60 text-sm">Sign up for notifications when this product is back in stock.</p>
//                     </div>
//                   )}

//                   <div className="flex items-center justify-center py-3 px-4 bg-navy/30 rounded-md text-sm text-ivory/70">
//                     <span>Free worldwide shipping on orders over $100</span>
//                   </div>
//                 </AnimatedSection>
//               </div>
//             </div>
//           </div>

//           <div className="mb-16">
//             <div className="flex border-b border-gold/20 mb-8">
//               <button
//                 onClick={() => setActiveTab("details")}
//                 className={`px-6 py-3 font-medium transition-colors ${
//                   activeTab === "details" ? "text-gold border-b-2 border-gold" : "text-ivory/70 hover:text-ivory"
//                 }`}
//               >
//                 Product Details
//               </button>
//               <button
//                 onClick={() => setActiveTab("reviews")}
//                 className={`px-6 py-3 font-medium transition-colors ${
//                   activeTab === "reviews" ? "text-gold border-b-2 border-gold" : "text-ivory/70 hover:text-ivory"
//                 }`}
//               >
//                 Reviews ({product.reviewCount || 0})
//               </button>
//             </div>

//             {activeTab === "details" ? (
//               <AnimatedSection>
//                 <div className="bg-navy/30 rounded-lg p-8">
//                   <h3 className="font-serif text-2xl text-ivory mb-6">Product Specifications</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                     <div>
//                       <h4 className="font-serif text-lg text-gold mb-4">Details</h4>
//                       <ul className="space-y-3 text-ivory/80">
//                         {product.details?.map((detail, index) => (
//                           <li key={index} className="flex items-baseline">
//                             <span className="text-gold mr-3">•</span>
//                             <span>{detail}</span>
//                           </li>
//                         )) || <li className="text-ivory/60">No details available</li>}
//                       </ul>
//                     </div>
//                     <div>
//                       <h4 className="font-serif text-lg text-gold mb-4">Care Instructions</h4>
//                       <ul className="space-y-3 text-ivory/80">
//                         {product.careInstructions?.map((instruction, index) => (
//                           <li key={index} className="flex items-baseline">
//                             <span className="text-gold mr-3">•</span>
//                             <span>{instruction}</span>
//                           </li>
//                         )) || (
//                           <>
//                             <li className="flex items-baseline">
//                               <span className="text-gold mr-3">•</span>
//                               <span>Clean with a soft, dry cloth after use</span>
//                             </li>
//                             <li className="flex items-baseline">
//                               <span className="text-gold mr-3">•</span>
//                               <span>Store on provided cushion in a dry place</span>
//                             </li>
//                             <li className="flex items-baseline">
//                               <span className="text-gold mr-3">•</span>
//                               <span>Avoid extreme temperatures and humidity</span>
//                             </li>
//                             <li className="flex items-baseline">
//                               <span className="text-gold mr-3">•</span>
//                               <span>Use lemon juice sparingly to remove tarnish</span>
//                             </li>
//                           </>
//                         )}
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </AnimatedSection>
//             ) : (
//               <ErrorBoundary fallback={<div className="text-ivory/60 text-center py-8">Reviews unavailable</div>}>
//                 <ProductReviews
//                   productId={product.id}
//                   productName={product.name}
//                   productImage={product.images?.[0]}
//                 />
//               </ErrorBoundary>
//             )}
//           </div>

//           {relatedProducts.length > 0 && (
//             <div>
//               <h2 className="font-serif text-2xl text-gold mb-8">You May Also Like</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 {relatedProducts.map((relatedProduct, index) => (
//                   <AnimatedSection key={relatedProduct.id} delay={0.1 * index}>
//                     <ErrorBoundary fallback={<div className="bg-gray-200 h-64 rounded">Product unavailable</div>}>
//                       <ProductCard product={relatedProduct} />
//                     </ErrorBoundary>
//                   </AnimatedSection>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onSuccess={handleLoginSuccess} />
//       </div>
//     </ErrorBoundary>
//   )
// }

// export default ProductPage



//just new 1
// /Users/apekshagyawali/Downloads/OMSound/OMSound-main/Frontend/src/pages/ProductPage.tsx
// import type React from "react"
// import { useState, useEffect } from "react"
// import { useParams, Link, useNavigate } from "react-router-dom"
// import { ShoppingCart, Minus, Plus, ArrowLeft, Star, Package, X } from "lucide-react"
// import SEOHelmet from "../components/seo/SEOHelmet"
// import { getProductSEO } from "../data/seoData"
// import { useCart } from "../context/CartContext"
// import { useAuth } from "../context/AuthContext"
// import { productService, type Product, type BowlSetItem } from "../services/product.service"
// import ProductImageGallery from "../components/product/ProductImageGallery"
// import ProductReviews from "../components/product/ProductReviews"
// import ProductCard from "../components/shop/ProductCard"
// import LoginModal from "../components/auth/LoginModal"
// import AnimatedSection from "../components/utils/AnimatedSection"

// // Error boundary component
// const ErrorBoundary = ({ children, fallback }: { children: React.ReactNode; fallback: React.ReactNode }) => {
//   try {
//     return <>{children}</>
//   } catch (error) {
//     console.error("ProductPage Error:", error)
//     return <>{fallback}</>
//   }
// }

// // Loading component
// const LoadingSpinner = () => (
//   <div className="min-h-screen pt-24 bg-ivory flex items-center justify-center">
//     <div className="text-center">
//       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
//       <p className="text-charcoal">Loading product...</p>
//     </div>
//   </div>
// )

// // Error component
// const ErrorDisplay = ({ message, onRetry }: { message: string; onRetry?: () => void }) => (
//   <div className="min-h-screen pt-24 bg-ivory">
//     <div className="container-custom py-16 text-center">
//       <h2 className="text-2xl font-serif text-charcoal mb-4">Something went wrong</h2>
//       <p className="mb-8 text-charcoal/80">{message}</p>
//       <div className="flex gap-4 justify-center">
//         {onRetry && (
//           <button onClick={onRetry} className="btn-primary">
//             Try Again
//           </button>
//         )}
//         <Link to="/shop" className="btn-secondary">
//           Return to Shop
//         </Link>
//       </div>
//     </div>
//   </div>
// )

// // Product not found component
// const ProductNotFound = () => (
//   <div className="min-h-screen pt-24 bg-ivory">
//     <SEOHelmet
//       title="Product Not Found | OMSound Nepal"
//       description="The product you're looking for doesn't exist or has been removed."
//       noindex={true}
//       keywords=""
//     />
//     <div className="container-custom py-16 text-center">
//       <h2 className="text-2xl font-serif text-charcoal mb-4">Product Not Found</h2>
//       <p className="mb-8 text-charcoal/80">The product you're looking for doesn't exist or has been removed.</p>
//       <Link to="/shop" className="btn-primary">
//         Return to Shop
//       </Link>
//     </div>
//   </div>
// )

// // Full Screen Image Modal Component
// const ImageModal: React.FC<{
//   imageUrl: string
//   alt: string
//   isOpen: boolean
//   onClose: () => void
// }> = ({ imageUrl, alt, isOpen, onClose }) => {
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
    
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return (
//     <div 
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
//       onClick={onClose}
//     >
//       <div className="relative max-w-5xl max-h-[90vh] w-full">
//         <button
//           onClick={onClose}
//           className="absolute -top-12 right-0 text-white hover:text-gold transition-colors z-10 bg-black/50 rounded-full p-2"
//         >
//           <X size={28} />
//         </button>
//         <div className="relative w-full h-full">
//           <img
//             src={imageUrl}
//             alt={alt}
//             className="w-full h-full object-contain max-h-[80vh] rounded-lg"
//             onClick={(e) => e.stopPropagation()}
//           />
//           <div className="text-white text-center mt-4 text-lg font-medium">{alt}</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Bowl Set Display Component
// const BowlSetDisplay: React.FC<{ setItems: BowlSetItem[] }> = ({ setItems }) => {
//   const [selectedImage, setSelectedImage] = useState<{url: string, alt: string} | null>(null);

//   if (!setItems || setItems.length === 0) return null;

//   const handleImageClick = (imageUrl: string, bowlCode: string, imgIndex: number) => {
//     setSelectedImage({
//       url: imageUrl,
//       alt: `Bowl ${bowlCode} - Image ${imgIndex + 1}`
//     });
//   };

//   return (
//     <>
//       <div className="mt-6 bg-navy/30 rounded-lg p-6">
//         <div className="flex items-center gap-2 mb-4">
//           <Package className="text-gold" size={20} />
//           <h3 className="font-serif text-xl text-ivory">This Set Includes:</h3>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {setItems.map((bowl, index) => (
//             <div key={index} className="bg-navy/50 rounded-lg p-4 border border-gold/20">
//               <div className="flex justify-between items-start mb-2">
//                 <h4 className="font-medium text-gold">Bowl {bowl.code}</h4>
//                 <span className={`text-xs px-2 py-1 rounded ${bowl.inStock ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
//                   {bowl.inStock ? 'In Stock' : 'Out of Stock'}
//                 </span>
//               </div>
              
//               <div className="space-y-2 mb-3">
//                 <div className="flex justify-between text-sm text-ivory/80">
//                   <span>Size:</span>
//                   <span className="text-gold">{bowl.size}</span>
//                 </div>
//                 <div className="flex justify-between text-sm text-ivory/80">
//                   <span>Weight:</span>
//                   <span className="text-gold">{bowl.weight} kg</span>
//                 </div>
//                 <div className="flex justify-between text-sm text-ivory/80">
//                   <span>Musical Note:</span>
//                   <span className="text-gold">{bowl.musicalNote}</span>
//                 </div>
//               </div>

//               {bowl.images && bowl.images.length > 0 && (
//                 <div className="mt-3">
//                   <p className="text-xs text-ivory/60 mb-2">Hover over images to enlarge</p>
//                   <div className="flex gap-2 overflow-x-auto">
//                     {bowl.images.slice(0, 3).map((image, imgIndex) => (
//                       <div 
//                         key={imgIndex} 
//                         className="flex-shrink-0 relative group"
//                       >
//                         <button
//                           onClick={() => handleImageClick(image, bowl.code, imgIndex)}
//                           className="relative"
//                         >
//                           <img
//                             src={image}
//                             alt={`Bowl ${bowl.code} image ${imgIndex + 1}`}
//                             className="h-16 w-16 rounded-md object-cover border border-gold/20 cursor-pointer hover:border-gold transition-colors"
//                           />
                          
//                           <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
//                             <span className="text-xs text-white">Click to view full</span>
//                           </div>
//                         </button>
                        
//                         <div className="fixed invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 z-50 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-navy p-4 rounded-lg shadow-2xl border-2 border-gold/50">
//                           <img
//                             src={image}
//                             alt={`Bowl ${bowl.code} image ${imgIndex + 1} - enlarged`}
//                             className="w-full h-full object-contain"
//                           />
//                           <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-sm p-2 text-center rounded-b-lg">
//                             Bowl {bowl.code} - Image {imgIndex + 1}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
                  
//                   {bowl.images.length > 3 && (
//                     <div className="text-xs text-ivory/60 mt-1">
//                       +{bowl.images.length - 3} more image{bowl.images.length - 3 > 1 ? 's' : ''}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
        
//         <div className="mt-4 pt-3 border-t border-gold/10 text-center">
//           <p className="text-sm text-gold italic">✨ Hover over any bowl image to see a large preview ✨</p>
//         </div>
//       </div>

//       {selectedImage && (
//         <ImageModal
//           imageUrl={selectedImage.url}
//           alt={selectedImage.alt}
//           isOpen={!!selectedImage}
//           onClose={() => setSelectedImage(null)}
//         />
//       )}
//     </>
//   );
// };

// const ProductPage = () => {
//   const { id } = useParams<{ id: string }>()
//   const navigate = useNavigate()
//   const [quantity, setQuantity] = useState(1)
//   const [activeTab, setActiveTab] = useState<"details" | "reviews">("details")
//   const [showLoginModal, setShowLoginModal] = useState(false)
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [product, setProduct] = useState<Product | null>(null)
//   const [relatedProducts, setRelatedProducts] = useState<Product[]>([])

//   const { addToCart } = useCart()
//   const { user } = useAuth()

//   useEffect(() => {
//     const fetchProduct = async () => {
//       if (!id) {
//         setError("Product ID is required")
//         setIsLoading(false)
//         return
//       }

//       try {
//         setIsLoading(true)
//         setError(null)

//         const productData = await productService.getProductById(id)
//         console.log("Product data:", productData)
//         setProduct(productData)

//         const allProducts = await productService.getProductsForShop()
//         let related = allProducts
//           .filter((p) => p.category === productData.category && p.id !== productData.id)
//           .slice(0, 4)

//         if (related.length < 4) {
//           const additional = allProducts
//             .filter((p) => p.id !== productData.id && !related.some((rp) => rp.id === p.id))
//             .slice(0, 4 - related.length)
//           related = [...related, ...additional]
//         }

//         setRelatedProducts(related)
//       } catch (err) {
//         console.error("Error fetching product:", err)
//         const errorMessage = err instanceof Error ? err.message : "Failed to load product"
//         setError(errorMessage)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchProduct()
//     window.scrollTo(0, 0)
//   }, [id])

//   const getSafeSEO = () => {
//     try {
//       if (!product) {
//         return {
//           title: "Product Not Found | OMSound Nepal",
//           description: "The product you're looking for doesn't exist.",
//           keywords: "",
//           image: "",
//           type: "website" as const,
//           structuredData: undefined,
//         }
//       }
//       return getProductSEO(product.name, product.description, product.price, product.images?.[0] || "")
//     } catch (err) {
//       console.error("SEO generation error:", err)
//       return {
//         title: "OMSound Nepal",
//         description: "Authentic Tibetan singing bowls and sound healing instruments",
//         keywords: "",
//         image: "",
//         type: "website" as const,
//         structuredData: undefined,
//       }
//     }
//   }

//   const seo = getSafeSEO()

//   const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))
//   const increaseQuantity = () => setQuantity((prev) => prev + 1)

//   const handleAddToCart = () => {
//     if (!user) return setShowLoginModal(true)
//     if (!product) return setError("Product data is not available")

//     const productForCart = {
//       ...product,
//       image: product.images?.[0] || "",
//     }
//     addToCart(productForCart, quantity)
//   }

//   const handleBuyNow = () => {
//     if (!user) return setShowLoginModal(true)
//     if (!product) return setError("Product data is not available")

//     const productForCart = {
//       ...product,
//       image: product.images?.[0] || "",
//     }
//     addToCart(productForCart, quantity)
//     navigate("/cart")
//   }

//   const handleLoginSuccess = () => {
//     if (!product) return setError("Product data is not available after login")
//     const productForCart = {
//       ...product,
//       image: product.images?.[0] || "",
//     }
//     addToCart(productForCart, quantity)
//   }

//   const renderStars = (rating: number) => {
//     const safeRating = typeof rating === "number" && !isNaN(rating) ? rating : 0
//     return Array.from({ length: 5 }, (_, index) => (
//       <Star
//         key={index}
//         size={16}
//         className={`${
//           index < Math.floor(safeRating)
//             ? "text-gold fill-gold"
//             : index < safeRating
//             ? "text-gold fill-gold opacity-50"
//             : "text-gold/30"
//         }`}
//       />
//     ))
//   }

//   const retryLoad = () => {
//     setError(null)
//     setIsLoading(true)
//     window.location.reload()
//   }

//   if (isLoading) return <LoadingSpinner />
//   if (error && !product) return <ErrorDisplay message={error} onRetry={retryLoad} />
//   if (!product) return <ProductNotFound />

//   return (
//     <ErrorBoundary
//       fallback={<ErrorDisplay message="An unexpected error occurred while displaying the product." onRetry={retryLoad} />}
//     >
//       <div className="min-h-screen pt-24 bg-navy">
//         <SEOHelmet
//           title={seo.title}
//           description={seo.description}
//           keywords={seo.keywords || ""}
//           image={seo.image || ""}
//           type={seo.type}
//           structuredData={seo.structuredData}
//           url={`https://omsoundnepal.com/product/${product.id}`}
//         />

//         {error && (
//           <div className="bg-red-500 text-white p-4 text-center">
//             <p>{error}</p>
//             <button onClick={() => setError(null)} className="ml-4 underline hover:no-underline">
//               Dismiss
//             </button>
//           </div>
//         )}

//         <div className="container-custom py-16">
//           <Link to="/shop" className="inline-flex items-center text-gold hover:text-gold/80 transition-colors mb-6">
//             <ArrowLeft size={16} className="mr-1" />
//             Back to Shop
//           </Link>

//           <div className="bg-navy/50 rounded-lg overflow-hidden shadow-lg mb-16">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
//               <div>
//                 <ErrorBoundary
//                   fallback={<div className="bg-gray-200 h-96 rounded flex items-center justify-center">Image unavailable</div>}
//                 >
//                   <ProductImageGallery images={product.images || []} video={product.video} audio={product.audio} productName={product.name} />
//                 </ErrorBoundary>
//               </div>

//               <div>
//                 <AnimatedSection>
//                   <div className="flex items-center gap-3 mb-4">
//                     <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">
//                       {product.category || "Uncategorized"}
//                     </span>
//                     {product.isSet && (
//                       <span className="text-sm bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full flex items-center gap-1">
//                         <Package size={12} />
//                         Bowl Set
//                       </span>
//                     )}
//                   </div>

//                   <h1 className="font-serif text-3xl lg:text-4xl text-gold mb-4">{product.name}</h1>

//                   <div className="flex items-center gap-3 mb-4">
//                     <div className="flex items-center">{renderStars(product.rating || 0)}</div>
//                     <span className="text-ivory/70">
//                       {(product.rating || 0).toFixed(1)} ({product.reviewCount || 0} reviews)
//                     </span>
//                   </div>

//                   <div className="mb-6">
//                     <span className="text-3xl font-serif text-ivory">${product.price}</span>
//                     {product.isSet && (
//                       <span className="text-sm text-ivory/60 ml-2">
//                         ({product.setItems?.length || 0} bowls)
//                       </span>
//                     )}
//                   </div>

//                   {product.isSet ? (
//                     <div className="mb-6">
//                       <div className="flex flex-wrap gap-2 mb-4">
//                         <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">
//                           {product.size || "Various Sizes"}
//                         </span>
//                         <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">
//                           {product.tone || "Multiple Tones"}
//                         </span>
//                         <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">
//                           {product.type || "Therapeutic Set"}
//                         </span>
//                       </div>
                      
//                       {product.setItems && product.setItems.length > 0 && (
//                         <BowlSetDisplay setItems={product.setItems} />
//                       )}
//                     </div>
//                   ) : (
//                     <div className="flex flex-wrap gap-2 mb-6">
//                       {product.size && <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">{product.size}</span>}
//                       {product.weight && <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">{product.weight} kg</span>}
//                       {product.tone && <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">{product.tone} Tone</span>}
//                       {product.musicalNote && <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">{product.musicalNote}</span>}
//                       {(product as any).bowlCode && <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">Code: {(product as any).bowlCode}</span>}
//                       {product.type && <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">{product.type}</span>}
//                     </div>
//                   )}

//                   <p className="text-ivory/80 mb-8 text-lg leading-relaxed">{product.description}</p>

//                   {product.inStock ? (
//                     <>
//                       <div className="flex items-center mb-6">
//                         <span className="text-ivory mr-4">Quantity:</span>
//                         <div className="flex items-center">
//                           <button onClick={decreaseQuantity} className="p-2 bg-charcoal text-ivory rounded-l-md hover:bg-charcoal/80 transition-colors" disabled={quantity <= 1}>
//                             <Minus size={16} />
//                           </button>
//                           <div className="w-16 bg-navy text-ivory py-2 text-center font-medium border-t border-b border-charcoal/20">{quantity}</div>
//                           <button onClick={increaseQuantity} className="p-2 bg-charcoal text-ivory rounded-r-md hover:bg-charcoal/80 transition-colors">
//                             <Plus size={16} />
//                           </button>
//                         </div>
//                       </div>

//                       <div className="flex flex-col sm:flex-row gap-4 mb-6">
//                         <button onClick={handleAddToCart} className="flex-1 btn-primary flex items-center justify-center" disabled={!product.inStock}>
//                           <ShoppingCart size={18} className="mr-2" />
//                           Add to Cart
//                         </button>
//                         <button onClick={handleBuyNow} className="flex-1 bg-gold text-charcoal py-3 px-6 rounded-md font-medium hover:bg-opacity-90 transition-colors" disabled={!product.inStock}>
//                           Buy Now
//                         </button>
//                       </div>
//                     </>
//                   ) : (
//                     <div className="mb-6">
//                       <div className="bg-charcoal/50 text-ivory/70 py-3 px-4 rounded text-center mb-4">Currently Out of Stock</div>
//                       <p className="text-ivory/60 text-sm">Sign up for notifications when this product is back in stock.</p>
//                     </div>
//                   )}

//                   <div className="flex items-center justify-center py-3 px-4 bg-navy/30 rounded-md text-sm text-ivory/70">
//                     <span>Free worldwide shipping on orders over $100</span>
//                   </div>
//                 </AnimatedSection>
//               </div>
//             </div>
//           </div>

//           <div className="mb-16">
//             <div className="flex border-b border-gold/20 mb-8">
//               <button
//                 onClick={() => setActiveTab("details")}
//                 className={`px-6 py-3 font-medium transition-colors ${
//                   activeTab === "details" ? "text-gold border-b-2 border-gold" : "text-ivory/70 hover:text-ivory"
//                 }`}
//               >
//                 Product Details
//               </button>
//               <button
//                 onClick={() => setActiveTab("reviews")}
//                 className={`px-6 py-3 font-medium transition-colors ${
//                   activeTab === "reviews" ? "text-gold border-b-2 border-gold" : "text-ivory/70 hover:text-ivory"
//                 }`}
//               >
//                 Reviews ({product.reviewCount || 0})
//               </button>
//             </div>

//             {activeTab === "details" ? (
//               <AnimatedSection>
//                 <div className="bg-navy/30 rounded-lg p-8">
//                   <h3 className="font-serif text-2xl text-ivory mb-6">Product Specifications</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                     <div>
//                       <h4 className="font-serif text-lg text-gold mb-4">Details</h4>
//                       <ul className="space-y-3 text-ivory/80">
//                         {!product.isSet && (
//                           <>
//                             <li className="flex items-baseline">
//                               <span className="text-gold mr-3">•</span>
//                               <span><strong>Weight:</strong> {product.weight} kg</span>
//                             </li>
//                             <li className="flex items-baseline">
//                               <span className="text-gold mr-3">•</span>
//                               <span><strong>Size:</strong> {product.size}</span>
//                             </li>
//                             <li className="flex items-baseline">
//                               <span className="text-gold mr-3">•</span>
//                               <span><strong>Tone:</strong> {product.tone}</span>
//                             </li>
//                             <li className="flex items-baseline">
//                               <span className="text-gold mr-3">•</span>
//                               <span><strong>Musical Note:</strong> {product.musicalNote}</span>
//                             </li>
//                             {(product as any).bowlCode && (
//                               <li className="flex items-baseline">
//                                 <span className="text-gold mr-3">•</span>
//                                 <span><strong>Bowl Code:</strong> {(product as any).bowlCode}</span>
//                               </li>
//                             )}
//                             <li className="flex items-baseline">
//                               <span className="text-gold mr-3">•</span>
//                               <span><strong>Type:</strong> {product.type}</span>
//                             </li>
//                           </>
//                         )}
//                         {product.details?.map((detail, index) => (
//                           <li key={index} className="flex items-baseline">
//                             <span className="text-gold mr-3">•</span>
//                             <span>{detail}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                     <div>
//                       <h4 className="font-serif text-lg text-gold mb-4">Care Instructions</h4>
//                       <ul className="space-y-3 text-ivory/80">
//                         {product.careInstructions?.map((instruction, index) => (
//                           <li key={index} className="flex items-baseline">
//                             <span className="text-gold mr-3">•</span>
//                             <span>{instruction}</span>
//                           </li>
//                         )) || (
//                           <>
//                             <li className="flex items-baseline">
//                               <span className="text-gold mr-3">•</span>
//                               <span>Clean with a soft, dry cloth after use</span>
//                             </li>
//                             <li className="flex items-baseline">
//                               <span className="text-gold mr-3">•</span>
//                               <span>Store on provided cushion in a dry place</span>
//                             </li>
//                             <li className="flex items-baseline">
//                               <span className="text-gold mr-3">•</span>
//                               <span>Avoid extreme temperatures and humidity</span>
//                             </li>
//                             <li className="flex items-baseline">
//                               <span className="text-gold mr-3">•</span>
//                               <span>Use lemon juice sparingly to remove tarnish</span>
//                             </li>
//                           </>
//                         )}
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </AnimatedSection>
//             ) : (
//               <ErrorBoundary fallback={<div className="text-ivory/60 text-center py-8">Reviews unavailable</div>}>
//                 <ProductReviews
//                   productId={product.id}
//                   productName={product.name}
//                   productImage={product.images?.[0]}
//                 />
//               </ErrorBoundary>
//             )}
//           </div>

//           {relatedProducts.length > 0 && (
//             <div>
//               <h2 className="font-serif text-2xl text-gold mb-8">You May Also Like</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 {relatedProducts.map((relatedProduct, index) => (
//                   <AnimatedSection key={relatedProduct.id} delay={0.1 * index}>
//                     <ErrorBoundary fallback={<div className="bg-gray-200 h-64 rounded">Product unavailable</div>}>
//                       <ProductCard product={relatedProduct} />
//                     </ErrorBoundary>
//                   </AnimatedSection>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onSuccess={handleLoginSuccess} />
//       </div>
//     </ErrorBoundary>
//   )
// }

// export default ProductPage


// /Users/apekshagyawali/Downloads/OMSound/OMSound-main/Frontend/src/pages/ProductPage.tsx
import type React from "react"
import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { ShoppingCart, Minus, Plus, ArrowLeft, Star, Package, X } from "lucide-react"
import SEOHelmet from "../components/seo/SEOHelmet"
import { getProductSEO } from "../data/seoData"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import { productService, type Product, type BowlSetItem } from "../services/product.service"
import ProductImageGallery from "../components/product/ProductImageGallery"
import ProductReviews from "../components/product/ProductReviews"
import ProductCard from "../components/shop/ProductCard"
import LoginModal from "../components/auth/LoginModal"
import AnimatedSection from "../components/utils/AnimatedSection"

// Error boundary component
const ErrorBoundary = ({ children, fallback }: { children: React.ReactNode; fallback: React.ReactNode }) => {
  try {
    return <>{children}</>
  } catch (error) {
    console.error("ProductPage Error:", error)
    return <>{fallback}</>
  }
}

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen pt-24 bg-ivory flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
      <p className="text-charcoal">Loading product...</p>
    </div>
  </div>
)

// Error component
const ErrorDisplay = ({ message, onRetry }: { message: string; onRetry?: () => void }) => (
  <div className="min-h-screen pt-24 bg-ivory">
    <div className="container-custom py-16 text-center">
      <h2 className="text-2xl font-serif text-charcoal mb-4">Something went wrong</h2>
      <p className="mb-8 text-charcoal/80">{message}</p>
      <div className="flex gap-4 justify-center">
        {onRetry && (
          <button onClick={onRetry} className="btn-primary">
            Try Again
          </button>
        )}
        <Link to="/shop" className="btn-secondary">
          Return to Shop
        </Link>
      </div>
    </div>
  </div>
)

// Product not found component
const ProductNotFound = () => (
  <div className="min-h-screen pt-24 bg-ivory">
    <SEOHelmet
      title="Product Not Found | OMSound Nepal"
      description="The product you're looking for doesn't exist or has been removed."
      noindex={true}
      keywords=""
    />
    <div className="container-custom py-16 text-center">
      <h2 className="text-2xl font-serif text-charcoal mb-4">Product Not Found</h2>
      <p className="mb-8 text-charcoal/80">The product you're looking for doesn't exist or has been removed.</p>
      <Link to="/shop" className="btn-primary">
        Return to Shop
      </Link>
    </div>
  </div>
)

// Full Screen Image Modal Component
const ImageModal: React.FC<{
  imageUrl: string
  alt: string
  isOpen: boolean
  onClose: () => void
}> = ({ imageUrl, alt, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <div className="relative max-w-5xl max-h-[90vh] w-full">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gold transition-colors z-10 bg-black/50 rounded-full p-2"
        >
          <X size={28} />
        </button>
        <div className="relative w-full h-full">
          <img
            src={imageUrl}
            alt={alt}
            className="w-full h-full object-contain max-h-[80vh] rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="text-white text-center mt-4 text-lg font-medium">{alt}</div>
        </div>
      </div>
    </div>
  );
};

// Bowl Set Display Component - Shows individual bowls when available
const BowlSetDisplay: React.FC<{ setItems: BowlSetItem[] }> = ({ setItems }) => {
  const [selectedImage, setSelectedImage] = useState<{url: string, alt: string} | null>(null);

  if (!setItems || setItems.length === 0) return null;

  const handleImageClick = (imageUrl: string, bowlCode: string, imgIndex: number) => {
    setSelectedImage({
      url: imageUrl,
      alt: `Bowl ${bowlCode} - Image ${imgIndex + 1}`
    });
  };

  return (
    <>
      <div className="mt-6 bg-navy/30 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Package className="text-gold" size={20} />
          <h3 className="font-serif text-xl text-ivory">This Set Includes:</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {setItems.map((bowl, index) => (
            <div key={index} className="bg-navy/50 rounded-lg p-4 border border-gold/20">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gold">Bowl {bowl.code}</h4>
                <span className={`text-xs px-2 py-1 rounded ${bowl.inStock ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {bowl.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-sm text-ivory/80">
                  <span>Size:</span>
                  <span className="text-gold">{bowl.size}</span>
                </div>
                <div className="flex justify-between text-sm text-ivory/80">
                  <span>Weight:</span>
                  <span className="text-gold">{bowl.weight} kg</span>
                </div>
                <div className="flex justify-between text-sm text-ivory/80">
                  <span>Musical Note:</span>
                  <span className="text-gold">{bowl.musicalNote}</span>
                </div>
              </div>

              {bowl.images && bowl.images.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs text-ivory/60 mb-2">Hover over images to enlarge</p>
                  <div className="flex gap-2 overflow-x-auto">
                    {bowl.images.slice(0, 3).map((image, imgIndex) => (
                      <div 
                        key={imgIndex} 
                        className="flex-shrink-0 relative group"
                      >
                        <button
                          onClick={() => handleImageClick(image, bowl.code, imgIndex)}
                          className="relative"
                        >
                          <img
                            src={image}
                            alt={`Bowl ${bowl.code} image ${imgIndex + 1}`}
                            className="h-16 w-16 rounded-md object-cover border border-gold/20 cursor-pointer hover:border-gold transition-colors"
                          />
                          
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                            <span className="text-xs text-white">Click to view full</span>
                          </div>
                        </button>
                        
                        <div className="fixed invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 z-50 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-navy p-4 rounded-lg shadow-2xl border-2 border-gold/50">
                          <img
                            src={image}
                            alt={`Bowl ${bowl.code} image ${imgIndex + 1} - enlarged`}
                            className="w-full h-full object-contain"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-sm p-2 text-center rounded-b-lg">
                            Bowl {bowl.code} - Image {imgIndex + 1}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {bowl.images.length > 3 && (
                    <div className="text-xs text-ivory/60 mt-1">
                      +{bowl.images.length - 3} more image{bowl.images.length - 3 > 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-3 border-t border-gold/10 text-center">
          <p className="text-sm text-gold italic">✨ Hover over any bowl image to see a large preview ✨</p>
        </div>
      </div>

      {selectedImage && (
        <ImageModal
          imageUrl={selectedImage.url}
          alt={selectedImage.alt}
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
};

const ProductPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<"details" | "reviews">("details")
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])

  const { addToCart } = useCart()
  const { user } = useAuth()

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError("Product ID is required")
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)

        const productData = await productService.getProductById(id)
        console.log("Product data:", productData)
        setProduct(productData)

        const allProducts = await productService.getProductsForShop()
        let related = allProducts
          .filter((p) => p.category === productData.category && p.id !== productData.id)
          .slice(0, 4)

        if (related.length < 4) {
          const additional = allProducts
            .filter((p) => p.id !== productData.id && !related.some((rp) => rp.id === p.id))
            .slice(0, 4 - related.length)
          related = [...related, ...additional]
        }

        setRelatedProducts(related)
      } catch (err) {
        console.error("Error fetching product:", err)
        const errorMessage = err instanceof Error ? err.message : "Failed to load product"
        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
    window.scrollTo(0, 0)
  }, [id])

  const getSafeSEO = () => {
    try {
      if (!product) {
        return {
          title: "Product Not Found | OMSound Nepal",
          description: "The product you're looking for doesn't exist.",
          keywords: "",
          image: "",
          type: "website" as const,
          structuredData: undefined,
        }
      }
      return getProductSEO(product.name, product.description, product.price, product.images?.[0] || "")
    } catch (err) {
      console.error("SEO generation error:", err)
      return {
        title: "OMSound Nepal",
        description: "Authentic Tibetan singing bowls and sound healing instruments",
        keywords: "",
        image: "",
        type: "website" as const,
        structuredData: undefined,
      }
    }
  }

  const seo = getSafeSEO()

  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))
  const increaseQuantity = () => setQuantity((prev) => prev + 1)

  const handleAddToCart = () => {
    if (!user) return setShowLoginModal(true)
    if (!product) return setError("Product data is not available")

    const productForCart = {
      ...product,
      image: product.images?.[0] || "",
    }
    addToCart(productForCart, quantity)
  }

  const handleBuyNow = () => {
    if (!user) return setShowLoginModal(true)
    if (!product) return setError("Product data is not available")

    const productForCart = {
      ...product,
      image: product.images?.[0] || "",
    }
    addToCart(productForCart, quantity)
    navigate("/cart")
  }

  const handleLoginSuccess = () => {
    if (!product) return setError("Product data is not available after login")
    const productForCart = {
      ...product,
      image: product.images?.[0] || "",
    }
    addToCart(productForCart, quantity)
  }

  const renderStars = (rating: number) => {
    const safeRating = typeof rating === "number" && !isNaN(rating) ? rating : 0
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={`${
          index < Math.floor(safeRating)
            ? "text-gold fill-gold"
            : index < safeRating
            ? "text-gold fill-gold opacity-50"
            : "text-gold/30"
        }`}
      />
    ))
  }

  const retryLoad = () => {
    setError(null)
    setIsLoading(true)
    window.location.reload()
  }

  if (isLoading) return <LoadingSpinner />
  if (error && !product) return <ErrorDisplay message={error} onRetry={retryLoad} />
  if (!product) return <ProductNotFound />

  return (
    <ErrorBoundary
      fallback={<ErrorDisplay message="An unexpected error occurred while displaying the product." onRetry={retryLoad} />}
    >
      <div className="min-h-screen pt-24 bg-navy">
        <SEOHelmet
          title={seo.title}
          description={seo.description}
          keywords={seo.keywords || ""}
          image={seo.image || ""}
          type={seo.type}
          structuredData={seo.structuredData}
          url={`https://omsoundnepal.com/product/${product.id}`}
        />

        {error && (
          <div className="bg-red-500 text-white p-4 text-center">
            <p>{error}</p>
            <button onClick={() => setError(null)} className="ml-4 underline hover:no-underline">
              Dismiss
            </button>
          </div>
        )}

        <div className="container-custom py-16">
          <Link to="/shop" className="inline-flex items-center text-gold hover:text-gold/80 transition-colors mb-6">
            <ArrowLeft size={16} className="mr-1" />
            Back to Shop
          </Link>

          <div className="bg-navy/50 rounded-lg overflow-hidden shadow-lg mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              <div>
                <ErrorBoundary
                  fallback={<div className="bg-gray-200 h-96 rounded flex items-center justify-center">Image unavailable</div>}
                >
                  <ProductImageGallery images={product.images || []} video={product.video} audio={product.audio} productName={product.name} />
                </ErrorBoundary>
              </div>

              <div>
                <AnimatedSection>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">
                      {product.category || "Uncategorized"}
                    </span>
                    {product.isSet && (
                      <span className="text-sm bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full flex items-center gap-1">
                        <Package size={12} />
                        Bowl Set
                      </span>
                    )}
                  </div>

                  <h1 className="font-serif text-3xl lg:text-4xl text-gold mb-4">{product.name}</h1>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center">{renderStars(product.rating || 0)}</div>
                    <span className="text-ivory/70">
                      {(product.rating || 0).toFixed(1)} ({product.reviewCount || 0} reviews)
                    </span>
                  </div>

                  <div className="mb-6">
                    <span className="text-3xl font-serif text-ivory">${product.price}</span>
                    {product.isSet && (
                      <span className="text-sm text-ivory/60 ml-2">
                        ({product.setItems?.length || 0} bowls)
                      </span>
                    )}
                  </div>

                  {product.isSet ? (
                    // Bowl Set Display
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">
                          {product.size || "Various Sizes"}
                        </span>
                        <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">
                          {product.tone || "Multiple Tones"}
                        </span>
                        <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">
                          {product.type || "Therapeutic Set"}
                        </span>
                      </div>
                      
                      {product.setItems && product.setItems.length > 0 ? (
                        <BowlSetDisplay setItems={product.setItems} />
                      ) : (
                        // Nice message for bowl sets without individual bowl items
                        <div className="mt-6 bg-navy/30 rounded-lg p-8 text-center">
                          <Package size={48} className="text-gold mx-auto mb-4" />
                          <h3 className="font-serif text-2xl text-ivory mb-3">Premium Singing Bowl Set</h3>
                          <p className="text-ivory/70 max-w-md mx-auto">
                            This carefully curated set includes multiple singing bowls perfectly harmonized for sound healing and meditation.
                          </p>
                          <div className="mt-6 flex flex-wrap gap-3 justify-center">
                            <span className="text-sm bg-gold/20 text-gold px-4 py-2 rounded-full">Hand-selected</span>
                            <span className="text-sm bg-gold/20 text-gold px-4 py-2 rounded-full">Perfect harmony</span>
                            <span className="text-sm bg-gold/20 text-gold px-4 py-2 rounded-full">Therapeutic quality</span>
                            <span className="text-sm bg-gold/20 text-gold px-4 py-2 rounded-full">Authentic craftsmanship</span>
                          </div>
                          <div className="mt-6 pt-4 border-t border-gold/10">
                            <p className="text-ivory/60 text-sm">
                              📞 Contact us for detailed information about individual bowls in this set
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    // Single Product Display
                    <div className="flex flex-wrap gap-2 mb-6">
                      {product.size && <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">{product.size}</span>}
                      {product.weight && product.weight > 0 && <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">{product.weight} kg</span>}
                      {product.tone && <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">{product.tone} Tone</span>}
                      {product.musicalNote && <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">{product.musicalNote}</span>}
                      {(product as any).bowlCode && <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">Code: {(product as any).bowlCode}</span>}
                      {product.type && <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">{product.type}</span>}
                    </div>
                  )}

                  <p className="text-ivory/80 mb-8 text-lg leading-relaxed">{product.description}</p>

                  {product.inStock ? (
                    <>
                      <div className="flex items-center mb-6">
                        <span className="text-ivory mr-4">Quantity:</span>
                        <div className="flex items-center">
                          <button onClick={decreaseQuantity} className="p-2 bg-charcoal text-ivory rounded-l-md hover:bg-charcoal/80 transition-colors" disabled={quantity <= 1}>
                            <Minus size={16} />
                          </button>
                          <div className="w-16 bg-navy text-ivory py-2 text-center font-medium border-t border-b border-charcoal/20">{quantity}</div>
                          <button onClick={increaseQuantity} className="p-2 bg-charcoal text-ivory rounded-r-md hover:bg-charcoal/80 transition-colors">
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <button onClick={handleAddToCart} className="flex-1 btn-primary flex items-center justify-center" disabled={!product.inStock}>
                          <ShoppingCart size={18} className="mr-2" />
                          Add to Cart
                        </button>
                        <button onClick={handleBuyNow} className="flex-1 bg-gold text-charcoal py-3 px-6 rounded-md font-medium hover:bg-opacity-90 transition-colors" disabled={!product.inStock}>
                          Buy Now
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="mb-6">
                      <div className="bg-charcoal/50 text-ivory/70 py-3 px-4 rounded text-center mb-4">Currently Out of Stock</div>
                      <p className="text-ivory/60 text-sm">Sign up for notifications when this product is back in stock.</p>
                    </div>
                  )}

                  <div className="flex items-center justify-center py-3 px-4 bg-navy/30 rounded-md text-sm text-ivory/70">
                    <span>Free worldwide shipping on orders over $100</span>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <div className="flex border-b border-gold/20 mb-8">
              <button
                onClick={() => setActiveTab("details")}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === "details" ? "text-gold border-b-2 border-gold" : "text-ivory/70 hover:text-ivory"
                }`}
              >
                Product Details
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === "reviews" ? "text-gold border-b-2 border-gold" : "text-ivory/70 hover:text-ivory"
                }`}
              >
                Reviews ({product.reviewCount || 0})
              </button>
            </div>

            {activeTab === "details" ? (
              <AnimatedSection>
                <div className="bg-navy/30 rounded-lg p-8">
                  <h3 className="font-serif text-2xl text-ivory mb-6">Product Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-serif text-lg text-gold mb-4">Details</h4>
                      <ul className="space-y-3 text-ivory/80">
                        {!product.isSet && (
                          <>
                            {product.weight && product.weight > 0 && (
                              <li className="flex items-baseline">
                                <span className="text-gold mr-3">•</span>
                                <span><strong>Weight:</strong> {product.weight} kg</span>
                              </li>
                            )}
                            <li className="flex items-baseline">
                              <span className="text-gold mr-3">•</span>
                              <span><strong>Size:</strong> {product.size}</span>
                            </li>
                            <li className="flex items-baseline">
                              <span className="text-gold mr-3">•</span>
                              <span><strong>Tone:</strong> {product.tone}</span>
                            </li>
                            <li className="flex items-baseline">
                              <span className="text-gold mr-3">•</span>
                              <span><strong>Musical Note:</strong> {product.musicalNote}</span>
                            </li>
                            {(product as any).bowlCode && (
                              <li className="flex items-baseline">
                                <span className="text-gold mr-3">•</span>
                                <span><strong>Bowl Code:</strong> {(product as any).bowlCode}</span>
                              </li>
                            )}
                            <li className="flex items-baseline">
                              <span className="text-gold mr-3">•</span>
                              <span><strong>Type:</strong> {product.type}</span>
                            </li>
                          </>
                        )}
                        {product.details?.map((detail, index) => (
                          <li key={index} className="flex items-baseline">
                            <span className="text-gold mr-3">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-serif text-lg text-gold mb-4">Care Instructions</h4>
                      <ul className="space-y-3 text-ivory/80">
                        {product.careInstructions?.map((instruction, index) => (
                          <li key={index} className="flex items-baseline">
                            <span className="text-gold mr-3">•</span>
                            <span>{instruction}</span>
                          </li>
                        )) || (
                          <>
                            <li className="flex items-baseline">
                              <span className="text-gold mr-3">•</span>
                              <span>Clean with a soft, dry cloth after use</span>
                            </li>
                            <li className="flex items-baseline">
                              <span className="text-gold mr-3">•</span>
                              <span>Store on provided cushion in a dry place</span>
                            </li>
                            <li className="flex items-baseline">
                              <span className="text-gold mr-3">•</span>
                              <span>Avoid extreme temperatures and humidity</span>
                            </li>
                            <li className="flex items-baseline">
                              <span className="text-gold mr-3">•</span>
                              <span>Use lemon juice sparingly to remove tarnish</span>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ) : (
              <ErrorBoundary fallback={<div className="text-ivory/60 text-center py-8">Reviews unavailable</div>}>
                <ProductReviews
                  productId={product.id}
                  productName={product.name}
                  productImage={product.images?.[0]}
                />
              </ErrorBoundary>
            )}
          </div>

          {relatedProducts.length > 0 && (
            <div>
              <h2 className="font-serif text-2xl text-gold mb-8">You May Also Like</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct, index) => (
                  <AnimatedSection key={relatedProduct.id} delay={0.1 * index}>
                    <ErrorBoundary fallback={<div className="bg-gray-200 h-64 rounded">Product unavailable</div>}>
                      <ProductCard product={relatedProduct} />
                    </ErrorBoundary>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          )}
        </div>

        <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onSuccess={handleLoginSuccess} />
      </div>
    </ErrorBoundary>
  )
}

export default ProductPage