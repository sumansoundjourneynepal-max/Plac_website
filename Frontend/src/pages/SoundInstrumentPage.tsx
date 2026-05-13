// import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import { productService } from "../services/product.service"
// import ProductCard from "../components/shop/ProductCard"
// import { Product } from "../services/product.service"

// const SoundInstrumentPage = () => {
//   const { instrument } = useParams<{ instrument: string }>()
//   const [products, setProducts] = useState<Product[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     console.log("Instrument param:", instrument);

//     if (!instrument) return

//     const load = async () => {
//       try {
//         const data = await productService.getProductsByInstrument(instrument)
//         setProducts(data)
//       } finally {
//         setLoading(false)
//       }
//     }

//     load()
//   }, [instrument])

//   if (loading) return <p className="py-20 text-center text-lg">Loading...</p>

//   return (
//     <div className="container-custom py-16">
//       <h1 className="text-4xl font-bold mb-8 capitalize">
//         {instrument?.replace("-", " ")}
//       </h1>

//       {products.length === 0 ? (
//         <p className="text-center text-gray-400">No products found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {products.map((product) => (
//             <ProductCard key={product._id} product={product} />
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

// export default SoundInstrumentPage



//new

// import { useState, useEffect, useMemo } from "react"
// import { useParams } from "react-router-dom"
// import { motion, AnimatePresence } from "framer-motion"
// import { ChevronLeft, ChevronRight, Grid, List, Search, SlidersHorizontal, X, Filter } from "lucide-react"
// import ProductCard from "../components/shop/ProductCard"
// import { productService, type Product } from "../services/product.service"
// import AnimatedSection from "../components/utils/AnimatedSection"

// const PRODUCTS_PER_PAGE = 24

// export type FilterState = {
//   sizes: string[]
//   tones: string[]
//   types: string[]
//   musicalNotes: string[]
//   categories: string[]
//   brands: string[]
//   inStock: boolean
//   priceRange: [number, number]
// }

// type ArrayFilterKeys = 'sizes' | 'tones' | 'types' | 'musicalNotes' | 'categories' | 'brands'

// const SoundInstrumentPage = () => {
//   const { instrument } = useParams<{ instrument: string }>()
//   const [products, setProducts] = useState<Product[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
//   const [searchTerm, setSearchTerm] = useState("")
//   const [sortBy, setSortBy] = useState<"featured" | "price-low-high" | "price-high-low" | "rating-high-low" | "rating-low-high" | "name-a-z" | "name-z-a" | "newest">("featured")
//   const [currentPage, setCurrentPage] = useState(1)
//   const [isFilterOpen, setIsFilterOpen] = useState(false)

//   const [activeFilters, setActiveFilters] = useState<FilterState>({
//     sizes: [],
//     tones: [],
//     types: [],
//     musicalNotes: [],
//     categories: [],
//     brands: [],
//     inStock: false,
//     priceRange: [0, 1000],
//   })

//   // Fetch products by sound instrument
//   useEffect(() => {
//     if (!instrument) return

//     const load = async () => {
//       try {
//         setLoading(true)
//         const data = await productService.getProductsByInstrument(instrument)
//         setProducts(data)
//       } catch (err) {
//         const msg = err instanceof Error ? err.message : "Failed to load products"
//         setError(msg)
//       } finally {
//         setLoading(false)
//       }
//     }

//     load()
//   }, [instrument])

//   // Filter and sort products
//   const filteredAndSortedProducts = useMemo(() => {
//     if (products.length === 0) return []

//     let result = [...products]

//     // Search
//     if (searchTerm) {
//       result = result.filter(p =>
//         p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         p.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         p.category.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     }

//     // Filters
//     const arrayFilters: ArrayFilterKeys[] = ['sizes', 'tones', 'types', 'musicalNotes', 'categories', 'brands']
//     arrayFilters.forEach(key => {
//       if (activeFilters[key].length > 0) {
//         result = result.filter(p => activeFilters[key].includes(p[key.slice(0, -1) as keyof Product] as string))
//       }
//     })

//     if (activeFilters.inStock) {
//       result = result.filter(p => p.inStock)
//     }

//     result = result.filter(p => p.price >= activeFilters.priceRange[0] && p.price <= activeFilters.priceRange[1])

