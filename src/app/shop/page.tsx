'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { Product, Category } from '@/lib/types';
import { Search, Filter, SlidersHorizontal, ArrowUpDown, X, Sparkles, Check, RefreshCw } from 'lucide-react';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialTag = searchParams.get('tag') || 'All';
  const initialQuery = searchParams.get('query') || '';
  const initialWishlistOnly = searchParams.get('wishlist') === 'true';

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All');
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

  // Root categories (!parentSlug)
  const rootCategories = categories.filter((c) => !c.parentSlug);

  // Active root category object (if selectedCategory matches a root category)
  const activeRootCat = rootCategories.find(
    (c) => c.slug.toLowerCase() === selectedCategory.toLowerCase() || c.name.toLowerCase() === selectedCategory.toLowerCase()
  );

  // Subcategories of active root category
  const activeSubCats = activeRootCat
    ? categories.filter((c) => c.parentSlug === activeRootCat.slug)
    : [];

  // Filter products
  const filteredProducts = products.filter((product) => {
    const prodCats = (product.categories || []).map((c) => c.toLowerCase());

    // Subcategory match if set
    if (selectedSubCategory !== 'All') {
      const subTarget = selectedSubCategory.toLowerCase();
      const matchesSub = prodCats.some((c) => c === subTarget || c.includes(subTarget) || subTarget.includes(c));
      if (!matchesSub) return false;
    }

    // Main category match
    if (selectedCategory !== 'All') {
      const target = selectedCategory.toLowerCase();
      const matchesCategory = prodCats.some(
        (c) => c === target || c.includes(target) || target.includes(c)
      );
      if (!matchesCategory) return false;
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

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const nameMatch = product.name.toLowerCase().includes(q);
      const catMatch = product.categories?.some((c) => c.toLowerCase().includes(q));
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
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const availableSizes = ['S', 'M', 'L', 'XL', 'XXL', '3XL', 'Unstitched'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2 pb-4 border-b border-[#E7E5E4]">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#7A1C30] font-bold">Modern Maharani Catalog</span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1917]">Digital Showroom</h1>
        <p className="text-xs sm:text-sm text-[#78716C] max-w-xl mx-auto font-light">
          Tap any outfit image to explore full product details, zoom fabrics, or order directly via WhatsApp.
        </p>
      </div>

      {/* 1. HORIZONTAL SIDE-BY-SIDE SCROLLING MAIN CATEGORY TABS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase font-bold text-[#1C1917] tracking-wider">Select Category Pillar:</span>
          {selectedCategory !== 'All' && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedSubCategory('All');
              }}
              aria-label="Clear Category Filters"
              className="text-[11px] text-[#7A1C30] font-bold hover:underline uppercase flex items-center gap-1"
            >
              <RefreshCw size={11} /> Reset Category
            </button>
          )}
        </div>

        {/* Level 1: Primary Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar scroll-smooth border-b border-[#E7E5E4]">
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedSubCategory('All');
            }}
            className={`px-5 py-3 text-xs uppercase font-bold tracking-wider whitespace-nowrap transition-all border shrink-0 ${
              selectedCategory === 'All'
                ? 'bg-[#7A1C30] text-white border-[#7A1C30] shadow-md'
                : 'bg-white text-[#1C1917] border-[#E7E5E4] hover:border-[#1C1917]'
            }`}
          >
            All Catalog Items ({products.length})
          </button>

          {rootCategories.map((cat) => {
            const isSelected =
              selectedCategory.toLowerCase() === cat.slug.toLowerCase() ||
              selectedCategory.toLowerCase() === cat.name.toLowerCase();

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.slug);
                  setSelectedSubCategory('All');
                }}
                className={`px-5 py-3 text-xs uppercase font-bold tracking-wider whitespace-nowrap transition-all border shrink-0 flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#7A1C30] text-white border-[#7A1C30] shadow-md'
                    : 'bg-white text-[#1C1917] border-[#E7E5E4] hover:border-[#1C1917] hover:bg-[#FAF8F5]'
                }`}
              >
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Level 2: Subcategory Side-by-Side Pills Bar (Appears when active root category has sub-items) */}
        {activeSubCats.length > 0 && (
          <div className="p-3 bg-[#FAF8F5] border border-[#E7E5E4] space-y-2 animate-fadeIn">
            <span className="text-[10px] uppercase font-bold text-[#78716C] tracking-wider block">
              Sub-types in {activeRootCat?.name}:
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
              <button
                onClick={() => setSelectedSubCategory('All')}
                className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider whitespace-nowrap border shrink-0 transition-colors ${
                  selectedSubCategory === 'All'
                    ? 'bg-[#1C1917] text-white border-[#1C1917]'
                    : 'bg-white text-[#1C1917] border-[#E7E5E4] hover:border-[#1C1917]'
                }`}
              >
                All {activeRootCat?.name}
              </button>

              {activeSubCats.map((sub) => {
                const isSubActive =
                  selectedSubCategory.toLowerCase() === sub.slug.toLowerCase() ||
                  selectedSubCategory.toLowerCase() === sub.name.toLowerCase();

                return (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubCategory(sub.slug)}
                    className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider whitespace-nowrap border shrink-0 transition-colors ${
                      isSubActive
                        ? 'bg-[#1C1917] text-white border-[#1C1917]'
                        : 'bg-white text-[#78716C] hover:text-[#1C1917] border-[#E7E5E4]'
                    }`}
                  >
                    {sub.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 2. FILTER & SORT TOOLBAR */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-white border border-[#E7E5E4] shadow-sm">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#78716C]" />
          <input
            type="text"
            placeholder="Search outfits by name, fabric, cut..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs bg-[#FAF8F5] border border-[#E7E5E4] pl-9 pr-3 py-2.5 focus:outline-none focus:border-[#7A1C30]"
          />
        </div>

        {/* Sizes Pills Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full no-scrollbar py-1">
          <span className="text-[10px] font-bold uppercase text-[#1C1917] shrink-0 mr-1">Size:</span>
          <button
            onClick={() => setSelectedSize('All')}
            className={`px-2.5 py-1 text-[10px] uppercase font-bold border shrink-0 ${
              selectedSize === 'All' ? 'bg-[#7A1C30] text-white border-[#7A1C30]' : 'bg-white text-[#1C1917] border-[#E7E5E4]'
            }`}
          >
            All Sizes
          </button>
          {availableSizes.map((sz) => (
            <button
              key={sz}
              onClick={() => setSelectedSize(sz)}
              className={`px-2.5 py-1 text-[10px] uppercase font-bold border shrink-0 ${
                selectedSize === sz ? 'bg-[#7A1C30] text-white border-[#7A1C30]' : 'bg-white text-[#1C1917] border-[#E7E5E4]'
              }`}
            >
              {sz}
            </button>
          ))}
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-end">
          <span className="text-xs text-[#78716C] font-semibold">{sortedProducts.length} Outfits</span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            aria-label="Sort options"
            className="py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E7E5E4] focus:outline-none focus:border-[#7A1C30]"
          >
            <option value="latest">Newest Outfits First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* 3. FULL-WIDTH ZOOMED PRODUCT GRID */}
      {loading ? (
        <div className="text-center py-20 text-[#78716C] text-xs uppercase tracking-widest font-bold">
          Loading Showroom Outfits...
        </div>
      ) : sortedProducts.length === 0 ? (
        <div className="text-center py-20 bg-white border border-[#E7E5E4] p-8 space-y-4 max-w-lg mx-auto">
          <p className="text-lg text-[#1C1917] font-serif font-bold">No outfits match your chosen category or search.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedSubCategory('All');
              setSelectedSize('All');
              setSearchQuery('');
            }}
            className="bg-[#7A1C30] text-white text-xs uppercase tracking-widest px-6 py-3 font-bold"
          >
            Reset All Filters & View Full Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
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
    <Suspense fallback={<div className="text-center py-20 text-xs font-bold uppercase tracking-widest text-[#78716C]">Loading Catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
