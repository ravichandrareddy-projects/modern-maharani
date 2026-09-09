import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getStoreData } from '@/lib/db';
import ProductCard from '@/components/ProductCard';
import { TAXONOMY_CATEGORIES } from '@/data/catalogData';
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryRootPage({ params }: PageProps) {
  const { slug } = await params;
  const store = getStoreData();

  // Find root category from taxonomy
  const rootCat = TAXONOMY_CATEGORIES.find(
    (c) => !c.parentSlug && c.slug.toLowerCase() === slug.toLowerCase()
  );

  if (!rootCat) {
    notFound();
  }

  // Find subcategories belonging to this root
  const subCats = TAXONOMY_CATEGORIES.filter(
    (c) => c.parentSlug && c.parentSlug.toLowerCase() === rootCat.slug.toLowerCase()
  );

  // Filter products belonging to this root category
  const products = (store.products || []).filter((p) => {
    const cats = (p.categories || []).map((c) => c.toLowerCase());
    return cats.includes(rootCat.slug.toLowerCase()) || cats.some((c) => c.includes(rootCat.slug.toLowerCase()));
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-[#78716C]">
        <Link href="/" className="hover:text-[#1C1917] font-medium">Home</Link>
        <ChevronRight size={12} />
        <Link href="/shop" className="hover:text-[#1C1917] font-medium">Catalog</Link>
        <ChevronRight size={12} />
        <span className="text-[#1C1917] font-bold">{rootCat.label}</span>
      </nav>

      {/* Hero Category Banner */}
      <div className="relative bg-[#1C1917] text-white p-8 sm:p-12 overflow-hidden luxury-card-shadow border border-[#E7E5E4]">
        <img
          src={rootCat.image}
          alt={rootCat.label}
          className="absolute inset-0 w-full h-full object-cover opacity-30 scale-105"
        />
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-[10px] uppercase tracking-[0.25em] text-amber-300 font-bold flex items-center gap-1">
            <Sparkles size={12} /> Modern Maharani Pillar
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            {rootCat.label}
          </h1>
          <p className="text-sm text-[#FAF8F5] font-light leading-relaxed">
            {rootCat.description}
          </p>
        </div>
      </div>

      {/* Subcategory Navigation Pills */}
      {subCats.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs uppercase font-bold text-[#1C1917] tracking-wider">
            Explore Subcategories in {rootCat.label}:
          </h3>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/category/${rootCat.slug}`}
              className="bg-[#7A1C30] text-white text-xs font-bold px-4 py-2 uppercase tracking-wider border border-[#7A1C30] shadow-sm"
            >
              All {rootCat.label}
            </Link>
            {subCats.map((sub) => (
              <Link
                key={sub.id}
                href={`/category/${rootCat.slug}/${sub.slug}`}
                className="bg-white hover:bg-brand hover:text-white text-[#1C1917] text-xs font-semibold px-4 py-2 border border-[#E7E5E4] transition-all shadow-sm flex items-center gap-1.5"
              >
                <span>{sub.label}</span>
                <ArrowRight size={12} />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Featured Card Banner if exists */}
      {rootCat.featuredCard && (
        <div className="p-6 bg-[#FAF8F5] border border-[#E7E5E4] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-widest text-[#7A1C30] font-bold">Showroom Spotlight</span>
            <h4 className="font-serif text-2xl font-bold text-[#1C1917]">{rootCat.featuredCard.title}</h4>
            <p className="text-xs text-[#78716C]">{rootCat.featuredCard.description}</p>
          </div>
          <Link
            href="/shop"
            className="bg-[#1C1917] text-white text-xs uppercase tracking-widest px-6 py-3 font-bold shrink-0 hover:bg-[#7A1C30] transition-colors"
          >
            Explore All Outfits →
          </Link>
        </div>
      )}

      {/* Outfits Grid */}
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b border-[#E7E5E4] pb-3">
          <h2 className="font-serif text-2xl font-bold text-[#1C1917]">
            Available Outfits ({products.length})
          </h2>
          <Link href="/shop" className="text-xs uppercase text-[#7A1C30] font-bold hover:underline">
            View Complete Catalog →
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16 bg-white border border-[#E7E5E4] p-8">
            <p className="text-base text-[#1C1917] font-serif">No products currently available in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
