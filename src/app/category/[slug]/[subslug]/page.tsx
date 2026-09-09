import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getStoreData } from '@/lib/db';
import ProductCard from '@/components/ProductCard';
import { TAXONOMY_CATEGORIES } from '@/data/catalogData';
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface SubPageProps {
  params: Promise<{ slug: string; subslug: string }>;
}

export default async function CategorySubPage({ params }: SubPageProps) {
  const { slug, subslug } = await params;
  const store = getStoreData();

  // Find root category
  const rootCat = TAXONOMY_CATEGORIES.find(
    (c) => !c.parentSlug && c.slug.toLowerCase() === slug.toLowerCase()
  );

  // Find subcategory
  const subCat = TAXONOMY_CATEGORIES.find(
    (c) => c.parentSlug && c.slug.toLowerCase() === subslug.toLowerCase()
  );

  if (!rootCat || !subCat) {
    notFound();
  }

  // Filter products belonging to this subcategory
  const products = (store.products || []).filter((p) => {
    const cats = (p.categories || []).map((c) => c.toLowerCase());
    return cats.includes(subCat.slug.toLowerCase()) || cats.some((c) => c.includes(subCat.slug.toLowerCase()));
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-[#78716C]">
        <Link href="/" className="hover:text-[#1C1917] font-medium">Home</Link>
        <ChevronRight size={12} />
        <Link href={`/category/${rootCat.slug}`} className="hover:text-[#1C1917] font-medium">{rootCat.label}</Link>
        <ChevronRight size={12} />
        <span className="text-[#1C1917] font-bold">{subCat.label}</span>
      </nav>

      {/* Subcategory Banner */}
      <div className="bg-white p-8 sm:p-10 border border-[#E7E5E4] luxury-card-shadow space-y-3">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#7A1C30] font-bold">
          <Sparkles size={14} /> Subcategory Selection
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917]">
          {subCat.label}
        </h1>
        <p className="text-xs sm:text-sm text-[#78716C] max-w-xl font-light">
          {subCat.description}
        </p>
      </div>

      {/* Outfits Grid */}
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b border-[#E7E5E4] pb-3">
          <h2 className="font-serif text-2xl font-bold text-[#1C1917]">
            Available Outfits in {subCat.label} ({products.length})
          </h2>
          <Link href={`/category/${rootCat.slug}`} className="text-xs uppercase text-[#7A1C30] font-bold hover:underline">
            Back to {rootCat.label} →
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16 bg-white border border-[#E7E5E4] p-8">
            <p className="text-base text-[#1C1917] font-serif">No products currently listed under this subcategory.</p>
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
