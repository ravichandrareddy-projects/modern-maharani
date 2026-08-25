'use client';

import React, { useState, useEffect } from 'react';
import { StoreData, Review } from '@/lib/types';
import { Star, Check, X, Plus, Trash2 } from 'lucide-react';

export default function AdminReviewsPage() {
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [custName, setCustName] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

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

  const handleToggleApprove = async (reviewId: string) => {
    if (!storeData) return;
    const updated = storeData.reviews.map((r) => (r.id === reviewId ? { ...r, approved: !r.approved } : r));
    const newStore = { ...storeData, reviews: updated };
    try {
      await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStore)
      });
      setStoreData(newStore);
    } catch (e) {}
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!storeData || !confirm('Delete this review?')) return;
    const updated = storeData.reviews.filter((r) => r.id !== reviewId);
    const newStore = { ...storeData, reviews: updated };
    try {
      await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStore)
      });
      setStoreData(newStore);
    } catch (e) {}
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeData || !custName || !reviewText) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      customerName: custName,
      rating,
      reviewText,
      date: new Date().toISOString().substring(0, 10),
      approved: true
    };

    const newStore = { ...storeData, reviews: [newRev, ...storeData.reviews] };
    try {
      await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStore)
      });
      setStoreData(newStore);
      setModalOpen(false);
      setCustName('');
      setReviewText('');
    } catch (e) {}
  };

  if (loading || !storeData) {
    return <div className="text-center py-20 text-xs uppercase tracking-widest text-[#78716C]">Loading Customer Reviews...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E5E4]">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#1C1917]">Customer Reviews Manager</h1>
          <p className="text-xs text-[#78716C]">Approve verified customer feedback or add Google reviews for Modern Maharani.</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-[#7A1C30] hover:bg-[#5F1524] text-white text-xs uppercase tracking-widest px-5 py-3 font-semibold flex items-center gap-1.5 transition-colors self-start"
        >
          <Plus size={16} /> Add Manual Review
        </button>
      </div>

      <div className="space-y-4">
        {storeData.reviews.map((rev) => (
          <div key={rev.id} className="bg-white p-6 border border-[#E7E5E4] shadow-sm flex flex-col sm:flex-row items-start justify-between gap-4">
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#1C1917]">{rev.customerName}</span>
                <span className="text-[10px] text-[#78716C]">{rev.date}</span>
                <span className={`text-[10px] px-2 py-0.5 uppercase font-bold ${rev.approved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                  {rev.approved ? 'Approved' : 'Pending Approval'}
                </span>
              </div>
              <div className="flex items-center text-amber-500">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="text-[#1C1917] italic font-light">"{rev.reviewText}"</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleToggleApprove(rev.id)}
                className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border ${
                  rev.approved ? 'border-stone-300 text-stone-700' : 'border-emerald-600 bg-emerald-600 text-white'
                }`}
              >
                {rev.approved ? 'Unapprove' : 'Approve Review'}
              </button>
              <button
                onClick={() => handleDeleteReview(rev.id)}
                className="p-1.5 text-red-600 border border-stone-200 hover:border-red-600"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="relative bg-white max-w-md w-full p-6 shadow-2xl border border-[#E7E5E4] z-10 space-y-4">
            <h3 className="font-serif text-xl font-bold">Add Customer Review</h3>
            <form onSubmit={handleAddReview} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase mb-1">Customer Name</label>
                <input
                  type="text"
                  required
                  value={custName}
                  onChange={(e) => setCustName(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E7E5E4]"
                />
              </div>
              <div>
                <label className="block font-semibold uppercase mb-1">Rating (1 to 5 Stars)</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E7E5E4]"
                >
                  <option value={5}>5 Stars (Excellent)</option>
                  <option value={4}>4 Stars (Very Good)</option>
                  <option value={3}>3 Stars (Good)</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold uppercase mb-1">Review Copy</label>
                <textarea
                  rows={3}
                  required
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E7E5E4] resize-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 border">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#7A1C30] text-white">Save Review</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
