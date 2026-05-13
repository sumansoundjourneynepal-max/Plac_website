// "use client"

// import React, { useEffect, useState } from 'react';
// import { Plus, Star } from 'lucide-react';
// import DataTable from '../../components/admin/DataTable';
// import { useAdminAuth } from '../../context/AdminAuthContext';

// interface Testimonial {
//   _id: string;
//   name: string;
//   profession: string;
//   image?: string;
//   quote: string;
//   rating: number;
//   isActive: boolean;
//   sortOrder: number;
//   createdAt: string;
// }

// const API = "http://localhost:5000/api/testimonials";

// const AdminTestimonials = () => {
//   const [data, setData] = useState<Testimonial[]>([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
//   const [formData, setFormData] = useState<Partial<Testimonial>>({
//     name: '',
//     profession: '',
//     image: '',
//     quote: '',
//     rating: 5,
//     isActive: true,
//     sortOrder: 0
//   });
//   const { hasPermission } = useAdminAuth();

//   // Fetch testimonials from API
//   const fetchData = async () => {
//     const res = await fetch(`${API}/admin`);
//     const result = await res.json();
//     setData(result);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const renderStars = (rating: number) => {
//     return Array.from({ length: 5 }, (_, index) => (
//       <Star
//         key={index}
//         size={16}
//         className={`${index < rating ? 'text-gold fill-gold' : 'text-gray-300'}`}
//       />
//     ));
//   };

//   const columns = [
//     {
//       key: 'image',
//       label: 'Photo',
//       render: (image: string, testimonial: Testimonial) => (
//         <div className="flex items-center">
//           {image ? <img src={image} alt={testimonial.name} className="w-12 h-12 object-cover rounded-full" /> : 'N/A'}
//         </div>
//       )
//     },
//     {
//       key: 'name',
//       label: 'Name',
//       sortable: true,
//       render: (name: string, testimonial: Testimonial) => (
//         <div>
//           <p className="font-medium text-gray-900">{name}</p>
//           <p className="text-sm text-gray-500">{testimonial.profession}</p>
//         </div>
//       )
//     },
//     {
//       key: 'quote',
//       label: 'Testimonial',
//       render: (quote: string) => (
//         <div className="max-w-xs">
//           <p className="text-sm text-gray-900 line-clamp-2" title={quote}>
//             "{quote}"
//           </p>
//         </div>
//       )
//     },
//     {
//       key: 'rating',
//       label: 'Rating',
//       render: (rating: number) => (
//         <div className="flex items-center">
//           {renderStars(rating)}
//           <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
//         </div>
//       )
//     },
//     {
//       key: 'sortOrder',
//       label: 'Order',
//       sortable: true
//     },
//     {
//       key: 'isActive',
//       label: 'Status',
//       render: (isActive: boolean) => (
//         <span className={`px-2 py-1 text-xs font-semibold rounded-full ${isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//           {isActive ? 'Active' : 'Inactive'}
//         </span>
//       )
//     },
//     {
//       key: 'createdAt',
//       label: 'Created',
//       render: (date: string) => new Date(date).toLocaleDateString()
//     },
//     {
//       key: 'actions',
//       label: 'Actions',
//       render: (_: any, row: Testimonial) => (
//         <div className="flex gap-2">
//           {hasPermission('testimonials.write') && <button className="text-blue-600" onClick={() => handleEdit(row)}>Edit</button>}
//           {hasPermission('testimonials.delete') && <button className="text-red-600" onClick={() => handleDelete(row)}>Delete</button>}
//         </div>
//       )
//     }
//   ];

//   const handleEdit = (testimonial: Testimonial) => {
//     setEditingTestimonial(testimonial);
//     setFormData(testimonial);
//     setShowModal(true);
//   };

