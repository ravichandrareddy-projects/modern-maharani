'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, MessageCircle, Eye, Sparkles } from 'lucide-react';
import { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  onEnquire?: (product: Product) => void;
}

export default function ProductCard({ product, onEnquire }: ProductCardProps) {
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

  const handleWhatsAppQuickEnquire = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Log lead analytics
    try {
      fetch('/api/whatsapp-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: product.name,
          productSlug: product.slug,
          sourcePage: typeof window !== 'undefined' ? window.location.pathname : 'Shop',
          ctaClicked: 'Product Card WhatsApp Quick CTA'
        })
      });
    } catch (err) {}

    const text = encodeURIComponent(
      `Hi Modern Maharani, I'm interested in "${product.name}". Could you please share the availability, sizes and price details for this item?`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  // Availability Badge Color mapping
  const getAvailabilityBadge = () => {
    switch (product.availability) {
      case 'Available':
        return <span className="bg-emerald-700/90 text-white text-[9px] uppercase tracking-widest px-2 py-0.5 font-medium">In Store</span>;
      case 'Limited Stock':
        return <span className="bg-amber-700/90 text-white text-[9px] uppercase tracking-widest px-2 py-0.5 font-medium">Limited Stock</span>;
      case 'Out of Stock':
        return <span className="bg-stone-600/90 text-white text-[9px] uppercase tracking-widest px-2 py-0.5 font-medium">Out of Stock</span>;
      case 'Coming Soon':
        return <span className="bg-purple-800/90 text-white text-[9px] uppercase tracking-widest px-2 py-0.5 font-medium">Coming Soon</span>;
      case 'Check Availability':
      default:
        return <span className="bg-[#7A1C30]/90 text-white text-[9px] uppercase tracking-widest px-2 py-0.5 font-medium">Check Availability</span>;
    }
  };

  return (
    <div className="group bg-white border border-[#E7E5E4] luxury-card-shadow flex flex-col justify-between h-full relative transition-all duration-300">
      <div>
        {/* Image Container with Badges */}
        <div className="relative aspect-[3/4] bg-[#FAF8F5] overflow-hidden image-zoom-container">
          <Link href={`/product/${product.slug}`}>
            <img
              src={currentImg}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-700"
              onMouseEnter={() => {
                if (product.images[1]) setCurrentImg(product.images[1]);
              }}
              onMouseLeave={() => setCurrentImg(product.images[0] || '/images/hero_banner.jpg')}
            />
          </Link>

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
            className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
              isWishlisted
                ? 'bg-[#7A1C30] text-white'
                : 'bg-white/80 text-[#1C1917] hover:bg-white hover:text-[#7A1C30]'
            }`}
            aria-label="Add to Wishlist"
          >
            <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>

          {/* Hover Action Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <Link
              href={`/product/${product.slug}`}
              className="bg-white/90 hover:bg-white text-[#1C1917] text-[11px] uppercase tracking-wider px-3 py-2 font-medium flex items-center gap-1.5 transition-colors"
            >
              <Eye size={14} /> Quick View
            </Link>
            <button
              onClick={handleWhatsAppQuickEnquire}
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white text-[11px] uppercase tracking-wider px-3 py-2 font-medium flex items-center gap-1.5 transition-colors"
            >
              <MessageCircle size={14} /> Enquire
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-[#78716C] uppercase tracking-wider">
            <span>{product.category}</span>
            {product.fabric && <span>{product.fabric}</span>}
          </div>

          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="font-serif text-base font-medium text-[#1C1917] group-hover:text-[#7A1C30] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Pricing Display */}
          <div className="flex items-baseline space-x-2 pt-1">
            {product.price ? (
              <>
                {product.salePrice ? (
                  <>
                    <span className="font-semibold text-sm text-[#7A1C30]">₹{product.salePrice.toLocaleString('en-IN')}</span>
                    <span className="text-xs text-[#78716C] line-through">₹{product.price.toLocaleString('en-IN')}</span>
                  </>
                ) : (
                  <span className="font-semibold text-sm text-[#1C1917]">₹{product.price.toLocaleString('en-IN')}</span>
                )}
              </>
            ) : (
              <span className="text-xs text-[#78716C] italic">Price on Enquiry</span>
            )}
          </div>

          {/* Available Sizes preview */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex items-center gap-1 pt-1">
              <span className="text-[10px] uppercase text-[#78716C]">Sizes:</span>
              <div className="flex flex-wrap gap-1">
                {product.sizes.map((s) => (
                  <span key={s} className="text-[10px] bg-[#FAF8F5] border border-[#E7E5E4] px-1.5 py-0.5 text-[#1C1917]">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Card Action CTA */}
      <div className="px-4 pb-4 pt-1">
        <button
          onClick={handleWhatsAppQuickEnquire}
          className="w-full border border-[#7A1C30] text-[#7A1C30] hover:bg-[#7A1C30] hover:text-white transition-colors text-xs uppercase tracking-widest py-2 font-medium flex items-center justify-center gap-2"
        >
          <MessageCircle size={14} /> Enquire on WhatsApp
        </button>
      </div>
    </div>
  );
}
