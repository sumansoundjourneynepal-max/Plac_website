// "use client";

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import {
//   Newspaper,
//   Mic,
//   ChevronRight,
//   Link as LinkIcon,
// } from "lucide-react";
// import { Link } from "react-router-dom";
// import SEOHelmet from "../../components/seo/SEOHelmet";

// interface PressRelease {
//   _id: string;
//   title: string;
//   excerpt: string;
//   date: string;
//   slug: string;
// }

// interface MediaMention {
//   _id: string;
//   source: string;
//   title: string;
//   date: string;
//   slug: string;
// }

// const formatDate = (date: string) =>
//   new Date(date).toLocaleDateString("en-US");

// const PressMediaPage: React.FC = () => {
//   const [pressReleases, setPressReleases] = useState<PressRelease[]>([]);
//   const [mediaMentions, setMediaMentions] = useState<MediaMention[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     Promise.all([
//       fetch("http://localhost:5000/api/press?type=press").then(res => res.json()),
//       fetch("http://localhost:5000/api/press?type=media").then(res => res.json()),
//     ])
//       .then(([pressData, mediaData]) => {
//         setPressReleases(
//           pressData.map((item: any) => ({
//             _id: item._id,
//             title: item.title,
//             excerpt: item.excerpt,
//             slug: item.slug,
//             date: formatDate(item.publishedAt || item.createdAt),
//           }))
//         );

//         setMediaMentions(
//           mediaData.map((item: any) => ({
//             _id: item._id,
//             source: item.source || "Media Source",
//             title: item.title,
//             slug: item.slug,
//             date: formatDate(item.publishedAt || item.createdAt),
//           }))
//         );

//         setLoading(false);
//       })
//       .catch(err => {
//         console.error(err);
//         setError("Failed to load press & media data");
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-navy via-indigo-900 to-purple-900 text-ivory pt-24">
//       <SEOHelmet
//         title="Press & Media - OMSound Nepal"
//         description="Official press releases and media coverage of OMSound Nepal."
//         keywords={["press", "media", "OMSound Nepal"]}
//         image="/images/press-hero.jpg"
//         type="website"
//         url="https://omsoundnepal.com/press"
//       />

//       {/* HERO */}
//       <div className="container-custom text-center py-20">
//         <h1 className="text-6xl md:text-8xl font-serif text-gold mb-6">
//           Press & Media
//         </h1>
//         <p className="text-xl text-ivory/80 max-w-3xl mx-auto">
//           Official announcements, press releases & media coverage.
//         </p>
//       </div>

//       {/* PRESS RELEASES */}
//       <div className="container-custom py-16">
//         <h2 className="text-5xl font-serif text-center text-gold mb-16">
//           Latest Press Releases
//         </h2>

//         {loading && <p className="text-center">Loading...</p>}
//         {error && <p className="text-center text-red-500">{error}</p>}

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//           {pressReleases.map((release, index) => (
//             <motion.div
//               key={release._id}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.1 }}
//               className="bg-navy/50 p-8 rounded-2xl border border-gold/20"
//             >
//               <h3 className="text-3xl font-semibold text-gold mb-3">
//                 {release.title}
//               </h3>

//               <p className="text-sm text-ivory/70 flex items-center gap-2 mb-4">
//                 <Newspaper className="w-4 h-4" />
//                 {release.date}
//               </p>

//               <p className="text-ivory/80 mb-6 line-clamp-4">
//                 {release.excerpt}
//               </p>

//               <Link
//                 to={`/press/${release.slug}`}
//                 className="inline-flex items-center gap-2 text-gold hover:text-yellow-300 font-semibold"
//               >
//                 Read Full Release <ChevronRight className="w-5 h-5" />
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* MEDIA MENTIONS */}
//       <div className="container-custom py-16">
//         <h2 className="text-5xl font-serif text-center text-gold mb-16">
//           In The Media
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//           {mediaMentions.map((mention, index) => (
//             <motion.div
//               key={mention._id}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.1 }}
//               className="bg-navy/50 p-8 rounded-2xl border border-gold/20"
//             >
//               <div className="flex items-center gap-4 mb-4">
//                 <Mic className="w-8 h-8 text-gold" />
//                 <div>
//                   <h3 className="text-xl text-gold">{mention.source}</h3>
//                   <p className="text-sm text-ivory/70">{mention.date}</p>
//                 </div>
//               </div>

