import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { packageAPI } from '../services/api';
import BookingModal from '../components/BookingModal';

interface AvailabilityWindow {
  label: string;
  days?: string;
  startTime: string;
  endTime: string;
}

interface Package {
  _id: string;
  id?: string;
  name: string;
  category: string;
  mode: 'physical' | 'virtual' | 'both';
  description: string;
  images?: string[];
  price?: number;
  priceNote?: string;
  duration?: string;
  bookingType: 'self-service' | 'inquiry';
  availability?: AvailabilityWindow[];
  location?: { address?: string; city?: string };
}

const CATEGORY_LABELS: Record<string, string> = {
  regular: 'Sessions',
  private: 'Private Sessions',
  special: 'Special Sessions',
  'sound-therapy-course': 'Sound Therapy Course',
  'himalayan-sound-journey': 'Himalayan Sound Journey',
};

const CATEGORY_ORDER = ['regular', 'private', 'special', 'sound-therapy-course', 'himalayan-sound-journey'];

function ModeBadge({ mode }: { mode: Package['mode'] }) {
  const label = mode === 'both' ? 'Physical & Virtual' : mode === 'physical' ? 'Physical' : 'Live / Virtual';
  return (
    <span className="bg-secondary/20 text-secondary text-xs px-2 py-1 rounded whitespace-nowrap">
      {label}
    </span>
  );
}

function PackageCard({ pkg, onBook }: { pkg: Package; onBook: (pkg: Package) => void }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="bg-secondary/5 border border-secondary/20 rounded-lg overflow-hidden hover:border-secondary/50 transition-all h-full flex flex-col"
    >
      {pkg.images && pkg.images[0] && (
        <div className="h-48 bg-secondary/10 overflow-hidden">
          <img src={pkg.images[0]} alt={pkg.name} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-lg font-semibold text-text flex-1">{pkg.name}</h3>
          <ModeBadge mode={pkg.mode} />
        </div>
        <p className="text-text/60 text-sm mb-4 line-clamp-3">{pkg.description}</p>

        {pkg.availability && pkg.availability.length > 0 && (
          <div className="text-text/70 text-sm mb-4 space-y-1">
            {pkg.availability.map((w, i) => (
              <p key={i}>
                {w.label}: {w.startTime} - {w.endTime}
                {w.days ? ` (${w.days})` : ''}
              </p>
            ))}
          </div>
        )}

        {pkg.duration && <p className="text-text/60 text-sm mb-4">Duration: {pkg.duration}</p>}

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-secondary/20">
          <span className="text-secondary text-lg font-bold">
            {pkg.priceNote || (pkg.price ? `$${pkg.price}` : 'Inquire within')}
          </span>
          <button
            onClick={() => onBook(pkg)}
            className="px-4 py-2 bg-secondary text-background rounded font-semibold hover:bg-secondary/90 transition text-sm"
          >
            {pkg.bookingType === 'self-service' ? 'Book Now' : 'Inquire / Book'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Packages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookingPkg, setBookingPkg] = useState<Package | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const response = await packageAPI.getAll();
        setPackages(response.data?.data || []);
      } catch (err: any) {
        setError(err.message || 'Failed to load packages');
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-text text-xl">Loading packages...</div>
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

  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    items: packages.filter((p) => p.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">Sound Healing Packages</h1>
          <p className="text-text/60 text-lg max-w-2xl mx-auto">
            Join us physically or virtually. Morning sessions run 6–8 AM and evening sessions 6–9 PM, every hour.
            Private and special sessions, our Sound Therapy Course, and the 14-day Himalayan Sound Journey are
            available upon inquiry.
          </p>
        </motion.div>

        {packages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text/60 text-lg">No packages available yet</p>
          </div>
        ) : (
          <div className="space-y-16">
            {grouped.map((group) => (
              <section key={group.category}>
                <h2 className="text-2xl font-bold text-text mb-6 border-b border-secondary/20 pb-2">
                  {CATEGORY_LABELS[group.category] || group.category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {group.items.map((pkg) => (
                    <PackageCard key={pkg._id || pkg.id} pkg={pkg} onBook={setBookingPkg} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>

      {bookingPkg && <BookingModal pkg={bookingPkg} onClose={() => setBookingPkg(null)} />}
    </div>
  );
}
