'use client';

import React, { useState, useEffect } from 'react';
import { StoreData, StoreInfo, SiteSettings } from '@/lib/types';
import { Save, Store, MapPin, Phone, MessageCircle } from 'lucide-react';

export default function AdminStorePage() {
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  // Store Info
  const [addressLine, setAddressLine] = useState('');
  const [landmark, setLandmark] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [openingHours, setOpeningHours] = useState('');

  // Copy Settings
  const [introHeading, setIntroHeading] = useState('');
  const [introCopy, setIntroCopy] = useState('');
  const [storeSectionHeading, setStoreSectionHeading] = useState('');
  const [storeSectionCopy, setStoreSectionCopy] = useState('');

  useEffect(() => {
    async function loadStore() {
      try {
        const res = await fetch('/api/data');
        const data: StoreData = await res.json();
        setStoreData(data);
        if (data.storeInfo) {
          setAddressLine(data.storeInfo.addressLine);
          setLandmark(data.storeInfo.landmark);
          setArea(data.storeInfo.area);
          setCity(data.storeInfo.city);
          setPhone(data.storeInfo.phone);
          setWhatsappNumber(data.storeInfo.whatsappNumber);
          setOpeningHours(data.storeInfo.openingHours);
        }
        if (data.siteSettings) {
          setIntroHeading(data.siteSettings.introHeading);
          setIntroCopy(data.siteSettings.introCopy);
          setStoreSectionHeading(data.siteSettings.storeSectionHeading);
          setStoreSectionCopy(data.siteSettings.storeSectionCopy);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadStore();
  }, []);

  const handleSaveStore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeData) return;

    setSaving(true);
    const updatedStoreInfo: StoreInfo = {
      ...storeData.storeInfo,
      addressLine,
      landmark,
      area,
      city,
      phone,
      whatsappNumber,
      openingHours
    };

    const updatedSiteSettings: SiteSettings = {
      ...storeData.siteSettings,
      introHeading,
      introCopy,
      storeSectionHeading,
      storeSectionCopy
    };

    const newStore: StoreData = {
      ...storeData,
      storeInfo: updatedStoreInfo,
      siteSettings: updatedSiteSettings
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
    return <div className="text-center py-20 text-xs uppercase tracking-widest text-[#78716C]">Loading Store Information...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="pb-4 border-b border-[#E7E5E4]">
        <h1 className="font-serif text-3xl font-bold text-[#1C1917]">Store Information & Copy Editor</h1>
        <p className="text-xs text-[#78716C]">Update physical showroom address details, opening hours, contact numbers, and homepage text copy.</p>
      </div>

      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          Store details and copy updated successfully!
        </div>
      )}

      <form onSubmit={handleSaveStore} className="space-y-8 text-xs">
        {/* Section 1: Physical Location */}
        <div className="bg-white p-6 sm:p-8 border border-[#E7E5E4] shadow-sm space-y-4">
          <h2 className="font-serif text-xl font-bold text-[#1C1917]">Physical Showroom Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold uppercase text-[#1C1917] mb-1">Address Line *</label>
              <input
                type="text"
                required
                value={addressLine}
                onChange={(e) => setAddressLine(e.target.value)}
                className="w-full p-3 bg-[#FAF8F5] border border-[#E7E5E4]"
              />
            </div>
            <div>
              <label className="block font-semibold uppercase text-[#1C1917] mb-1">Landmark Details *</label>
              <input
                type="text"
                required
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                className="w-full p-3 bg-[#FAF8F5] border border-[#E7E5E4]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold uppercase text-[#1C1917] mb-1">Area / Locality *</label>
              <input
                type="text"
                required
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full p-3 bg-[#FAF8F5] border border-[#E7E5E4]"
              />
            </div>
            <div>
              <label className="block font-semibold uppercase text-[#1C1917] mb-1">City / State *</label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-3 bg-[#FAF8F5] border border-[#E7E5E4]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold uppercase text-[#1C1917] mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 bg-[#FAF8F5] border border-[#E7E5E4]"
              />
            </div>
            <div>
              <label className="block font-semibold uppercase text-[#1C1917] mb-1">WhatsApp Number (No +)</label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full p-3 bg-[#FAF8F5] border border-[#E7E5E4]"
              />
            </div>
            <div>
              <label className="block font-semibold uppercase text-[#1C1917] mb-1">Opening Hours</label>
              <input
                type="text"
                value={openingHours}
                onChange={(e) => setOpeningHours(e.target.value)}
                className="w-full p-3 bg-[#FAF8F5] border border-[#E7E5E4]"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Website Editorial Copy */}
        <div className="bg-white p-6 sm:p-8 border border-[#E7E5E4] shadow-sm space-y-4">
          <h2 className="font-serif text-xl font-bold text-[#1C1917]">Homepage Copy & Copywriting</h2>

          <div>
            <label className="block font-semibold uppercase text-[#1C1917] mb-1">Quick Brand Intro Heading</label>
            <input
              type="text"
              value={introHeading}
              onChange={(e) => setIntroHeading(e.target.value)}
              className="w-full p-3 bg-[#FAF8F5] border border-[#E7E5E4]"
            />
          </div>

          <div>
            <label className="block font-semibold uppercase text-[#1C1917] mb-1">Quick Brand Intro Paragraph</label>
            <textarea
              rows={3}
              value={introCopy}
              onChange={(e) => setIntroCopy(e.target.value)}
              className="w-full p-3 bg-[#FAF8F5] border border-[#E7E5E4] resize-none"
            />
          </div>

          <div>
            <label className="block font-semibold uppercase text-[#1C1917] mb-1">Store Experience Heading</label>
            <input
              type="text"
              value={storeSectionHeading}
              onChange={(e) => setStoreSectionHeading(e.target.value)}
              className="w-full p-3 bg-[#FAF8F5] border border-[#E7E5E4]"
            />
          </div>

          <div>
            <label className="block font-semibold uppercase text-[#1C1917] mb-1">Store Experience Paragraph</label>
            <textarea
              rows={3}
              value={storeSectionCopy}
              onChange={(e) => setStoreSectionCopy(e.target.value)}
              className="w-full p-3 bg-[#FAF8F5] border border-[#E7E5E4] resize-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-[#7A1C30] hover:bg-[#5F1524] text-white text-xs uppercase tracking-widest px-8 py-3.5 font-semibold transition-colors flex items-center gap-2"
        >
          <Save size={16} /> {saving ? 'Saving...' : 'Save Store Details & Content'}
        </button>
      </form>
    </div>
  );
}
