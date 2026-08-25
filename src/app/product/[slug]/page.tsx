import React from 'react';
import { notFound } from 'next/navigation';
import { getStoreData } from '@/lib/db';
import ProductDetailClient from './ProductDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const store = getStoreData();
  const product = store.products.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = store.products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <ProductDetailClient
      product={product}
      relatedProducts={relatedProducts}
      storeInfo={store.storeInfo}
    />
  );
}
