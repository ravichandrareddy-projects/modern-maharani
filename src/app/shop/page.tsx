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
    if (selectedCategory !== 'All' && product.category.toLowerCase() !== selectedCategory.toLowerCase()) {
      return false;
    }
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
      const catMatch = product.category.toLowerCase().includes(q);
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

  const availableSizes = ['S', 'M', 'L', 'XL', 'XXL'];
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

      {/* Filter & Sort Bar */}
      <div className="bg-white p-4 border border-[#E7E5E4] space-y-4 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`text-xs uppercase tracking-wider px-3.5 py-1.5 font-medium transition-colors ${
                selectedCategory === 'All'
                  ? 'bg-[#7A1C30] text-white'
                  : 'bg-[#FAF8F5] text-[#1C1917] hover:bg-[#E7E5E4]'
              }`}
            >
              All Outfits ({products.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`text-xs uppercase tracking-wider px-3.5 py-1.5 font-medium transition-colors ${
                  selectedCategory.toLowerCase() === cat.name.toLowerCase()
                    ? 'bg-[#7A1C30] text-white'
                    : 'bg-[#FAF8F5] text-[#1C1917] hover:bg-[#E7E5E4]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort & Search */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center">
              <ArrowUpDown size={14} className="absolute left-3 text-[#78716C]" />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="pl-8 pr-4 py-1.5 text-xs bg-[#FAF8F5] border border-[#E7E5E4] focus:outline-none focus:border-[#7A1C30] text-[#1C1917]"
              >
                <option value="latest">Sort: Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Secondary Filter Controls */}
        <div className="pt-3 border-t border-[#FAF8F5] flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            {/* Style Tag Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-[#78716C] uppercase text-[10px]">Style:</span>
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="bg-[#FAF8F5] border border-[#E7E5E4] px-2 py-1 focus:outline-none"
              >
                <option value="All">All Styles</option>
                {tagsList.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Size Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-[#78716C] uppercase text-[10px]">Size:</span>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="bg-[#FAF8F5] border border-[#E7E5E4] px-2 py-1 focus:outline-none"
              >
                <option value="All">All Sizes</option>
                {availableSizes.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Wishlist Toggle */}
            <button
              onClick={() => setWishlistOnly(!wishlistOnly)}
              className={`px-3 py-1 font-medium border transition-colors ${
                wishlistOnly
                  ? 'bg-[#7A1C30] text-white border-[#7A1C30]'
                  : 'bg-white text-[#1C1917] border-[#E7E5E4] hover:bg-[#FAF8F5]'
              }`}
            >
              {wishlistOnly ? 'Show All Products' : 'My Saved Wishlist'}
            </button>
          </div>

          {/* Active Filters Clear Button */}
          {(selectedCategory !== 'All' || selectedTag !== 'All' || selectedSize !== 'All' || searchQuery || wishlistOnly) && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedTag('All');
                setSelectedSize('All');
                setSearchQuery('');
                setWishlistOnly(false);
              }}
              className="text-[#7A1C30] hover:underline flex items-center gap-1 text-xs"
            >
              <X size={14} /> Clear Active Filters
            </button>
          )}
        </div>
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
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading Shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
