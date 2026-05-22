import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { classAPI } from '../../services/api';

interface Class {
  _id?: string;
  id?: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  level: string;
  instructor: string;
  schedule: string;
  maxStudents: number;
}

export default function ClassAdmin() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    level: 'Beginner',
    instructor: '',
    schedule: '',
    maxStudents: '20',
  });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await classAPI.getAll();
      setClasses(response.data || []);
    } catch (error) {
      console.error('Error fetching classes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsAdding(true);
      await classAPI.create({
        ...formData,
        price: parseFloat(formData.price),
        maxStudents: parseInt(formData.maxStudents),
      });
      setFormData({
        name: '',
        description: '',
        price: '',
        duration: '',
        level: 'Beginner',
        instructor: '',
        schedule: '',
        maxStudents: '20',
      });
      fetchClasses();
    } catch (error) {
      console.error('Error creating class:', error);
      alert('Failed to create class');
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await classAPI.delete(id);
      fetchClasses();
    } catch (error) {
      console.error('Error deleting class:', error);
      alert('Failed to delete class');
    }
  };

  return (
    <div className="space-y-8">
      {/* Add Class Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-secondary/5 border border-secondary/20 rounded-lg p-6"
      >
        <h2 className="text-2xl font-bold text-text mb-6">Add New Class</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Class Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-background border border-secondary/20 rounded px-4 py-2 text-text placeholder-text/40 focus:outline-none focus:border-secondary"
            required
          />
          <input
            type="text"
            placeholder="Instructor"
            value={formData.instructor}
            onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
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
            placeholder="Duration (e.g., 4 weeks)"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            className="bg-background border border-secondary/20 rounded px-4 py-2 text-text placeholder-text/40 focus:outline-none focus:border-secondary"
            required
          />
          <input
            type="text"
            placeholder="Schedule (e.g., Mon & Wed 6PM)"
            value={formData.schedule}
            onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
            className="bg-background border border-secondary/20 rounded px-4 py-2 text-text placeholder-text/40 focus:outline-none focus:border-secondary"
            required
          />
          <select
            value={formData.level}
            onChange={(e) => setFormData({ ...formData, level: e.target.value })}
            className="bg-background border border-secondary/20 rounded px-4 py-2 text-text focus:outline-none focus:border-secondary"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
          <input
            type="number"
            placeholder="Max Students"
            value={formData.maxStudents}
            onChange={(e) => setFormData({ ...formData, maxStudents: e.target.value })}
            className="bg-background border border-secondary/20 rounded px-4 py-2 text-text placeholder-text/40 focus:outline-none focus:border-secondary"
            required
          />
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
          {isAdding ? 'Adding...' : 'Add Class'}
        </button>
      </motion.form>

      {/* Classes List */}
      {loading ? (
        <div className="text-center py-8 text-text/60">Loading classes...</div>
      ) : classes.length === 0 ? (
        <div className="text-center py-8 text-text/60">No classes yet</div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {classes.map((cls) => (
            <div
              key={cls._id || cls.id}
              className="bg-secondary/5 border border-secondary/20 rounded-lg p-4 flex justify-between items-start"
            >
              <div>
                <h3 className="text-lg font-semibold text-text">{cls.name}</h3>
                <p className="text-text/60 text-sm">{cls.description}</p>
                <div className="flex gap-4 mt-2 text-sm text-text/60">
                  <span>${cls.price}</span>
                  <span>{cls.instructor}</span>
                  <span>{cls.duration}</span>
                  <span>{cls.level}</span>
                  <span>{cls.schedule}</span>
                  <span>Max: {cls.maxStudents}</span>
                </div>
              </div>
              <button
                onClick={() => handleDelete(cls._id || cls.id || '')}
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