//     // Sorting
//     switch (sortBy) {
//       case "price-low-high": result.sort((a,b)=>a.price-b.price); break
//       case "price-high-low": result.sort((a,b)=>b.price-a.price); break
//       case "rating-high-low": result.sort((a,b)=>b.rating-a.rating); break
//       case "rating-low-high": result.sort((a,b)=>a.rating-b.rating); break
//       case "name-a-z": result.sort((a,b)=>a.name.localeCompare(b.name)); break
//       case "name-z-a": result.sort((a,b)=>b.name.localeCompare(a.name)); break
//       case "newest":
//   result.sort((a, b) => {
//     const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0
//     const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0
//     return bTime - aTime
//   })
//   break

//     }

//     return result
//   }, [products, activeFilters, sortBy, searchTerm])

//   const totalPages = Math.ceil(filteredAndSortedProducts.length / PRODUCTS_PER_PAGE)
//   const currentProducts = filteredAndSortedProducts.slice(
//     (currentPage-1)*PRODUCTS_PER_PAGE,
//     currentPage*PRODUCTS_PER_PAGE
//   )

//   useEffect(() => { setCurrentPage(1) }, [activeFilters, sortBy, searchTerm])

//   const toggleArrayFilter = (filterType: ArrayFilterKeys, value: string) => {
//     setActiveFilters(prev => ({
//       ...prev,
//       [filterType]: prev[filterType].includes(value)
//         ? prev[filterType].filter(v => v !== value)
//         : [...prev[filterType], value]
//     }))
//   }

//   const resetFilters = () => {
//     setActiveFilters({
//       sizes: [],
//       tones: [],
//       types: [],
//       musicalNotes: [],
//       categories: [],
//       brands: [],
//       inStock: false,
//       priceRange: [0, 1000]
//     })
//     setSortBy("featured")
//     setSearchTerm("")
//     setCurrentPage(1)
//   }

//   const filterOptions = useMemo(() => {
//     if (!products.length) return {}
//     return {
//       sizes: [...new Set(products.map(p=>p.size))].filter(Boolean),
//       tones: [...new Set(products.map(p=>p.tone))].filter(Boolean),
//       types: [...new Set(products.map(p=>p.type))].filter(Boolean),
//       musicalNotes: [...new Set(products.map(p=>p.musicalNote))].filter(Boolean),
//       categories: [...new Set(products.map(p=>p.category))].filter(Boolean),
//       brands: [...new Set(products.map(p=>p.brand))].filter(Boolean),
//     }
//   }, [products])

//   if (loading) {
//     return (
//       <div className="min-h-screen pt-24 bg-navy flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gold mx-auto mb-6"></div>
//           <p className="text-ivory text-lg">Loading products...</p>
//         </div>
//       </div>
//     )
//   }

//   if (error) return <p className="py-20 text-center text-lg text-red-500">{error}</p>

//   return (
//     <div className="min-h-screen pt-24 bg-navy">
//       <div className="container-custom py-16">
//         <AnimatedSection>
//           <h1 className="text-5xl md:text-6xl font-serif text-gold mb-4 capitalize">{instrument?.replace("-", " ")}</h1>
//           <p className="text-ivory/80 max-w-2xl mx-auto text-lg">Browse our collection of {instrument?.replace("-", " ")}s</p>
//         </AnimatedSection>

//         {/* Search and Filters UI (like ShopPage) */}
//         {/* ... you can reuse the filter/search/viewMode controls from ShopPage ... */}

//         {/* Product Grid */}
//         <AnimatePresence mode="wait">
//           {currentProducts.length > 0 ? (
//             <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12">
//               {currentProducts.map((product,index)=>(
//                 <motion.div key={product._id} initial={{opacity:0, y:20}} animate={{opacity:1,y:0}} transition={{delay:index*0.05}}>
//                   <ProductCard product={product}/>
//                 </motion.div>
//               ))}
//             </motion.div>
//           ) : (
//             <div className="text-center py-20 text-ivory">No products found.</div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   )
// }

// export default SoundInstrumentPage


import { useState, useEffect, useMemo } from "react"
import { useParams } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Grid, List, Search, SlidersHorizontal, X, Filter } from "lucide-react"
import ProductCard from "../components/shop/ProductCard"
import { productService, type Product } from "../services/product.service"
import AnimatedSection from "../components/utils/AnimatedSection"

const PRODUCTS_PER_PAGE = 24

export type FilterState = {
  sizes: string[]
  tones: string[]
  types: string[]
  musicalNotes: string[]
  categories: string[]
  brands: string[]
  inStock: boolean
  priceRange: [number, number]
}

