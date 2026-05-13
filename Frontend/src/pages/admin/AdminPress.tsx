// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Plus, Newspaper, Link as LinkIcon } from "lucide-react";
// import DataTable from "../../components/admin/DataTable";
// import RichTextEditor from "../../components/admin/RichTextEditor";
// import { useAdminAuth } from "../../context/AdminAuthContext";

// interface PressItem {
//   id: string;
//   _id?: string;
//   title: string;
//   slug: string;
//   excerpt: string;
//   content: string;
//   featuredImage: string;
//   externalLink?: string;
//   type: "press" | "media";
//   status: "draft" | "published" | "archived";
//   createdAt: string;
//   publishedAt?: string;
// }

// // Define API response types
// interface PressApiResponse {
//   _id: string;
//   title: string;
//   slug: string;
//   excerpt: string;
//   content: string;
//   featuredImage: string;
//   externalLink?: string;
//   type: "press" | "media";
//   status: "draft" | "published" | "archived";
//   createdAt: string;
//   updatedAt?: string;
//   publishedAt?: string;
// }

// const AdminPress: React.FC = () => {
//   const { hasPermission } = useAdminAuth();

//   const [items, setItems] = useState<PressItem[]>([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editingItem, setEditingItem] = useState<PressItem | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const [formData, setFormData] = useState<Partial<PressItem>>({
//     title: "",
//     slug: "",
//     excerpt: "",
//     content: "",
//     featuredImage: "",
//     externalLink: "",
//     type: "press",
//     status: "draft",
//   });

//   /* ----------------------------------
//      Fetch Press Items
//   ---------------------------------- */
//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const fetchItems = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await axios.get<PressApiResponse[]>("http://localhost:5000/api/admin/press", {
//         withCredentials: true,
//       });
      
//       // Transform the API response to match our PressItem interface
//       const transformedItems: PressItem[] = res.data.map((item: PressApiResponse) => ({
//         id: item._id,
//         _id: item._id,
//         title: item.title,
//         slug: item.slug,
//         excerpt: item.excerpt,
//         content: item.content,
//         featuredImage: item.featuredImage,
//         externalLink: item.externalLink,
//         type: item.type,
//         status: item.status,
//         createdAt: item.createdAt,
//         publishedAt: item.publishedAt,
//       }));
      
//       setItems(transformedItems);
//     } catch (err: any) {
//       console.error("Failed to fetch press items", err);
//       setError(err.response?.data?.message || "Failed to fetch press items. Please check if the backend server is running.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ----------------------------------
//      Table Columns
//   ---------------------------------- */
//   const columns = [
//     {
//       key: "featuredImage",
//       label: "Image",
//       render: (img: string) =>
//         img ? (
//           <img src={img} alt="Featured" className="w-12 h-12 rounded object-cover" />
//         ) : (
//           <div className="w-12 h-12 rounded bg-gray-200 flex items-center justify-center">
//             <Newspaper size={20} className="text-gray-400" />
//           </div>
//         ),
//     },
//     { 
//       key: "title", 
//       label: "Title", 
//       sortable: true,
//       truncate: true,
//       width: "300px"
//     },
//     {
//       key: "type",
//       label: "Type",
//       width: "100px",
//       render: (type: string) => (
//         <span className="capitalize px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
//           {type}
//         </span>
//       ),
//     },
//     {
//       key: "status",
//       label: "Status",
//       width: "120px",
//       render: (status: string) => {
//         let bgColor = "bg-gray-100";
//         let textColor = "text-gray-700";
        
//         if (status === "published") {
//           bgColor = "bg-green-100";
//           textColor = "text-green-700";
//         } else if (status === "draft") {
//           bgColor = "bg-yellow-100";
//           textColor = "text-yellow-700";
//         } else if (status === "archived") {
//           bgColor = "bg-red-100";
//           textColor = "text-red-700";
//         }
        
//         return (
//           <span
//             className={`px-2 py-1 rounded-full text-xs font-semibold ${bgColor} ${textColor}`}
//           >
//             {status}
//           </span>
//         );
//       },
//     },
//     {
//       key: "createdAt",
//       label: "Created",
//       width: "150px",
//       render: (d: string) => new Date(d).toLocaleDateString(),
//     },
//   ];

//   /* ----------------------------------
//      Actions
//   ---------------------------------- */
//   const handleEdit = (item: PressItem) => {
//     setEditingItem(item);
//     setFormData(item);
//     setShowModal(true);
//   };

//   const handleDelete = async (item: PressItem) => {
//     if (!confirm(`Are you sure you want to delete "${item.title}"? This action cannot be undone.`)) return;

