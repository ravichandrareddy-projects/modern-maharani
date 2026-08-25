import React from 'react';
import { getStoreData } from '@/lib/db';
import { MapPin, Phone, MessageCircle, Clock, Navigation, CheckCircle2 } from 'lucide-react';

export default function VisitUsPage() {
  const store = getStoreData();
  const { storeInfo, siteSettings } = store;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 pb-6 border-b border-[#E7E5E4]">
        <span className="text-xs uppercase tracking-[0.25em] text-[#7A1C30] font-semibold flex items-center justify-center gap-1.5">
          <MapPin size={14} /> Physical Boutique Showroom
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1C1917]">
          {siteSettings.storeSectionHeading || "Come See It. Feel It. Try It."}
        </h1>
        <p className="text-xs sm:text-sm text-[#78716C] max-w-xl mx-auto">
          {siteSettings.storeSectionCopy || "Some outfits just look better when you see them in person. Visit Modern Maharani at KPHB and explore the collection for yourself."}
        </p>
      </div>

      {/* Main Grid: Details + Live Google Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left: Location & Contact Cards */}
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 border border-[#E7E5E4] luxury-card-shadow space-y-6">
            <h2 className="font-serif text-2xl font-bold text-[#1C1917]">Showroom Address & Directions</h2>
            
            <div className="space-y-4 text-xs text-[#78716C]">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[#7A1C30] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold text-sm text-[#1C1917]">{storeInfo.name}</p>
                  <p>{storeInfo.addressLine}</p>
                  <p className="text-[#7A1C30] font-medium">{storeInfo.landmark}</p>
                  <p>{storeInfo.area}</p>
                  <p>{storeInfo.city} {storeInfo.pincode}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-[#FAF8F5]">
                <Clock size={18} className="text-[#7A1C30] shrink-0" />
                <div>
                  <p className="font-semibold text-[#1C1917]">Operating Hours:</p>
                  <p>{storeInfo.openingHours}</p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={storeInfo.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto bg-[#7A1C30] hover:bg-[#5F1524] text-white text-xs uppercase tracking-widest px-6 py-3.5 font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Navigation size={15} /> Get Directions
              </a>
              <a
                href={`tel:${storeInfo.phone}`}
                className="w-full sm:w-auto border border-[#1C1917] text-[#1C1917] hover:bg-[#1C1917] hover:text-white text-xs uppercase tracking-widest px-6 py-3.5 font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Phone size={15} /> Call Store
              </a>
              <a
                href={`https://wa.me/${storeInfo.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs uppercase tracking-widest px-6 py-3.5 font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle size={15} /> WhatsApp
              </a>
            </div>
          </div>

          <div className="bg-[#FAF8F5] p-6 border border-[#E7E5E4] space-y-3 text-xs text-[#78716C]">
            <h3 className="font-semibold text-[#1C1917] uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-emerald-600" /> Why Visit Modern Maharani KPHB?
            </h3>
            <ul className="space-y-2 list-disc list-inside">
              <li>Feel the premium fabric textures, silks, georgette & chanderi in real life.</li>
              <li>Try on exact sizes with dedicated trial fitting facilities.</li>
              <li>Exclusive offline-only showroom releases updated weekly.</li>
              <li>Easy access directly opposite Global Eye Hospital, Road No. 1 KPHB.</li>
            </ul>
          </div>
        </div>

        {/* Right: Embedded Google Maps Frame */}
        <div className="bg-[#1C1917] border border-[#E7E5E4] luxury-card-shadow aspect-[4/3] lg:aspect-square overflow-hidden">
          <iframe
            src={storeInfo.googleMapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Modern Maharani KPHB Location"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
