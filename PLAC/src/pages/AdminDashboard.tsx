import { useState } from 'react';
import { motion } from 'framer-motion';
import ProductAdmin from '../components/admin/ProductAdmin';
import ClassAdmin from '../components/admin/ClassAdmin';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'products' | 'classes'>('products');

  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-text mb-2">Admin Dashboard</h1>
          <p className="text-text/60">Manage your products and classes</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-secondary/20">
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-4 px-4 font-semibold transition ${
              activeTab === 'products'
                ? 'text-secondary border-b-2 border-secondary'
                : 'text-text/60 hover:text-text'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('classes')}
            className={`pb-4 px-4 font-semibold transition ${
              activeTab === 'classes'
                ? 'text-secondary border-b-2 border-secondary'
                : 'text-text/60 hover:text-text'
            }`}
          >
            Classes
          </button>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {activeTab === 'products' && <ProductAdmin />}
          {activeTab === 'classes' && <ClassAdmin />}
        </motion.div>
      </div>
    </div>
  );
}
