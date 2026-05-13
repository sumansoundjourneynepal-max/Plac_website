
 
// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";

// interface PressDetail {
//   title: string;
//   content: string;
//   publishedAt?: string;
//   createdAt?: string;
// }

// const PressDetailPage = () => {
//   const { slug } = useParams<{ slug: string }>();
//   const [data, setData] = useState<PressDetail | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!slug) return;

//     fetch(`http://localhost:5000/api/press/${slug}`)
//       .then((res) => res.json())
//       .then((res) => {
//         setData(res);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, [slug]);

//   if (loading) return <p className="text-center py-20">Loading...</p>;
//   if (!data) return <p className="text-center py-20">Not Found</p>;

//   const dateValue = data.publishedAt || data.createdAt;

//   return (
//     <div className="max-w-4xl mx-auto py-24 px-6">
//       <Link to="/press" className="text-gold mb-6 inline-block">
//         ← Back to Press
//       </Link>

//       <h1 className="text-4xl font-serif mb-4">{data.title}</h1>

//       {dateValue && (
//         <p className="text-sm text-gray-500 mb-10">
//           {new Date(dateValue).toLocaleDateString("en-US")}
//         </p>
//       )}

//       <div
//         className="prose max-w-none"
//         dangerouslySetInnerHTML={{ __html: data.content }}
//       />
//     </div>
//   );
// };

// export default PressDetailPage;


import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// DECLARE API_BASE
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

interface PressDetail {
  title: string;
  content: string;
  publishedAt?: string;
  createdAt?: string;
}

const PressDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<PressDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    // UPDATED: Use API_BASE
    fetch(`${API_BASE}/press/${slug}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (!data) return <p className="text-center py-20">Not Found</p>;

  const dateValue = data.publishedAt || data.createdAt;

  return (
    <div className="max-w-4xl mx-auto py-24 px-6">
      <Link to="/press" className="text-gold mb-6 inline-block">
        ← Back to Press
      </Link>

      <h1 className="text-4xl font-serif mb-4">{data.title}</h1>

      {dateValue && (
        <p className="text-sm text-gray-500 mb-10">
          {new Date(dateValue).toLocaleDateString("en-US")}
        </p>
      )}

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </div>
  );
};

export default PressDetailPage;