type ArrayFilterKeys = 'sizes' | 'tones' | 'types' | 'musicalNotes' | 'categories' | 'brands'

type SortOption = "featured" | "price-low-high" | "price-high-low" | "rating-high-low" | "rating-low-high" | "name-a-z" | "name-z-a" | "newest"

const SoundInstrumentPage = () => {
  const { instrument } = useParams<{ instrument: string }>()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("featured")
  const [currentPage, setCurrentPage] = useState(1)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const [activeFilters, setActiveFilters] = useState<FilterState>({
    sizes: [],
    tones: [],
    types: [],
    musicalNotes: [],
    categories: [],
    brands: [],
    inStock: false,
    priceRange: [0, 1000],
  })

  // Fetch products by sound instrument
  useEffect(() => {
    if (!instrument) return

    const load = async () => {
      try {
        setLoading(true)
        const data = await productService.getProductsByInstrument(instrument)
        setProducts(data)
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Failed to load products"
        setError(msg)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [instrument])

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    if (products.length === 0) return []

    let result = [...products]

    // Search
    if (searchTerm) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filters
    if (activeFilters.sizes.length > 0) {
      result = result.filter(product => activeFilters.sizes.includes(product.size))
    }

    if (activeFilters.tones.length > 0) {
      result = result.filter(product => activeFilters.tones.includes(product.tone))
    }

    if (activeFilters.types.length > 0) {
      result = result.filter(product => activeFilters.types.includes(product.type))
    }

    if (activeFilters.musicalNotes.length > 0) {
      result = result.filter(product => activeFilters.musicalNotes.includes(product.musicalNote))
    }

    if (activeFilters.categories.length > 0) {
      result = result.filter(product => activeFilters.categories.includes(product.category))
    }

    if (activeFilters.brands.length > 0) {
      result = result.filter(product => activeFilters.brands.includes(product.brand))
    }

    if (activeFilters.inStock) {
      result = result.filter(p => p.inStock)
    }

    result = result.filter(p => p.price >= activeFilters.priceRange[0] && p.price <= activeFilters.priceRange[1])

    // Sorting
    switch (sortBy) {
      case "price-low-high":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high-low":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating-high-low":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "rating-low-high":
        result.sort((a, b) => a.rating - b.rating)
        break
      case "name-a-z":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-z-a":
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "newest":
        result.sort((a, b) => {
          const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0
          const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0
          return bTime - aTime
        })
        break
    }

    return result
  }, [products, activeFilters, sortBy, searchTerm])

  const totalPages = Math.ceil(filteredAndSortedProducts.length / PRODUCTS_PER_PAGE)
  const currentProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  )

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [activeFilters, sortBy, searchTerm])

  const toggleArrayFilter = (filterType: ArrayFilterKeys, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(v => v !== value)
        : [...prev[filterType], value]
    }))
  }

  const handleFilterChange = (filterType: keyof FilterState, value: string[] | boolean | [number, number]) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  const resetFilters = () => {
    setActiveFilters({
      sizes: [],
      tones: [],
      types: [],
      musicalNotes: [],
      categories: [],
      brands: [],
      inStock: false,
      priceRange: [0, 1000]
    })
    setSortBy("featured")
    setSearchTerm("")
    setCurrentPage(1)
  }

  const filterOptions = useMemo(() => {
    if (!products.length) return {}
    return {
      sizes: [...new Set(products.map(p => p.size))].filter(Boolean),
      tones: [...new Set(products.map(p => p.tone))].filter(Boolean),
      types: [...new Set(products.map(p => p.type))].filter(Boolean),
      musicalNotes: [...new Set(products.map(p => p.musicalNote))].filter(Boolean),
      categories: [...new Set(products.map(p => p.category))].filter(Boolean),
      brands: [...new Set(products.map(p => p.brand))].filter(Boolean),
    }
  }, [products])

  // Calculate active filter count
  const activeFilterCount = Object.entries(activeFilters).reduce((count, [key, filter]) => {
    if (key === 'priceRange') {
      const [min, max] = filter as [number, number]
      return count + (min > 0 || max < 1000 ? 1 : 0)
    }
    if (Array.isArray(filter)) return count + filter.length
    if (typeof filter === 'boolean') return count + (filter ? 1 : 0)
    return count
  }, 0)

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5
    const halfVisible = Math.floor(maxVisible / 2)
    
    let start = Math.max(1, currentPage - halfVisible)
    let end = Math.min(totalPages, start + maxVisible - 1)
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1)
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    return pages
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 bg-navy flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gold mx-auto mb-6"></div>
          <p className="text-ivory text-lg">Loading products...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 bg-navy">
        <div className="container-custom py-16 text-center">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-serif text-red-400 mb-4">Something went wrong</h2>
            <p className="mb-8 text-ivory/80">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn-primary bg-red-500 hover:bg-red-600"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  const formattedInstrumentName = instrument?.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')

  return (
    <div className="min-h-screen pt-24 bg-navy">
      <div className="container-custom py-16">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-serif text-gold mb-4 bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent">
              {formattedInstrumentName}
            </h1>
            <p className="text-ivory/80 max-w-2xl mx-auto text-lg leading-relaxed">
              Browse our collection of authentic {formattedInstrumentName?.toLowerCase()}s. Each piece is handcrafted for optimal sound quality.
            </p>
          </div>
        </AnimatedSection>

        {/* Enhanced Search and Controls */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-ivory/60 w-6 h-6" />
            <input
              type="text"
              placeholder={`Search ${formattedInstrumentName?.toLowerCase()}s...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-charcoal/30 border border-ivory/20 rounded-xl text-ivory placeholder-ivory/60 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
            />
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Filter Toggle with Badge */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`relative flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 ${
                isFilterOpen ? 'bg-gold text-charcoal shadow-lg' : 'bg-charcoal/50 text-ivory hover:bg-charcoal/70'
              }`}
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
              {activeFilterCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold animate-pulse">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <div className="flex items-center gap-4">
              {/* View Mode Toggle */}
              <div className="flex rounded-xl overflow-hidden border border-ivory/20 bg-charcoal/30">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 transition-all ${
                    viewMode === 'grid' ? 'bg-gold text-charcoal' : 'text-ivory hover:bg-charcoal/50'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 transition-all ${
                    viewMode === 'list' ? 'bg-gold text-charcoal' : 'text-ivory hover:bg-charcoal/50'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-3 bg-charcoal/50 border border-ivory/20 rounded-xl text-ivory focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
              >
                <option value="featured">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating-high-low">Rating: High to Low</option>
                <option value="name-a-z">Name: A to Z</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Enhanced Advanced Filters */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              className="mb-12 bg-gradient-to-r from-charcoal/40 to-charcoal/60 rounded-2xl p-8 border border-ivory/10 shadow-2xl backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-serif text-gold flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Advanced Filters
                </h3>
                <button
                  onClick={resetFilters}
                  className="text-ivory/60 hover:text-ivory transition-colors flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {/* Size Filter */}
                {filterOptions.sizes && filterOptions.sizes.length > 0 && (
                  <div className="bg-navy/30 rounded-xl p-4">
                    <h4 className="font-medium text-ivory mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-gold rounded-full"></span>
                      Size
                    </h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {filterOptions.sizes.map(size => (
                        <label key={size} className="flex items-center space-x-2 cursor-pointer hover:bg-ivory/5 p-1 rounded">
                          <input
                            type="checkbox"
                            checked={activeFilters.sizes.includes(size)}
                            onChange={() => toggleArrayFilter('sizes', size)}
                            className="rounded border-ivory/20 text-gold focus:ring-gold"
                          />
                          <span className="text-ivory/80">{size}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Type Filter */}
                {filterOptions.types && filterOptions.types.length > 0 && (
                  <div className="bg-navy/30 rounded-xl p-4">
                    <h4 className="font-medium text-ivory mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-gold rounded-full"></span>
                      Type
                    </h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {filterOptions.types.map(type => (
                        <label key={type} className="flex items-center space-x-2 cursor-pointer hover:bg-ivory/5 p-1 rounded">
                          <input
                            type="checkbox"
                            checked={activeFilters.types.includes(type)}
                            onChange={() => toggleArrayFilter('types', type)}
                            className="rounded border-ivory/20 text-gold focus:ring-gold"
                          />
                          <span className="text-ivory/80">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tone Filter */}
                {filterOptions.tones && filterOptions.tones.length > 0 && (
                  <div className="bg-navy/30 rounded-xl p-4">
                    <h4 className="font-medium text-ivory mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-gold rounded-full"></span>
                      Tone
                    </h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {filterOptions.tones.map(tone => (
                        <label key={tone} className="flex items-center space-x-2 cursor-pointer hover:bg-ivory/5 p-1 rounded">
                          <input
                            type="checkbox"
                            checked={activeFilters.tones.includes(tone)}
                            onChange={() => toggleArrayFilter('tones', tone)}
                            className="rounded border-ivory/20 text-gold focus:ring-gold"
                          />
                          <span className="text-ivory/80">{tone}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price Range */}
                <div className="bg-navy/30 rounded-xl p-4">
                  <h4 className="font-medium text-ivory mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-gold rounded-full"></span>
                    Price Range
                  </h4>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={activeFilters.priceRange[1]}
                      onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
                      className="w-full accent-gold"
                    />
                    <div className="flex justify-between text-sm text-ivory/60">
                      <span>$0</span>
                      <span>${activeFilters.priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Stock Filter */}
                <div className="bg-navy/30 rounded-xl p-4">
                  <h4 className="font-medium text-ivory mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-gold rounded-full"></span>
                    Availability
                  </h4>
                  <label className="flex items-center space-x-2 cursor-pointer hover:bg-ivory/5 p-1 rounded">
                    <input
                      type="checkbox"
                      checked={activeFilters.inStock}
                      onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                      className="rounded border-ivory/20 text-gold focus:ring-gold"
                    />
                    <span className="text-ivory/80">In Stock Only</span>
                  </label>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-8 px-4 py-3 bg-charcoal/20 rounded-xl">
          <p className="text-ivory/70 text-sm">
            Showing {((currentPage - 1) * PRODUCTS_PER_PAGE) + 1}-{Math.min(currentPage * PRODUCTS_PER_PAGE, filteredAndSortedProducts.length)} of {filteredAndSortedProducts.length} products
          </p>
          <div className="text-ivory/70 text-sm">
            Page {currentPage} of {totalPages}
          </div>
        </div>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          {currentProducts.length > 0 ? (
            <motion.div
              key={`${currentPage}-${viewMode}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12"
                : "space-y-6 mb-12"
              }
            >
              {currentProducts.map((product, index) => (
                <motion.div
                  key={product.id || product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05,
                  }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="bg-charcoal/30 rounded-2xl p-12 max-w-md mx-auto">
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="text-xl font-serif text-gold mb-4">No {formattedInstrumentName?.toLowerCase()}s found</h3>
                <p className="text-ivory/80 mb-6">No products match your current criteria</p>
                <button onClick={resetFilters} className="btn-primary">
                  Clear All Filters
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center mb-12">
            <div className="bg-charcoal/30 rounded-2xl p-4 flex items-center space-x-2">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-3 rounded-xl bg-navy/50 text-ivory hover:bg-navy/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all disabled:hover:bg-navy/50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* First Page */}
              {currentPage > 3 && (
                <>
                  <button
                    onClick={() => setCurrentPage(1)}
                    className="px-4 py-2 rounded-xl bg-navy/50 text-ivory hover:bg-navy/70 transition-all"
                  >
                    1
                  </button>
                  {currentPage > 4 && (
                    <span className="px-2 text-ivory/60">...</span>
                  )}
                </>
              )}

              {/* Page Numbers */}
              {getPageNumbers().map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-xl transition-all font-medium ${
                    currentPage === page
                      ? 'bg-gold text-charcoal shadow-lg transform scale-105'
                      : 'bg-navy/50 text-ivory hover:bg-navy/70'
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* Last Page */}
              {currentPage < totalPages - 2 && (
                <>
                  {currentPage < totalPages - 3 && (
                    <span className="px-2 text-ivory/60">...</span>
                  )}
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className="px-4 py-2 rounded-xl bg-navy/50 text-ivory hover:bg-navy/70 transition-all"
                  >
                    {totalPages}
                  </button>
                </>
              )}

              {/* Next Button */}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-3 rounded-xl bg-navy/50 text-ivory hover:bg-navy/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all disabled:hover:bg-navy/50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Enhanced Free Shipping Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-gold via-yellow-400 to-gold p-6 rounded-2xl text-center shadow-2xl"
        >
          <div className="flex items-center justify-center gap-3 text-charcoal font-medium text-lg">
            <span className="text-2xl">✨</span>
            <span>Free worldwide shipping on all orders over $100</span>
            <span className="text-2xl">✨</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default SoundInstrumentPage