import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { productAPI } from '../services/api';

interface Product {
  _id: string;
  id?: string;
  name: string;
  price: number;
  description: string;
  details?: string[];
  images: string[];
  category: string;
  inStock: boolean;
  rating?: number;
  reviewCount?: number;
  size?: string;
  tone?: string;
  weight?: number;
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const response = await productAPI.getById(id);
        setProduct(response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-text text-xl">Loading product...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">{error || 'Product not found'}</p>
          <button
            onClick={() => navigate('/shop')}
            className="px-6 py-2 bg-secondary text-background rounded-lg hover:bg-secondary/90 transition"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <button
        onClick={() => navigate('/shop')}
        className="mb-8 text-secondary hover:text-secondary/70 transition"
      >
        ← Back to Shop
      </button>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Images */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {product.images && product.images[selectedImage] && (
            <div className="mb-4 rounded-lg overflow-hidden bg-secondary/10">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
          )}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded border-2 transition ${
                    selectedImage === idx
                      ? 'border-secondary'
                      : 'border-secondary/20'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl font-bold text-text mb-2">{product.name}</h1>
          <p className="text-text/60 mb-6">{product.category}</p>

          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-3xl font-bold text-secondary">${product.price}</span>
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

          <p className="text-text/80 mb-6 leading-relaxed">{product.description}</p>

          {/* Specifications */}
          <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-text mb-4">Specifications</h3>
            <div className="space-y-2 text-text/70">
              {product.size && <p>Size: {product.size}</p>}
              {product.tone && <p>Tone: {product.tone}</p>}
              {product.weight && <p>Weight: {product.weight}g</p>}
              {product.rating && (
                <p>Rating: {product.rating} / 5 ({product.reviewCount || 0} reviews)</p>
              )}
            </div>
          </div>

          {/* Details */}
          {product.details && product.details.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-text mb-4">Details</h3>
              <ul className="space-y-2 text-text/70">
                {product.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            className={`w-full py-3 rounded-lg font-semibold transition mb-4 ${
              product.inStock
                ? 'bg-secondary text-background hover:bg-secondary/90'
                : 'bg-secondary/30 text-text cursor-not-allowed opacity-50'
            }`}
            disabled={!product.inStock}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