//               <p className="text-ivory/80 mb-6">{mention.title}</p>

//               <Link
//                 to={`/press/${mention.slug}`}
//                 className="inline-flex items-center gap-2 text-gold hover:text-yellow-300 font-semibold"
//               >
//                 View Coverage <LinkIcon className="w-4 h-4" />
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PressMediaPage;

"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Newspaper,
  Mic,
  ChevronRight,
  Link as LinkIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import SEOHelmet from "../../components/seo/SEOHelmet";

// DECLARE API_BASE
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

interface PressRelease {
  _id: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
}

interface MediaMention {
  _id: string;
  source: string;
  title: string;
  date: string;
  slug: string;
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US");

const PressMediaPage: React.FC = () => {
  const [pressReleases, setPressReleases] = useState<PressRelease[]>([]);
  const [mediaMentions, setMediaMentions] = useState<MediaMention[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // UPDATED: Use API_BASE
    Promise.all([
      fetch(`${API_BASE}/press?type=press`).then(res => res.json()),
      fetch(`${API_BASE}/press?type=media`).then(res => res.json()),
    ])
      .then(([pressData, mediaData]) => {
        setPressReleases(
          pressData.map((item: any) => ({
            _id: item._id,
            title: item.title,
            excerpt: item.excerpt,
            slug: item.slug,
            date: formatDate(item.publishedAt || item.createdAt),
          }))
        );

        setMediaMentions(
          mediaData.map((item: any) => ({
            _id: item._id,
            source: item.source || "Media Source",
            title: item.title,
            slug: item.slug,
            date: formatDate(item.publishedAt || item.createdAt),
          }))
        );

        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load press & media data");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-indigo-900 to-purple-900 text-ivory pt-24">
      <SEOHelmet
        title="Press & Media - OMSound Nepal"
        description="Official press releases and media coverage of OMSound Nepal."
        keywords={["press", "media", "OMSound Nepal"]}
        image="/images/press-hero.jpg"
        type="website"
        url="https://omsoundnepal.com/press"
      />

      {/* HERO */}
      <div className="container-custom text-center py-20">
        <h1 className="text-6xl md:text-8xl font-serif text-gold mb-6">
          Press & Media
        </h1>
        <p className="text-xl text-ivory/80 max-w-3xl mx-auto">
          Official announcements, press releases & media coverage.
        </p>
      </div>

      {/* PRESS RELEASES */}
      <div className="container-custom py-16">
        <h2 className="text-5xl font-serif text-center text-gold mb-16">
          Latest Press Releases
        </h2>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {pressReleases.map((release, index) => (
            <motion.div
              key={release._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-navy/50 p-8 rounded-2xl border border-gold/20"
            >
              <h3 className="text-3xl font-semibold text-gold mb-3">
                {release.title}
              </h3>

              <p className="text-sm text-ivory/70 flex items-center gap-2 mb-4">
                <Newspaper className="w-4 h-4" />
                {release.date}
              </p>

              <p className="text-ivory/80 mb-6 line-clamp-4">
                {release.excerpt}
              </p>

              <Link
                to={`/press/${release.slug}`}
                className="inline-flex items-center gap-2 text-gold hover:text-yellow-300 font-semibold"
              >
                Read Full Release <ChevronRight className="w-5 h-5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MEDIA MENTIONS */}
      <div className="container-custom py-16">
        <h2 className="text-5xl font-serif text-center text-gold mb-16">
          In The Media
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {mediaMentions.map((mention, index) => (
            <motion.div
              key={mention._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-navy/50 p-8 rounded-2xl border border-gold/20"
            >
              <div className="flex items-center gap-4 mb-4">
                <Mic className="w-8 h-8 text-gold" />
                <div>
                  <h3 className="text-xl text-gold">{mention.source}</h3>
                  <p className="text-sm text-ivory/70">{mention.date}</p>
                </div>
              </div>

              <p className="text-ivory/80 mb-6">{mention.title}</p>

              <Link
                to={`/press/${mention.slug}`}
                className="inline-flex items-center gap-2 text-gold hover:text-yellow-300 font-semibold"
              >
                View Coverage <LinkIcon className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PressMediaPage;
