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
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

        {/* --- Content Layers --- */}
        
        {/* Phase 1: Intro */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center px-4 pointer-events-none"
          style={{ opacity: opacity1, y: y1 }}
        >
          <h1 className="font-serif text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-medium tracking-tight text-white leading-[0.9] text-center max-w-7xl drop-shadow-2xl">
            Style That<br />Feels Like You.
          </h1>
        </motion.div>

        {/* Phase 2: Story */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center px-6 max-w-5xl mx-auto pointer-events-none"
          style={{ opacity: opacity2, y: y2 }}
        >
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-white font-normal leading-tight text-center drop-shadow-xl">
            Where rich Indian heritage<br />meets stunning modern silhouettes.
          </h2>
          <p className="mt-8 text-lg sm:text-2xl text-white/70 font-light tracking-wide text-center">
            Crafted for the Modern Maharani.
          </p>
        </motion.div>

        {/* Phase 3: CTA */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center px-4"
          // @ts-ignore
          style={{ opacity: opacity3, y: y3, pointerEvents: useTransform(opacity3, (val) => val > 0.5 ? 'auto' : 'none') }}
        >
          <h2 className="font-serif text-5xl sm:text-8xl font-medium tracking-tight text-white mb-16 text-center drop-shadow-2xl">
            The Festive Edit.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full max-w-md mx-auto sm:max-w-none">
            <Link
              href="/shop"
              className="w-full sm:w-auto bg-white text-black hover:bg-gray-200 text-xs sm:text-sm uppercase tracking-[0.2em] px-12 py-5 font-bold transition-all duration-300 flex items-center justify-center gap-3"
            >
              <ShoppingBag size={18} /> Shop Collection
            </Link>
            <Link
              href="/visit-us"
              className="w-full sm:w-auto border border-white/50 text-white hover:bg-white hover:text-black text-xs sm:text-sm uppercase tracking-[0.2em] px-12 py-5 font-bold transition-all duration-300 flex items-center justify-center gap-3"
            >
              <MapPin size={18} /> Visit Showroom
            </Link>
          </div>
        </motion.div>

        {/* Minimal Scroll Indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 pointer-events-none"
          style={{ opacity: indicatorOpacity }}
        >
          <div className="w-[1px] h-24 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>

      </div>
    </section>
  );
}
