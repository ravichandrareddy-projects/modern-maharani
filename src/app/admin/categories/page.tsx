'use client';

import React, { useState, useEffect } from 'react';
import { StoreData, Category } from '@/lib/types';
import { Tag, Plus, Edit, Trash2, X, Upload } from 'lucide-react';

export default function AdminCategoriesPage() {
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<Category | null>(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

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
    setEditingCat(null);
    setName('');
    setDescription('');
    setImage('https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop');
    setModalOpen(true);
  };

  const handleOpenEdit = (cat: Category) => {
    setEditingCat(cat);
    setName(cat.name);
    setDescription(cat.description);
    setImage(cat.image);
    setModalOpen(true);
  };

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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeData || !name.trim()) return;

    const slug = editingCat
      ? editingCat.slug
      : name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const newCat: Category = {
      id: editingCat ? editingCat.id : `cat-${Date.now()}`,
      slug,
      name,
      description,
      image
    };

    let updated = [...storeData.categories];
    if (editingCat) {
      updated = updated.map((c) => (c.id === editingCat.id ? newCat : c));
    } else {
      updated.push(newCat);
    }

    const newStore = { ...storeData, categories: updated };
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
    if (!storeData || !confirm('Delete category from website?')) return;
    const updated = storeData.categories.filter((c) => c.id !== id);
    const newStore = { ...storeData, categories: updated };
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
    return <div className="text-center py-20 text-xs uppercase tracking-widest text-[#78716C]">Loading Categories...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E5E4]">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#1C1917]">Catalog Categories Manager</h1>
          <p className="text-xs text-[#78716C]">Create new clothing categories (Kurtis, Dresses, Shirts & Tops, Occasion Wear) that display live on the website.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-brand hover:opacity-90 text-white text-xs uppercase tracking-widest px-5 py-3 font-bold flex items-center gap-1.5 transition-colors self-start shadow"
        >
          <Plus size={16} /> Add New Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {storeData.categories.map((cat) => (
          <div key={cat.id} className="bg-white border border-[#E7E5E4] luxury-card-shadow overflow-hidden flex flex-col justify-between">
            <div className="space-y-3">
              <div className="aspect-[3/4] bg-stone-100 overflow-hidden relative">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 space-y-1">
                <h3 className="font-serif text-lg font-bold text-[#1C1917]">{cat.name}</h3>
                <p className="text-xs text-[#78716C] line-clamp-2">{cat.description}</p>
              </div>
            </div>
            <div className="p-4 pt-0 flex justify-end gap-2">
              <button onClick={() => handleOpenEdit(cat)} className="p-1.5 text-[#1C1917] hover:text-brand border border-[#E7E5E4]">
                <Edit size={14} />
              </button>
              <button onClick={() => handleDelete(cat.id)} className="p-1.5 text-red-600 hover:text-red-800 border border-[#E7E5E4]">
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
            <h3 className="font-serif text-xl font-bold">{editingCat ? 'Edit Category' : 'Add New Category'}</h3>
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shirts & Tops"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E7E5E4] font-bold text-sm"
                />
              </div>
              <div>
                <label className="block font-semibold uppercase mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E7E5E4] resize-none"
                />
              </div>

              {/* Upload Cover Image */}
              <div className="space-y-2 p-3 bg-[#FAF8F5] border border-[#E7E5E4]">
                <label className="text-[11px] font-bold uppercase text-[#1C1917] flex items-center gap-1.5">
                  <Upload size={14} className="text-brand" /> Upload Cover Image From Device:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="block w-full text-xs text-[#78716C] file:mr-3 file:py-1 file:px-2 file:border-0 file:text-[10px] file:font-bold file:uppercase file:bg-brand file:text-white cursor-pointer border border-[#E7E5E4] bg-white"
                />

                <label className="block font-semibold uppercase text-[#78716C] text-[10px] pt-1">Or Direct Image URL:</label>
                <input
                  type="text"
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full p-2 bg-white border border-[#E7E5E4] font-mono text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 border">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-brand text-white font-bold uppercase tracking-wider text-xs">Save Category</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