//     try {
//       await axios.delete(
//         `http://localhost:5000/api/admin/press/${item.id}`,
//         { withCredentials: true }
//       );
//       setItems((prev) => prev.filter((i) => i.id !== item.id));
//       alert("Press item deleted successfully!");
//     } catch (err: any) {
//       console.error("Delete failed:", err);
//       alert(err.response?.data?.message || "Failed to delete press item. Please try again.");
//     }
//   };

//   const handleView = (item: PressItem) => {
//     window.open(`/press/${item.slug}`, "_blank");
//   };

//   /* ----------------------------------
//      Form Helpers
//   ---------------------------------- */
//   useEffect(() => {
//     if (!editingItem && formData.title) {
//       setFormData((prev) => ({
//         ...prev,
//         slug: prev.title
//           ?.toLowerCase()
//           .replace(/[^a-z0-9]+/g, "-")
//           .replace(/(^-|-$)/g, ""),
//       }));
//     }
//   }, [formData.title, editingItem]);

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       if (editingItem) {
//         const res = await axios.put<PressApiResponse>(
//           `http://localhost:5000/api/admin/press/${editingItem.id}`,
//           formData,
//           { withCredentials: true }
//         );

//         // Transform the response to match PressItem
//         const updatedItem: PressItem = {
//           id: res.data._id,
//           title: res.data.title,
//           slug: res.data.slug,
//           excerpt: res.data.excerpt,
//           content: res.data.content,
//           featuredImage: res.data.featuredImage,
//           externalLink: res.data.externalLink,
//           type: res.data.type,
//           status: res.data.status,
//           createdAt: res.data.createdAt,
//           publishedAt: res.data.publishedAt,
//         };

//         setItems((prev) =>
//           prev.map((i) => (i.id === editingItem.id ? updatedItem : i))
//         );
//         alert("Press item updated successfully!");
//       } else {
//         const res = await axios.post<PressApiResponse>(
//           "http://localhost:5000/api/admin/press",
//           formData,
//           { withCredentials: true }
//         );
        
//         // Transform the response to match PressItem
//         const newItem: PressItem = {
//           id: res.data._id,
//           title: res.data.title,
//           slug: res.data.slug,
//           excerpt: res.data.excerpt,
//           content: res.data.content,
//           featuredImage: res.data.featuredImage,
//           externalLink: res.data.externalLink,
//           type: res.data.type,
//           status: res.data.status,
//           createdAt: res.data.createdAt,
//           publishedAt: res.data.publishedAt,
//         };
        
//         setItems((prev) => [newItem, ...prev]);
//         alert("Press item created successfully!");
//       }

//       setShowModal(false);
//       setEditingItem(null);
//       setFormData({
//         title: "",
//         slug: "",
//         excerpt: "",
//         content: "",
//         featuredImage: "",
//         externalLink: "",
//         type: "press",
//         status: "draft",
//       });
//     } catch (err: any) {
//       console.error("Save failed:", err);
//       alert(err.response?.data?.message || "Failed to save press item. Please try again.");
//     }
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setEditingItem(null);
//     setFormData({
//       title: "",
//       slug: "",
//       excerpt: "",
//       content: "",
//       featuredImage: "",
//       externalLink: "",
//       type: "press",
//       status: "draft",
//     });
//   };

//   /* ----------------------------------
//      Render
//   ---------------------------------- */
//   return (
//     <div className="space-y-6 p-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Press & Media</h1>
//           <p className="text-gray-600">Manage press releases & media mentions</p>
//         </div>

//         {hasPermission("press.write") && (
//           <button
//             onClick={() => setShowModal(true)}
//             className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//           >
//             <Plus size={16} className="mr-2" />
//             New Press
//           </button>
//         )}
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           {error}
//         </div>
//       )}

//       {/* Loading State */}
//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//         </div>
//       ) : (
//         /* Table */
//         <DataTable
//           data={items}
//           columns={columns}
//           onEdit={handleEdit}
//           onDelete={handleDelete}
//           onView={handleView}
//           searchable
//           filterable
//           searchPlaceholder="Search press items..."
//         />
//       )}

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
//           <div className="bg-white w-full max-w-5xl rounded-lg max-h-[90vh] overflow-y-auto">
//             <div className="p-6 border-b border-gray-200">
//               <h2 className="text-xl font-semibold text-gray-900">
//                 {editingItem ? "Edit Press Item" : "Create Press Item"}
//               </h2>
//             </div>

//             <form onSubmit={handleSubmit} className="p-6 space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Title *
//                 </label>
//                 <input
//                   name="title"
//                   placeholder="Enter title"
//                   value={formData.title || ""}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Slug
//                 </label>
//                 <input
//                   name="slug"
//                   placeholder="auto-generated-slug"
//                   value={formData.slug || ""}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Excerpt
//                 </label>
//                 <textarea
//                   name="excerpt"
//                   placeholder="Brief summary..."
//                   value={formData.excerpt || ""}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   rows={3}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Content *
//                 </label>
//                 <RichTextEditor
//                   value={formData.content || ""}
//                   onChange={(v: string) =>
//                     setFormData((p) => ({ ...p, content: v }))
//                   }
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Featured Image URL
//                 </label>
//                 <input
//                   name="featuredImage"
//                   placeholder="https://example.com/image.jpg"
//                   value={formData.featuredImage || ""}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   External Link (for media mentions)
//                 </label>
//                 <input
//                   name="externalLink"
//                   placeholder="https://example.com/article"
//                   value={formData.externalLink || ""}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Type
//                   </label>
//                   <select
//                     name="type"
//                     value={formData.type}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="press">Press Release</option>
//                     <option value="media">Media Mention</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Status
//                   </label>
//                   <select
//                     name="status"
//                     value={formData.status}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="draft">Draft</option>
//                     <option value="published">Published</option>
//                     <option value="archived">Archived</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="flex justify-end gap-4 border-t border-gray-200 pt-6">
//                 <button
//                   type="button"
//                   onClick={handleCloseModal}
//                   className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//                 >
//                   {editingItem ? "Update" : "Create"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminPress;


"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Newspaper, Link as LinkIcon } from "lucide-react";
import DataTable from "../../components/admin/DataTable";
import RichTextEditor from "../../components/admin/RichTextEditor";
import { useAdminAuth } from "../../context/AdminAuthContext";

// DECLARE API_BASE - Add this line
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

interface PressItem {
  id: string;
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  externalLink?: string;
  type: "press" | "media";
  status: "draft" | "published" | "archived";
  createdAt: string;
  publishedAt?: string;
}

// Define API response types
interface PressApiResponse {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  externalLink?: string;
  type: "press" | "media";
  status: "draft" | "published" | "archived";
  createdAt: string;
  updatedAt?: string;
  publishedAt?: string;
}

const AdminPress: React.FC = () => {
  const { hasPermission } = useAdminAuth();

  const [items, setItems] = useState<PressItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<PressItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<PressItem>>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    externalLink: "",
    type: "press",
    status: "draft",
  });

  /* ----------------------------------
     Fetch Press Items
  ---------------------------------- */
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      // UPDATED: Use API_BASE
      const res = await axios.get<PressApiResponse[]>(`${API_BASE}/admin/press`, {
        withCredentials: true,
      });
      
      // Transform the API response to match our PressItem interface
      const transformedItems: PressItem[] = res.data.map((item: PressApiResponse) => ({
        id: item._id,
        _id: item._id,
        title: item.title,
        slug: item.slug,
        excerpt: item.excerpt,
        content: item.content,
        featuredImage: item.featuredImage,
        externalLink: item.externalLink,
        type: item.type,
        status: item.status,
        createdAt: item.createdAt,
        publishedAt: item.publishedAt,
      }));
      
      setItems(transformedItems);
    } catch (err: any) {
      console.error("Failed to fetch press items", err);
      setError(err.response?.data?.message || "Failed to fetch press items. Please check if the backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  /* ----------------------------------
     Table Columns
  ---------------------------------- */
  const columns = [
    {
      key: "featuredImage",
      label: "Image",
      render: (img: string) =>
        img ? (
          <img src={img} alt="Featured" className="w-12 h-12 rounded object-cover" />
        ) : (
          <div className="w-12 h-12 rounded bg-gray-200 flex items-center justify-center">
            <Newspaper size={20} className="text-gray-400" />
          </div>
        ),
    },
    { 
      key: "title", 
      label: "Title", 
      sortable: true,
      truncate: true,
      width: "300px"
    },
    {
      key: "type",
      label: "Type",
      width: "100px",
      render: (type: string) => (
        <span className="capitalize px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
          {type}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      width: "120px",
      render: (status: string) => {
        let bgColor = "bg-gray-100";
        let textColor = "text-gray-700";
        
        if (status === "published") {
          bgColor = "bg-green-100";
          textColor = "text-green-700";
        } else if (status === "draft") {
          bgColor = "bg-yellow-100";
          textColor = "text-yellow-700";
        } else if (status === "archived") {
          bgColor = "bg-red-100";
          textColor = "text-red-700";
        }
        
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${bgColor} ${textColor}`}
          >
            {status}
          </span>
        );
      },
    },
    {
      key: "createdAt",
      label: "Created",
      width: "150px",
      render: (d: string) => new Date(d).toLocaleDateString(),
    },
  ];

  /* ----------------------------------
     Actions
  ---------------------------------- */
  const handleEdit = (item: PressItem) => {
    setEditingItem(item);
    setFormData(item);
    setShowModal(true);
  };

  const handleDelete = async (item: PressItem) => {
    if (!confirm(`Are you sure you want to delete "${item.title}"? This action cannot be undone.`)) return;

    try {
      // UPDATED: Use API_BASE
      await axios.delete(
        `${API_BASE}/admin/press/${item.id}`,
        { withCredentials: true }
      );
      setItems((prev) => prev.filter((i) => i.id !== item.id));
      alert("Press item deleted successfully!");
    } catch (err: any) {
      console.error("Delete failed:", err);
      alert(err.response?.data?.message || "Failed to delete press item. Please try again.");
    }
  };

  const handleView = (item: PressItem) => {
    window.open(`/press/${item.slug}`, "_blank");
  };

  /* ----------------------------------
     Form Helpers
  ---------------------------------- */
  useEffect(() => {
    if (!editingItem && formData.title) {
      setFormData((prev) => ({
        ...prev,
        slug: prev.title
          ?.toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
      }));
    }
  }, [formData.title, editingItem]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingItem) {
        // UPDATED: Use API_BASE
        const res = await axios.put<PressApiResponse>(
          `${API_BASE}/admin/press/${editingItem.id}`,
          formData,
          { withCredentials: true }
        );

        // Transform the response to match PressItem
        const updatedItem: PressItem = {
          id: res.data._id,
          title: res.data.title,
          slug: res.data.slug,
          excerpt: res.data.excerpt,
          content: res.data.content,
          featuredImage: res.data.featuredImage,
          externalLink: res.data.externalLink,
          type: res.data.type,
          status: res.data.status,
          createdAt: res.data.createdAt,
          publishedAt: res.data.publishedAt,
        };

        setItems((prev) =>
          prev.map((i) => (i.id === editingItem.id ? updatedItem : i))
        );
        alert("Press item updated successfully!");
      } else {
        // UPDATED: Use API_BASE
        const res = await axios.post<PressApiResponse>(
          `${API_BASE}/admin/press`,
          formData,
          { withCredentials: true }
        );
        
        // Transform the response to match PressItem
        const newItem: PressItem = {
          id: res.data._id,
          title: res.data.title,
          slug: res.data.slug,
          excerpt: res.data.excerpt,
          content: res.data.content,
          featuredImage: res.data.featuredImage,
          externalLink: res.data.externalLink,
          type: res.data.type,
          status: res.data.status,
          createdAt: res.data.createdAt,
          publishedAt: res.data.publishedAt,
        };
        
        setItems((prev) => [newItem, ...prev]);
        alert("Press item created successfully!");
      }

      setShowModal(false);
      setEditingItem(null);
      setFormData({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        featuredImage: "",
        externalLink: "",
        type: "press",
        status: "draft",
      });
    } catch (err: any) {
      console.error("Save failed:", err);
      alert(err.response?.data?.message || "Failed to save press item. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      featuredImage: "",
      externalLink: "",
      type: "press",
      status: "draft",
    });
  };

  /* ----------------------------------
     Render
  ---------------------------------- */
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Press & Media</h1>
          <p className="text-gray-600">Manage press releases & media mentions</p>
        </div>

        {hasPermission("press.write") && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} className="mr-2" />
            New Press
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        /* Table */
        <DataTable
          data={items}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          searchable
          filterable
          searchPlaceholder="Search press items..."
        />
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-5xl rounded-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingItem ? "Edit Press Item" : "Create Press Item"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  name="title"
                  placeholder="Enter title"
                  value={formData.title || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug
                </label>
                <input
                  name="slug"
                  placeholder="auto-generated-slug"
                  value={formData.slug || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Excerpt
                </label>
                <textarea
                  name="excerpt"
                  placeholder="Brief summary..."
                  value={formData.excerpt || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content *
                </label>
                <RichTextEditor
                  value={formData.content || ""}
                  onChange={(v: string) =>
                    setFormData((p) => ({ ...p, content: v }))
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Featured Image URL
                </label>
                <input
                  name="featuredImage"
                  placeholder="https://example.com/image.jpg"
                  value={formData.featuredImage || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  External Link (for media mentions)
                </label>
                <input
                  name="externalLink"
                  placeholder="https://example.com/article"
                  value={formData.externalLink || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="press">Press Release</option>
                    <option value="media">Media Mention</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-4 border-t border-gray-200 pt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {editingItem ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPress;