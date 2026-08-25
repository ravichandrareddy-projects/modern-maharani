'use client';

import React, { useState, useEffect } from 'react';
import { StoreData, Collection } from '@/lib/types';
import { Layers, Plus, Edit, Trash2, X } from 'lucide-react';

export default function AdminCollectionsPage() {
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCol, setEditingCol] = useState<Collection | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [heroImage, setHeroImage] = useState('');
  const [isFeatured, setIsFeatured] = useState(true);
  const [isPublished, setIsPublished] = useState(true);

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
    setEditingCol(null);
    setTitle('');
    setDescription('');
    setHeroImage('https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1200&auto=format&fit=crop');
    setIsFeatured(true);
    setIsPublished(true);
    setModalOpen(true);
  };

  const handleOpenEdit = (col: Collection) => {
    setEditingCol(col);
    setTitle(col.title);
    setDescription(col.description);
    setHeroImage(col.heroImage);
    setIsFeatured(col.isFeatured);
    setIsPublished(col.isPublished);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeData || !title.trim()) return;

    const slug = editingCol
      ? editingCol.slug
      : title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const newCol: Collection = {
      id: editingCol ? editingCol.id : `col-${Date.now()}`,
      slug,
      title,
      description,
      heroImage,
      isFeatured,
      isPublished
    };

    let updated = [...storeData.collections];
    if (editingCol) {
      updated = updated.map((c) => (c.id === editingCol.id ? newCol : c));
    } else {
      updated.push(newCol);
    }

    const newStore = { ...storeData, collections: updated };
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
    if (!storeData || !confirm('Delete collection?')) return;
    const updated = storeData.collections.filter((c) => c.id !== id);
    const newStore = { ...storeData, collections: updated };
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
    return <div className="text-center py-20 text-xs uppercase tracking-widest text-[#78716C]">Loading Collections...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E5E4]">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#1C1917]">Featured Collections Management</h1>
          <p className="text-xs text-[#78716C]">Manage editorial campaign edits such as Festive Edit, Everyday Edit, Occasion Edit.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-[#7A1C30] hover:bg-[#5F1524] text-white text-xs uppercase tracking-widest px-5 py-3 font-semibold flex items-center gap-1.5 transition-colors self-start"
        >
          <Plus size={16} /> Create Collection
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {storeData.collections.map((col) => (
          <div key={col.id} className="bg-white border border-[#E7E5E4] luxury-card-shadow overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="aspect-[16/9] bg-stone-100 overflow-hidden relative">
                <img src={col.heroImage} alt={col.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 flex gap-1">
                  <span className={`text-[9px] uppercase tracking-widest px-2 py-0.5 font-bold ${col.isPublished ? 'bg-emerald-700 text-white' : 'bg-stone-600 text-white'}`}>
                    {col.isPublished ? 'Published' : 'Draft'}
                  </span>
                  {col.isFeatured && <span className="bg-[#7A1C30] text-white text-[9px] uppercase tracking-widest px-2 py-0.5 font-bold">Featured</span>}
                </div>
              </div>
              <div className="p-6 space-y-2">
                <h3 className="font-serif text-xl font-bold text-[#1C1917]">{col.title}</h3>
                <p className="text-xs text-[#78716C] line-clamp-2">{col.description}</p>
                <p className="text-[10px] text-[#7A1C30] font-mono">Slug: /collections/{col.slug}</p>
              </div>
            </div>
            <div className="p-6 pt-0 flex justify-end gap-2">
              <button onClick={() => handleOpenEdit(col)} className="p-2 text-[#1C1917] border border-[#E7E5E4] hover:text-[#7A1C30]">
                <Edit size={14} />
              </button>
              <button onClick={() => handleDelete(col.id)} className="p-2 text-red-600 border border-[#E7E5E4]">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="relative bg-white max-w-lg w-full p-6 shadow-2xl border border-[#E7E5E4] z-10 space-y-4">
            <h3 className="font-serif text-xl font-bold">{editingCol ? 'Edit Collection' : 'Create Collection'}</h3>
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase mb-1">Title</label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2.5 bg-[#FAF8F5] border border-[#E7E5E4]" />
              </div>
              <div>
                <label className="block font-semibold uppercase mb-1">Description</label>
                <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2.5 bg-[#FAF8F5] border border-[#E7E5E4] resize-none" />
              </div>
              <div>
                <label className="block font-semibold uppercase mb-1">Hero Image URL</label>
                <input type="text" required value={heroImage} onChange={(e) => setHeroImage(e.target.value)} className="w-full p-2.5 bg-[#FAF8F5] border border-[#E7E5E4]" />
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className="accent-[#7A1C30]" />
                  <span className="font-semibold uppercase">Published</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="accent-[#7A1C30]" />
                  <span className="font-semibold uppercase">Featured</span>
                </label>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 border">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#7A1C30] text-white">Save Collection</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
