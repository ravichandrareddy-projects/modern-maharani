'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, ShoppingBag, MapPin } from 'lucide-react';

interface ScrollHeroProps {
  heroImage: string;
  siteSettings: any;
}

export default function ScrollHero({ heroImage, siteSettings }: ScrollHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Background effects
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.7, 0.5, 0.3, 0.1]);

  // Section 1: Intro (0 to 0.35)
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.35], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.35], [0, -100]);

  // Section 2: Story/Heritage (0.25 to 0.65)
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.4, 0.5, 0.65], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.4, 0.65], [100, 0, -100]);

  // Section 3: CTA (0.6 to 1)
  const opacity3 = useTransform(scrollYProgress, [0.6, 0.8, 1], [0, 1, 1]);
  const y3 = useTransform(scrollYProgress, [0.6, 0.8], [100, 0]);

  // Scroll indicator opacity
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [0.8, 0]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-black text-white w-full">
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        
        {/* Dynamic Background Image */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('${heroImage}')`,
            scale: bgScale,
            opacity: bgOpacity
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />

        {/* --- Content Layers --- */}
        
        {/* Phase 1: Intro */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center px-4 pointer-events-none"
          style={{ opacity: opacity1, y: y1 }}
        >
          <div className="inline-flex items-center gap-3 bg-white/10 text-amber-200 text-[10px] sm:text-xs uppercase tracking-[0.3em] px-6 py-2.5 rounded-full backdrop-blur-xl border border-white/20 mb-8 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            <Sparkles size={14} className="animate-pulse" />
            Exclusive Festive Edit 2026
            <Sparkles size={14} className="animate-pulse" />
          </div>
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-extrabold tracking-tight text-white leading-tight drop-shadow-2xl text-center max-w-6xl">
            {siteSettings.heroHeadline || "Style That Feels Like You."}
          </h1>
        </motion.div>

        {/* Phase 2: Story */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center px-4 max-w-5xl mx-auto pointer-events-none"
          style={{ opacity: opacity2, y: y2 }}
        >
          <div className="bg-[#1C1917]/40 backdrop-blur-md border border-white/10 p-8 sm:p-14 lg:p-20 rounded-3xl shadow-2xl text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand/30 via-transparent to-amber-900/30 mix-blend-overlay pointer-events-none" />
            
            <h2 className="relative font-serif text-3xl sm:text-5xl md:text-6xl text-amber-100 font-bold mb-8 leading-tight">
              Where Heritage Meets <br className="hidden sm:block" />Modern Elegance
            </h2>
            <p className="relative text-lg sm:text-2xl md:text-3xl text-white/90 font-light leading-relaxed max-w-3xl mx-auto">
              {siteSettings.heroSupportingText || "Experience the pinnacle of contemporary women's fashion. Every stitch tells a story of rich Indian craftsmanship, reimagined in stunning modern silhouettes for the modern Maharani."}
            </p>
          </div>
        </motion.div>

        {/* Phase 3: CTA (pointer-events-auto so buttons are clickable) */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center px-4"
          // @ts-ignore
          style={{ opacity: opacity3, y: y3, pointerEvents: useTransform(opacity3, (val) => val > 0.5 ? 'auto' : 'none') }}
        >
          <h2 className="font-serif text-5xl sm:text-7xl font-bold tracking-tight text-white mb-12 drop-shadow-2xl text-center">
            Ready to Explore?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-md mx-auto sm:max-w-none">
            <Link
              href="/shop"
              className="group w-full sm:w-auto bg-gradient-to-r from-[#7A1C30] to-[#5F1524] hover:from-[#9a213b] hover:to-[#7A1C30] text-white text-xs sm:text-sm uppercase tracking-widest px-12 py-5 font-bold rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(122,28,48,0.5)] flex items-center justify-center gap-3 border border-white/20 hover:scale-105"
            >
              <ShoppingBag size={20} className="group-hover:-translate-y-1 transition-transform" /> {siteSettings.heroPrimaryCtaText || "Explore Collection"}
            </Link>
            <Link
              href="/visit-us"
              className="group w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm uppercase tracking-widest px-12 py-5 font-bold rounded-full transition-all duration-300 backdrop-blur-xl shadow-xl flex items-center justify-center gap-3 border border-white/30 hover:scale-105"
            >
              <MapPin size={20} /> {siteSettings.heroSecondaryCtaText || "Visit Showroom"}
            </Link>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
          style={{ opacity: indicatorOpacity }}
        >
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-light">Scroll to explore</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent" />
        </motion.div>

      </div>
    </section>
  );
}
