import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { bookingAPI } from '../../services/api';

interface Booking {
  _id: string;
  packageName: string;
  name: string;
  email: string;
  phone: string;
  mode: 'physical' | 'virtual';
  address?: string;
  preferredWindow?: string;
  message?: string;
  status: 'pending' | 'contacted' | 'confirmed' | 'cancelled';
  createdAt: string;
}

const STATUS_OPTIONS = ['pending', 'contacted', 'confirmed', 'cancelled'];

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-500',
  contacted: 'bg-blue-500/20 text-blue-400',
  confirmed: 'bg-green-500/20 text-green-400',
  cancelled: 'bg-red-500/20 text-red-400',
};

export default function BookingsAdmin() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchBookings();
  }, [filter]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await bookingAPI.getAll(filter || undefined);
      setBookings(response.data?.data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await bookingAPI.updateStatus(id, status);
      fetchBookings();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this booking request?')) return;
    try {
      await bookingAPI.delete(id);
      fetchBookings();
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold text-text">Booking Requests</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-background border border-secondary/20 rounded px-3 py-1.5 text-sm text-text focus:outline-none focus:border-secondary"
        >
          <option value="">All statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center py-8 text-text/60">Loading...</div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-8 text-text/60">No booking requests yet</div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {bookings.map((b) => (
            <div key={b._id} className="bg-secondary/5 border border-secondary/20 rounded-lg p-4">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-text">{b.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded ${STATUS_COLORS[b.status]}`}>
                      {b.status}
                    </span>
                  </div>
                  <p className="text-text/70 text-sm">{b.packageName}</p>
                  <div className="text-text/60 text-sm mt-2 space-y-0.5">
                    <p>{b.email} · {b.phone}</p>
                    <p>
                      {b.mode === 'physical' ? 'Physical' : 'Live / Virtual'}
                      {b.address ? ` — ${b.address}` : ''}
                    </p>
                    {b.preferredWindow && <p>Preferred: {b.preferredWindow}</p>}
                    {b.message && <p className="italic">"{b.message}"</p>}
                    <p className="text-text/40 text-xs">{new Date(b.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <select
                    value={b.status}
                    onChange={(e) => handleStatusChange(b._id, e.target.value)}
                    className="bg-background border border-secondary/20 rounded px-3 py-1.5 text-sm text-text focus:outline-none focus:border-secondary"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleDelete(b._id)}
                    className="text-red-400 text-sm hover:text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
