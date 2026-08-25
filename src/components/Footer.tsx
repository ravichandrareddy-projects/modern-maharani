'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, MessageCircle, Clock, Instagram, Youtube, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1C1917] text-[#FAF8F5] pt-16 pb-12 border-t border-[#292524]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#292524]">
          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-semibold tracking-wider text-white">MODERN MAHARANI</h3>
            <p className="text-xs text-[#A8A29E] leading-relaxed">
              Contemporary Women's Fashion Showroom bringing together effortless elegance, premium fabrics, and modern silhouettes for every woman.
            </p>
            <div className="pt-2 flex items-center space-x-3 text-white">
              <a
                href="https://instagram.com/modernmaharani_kphb"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#44403C] flex items-center justify-center hover:bg-[#7A1C30] hover:border-[#7A1C30] transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={15} />
              </a>
              <a
                href="https://youtube.com/@modernmaharani"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#44403C] flex items-center justify-center hover:bg-[#7A1C30] hover:border-[#7A1C30] transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={15} />
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#44403C] flex items-center justify-center hover:bg-[#25D366] hover:border-[#25D366] transition-colors text-white"
                aria-label="WhatsApp"
              >
                <MessageCircle size={15} />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white mb-4">Explore Showroom</h4>
            <ul className="space-y-2.5 text-xs text-[#A8A29E]">
              <li>
                <Link href="/new-arrivals" className="hover:text-white transition-colors">New Arrivals</Link>
              </li>
              <li>
                <Link href="/shop?category=Kurtis" className="hover:text-white transition-colors">Kurtis</Link>
              </li>
              <li>
                <Link href="/shop?category=Dresses" className="hover:text-white transition-colors">Dresses</Link>
              </li>
              <li>
                <Link href="/shop?category=Occasion Wear" className="hover:text-white transition-colors">Occasion Wear</Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-white transition-colors">Featured Collections</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">About Brand</Link>
              </li>
            </ul>
          </div>

          {/* Visit Showroom Location */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white mb-4">Physical Showroom</h4>
            <div className="space-y-3 text-xs text-[#A8A29E]">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#7A1C30] shrink-0 mt-0.5" />
                <span>
                  Flat-101, MIG-37, Road Number 1,<br />
                  opposite Global Eye Hospital,<br />
                  beside Swiss Castle Line, KPHB Phase 1,<br />
                  Kukatpally, Hyderabad, Telangana 500072
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock size={16} className="text-[#7A1C30] shrink-0" />
                <span>Mon - Sun: 10:30 AM - 9:00 PM</span>
              </div>
            </div>
          </div>

          {/* Direct Enquiries */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white mb-4">Customer Support</h4>
            <div className="space-y-3 text-xs text-[#A8A29E]">
              <p>For product availability, sizing & price details, reach out via WhatsApp or visit our store.</p>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#7A1C30] text-white px-4 py-2.5 uppercase tracking-widest text-[11px] font-medium hover:bg-[#5F1524] transition-colors"
              >
                <MessageCircle size={15} /> WhatsApp Enquire
              </a>
              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=Modern+Maharani+KPHB+Phase+1+Kukatpally+Hyderabad"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-white hover:text-[#7A1C30] underline underline-offset-4"
                >
                  Get Directions on Maps <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#78716C] gap-4">
          <p>© {new Date().getFullYear()} Modern Maharani. All rights reserved. KPHB, Kukatpally, Hyderabad.</p>
          <div className="flex items-center space-x-6">
            <Link href="/visit-us" className="hover:text-white transition-colors">Visit Store</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
            <Link href="/admin" className="hover:text-white transition-colors">Admin Dashboard</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
