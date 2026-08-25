'use client';

import React, { useState, useEffect } from 'react';
import { StoreData, Offer } from '@/lib/types';
import { Tag, Plus, Edit, Trash2, X, Sparkles } from 'lucide-react';

export default function AdminOffersPage() {
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);

  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(15);
  const [bannerText, setBannerText] = useState('');
  const [active, setActive] = useState(true);

  useEffect(() => {
    loadStore();
  }, []);

  async function loadStore() {
    try {
      const res = await fetch('/api/data');
      const data = await res.json();
      setStoreData(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const handleOpenAdd = () => {
    setEditingOffer(null);
    setCode('SUMMER20');
    setTitle('Summer Special Offer');
    setDescription('Get 20% OFF on all contemporary dresses & Kurtis');
    setDiscountPercentage(20);
    setBannerText('🎉 SUMMER SALE: 20% OFF ON DRESSES & KURTIS — CODE: SUMMER20');
    setActive(true);
    setModalOpen(true);
  };

  const handleOpenEdit = (o: Offer) => {
    setEditingOffer(o);
    setCode(o.code);
    setTitle(o.title);
    setDescription(o.description);
    setDiscountPercentage(o.discountPercentage);
    setBannerText(o.bannerText);
    setActive(o.active);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeData || !code.trim()) return;

    const newOffer: Offer = {
      id: editingOffer ? editingOffer.id : `off-${Date.now()}`,
      code: code.toUpperCase().trim(),
      title,
      description,
      discountPercentage: Number(discountPercentage),
      active,
      bannerText
    };

    let updatedOffers = [...(storeData.offers || [])];
    if (editingOffer) {
      updatedOffers = updatedOffers.map((o) => (o.id === editingOffer.id ? newOffer : o));
    } else {
      updatedOffers.push(newOffer);
    }

    const newStore = { ...storeData, offers: updatedOffers };

    try {
      await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStore)
      });
      setStoreData(newStore);
      setModalOpen(false);
    } catch (e) {}
  };

  const handleDelete = async (id: string) => {
    if (!storeData || !confirm('Delete coupon offer?')) return;
    const updatedOffers = (storeData.offers || []).filter((o) => o.id !== id);
    const newStore = { ...storeData, offers: updatedOffers };

    try {
      await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStore)
      });
      setStoreData(newStore);
    } catch (e) {}
  };

  if (loading || !storeData) {
    return <div className="text-center py-20 text-xs uppercase tracking-widest text-[#78716C]">Loading Promotional Offers...</div>;
  }

  const offersList = storeData.offers || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E5E4]">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#1C1917]">Promotions & Coupon Code Management</h1>
          <p className="text-xs text-[#78716C]">Create seasonal offers, discount coupons, and homepage announcement banners.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-[#7A1C30] hover:bg-[#5F1524] text-white text-xs uppercase tracking-widest px-5 py-3 font-semibold flex items-center gap-1.5 transition-colors self-start"
        >
          <Plus size={16} /> Create Offer Coupon
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {offersList.map((off) => (
          <div key={off.id} className="bg-white p-6 border border-[#E7E5E4] luxury-card-shadow flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-serif text-2xl font-bold text-[#7A1C30]">{off.code}</span>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 ${off.active ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-600'}`}>
                  {off.active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <p className="font-bold text-sm text-[#1C1917]">{off.title}</p>
              <p className="text-xs text-[#78716C]">{off.description}</p>

              <div className="p-3 bg-[#FAF8F5] border border-[#E7E5E4] text-[11px] text-[#7A1C30] font-semibold flex items-center gap-2">
                <Sparkles size={14} /> Banner Preview: "{off.bannerText}"
              </div>
            </div>

            <div className="pt-2 border-t border-[#E7E5E4] flex justify-between items-center text-xs">
              <span className="font-bold text-[#1C1917]">{off.discountPercentage}% OFF Discount</span>
              <div className="flex items-center gap-2">
                <button onClick={() => handleOpenEdit(off)} className="p-1.5 border border-[#E7E5E4] text-[#1C1917] hover:text-[#7A1C30]">
                  <Edit size={14} />
                </button>
                <button onClick={() => handleDelete(off.id)} className="p-1.5 border border-[#E7E5E4] text-red-600">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="relative bg-white max-w-md w-full p-6 shadow-2xl border border-[#E7E5E4] z-10 space-y-4">
            <h3 className="font-serif text-xl font-bold">{editingOffer ? 'Edit Offer Coupon' : 'Create Offer Coupon'}</h3>
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase mb-1">Coupon Code *</label>
                <input type="text" required value={code} onChange={(e) => setCode(e.target.value)} className="w-full p-2.5 bg-[#FAF8F5] border border-[#E7E5E4] uppercase font-bold text-[#7A1C30]" />
              </div>
              <div>
                <label className="block font-semibold uppercase mb-1">Offer Title</label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2.5 bg-[#FAF8F5] border border-[#E7E5E4]" />
              </div>
              <div>
                <label className="block font-semibold uppercase mb-1">Discount Percentage (%)</label>
                <input type="number" required value={discountPercentage} onChange={(e) => setDiscountPercentage(Number(e.target.value))} className="w-full p-2.5 bg-[#FAF8F5] border border-[#E7E5E4]" />
              </div>
              <div>
                <label className="block font-semibold uppercase mb-1">Announcement Strip Banner Text</label>
                <input type="text" required value={bannerText} onChange={(e) => setBannerText(e.target.value)} className="w-full p-2.5 bg-[#FAF8F5] border border-[#E7E5E4]" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} className="accent-[#7A1C30]" />
                <span className="font-semibold uppercase">Active Offer</span>
              </label>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 border">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#7A1C30] text-white">Save Offer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
