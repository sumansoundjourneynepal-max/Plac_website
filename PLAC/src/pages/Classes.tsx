import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { classAPI } from '../services/api';

interface Class {
  _id: string;
  id?: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  level: string;
  instructor: string;
  schedule: string;
  maxStudents: number;
  enrolledStudents: number;
  image?: string;
}

export default function Classes() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const response = await classAPI.getAll();
        setClasses(response.data || response.data.classes || []);
      } catch (err: any) {
        setError(err.message || 'Failed to load classes');
        console.error('Error fetching classes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-text text-xl">Loading classes...</div>
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
            Sound Healing Classes
          </h1>
          <p className="text-text/60 text-lg">
            Learn the art and science of sound healing from our experienced instructors
          </p>
        </motion.div>

        {classes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text/60 text-lg">No classes available yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {classes.map((cls) => (
              <Link key={cls._id || cls.id} to={`/classes/${cls.id || cls._id}`}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-secondary/5 border border-secondary/20 rounded-lg overflow-hidden hover:border-secondary/50 transition-all cursor-pointer h-full"
                >
                  {cls.image && (
                    <div className="h-48 bg-secondary/10 overflow-hidden">
                      <img
                        src={cls.image}
                        alt={cls.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-text flex-1">
                        {cls.name}
                      </h3>
                      <span className="bg-secondary/20 text-secondary text-xs px-2 py-1 rounded">
                        {cls.level}
                      </span>
                    </div>
                    <p className="text-text/60 text-sm mb-4 line-clamp-2">
                      {cls.description}
                    </p>

                    <div className="space-y-2 text-text/70 text-sm mb-4">
                      <p>Instructor: {cls.instructor}</p>
                      <p>Duration: {cls.duration}</p>
                      <p>Schedule: {cls.schedule}</p>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-secondary/20">
                      <span className="text-secondary text-xl font-bold">
                        ${cls.price}
                      </span>
                      <span className="text-text/60 text-sm">
                        {cls.enrolledStudents}/{cls.maxStudents}
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
