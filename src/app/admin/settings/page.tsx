'use client';

import React, { useState, useEffect } from 'react';
import { StoreData } from '@/lib/types';
import { Settings, Save, Lock, Palette, ShieldCheck, Check, Layout } from 'lucide-react';

export default function AdminSettingsPage() {
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [loading, setLoading] = useState(true);

  const [primaryColor, setPrimaryColor] = useState('#7A1C30');
  const [backgroundColor, setBackgroundColor] = useState('#FAF8F5');
  const [cardBackgroundColor, setCardBackgroundColor] = useState('#FFFFFF');
  const [textColor, setTextColor] = useState('#1C1917');
  const [adminPassword, setAdminPassword] = useState('maharani2026');

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function loadStore() {
      try {
        const res = await fetch('/api/data');
        const data = await res.json();
        setStoreData(data);
        if (data.siteSettings) {
          const prim = data.siteSettings.primaryColor || '#7A1C30';
          const bg = data.siteSettings.backgroundColor || '#FAF8F5';
          const cardBg = data.siteSettings.cardBackgroundColor || '#FFFFFF';
          const textCol = data.siteSettings.textColor || '#1C1917';

          setPrimaryColor(prim);
          setBackgroundColor(bg);
          setCardBackgroundColor(cardBg);
          setTextColor(textCol);
          setAdminPassword(data.siteSettings.adminPasswordHash || 'maharani2026');

          applyLiveTheme(prim, bg, cardBg, textCol);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadStore();
  }, []);

  const applyLiveTheme = (prim: string, bg: string, cardBg: string, textCol: string) => {
    let styleEl = document.getElementById('dynamic-theme-style');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'dynamic-theme-style';
      document.head.appendChild(styleEl);
    }
    styleEl.innerHTML = `
      :root {
        --primary-brand: ${prim} !important;
        --accent-wine: ${prim} !important;
        --bg-ivory: ${bg} !important;
        --bg-white: ${cardBg} !important;
        --text-charcoal: ${textCol} !important;
      }
      body {
        background-color: ${bg} !important;
        color: ${textCol} !important;
      }
      .bg-brand, .bg-\\[\\#7A1C30\\], [class*="bg-[#7A1C30]"], .bg-[#7A1C30] {
        background-color: ${prim} !important;
      }
      .text-brand, .text-\\[\\#7A1C30\\], [class*="text-[#7A1C30]"], .text-[#7A1C30] {
        color: ${prim} !important;
      }
      .border-brand, .border-\\[\\#7A1C30\\], [class*="border-[#7A1C30]"], .border-[#7A1C30] {
        border-color: ${prim} !important;
      }
      .bg-\\[\\#FAF8F5\\], .bg-[#FAF8F5], [class*="bg-[#FAF8F5]"] {
        background-color: ${bg} !important;
      }
      .bg-white, [class*="bg-white"] {
        background-color: ${cardBg} !important;
      }
      .text-\\[\\#1C1917\\], .text-[#1C1917], [class*="text-[#1C1917]"] {
        color: ${textCol} !important;
      }
    `;
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeData) return;

    setSaving(true);
    applyLiveTheme(primaryColor, backgroundColor, cardBackgroundColor, textColor);

    try {
      await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          primaryColor,
          backgroundColor,
          cardBackgroundColor,
          textColor,
          adminPassword
        })
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !storeData) {
    return <div className="text-center py-20 text-xs uppercase tracking-widest text-[#78716C]">Loading Admin Settings...</div>;
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="pb-4 border-b border-[#E7E5E4]">
        <h1 className="font-serif text-3xl font-bold text-[#1C1917]">Theme & Background Color Customizer</h1>
        <p className="text-xs text-[#78716C]">Customize website primary accent colors, main page background, card container backgrounds, and text styling.</p>
      </div>

      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <Check size={16} /> Website theme colors & backgrounds updated live!
        </div>
      )}

      <form onSubmit={handleSaveSettings} className="bg-white p-8 border border-[#E7E5E4] shadow-sm space-y-8 text-xs">
        {/* Accent Colors */}
        <div className="space-y-4">
          <h2 className="font-serif text-xl font-bold text-[#1C1917] flex items-center gap-2 border-b border-[#FAF8F5] pb-2">
            <Palette size={18} className="text-brand" /> 1. Brand Primary Accent Color
          </h2>

          <div>
            <label className="block font-semibold uppercase tracking-wider text-[#1C1917] mb-2">
              Primary Button & Highlight Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => {
                  setPrimaryColor(e.target.value);
                  applyLiveTheme(e.target.value, backgroundColor, cardBackgroundColor, textColor);
                }}
                className="w-12 h-12 border-2 border-[#E7E5E4] cursor-pointer rounded"
              />
              <input
                type="text"
                value={primaryColor}
                onChange={(e) => {
                  setPrimaryColor(e.target.value);
                  applyLiveTheme(e.target.value, backgroundColor, cardBackgroundColor, textColor);
                }}
                className="w-full p-3 bg-[#FAF8F5] border border-[#E7E5E4] font-mono text-sm font-bold uppercase"
              />
            </div>
          </div>
        </div>

        {/* Background & Layout Colors */}
        <div className="space-y-4 pt-4 border-t border-[#E7E5E4]">
          <h2 className="font-serif text-xl font-bold text-[#1C1917] flex items-center gap-2 border-b border-[#FAF8F5] pb-2">
            <Layout size={18} className="text-brand" /> 2. Website Background & Card Colors
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold uppercase tracking-wider text-[#1C1917] mb-2">
                Main Page Background Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => {
                    setBackgroundColor(e.target.value);
                    applyLiveTheme(primaryColor, e.target.value, cardBackgroundColor, textColor);
                  }}
                  className="w-12 h-12 border-2 border-[#E7E5E4] cursor-pointer rounded"
                />
                <input
                  type="text"
                  value={backgroundColor}
                  onChange={(e) => {
                    setBackgroundColor(e.target.value);
                    applyLiveTheme(primaryColor, e.target.value, cardBackgroundColor, textColor);
                  }}
                  className="w-full p-3 bg-[#FAF8F5] border border-[#E7E5E4] font-mono text-sm font-bold uppercase"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-[#1C1917] mb-2">
                Card & Box Container Background
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={cardBackgroundColor}
                  onChange={(e) => {
                    setCardBackgroundColor(e.target.value);
                    applyLiveTheme(primaryColor, backgroundColor, e.target.value, textColor);
                  }}
                  className="w-12 h-12 border-2 border-[#E7E5E4] cursor-pointer rounded"
                />
                <input
                  type="text"
                  value={cardBackgroundColor}
                  onChange={(e) => {
                    setCardBackgroundColor(e.target.value);
                    applyLiveTheme(primaryColor, backgroundColor, e.target.value, textColor);
                  }}
                  className="w-full p-3 bg-[#FAF8F5] border border-[#E7E5E4] font-mono text-sm font-bold uppercase"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider text-[#1C1917] mb-2">
              Primary Body Text Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={textColor}
                onChange={(e) => {
                  setTextColor(e.target.value);
                  applyLiveTheme(primaryColor, backgroundColor, cardBackgroundColor, e.target.value);
                }}
                className="w-12 h-12 border-2 border-[#E7E5E4] cursor-pointer rounded"
              />
              <input
                type="text"
                value={textColor}
                onChange={(e) => {
                  setTextColor(e.target.value);
                  applyLiveTheme(primaryColor, backgroundColor, cardBackgroundColor, e.target.value);
                }}
                className="w-full p-3 bg-[#FAF8F5] border border-[#E7E5E4] font-mono text-sm font-bold uppercase"
              />
            </div>
          </div>
        </div>

        {/* Admin Password */}
        <div className="space-y-3 pt-4 border-t border-[#E7E5E4]">
          <h2 className="font-serif text-xl font-bold text-[#1C1917] flex items-center gap-2">
            <Lock size={18} className="text-brand" /> 3. Admin Security
          </h2>
          <div>
            <label className="block font-semibold uppercase tracking-wider text-[#1C1917] mb-1">
              Admin Login Password
            </label>
            <input
              type="text"
              required
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full p-3 bg-[#FAF8F5] border border-[#E7E5E4] font-mono text-brand font-bold text-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-brand hover:opacity-90 text-white text-xs uppercase tracking-widest py-4 font-bold transition-all shadow-md flex items-center justify-center gap-2"
        >
          <Save size={16} /> {saving ? 'Saving Colors...' : 'Save Theme & Background Settings'}
        </button>
      </form>
    </div>
  );
}
