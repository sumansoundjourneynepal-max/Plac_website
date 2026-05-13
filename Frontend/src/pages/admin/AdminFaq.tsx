// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Plus } from "lucide-react";
// import DataTable from "../../components/admin/DataTable";
// import { useAdminAuth } from "../../context/AdminAuthContext";

// interface FAQ {
//   _id: string;
//   question: string;
//   answer: string;
//   category: string;
//   status: "published" | "draft";
// }

// const AdminFaq: React.FC = () => {
//   const [faqs, setFaqs] = useState<FAQ[]>([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
//   const [formData, setFormData] = useState<Partial<FAQ>>({});
//   const { hasPermission } = useAdminAuth();

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/admin/faqs")
//       .then(res => setFaqs(res.data));
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (editingFaq) {
//       const res = await axios.put(
//         `http://localhost:5000/api/admin/faqs/${editingFaq._id}`,
//         formData
//       );
//       setFaqs(prev => prev.map(f => f._id === editingFaq._id ? res.data : f));
//     } else {
//       const res = await axios.post("http://localhost:5000/api/admin/faqs", formData);
//       setFaqs(prev => [res.data, ...prev]);
//     }

//     setShowModal(false);
//     setEditingFaq(null);
//     setFormData({});
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between">
//         <h1 className="text-2xl font-bold">FAQs</h1>
//         {hasPermission("faq.write") && (
//           <button
//             onClick={() => setShowModal(true)}
//             className="flex items-center px-4 py-2 bg-gold text-white rounded"
//           >
//             <Plus size={16} className="mr-2" /> New FAQ
//           </button>
//         )}
//       </div>

//       <DataTable
//         data={faqs}
//         columns={[
//           { key: "question", label: "Question" },
//           { key: "category", label: "Category" },
//           { key: "status", label: "Status" },
//         ]}
//         onEdit={faq => {
//           setEditingFaq(faq);
//           setFormData(faq);
//           setShowModal(true);
//         }}
//         onDelete={faq =>
//           axios.delete(`http://localhost:5000/api/admin/faqs/${faq._id}`)
//             .then(() => setFaqs(prev => prev.filter(f => f._id !== faq._id)))
//         }
//       />

//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
//           <form onSubmit={handleSubmit} className="bg-white p-6 rounded w-full max-w-lg space-y-4">
//             <input
//               placeholder="Question"
//               value={formData.question || ""}
//               onChange={e => setFormData({ ...formData, question: e.target.value })}
//               className="w-full border px-3 py-2"
//               required
//             />
//             <textarea
//               placeholder="Answer"
//               value={formData.answer || ""}
//               onChange={e => setFormData({ ...formData, answer: e.target.value })}
//               className="w-full border px-3 py-2"
//               rows={4}
//               required
//             />
//             <input
//               placeholder="Category"
//               value={formData.category || ""}
//               onChange={e => setFormData({ ...formData, category: e.target.value })}
//               className="w-full border px-3 py-2"
//             />
//             <select
//               value={formData.status || "draft"}
//               onChange={e => setFormData({ ...formData, status: e.target.value as any })}
//               className="w-full border px-3 py-2"
//             >
//               <option value="draft">Draft</option>
//               <option value="published">Published</option>
//             </select>

//             <div className="flex justify-end gap-3">
//               <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
//               <button className="bg-gold text-white px-4 py-2 rounded">
//                 Save FAQ
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminFaq;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react";
import DataTable from "../../components/admin/DataTable";
import { useAdminAuth } from "../../context/AdminAuthContext";

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
  status: "published" | "draft";
}

const AdminFaq: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [formData, setFormData] = useState<Partial<FAQ>>({});

  const adminAuth = useAdminAuth();
  const hasPermission = adminAuth?.hasPermission ?? (() => false);

  // ✅ FETCH FAQs SAFELY
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/faqs", {
          withCredentials: true,
        });
        setFaqs(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load FAQs");
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  // ✅ SAVE / UPDATE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingFaq) {
        const res = await axios.put(
          `http://localhost:5000/api/admin/faqs/${editingFaq._id}`,
          formData,
          { withCredentials: true }
        );
        setFaqs(prev =>
          prev.map(f => (f._id === editingFaq._id ? res.data : f))
        );
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/admin/faqs",
          formData,
          { withCredentials: true }
        );
        setFaqs(prev => [res.data, ...prev]);
      }

      setShowModal(false);
      setEditingFaq(null);
      setFormData({});
    } catch (err) {
      console.error(err);
      alert("Failed to save FAQ");
    }
  };

  // ✅ DELETE
  const handleDelete = async (faq: FAQ) => {
    if (!confirm("Delete this FAQ?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/admin/faqs/${faq._id}`,
        { withCredentials: true }
      );
      setFaqs(prev => prev.filter(f => f._id !== faq._id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete FAQ");
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">FAQs</h1>

        {hasPermission("faq.write") && (
          <button
            onClick={() => {
              setEditingFaq(null);
              setFormData({ status: "draft" });
              setShowModal(true);
            }}
            className="flex items-center px-4 py-2 bg-gold text-white rounded"
          >
            <Plus size={16} className="mr-2" />
            New FAQ
          </button>
        )}
      </div>

      {/* STATE HANDLING */}
      {loading && <p>Loading FAQs...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* TABLE */}
      {!loading && !error && (
        <DataTable
          data={faqs}
          columns={[
            { key: "question", label: "Question" },
            { key: "category", label: "Category" },
            { key: "status", label: "Status" },
          ]}
          onEdit={faq => {
            setEditingFaq(faq);
            setFormData(faq);
            setShowModal(true);
          }}
          onDelete={handleDelete}
        />
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded w-full max-w-lg space-y-4"
          >
            <h2 className="text-lg font-bold">
              {editingFaq ? "Edit FAQ" : "New FAQ"}
            </h2>

            <input
              placeholder="Question"
              value={formData.question || ""}
              onChange={e =>
                setFormData({ ...formData, question: e.target.value })
              }
              className="w-full border px-3 py-2"
              required
            />

            <textarea
              placeholder="Answer"
              value={formData.answer || ""}
              onChange={e =>
                setFormData({ ...formData, answer: e.target.value })
              }
              className="w-full border px-3 py-2"
              rows={4}
              required
            />

            <input
              placeholder="Category"
              value={formData.category || ""}
              onChange={e =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full border px-3 py-2"
            />

            <select
              value={formData.status || "draft"}
              onChange={e =>
                setFormData({
                  ...formData,
                  status: e.target.value as "draft" | "published",
                })
              }
              className="w-full border px-3 py-2"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-gold text-white px-4 py-2 rounded"
              >
                Save FAQ
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminFaq;
