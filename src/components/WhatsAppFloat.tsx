'use client';

import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState("Hi Modern Maharani, I'm interested in your fashion collection. Could you share details & availability?");

  const handleSend = () => {
    // Log lead to API silently
    try {
      fetch('/api/whatsapp-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourcePage: typeof window !== 'undefined' ? window.location.pathname : 'Home',
          ctaClicked: 'Sticky WhatsApp Float'
        })
      });
    } catch (e) {}

    const encoded = encodeURIComponent(customMsg);
    window.open(`https://wa.me/919876543210?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Quick Message Dialog */}
      {isOpen && (
        <div className="mb-4 w-72 sm:w-80 bg-white rounded-none shadow-2xl border border-[#E7E5E4] p-4 text-[#1C1917] animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E4]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center font-bold text-xs">
                MM
              </div>
              <div>
                <h4 className="text-xs font-semibold text-[#1C1917]">Modern Maharani Showroom</h4>
                <p className="text-[10px] text-green-600 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse"></span>
                  Active on WhatsApp
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-[#78716C] hover:text-[#1C1917] p-1">
              <X size={18} />
            </button>
          </div>

          <p className="text-xs text-[#78716C] my-3 leading-relaxed">
            Need help with sizes, prices or store directions at KPHB Kukatpally? Send us a message directly!
          </p>

          <textarea
            value={customMsg}
            onChange={(e) => setCustomMsg(e.target.value)}
            rows={3}
            className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-[#E7E5E4] focus:outline-none focus:border-[#7A1C30] text-[#1C1917] resize-none mb-3"
          />

          <button
            onClick={handleSend}
            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs uppercase tracking-widest py-2.5 font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <Send size={14} /> Send WhatsApp Message
          </button>
        </div>
      )}

      {/* Main Floating Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full sm:rounded-none shadow-xl flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
        aria-label="Enquire via WhatsApp"
      >
        <MessageCircle size={22} className="animate-bounce" />
        <span className="hidden sm:inline-block text-xs uppercase tracking-widest font-semibold">
          Enquire on WhatsApp
        </span>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
      </button>
    </div>
  );
}
