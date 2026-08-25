'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Heart, Menu, X, PhoneCall, MessageCircle, MapPin, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);

    // Read wishlist count from localStorage
    const updateWishlist = () => {
      try {
        const saved = JSON.parse(localStorage.getItem('mm_wishlist') || '[]');
        setWishlistCount(saved.length);
      } catch (e) {
        setWishlistCount(0);
      }
    };
    updateWishlist();
    window.addEventListener('storage', updateWishlist);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', updateWishlist);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'New Arrivals', href: '/new-arrivals' },
    { name: 'Collections', href: '/collections' },
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Visit Us', href: '/visit-us' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi Modern Maharani, I'm exploring your digital showroom website and would like to enquire about your contemporary fashion collection.");
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?query=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      {/* Top Banner Announcement */}
      <div className="bg-[#7A1C30] text-white py-2 px-4 text-xs tracking-widest text-center uppercase font-medium flex justify-between items-center max-w-full">
        <span className="hidden md:inline-block">KPHB Phase 1, Kukatpally, Hyderabad</span>
        <span className="mx-auto md:mx-0">Contemporary Women's Fashion Showroom • Enquire via WhatsApp</span>
        <a href="tel:+919876543210" className="hidden md:flex items-center gap-1 hover:underline">
          <PhoneCall size={12} /> +91 98765 43210
        </a>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-sm py-3 border-b border-[#E7E5E4]'
            : 'bg-[#FAF8F5] py-5 border-b border-[#E7E5E4]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden text-[#1C1917] p-2 hover:text-[#7A1C30] transition-colors"
            aria-label="Open Navigation Menu"
          >
            <Menu size={24} />
          </button>

          {/* Brand Logo */}
          <Link href="/" className="flex flex-col items-center group">
            <span className="font-serif text-2xl sm:text-3xl tracking-wider font-semibold text-[#1C1917] group-hover:text-[#7A1C30] transition-colors">
              MODERN MAHARANI
            </span>
            <span className="text-[10px] tracking-[0.25em] text-[#78716C] uppercase font-light">
              KPHB • HYDERABAD
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs uppercase tracking-widest font-medium transition-all relative py-1 ${
                    isActive
                      ? 'text-[#7A1C30] font-semibold border-b-2 border-[#7A1C30]'
                      : 'text-[#1C1917] hover:text-[#7A1C30]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-[#1C1917] hover:text-[#7A1C30] p-1.5 transition-colors"
              aria-label="Search Collection"
            >
              <Search size={20} />
            </button>

            {/* Wishlist Link */}
            <Link
              href="/shop?wishlist=true"
              className="relative text-[#1C1917] hover:text-[#7A1C30] p-1.5 transition-colors"
              aria-label="View Wishlist"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#7A1C30] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* WhatsApp Enquire Button */}
            <button
              onClick={handleWhatsAppClick}
              className="hidden sm:flex items-center gap-2 bg-[#7A1C30] hover:bg-[#5F1524] text-white text-xs uppercase tracking-widest px-4 py-2 rounded-none font-medium transition-all shadow-sm"
            >
              <MessageCircle size={15} />
              <span>Enquire</span>
            </button>

            {/* Admin Dashboard Quick Access Button */}
            <Link
              href="/admin"
              className="hidden xl:flex items-center gap-1.5 text-xs text-[#78716C] hover:text-[#7A1C30] transition-colors border border-[#E7E5E4] px-2.5 py-1.5"
              title="Admin Dashboard CMS"
            >
              <ShieldCheck size={14} />
              <span>Admin</span>
            </Link>
          </div>
        </div>

        {/* Expandable Search Bar */}
        {searchOpen && (
          <div className="bg-white border-b border-[#E7E5E4] py-3 px-4 shadow-inner transition-all animate-fadeIn">
            <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center gap-2">
              <Search size={18} className="text-[#78716C]" />
              <input
                type="text"
                placeholder="Search Kurtis, Dresses, Occasion wear, fabrics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm bg-transparent border-none focus:outline-none text-[#1C1917] placeholder-[#78716C]"
                autoFocus
              />
              <button
                type="submit"
                className="bg-[#1C1917] text-white text-xs uppercase tracking-wider px-4 py-1.5 font-medium hover:bg-[#7A1C30] transition-colors"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-[#78716C] hover:text-[#1C1917] p-1"
              >
                <X size={18} />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-[#FAF8F5] h-full shadow-2xl z-10 flex flex-col justify-between p-6">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E7E5E4]">
                <div>
                  <h2 className="font-serif text-xl font-semibold text-[#1C1917]">MODERN MAHARANI</h2>
                  <p className="text-[10px] uppercase tracking-widest text-[#78716C]">KPHB Kukatpally</p>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-[#1C1917]">
                  <X size={24} />
                </button>
              </div>

              <div className="mt-8 flex flex-col space-y-5">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm uppercase tracking-widest font-medium py-1 transition-colors ${
                      pathname === link.href ? 'text-[#7A1C30] font-bold' : 'text-[#1C1917] hover:text-[#7A1C30]'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs uppercase tracking-widest font-medium text-[#78716C] flex items-center gap-2 pt-4 border-t border-[#E7E5E4]"
                >
                  <ShieldCheck size={16} /> Admin CMS Panel
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E7E5E4] space-y-3">
              <button
                onClick={handleWhatsAppClick}
                className="w-full flex items-center justify-center gap-2 bg-[#7A1C30] text-white py-3 text-xs uppercase tracking-widest font-medium"
              >
                <MessageCircle size={18} /> Enquire on WhatsApp
              </button>
              <Link
                href="/visit-us"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 border border-[#1C1917] text-[#1C1917] py-2.5 text-xs uppercase tracking-widest font-medium"
              >
                <MapPin size={16} /> Visit Store KPHB
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
