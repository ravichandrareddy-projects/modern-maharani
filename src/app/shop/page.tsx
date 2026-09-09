'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { Product, Category } from '@/lib/types';
import { Search, Filter, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialTag = searchParams.get('tag') || 'All';
  const initialQuery = searchParams.get('query') || '';
  const initialWishlistOnly = searchParams.get('wishlist') === 'true';

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedFabric, setSelectedFabric] = useState<string>('All');
  const [selectedWork, setSelectedWork] = useState<string>('All');
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('All');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string>(initialTag);
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [sortOption, setSortOption] = useState<string>('latest');
  const [wishlistOnly, setWishlistOnly] = useState<boolean>(initialWishlistOnly);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/data');
        const data = await res.json();
        setProducts(data.products || []);
        setCategories(data.categories || []);
      } catch (err) {
        console.error('Failed to load shop data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter products
  const filteredProducts = products.filter((product) => {
    // Category match
    if (selectedCategory !== 'All') {
      const target = selectedCategory.toLowerCase();
      const matchesCategory = (product.categories || []).some(
        (c) => c.toLowerCase() === target || c.toLowerCase().includes(target) || target.includes(c.toLowerCase())
      );
      if (!matchesCategory) return false;
    }
    if (selectedFabric !== 'All' && (!product.fabric || product.fabric.toLowerCase() !== selectedFabric.toLowerCase())) {
      return false;
    }
    if (selectedWork !== 'All' && (!product.work || product.work.toLowerCase() !== selectedWork.toLowerCase())) {
      return false;
    }
    if (selectedAvailability !== 'All' && product.availability !== selectedAvailability) {
      return false;
    }
    const currentPrice = product.salePrice || product.price || 0;
    if (minPrice !== '' && currentPrice < minPrice) return false;
    if (maxPrice !== '' && currentPrice > maxPrice) return false;
    // Tag match
    if (selectedTag !== 'All' && !product.tags.includes(selectedTag)) {
      return false;
    }
    // Size match
    if (selectedSize !== 'All' && (!product.sizes || !product.sizes.includes(selectedSize))) {
      return false;
    }
    // Wishlist match
    if (wishlistOnly) {
      try {
        const savedWishlist = JSON.parse(localStorage.getItem('mm_wishlist') || '[]');
        if (!savedWishlist.includes(product.id)) return false;
      } catch (e) {
        return false;
      }
    }
    // Query search match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const nameMatch = product.name.toLowerCase().includes(q);
      const catMatch = product.categories?.some(c => c.toLowerCase().includes(q));
      const descMatch = product.description.toLowerCase().includes(q);
      const fabricMatch = product.fabric ? product.fabric.toLowerCase().includes(q) : false;
      if (!nameMatch && !catMatch && !descMatch && !fabricMatch) return false;
    }
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price-low') {
      return (a.salePrice || a.price || 0) - (b.salePrice || b.price || 0);
    }
    if (sortOption === 'price-high') {
      return (b.salePrice || b.price || 0) - (a.salePrice || a.price || 0);
    }
    // Default 'latest'
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const availableSizes = ['S', 'M', 'L', 'XL', 'XXL', '3XL', 'Unstitched'];
  const fabrics = Array.from(new Set(products.map(p => p.fabric).filter(Boolean)));
  const works = Array.from(new Set(products.map(p => p.work).filter(Boolean)));
  const availabilities = ['Available', 'Limited Stock', 'Out of Stock', 'Coming Soon'];
  const tagsList = ['Elegant', 'Minimal', 'Festive', 'Contemporary', 'Statement'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3 pb-6 border-b border-[#E7E5E4]">
        <span className="text-xs uppercase tracking-[0.25em] text-[#7A1C30] font-semibold">Digital Showroom</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1C1917]">Shop Collection</h1>
        <p className="text-xs sm:text-sm text-[#78716C] max-w-lg mx-auto">
          Browse contemporary women's Kurtis, Dresses, and Occasion Wear available at Modern Maharani KPHB.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex justify-between items-center border-b border-[#E7E5E4] pb-4">
          <button onClick={() => setIsMobileFilterOpen(true)} className="flex items-center gap-2 border border-[#E7E5E4] px-4 py-2 text-xs font-bold uppercase tracking-wider bg-white">
            <Filter size={16} /> Filters & Sort
          </button>
          <span className="text-xs text-[#78716C]">{sortedProducts.length} Results</span>
        </div>

        {/* Sidebar Filters */}
        <aside className={`fixed inset-0 z-50 bg-white p-6 overflow-y-auto transition-transform transform ${isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full'} lg:static lg:translate-x-0 lg:w-64 lg:shrink-0 lg:block lg:bg-transparent lg:p-0 lg:z-auto`}>
          <div className="flex justify-between items-center lg:hidden mb-6">
            <h2 className="font-serif text-xl font-bold">Filters</h2>
            <button onClick={() => setIsMobileFilterOpen(false)}><X size={24} /></button>
          </div>

          <div className="space-y-6">
            {/* Sort */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider mb-3 text-[#1C1917] flex items-center gap-2"><ArrowUpDown size={14}/> Sort By</h3>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full py-2 px-3 text-xs bg-white border border-[#E7E5E4] focus:outline-none focus:border-[#7A1C30]"
              >
                <option value="latest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* Categories */}
            <div className="border-t border-[#E7E5E4] pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider mb-3 text-[#1C1917]">Category</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input type="radio" name="category" checked={selectedCategory === 'All'} onChange={() => setSelectedCategory('All')} className="accent-brand" /> All
                </label>
                {categories.map(cat => (
                  <label key={cat.id} className="flex items-center gap-2 text-xs cursor-pointer">
                    <input type="radio" name="category" checked={selectedCategory.toLowerCase() === cat.name.toLowerCase()} onChange={() => setSelectedCategory(cat.name)} className="accent-brand" /> {cat.name}
                  </label>
                ))}
              </div>
            </div>

            {/* Fabric */}
            {fabrics.length > 0 && (
              <div className="border-t border-[#E7E5E4] pt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider mb-3 text-[#1C1917]">Fabric</h3>
                <select value={selectedFabric} onChange={(e) => setSelectedFabric(e.target.value)} className="w-full py-2 px-3 text-xs bg-white border border-[#E7E5E4]">
                  <option value="All">All Fabrics</option>
                  {fabrics.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
            )}

            {/* Work */}
            {works.length > 0 && (
              <div className="border-t border-[#E7E5E4] pt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider mb-3 text-[#1C1917]">Craft / Work</h3>
                <select value={selectedWork} onChange={(e) => setSelectedWork(e.target.value)} className="w-full py-2 px-3 text-xs bg-white border border-[#E7E5E4]">
                  <option value="All">All Crafts</option>
                  {works.map(w => <option key={w} value={w}>{w}</option>)}
                </select>
              </div>
            )}

            {/* Price Range */}
            <div className="border-t border-[#E7E5E4] pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider mb-3 text-[#1C1917]">Price Range (₹)</h3>
              <div className="flex items-center gap-2">
                <input type="number" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : '')} className="w-full py-1.5 px-2 text-xs border border-[#E7E5E4]" />
                <span className="text-[#78716C]">-</span>
                <input type="number" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : '')} className="w-full py-1.5 px-2 text-xs border border-[#E7E5E4]" />
              </div>
            </div>

            {/* Availability */}
            <div className="border-t border-[#E7E5E4] pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider mb-3 text-[#1C1917]">Availability</h3>
              <select value={selectedAvailability} onChange={(e) => setSelectedAvailability(e.target.value)} className="w-full py-2 px-3 text-xs bg-white border border-[#E7E5E4]">
                <option value="All">All Statuses</option>
                {availabilities.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            
            {/* Clear Filters */}
            <div className="border-t border-[#E7E5E4] pt-4">
                <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedTag('All');
                  setSelectedSize('All');
                  setSearchQuery('');
                  setWishlistOnly(false);
                  setSelectedFabric('All');
                  setSelectedWork('All');
                  setMinPrice('');
                  setMaxPrice('');
                  setSelectedAvailability('All');
                }}
                className="w-full text-[#7A1C30] border border-[#7A1C30] hover:bg-[#7A1C30] hover:text-white py-2 text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1">
          {/* Header row desktop */}
          <div className="hidden lg:flex justify-between items-center mb-6">
            <span className="text-sm text-[#78716C]">{sortedProducts.length} Results</span>
            {searchQuery && <span className="text-xs bg-[#FAF8F5] px-3 py-1 border border-[#E7E5E4]">Search: "{searchQuery}"</span>}
          </div>

          {/* Product Grid */}
      {loading ? (
        <div className="text-center py-20 text-[#78716C] text-sm">
          Loading Modern Maharani Showroom Catalog...
        </div>
      ) : sortedProducts.length === 0 ? (
        <div className="text-center py-20 bg-white border border-[#E7E5E4] p-8 space-y-4">
          <p className="text-base text-[#1C1917] font-serif">No outfits match your chosen filter criteria.</p>
          <p className="text-xs text-[#78716C]">Try clearing your search query or selecting a different category.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedTag('All');
              setSelectedSize('All');
              setSearchQuery('');
              setWishlistOnly(false);
            }}
            className="bg-[#7A1C30] text-white text-xs uppercase tracking-widest px-6 py-2.5"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading Shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
