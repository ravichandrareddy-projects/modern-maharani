'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { Product, StoreInfo } from '@/lib/types';
import { useCart } from '@/lib/cartContext';
import CheckoutModal from '@/components/CheckoutModal';
import {
  ShoppingBag,
  MessageCircle,
  MapPin,
  Share2,
  Heart,
  CheckCircle,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface ClientProps {
  product: Product;
  relatedProducts: Product[];
  storeInfo: StoreInfo;
}

export default function ProductDetailClient({ product, relatedProducts, storeInfo }: ClientProps) {
  const { addToCart, setIsCartOpen } = useCart();
  const [selectedImage, setSelectedImage] = useState(product.images[0] || '/images/hero_banner.jpg');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mm_wishlist') || '[]');
      setIsWishlisted(saved.includes(product.id));
    } catch (e) {}
  }, [product.id]);

  const toggleWishlist = () => {
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

  const handleAddToCartAction = () => {
    const priceToUse = product.salePrice || product.price || 0;
    addToCart({
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      image: selectedImage,
      selectedSize,
      price: priceToUse,
      quantity: 1
    });
  };

  const handleBuyNowAction = () => {
    handleAddToCartAction();
    setCheckoutModalOpen(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} at Modern Maharani KPHB Kukatpally!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs text-[#78716C]">
        <Link href="/" className="hover:text-[#1C1917]">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-[#1C1917]">Shop</Link>
        <span>/</span>
        <Link href={`/shop?category=${encodeURIComponent(product.categories?.[0] || 'Uncategorized')}`} className="hover:text-[#1C1917]">{product.categories?.[0] || 'Uncategorized'}</Link>
        <span>/</span>
        <span className="text-[#1C1917] font-medium truncate max-w-[200px]">{product.name}</span>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Gallery */}
        <div className="flex flex-col-reverse lg:flex-row gap-4">
          {/* Vertical Thumbnails Desktop / Swipeable Mobile */}
          {product.images && product.images.length > 1 && (
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:max-h-[600px] pb-2 lg:pb-0 w-full lg:w-24 shrink-0 no-scrollbar">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 lg:w-full aspect-[3/4] border-2 overflow-hidden transition-all shrink-0 ${
                    selectedImage === img ? 'border-[#7A1C30]' : 'border-[#E7E5E4] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Main Image with Zoom placeholder */}
          <div className="relative aspect-[3/4] bg-[#FAF8F5] border border-[#E7E5E4] overflow-hidden luxury-card-shadow flex-1 group cursor-crosshair">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-150 origin-center"
            />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className="bg-[#7A1C30] text-white text-[10px] uppercase tracking-widest px-3 py-1 font-semibold">
                {product.availability}
              </span>
              {product.isNewArrival && (
                <span className="bg-[#1C1917] text-white text-[10px] uppercase tracking-widest px-3 py-1 font-semibold flex items-center gap-1">
                  <Sparkles size={11} /> New Arrival
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Details & Actions */}
        <div className="space-y-8">
          <div className="space-y-3 pb-6 border-b border-[#E7E5E4]">
            <div className="flex items-center justify-between text-xs text-[#78716C] uppercase tracking-widest font-semibold">
              <span>{product.categories?.[0] || 'Uncategorized'}</span>
              {product.fabric && <span className="bg-[#FAF8F5] border border-[#E7E5E4] px-2 py-0.5">{product.fabric}</span>}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline space-x-3 pt-2">
              {product.price ? (
                <>
                  {product.salePrice ? (
                    <>
                      <span className="font-bold text-2xl text-[#7A1C30]">₹{product.salePrice.toLocaleString('en-IN')}</span>
                      <span className="text-base text-[#78716C] line-through">₹{product.price.toLocaleString('en-IN')}</span>
                      <span className="text-xs text-emerald-700 bg-emerald-50 font-semibold px-2 py-0.5 border border-emerald-200">
                        Special Online Price
                      </span>
                    </>
                  ) : (
                    <span className="font-bold text-2xl text-[#1C1917]">₹{product.price.toLocaleString('en-IN')}</span>
                  )}
                </>
              ) : (
                <span className="text-base text-[#7A1C30] font-semibold">Contact Store</span>
              )}
            </div>
          </div>

          {/* Sizing */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-wider text-[#1C1917] font-semibold block">
                Select Size:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`min-w-[44px] h-10 border text-xs font-semibold uppercase tracking-wider flex items-center justify-center transition-all ${
                      selectedSize === s
                        ? 'bg-[#7A1C30] text-white border-[#7A1C30]'
                        : 'bg-white text-[#1C1917] border-[#E7E5E4] hover:border-[#1C1917]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Description & Inclusions */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#1C1917] font-semibold">About This Outfit:</h4>
            <p className="text-sm text-[#78716C] font-light leading-relaxed">
              {product.description}
            </p>
            {(product.inclusions || product.work) && (
              <div className="p-3 bg-[#FAF8F5] border border-[#E7E5E4] space-y-1.5 text-xs">
                {product.work && (
                  <div>
                    <span className="font-bold text-[#1C1917] uppercase tracking-wider text-[10px] block">Craft & Embroidery:</span>
                    <span className="text-[#78716C]">{product.work}</span>
                  </div>
                )}
                {product.inclusions && (
                  <div>
                    <span className="font-bold text-[#1C1917] uppercase tracking-wider text-[10px] block">Fabric Inclusions & Cut:</span>
                    <span className="text-[#78716C]">{product.inclusions}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Stock Alert */}
          {product.stock !== undefined && product.stock > 0 && product.stock <= 5 && (
            <div className="text-red-600 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
              <Clock size={14} /> Hurry! Only {product.stock} pieces left in stock
            </div>
          )}

          {/* E-COMMERCE SHOPPING CTAS */}
          <div className="space-y-3 pt-4 border-t border-[#E7E5E4]">
            {product.stock === 0 ? (
              <button
                className="w-full bg-[#E7E5E4] text-[#78716C] text-xs uppercase tracking-widest py-4 font-bold cursor-not-allowed flex items-center justify-center gap-2"
                disabled
              >
                Out of Stock / Notify Me
              </button>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCartAction}
                  className="w-full bg-[#1C1917] hover:bg-[#7A1C30] text-white text-xs uppercase tracking-widest py-4 font-bold transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={18} /> Add to Cart
                </button>

                <button
                  onClick={handleBuyNowAction}
                  className="w-full bg-[#7A1C30] hover:bg-[#5F1524] text-white text-xs uppercase tracking-widest py-4 font-bold transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <ArrowRight size={18} /> Buy Now
                </button>
              </div>
            )}
            
            <a
              href={`https://wa.me/${storeInfo.whatsappNumber}?text=${encodeURIComponent(`Hi Modern Maharani! I'm interested in ordering the "${product.name}" (${window.location.href}). Is it available?`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white text-xs uppercase tracking-widest py-3 font-bold transition-all flex items-center justify-center gap-2 mt-2 shadow-sm"
            >
              <MessageCircle size={18} /> Order via WhatsApp
            </a>

            {/* Wishlist & Share */}
            <div className="flex items-center justify-between pt-3 text-xs text-[#78716C]">
              <button
                onClick={toggleWishlist}
                className="flex items-center gap-1.5 hover:text-[#7A1C30] transition-colors"
              >
                <Heart size={16} fill={isWishlisted ? '#7A1C30' : 'none'} className={isWishlisted ? 'text-[#7A1C30]' : ''} />
                <span>{isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 hover:text-[#1C1917] transition-colors"
              >
                <Share2 size={16} />
                <span>{copiedLink ? 'Link Copied!' : 'Share Outfit'}</span>
              </button>
            </div>
          </div>

          {/* Showroom Visit Card */}
          <div className="bg-[#FAF8F5] border border-[#E7E5E4] p-4 space-y-2 text-xs text-[#78716C]">
            <div className="flex items-center gap-2 text-[#1C1917] font-semibold">
              <MapPin size={15} className="text-[#7A1C30]" /> Modern Maharani Showroom Location
            </div>
            <p className="leading-relaxed">
              {storeInfo.addressLine}, {storeInfo.landmark}, {storeInfo.area}, {storeInfo.city}.
            </p>
            <p className="text-[11px] text-[#78716C] flex items-center gap-1 pt-1">
              <Clock size={13} /> Open Today: {storeInfo.openingHours}
            </p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-12 border-t border-[#E7E5E4]">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-[#1C1917]">You May Also Like</h2>
            <Link href={`/shop?category=${encodeURIComponent(product.categories?.[0] || 'Uncategorized')}`} className="text-xs uppercase tracking-widest text-[#7A1C30]">
              View All {product.categories?.[0] || 'Uncategorized'}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}

      <CheckoutModal isOpen={checkoutModalOpen} onClose={() => setCheckoutModalOpen(false)} />
    </div>
  );
}
