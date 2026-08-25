'use client';

import React, { useState, useEffect } from 'react';
import { StoreData } from '@/lib/types';
import { Settings, Save, Lock, Palette, ShieldCheck, Check } from 'lucide-react';

export default function AdminSettingsPage() {
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [loading, setLoading] = useState(true);
  const [primaryColor, setPrimaryColor] = useState('#7A1C30');
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
          const col = data.siteSettings.primaryColor || '#7A1C30';
          setPrimaryColor(col);
          setAdminPassword(data.siteSettings.adminPasswordHash || 'maharani2026');
          applyLiveColor(col);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadStore();
  }, []);

  const applyLiveColor = (color: string) => {
    let styleEl = document.getElementById('dynamic-theme-style');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'dynamic-theme-style';
      document.head.appendChild(styleEl);
    }
    styleEl.innerHTML = `
      :root {
        --primary-brand: ${color} !important;
        --accent-wine: ${color} !important;
      }
      .bg-brand, .bg-\\[\\#7A1C30\\], [class*="bg-[#7A1C30]"], .bg-[#7A1C30] {
        background-color: ${color} !important;
      }
      .text-brand, .text-\\[\\#7A1C30\\], [class*="text-[#7A1C30]"], .text-[#7A1C30] {
        color: ${color} !important;
      }
      .border-brand, .border-\\[\\#7A1C30\\], [class*="border-[#7A1C30]"], .border-[#7A1C30] {
        border-color: ${color} !important;
      }
    `;
  };

  const handleColorChange = (newColor: string) => {
    setPrimaryColor(newColor);
    applyLiveColor(newColor);
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeData) return;

    setSaving(true);
    applyLiveColor(primaryColor);

    try {
      await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          primaryColor,
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
    <div className="space-y-6 max-w-2xl">
      <div className="pb-4 border-b border-[#E7E5E4]">
        <h1 className="font-serif text-3xl font-bold text-[#1C1917]">Theme & Admin Security Settings</h1>
        <p className="text-xs text-[#78716C]">Change primary accent colors live and update Admin Panel password.</p>
      </div>

      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <Check size={16} /> Website theme color & settings updated live!
        </div>
      )}

      <form onSubmit={handleSaveSettings} className="bg-white p-8 border border-[#E7E5E4] shadow-sm space-y-6 text-xs">
        {/* Color Customizer */}
        <div className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-[#1C1917] flex items-center gap-2">
            <Palette size={18} className="text-brand" /> Website Accent Color Theme
          </h2>
          <div>
            <label className="block font-semibold uppercase tracking-wider text-[#1C1917] mb-2">
              Brand Primary Accent Color (HEX)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-12 h-12 border-2 border-[#E7E5E4] cursor-pointer rounded"
              />
              <input
                type="text"
                value={primaryColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-full p-3 bg-[#FAF8F5] border border-[#E7E5E4] font-mono text-sm font-bold uppercase text-[#1C1917]"
              />
            </div>
            <p className="text-[11px] text-[#78716C] mt-2">
              Previewing live color: <span className="font-bold font-mono px-2 py-0.5 text-white bg-brand rounded">{primaryColor}</span>
            </p>
          </div>
        </div>

        {/* Admin Password Change */}
        <div className="space-y-3 pt-4 border-t border-[#E7E5E4]">
          <h2 className="font-serif text-xl font-bold text-[#1C1917] flex items-center gap-2">
            <Lock size={18} className="text-brand" /> Admin Panel Security
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
            <p className="text-[10px] text-[#78716C] mt-1">This password is required to access `/admin` dashboard controls.</p>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-brand hover:opacity-90 text-white text-xs uppercase tracking-widest py-4 font-bold transition-all shadow-md flex items-center justify-center gap-2"
        >
          <Save size={16} /> {saving ? 'Saving Theme...' : 'Save Settings Live'}
        </button>
      </form>
    </div>
  );
}
