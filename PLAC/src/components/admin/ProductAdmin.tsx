import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
}

export default function ProductAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    inStock: true,
  });
  const [isAdding, setIsAdding] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsAdding(true);
      await productAPI.create(formData);
      setFormData({
        name: '',
        price: '',
        description: '',
        category: '',
        inStock: true,
      });
      fetchProducts();
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product');
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await productAPI.delete(id);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  return (
    <div className="space-y-8">
      {/* Add Product Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-secondary/5 border border-secondary/20 rounded-lg p-6"
      >
        <h2 className="text-2xl font-bold text-text mb-6">Add New Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Product Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-background border border-secondary/20 rounded px-4 py-2 text-text placeholder-text/40 focus:outline-none focus:border-secondary"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="bg-background border border-secondary/20 rounded px-4 py-2 text-text placeholder-text/40 focus:outline-none focus:border-secondary"
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="bg-background border border-secondary/20 rounded px-4 py-2 text-text placeholder-text/40 focus:outline-none focus:border-secondary"
            required
          />
          <label className="flex items-center gap-2 text-text cursor-pointer">
            <input
              type="checkbox"
              checked={formData.inStock}
              onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
            />
            In Stock
          </label>
        </div>
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full bg-background border border-secondary/20 rounded px-4 py-2 text-text placeholder-text/40 focus:outline-none focus:border-secondary mb-4"
          rows={3}
          required
        />
        <button
          type="submit"
          disabled={isAdding}
          className="px-6 py-2 bg-secondary text-background rounded font-semibold hover:bg-secondary/90 disabled:opacity-50 transition"
        >
          {isAdding ? 'Adding...' : 'Add Product'}
        </button>
      </motion.form>

      {/* Products List */}
      {loading ? (
        <div className="text-center py-8 text-text/60">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-8 text-text/60">No products yet</div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {products.map((product) => (
            <div
              key={product._id || product.id}
              className="bg-secondary/5 border border-secondary/20 rounded-lg p-4 flex justify-between items-start"
            >
              <div>
                <h3 className="text-lg font-semibold text-text">{product.name}</h3>
                <p className="text-text/60 text-sm">{product.description}</p>
                <div className="flex gap-4 mt-2 text-sm text-text/60">
                  <span>${product.price}</span>
                  <span>{product.category}</span>
                  <span className={product.inStock ? 'text-green-400' : 'text-red-400'}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleDelete(product._id || product.id || '')}
                className="px-4 py-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
