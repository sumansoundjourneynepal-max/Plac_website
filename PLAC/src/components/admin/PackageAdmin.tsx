import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { packageAPI } from '../../services/api';

interface AvailabilityWindow {
  label: string;
  days: string;
  startTime: string;
  endTime: string;
}

interface Package {
  _id?: string;
  id?: string;
  name: string;
  category: string;
  mode: 'physical' | 'virtual' | 'both';
  description: string;
  price?: number;
  priceNote?: string;
  duration?: string;
  bookingType: 'self-service' | 'inquiry';
  availability?: AvailabilityWindow[];
  isActive?: boolean;
}

const CATEGORIES = [
  { value: 'regular', label: 'Regular Session' },
  { value: 'private', label: 'Private Session' },
  { value: 'special', label: 'Special Session' },
  { value: 'sound-therapy-course', label: 'Sound Therapy Course' },
  { value: 'himalayan-sound-journey', label: 'Himalayan Sound Journey (14-day)' },
];

const DEFAULT_AVAILABILITY: AvailabilityWindow[] = [
  { label: 'Morning', days: '', startTime: '06:00', endTime: '08:00' },
  { label: 'Evening', days: '', startTime: '18:00', endTime: '21:00' },
];

const emptyForm = {
  id: '',
  name: '',
  category: 'regular',
  mode: 'both' as 'physical' | 'virtual' | 'both',
  description: '',
  price: '',
  priceNote: '',
  duration: '',
  bookingType: 'inquiry' as 'self-service' | 'inquiry',
  isActive: true,
};

