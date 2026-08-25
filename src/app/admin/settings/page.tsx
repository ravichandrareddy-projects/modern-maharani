'use client';

import React, { useState, useEffect } from 'react';
import { StoreData } from '@/lib/types';
import { Settings, Save, Lock, Palette, ShieldCheck } from 'lucide-react';

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
          setPrimaryColor(data.siteSettings.primaryColor || '#7A1C30');
          setAdminPassword(data.siteSettings.adminPasswordHash || 'maharani2026');
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadStore();
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeData) return;

    setSaving(true);
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
      setTimeout(() => setSuccess(false), 3000);
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
        <p className="text-xs text-[#78716C]">Change primary accent colors, glassmorphism overlays, and update Admin Panel password.</p>
      </div>

      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          Settings updated successfully!
        </div>
      )}

      <form onSubmit={handleSaveSettings} className="bg-white p-8 border border-[#E7E5E4] shadow-sm space-y-6 text-xs">
        {/* Color Customizer */}
        <div className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-[#1C1917] flex items-center gap-2">
            <Palette size={18} className="text-[#7A1C30]" /> Website Accent Color Theme
          </h2>
          <div>
            <label className="block font-semibold uppercase tracking-wider text-[#1C1917] mb-1">
              Brand Primary Accent Color (HEX)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-10 h-10 border border-[#E7E5E4] cursor-pointer"
              />
              <input
                type="text"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-full p-2.5 bg-[#FAF8F5] border border-[#E7E5E4] font-mono uppercase"
              />
            </div>
          </div>
        </div>

        {/* Admin Password Change */}
        <div className="space-y-3 pt-4 border-t border-[#E7E5E4]">
          <h2 className="font-serif text-xl font-bold text-[#1C1917] flex items-center gap-2">
            <Lock size={18} className="text-[#7A1C30]" /> Admin Panel Security
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
              className="w-full p-2.5 bg-[#FAF8F5] border border-[#E7E5E4] font-mono text-[#7A1C30] font-bold"
            />
            <p className="text-[10px] text-[#78716C] mt-1">This password is required to access `/admin` dashboard controls.</p>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-[#7A1C30] hover:bg-[#5F1524] text-white text-xs uppercase tracking-widest py-3.5 font-bold transition-colors flex items-center justify-center gap-2"
        >
          <Save size={16} /> {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
}
