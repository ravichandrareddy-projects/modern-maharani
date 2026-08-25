'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/cartContext';
import CartDrawer from './CartDrawer';
import OfferBanner from './OfferBanner';
import { Search, Heart, ShoppingBag, Menu, X, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { cartCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?query=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      {/* Dynamic Promo Announcement Banner */}
      <OfferBanner />

      {/* COMPACT SINGLE-LINE GLASSMORPHIC HEADER */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-md py-2.5 border-b border-[#E7E5E4]'
            : 'bg-white/80 backdrop-blur-sm py-3 border-b border-[#E7E5E4]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Mobile Hamburger & Inline Brand Logo */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden text-[#1C1917] p-1.5 hover:text-[#7A1C30] transition-colors"
              aria-label="Open Navigation Menu"
            >
              <Menu size={22} />
            </button>

            <Link href="/" className="flex items-center space-x-2 group">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-[#1C1917] group-hover:text-[#7A1C30] transition-colors">
                MODERN MAHARANI
              </span>
              <span className="hidden sm:inline-block text-[9px] uppercase tracking-widest text-[#78716C] border-l border-[#E7E5E4] pl-2 font-medium">
                KPHB
              </span>
            </Link>
          </div>

          {/* Center: Inline 1-Line Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs uppercase tracking-widest font-medium transition-all py-1 ${
                    isActive
                      ? 'text-[#7A1C30] font-bold border-b-2 border-[#7A1C30]'
                      : 'text-[#1C1917] hover:text-[#7A1C30]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right: Search, Wishlist, Cart Drawer & Admin Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-[#1C1917] hover:text-[#7A1C30] p-1.5 transition-colors"
              aria-label="Search Collection"
            >
              <Search size={19} />
            </button>

            <Link
              href="/shop?wishlist=true"
              className="relative text-[#1C1917] hover:text-[#7A1C30] p-1.5 transition-colors"
              aria-label="View Wishlist"
            >
              <Heart size={19} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#7A1C30] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-[#1C1917] hover:text-[#7A1C30] p-1.5 transition-colors flex items-center gap-1"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="bg-[#7A1C30] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin CMS Access */}
            <Link
              href="/admin/login"
              className="hidden sm:flex items-center gap-1 text-[11px] font-semibold text-[#78716C] hover:text-[#7A1C30] transition-colors border border-[#E7E5E4] px-2.5 py-1"
              title="Admin Panel"
            >
              <ShieldCheck size={14} />
              <span>Admin</span>
            </Link>
          </div>
        </div>

        {/* Expandable Search Drawer */}
        {searchOpen && (
          <div className="bg-white border-b border-[#E7E5E4] py-3 px-4 shadow-inner transition-all animate-fadeIn">
            <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center gap-2">
              <Search size={18} className="text-[#78716C]" />
              <input
                type="text"
                placeholder="Search Kurtis, Dresses, Occasion wear, fabric..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs bg-transparent border-none focus:outline-none text-[#1C1917]"
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

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl z-10 flex flex-col justify-between p-6">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4]">
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#1C1917]">MODERN MAHARANI</h2>
                  <p className="text-[10px] uppercase tracking-widest text-[#78716C]">KPHB Kukatpally</p>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-[#1C1917]">
                  <X size={22} />
                </button>
              </div>

              <div className="mt-6 flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-xs uppercase tracking-widest font-semibold py-1.5 transition-colors ${
                      pathname === link.href ? 'text-[#7A1C30] font-bold' : 'text-[#1C1917] hover:text-[#7A1C30]'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E7E5E4] space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#7A1C30] text-white py-3 text-xs uppercase tracking-widest font-bold"
              >
                <ShoppingBag size={16} /> View Shopping Cart ({cartCount})
              </button>
              <Link
                href="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 border border-[#1C1917] text-[#1C1917] py-2.5 text-xs uppercase tracking-widest font-semibold"
              >
                <ShieldCheck size={16} /> Admin CMS Login
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Slide-out Cart Drawer */}
      <CartDrawer />
    </>
  );
}
