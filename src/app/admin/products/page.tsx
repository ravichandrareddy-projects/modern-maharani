'use client';

import React, { useState, useEffect } from 'react';
import { StoreData, Product, AvailabilityStatus } from '@/lib/types';
import { Plus, Edit, Trash2, Copy, Eye, X, Check, Search, Sparkles } from 'lucide-react';

export default function AdminProductsPage() {
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Kurtis');
  const [collectionSlug, setCollectionSlug] = useState('festive-edit-2026');
  const [price, setPrice] = useState<number | undefined>(2990);
  const [salePrice, setSalePrice] = useState<number | undefined>(undefined);
  const [description, setDescription] = useState('');
  const [fabric, setFabric] = useState('');
  const [sizes, setSizes] = useState<string[]>(['S', 'M', 'L', 'XL']);
  const [colors, setColors] = useState<string[]>(['Maroon']);
  const [images, setImages] = useState<string[]>(['/images/hero_banner.jpg']);
  const [imageInput, setImageInput] = useState('');
  const [availability, setAvailability] = useState<AvailabilityStatus>('Check Availability');
  const [isNewArrival, setIsNewArrival] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [tags, setTags] = useState<string[]>(['Elegant']);
  const [saving, setSaving] = useState(false);

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
    setEditingProduct(null);
    setName('');
    setCategory('Kurtis');
    setCollectionSlug('');
    setPrice(2990);
    setSalePrice(undefined);
    setDescription('Beautiful contemporary outfit crafted for modern women.');
    setFabric('Silk Blend');
    setSizes(['S', 'M', 'L', 'XL']);
    setColors(['Maroon']);
    setImages(['/images/hero_banner.jpg']);
    setAvailability('Check Availability');
    setIsNewArrival(true);
    setIsFeatured(false);
    setTags(['Contemporary', 'Elegant']);
    setModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setCategory(p.category);
    setCollectionSlug(p.collectionSlug || '');
    setPrice(p.price);
    setSalePrice(p.salePrice);
    setDescription(p.description);
    setFabric(p.fabric || '');
    setSizes(p.sizes || []);
    setColors(p.colors || []);
    setImages(p.images || ['/images/hero_banner.jpg']);
    setAvailability(p.availability);
    setIsNewArrival(p.isNewArrival);
    setIsFeatured(p.isFeatured);
    setTags(p.tags || []);
    setModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeData || !name.trim()) return;

    setSaving(true);
    const slug = editingProduct
      ? editingProduct.slug
      : name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const newProd: Product = {
      id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
      slug,
      name,
      category,
      collectionSlug: collectionSlug || undefined,
      price: price ? Number(price) : undefined,
      salePrice: salePrice ? Number(salePrice) : undefined,
      description,
      fabric,
      sizes,
      colors,
      images: images.length > 0 ? images : ['/images/hero_banner.jpg'],
      availability,
      isNewArrival,
      isFeatured,
      tags,
      createdAt: editingProduct ? editingProduct.createdAt : new Date().toISOString().substring(0, 10)
    };

    let updatedProducts = [...storeData.products];
    if (editingProduct) {
      updatedProducts = updatedProducts.map((p) => (p.id === editingProduct.id ? newProd : p));
    } else {
      updatedProducts.unshift(newProd);
    }

    const newStoreData: StoreData = {
      ...storeData,
      products: updatedProducts,
      analytics: {
        ...storeData.analytics,
        totalProducts: updatedProducts.length,
        newArrivalsCount: updatedProducts.filter((p) => p.isNewArrival).length
      }
    };

    try {
      await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStoreData)
      });
      setStoreData(newStoreData);
      setModalOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!storeData || !confirm('Are you sure you want to delete this product from the showroom catalog?')) return;

    const updatedProducts = storeData.products.filter((p) => p.id !== id);
    const newStoreData: StoreData = {
      ...storeData,
      products: updatedProducts,
      analytics: {
        ...storeData.analytics,
        totalProducts: updatedProducts.length,
        newArrivalsCount: updatedProducts.filter((p) => p.isNewArrival).length
      }
    };

    try {
      await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStoreData)
      });
      setStoreData(newStoreData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddImage = () => {
    if (imageInput.trim()) {
      setImages([...images, imageInput.trim()]);
      setImageInput('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  if (loading || !storeData) {
    return <div className="text-center py-20 text-xs uppercase tracking-widest text-[#78716C]">Loading Catalog Management...</div>;
  }

  const filteredProducts = storeData.products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E5E4]">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#1C1917]">Product Catalog Management</h1>
          <p className="text-xs text-[#78716C]">Add, edit, reorder or adjust product availability statuses for Modern Maharani.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-[#7A1C30] hover:bg-[#5F1524] text-white text-xs uppercase tracking-widest px-5 py-3 font-semibold flex items-center gap-1.5 transition-colors self-start"
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 border border-[#E7E5E4] flex items-center gap-2">
        <Search size={16} className="text-[#78716C]" />
        <input
          type="text"
          placeholder="Filter products by title or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-xs bg-transparent border-none focus:outline-none"
        />
      </div>

      {/* Table List */}
      <div className="bg-white border border-[#E7E5E4] overflow-x-auto shadow-sm">
        <table className="w-full text-left text-xs text-[#1C1917]">
          <thead className="bg-[#FAF8F5] text-[#78716C] uppercase tracking-wider text-[10px] border-b border-[#E7E5E4]">
            <tr>
              <th className="py-3 px-4">Outfit Image</th>
              <th className="py-3 px-4">Product Name</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Availability</th>
              <th className="py-3 px-4">Badges</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E7E5E4]">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-[#FAF8F5] transition-colors">
                <td className="py-3 px-4">
                  <div className="w-12 h-14 bg-stone-100 overflow-hidden border border-[#E7E5E4]">
                    <img src={product.images[0] || '/images/hero_banner.jpg'} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="font-semibold text-sm block">{product.name}</span>
                  <span className="text-[10px] text-[#78716C]">Slug: {product.slug}</span>
                </td>
                <td className="py-3 px-4 font-medium">{product.category}</td>
                <td className="py-3 px-4 font-semibold">
                  {product.price ? `₹${product.price.toLocaleString('en-IN')}` : 'Enquire'}
                </td>
                <td className="py-3 px-4">
                  <span className="bg-[#7A1C30]/10 text-[#7A1C30] text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                    {product.availability}
                  </span>
                </td>
                <td className="py-3 px-4 space-x-1">
                  {product.isNewArrival && <span className="bg-black text-white text-[9px] px-1.5 py-0.5 uppercase font-bold">New</span>}
                  {product.isFeatured && <span className="bg-[#7A1C30] text-white text-[9px] px-1.5 py-0.5 uppercase font-bold">Featured</span>}
                </td>
                <td className="py-3 px-4 text-right space-x-2">
                  <button
                    onClick={() => handleOpenEdit(product)}
                    className="p-1.5 text-[#1C1917] hover:text-[#7A1C30] border border-[#E7E5E4]"
                    title="Edit Product"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="p-1.5 text-red-600 hover:text-red-800 border border-[#E7E5E4]"
                    title="Delete Product"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD / EDIT PRODUCT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setModalOpen(false)} />

          <div className="relative bg-white max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#E7E5E4] z-10 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4]">
              <h2 className="font-serif text-2xl font-bold text-[#1C1917]">
                {editingProduct ? 'Edit Outfit Details' : 'Add New Showroom Outfit'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-[#78716C] hover:text-[#1C1917] p-1">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase text-[#1C1917] mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E7E5E4] focus:outline-none focus:border-[#7A1C30]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase text-[#1C1917] mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E7E5E4]"
                  >
                    <option value="Kurtis">Kurtis</option>
                    <option value="Dresses">Dresses</option>
                    <option value="Occasion Wear">Occasion Wear</option>
                    <option value="New Arrivals">New Arrivals</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold uppercase text-[#1C1917] mb-1">Collection</label>
                  <select
                    value={collectionSlug}
                    onChange={(e) => setCollectionSlug(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E7E5E4]"
                  >
                    <option value="">None / Regular Catalog</option>
                    <option value="festive-edit-2026">Festive Edit</option>
                    <option value="everyday-elegance">Everyday Edit</option>
                    <option value="occasion-edit">Occasion Edit</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase text-[#1C1917] mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={price || ''}
                    onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E7E5E4]"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-[#1C1917] mb-1">Sale Price (₹)</label>
                  <input
                    type="number"
                    value={salePrice || ''}
                    onChange={(e) => setSalePrice(e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E7E5E4]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase text-[#1C1917] mb-1">Availability Status</label>
                <select
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value as AvailabilityStatus)}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E7E5E4]"
                >
                  <option value="Check Availability">Check Availability (Default)</option>
                  <option value="Available">Available (In Store)</option>
                  <option value="Limited Stock">Limited Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                  <option value="Coming Soon">Coming Soon</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold uppercase text-[#1C1917] mb-1">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E7E5E4] resize-none"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-[#1C1917] mb-1">Fabric / Material</label>
                <input
                  type="text"
                  value={fabric}
                  onChange={(e) => setFabric(e.target.value)}
                  placeholder="e.g. Silk Blend, Chanderi, Georgette"
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E7E5E4]"
                />
              </div>

              {/* Badges */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isNewArrival}
                    onChange={(e) => setIsNewArrival(e.target.checked)}
                    className="accent-[#7A1C30]"
                  />
                  <span className="font-semibold uppercase">Mark as New Arrival</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="accent-[#7A1C30]"
                  />
                  <span className="font-semibold uppercase">Mark as Featured</span>
                </label>
              </div>

              {/* Image URLs */}
              <div className="space-y-2 pt-2 border-t border-[#E7E5E4]">
                <label className="block font-semibold uppercase text-[#1C1917]">Product Image URLs</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter image URL..."
                    value={imageInput}
                    onChange={(e) => setImageInput(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E7E5E4]"
                  />
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="bg-[#1C1917] text-white px-4 py-2.5 uppercase text-[10px] font-bold shrink-0"
                  >
                    Add Image
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {images.map((img, i) => (
                    <div key={i} className="relative w-16 h-20 border border-[#E7E5E4] group">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(i)}
                        className="absolute top-0 right-0 bg-red-600 text-white p-0.5"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E7E5E4] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 border border-[#1C1917] text-xs uppercase font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-[#7A1C30] hover:bg-[#5F1524] text-white px-6 py-2.5 text-xs uppercase font-semibold transition-colors"
                >
                  {saving ? 'Saving...' : 'Save Outfit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
