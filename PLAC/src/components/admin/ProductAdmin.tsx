import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { productAPI } from '../../services/api';

interface Product {
  _id?: string;
  id?: string;
  name: string;
  price: number;
  description: string;
  category: string;
  inStock: boolean;
  images?: string[];
  size?: string;
  tone?: string;
  type?: string;
  weight?: number;
  musicalNote?: string;
  bowlCode?: string;
  brand?: string;
  soundInstrument?: string;
  video?: string;
  audio?: string;
  details?: string[];
  careInstructions?: string[];
  rating?: number;
  reviewCount?: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  isSet?: boolean;
}

const CATEGORIES = [
  'Singing Bowls',
  'Sound Instruments',
  'Accessories',
  'Books & Media',
  'Sets & Kits',
];

const SOUND_INSTRUMENTS = [
  'Himalayan Singing Bowl',
  'Crystal Singing Bowl',
  'Tibetan Singing Bowl',
  'Tingsha',
  'Gong',
  'Chime',
  'Bell',
  'Drums',
];

const SIZES = ['Small', 'Medium', 'Large', 'Extra Large', 'Mini'];

const TONES = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
  'Om',
  'Chakra',
  'Unknown',
];

const TYPES = [
  'Therapeutic',
  'Meditation',
  'Decorative',
  'Professional',
  'Antique',
  'Modern',
];

function generateId(): string {
  const ts = Date.now();
  const rand = Math.random().toString(36).substring(2, 9);
  return `bowl-${ts}-${rand}`;
}

