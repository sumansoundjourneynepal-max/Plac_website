import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { bookingAPI } from '../services/api';

interface PackageLite {
  _id?: string;
  id?: string;
  name: string;
  mode: 'physical' | 'virtual' | 'both';
  availability?: { label: string; days?: string; startTime: string; endTime: string }[];
}

interface BookingModalProps {
  pkg: PackageLite;
  onClose: () => void;
}

export default function BookingModal({ pkg, onClose }: BookingModalProps) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    mode: (pkg.mode === 'both' ? 'physical' : pkg.mode) as 'physical' | 'virtual',
    address: '',
    preferredWindow: pkg.availability?.[0]
      ? `${pkg.availability[0].label} (${pkg.availability[0].startTime} - ${pkg.availability[0].endTime})`
      : '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (form.mode === 'physical' && !form.address.trim()) {
      setError('Please provide an address for the physical session.');
      return;
    }

    try {
      setSubmitting(true);
      await bookingAPI.create({
        packageId: pkg.id || pkg._id || '',
        name: form.name,
        email: form.email,
        phone: form.phone,
        mode: form.mode,
        address: form.mode === 'physical' ? form.address : undefined,
        preferredWindow: form.preferredWindow,
        message: form.message,
      });
      setSubmitted(true);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to submit your request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-background border border-secondary/20 rounded-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto"
        >
          {submitted ? (
            <div className="text-center py-8">
              <h3 className="text-2xl font-bold text-text mb-2">Request received!</h3>
              <p className="text-text/60 mb-6">
                Thank you for your interest in {pkg.name}. We'll reach out to you shortly to confirm the details.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-secondary text-background rounded font-semibold hover:bg-secondary/90 transition"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-text">Book: {pkg.name}</h3>
                <button
                  onClick={onClose}
                  className="text-text/60 hover:text-text text-xl leading-none"
                  aria-label="Close"
                >
                  &times;
                </button>
              </div>
              <p className="text-text/60 text-sm mb-6">
                Fill this in and our team will confirm your session by email or phone.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-secondary/5 border border-secondary/20 rounded px-4 py-2 text-text placeholder-text/40 focus:outline-none focus:border-secondary"
                  required
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="bg-secondary/5 border border-secondary/20 rounded px-4 py-2 text-text placeholder-text/40 focus:outline-none focus:border-secondary"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="bg-secondary/5 border border-secondary/20 rounded px-4 py-2 text-text placeholder-text/40 focus:outline-none focus:border-secondary"
                    required
                  />
                </div>

                {pkg.mode === 'both' && (
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-text/80 text-sm">
                      <input
                        type="radio"
                        name="mode"
                        checked={form.mode === 'physical'}
                        onChange={() => setForm({ ...form, mode: 'physical' })}
                      />
                      In-person (physical)
                    </label>
                    <label className="flex items-center gap-2 text-text/80 text-sm">
                      <input
                        type="radio"
                        name="mode"
                        checked={form.mode === 'virtual'}
                        onChange={() => setForm({ ...form, mode: 'virtual' })}
                      />
                      Live / Virtual
                    </label>
                  </div>
                )}

                {form.mode === 'physical' && (
                  <input
                    type="text"
                    placeholder="Your address (for the session)"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full bg-secondary/5 border border-secondary/20 rounded px-4 py-2 text-text placeholder-text/40 focus:outline-none focus:border-secondary"
                    required
                  />
                )}

                {pkg.availability && pkg.availability.length > 0 ? (
                  <select
                    value={form.preferredWindow}
                    onChange={(e) => setForm({ ...form, preferredWindow: e.target.value })}
                    className="w-full bg-secondary/5 border border-secondary/20 rounded px-4 py-2 text-text focus:outline-none focus:border-secondary"
                  >
                    {pkg.availability.map((w, i) => (
                      <option key={i} value={`${w.label} (${w.startTime} - ${w.endTime})`}>
                        {w.label} — {w.startTime} to {w.endTime}
                        {w.days ? ` (${w.days})` : ''}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    placeholder="Preferred time / date"
                    value={form.preferredWindow}
                    onChange={(e) => setForm({ ...form, preferredWindow: e.target.value })}
                    className="w-full bg-secondary/5 border border-secondary/20 rounded px-4 py-2 text-text placeholder-text/40 focus:outline-none focus:border-secondary"
                  />
                )}

                <textarea
                  placeholder="Anything else we should know? (optional)"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={3}
                  className="w-full bg-secondary/5 border border-secondary/20 rounded px-4 py-2 text-text placeholder-text/40 focus:outline-none focus:border-secondary"
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full px-6 py-3 bg-secondary text-background rounded font-semibold hover:bg-secondary/90 disabled:opacity-50 transition"
                >
                  {submitting ? 'Sending...' : 'Send Booking Request'}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
