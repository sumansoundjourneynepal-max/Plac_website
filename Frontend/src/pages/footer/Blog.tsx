// import React, { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import { Calendar, ArrowRight } from "lucide-react"
// import SEOHelmet from "../../components/seo/SEOHelmet"
// import { useSEOData } from "../../hooks/useSEOData"

// interface BlogPost {
//   _id: string
//   title: string
//   excerpt: string
//   date: string // mapped from publishedAt or createdAt
//   category: string
//   image: string
//   slug: string
// }

// const BlogPostCard: React.FC<{ post: BlogPost }> = ({ post }) => {
//   const [isHovered, setIsHovered] = useState(false)

//   return (
//     <motion.a
//       href={`/blog/${post.slug}`}
//       className="block bg-navy/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gold/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
//       onHoverStart={() => setIsHovered(true)}
//       onHoverEnd={() => setIsHovered(false)}
//     >
//       <div className="relative overflow-hidden">
//         <img
//           src={post.image || "/placeholder.svg"}
//           alt={post.title}
//           className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
//         />
//         <motion.div
//           className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: isHovered ? 1 : 0 }}
//           transition={{ duration: 0.3 }}
//         />
//         <motion.div
//           className="absolute bottom-4 left-4 bg-gold text-navy px-4 py-1 rounded-full text-sm font-semibold"
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
//           transition={{ duration: 0.3 }}
//         >
//           {post.category}
//         </motion.div>
//       </div>
//       <div className="p-6">
//         <h3 className="text-2xl font-semibold text-gold mb-3 group-hover:text-yellow-300 transition-colors">
//           {post.title}
//         </h3>
//         <p className="text-ivory/80 text-base leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
//         <div className="flex items-center justify-between text-ivory/60 text-sm">
//           <div className="flex items-center gap-2">
//             <Calendar className="w-4 h-4" />
//             <span>{post.date}</span> {/* Already formatted as string */}
//           </div>
//           <motion.div
//             className="flex items-center gap-2 text-gold group-hover:text-yellow-300"
//             initial={{ x: 0 }}
//             animate={{ x: isHovered ? 5 : 0 }}
//             transition={{ duration: 0.2 }}
//           >
//             Read More <ArrowRight className="w-4 h-4" />
//           </motion.div>
//         </div>
//       </div>
//     </motion.a>
//   )
// }

// const BlogPage: React.FC = () => {
//   const { seoData } = useSEOData("/blog")

//   const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     fetch("http://localhost:5000/api/blogs")
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch blogs")
//         return res.json()
//       })
//       .then((data) => {
//         // Map backend data to frontend model
//         const mappedPosts: BlogPost[] = data.map((blog: any) => ({
//           _id: blog._id,
//           title: blog.title,
//           excerpt: blog.excerpt,
//           slug: blog.slug,
//           category: blog.category,
//           image: blog.featuredImage || "/placeholder.svg",
//           date: blog.publishedAt
//             ? new Date(blog.publishedAt).toLocaleDateString()
//             : new Date(blog.createdAt).toLocaleDateString(),
//         }))

//         setBlogPosts(mappedPosts)
//         setLoading(false)
//       })
//       .catch((err) => {
//         console.error(err)
//         setError("Failed to load blogs")
//         setLoading(false)
//       })
//   }, [])

//   const defaultSEO = {
//     title: "Blog - Insights & Wisdom | OMSound Nepal",
//     description: "Explore articles on sound healing, meditation, Himalayan culture, and the art of singing bowls.",
//     keywords: ["sound healing blog", "meditation articles", "singing bowls insights", "himalayan culture"],
//     ogImage: "/images/blog-hero.jpg",
//   }

//   const currentSEO = seoData || defaultSEO

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-navy via-indigo-900 to-purple-900 text-ivory pt-24">
//       <SEOHelmet
//         title={currentSEO.title}
//         description={currentSEO.description}
//         keywords={currentSEO.keywords}
//         image={currentSEO.ogImage}
//         type="website"
//         structuredData={seoData?.structuredData}
//         url="https://omsoundnepal.com/blog"
//       />

//       {/* Hero Section */}
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="relative py-20 text-center overflow-hidden"
//       >
//         <div className="absolute inset-0 bg-gradient-to-r from-gold/10 to-yellow-300/10 animate-pulse" />
//         <div className="container-custom relative z-10">
//           <h1 className="text-6xl md:text-8xl font-serif mb-6 bg-gradient-to-r from-gold via-yellow-300 to-gold bg-clip-text text-transparent">
//             Insights & Wisdom
//           </h1>
//           <p className="text-xl md:text-2xl text-ivory/80 max-w-3xl mx-auto">
//             Explore our blog for articles on sound healing, meditation, Himalayan culture, and the art of singing bowls.
//           </p>
//         </div>
//       </motion.div>

