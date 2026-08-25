import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getStoreData } from '@/lib/db';
import ProductCard from '@/components/ProductCard';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CollectionDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const store = getStoreData();
  const collection = store.collections.find((c) => c.slug === resolvedParams.slug);

  if (!collection) {
    notFound();
  }

  const productsInCollection = store.products.filter(
    (p) => p.collectionSlug === collection.slug
  );

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Banner */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-[#1C1917] text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 scale-105"
          style={{ backgroundImage: `url('${collection.heroImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-black/40 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-4 py-16">
          <Link
            href="/collections"
            className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-[#E2D4C3] hover:text-white mb-2 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Collections
          </Link>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white">
            {collection.title}
          </h1>
          <p className="text-sm sm:text-base text-[#E7E5E4] font-light max-w-xl mx-auto leading-relaxed">
            {collection.description}
          </p>
        </div>
      </section>

      {/* Outfits Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between border-b border-[#E7E5E4] pb-4">
          <span className="text-xs uppercase tracking-widest text-[#7A1C30] font-semibold">
            {productsInCollection.length} Outfits in {collection.title}
          </span>
          <Link href="/shop" className="text-xs uppercase tracking-widest text-[#1C1917] hover:text-[#7A1C30]">
            Browse Entire Catalogue
          </Link>
        </div>

        {productsInCollection.length === 0 ? (
          <div className="text-center py-16 text-[#78716C] bg-white border border-[#E7E5E4] p-8">
            No products currently linked to this collection edit. Visit our main shop page to see all items!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productsInCollection.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
