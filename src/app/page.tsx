import React from 'react';
import Link from 'next/link';
import { getStoreData } from '@/lib/db';
import ProductCard from '@/components/ProductCard';
import { MapPin, Phone, MessageCircle, Clock, ArrowRight, Star, Sparkles, CheckCircle2, ShoppingBag } from 'lucide-react';

export default async function HomePage() {
  const store = getStoreData();
  const { siteSettings, categories, collections, products, reviews, storeInfo, banners } = store;

  const heroImage = (banners && banners[0] && banners[0].image) ? banners[0].image : '/images/hero_banner.jpg';

  // Filter featured & new arrival products
  const featuredProducts = products.filter((p) => p.isFeatured || p.isNewArrival).slice(0, 4);
  const approvedReviews = reviews.filter((r) => r.approved);

  const discoveryTags = [
    { name: 'Elegant', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop' },
    { name: 'Minimal', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop' },
    { name: 'Festive', image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=600&auto=format&fit=crop' },
    { name: 'Contemporary', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=600&auto=format&fit=crop' },
    { name: 'Statement', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop' },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* 1. FULL-SCREEN LUXURY HERO SECTION */}
      <section className="relative min-h-[92vh] lg:min-h-[95vh] flex items-center justify-center bg-[#1C1917] text-white overflow-hidden">
        {/* Background Image with Crisp Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60 scale-105 transition-transform duration-1000"
          style={{ backgroundImage: `url('${heroImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/50 to-black/40" />

        {/* Hero Glassmorphic Card Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6 sm:space-y-8 py-20 sm:py-28 lg:py-36">
          <div className="inline-flex items-center gap-2 bg-brand/90 text-white text-[11px] sm:text-xs uppercase tracking-[0.25em] px-5 py-2 backdrop-blur-md shadow-lg border border-white/20">
            <Sparkles size={14} className="text-amber-300 animate-pulse" /> KPHB Phase 1 • Kukatpally • Hyderabad
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-tight drop-shadow-2xl">
            {siteSettings.heroHeadline || "Style That Feels Like You."}
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-[#FAF8F5] font-light max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            {siteSettings.heroSupportingText || "Explore contemporary women's fashion at Modern Maharani, KPHB."}
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto sm:max-w-none">
            <Link
              href="/shop"
              className="w-full sm:w-auto bg-brand hover:opacity-95 text-white text-xs sm:text-sm uppercase tracking-widest px-10 py-4 font-bold transition-all shadow-2xl flex items-center justify-center gap-2 border border-white/20"
            >
              <ShoppingBag size={18} /> {siteSettings.heroPrimaryCtaText || "Shop Collection"}
            </Link>
            <Link
              href="/visit-us"
              className="w-full sm:w-auto bg-white/90 hover:bg-white text-[#1C1917] text-xs sm:text-sm uppercase tracking-widest px-10 py-4 font-bold transition-all backdrop-blur-md shadow-2xl flex items-center justify-center gap-2"
            >
              <MapPin size={18} /> {siteSettings.heroSecondaryCtaText || "Visit Showroom"}
            </Link>
          </div>
        </div>
      </section>

      {/* 2. QUICK BRAND INTRO */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-4 pt-4">
        <h2 className="font-serif text-3xl sm:text-5xl text-[#1C1917]">
          {siteSettings.introHeading || "Modern Fashion. Your Style."}
        </h2>
        <div className="w-20 h-1 bg-brand mx-auto rounded-full" />
        <p className="text-base sm:text-xl text-[#78716C] font-light leading-relaxed">
          {siteSettings.introCopy || "Modern Maharani brings together contemporary women's fashion for women who want to feel confident, stylish and effortlessly themselves."}
        </p>
      </section>

      {/* 3. FEATURED CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E7E5E4] pb-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-brand font-bold">Curated Collections</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917]">Explore By Category</h2>
          </div>
          <Link href="/shop" className="text-xs uppercase tracking-widest text-[#1C1917] hover:text-brand font-bold flex items-center gap-1 mt-2 md:mt-0">
            View All Categories <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="group relative aspect-[3/4] bg-[#1C1917] overflow-hidden luxury-card-shadow block"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 space-y-2 text-white">
                <h3 className="font-serif text-2xl font-bold tracking-wide">{cat.name}</h3>
                <p className="text-xs text-[#E7E5E4] font-light line-clamp-2">{cat.description}</p>
                <div className="pt-2 text-xs uppercase tracking-widest font-bold text-white group-hover:text-amber-300 flex items-center gap-1 transition-colors">
                  Explore {cat.name} <ArrowRight size={13} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. JUST IN / FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E7E5E4] pb-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-brand font-bold">Fresh Showroom Racks</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917]">Just In — New Arrivals</h2>
          </div>
          <Link href="/new-arrivals" className="text-xs uppercase tracking-widest text-[#1C1917] hover:text-brand font-bold flex items-center gap-1 mt-2 md:mt-0">
            View All New Arrivals <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. FASHION DISCOVERY (FIND YOUR LOOK) */}
      <section className="bg-white border-y border-[#E7E5E4] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-brand font-bold">Style Filter</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917]">Find Your Look</h2>
            <p className="text-xs text-[#78716C] max-w-xl mx-auto">
              Filter outfits based on your personal style preference, mood, and occasion.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {discoveryTags.map((tag) => (
              <Link
                key={tag.name}
                href={`/shop?tag=${encodeURIComponent(tag.name)}`}
                className="group relative aspect-square overflow-hidden bg-[#1C1917] luxury-card-shadow block"
              >
                <img
                  src={tag.image}
                  alt={tag.name}
                  className="w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center p-3">
                  <span className="font-serif text-xl font-bold text-white tracking-wider border-b-2 border-transparent group-hover:border-white transition-all">
                    {tag.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PHYSICAL SHOWROOM LOCATION HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1C1917] text-white p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#E2D4C3] font-bold flex items-center gap-2">
              <MapPin size={14} className="text-brand" /> KPHB Phase 1 • Kukatpally Showroom
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
              {siteSettings.storeSectionHeading || "Come See It. Feel It. Try It."}
            </h2>
            <p className="text-sm sm:text-base text-[#D6D3D1] font-light leading-relaxed">
              {siteSettings.storeSectionCopy || "Some outfits just look better when you see them in person. Visit Modern Maharani at KPHB and explore the collection for yourself."}
            </p>

            <div className="p-4 bg-[#292524] border border-[#44403C] space-y-2 text-xs text-[#E7E5E4]">
              <p className="font-semibold text-white">Showroom Address:</p>
              <p>{storeInfo.addressLine}, {storeInfo.landmark}, {storeInfo.area}, {storeInfo.city} {storeInfo.pincode}</p>
              <p className="text-[#A8A29E] flex items-center gap-1.5 pt-1">
                <Clock size={14} className="text-brand" /> {storeInfo.openingHours}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={storeInfo.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-brand hover:opacity-90 text-white text-xs uppercase tracking-widest px-6 py-3.5 font-bold transition-colors flex items-center gap-2"
              >
                <MapPin size={16} /> Get Directions
              </a>
              <a
                href={`tel:${storeInfo.phone}`}
                className="border border-white/80 hover:bg-white hover:text-[#1C1917] text-white text-xs uppercase tracking-widest px-6 py-3.5 font-bold transition-colors flex items-center gap-2"
              >
                <Phone size={16} /> Call Store
              </a>
            </div>
          </div>

          <div className="relative aspect-video sm:aspect-[4/3] bg-[#292524] overflow-hidden luxury-card-shadow border border-[#44403C]">
            <iframe
              src={storeInfo.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Modern Maharani Showroom Map Location"
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER REVIEWS */}
      {approvedReviews.length > 0 && (
        <section className="bg-[#FAF8F5] border-t border-[#E7E5E4] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase tracking-widest text-brand font-bold">Verified Feedback</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917]">Loved By Our Customers</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {approvedReviews.map((rev) => (
                <div key={rev.id} className="bg-white p-6 border border-[#E7E5E4] space-y-4 luxury-card-shadow flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-1 text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-xs text-[#1C1917] italic leading-relaxed">"{rev.reviewText}"</p>
                  </div>
                  <div className="pt-4 border-t border-[#FAF8F5] flex items-center justify-between text-[11px] text-[#78716C]">
                    <span className="font-bold text-[#1C1917] flex items-center gap-1">
                      <CheckCircle2 size={13} className="text-emerald-600" /> {rev.customerName}
                    </span>
                    <span>{rev.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
