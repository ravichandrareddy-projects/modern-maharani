'use client';

import React, { useState, useEffect } from 'react';
import { StoreData, Banner } from '@/lib/types';
import { Save, Upload, ImageIcon, Sparkles, Check } from 'lucide-react';

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

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
        <h1 className="font-serif text-3xl font-bold text-[#1C1917]">Homepage Banner & Image Upload Manager</h1>
        <p className="text-xs text-[#78716C]">Upload custom hero images directly from your device (phone/laptop) and update live homepage text.</p>
      </div>

      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <Check size={16} /> Homepage hero banner & uploaded image updated live!
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
            className="w-full p-3 bg-[#FAF8F5] border border-[#E7E5E4] focus:outline-none focus:border-brand font-serif text-lg font-bold"
          />
        </div>

        <div>
          <label className="block font-semibold uppercase text-[#1C1917] mb-1">Supporting Copy / Subheadline</label>
          <textarea
            rows={3}
            value={subheadline}
            onChange={(e) => setSubheadline(e.target.value)}
            placeholder="Explore contemporary women's fashion at Modern Maharani, KPHB."
            className="w-full p-3 bg-[#FAF8F5] border border-[#E7E5E4] focus:outline-none focus:border-brand resize-none"
          />
        </div>

        {/* UPLOADABLE IMAGE FROM DEVICE */}
        <div className="space-y-3 p-5 bg-[#FAF8F5] border border-[#E7E5E4] rounded-md">
          <div className="flex items-center justify-between">
            <label className="font-bold uppercase text-[#1C1917] flex items-center gap-2 text-sm">
              <Upload size={18} className="text-brand" /> Upload Hero Banner Image From Device:
            </label>
            <span className="text-[10px] text-[#78716C] uppercase font-semibold">Supports JPG, PNG, WEBP</span>
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="block w-full text-xs text-[#78716C] file:mr-4 file:py-2.5 file:px-5 file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-wider file:bg-brand file:text-white hover:file:opacity-90 cursor-pointer border border-[#E7E5E4] p-2 bg-white rounded"
          />

          <div>
            <label className="block font-semibold uppercase text-[#78716C] mb-1 text-[10px]">Or Direct Image URL:</label>
            <input
              type="text"
              required
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full p-2.5 bg-white border border-[#E7E5E4] focus:outline-none focus:border-brand font-mono text-xs"
            />
          </div>

          {/* Live Preview Box */}
          {image && (
            <div className="space-y-2 pt-2">
              <span className="text-[10px] uppercase font-bold text-[#78716C]">Live Image Banner Preview:</span>
              <div className="aspect-video max-w-lg bg-stone-200 overflow-hidden border-2 border-brand rounded shadow-md relative">
                <img src={image} alt="Hero Banner Preview" className="w-full h-full object-cover" />
              </div>
            </div>
          )}
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
          className="bg-brand hover:opacity-90 text-white text-xs uppercase tracking-widest px-8 py-4 font-bold transition-all shadow-md flex items-center gap-2"
        >
          <Save size={16} /> {saving ? 'Saving Banner...' : 'Update Homepage Hero Banner'}
        </button>
      </form>
    </div>
  );
}