export default function PackageAdmin() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(emptyForm);
  const [availability, setAvailability] = useState<AvailabilityWindow[]>(DEFAULT_AVAILABILITY);
  const [useAvailability, setUseAvailability] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await packageAPI.getAllAdmin();
      setPackages(response.data?.data || []);
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateAvailabilityRow = (index: number, field: keyof AvailabilityWindow, value: string) => {
    setAvailability((prev) => prev.map((w, i) => (i === index ? { ...w, [field]: value } : w)));
  };

  const addAvailabilityRow = () => {
    setAvailability((prev) => [...prev, { label: '', days: '', startTime: '', endTime: '' }]);
  };

  const removeAvailabilityRow = (index: number) => {
    setAvailability((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const payload = new FormData();
      payload.append('id', formData.id || formData.name.toLowerCase().replace(/\s+/g, '-'));
      payload.append('name', formData.name);
      payload.append('category', formData.category);
      payload.append('mode', formData.mode);
      payload.append('description', formData.description);
      if (formData.price) payload.append('price', formData.price);
      payload.append('priceNote', formData.priceNote);
      payload.append('duration', formData.duration);
      payload.append('bookingType', formData.bookingType);
      payload.append('isActive', String(formData.isActive));
      payload.append('details', JSON.stringify([]));
      payload.append('existingImages', JSON.stringify([]));
      payload.append('availability', JSON.stringify(useAvailability ? availability.filter((w) => w.label && w.startTime && w.endTime) : []));

      await packageAPI.create(payload);
      setFormData(emptyForm);
      setAvailability(DEFAULT_AVAILABILITY);
      fetchPackages();
    } catch (error) {
      console.error('Error creating package:', error);
      alert('Failed to create package');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this package?')) return;
    try {
      await packageAPI.delete(id);
      fetchPackages();
    } catch (error) {
      console.error('Error deleting package:', error);
      alert('Failed to delete package');
    }
  };

  const handleToggleActive = async (pkg: Package) => {
    try {
      const payload = new FormData();
      payload.append('isActive', String(!pkg.isActive));
      await packageAPI.update(pkg._id || pkg.id || '', payload);
      fetchPackages();
    } catch (error) {
      console.error('Error updating package:', error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Add Package Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-secondary/5 border border-secondary/20 rounded-lg p-6"
      >
        <h2 className="text-2xl font-bold text-text mb-6">Add New Package</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Package Name (e.g. Morning Sound Bath)"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-background border border-secondary/20 rounded px-4 py-2 text-text placeholder-text/40 focus:outline-none focus:border-secondary"
            required
          />
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="bg-background border border-secondary/20 rounded px-4 py-2 text-text focus:outline-none focus:border-secondary"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>

          <select
            value={formData.mode}
            onChange={(e) => setFormData({ ...formData, mode: e.target.value as any })}
            className="bg-background border border-secondary/20 rounded px-4 py-2 text-text focus:outline-none focus:border-secondary"
          >
            <option value="both">Physical & Virtual</option>
            <option value="physical">Physical only</option>
            <option value="virtual">Virtual (Live) only</option>
          </select>

          <select
            value={formData.bookingType}
            onChange={(e) => setFormData({ ...formData, bookingType: e.target.value as any })}
            className="bg-background border border-secondary/20 rounded px-4 py-2 text-text focus:outline-none focus:border-secondary"
          >
            <option value="inquiry">Inquiry / Booking request</option>
            <option value="self-service">Self-service booking</option>
          </select>

          <input
            type="number"
            placeholder="Price (leave blank for 'Inquire within')"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="bg-background border border-secondary/20 rounded px-4 py-2 text-text placeholder-text/40 focus:outline-none focus:border-secondary"
          />
          <input
            type="text"
            placeholder="Price note (e.g. 'Inquire within')"
            value={formData.priceNote}
            onChange={(e) => setFormData({ ...formData, priceNote: e.target.value })}
            className="bg-background border border-secondary/20 rounded px-4 py-2 text-text placeholder-text/40 focus:outline-none focus:border-secondary"
          />
          <input
            type="text"
            placeholder="Duration (e.g. '1 hour' or '14 days')"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            className="bg-background border border-secondary/20 rounded px-4 py-2 text-text placeholder-text/40 focus:outline-none focus:border-secondary"
          />
          <label className="flex items-center gap-2 text-text/80">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
            />
            Active (visible on site)
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

        {/* Availability windows */}
        <div className="mb-4">
          <label className="flex items-center gap-2 text-text/80 mb-3">
            <input
              type="checkbox"
              checked={useAvailability}
              onChange={(e) => setUseAvailability(e.target.checked)}
            />
            Show availability windows (e.g. hourly 6-8am / 6-9pm). Uncheck for "inquire within" only.
          </label>

          {useAvailability && (
            <div className="space-y-2">
              {availability.map((w, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-5 gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Label (Morning/Evening)"
                    value={w.label}
                    onChange={(e) => updateAvailabilityRow(i, 'label', e.target.value)}
                    className="bg-background border border-secondary/20 rounded px-3 py-2 text-text text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Days (e.g. Mon-Sat)"
                    value={w.days}
                    onChange={(e) => updateAvailabilityRow(i, 'days', e.target.value)}
                    className="bg-background border border-secondary/20 rounded px-3 py-2 text-text text-sm"
                  />
                  <input
                    type="time"
                    value={w.startTime}
                    onChange={(e) => updateAvailabilityRow(i, 'startTime', e.target.value)}
                    className="bg-background border border-secondary/20 rounded px-3 py-2 text-text text-sm"
                  />
                  <input
                    type="time"
                    value={w.endTime}
                    onChange={(e) => updateAvailabilityRow(i, 'endTime', e.target.value)}
                    className="bg-background border border-secondary/20 rounded px-3 py-2 text-text text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeAvailabilityRow(i)}
                    className="text-red-400 text-sm hover:text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addAvailabilityRow}
                className="text-secondary text-sm hover:underline"
              >
                + Add another window
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="px-6 py-2 bg-secondary text-background rounded font-semibold hover:bg-secondary/90 disabled:opacity-50 transition"
        >
          {isSaving ? 'Saving...' : 'Add Package'}
        </button>
      </motion.form>

      {/* Packages List */}
      {loading ? (
        <div className="text-center py-8 text-text/60">Loading packages...</div>
      ) : packages.length === 0 ? (
        <div className="text-center py-8 text-text/60">No packages yet</div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {packages.map((pkg) => (
            <div
              key={pkg._id || pkg.id}
              className="bg-secondary/5 border border-secondary/20 rounded-lg p-4 flex justify-between items-start gap-4"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold text-text">{pkg.name}</h3>
                  {!pkg.isActive && (
                    <span className="text-xs px-2 py-0.5 bg-red-500/20 text-red-400 rounded">Inactive</span>
                  )}
                </div>
                <p className="text-text/60 text-sm">{pkg.description}</p>
                <div className="flex gap-4 mt-2 text-sm text-text/60 flex-wrap">
                  <span>{CATEGORIES.find((c) => c.value === pkg.category)?.label || pkg.category}</span>
                  <span>{pkg.mode}</span>
                  <span>{pkg.priceNote || (pkg.price ? `$${pkg.price}` : 'Inquire within')}</span>
                  {pkg.duration && <span>{pkg.duration}</span>}
                  <span>{pkg.bookingType}</span>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => handleToggleActive(pkg)}
                  className="px-4 py-2 bg-secondary/20 text-secondary rounded hover:bg-secondary/30 transition text-sm"
                >
                  {pkg.isActive ? 'Deactivate' : 'Activate'}
                </button>
                <button
                  onClick={() => handleDelete(pkg._id || pkg.id || '')}
                  className="px-4 py-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition text-sm"
                >
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
