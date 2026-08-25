import React from 'react';
import Link from 'next/link';
import { getStoreData } from '@/lib/db';
import ProductCard from '@/components/ProductCard';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function NewArrivalsPage() {
  const store = getStoreData();
  const newArrivals = store.products.filter((p) => p.isNewArrival);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-4 pb-6 border-b border-[#E7E5E4]">
        <div className="inline-flex items-center gap-1.5 bg-[#7A1C30]/10 text-[#7A1C30] text-xs uppercase tracking-widest px-3 py-1 font-semibold">
          <Sparkles size={12} /> Fresh Showroom Rack Additions
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1C1917]">Just In — New Arrivals</h1>
        <p className="text-xs sm:text-sm text-[#78716C] max-w-lg mx-auto">
          Be the first to explore the newest contemporary Kurtis, Dresses, and Occasion Wear freshly arrived at Modern Maharani KPHB.
        </p>
      </div>

      {/* Products */}
      {newArrivals.length === 0 ? (
        <div className="text-center py-16 text-[#78716C]">
          No new arrivals listed currently. Check back soon or visit our store in KPHB!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Footer Banner */}
      <div className="bg-[#FAF8F5] border border-[#E7E5E4] p-8 text-center space-y-4">
        <h3 className="font-serif text-2xl text-[#1C1917]">Want To See More Outfits In Person?</h3>
        <p className="text-xs text-[#78716C]">
          Our KPHB Kukatpally showroom receives new pieces every week. Visit us to try them on!
        </p>
        <Link
          href="/visit-us"
          className="inline-flex items-center gap-2 bg-[#7A1C30] text-white text-xs uppercase tracking-widest px-6 py-3 font-semibold hover:bg-[#5F1524] transition-colors"
        >
          Visit Showroom <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