//   const handleDelete = async (testimonial: Testimonial) => {
//     if (confirm(`Are you sure you want to delete testimonial from "${testimonial.name}"?`)) {
//       await fetch(`${API}/${testimonial._id}`, { method: "DELETE" });
//       fetchData();
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (editingTestimonial) {
//       await fetch(`${API}/${editingTestimonial._id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData)
//       });
//     } else {
//       await fetch(API, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData)
//       });
//     }

//     setShowModal(false);
//     setEditingTestimonial(null);
//     setFormData({
//       name: '',
//       profession: '',
//       image: '',
//       quote: '',
//       rating: 5,
//       isActive: true,
//       sortOrder: 0
//     });

//     fetchData();
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
//               type === 'number' ? parseInt(value) || 0 : value
//     }));
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
//           <p className="text-gray-600">Manage customer testimonials and reviews</p>
//         </div>
//         {hasPermission('testimonials.write') && (
//           <button
//             onClick={() => setShowModal(true)}
//             className="flex items-center px-4 py-2 bg-gold text-white rounded-md hover:bg-gold/90"
//           >
//             <Plus size={16} className="mr-2" /> Add Testimonial
//           </button>
//         )}
//       </div>

//       {/* DataTable */}
//       <DataTable
//         data={data}
//         columns={columns}
//         searchable
//         filterable
//       />

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6 border-b border-gray-200">
//               <h2 className="text-xl font-semibold text-gray-900">
//                 {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
//               </h2>
//             </div>

//             <form onSubmit={handleSubmit} className="p-6 space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
//                   <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"/>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Profession *</label>
//                   <input type="text" name="profession" value={formData.profession} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"/>
//                 </div>

//                 {/* <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL *</label>
//                   <input type="url" name="image" value={formData.image} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"/>
//                   {formData.image && <img src={formData.image} alt="Preview" className="mt-2 w-20 h-20 object-cover rounded-full"/>}
//                 </div> */}
//                 <div className="md:col-span-2">
//   <label className="block text-sm font-medium text-gray-700 mb-1">Photo *</label>
  
//   <div className="flex flex-col gap-2">
//     {/* URL input */}
//     <input
//       type="url"
//       name="image"
//       value={formData.image || ''}
//       onChange={handleInputChange}
//       placeholder="Enter photo URL"
//       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
//     />

//     <span className="text-sm text-gray-500">Or upload a photo:</span>

//     {/* File upload */}
//     <input
//       type="file"
//       accept="image/*"
//       onChange={(e) => {
//         const file = e.target.files?.[0];
//         if (!file) return;

//         const reader = new FileReader();
//         reader.onloadend = () => {
//           setFormData(prev => ({ ...prev, image: reader.result as string }));
//         };
//         reader.readAsDataURL(file);
//       }}
//       className="w-full"
//     />
//   </div>

//   {/* Preview */}
//   {formData.image && (
//     <img
//       src={formData.image}
//       alt="Preview"
//       className="mt-2 w-20 h-20 object-cover rounded-full"
//     />
//   )}
// </div>


//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Testimonial Quote *</label>
//                   <textarea name="quote" value={formData.quote} onChange={handleInputChange} required rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold" placeholder="Enter the testimonial quote..."/>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Rating *</label>
//                   <select name="rating" value={formData.rating} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold">
//                     {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
//                   </select>
//                   <div className="mt-2 flex items-center">{renderStars(formData.rating || 5)}</div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
//                   <input type="number" name="sortOrder" value={formData.sortOrder} onChange={handleInputChange} min="0" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"/>
//                 </div>

//                 <div className="flex items-center">
//                   <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleInputChange} className="h-4 w-4 text-gold border-gray-300 rounded focus:ring-gold"/>
//                   <label className="ml-2 text-sm font-medium text-gray-700">Active</label>
//                 </div>
//               </div>

//               {/* Preview */}
//               {formData.name && formData.quote && (
//                 <div className="border-t border-gray-200 pt-6">
//                   <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
//                   <div className="bg-gray-50 p-6 rounded-lg">
//                     <div className="flex items-start gap-4">
//                       {formData.image && <img src={formData.image} alt={formData.name} className="w-16 h-16 object-cover rounded-full"/>}
//                       <div className="flex-1">
//                         <div className="flex items-center gap-2 mb-2">{renderStars(formData.rating || 5)}</div>
//                         <p className="text-gray-900 italic mb-3">"{formData.quote}"</p>
//                         <div>
//                           <p className="font-medium text-gray-900">{formData.name}</p>
//                           <p className="text-sm text-gray-600">{formData.profession}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Form Actions */}
//               <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
//                 <button type="button" onClick={() => { setShowModal(false); setEditingTestimonial(null); }} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Cancel</button>
//                 <button type="submit" className="px-4 py-2 bg-gold text-white rounded-md hover:bg-gold/90">{editingTestimonial ? 'Update Testimonial' : 'Create Testimonial'}</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminTestimonials;

"use client"

import React, { useEffect, useState } from 'react';
import { Plus, Star, Loader2 } from 'lucide-react';
import DataTable from '../../components/admin/DataTable';
import { useAdminAuth } from '../../context/AdminAuthContext';

interface Testimonial {
  _id: string;
  name: string;
  profession: string;
  image?: string;
  quote: string;
  rating: number;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
}

// const API = "http://localhost:5000/api/testimonials";
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const API = `${API_BASE}/testimonials`;

const AdminTestimonials = () => {
  const [data, setData] = useState<Testimonial[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState<Partial<Testimonial>>({
    name: '',
    profession: '',
    image: '',
    quote: '',
    rating: 5,
    isActive: true,
    sortOrder: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { hasPermission } = useAdminAuth();

  // Fetch testimonials from API
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API}/admin`);
      if (!res.ok) {
        throw new Error(`Failed to fetch testimonials: ${res.statusText}`);
      }
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error('Error fetching testimonials:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch testimonials');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={`${index < rating ? 'text-gold fill-gold' : 'text-gray-300'}`}
      />
    ));
  };

  const columns = [
    {
      key: 'image',
      label: 'Photo',
      render: (image: string, testimonial: Testimonial) => (
        <div className="flex items-center">
          {image ? (
            <img 
              src={image} 
              alt={testimonial.name} 
              className="w-12 h-12 object-cover rounded-full"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder.svg';
              }}
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-xs">No Image</span>
            </div>
          )}
        </div>
      )
    },
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (name: string, testimonial: Testimonial) => (
        <div>
          <p className="font-medium text-gray-900">{name}</p>
          <p className="text-sm text-gray-500">{testimonial.profession}</p>
        </div>
      )
    },
    {
      key: 'quote',
      label: 'Testimonial',
      render: (quote: string) => (
        <div className="max-w-xs">
          <p className="text-sm text-gray-900 line-clamp-2" title={quote}>
            "{quote}"
          </p>
        </div>
      )
    },
    {
      key: 'rating',
      label: 'Rating',
      render: (rating: number) => (
        <div className="flex items-center">
          {renderStars(rating)}
          <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
        </div>
      )
    },
    {
      key: 'sortOrder',
      label: 'Order',
      sortable: true
    },
    {
      key: 'isActive',
      label: 'Status',
      render: (isActive: boolean) => (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {isActive ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      key: 'createdAt',
      label: 'Created',
      render: (date: string) => new Date(date).toLocaleDateString()
    }
    // REMOVED the custom 'actions' column here
  ];

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData(testimonial);
    setShowModal(true);
  };

  const handleDelete = async (testimonial: Testimonial) => {
    if (confirm(`Are you sure you want to delete testimonial from "${testimonial.name}"?`)) {
      try {
        const response = await fetch(`${API}/${testimonial._id}`, { 
          method: "DELETE" 
        });
        if (!response.ok) {
          throw new Error('Failed to delete testimonial');
        }
        await fetchData();
      } catch (err) {
        console.error('Error deleting testimonial:', err);
        alert('Failed to delete testimonial. Please try again.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      
      if (editingTestimonial) {
        const response = await fetch(`${API}/${editingTestimonial._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
          throw new Error('Failed to update testimonial');
        }
      } else {
        const response = await fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
          throw new Error('Failed to create testimonial');
        }
      }

      setShowModal(false);
      setEditingTestimonial(null);
      setFormData({
        name: '',
        profession: '',
        image: '',
        quote: '',
        rating: 5,
        isActive: true,
        sortOrder: 0
      });

      await fetchData();
    } catch (err) {
      console.error('Error saving testimonial:', err);
      alert('Failed to save testimonial. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              type === 'number' ? parseInt(value) || 0 : value
    }));
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
        <p className="text-gray-600">Loading testimonials...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="text-red-500">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L4.406 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Testimonials</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-gold text-white rounded-md hover:bg-gold/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-gray-600">Manage customer testimonials and reviews</p>
        </div>
        {hasPermission('testimonials.write') && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center px-4 py-2 bg-gold text-white rounded-md hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Plus size={16} className="mr-2" /> 
                Add Testimonial
              </>
            )}
          </button>
        )}
      </div>

      {/* DataTable */}
      <DataTable
        data={data}
        columns={columns}
        onEdit={hasPermission('testimonials.write') ? handleEdit : undefined}
        onDelete={hasPermission('testimonials.delete') ? handleDelete : undefined}
        searchable
        filterable
      />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    required 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-colors"
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Profession *</label>
                  <input 
                    type="text" 
                    name="profession" 
                    value={formData.profession} 
                    onChange={handleInputChange} 
                    required 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-colors"
                    disabled={submitting}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Photo *</label>
                  <div className="flex flex-col gap-2">
                    <input
                      type="url"
                      name="image"
                      value={formData.image || ''}
                      onChange={handleInputChange}
                      placeholder="Enter photo URL"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-colors"
                      disabled={submitting}
                    />

                    <span className="text-sm text-gray-500">Or upload a photo:</span>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setFormData(prev => ({ ...prev, image: reader.result as string }));
                        };
                        reader.readAsDataURL(file);
                      }}
                      className="w-full"
                      disabled={submitting}
                    />
                  </div>

                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="mt-2 w-20 h-20 object-cover rounded-full"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Testimonial Quote *</label>
                  <textarea 
                    name="quote" 
                    value={formData.quote} 
                    onChange={handleInputChange} 
                    required 
                    rows={4} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-colors" 
                    placeholder="Enter the testimonial quote..."
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating *</label>
                  <select 
                    name="rating" 
                    value={formData.rating} 
                    onChange={handleInputChange} 
                    required 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-colors"
                    disabled={submitting}
                  >
                    {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                  </select>
                  <div className="mt-2 flex items-center">
                    {renderStars(formData.rating || 5)}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
                  <input 
                    type="number" 
                    name="sortOrder" 
                    value={formData.sortOrder} 
                    onChange={handleInputChange} 
                    min="0" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-colors"
                    disabled={submitting}
                  />
                </div>

                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    name="isActive" 
                    checked={formData.isActive} 
                    onChange={handleInputChange} 
                    className="h-4 w-4 text-gold border-gray-300 rounded focus:ring-gold focus:ring-offset-0"
                    disabled={submitting}
                  />
                  <label className="ml-2 text-sm font-medium text-gray-700">Active</label>
                </div>
              </div>

              {/* Preview */}
              {formData.name && formData.quote && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-start gap-4">
                      {formData.image && (
                        <img 
                          src={formData.image} 
                          alt={formData.name} 
                          className="w-16 h-16 object-cover rounded-full"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder.svg';
                          }}
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {renderStars(formData.rating || 5)}
                        </div>
                        <p className="text-gray-900 italic mb-3">"{formData.quote}"</p>
                        <div>
                          <p className="font-medium text-gray-900">{formData.name}</p>
                          <p className="text-sm text-gray-600">{formData.profession}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button 
                  type="button" 
                  onClick={() => { 
                    if (!submitting) {
                      setShowModal(false); 
                      setEditingTestimonial(null); 
                    }
                  }} 
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-gold text-white rounded-md hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {editingTestimonial ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    editingTestimonial ? 'Update Testimonial' : 'Create Testimonial'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;