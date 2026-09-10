'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { ShoppingBag, MapPin, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  heroImage: string;
  siteSettings: any;
}

export default function HeroSection({ heroImage, siteSettings }: HeroSectionProps) {
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
    <section className="relative min-h-[95vh] flex items-center justify-center bg-[#1C1917] text-white overflow-hidden">
      {/* Background Image with slow continuous zoom */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${heroImage}')` }}
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-black/50 to-black/30" />

      {/* Content Container */}
      <motion.div 
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center py-20"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 bg-white/10 text-amber-200 text-[10px] sm:text-xs uppercase tracking-[0.25em] px-5 py-2 backdrop-blur-md rounded-full border border-white/20">
          <Sparkles size={14} className="animate-pulse" /> Exclusive Festive Edit 2026
        </motion.div>

        <motion.h1 variants={fadeUp} className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[6rem] font-bold tracking-tight text-white leading-tight drop-shadow-2xl mb-8">
          {siteSettings.heroHeadline || "Style That Feels Like You."}
        </motion.h1>

        <motion.p variants={fadeUp} className="text-lg sm:text-2xl md:text-3xl text-[#FAF8F5] font-light max-w-3xl mx-auto leading-relaxed drop-shadow-md mb-12">
          {siteSettings.heroSupportingText || "Experience the pinnacle of contemporary women's fashion. Where rich Indian heritage meets stunning modern silhouettes."}
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto sm:max-w-none">
          <Link
            href="/shop"
            className="w-full sm:w-auto bg-gradient-to-r from-[#7A1C30] to-[#5F1524] hover:from-[#9a213b] hover:to-[#7A1C30] text-white text-xs sm:text-sm uppercase tracking-widest px-10 py-4 font-bold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(122,28,48,0.4)] flex items-center justify-center gap-2 border border-white/20 hover:scale-105"
          >
            <ShoppingBag size={18} /> {siteSettings.heroPrimaryCtaText || "Explore Collection"}
          </Link>
          <Link
            href="/visit-us"
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm uppercase tracking-widest px-10 py-4 font-bold rounded-full transition-all duration-300 backdrop-blur-md shadow-xl flex items-center justify-center gap-2 border border-white/30 hover:scale-105"
          >
            <MapPin size={18} /> {siteSettings.heroSecondaryCtaText || "Visit Showroom"}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