export default function ProductAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showSeo, setShowSeo] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoFileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    id: generateId(),
    name: '',
    price: '',
    description: '',
    category: '',
    soundInstrument: '',
    size: '',
    weight: '',
    tone: '',
    type: '',
    musicalNote: '',
    bowlCode: '',
    brand: 'OMSound Nepal',
    video: '',
    audio: '',
    inStock: true,
    rating: '',
    reviewCount: '',
    isSet: false,
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
  });

  const [details, setDetails] = useState<string[]>(['']);
  const [careInstructions, setCareInstructions] = useState<string[]>(['']);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getAll();
      setProducts(response.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      id: generateId(),
      name: '',
      price: '',
      description: '',
      category: '',
      soundInstrument: '',
      size: '',
      weight: '',
      tone: '',
      type: '',
      musicalNote: '',
      bowlCode: '',
      brand: 'OMSound Nepal',
      video: '',
      audio: '',
      inStock: true,
      rating: '',
      reviewCount: '',
      isSet: false,
      seoTitle: '',
      seoDescription: '',
      seoKeywords: '',
    });
    setDetails(['']);
    setCareInstructions(['']);
    setImageFiles([]);
    setVideoFile(null);
    setImagePreviews([]);
    setShowSeo(false);
    setEditingId(null);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImageFiles((prev) => [...prev, ...files]);
    const previews = files.map((f) => URL.createObjectURL(f));
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  const removeImage = (idx: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== idx));
    setImagePreviews((prev) => {
      URL.revokeObjectURL(prev[idx]);
      return prev.filter((_, i) => i !== idx);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.category) {
      alert('Please fill in required fields: Name, Price, Category');
      return;
    }
    if (imageFiles.length === 0 && !editingId) {
      alert('Please upload at least one product image');
      return;
    }

    try {
      setIsAdding(true);
      const fd = new FormData();

      fd.append('id', formData.id);
      fd.append('name', formData.name);
      fd.append('price', formData.price);
      fd.append('category', formData.category);
      fd.append('soundInstrument', formData.soundInstrument);
      fd.append('description', formData.description);
      fd.append('brand', formData.brand);
      fd.append('inStock', String(formData.inStock));
      fd.append('isSet', String(formData.isSet));

      if (formData.rating) fd.append('rating', formData.rating);
      if (formData.reviewCount) fd.append('reviewCount', formData.reviewCount);

      if (!formData.isSet) {
        fd.append('size', formData.size);
        fd.append('tone', formData.tone);
        fd.append('type', formData.type);
        fd.append('weight', formData.weight || '0');
        fd.append('musicalNote', formData.musicalNote);
        fd.append('bowlCode', formData.bowlCode);
      }

      const validDetails = details.filter((d) => d.trim());
      validDetails.forEach((d) => fd.append('details[]', d));

      const validCare = careInstructions.filter((c) => c.trim());
      validCare.forEach((c) => fd.append('careInstructions[]', c));

      if (formData.video) fd.append('video', formData.video);
      if (formData.audio) fd.append('audio', formData.audio);

      if (formData.seoTitle) fd.append('seoTitle', formData.seoTitle);
      if (formData.seoDescription) fd.append('seoDescription', formData.seoDescription);
      if (formData.seoKeywords) fd.append('seoKeywords', formData.seoKeywords);

      imageFiles.forEach((file) => fd.append('images', file));
      if (videoFile) fd.append('video', videoFile);

      if (editingId) {
        await productAPI.update(editingId, fd);
      } else {
        await productAPI.create(fd);
      }

      resetForm();
      setShowForm(false);
      fetchProducts();
    } catch (error: any) {
      console.error('Error saving product:', error);
      const msg = error?.response?.data?.message || error?.response?.data?.error || 'Failed to save product';
      alert(msg);
    } finally {
      setIsAdding(false);
    }
  };

  const handleEdit = (product: Product) => {
    setFormData({
      id: product.id || product._id || '',
      name: product.name,
      price: String(product.price),
      description: product.description,
      category: product.category,
      soundInstrument: product.soundInstrument || '',
      size: product.size || '',
      weight: product.weight ? String(product.weight) : '',
      tone: product.tone || '',
      type: product.type || '',
      musicalNote: product.musicalNote || '',
      bowlCode: product.bowlCode || '',
      brand: product.brand || 'OMSound Nepal',
      video: product.video || '',
      audio: product.audio || '',
      inStock: product.inStock,
      rating: product.rating ? String(product.rating) : '',
      reviewCount: product.reviewCount ? String(product.reviewCount) : '',
      isSet: product.isSet || false,
      seoTitle: product.seoTitle || '',
      seoDescription: product.seoDescription || '',
      seoKeywords: product.seoKeywords || '',
    });
    setDetails(product.details?.length ? product.details : ['']);
    setCareInstructions(product.careInstructions?.length ? product.careInstructions : ['']);
    setImagePreviews(product.images || []);
    setEditingId(product._id || product.id || null);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await productAPI.delete(id);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  const addDetail = () => setDetails((prev) => [...prev, '']);
  const removeDetail = (idx: number) =>
    setDetails((prev) => prev.filter((_, i) => i !== idx));
  const updateDetail = (idx: number, val: string) =>
    setDetails((prev) => prev.map((d, i) => (i === idx ? val : d)));

  const addCare = () => setCareInstructions((prev) => [...prev, '']);
  const removeCare = (idx: number) =>
    setCareInstructions((prev) => prev.filter((_, i) => i !== idx));
  const updateCare = (idx: number, val: string) =>
    setCareInstructions((prev) => prev.map((c, i) => (i === idx ? val : c)));

  const inputClass =
    'w-full bg-background border border-secondary/20 rounded px-4 py-2.5 text-text placeholder-text/40 focus:outline-none focus:border-secondary transition';
  const labelClass = 'block text-sm font-medium text-text mb-1';
  const selectClass = inputClass;
  const btnPrimary =
    'px-6 py-2.5 bg-secondary text-background rounded-lg font-semibold hover:bg-secondary/90 disabled:opacity-50 transition';
  const btnOutline =
    'px-4 py-2 border border-secondary/30 text-text rounded-lg hover:bg-secondary/10 transition';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-text">Products</h2>
        {!showForm && (
          <button onClick={() => { resetForm(); setShowForm(true); }} className={btnPrimary}>
            + Add New Product
          </button>
        )}
      </div>

      {/* Product Form */}
      <AnimatePresence>
        {showForm && (
          <motion.form
            key="product-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit}
            className="bg-secondary/5 border border-secondary/20 rounded-xl p-6 md:p-8 space-y-8"
          >
            {/* Product Type Toggle */}
            <div>
              <label className={labelClass}>Product Type</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="isSet"
                    checked={!formData.isSet}
                    onChange={() => setFormData({ ...formData, isSet: false })}
                    className="accent-secondary"
                  />
                  <span className="text-text">Single Singing Bowl</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="isSet"
                    checked={formData.isSet}
                    onChange={() => setFormData({ ...formData, isSet: true })}
                    className="accent-secondary"
                  />
                  <span className="text-text">Singing Bowl Set</span>
                </label>
              </div>
            </div>

            {/* Product ID */}
            <div>
              <label className={labelClass}>Product ID *</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  className={inputClass}
                  required
                />
                <button type="button" onClick={() => setFormData({ ...formData, id: generateId() })} className={btnOutline}>
                  Regenerate
                </button>
              </div>
              <p className="text-xs text-text/40 mt-1">Unique identifier used in URLs and database</p>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Product Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Price ($) *</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Brand</label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Categorization */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className={selectClass}
                  required
                >
                  <option value="">Select Category</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Sound Instrument *</label>
                <select
                  value={formData.soundInstrument}
                  onChange={(e) => setFormData({ ...formData, soundInstrument: e.target.value })}
                  className={selectClass}
                  required
                >
                  <option value="">Select Instrument</option>
                  {SOUND_INSTRUMENTS.map((si) => (
                    <option key={si} value={si}>{si}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Bowl-specific fields (hidden for sets) */}
            {!formData.isSet && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className={labelClass}>Size *</label>
                    <select
                      value={formData.size}
                      onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                      className={selectClass}
                      required
                    >
                      <option value="">Select Size</option>
                      {SIZES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Weight (kg) *</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Tone *</label>
                    <select
                      value={formData.tone}
                      onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                      className={selectClass}
                      required
                    >
                      <option value="">Select Tone</option>
                      {TONES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Type *</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className={selectClass}
                      required
                    >
                      <option value="">Select Type</option>
                      {TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Musical Note (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g., F4, C3"
                      value={formData.musicalNote}
                      onChange={(e) => setFormData({ ...formData, musicalNote: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Bowl Code *</label>
                    <input
                      type="text"
                      placeholder="e.g., SB-001, HB-2024"
                      value={formData.bowlCode}
                      onChange={(e) => setFormData({ ...formData, bowlCode: e.target.value })}
                      className={inputClass}
                      required
                    />
                    <p className="text-xs text-text/40 mt-1">Unique code for this singing bowl</p>
                  </div>
                </div>
              </>
            )}

            {/* Description */}
            <div>
              <label className={labelClass}>Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={inputClass}
                rows={4}
                required
              />
            </div>

            {/* Product Details */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className={labelClass}>Product Details</label>
                <button type="button" onClick={addDetail} className="text-sm text-secondary hover:text-secondary/70">
                  + Add Detail
                </button>
              </div>
              <div className="space-y-2">
                {details.map((d, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={d}
                      onChange={(e) => updateDetail(idx, e.target.value)}
                      placeholder="Product specification"
                      className={inputClass}
                    />
                    {details.length > 1 && (
                      <button type="button" onClick={() => removeDetail(idx)} className="px-3 text-red-400 hover:text-red-300">
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Care Instructions */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className={labelClass}>Care Instructions</label>
                <button type="button" onClick={addCare} className="text-sm text-secondary hover:text-secondary/70">
                  + Add Instruction
                </button>
              </div>
              <div className="space-y-2">
                {careInstructions.map((c, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={c}
                      onChange={(e) => updateCare(idx, e.target.value)}
                      placeholder="Care instruction"
                      className={inputClass}
                    />
                    {careInstructions.length > 1 && (
                      <button type="button" onClick={() => removeCare(idx)} className="px-3 text-red-400 hover:text-red-300">
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Images */}
            <div>
              <label className={labelClass}>Product Images *</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-secondary/30 rounded-lg p-8 text-center cursor-pointer hover:border-secondary/60 transition"
              >
                <p className="text-text/60">Click to upload or drag and drop images</p>
                <button type="button" className={`${btnOutline} mt-3`}>Choose Images</button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-4 md:grid-cols-6 gap-3 mt-4">
                  {imagePreviews.map((src, idx) => (
                    <div key={idx} className="relative group">
                      <img src={src} alt={`Preview ${idx}`} className="w-full h-24 object-cover rounded-lg border border-secondary/20" />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Video & Audio */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Upload Product Video</label>
                <input
                  ref={videoFileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Or Video URL</label>
                <input
                  type="url"
                  placeholder="https://example.com/video.mp4"
                  value={formData.video}
                  onChange={(e) => setFormData({ ...formData, video: e.target.value })}
                  className={inputClass}
                />
                <p className="text-xs text-text/40 mt-1">Upload a video file or provide a URL</p>
              </div>
              <div>
                <label className={labelClass}>Audio Sample URL</label>
                <input
                  type="url"
                  placeholder="https://example.com/audio.mp3"
                  value={formData.audio}
                  onChange={(e) => setFormData({ ...formData, audio: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Stock & Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.inStock}
                  onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                  className="accent-secondary w-5 h-5"
                />
                <span className="text-text font-medium">Product In Stock</span>
              </label>
              <div>
                <label className={labelClass}>Rating</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Review Count</label>
                <input
                  type="number"
                  min="0"
                  value={formData.reviewCount}
                  onChange={(e) => setFormData({ ...formData, reviewCount: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            {/* SEO Section */}
            <div>
              <button
                type="button"
                onClick={() => setShowSeo(!showSeo)}
                className="flex items-center gap-2 text-secondary font-semibold hover:text-secondary/70 transition"
              >
                {showSeo ? '▼' : '▶'} SEO & Marketing
              </button>
              <AnimatePresence>
                {showSeo && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 space-y-4">
                      <div>
                        <label className={labelClass}>SEO Title</label>
                        <input
                          type="text"
                          value={formData.seoTitle}
                          onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                          className={inputClass}
                          placeholder="Custom title for search engines"
                        />
                      </div>
                      <div>
                        <label className={labelClass}>SEO Description</label>
                        <textarea
                          value={formData.seoDescription}
                          onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                          className={inputClass}
                          rows={2}
                          placeholder="Meta description for search results"
                        />
                      </div>
                      <div>
                        <label className={labelClass}>SEO Keywords</label>
                        <input
                          type="text"
                          value={formData.seoKeywords}
                          onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })}
                          className={inputClass}
                          placeholder="Comma-separated keywords"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4 border-t border-secondary/20">
              <button type="submit" disabled={isAdding} className={btnPrimary}>
                {isAdding ? 'Saving...' : editingId ? 'Update Product' : 'Create Product'}
              </button>
              {!showSeo && (
                <button type="button" onClick={() => setShowSeo(true)} className={btnOutline}>
                  Continue to SEO
                </button>
              )}
              <button
                type="button"
                onClick={() => { setShowForm(false); resetForm(); }}
                className="px-6 py-2.5 text-text/60 hover:text-text transition"
              >
                Cancel
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Products List */}
      {loading ? (
        <div className="text-center py-8 text-text/60">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-text/60 text-lg mb-4">No products yet</p>
          {!showForm && (
            <button onClick={() => { resetForm(); setShowForm(true); }} className={btnPrimary}>
              Add Your First Product
            </button>
          )}
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          {products.map((product) => (
            <div
              key={product._id || product.id}
              className="bg-secondary/5 border border-secondary/20 rounded-lg p-4 flex items-center gap-4"
            >
              {product.images?.[0] && (
                <img src={product.images[0]} alt="" className="w-16 h-16 object-cover rounded-lg" />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-text truncate">{product.name}</h3>
                <div className="flex gap-4 text-sm text-text/60 mt-1">
                  <span>${product.price}</span>
                  <span>{product.category}</span>
                  {product.size && <span>{product.size}</span>}
                  {product.isSet && <span className="text-secondary font-medium">Set</span>}
                  <span className={product.inStock ? 'text-green-400' : 'text-red-400'}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => handleEdit(product)} className="px-4 py-2 text-sm border border-secondary/30 text-text rounded-lg hover:bg-secondary/10 transition">
                  Edit
                </button>
                <button onClick={() => handleDelete(product._id || product.id || '')} className="px-4 py-2 text-sm bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
