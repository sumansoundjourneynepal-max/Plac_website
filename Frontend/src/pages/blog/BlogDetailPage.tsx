// // pages/blog/BlogDetailPage.tsx
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// interface BlogPost {
//   title: string;
//   content: string;
//   excerpt: string;
//   featuredImage: string;
//   category: string;
//   publishedAt: string;
//   slug: string;
// }

// const BlogDetailPage: React.FC = () => {
//   const { slug } = useParams();
//   const [blog, setBlog] = useState<BlogPost | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!slug) return;

//     fetch(`http://localhost:5000/api/blogs/${slug}`)
//       .then((res) => {
//         if (!res.ok) throw new Error("Blog not found");
//         return res.json();
//       })
//       .then((data) => {
//         setBlog(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setError("Failed to load blog");
//         setLoading(false);
//       });
//   }, [slug]);

//   if (loading) return <p className="text-center py-20">Loading...</p>;
//   if (error) return <p className="text-center text-red-500 py-20">{error}</p>;
//   if (!blog) return <p className="text-center py-20">Blog not found</p>;

//   return (
//     <div className="bg-navy text-ivory min-h-screen pt-28 pb-16">
//       {/* Big Banner Image */}
//       {blog.featuredImage && (
//         <div className="w-full h-[350px] md:h-[450px] overflow-hidden">
//           <img
//             src={blog.featuredImage}
//             alt={blog.title}
//             className="w-full h-full object-cover"
//           />
//         </div>
//       )}

//       {/* Blog Content */}
//       <div className="container-custom max-w-3xl mx-auto mt-12 px-4">
//         <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-gold leading-tight">
//           {blog.title}
//         </h1>

//         <p className="text-sm text-ivory/70 mb-10">
//           {blog.publishedAt
//             ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
//                 year: "numeric",
//                 month: "long",
//                 day: "numeric",
//               })
//             : "Not published"}{" "}
//           • {blog.category}
//         </p>

//         <div
//           className="blog-content prose prose-invert prose-lg max-w-none leading-relaxed"
//           dangerouslySetInnerHTML={{ __html: blog.content }}
//         ></div>
//       </div>
//     </div>
//   );
// };

// export default BlogDetailPage;

// pages/blog/BlogDetailPage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// DECLARE API_BASE
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

interface BlogPost {
  title: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  category: string;
  publishedAt: string;
  slug: string;
}

const BlogDetailPage: React.FC = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    // UPDATED: Use API_BASE
    fetch(`${API_BASE}/blogs/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Blog not found");
        return res.json();
      })
      .then((data) => {
        setBlog(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load blog");
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (error) return <p className="text-center text-red-500 py-20">{error}</p>;
  if (!blog) return <p className="text-center py-20">Blog not found</p>;

  return (
    <div className="bg-navy text-ivory min-h-screen pt-28 pb-16">
      {/* Big Banner Image */}
      {blog.featuredImage && (
        <div className="w-full h-[350px] md:h-[450px] overflow-hidden">
          <img
            src={blog.featuredImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Blog Content */}
      <div className="container-custom max-w-3xl mx-auto mt-12 px-4">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-gold leading-tight">
          {blog.title}
        </h1>

        <p className="text-sm text-ivory/70 mb-10">
          {blog.publishedAt
            ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Not published"}{" "}
          • {blog.category}
        </p>

        <div
          className="blog-content prose prose-invert prose-lg max-w-none leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></div>
      </div>
    </div>
  );
};

export default BlogDetailPage;