//       {/* Blog Posts Grid */}
//       <div className="container-custom py-16">
//         {loading ? (
//           <p className="text-center text-ivory">Loading blogs...</p>
//         ) : error ? (
//           <p className="text-center text-red-500">{error}</p>
//         ) : blogPosts.length === 0 ? (
//           <p className="text-center text-ivory">No blogs available</p>
//         ) : (
//           <motion.div
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
//             initial="hidden"
//             animate="visible"
//             variants={{
//               hidden: { opacity: 0 },
//               visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
//             }}
//           >
//             {blogPosts.map((post) => (
//               <motion.div
//                 key={post._id}
//                 variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <BlogPostCard post={post} />
//               </motion.div>
//             ))}
//           </motion.div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default BlogPage


import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, ArrowRight } from "lucide-react"
import SEOHelmet from "../../components/seo/SEOHelmet"
import { useSEOData } from "../../hooks/useSEOData"

// DECLARE API_BASE
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

interface BlogPost {
  _id: string
  title: string
  excerpt: string
  date: string // mapped from publishedAt or createdAt
  category: string
  image: string
  slug: string
}

const BlogPostCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.a
      href={`/blog/${post.slug}`}
      className="block bg-navy/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gold/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <img
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute bottom-4 left-4 bg-gold text-navy px-4 py-1 rounded-full text-sm font-semibold"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.3 }}
        >
          {post.category}
        </motion.div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gold mb-3 group-hover:text-yellow-300 transition-colors">
          {post.title}
        </h3>
        <p className="text-ivory/80 text-base leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
        <div className="flex items-center justify-between text-ivory/60 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{post.date}</span> {/* Already formatted as string */}
          </div>
          <motion.div
            className="flex items-center gap-2 text-gold group-hover:text-yellow-300"
            initial={{ x: 0 }}
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.2 }}
          >
            Read More <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>
      </div>
    </motion.a>
  )
}

const BlogPage: React.FC = () => {
  const { seoData } = useSEOData("/blog")

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // UPDATED: Use API_BASE
    fetch(`${API_BASE}/blogs`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch blogs")
        return res.json()
      })
      .then((data) => {
        // Map backend data to frontend model
        const mappedPosts: BlogPost[] = data.map((blog: any) => ({
          _id: blog._id,
          title: blog.title,
          excerpt: blog.excerpt,
          slug: blog.slug,
          category: blog.category,
          image: blog.featuredImage || "/placeholder.svg",
          date: blog.publishedAt
            ? new Date(blog.publishedAt).toLocaleDateString()
            : new Date(blog.createdAt).toLocaleDateString(),
        }))

        setBlogPosts(mappedPosts)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError("Failed to load blogs")
        setLoading(false)
      })
  }, [])

  const defaultSEO = {
    title: "Blog - Insights & Wisdom | OMSound Nepal",
    description: "Explore articles on sound healing, meditation, Himalayan culture, and the art of singing bowls.",
    keywords: ["sound healing blog", "meditation articles", "singing bowls insights", "himalayan culture"],
    ogImage: "/images/blog-hero.jpg",
  }

  const currentSEO = seoData || defaultSEO

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-indigo-900 to-purple-900 text-ivory pt-24">
      <SEOHelmet
        title={currentSEO.title}
        description={currentSEO.description}
        keywords={currentSEO.keywords}
        image={currentSEO.ogImage}
        type="website"
        structuredData={seoData?.structuredData}
        url="https://omsoundnepal.com/blog"
      />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative py-20 text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gold/10 to-yellow-300/10 animate-pulse" />
        <div className="container-custom relative z-10">
          <h1 className="text-6xl md:text-8xl font-serif mb-6 bg-gradient-to-r from-gold via-yellow-300 to-gold bg-clip-text text-transparent">
            Insights & Wisdom
          </h1>
          <p className="text-xl md:text-2xl text-ivory/80 max-w-3xl mx-auto">
            Explore our blog for articles on sound healing, meditation, Himalayan culture, and the art of singing bowls.
          </p>
        </div>
      </motion.div>

      {/* Blog Posts Grid */}
      <div className="container-custom py-16">
        {loading ? (
          <p className="text-center text-ivory">Loading blogs...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : blogPosts.length === 0 ? (
          <p className="text-center text-ivory">No blogs available</p>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
          >
            {blogPosts.map((post) => (
              <motion.div
                key={post._id}
                variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5 }}
              >
                <BlogPostCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default BlogPage
