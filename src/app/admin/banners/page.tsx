'use client';

import React, { useState, useEffect } from 'react';
import { StoreData, Banner } from '@/lib/types';
import { Save, ImageIcon, Sparkles } from 'lucide-react';

export default function AdminBannersPage() {
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [loading, setLoading] = useState(true);
  const [headline, setHeadline] = useState('');
  const [subheadline, setSubheadline] = useState('');
  const [image, setImage] = useState('');
  const [ctaText, setCtaText] = useState('');
  const [ctaDestination, setCtaDestination] = useState('');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function loadStore() {
      try {
        const res = await fetch('/api/data');
        const data = await res.json();
        setStoreData(data);
        if (data.banners && data.banners[0]) {
          const b = data.banners[0];
          setHeadline(b.headline);
          setSubheadline(b.subheadline);
          setImage(b.image);
          setCtaText(b.ctaText);
          setCtaDestination(b.ctaDestination);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadStore();
  }, []);

  const handleSaveBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeData) return;

    setSaving(true);
    const updatedBanner: Banner = {
      id: 'ban-1',
      headline,
      subheadline,
      image,
      ctaText,
      ctaDestination,
      active: true
    };

    const newStore: StoreData = {
      ...storeData,
      banners: [updatedBanner],
      siteSettings: {
        ...storeData.siteSettings,
        heroHeadline: headline,
        heroSupportingText: subheadline,
        heroPrimaryCtaText: ctaText
      }
    };

    try {
      await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStore)
      });
      setStoreData(newStore);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !storeData) {
    return <div className="text-center py-20 text-xs uppercase tracking-widest text-[#78716C]">Loading Banner Editor...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="pb-4 border-b border-[#E7E5E4]">
        <h1 className="font-serif text-3xl font-bold text-[#1C1917]">Homepage Banner Editor</h1>
        <p className="text-xs text-[#78716C]">Customize the main homepage hero banner, headline, imagery, and CTAs.</p>
      </div>

      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          Homepage banner successfully updated live!
        </div>
      )}

      <form onSubmit={handleSaveBanner} className="bg-white p-8 border border-[#E7E5E4] shadow-sm space-y-6 text-xs">
        <div>
          <label className="block font-semibold uppercase text-[#1C1917] mb-1">Hero Main Headline *</label>
          <input
            type="text"
            required
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="Style That Feels Like You."
            className="w-full p-3 bg-[#FAF8F5] border border-[#E7E5E4] focus:outline-none focus:border-[#7A1C30] font-serif text-lg font-bold"
          />
        </div>

        <div>
          <label className="block font-semibold uppercase text-[#1C1917] mb-1">Supporting Copy / Subheadline</label>
          <textarea
            rows={3}
            value={subheadline}
            onChange={(e) => setSubheadline(e.target.value)}
            placeholder="Explore contemporary women's fashion at Modern Maharani, KPHB."
            className="w-full p-3 bg-[#FAF8F5] border border-[#E7E5E4] focus:outline-none focus:border-[#7A1C30] resize-none"
          />
        </div>

        <div>
          <label className="block font-semibold uppercase text-[#1C1917] mb-1">Hero Background Image URL</label>
          <input
            type="text"
            required
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-3 bg-[#FAF8F5] border border-[#E7E5E4] focus:outline-none focus:border-[#7A1C30]"
          />
          <div className="mt-3 aspect-video max-w-md bg-stone-100 overflow-hidden border border-[#E7E5E4]">
            <img src={image} alt="Banner Preview" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold uppercase text-[#1C1917] mb-1">Primary CTA Button Text</label>
            <input
              type="text"
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
              className="w-full p-3 bg-[#FAF8F5] border border-[#E7E5E4]"
            />
          </div>
          <div>
            <label className="block font-semibold uppercase text-[#1C1917] mb-1">Primary CTA Link Destination</label>
            <input
              type="text"
              value={ctaDestination}
              onChange={(e) => setCtaDestination(e.target.value)}
              className="w-full p-3 bg-[#FAF8F5] border border-[#E7E5E4]"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-[#7A1C30] hover:bg-[#5F1524] text-white text-xs uppercase tracking-widest px-8 py-3.5 font-semibold transition-colors flex items-center gap-2"
        >
          <Save size={16} /> {saving ? 'Saving...' : 'Update Homepage Hero Banner'}
        </button>
      </form>
    </div>
  );
}
