import React from 'react';
import Link from 'next/link';
import { getStoreData } from '@/lib/db';
import { MapPin, ArrowRight, Sparkles, Heart, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  const store = getStoreData();
  const { siteSettings, storeInfo } = store;

  return (
    <div className="space-y-16 pb-16">
      {/* Header */}
      <section className="bg-[#1C1917] text-white py-20 px-4 text-center space-y-4">
        <span className="text-xs uppercase tracking-[0.25em] text-[#E2D4C3] font-semibold flex items-center justify-center gap-1.5">
          <Sparkles size={14} className="text-[#7A1C30]" /> Contemporary Women's Fashion Showroom
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight">About Modern Maharani</h1>
        <p className="text-sm sm:text-base text-[#E7E5E4] font-light max-w-xl mx-auto">
          Located in KPHB Phase 1, Kukatpally, Hyderabad — curating effortless style for the modern woman.
        </p>
      </section>

      {/* Main Brand Story */}
      <section className="max-w-4xl mx-auto px-4 space-y-8 text-center sm:text-left">
        <div className="space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917] text-center">
            {siteSettings.introHeading || "Modern Fashion. Your Style."}
          </h2>
          <div className="w-16 h-0.5 bg-[#7A1C30] mx-auto" />
          <p className="text-base sm:text-lg text-[#78716C] font-light leading-relaxed">
            {siteSettings.introCopy || "Modern Maharani brings together contemporary women's fashion for women who want to feel confident, stylish and effortlessly themselves."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="bg-white p-6 border border-[#E7E5E4] luxury-card-shadow space-y-3">
            <h3 className="font-serif text-xl font-semibold text-[#1C1917]">Contemporary Aesthetics</h3>
            <p className="text-xs text-[#78716C] leading-relaxed">
              Carefully curated Kurtis, dresses, and occasion wear that balance modern silhouettes with timeless elegance.
            </p>
          </div>
          <div className="bg-white p-6 border border-[#E7E5E4] luxury-card-shadow space-y-3">
            <h3 className="font-serif text-xl font-semibold text-[#1C1917]">Personalized Attention</h3>
            <p className="text-xs text-[#78716C] leading-relaxed">
              Visit our boutique showroom opposite Global Eye Hospital in KPHB to try on outfits with dedicated styling assistance.
            </p>
          </div>
          <div className="bg-white p-6 border border-[#E7E5E4] luxury-card-shadow space-y-3">
            <h3 className="font-serif text-xl font-semibold text-[#1C1917]">WhatsApp Convenience</h3>
            <p className="text-xs text-[#78716C] leading-relaxed">
              Enquire directly from anywhere to check size availability, custom styling guidance, or hold items before your visit.
            </p>
          </div>
        </div>
      </section>

      {/* Showroom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] border border-[#E7E5E4] p-8 sm:p-12 text-center space-y-6">
          <h2 className="font-serif text-3xl text-[#1C1917]">Experience Modern Maharani In Person</h2>
          <p className="text-xs sm:text-sm text-[#78716C] max-w-xl mx-auto">
            {storeInfo.addressLine}, {storeInfo.landmark}, {storeInfo.area}, {storeInfo.city} {storeInfo.pincode}.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/visit-us"
              className="bg-[#7A1C30] hover:bg-[#5F1524] text-white text-xs uppercase tracking-widest px-8 py-3.5 font-semibold transition-colors flex items-center gap-2"
            >
              <MapPin size={16} /> Get Showroom Directions
            </Link>
            <Link
              href="/shop"
              className="border border-[#1C1917] text-[#1C1917] hover:bg-[#1C1917] hover:text-white text-xs uppercase tracking-widest px-8 py-3.5 font-semibold transition-colors flex items-center gap-2"
            >
              Browse Digital Catalogue <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
