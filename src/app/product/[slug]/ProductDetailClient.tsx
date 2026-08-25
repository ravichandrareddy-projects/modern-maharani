'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { Product, StoreInfo } from '@/lib/types';
import {
  MessageCircle,
  MapPin,
  Share2,
  Heart,
  CheckCircle,
  Clock,
  Sparkles,
  ArrowLeft,
  X,
  Send,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';

interface ClientProps {
  product: Product;
  relatedProducts: Product[];
  storeInfo: StoreInfo;
}

export default function ProductDetailClient({ product, relatedProducts, storeInfo }: ClientProps) {
  const [selectedImage, setSelectedImage] = useState(product.images[0] || '/images/hero_banner.jpg');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  // Enquiry Form State inside Modal
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custMessage, setCustMessage] = useState(
    `Hi, I would like to check availability and details for "${product.name}" in size ${selectedSize || 'Standard'}.`
  );
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

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

  const handleWhatsAppEnquire = () => {
    // Record lead in DB
    try {
      fetch('/api/whatsapp-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: product.name,
          productSlug: product.slug,
          sourcePage: 'Product Detail',
          ctaClicked: 'Enquire on WhatsApp Button'
        })
      });
    } catch (e) {}

    const text = encodeURIComponent(
      `Hi Modern Maharani, I'm interested in ${product.name}. Could you please share the availability, sizes and price?`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName.trim() || !custPhone.trim()) return;

    setFormSubmitting(true);
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: custName,
          phone: custPhone,
          productName: product.name,
          productSlug: product.slug,
          categoryInterested: product.category,
          message: custMessage
        })
      });

      const data = await res.json();
      if (data.success) {
        setFormSuccess(true);
        setTimeout(() => {
          setEnquiryModalOpen(false);
          setFormSuccess(false);
        }, 2500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFormSubmitting(false);
    }
  };

  // Availability badge mapping
  const getBadgeClass = () => {
    switch (product.availability) {
      case 'Available': return 'bg-emerald-700 text-white';
      case 'Limited Stock': return 'bg-amber-700 text-white';
      case 'Out of Stock': return 'bg-stone-600 text-white';
      case 'Coming Soon': return 'bg-purple-800 text-white';
      case 'Check Availability':
      default: return 'bg-[#7A1C30] text-white';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center space-x-2 text-xs text-[#78716C]">
        <Link href="/" className="hover:text-[#1C1917]">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-[#1C1917]">Shop</Link>
        <span>/</span>
        <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-[#1C1917]">{product.category}</Link>
        <span>/</span>
        <span className="text-[#1C1917] font-medium truncate max-w-[200px]">{product.name}</span>
      </div>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-[3/4] bg-[#FAF8F5] border border-[#E7E5E4] overflow-hidden luxury-card-shadow">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-500"
            />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className={`text-[10px] uppercase tracking-widest px-3 py-1 font-semibold ${getBadgeClass()}`}>
                {product.availability}
              </span>
              {product.isNewArrival && (
                <span className="bg-[#1C1917] text-white text-[10px] uppercase tracking-widest px-3 py-1 font-semibold flex items-center gap-1">
                  <Sparkles size={11} /> New Arrival
                </span>
              )}
            </div>
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 aspect-[3/4] border-2 overflow-hidden transition-all shrink-0 ${
                    selectedImage === img ? 'border-[#7A1C30]' : 'border-[#E7E5E4] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Product Details & Conversion Actions */}
        <div className="space-y-8">
          <div className="space-y-3 pb-6 border-b border-[#E7E5E4]">
            <div className="flex items-center justify-between text-xs text-[#78716C] uppercase tracking-widest font-semibold">
              <span>{product.category}</span>
              {product.fabric && <span className="bg-[#FAF8F5] border border-[#E7E5E4] px-2 py-0.5">{product.fabric}</span>}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] leading-tight">
              {product.name}
            </h1>

            {/* Pricing Display */}
            <div className="flex items-baseline space-x-3 pt-2">
              {product.price ? (
                <>
                  {product.salePrice ? (
                    <>
                      <span className="font-bold text-2xl text-[#7A1C30]">₹{product.salePrice.toLocaleString('en-IN')}</span>
                      <span className="text-base text-[#78716C] line-through">₹{product.price.toLocaleString('en-IN')}</span>
                      <span className="text-xs text-emerald-700 bg-emerald-50 font-semibold px-2 py-0.5 border border-emerald-200">
                        Special Showroom Price
                      </span>
                    </>
                  ) : (
                    <span className="font-bold text-2xl text-[#1C1917]">₹{product.price.toLocaleString('en-IN')}</span>
                  )}
                </>
              ) : (
                <span className="text-base text-[#7A1C30] font-semibold italic">Enquire for Price</span>
              )}
            </div>
          </div>

          {/* Sizing & Colors */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-wider text-[#1C1917] font-semibold block">
                Select Available Size:
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

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-wider text-[#1C1917] font-semibold">About This Outfit:</h4>
            <p className="text-sm text-[#78716C] font-light leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* CORE CONVERSION BUTTONS */}
          <div className="space-y-3 pt-4 border-t border-[#E7E5E4]">
            {/* Primary Action 1: Enquire on WhatsApp */}
            <button
              onClick={handleWhatsAppEnquire}
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs uppercase tracking-widest py-4 font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <MessageCircle size={18} /> Enquire on WhatsApp
            </button>

            {/* Action 2 & 3: Check Availability Modal & Visit Store */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setEnquiryModalOpen(true)}
                className="w-full bg-[#7A1C30] hover:bg-[#5F1524] text-white text-xs uppercase tracking-widest py-3.5 font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle size={16} /> Check Availability
              </button>

              <Link
                href="/visit-us"
                className="w-full border border-[#1C1917] text-[#1C1917] hover:bg-[#1C1917] hover:text-white text-xs uppercase tracking-widest py-3.5 font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <MapPin size={16} /> Visit Store KPHB
              </Link>
            </div>

            {/* Utility Actions: Wishlist & Share */}
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
                <span>{copiedLink ? 'Link Copied!' : 'Share Product'}</span>
              </button>
            </div>
          </div>

          {/* Showroom Visit Info Box */}
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
            <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="text-xs uppercase tracking-widest text-[#7A1C30]">
              View All {product.category}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}

      {/* CHECK AVAILABILITY ENQUIRY MODAL */}
      {enquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setEnquiryModalOpen(false)} />

          <div className="relative bg-white max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E7E5E4] z-10 space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4]">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#1C1917]">Check Availability</h3>
                <p className="text-xs text-[#78716C]">Enquire directly with Modern Maharani showroom team</p>
              </div>
              <button onClick={() => setEnquiryModalOpen(false)} className="text-[#78716C] hover:text-[#1C1917] p-1">
                <X size={20} />
              </button>
            </div>

            {formSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 text-center space-y-2">
                <CheckCircle size={32} className="mx-auto text-emerald-600" />
                <h4 className="font-serif text-xl font-bold">Enquiry Received!</h4>
                <p className="text-xs">Our KPHB showroom team will contact you on WhatsApp/phone shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={custName}
                    onChange={(e) => setCustName(e.target.value)}
                    className="w-full text-xs p-3 bg-[#FAF8F5] border border-[#E7E5E4] focus:outline-none focus:border-[#7A1C30]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={custPhone}
                    onChange={(e) => setCustPhone(e.target.value)}
                    className="w-full text-xs p-3 bg-[#FAF8F5] border border-[#E7E5E4] focus:outline-none focus:border-[#7A1C30]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-1">
                    Enquiry Message
                  </label>
                  <textarea
                    rows={3}
                    value={custMessage}
                    onChange={(e) => setCustMessage(e.target.value)}
                    className="w-full text-xs p-3 bg-[#FAF8F5] border border-[#E7E5E4] focus:outline-none focus:border-[#7A1C30] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="w-full bg-[#7A1C30] hover:bg-[#5F1524] text-white text-xs uppercase tracking-widest py-3.5 font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={15} /> {formSubmitting ? 'Sending...' : 'Submit Enquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
