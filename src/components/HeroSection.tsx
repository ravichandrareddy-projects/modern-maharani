'use client';

import React, { useState, useRef } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ShoppingBag, MapPin, Sparkles, Play, Pause, Volume2, VolumeX, Film, X, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  heroImage: string;
  siteSettings: any;
}

export default function HeroSection({ heroImage, siteSettings }: HeroSectionProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showReelModal, setShowReelModal] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  // High quality luxury fashion loop videos
  const backgroundVideoUrl = "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-a-pink-dress-41315-large.mp4";
  const brandReelUrl = "https://assets.mixkit.co/videos/preview/mixkit-model-walking-on-a-runway-41270-large.mp4";

  // Featured Spotlight products from catalog
  const spotlightProducts = [
    {
      id: 'spotlight-1',
      title: 'Handcrafted Jamdani Silk Saree',
      category: 'Luxury Sarees',
      price: '₹14,999',
      image: '/images/inventory/Jamdani_saree_arrangement_displayed_202609082126.jpeg',
      link: '/shop?category=sarees'
    },
    {
      id: 'spotlight-2',
      title: 'Royal Velvet Anarkali Set',
      category: 'Readymades & Suits',
      price: '₹11,499',
      image: '/images/inventory/Velvet_blouse_and_skirt_set_202609082126.jpeg',
      link: '/shop?category=readymades'
    },
    {
      id: 'spotlight-3',
      title: 'Ajrakh Hand Block Printed Suit',
      category: 'Dress Materials',
      price: '₹5,899',
      image: '/images/inventory/Ajrakh_dress_material_flat-lay_a_202609082126.jpeg',
      link: '/shop?category=dress-materials'
    },
    {
      id: 'spotlight-4',
      title: 'Contemporary Silk Co-ord Set',
      category: 'Budget Finds',
      price: '₹3,499',
      image: '/images/inventory/Modern_ethnic_co-ord_set_202609082126.jpeg',
      link: '/shop?category=budget-finds'
    }
  ];

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Animation variants
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  return (
    <section className="relative min-h-[96vh] flex flex-col justify-between bg-[#1C1917] text-white overflow-hidden">
      {/* Background Video Layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          poster={heroImage}
          className="absolute inset-0 w-full h-full object-cover scale-105 opacity-60 transition-opacity duration-1000"
        >
          <source src={backgroundVideoUrl} type="video/mp4" />
        </video>
        {/* Fallback image glow overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
          style={{ backgroundImage: `url('${heroImage}')` }}
        />
        {/* Luxury gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-black/50 to-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/30 to-[#1C1917]/90" />
      </div>

      {/* Top Controls Bar: Sound, Video Play, Brand Reel */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 flex items-center justify-between">
        <button
          onClick={() => setShowReelModal(true)}
          className="group inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-amber-200 text-xs tracking-wider uppercase px-4 py-2 rounded-full backdrop-blur-md border border-amber-500/30 transition-all duration-300 shadow-lg hover:scale-105"
        >
          <Film size={14} className="text-amber-400 group-hover:rotate-12 transition-transform" />
          <span>Watch 2026 Brand Film</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause background video" : "Play background video"}
            className="p-2.5 bg-black/40 hover:bg-black/70 text-white rounded-full border border-white/20 backdrop-blur-md transition-all hover:scale-110"
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <button
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute background video" : "Mute background video"}
            className="p-2.5 bg-black/40 hover:bg-black/70 text-white rounded-full border border-white/20 backdrop-blur-md transition-all hover:scale-110"
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </div>
      </div>

      {/* Main Content Container */}
      <motion.div 
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center py-12 md:py-16 my-auto"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-amber-500/20 text-amber-200 text-[10px] sm:text-xs uppercase tracking-[0.3em] px-6 py-2.5 backdrop-blur-xl rounded-full border border-amber-400/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
          <Sparkles size={14} className="text-amber-400 animate-spin-slow" /> Haute Couture & Royal Heritage
        </motion.div>

        <motion.h1 variants={fadeUp} className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-2xl mb-6">
          {siteSettings.heroHeadline || "Style That Feels Like You."}
        </motion.h1>

        <motion.p variants={fadeUp} className="text-base sm:text-xl md:text-2xl text-[#FAF8F5]/90 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-md mb-10">
          {siteSettings.heroSupportingText || "Experience the pinnacle of contemporary women's fashion. Where rich Indian heritage meets stunning modern silhouettes."}
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto sm:max-w-none">
          <Link
            href="/shop"
            className="w-full sm:w-auto bg-gradient-to-r from-[#7A1C30] via-[#8C1E37] to-[#5F1524] hover:from-[#9a213b] hover:to-[#7A1C30] text-white text-xs sm:text-sm uppercase tracking-[0.2em] px-9 py-4 font-bold rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(122,28,48,0.5)] flex items-center justify-center gap-2.5 border border-amber-400/30 hover:scale-105 group"
          >
            <ShoppingBag size={18} className="group-hover:rotate-12 transition-transform" /> 
            {siteSettings.heroPrimaryCtaText || "Explore Collection"}
          </Link>
          <Link
            href="/visit-us"
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm uppercase tracking-[0.2em] px-9 py-4 font-bold rounded-full transition-all duration-300 backdrop-blur-md shadow-xl flex items-center justify-center gap-2.5 border border-white/30 hover:scale-105"
          >
            <MapPin size={18} className="text-amber-300" /> 
            {siteSettings.heroSecondaryCtaText || "Visit Showroom"}
          </Link>
        </motion.div>
      </motion.div>

      {/* Bottom Interactive Product Spotlight Ticker */}
      <div className="relative z-20 w-full bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-6 pb-6 px-4 border-t border-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Label */}
          <div className="flex items-center gap-2 text-amber-200 text-xs uppercase tracking-widest font-semibold shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Curated Showcase Highlights</span>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
            {spotlightProducts.map((prod) => (
              <Link
                key={prod.id}
                href={prod.link}
                className="group relative flex items-center gap-3 bg-white/10 hover:bg-white/20 p-2 rounded-xl border border-white/15 backdrop-blur-md transition-all duration-300 hover:border-amber-400/50 hover:scale-[1.03]"
              >
                <div className="relative w-12 h-14 rounded-lg overflow-hidden shrink-0 bg-stone-900 border border-white/20">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="min-w-0 pr-1">
                  <p className="text-[11px] font-medium text-white line-clamp-1 group-hover:text-amber-200 transition-colors">
                    {prod.title}
                  </p>
                  <p className="text-[10px] text-stone-300 font-light">
                    {prod.category}
                  </p>
                  <p className="text-[11px] font-bold text-amber-300">
                    {prod.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Brand Runway Film Modal */}
      <AnimatePresence>
        {showReelModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
          >
            <div className="relative w-full max-w-4xl bg-stone-900 rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-950">
                <div className="flex items-center gap-2 text-amber-200">
                  <Sparkles size={16} />
                  <span className="font-serif text-lg font-bold tracking-wide">Modern Maharani Couture 2026 Runway</span>
                </div>
                <button
                  onClick={() => setShowReelModal(false)}
                  className="p-2 text-stone-400 hover:text-white hover:bg-stone-800 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Video Player */}
              <div className="relative aspect-video bg-black">
                <video
                  autoPlay
                  controls
                  className="w-full h-full object-cover"
                  src={brandReelUrl}
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Modal Footer */}
              <div className="p-6 bg-stone-950 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl text-white font-bold">Festive & Heritage Elegance</h3>
                  <p className="text-xs text-stone-400">Discover exclusive sarees, handcrafted readymades, and unstitched dress materials.</p>
                </div>
                <Link
                  href="/shop"
                  onClick={() => setShowReelModal(false)}
                  className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all flex items-center gap-2 shrink-0"
                >
                  Shop The Runway <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
