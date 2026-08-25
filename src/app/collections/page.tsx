import React from 'react';
import Link from 'next/link';
import { getStoreData } from '@/lib/db';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CollectionsPage() {
  const store = getStoreData();
  const collections = store.collections.filter((c) => c.isPublished);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 pb-6 border-b border-[#E7E5E4]">
        <span className="text-xs uppercase tracking-[0.25em] text-[#7A1C30] font-semibold">Editorial Edits</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1C1917]">Featured Collections</h1>
        <p className="text-xs sm:text-sm text-[#78716C] max-w-lg mx-auto">
          Explore curated fashion edits tailored for festive celebrations, daily elegance, and special occasions.
        </p>
      </div>

      {/* Collections Showcase */}
      <div className="space-y-12">
        {collections.map((col, index) => {
          const colProductsCount = store.products.filter(p => p.collectionSlug === col.slug).length;
          const isEven = index % 2 === 0;

          return (
            <div
              key={col.id}
              className={`bg-white border border-[#E7E5E4] luxury-card-shadow overflow-hidden grid grid-cols-1 lg:grid-cols-2 items-center ${
                isEven ? '' : 'lg:grid-flow-dense'
              }`}
            >
              {/* Image */}
              <div className={`relative aspect-[4/3] lg:aspect-auto h-full min-h-[320px] bg-[#1C1917] overflow-hidden ${
                isEven ? '' : 'lg:col-start-2'
              }`}>
                <img
                  src={col.heroImage}
                  alt={col.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>

              {/* Text */}
              <div className="p-8 sm:p-12 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-widest text-[#7A1C30] font-semibold">
                    {colProductsCount} Outfits Available
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917]">{col.title}</h2>
                </div>

                <p className="text-sm text-[#78716C] leading-relaxed font-light">
                  {col.description}
                </p>

                <div className="pt-2">
                  <Link
                    href={`/collections/${col.slug}`}
                    className="inline-flex items-center gap-2 bg-[#1C1917] hover:bg-[#7A1C30] text-white text-xs uppercase tracking-widest px-6 py-3.5 font-semibold transition-colors"
                  >
                    View Collection <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
