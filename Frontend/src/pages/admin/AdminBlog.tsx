// import React, { useState } from 'react';
// import { Plus, Calendar, User } from 'lucide-react';
// import DataTable from '../../components/admin/DataTable';
// import RichTextEditor from '../../components/admin/RichTextEditor';
// import { mockBlogPosts, BlogPost } from '../../data/adminData';
// import { useAdminAuth } from '../../context/AdminAuthContext';

// const AdminBlog = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
//   const [formData, setFormData] = useState<Partial<BlogPost>>({
//     title: '',
//     slug: '',
//     content: '',
//     excerpt: '',
//     featuredImage: '',
//     author: '',
//     category: '',
//     tags: [],
//     status: 'draft',
//     seo: {
//       title: '',
//       description: '',
//       keywords: ''
//     }
//   });
//   const { hasPermission, adminUser } = useAdminAuth();

//   const columns = [
//     {
//       key: 'featuredImage',
//       label: 'Image',
//       render: (image: string) => (
//         <img 
//           src={image} 
//           alt="Featured" 
//           className="w-12 h-12 object-cover rounded"
//         />
//       )
//     },
//     { key: 'title', label: 'Title', sortable: true },
//     { key: 'author', label: 'Author', sortable: true },
//     { key: 'category', label: 'Category', sortable: true },
//     { 
//       key: 'status', 
//       label: 'Status',
//       render: (status: string) => (
//         <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
//           status === 'published' ? 'bg-green-100 text-green-800' :
//           status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
//           'bg-gray-100 text-gray-800'
//         }`}>
//           {status.charAt(0).toUpperCase() + status.slice(1)}
//         </span>
//       )
//     },
//     { 
//       key: 'publishedAt', 
//       label: 'Published',
//       render: (date: string) => date ? new Date(date).toLocaleDateString() : '-'
//     }
//   ];

//   const handleEdit = (post: BlogPost) => {
//     setEditingPost(post);
//     setFormData(post);
//     setShowModal(true);
//   };

//   const handleDelete = (post: BlogPost) => {
//     if (confirm(`Are you sure you want to delete "${post.title}"?`)) {
//       console.log('Deleting post:', post.id);
//       alert('Blog post deleted successfully');
//     }
//   };

