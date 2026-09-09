'use client';

import React, { useState, useEffect } from 'react';
import { StoreData, Product, AvailabilityStatus } from '@/lib/types';
import { TAXONOMY_CATEGORIES } from '@/data/catalogData';
import { Plus, Edit, Trash2, Search, Filter, Layers, Check, X, ShieldCheck } from 'lucide-react';

export default function AdminInventoryPage() {
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Dynamic Cascading Form State
  const [name, setName] = useState('');
  const [rootCat, setRootCat] = useState('dress-materials');
  const [subCat, setSubCat] = useState('kota-cottons');
  const [leafType, setLeafType] = useState('Pure Handloom Kota Cotton');
  
  const [stock, setStock] = useState<number>(10);
  const [price, setPrice] = useState<number>(1299);
  const [compareAtPrice, setCompareAtPrice] = useState<number>(1899);
  const [description, setDescription] = useState('');
  const [fabric, setFabric] = useState('Pure Kota Doria');
  const [work, setWork] = useState('Kutch Embroidery');
  const [inclusions, setInclusions] = useState('Top: 2.5m, Bottom: 2.0m, Dupatta: 2.4m');
  const [images, setImages] = useState<string[]>(['https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop']);
  const [availability, setAvailability] = useState<AvailabilityStatus>('Available');
  const [saving, setSaving] = useState(false);

  // Root categories
  const rootCategories = TAXONOMY_CATEGORIES.filter(c => !c.parentSlug);
  // Subcategories dependent on rootCat
  const currentSubCategories = TAXONOMY_CATEGORIES.filter(c => c.parentSlug === rootCat);

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

  // When root category changes, auto update subcategory selection
  const handleRootChange = (newRoot: string) => {
    setRootCat(newRoot);
    const subs = TAXONOMY_CATEGORIES.filter(c => c.parentSlug === newRoot);
    if (subs.length > 0) {
      setSubCat(subs[0].slug);
    } else {
      setSubCat('');
    }
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setName('');
    setRootCat('dress-materials');
    setSubCat('kota-cottons');
    setLeafType('Pure Handloom Kota Cotton');
    setStock(10);
    setPrice(1299);
    setCompareAtPrice(1899);
    setDescription('Handcrafted premium ethnic wear ensemble designed for modern royalty.');
    setFabric('Pure Kota Doria Cotton');
    setWork('Kutch Embroidery & Mirror Borders');
    setInclusions('Top: 2.5m, Bottom: 2.0m, Dupatta: 2.4m');
    setImages(['https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop']);
    setAvailability('Available');
    setModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    
    // Infer root & subcategory
    const catList = p.categories || [];
    let r = 'dress-materials';
    let s = 'kota-cottons';

    if (catList.includes('Readymades & Kurtas') || catList.includes('readymade-ethnic')) {
      r = 'readymade-ethnic';
      s = catList.find(c => ['three-piece-sets', 'frocks-anarkalis', 'indo-western', 'partywear', 'daily-kurtis'].includes(c)) || 'three-piece-sets';
    } else if (catList.includes('Sarees') || catList.includes('sarees')) {
      r = 'sarees';
      s = catList.find(c => ['handloom-sarees', 'silk-sarees', 'casual-sarees'].includes(c)) || 'handloom-sarees';
    } else if (catList.includes('Budget Store') || catList.includes('budget-store')) {
      r = 'budget-store';
      s = catList.find(c => ['under-899', 'under-1199', 'store-perks'].includes(c)) || 'under-899';
    } else {
      r = 'dress-materials';
      s = catList.find(c => ['kota-cottons', 'silks-blends', 'traditional-crafts'].includes(c)) || 'kota-cottons';
    }

    setRootCat(r);
    setSubCat(s);
    setLeafType(catList[catList.length - 1] || p.name);
    setStock(p.stock !== undefined ? p.stock : 10);
    setPrice(p.price || 999);
    setCompareAtPrice(p.salePrice && p.price ? p.price : Math.round((p.price || 999) * 1.3));
    setDescription(p.description || '');
    setFabric(p.fabric || '');
    setWork(p.work || '');
    setInclusions(p.inclusions || '');
    setImages(p.images || ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop']);
    setAvailability(p.availability || 'Available');
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeData || !name.trim()) return;

    setSaving(true);
    const computedSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `item-${Date.now()}`;
    const slug = editingProduct ? editingProduct.slug : computedSlug;
    const isFreeShipping = price >= 1000;

    const newProd: Product = {
      id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
      slug,
      name,
      categories: [rootCat, subCat, leafType],
      stock: Number(stock),
      price: Number(price),
      salePrice: price < compareAtPrice ? Number(price) : undefined,
      description,
      fabric,
      work,
      inclusions,
      sizes: editingProduct?.sizes || ['S', 'M', 'L', 'XL', 'Unstitched'],
      colors: editingProduct?.colors || ['Multicolor'],
      isTrending: editingProduct?.isTrending || false,
      isFreeShippingEligible: isFreeShipping,
      images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop'],
      availability,
      isNewArrival: true,
      isFeatured: false,
      tags: [rootCat, subCat, fabric],
      createdAt: editingProduct ? editingProduct.createdAt : new Date().toISOString().substring(0, 10)
    };

    let updatedProducts = [...storeData.products];
    if (editingProduct) {
      updatedProducts = updatedProducts.map(p => p.id === editingProduct.id ? newProd : p);
    } else {
      updatedProducts.unshift(newProd);
    }

    const newStore = { ...storeData, products: updatedProducts };
    try {
      await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStore)
      });
      setStoreData(newStore);
      setModalOpen(false);
    } catch (e) {
      console.error('Failed to save product', e);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!storeData || !confirm('Delete product from inventory taxonomy?')) return;
    const updated = storeData.products.filter(p => p.id !== id);
    const newStore = { ...storeData, products: updated };
    try {
      await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStore)
      });
      setStoreData(newStore);
    } catch (e) {
      console.error(e);
    }
  };

  if (loading || !storeData) {
    return <div className="text-center py-20 text-xs uppercase tracking-widest text-[#78716C]">Loading Inventory Catalog...</div>;
  }

  const filteredProducts = storeData.products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.categories || []).some(c => c.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E5E4]">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="text-[#7A1C30]" size={24} />
            <h1 className="font-serif text-3xl font-bold text-[#1C1917]">Taxonomy & Inventory Controls</h1>
          </div>
          <p className="text-xs text-[#78716C] mt-1">
            Manage multi-tiered root categories, subcategories, unstitched fabric inclusions, and automatic shipping eligibility.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-brand hover:opacity-90 text-white text-xs uppercase tracking-widest px-5 py-3 font-bold flex items-center gap-1.5 transition-colors self-start shadow"
        >
          <Plus size={16} /> Add Inventory Item
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#78716C]" size={16} />
        <input
          type="text"
          placeholder="Filter inventory by title, category or SKU..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-xs border border-[#E7E5E4] rounded-none focus:outline-none focus:border-brand"
        />
      </div>

      {/* Inventory Table */}
      <div className="bg-white border border-[#E7E5E4] overflow-x-auto shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FAF9F6] border-b border-[#E7E5E4] text-[10px] uppercase tracking-wider text-[#78716C]">
              <th className="p-4 font-bold">Product</th>
              <th className="p-4 font-bold">Taxonomy Hierarchy</th>
              <th className="p-4 font-bold">Price & Shipping</th>
              <th className="p-4 font-bold">Stock</th>
              <th className="p-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E7E5E4] text-xs">
            {filteredProducts.map((prod) => {
              const root = (prod.categories && prod.categories[0]) || 'General';
              const sub = (prod.categories && prod.categories[1]) || '-';
              const isFreeShipping = (prod.price || 0) >= 1000 || prod.isFreeShippingEligible;

              return (
                <tr key={prod.id} className="hover:bg-[#FAF9F6] transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop'}
                        alt={prod.name}
                        className="w-12 h-14 object-cover border border-[#E7E5E4]"
                      />
                      <div>
                        <h4 className="font-bold text-[#1C1917] line-clamp-1">{prod.name}</h4>
                        <p className="text-[10px] text-[#78716C]">Fabric: {prod.fabric || 'Pure Cotton'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <span className="inline-block bg-[#7A1C30]/10 text-[#7A1C30] text-[9px] uppercase font-bold px-2 py-0.5 rounded">
                        {root}
                      </span>
                      <p className="text-[10px] text-[#78716C] font-mono">➜ {sub}</p>
                    </div>
                  </td>
                  <td className="p-4 font-mono">
                    <span className="font-bold text-[#1C1917]">₹{(prod.price || 0).toLocaleString('en-IN')}</span>
                    {isFreeShipping && (
                      <span className="ml-2 text-[9px] uppercase font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 border border-emerald-200">
                        Free Ship
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className={`font-mono font-bold ${prod.stock && prod.stock < 5 ? 'text-amber-600' : 'text-[#1C1917]'}`}>
                      {prod.stock !== undefined ? prod.stock : 10} pcs
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(prod)}
                        className="p-1.5 text-[#1C1917] hover:text-[#7A1C30] border border-[#E7E5E4]"
                        title="Edit Item"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(prod.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 border border-[#E7E5E4]"
                        title="Delete Item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Cascading Category Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl border border-[#E7E5E4]">
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4]">
              <h2 className="font-serif text-xl font-bold text-[#1C1917]">
                {editingProduct ? 'Edit Inventory Item' : 'Add New Inventory Item'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-[#78716C] hover:text-[#1C1917]">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#1C1917] mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Pure Handloom Kota Cotton Suit Set with Kutch Work"
                  className="w-full p-2.5 border border-[#E7E5E4] rounded-none"
                />
              </div>

              {/* Dynamic Cascading Dropdowns */}
              <div className="bg-[#FAF9F6] p-4 border border-[#E7E5E4] space-y-3">
                <h3 className="font-bold text-[#7A1C30] uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                  <ShieldCheck size={14} /> Cascading Taxonomy Selector
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-[#78716C] mb-1">1. Root Category</label>
                    <select
                      value={rootCat}
                      onChange={(e) => handleRootChange(e.target.value)}
                      className="w-full p-2 bg-white border border-[#E7E5E4] font-bold"
                    >
                      {rootCategories.map((c) => (
                        <option key={c.id} value={c.slug}>{c.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-[#78716C] mb-1">2. Subcategory</label>
                    <select
                      value={subCat}
                      onChange={(e) => setSubCat(e.target.value)}
                      className="w-full p-2 bg-white border border-[#E7E5E4] font-bold"
                    >
                      {currentSubCategories.map((c) => (
                        <option key={c.id} value={c.slug}>{c.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#78716C] mb-1">3. Leaf Product Type / Silhouette</label>
                  <input
                    type="text"
                    value={leafType}
                    onChange={(e) => setLeafType(e.target.value)}
                    placeholder="e.g. Pure Handloom Kota Cotton (Kutch Work & Mirror Borders)"
                    className="w-full p-2 bg-white border border-[#E7E5E4]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-[#1C1917] mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full p-2 border border-[#E7E5E4]"
                  />
                  {price >= 1000 ? (
                    <p className="text-[10px] text-emerald-700 mt-0.5">✓ Eligible for Free Shipping Badge</p>
                  ) : (
                    <p className="text-[10px] text-[#78716C] mt-0.5">Standard Shipping Applies (&lt; ₹1000)</p>
                  )}
                </div>
                <div>
                  <label className="block font-bold text-[#1C1917] mb-1">Compare At Price (MRP ₹)</label>
                  <input
                    type="number"
                    value={compareAtPrice}
                    onChange={(e) => setCompareAtPrice(Number(e.target.value))}
                    className="w-full p-2 border border-[#E7E5E4]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#1C1917] mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    required
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full p-2 border border-[#E7E5E4]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#1C1917] mb-1">Fabric Specification</label>
                  <input
                    type="text"
                    value={fabric}
                    onChange={(e) => setFabric(e.target.value)}
                    placeholder="e.g. Pure Raw Silk / Kota Doria"
                    className="w-full p-2 border border-[#E7E5E4]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#1C1917] mb-1">Craft / Embellishment</label>
                  <input
                    type="text"
                    value={work}
                    onChange={(e) => setWork(e.target.value)}
                    placeholder="e.g. Hand Maggam & Zardozi Yoke"
                    className="w-full p-2 border border-[#E7E5E4]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#1C1917] mb-1">Fabric Inclusions (For Unstitched Sets)</label>
                <input
                  type="text"
                  value={inclusions}
                  onChange={(e) => setInclusions(e.target.value)}
                  placeholder="e.g. Top: 2.5m, Bottom: 2.0m, Dupatta: 2.4m"
                  className="w-full p-2 border border-[#E7E5E4]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1C1917] mb-1">Product Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border border-[#E7E5E4]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#E7E5E4]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-[#E7E5E4] uppercase font-bold text-[10px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-brand text-white uppercase font-bold text-[10px] hover:opacity-90"
                >
                  {saving ? 'Saving...' : 'Save Product Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
