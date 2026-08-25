'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Tag, X } from 'lucide-react';
import { Offer } from '@/lib/types';

export default function OfferBanner() {
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    async function loadOffers() {
      try {
        const res = await fetch('/api/data');
        const data = await res.json();
        if (data.offers && data.offers.length > 0) {
          const firstActive = data.offers.find((o: Offer) => o.active);
          if (firstActive) setActiveOffer(firstActive);
        }
      } catch (e) {}
    }
    loadOffers();
  }, []);

  if (!activeOffer || dismissed) return null;

  return (
    <div className="bg-[#7A1C30] text-white py-2 px-4 text-xs font-semibold uppercase tracking-widest flex items-center justify-between z-50">
      <div className="mx-auto flex items-center gap-2 text-center">
        <Sparkles size={14} className="animate-pulse text-amber-300" />
        <span>{activeOffer.bannerText || `SALE: ${activeOffer.discountPercentage}% OFF WITH CODE ${activeOffer.code}`}</span>
      </div>
      <button onClick={() => setDismissed(true)} className="p-1 hover:text-amber-200">
        <X size={14} />
      </button>
    </div>
  );
}
