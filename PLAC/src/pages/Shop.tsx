import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { productAPI } from '../services/api';

interface Product {
  _id: string;
  id?: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  inStock: boolean;
  rating?: number;
}

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productAPI.getForShop();
        setProducts(response.data || response.data.products || []);
      } catch (err: any) {
        setError(err.message || 'Failed to load products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-text text-xl">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">
            Our Sound Healing Products
          </h1>
          <p className="text-text/60 text-lg">
            Discover our collection of singing bowls and sound healing instruments
          </p>
        </motion.div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text/60 text-lg">No products available yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link key={product._id || product.id} to={`/shop/${product.id || product._id}`}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-secondary/5 border border-secondary/20 rounded-lg overflow-hidden hover:border-secondary/50 transition-all cursor-pointer"
                >
                  {product.images && product.images[0] && (
                    <div className="h-64 bg-secondary/10 overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-text mb-2">
                      {product.name}
                    </h3>
                    <p className="text-text/60 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-secondary text-xl font-bold">
                        ${product.price}
                      </span>
                      <span
                        className={`text-sm px-3 py-1 rounded-full ${
                          product.inStock
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