//   const handleView = (post: BlogPost) => {
//     window.open(`/blog/${post.slug}`, '_blank');
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     const postData = {
//       ...formData,
//       author: formData.author || `${adminUser?.firstName} ${adminUser?.lastName}`,
//       slug: formData.slug || formData.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
//       updatedAt: new Date().toISOString().split('T')[0]
//     };

//     if (editingPost) {
//       console.log('Updating post:', editingPost.id, postData);
//       alert('Blog post updated successfully');
//     } else {
//       console.log('Creating new post:', postData);
//       alert('Blog post created successfully');
//     }

//     setShowModal(false);
//     setEditingPost(null);
//     setFormData({
//       title: '',
//       slug: '',
//       content: '',
//       excerpt: '',
//       featuredImage: '',
//       author: '',
//       category: '',
//       tags: [],
//       status: 'draft',
//       seo: {
//         title: '',
//         description: '',
//         keywords: ''
//       }
//     });
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSEOChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       seo: {
//         title: '',
//         description: '',
//         keywords: '',
//         ...prev.seo,
//         [name]: value
//       }
//     }));
//   };

//   const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
//     setFormData(prev => ({
//       ...prev,
//       tags
//     }));
//   };

//   return (
//     <div className="space-y-6">
//       {/* Page Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
//           <p className="text-gray-600">Manage your blog content</p>
//         </div>
//         {hasPermission('blog.write') && (
//           <button
//             onClick={() => setShowModal(true)}
//             className="flex items-center px-4 py-2 bg-gold text-white rounded-md hover:bg-gold/90"
//           >
//             <Plus size={16} className="mr-2" />
//             New Post
//           </button>
//         )}
//       </div>

//       {/* Blog Posts Table */}
//       <DataTable
//         data={mockBlogPosts}
//         columns={columns}
//         onEdit={hasPermission('blog.write') ? handleEdit : undefined}
//         onDelete={hasPermission('blog.delete') ? handleDelete : undefined}
//         onView={handleView}
//         searchable
//         filterable
//       />

//       {/* Blog Post Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6 border-b border-gray-200">
//               <h2 className="text-xl font-semibold text-gray-900">
//                 {editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}
//               </h2>
//             </div>

//             <form onSubmit={handleSubmit} className="p-6 space-y-6">
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                 {/* Main Content */}
//                 <div className="lg:col-span-2 space-y-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Title *
//                     </label>
//                     <input
//                       type="text"
//                       name="title"
//                       value={formData.title || ''}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Slug
//                     </label>
//                     <input
//                       type="text"
//                       name="slug"
//                       value={formData.slug || ''}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
//                       placeholder="auto-generated-from-title"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Excerpt
//                     </label>
//                     <textarea
//                       name="excerpt"
//                       value={formData.excerpt || ''}
//                       onChange={handleInputChange}
//                       rows={3}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
//                       placeholder="Brief description of the post"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Content *
//                     </label>
//                     <RichTextEditor
//                       value={formData.content || ''}
//                       onChange={(content) => setFormData(prev => ({ ...prev, content }))}
//                       height="400px"
//                     />
//                   </div>

//                   {/* SEO Section */}
//                   <div className="border-t pt-6">
//                     <h3 className="text-lg font-medium text-gray-900 mb-4">SEO Settings</h3>
//                     <div className="space-y-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           SEO Title
//                         </label>
//                         <input
//                           type="text"
//                           name="title"
//                           value={formData.seo?.title || ''}
//                           onChange={handleSEOChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Meta Description
//                         </label>
//                         <textarea
//                           name="description"
//                           value={formData.seo?.description || ''}
//                           onChange={handleSEOChange}
//                           rows={2}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Keywords
//                         </label>
//                         <input
//                           type="text"
//                           name="keywords"
//                           value={formData.seo?.keywords || ''}
//                           onChange={handleSEOChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Sidebar */}
//                 <div className="space-y-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Status *
//                     </label>
//                     <select
//                       name="status"
//                       value={formData.status || 'draft'}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
//                     >
//                       <option value="draft">Draft</option>
//                       <option value="published">Published</option>
//                       <option value="archived">Archived</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Category *
//                     </label>
//                     <select
//                       name="category"
//                       value={formData.category || ''}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
//                     >
//                       <option value="">Select Category</option>
//                       <option value="Sound Healing">Sound Healing</option>
//                       <option value="Product Stories">Product Stories</option>
//                       <option value="Wellness">Wellness</option>
//                       <option value="Culture">Culture</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Author
//                     </label>
//                     <input
//                       type="text"
//                       name="author"
//                       value={formData.author || ''}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
//                       placeholder={`${adminUser?.firstName} ${adminUser?.lastName}`}
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Tags
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.tags?.join(', ') || ''}
//                       onChange={handleTagsChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
//                       placeholder="tag1, tag2, tag3"
//                     />
//                     <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Featured Image URL
//                     </label>
//                     <input
//                       type="url"
//                       name="featuredImage"
//                       value={formData.featuredImage || ''}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
//                     />
//                     {formData.featuredImage && (
//                       <img 
//                         src={formData.featuredImage} 
//                         alt="Preview" 
//                         className="mt-2 w-full h-32 object-cover rounded"
//                       />
//                     )}
//                   </div>

//                   {editingPost && (
//                     <div className="text-sm text-gray-500 space-y-1">
//                       <div className="flex items-center">
//                         <Calendar size={14} className="mr-1" />
//                         Created: {new Date(editingPost.createdAt).toLocaleDateString()}
//                       </div>
//                       <div className="flex items-center">
//                         <User size={14} className="mr-1" />
//                         Author: {editingPost.author}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Form Actions */}
//               <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
//                 <button
//                   type="button"
//                   onClick={() => setShowModal(false)}
//                   className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-gold text-white rounded-md hover:bg-gold/90"
//                 >
//                   {editingPost ? 'Update Post' : 'Create Post'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminBlog;



//new

// // src/pages/admin/AdminBlog.tsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Plus, Calendar, User } from 'lucide-react';
// import DataTable from '../../components/admin/DataTable';
// import RichTextEditor from '../../components/admin/RichTextEditor';
// import { useAdminAuth } from '../../context/AdminAuthContext';

// interface BlogPost {
//   id: string;
//   title: string;
//   slug: string;
//   content: string;
//   excerpt: string;
//   featuredImage: string;
//   author: string;
//   category: string;
//   tags: string[];
//   status: 'published' | 'draft' | 'archived';
//   publishedAt?: string;
//   createdAt: string;
//   updatedAt: string;
//   seo: {
//     title: string;
//     description: string;
//     keywords: string;
//   };
// }

// const AdminBlog: React.FC = () => {
//   const [blogs, setBlogs] = useState<BlogPost[]>([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
//   const [formData, setFormData] = useState<Partial<BlogPost>>({
//     title: '',
//     slug: '',
//     content: '',
//     excerpt: '',
//     featuredImage: '',
//     author: '',
//     category: '',
//     tags: [],
//     status: 'draft',
//     seo: { title: '', description: '', keywords: '' }
//   });

//   const { hasPermission, adminUser } = useAdminAuth();

//   // Fetch blogs from backend on mount
//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const res = await axios.get<BlogPost[]>('http://localhost:5000/api/blogs'); // Adjust API URL
//         setBlogs(res.data.map(blog => ({
//           ...blog,
//           id: blog._id || blog.id, // in case backend uses _id
//         })));
//       } catch (err) {
//         console.error('Error fetching blogs:', err);
//       }
//     };
//     fetchBlogs();
//   }, []);

//   const columns = [
//     {
//       key: 'featuredImage',
//       label: 'Image',
//       render: (image: string) => (
//         <img src={image} alt="Featured" className="w-12 h-12 object-cover rounded" />
//       )
//     },
//     { key: 'title', label: 'Title', sortable: true },
//     { key: 'author', label: 'Author', sortable: true },
//     { key: 'category', label: 'Category', sortable: true },
//     {
//       key: 'status',
//       label: 'Status',
//       render: (status: string) => (
//         <span className={`px-2 py-1 text-xs font-semibold rounded-full ${status === 'published' ? 'bg-green-100 text-green-800' :
//             status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
//               'bg-gray-100 text-gray-800'
//           }`}>
//           {status.charAt(0).toUpperCase() + status.slice(1)}
//         </span>
//       )
//     },
//     {
//       key: 'publishedAt',
//       label: 'Published',
//       render: (date?: string) => date ? new Date(date).toLocaleDateString() : '-'
//     }
//   ];

//   const handleEdit = (post: BlogPost) => {
//     setEditingPost(post);
//     setFormData(post);
//     setShowModal(true);
//   };

//   const handleDelete = (post: BlogPost) => {
//     if (!confirm(`Are you sure you want to delete "${post.title}"?`)) return;
//     axios.delete(`http://localhost:5000/api/admin/blogs/${post.id}`)
//       .then(() => setBlogs(prev => prev.filter(b => b.id !== post.id)))
//       .catch(err => console.error(err));
//   };

//   const handleView = (post: BlogPost) => {
//     window.open(`/blog/${post.slug}`, '_blank');
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const postData = {
//       ...formData,
//       author: formData.author || `${adminUser?.firstName || ''} ${adminUser?.lastName || ''}`,
//       slug: formData.slug || formData.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
//       publishedAt: formData.status === 'published' ? new Date().toISOString() : undefined,
//     };

//     try {
//       if (editingPost) {
//         // Update blog
//         const res = await axios.put<BlogPost>(`http://localhost:5000/api/admin/blogs/${editingPost.id}`, postData);
//         setBlogs(prev => prev.map(b => b.id === editingPost.id ? res.data : b));
//       } else {
//         // Create new blog
//         const res = await axios.post<BlogPost>('http://localhost:5000/api/admin/blogs', postData);
//         const newBlog: BlogPost = { ...res.data, id: res.data._id || res.data.id };
//         setBlogs(prev => [...prev, newBlog]);
//       }

//       setShowModal(false);
//       setEditingPost(null);
//       setFormData({
//         title: '',
//         slug: '',
//         content: '',
//         excerpt: '',
//         featuredImage: '',
//         author: '',
//         category: '',
//         tags: [],
//         status: 'draft',
//         seo: { title: '', description: '', keywords: '' }
//       });
//     } catch (err) {
//       console.error('Error creating/updating blog:', err);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSEOChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       seo: { ...prev.seo, [name]: value }
//     }));
//   };

//   const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const tags = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean);
//     setFormData(prev => ({ ...prev, tags }));
//   };

//   return (
//     <div className="space-y-6">
//       {/* Page Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
//           <p className="text-gray-600">Manage your blog content</p>
//         </div>
//         {hasPermission('blog.write') && (
//           <button onClick={() => setShowModal(true)} className="flex items-center px-4 py-2 bg-gold text-white rounded-md hover:bg-gold/90">
//             <Plus size={16} className="mr-2" />
//             New Post
//           </button>
//         )}
//       </div>

//       {/* Blog Posts Table */}
//       <DataTable
//         data={blogs}
//         columns={columns}
//         onEdit={hasPermission('blog.write') ? handleEdit : undefined}
//         onDelete={hasPermission('blog.delete') ? handleDelete : undefined}
//         onView={handleView}
//         searchable
//         filterable
//       />

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6 border-b border-gray-200">
//               <h2 className="text-xl font-semibold text-gray-900">
//                 {editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}
//               </h2>
//             </div>
//             <form onSubmit={handleSubmit} className="p-6 space-y-6">
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                 <div className="lg:col-span-2 space-y-6">
//                   <div>
//                     <label>Title *</label>
//                     <input name="title" value={formData.title || ''} onChange={handleInputChange} required className="w-full px-3 py-2 border rounded-md" />
//                   </div>
//                   <div>
//                     <label>Slug</label>
//                     <input name="slug" value={formData.slug || ''} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" placeholder="auto-generated" />
//                   </div>
//                   <div>
//                     <label>Excerpt</label>
//                     <textarea name="excerpt" value={formData.excerpt || ''} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" rows={3} />
//                   </div>
//                   <div>
//                     <label>Content *</label>
//                     <RichTextEditor value={formData.content || ''} onChange={(content) => setFormData(prev => ({ ...prev, content }))} height="400px" />
//                   </div>
//                   <div className="border-t pt-6">
//                     <h3>SEO Settings</h3>
//                     <input name="title" value={formData.seo?.title || ''} onChange={handleSEOChange} placeholder="SEO Title" className="w-full px-3 py-2 border rounded-md mb-2" />
//                     <textarea name="description" value={formData.seo?.description || ''} onChange={handleSEOChange} placeholder="Meta Description" className="w-full px-3 py-2 border rounded-md mb-2" rows={2} />
//                     <input name="keywords" value={formData.seo?.keywords || ''} onChange={handleSEOChange} placeholder="Keywords" className="w-full px-3 py-2 border rounded-md" />
//                   </div>
//                 </div>

//                 <div className="space-y-6">
//                   <div>
//                     <label>Status *</label>
//                     <select name="status" value={formData.status || 'draft'} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md">
//                       <option value="draft">Draft</option>
//                       <option value="published">Published</option>
//                       <option value="archived">Archived</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label>Category *</label>
//                     <input name="category" value={formData.category || ''} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" />
//                   </div>
//                   <div>
//                     <label>Author</label>
//                     <input name="author" value={formData.author || ''} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" placeholder={`${adminUser?.firstName} ${adminUser?.lastName}`} />
//                   </div>
//                   <div>
//                     <label>Tags</label>
//                     <input value={formData.tags?.join(', ') || ''} onChange={handleTagsChange} className="w-full px-3 py-2 border rounded-md" placeholder="tag1, tag2" />
//                   </div>
//                   {/* <div>
//                     <label>Featured Image URL</label>
//                     <input name="featuredImage" value={formData.featuredImage || ''} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" />
//                     {formData.featuredImage && <img src={formData.featuredImage} alt="Preview" className="mt-2 w-full h-32 object-cover rounded" />}
//                   </div> */}
//                   <div>
//                     <label>Featured Image</label>
//                     <div className="flex flex-col gap-2">
//                       {/* URL input */}
//                       <input
//                         name="featuredImage"
//                         value={formData.featuredImage || ''}
//                         onChange={handleInputChange}
//                         className="w-full px-3 py-2 border rounded-md"
//                         placeholder="Enter image URL"
//                       />

//                       <span className="text-sm text-gray-500">Or upload an image:</span>
//                       {/* File input */}
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={(e) => {
//                           const file = e.target.files?.[0];
//                           if (!file) return;

//                           const reader = new FileReader();
//                           reader.onloadend = () => {
//                             setFormData(prev => ({ ...prev, featuredImage: reader.result as string }));
//                           };
//                           reader.readAsDataURL(file);
//                         }}
//                         className="w-full"
//                       />
//                     </div>

//                     {/* Preview */}
//                     {formData.featuredImage && (
//                       <img
//                         src={formData.featuredImage}
//                         alt="Preview"
//                         className="mt-2 w-full h-32 object-cover rounded"
//                       />
//                     )}
//                   </div>

//                 </div>
//               </div>

//               <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
//                 <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-md">Cancel</button>
//                 <button type="submit" className="px-4 py-2 bg-gold text-white rounded-md">{editingPost ? 'Update Post' : 'Create Post'}</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminBlog;


"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, Calendar, User, Loader2, AlertCircle, Eye, Edit, Trash2 } from 'lucide-react';
import DataTable from '../../components/admin/DataTable';
import RichTextEditor from '../../components/admin/RichTextEditor';
import { useAdminAuth } from '../../context/AdminAuthContext';

interface BlogPost {
  id: string;
  _id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  author: string;
  category: string;
  tags: string[];
  status: 'published' | 'draft' | 'archived';
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}

const AdminBlog: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    featuredImage: '',
    author: '',
    category: '',
    tags: [],
    status: 'draft',
    seo: { title: '', description: '', keywords: '' }
  });

  const { hasPermission, adminUser } = useAdminAuth();
  // const API_BASE = 'http://localhost:5000/api';
  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

  // Fetch blogs from backend on mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get<BlogPost[]>(`${API_BASE}/blogs`);
      
      // Transform the data to ensure consistent structure
      const transformedBlogs = res.data.map(blog => ({
        ...blog,
        id: blog._id || blog.id, // Handle both _id and id
        author: blog.author || 'Unknown Author',
        category: blog.category || 'Uncategorized',
        tags: blog.tags || [],
        seo: blog.seo || { title: '', description: '', keywords: '' }
      }));
      
      setBlogs(transformedBlogs);
    } catch (err: any) {
      console.error('Error fetching blogs:', err);
      setError(err.response?.data?.message || 'Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: 'featuredImage',
      label: 'Image',
      render: (image: string, blog: BlogPost) => (
        <div className="flex items-center justify-center">
          {image ? (
            <img 
              src={image} 
              alt="Featured" 
              className="w-12 h-12 object-cover rounded border border-gray-200"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder.svg?height=48&width=48';
              }}
            />
          ) : (
            <div className="w-12 h-12 bg-gray-100 rounded border border-gray-200 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
          )}
        </div>
      )
    },
    { 
      key: 'title', 
      label: 'Title', 
      sortable: true,
      render: (title: string) => (
        <div className="max-w-xs truncate" title={title}>
          {title}
        </div>
      )
    },
    { 
      key: 'author', 
      label: 'Author', 
      sortable: true,
      render: (author: string) => (
        <div className="flex items-center">
          <User size={14} className="mr-1 text-gray-400" />
          <span>{author}</span>
        </div>
      )
    },
    { 
      key: 'category', 
      label: 'Category', 
      sortable: true,
      render: (category: string) => (
        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
          {category}
        </span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (status: string) => (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${status === 'published' ? 'bg-green-100 text-green-800' :
            status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
          }`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      )
    },
    {
      key: 'publishedAt',
      label: 'Published',
      render: (date?: string) => (
        <div className="flex items-center text-sm text-gray-600">
          <Calendar size={12} className="mr-1" />
          {date ? new Date(date).toLocaleDateString() : 'Not published'}
        </div>
      )
    }
  ];

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData(post);
    setShowModal(true);
  };

  const handleDelete = async (post: BlogPost) => {
    if (!confirm(`Are you sure you want to delete "${post.title}"? This action cannot be undone.`)) return;
    
    try {
      await axios.delete(`${API_BASE}/admin/blogs/${post.id}`);
      setBlogs(prev => prev.filter(b => b.id !== post.id));
      alert('Blog post deleted successfully');
    } catch (err: any) {
      console.error('Error deleting blog post:', err);
      alert(err.response?.data?.message || 'Failed to delete blog post');
    }
  };

  const handleView = (post: BlogPost) => {
    window.open(`/blog/${post.slug}`, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      alert('Title and content are required');
      return;
    }

    setSubmitting(true);

    const postData = {
      ...formData,
      author: formData.author || `${adminUser?.firstName || ''} ${adminUser?.lastName || ''}`.trim() || 'Admin',
      slug: formData.slug || formData.title?.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, ''),
      publishedAt: formData.status === 'published' && !editingPost ? new Date().toISOString() : undefined,
      tags: formData.tags || [],
      seo: formData.seo || { title: '', description: '', keywords: '' }
    };

    try {
      if (editingPost) {
        const res = await axios.put<BlogPost>(`${API_BASE}/admin/blogs/${editingPost.id}`, postData);
        setBlogs(prev => prev.map(b => b.id === editingPost.id ? res.data : b));
        alert('Blog post updated successfully');
      } else {
        const res = await axios.post<BlogPost>(`${API_BASE}/admin/blogs`, postData);
        const newBlog: BlogPost = { 
          ...res.data, 
          id: res.data._id || res.data.id 
        };
        setBlogs(prev => [newBlog, ...prev]);
        alert('Blog post created successfully');
      }

      setShowModal(false);
      setEditingPost(null);
      setFormData({
        title: '',
        slug: '',
        content: '',
        excerpt: '',
        featuredImage: '',
        author: '',
        category: '',
        tags: [],
        status: 'draft',
        seo: { title: '', description: '', keywords: '' }
      });
    } catch (err: any) {
      console.error('Error creating/updating blog:', err);
      alert(err.response?.data?.message || 'Failed to save blog post');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSEOChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      seo: { ...prev.seo!, [name]: value }
    }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, tags }));
  };

  const handleCloseModal = () => {
    if (!submitting) {
      setShowModal(false);
      setEditingPost(null);
      setFormData({
        title: '',
        slug: '',
        content: '',
        excerpt: '',
        featuredImage: '',
        author: '',
        category: '',
        tags: [],
        status: 'draft',
        seo: { title: '', description: '', keywords: '' }
      });
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
        <p className="text-gray-600">Loading blog posts...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Blog Posts</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={fetchBlogs}
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
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
          <p className="text-gray-600">Create, edit, and manage your blog content</p>
        </div>
        {hasPermission('blog.write') && (
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
                New Post
              </>
            )}
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Total Posts</p>
          <p className="text-2xl font-bold text-gray-900">{blogs.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Published</p>
          <p className="text-2xl font-bold text-gray-900">
            {blogs.filter(b => b.status === 'published').length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Drafts</p>
          <p className="text-2xl font-bold text-gray-900">
            {blogs.filter(b => b.status === 'draft').length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Categories</p>
          <p className="text-2xl font-bold text-gray-900">
            {[...new Set(blogs.map(b => b.category))].length}
          </p>
        </div>
      </div>

      {/* Blog Posts Table */}
      <DataTable
        data={blogs}
        columns={columns}
        onEdit={hasPermission('blog.write') ? handleEdit : undefined}
        onDelete={hasPermission('blog.delete') ? handleDelete : undefined}
        onView={handleView}
        searchable
        filterable
        searchPlaceholder="Search blog posts..."
      />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}
              </h2>
              <button
                onClick={handleCloseModal}
                disabled={submitting}
                className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title *
                    </label>
                    <input 
                      name="title" 
                      value={formData.title || ''} 
                      onChange={handleInputChange} 
                      required 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-colors"
                      disabled={submitting}
                      placeholder="Enter blog post title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Slug
                    </label>
                    <input 
                      name="slug" 
                      value={formData.slug || ''} 
                      onChange={handleInputChange} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-colors bg-gray-50"
                      disabled={submitting}
                      placeholder="auto-generated-from-title"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Leave empty for auto-generation. Use lowercase letters, numbers, and hyphens.
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Excerpt
                    </label>
                    <textarea 
                      name="excerpt" 
                      value={formData.excerpt || ''} 
                      onChange={handleInputChange} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-colors"
                      disabled={submitting}
                      rows={3}
                      placeholder="Brief summary of the blog post..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content *
                    </label>
                    <RichTextEditor 
                      value={formData.content || ''} 
                      onChange={(content) => setFormData(prev => ({ ...prev, content }))} 
                      height="400px"
                      disabled={submitting}
                    />
                  </div>
                  
                  {/* SEO Settings */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">SEO Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          SEO Title
                        </label>
                        <input 
                          name="title" 
                          value={formData.seo?.title || ''} 
                          onChange={handleSEOChange} 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-colors"
                          disabled={submitting}
                          placeholder="SEO optimized title (optional)"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Meta Description
                        </label>
                        <textarea 
                          name="description" 
                          value={formData.seo?.description || ''} 
                          onChange={handleSEOChange} 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-colors"
                          disabled={submitting}
                          rows={2}
                          placeholder="Brief description for search engines..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Keywords
                        </label>
                        <input 
                          name="keywords" 
                          value={formData.seo?.keywords || ''} 
                          onChange={handleSEOChange} 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-colors"
                          disabled={submitting}
                          placeholder="keyword1, keyword2, keyword3"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Settings */}
                <div className="space-y-6">
                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status *
                    </label>
                    <select 
                      name="status" 
                      value={formData.status || 'draft'} 
                      onChange={handleInputChange} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-colors"
                      disabled={submitting}
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                  
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <input 
                      name="category" 
                      value={formData.category || ''} 
                      onChange={handleInputChange} 
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-colors"
                      disabled={submitting}
                      placeholder="e.g., Technology, Health, Lifestyle"
                    />
                  </div>
                  
                  {/* Author */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Author
                    </label>
                    <input 
                      name="author" 
                      value={formData.author || ''} 
                      onChange={handleInputChange} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-colors"
                      disabled={submitting}
                      placeholder={adminUser ? `${adminUser.firstName} ${adminUser.lastName}` : 'Enter author name'}
                    />
                  </div>
                  
                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags
                    </label>
                    <input 
                      value={formData.tags?.join(', ') || ''} 
                      onChange={handleTagsChange} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-colors"
                      disabled={submitting}
                      placeholder="tag1, tag2, tag3"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Separate tags with commas
                    </p>
                  </div>
                  
                  {/* Featured Image */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Featured Image
                    </label>
                    <div className="flex flex-col gap-2">
                      <input
                        name="featuredImage"
                        value={formData.featuredImage || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-colors"
                        placeholder="Enter image URL"
                        disabled={submitting}
                      />

                      <span className="text-sm text-gray-500">Or upload an image:</span>
                      
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;

                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormData(prev => ({ ...prev, featuredImage: reader.result as string }));
                          };
                          reader.readAsDataURL(file);
                        }}
                        className="w-full"
                        disabled={submitting}
                      />
                    </div>

                    {/* Preview */}
                    {formData.featuredImage && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600 mb-1">Preview:</p>
                        <img
                          src={formData.featuredImage}
                          alt="Preview"
                          className="w-full h-32 object-cover rounded border border-gray-200"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder.svg?height=128&width=400';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button 
                  type="button" 
                  onClick={handleCloseModal}
                  disabled={submitting}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="px-4 py-2 bg-gold text-white rounded-md hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {editingPost ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    editingPost ? 'Update Post' : 'Create Post'
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

export default AdminBlog;