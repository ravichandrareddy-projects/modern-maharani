'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Eye, Sparkles } from 'lucide-react';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/cartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImg, setCurrentImg] = useState(product.images[0] || '/images/hero_banner.jpg');

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mm_wishlist') || '[]');
      setIsWishlisted(saved.includes(product.id));
    } catch (e) {}
  }, [product.id]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const saved = JSON.parse(localStorage.getItem('mm_wishlist') || '[]');
      let updated: string[];
      if (saved.includes(product.id)) {
        updated = saved.filter((id: string) => id !== product.id);
        setIsWishlisted(false);
      } else {
        updated = [...saved, product.id];
        setIsWishlisted(true);
      }
      localStorage.setItem('mm_wishlist', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
    } catch (err) {}
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'Standard';
    const priceToUse = product.salePrice || product.price || 0;

    addToCart({
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      image: currentImg,
      selectedSize: defaultSize,
      price: priceToUse,
      quantity: 1
    });
  };

  // Availability Badge Color mapping
  const getAvailabilityBadge = () => {
    switch (product.availability) {
      case 'Available':
        return <span className="bg-emerald-700/90 text-white text-[9px] uppercase tracking-widest px-2 py-0.5 font-semibold">In Store</span>;
      case 'Limited Stock':
        return <span className="bg-amber-700/90 text-white text-[9px] uppercase tracking-widest px-2 py-0.5 font-semibold">Limited Stock</span>;
      case 'Out of Stock':
        return <span className="bg-stone-600/90 text-white text-[9px] uppercase tracking-widest px-2 py-0.5 font-semibold">Out of Stock</span>;
      case 'Coming Soon':
        return <span className="bg-purple-800/90 text-white text-[9px] uppercase tracking-widest px-2 py-0.5 font-semibold">Coming Soon</span>;
      case 'Check Availability':
      default:
        return <span className="bg-[#7A1C30]/90 text-white text-[9px] uppercase tracking-widest px-2 py-0.5 font-semibold">Available</span>;
    }
  };

  return (
    <div className="group bg-white border border-[#E7E5E4] luxury-card-shadow flex flex-col justify-between h-full relative transition-all duration-300 hover:border-brand hover:shadow-xl cursor-pointer">
      <Link href={`/product/${product.slug}`} className="block flex-1 flex flex-col justify-between">
        <div>
          {/* Image Container */}
          <div className="relative aspect-[3/4] bg-[#FAF8F5] overflow-hidden image-zoom-container">
            <img
              src={currentImg}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105"
              onMouseEnter={() => {
                if (product.images[1]) setCurrentImg(product.images[1]);
              }}
              onMouseLeave={() => setCurrentImg(product.images[0] || '/images/hero_banner.jpg')}
            />

            {/* Badges Container */}
            <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
              {product.isNewArrival && (
                <span className="bg-[#1C1917] text-white text-[9px] uppercase tracking-widest px-2.5 py-0.5 font-semibold flex items-center gap-1 shadow-sm">
                  <Sparkles size={10} /> New Arrival
                </span>
              )}
              {product.isFeatured && (
                <span className="bg-[#7A1C30] text-white text-[9px] uppercase tracking-widest px-2.5 py-0.5 font-semibold shadow-sm">
                  Featured
                </span>
              )}
              <div>{getAvailabilityBadge()}</div>
            </div>

            {/* Wishlist Button */}
            <button
              onClick={toggleWishlist}
              className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all z-20 ${
                isWishlisted
                  ? 'bg-[#7A1C30] text-white'
                  : 'bg-white/80 text-[#1C1917] hover:bg-white hover:text-[#7A1C30]'
              }`}
              aria-label="Add to Wishlist"
            >
              <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>

            {/* Quick Hover Banner */}
            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between gap-2 z-10">
              <span className="text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                <Eye size={14} /> View Details
              </span>
              <button
                onClick={handleAddToCart}
                className="bg-[#7A1C30] hover:bg-[#5F1524] text-white text-[10px] uppercase tracking-wider px-3 py-1.5 font-bold flex items-center gap-1 transition-colors"
              >
                <ShoppingBag size={12} /> Add to Cart
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-[#78716C] uppercase tracking-wider font-medium">
              <span className="truncate max-w-[140px]">{product.categories?.[0] || 'Catalog'}</span>
              {product.fabric && <span className="bg-[#FAF8F5] border border-[#E7E5E4] px-1.5 py-0.5 text-[10px] text-[#1C1917]">{product.fabric}</span>}
            </div>

            <h3 className="font-serif text-base font-bold text-[#1C1917] group-hover:text-[#7A1C30] transition-colors line-clamp-1">
              {product.name}
            </h3>

            {/* Pricing */}
            <div className="flex items-baseline space-x-2 pt-1">
              {product.price ? (
                <>
                  {product.salePrice ? (
                    <>
                      <span className="font-bold text-base text-[#7A1C30]">₹{product.salePrice.toLocaleString('en-IN')}</span>
                      <span className="text-xs text-[#78716C] line-through">₹{product.price.toLocaleString('en-IN')}</span>
                    </>
                  ) : (
                    <span className="font-bold text-base text-[#1C1917]">₹{product.price.toLocaleString('en-IN')}</span>
                  )}
                </>
              ) : (
                <span className="text-xs text-[#78716C] italic">Price on Request</span>
              )}
            </div>

            {/* Inclusions summary if available */}
            {product.inclusions && (
              <p className="text-[11px] text-[#78716C] line-clamp-1 italic">
                {product.inclusions}
              </p>
            )}

            {/* Sizes Badges preview */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-1">
                {product.sizes.map((sz) => (
                  <span key={sz} className="text-[9px] font-bold bg-[#FAF8F5] border border-[#E7E5E4] text-[#1C1917] px-1.5 py-0.5 uppercase">
                    {sz}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Primary Card Action CTA */}
        <div className="px-4 pb-4 pt-1 flex items-center justify-between border-t border-[#F5F5F4]">
          <span className="text-[10px] text-[#7A1C30] font-bold uppercase tracking-wider group-hover:underline">
            View Details →
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-[#7A1C30] hover:bg-[#5F1524] text-white text-[10px] uppercase tracking-wider px-3 py-1.5 font-bold flex items-center gap-1 transition-colors"
          >
            <ShoppingBag size={12} /> Add
          </button>
        </div>
      </Link>
    </div>
  );
}
