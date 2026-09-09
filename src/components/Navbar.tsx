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
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [allCategories, setAllCategories] = useState<{name: string, slug: string, parentSlug?: string}[]>([]);
  const [categories, setCategories] = useState<{name: string, slug: string, parentSlug?: string}[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);

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

    fetch('/api/data').then(res => res.json()).then(data => {
      if (data) {
        if (data.categories) {
          setAllCategories(data.categories);
          setCategories(data.categories.filter((c: any) => !c.parentSlug));
        }
        if (data.products) {
          setAllProducts(data.products);
        }
      }
    }).catch(console.error);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', updateWishlist);
    };
  }, []);

  // Compute Live Search Matches
  const searchQ = searchQuery.toLowerCase().trim();
  const matchingCategories = searchQ
    ? allCategories.filter(
        (c) => c.name.toLowerCase().includes(searchQ) || c.slug.toLowerCase().includes(searchQ)
      ).slice(0, 5)
    : [];

  const matchingProducts = searchQ
    ? allProducts
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQ) ||
            (p.fabric && p.fabric.toLowerCase().includes(searchQ)) ||
            (p.work && p.work.toLowerCase().includes(searchQ)) ||
            (p.categories && p.categories.some((c: string) => c.toLowerCase().includes(searchQ)))
        )
        .slice(0, 6)
    : [];

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
            ? 'bg-white/90 backdrop-blur-md shadow-md py-2 border-b border-[#E7E5E4]'
            : 'bg-white/80 backdrop-blur-sm py-2.5 border-b border-[#E7E5E4]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Mobile Hamburger & Official Brand Logo */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden text-[#1C1917] p-1.5 hover:text-brand transition-colors"
              aria-label="Open Navigation Menu"
            >
              <Menu size={22} />
            </button>

            <Link href="/" className="flex items-center space-x-2.5 group">
              <img
                src="/images/logo.png"
                alt="Modern Maharani Logo"
                className="h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-xl font-bold tracking-wider text-[#1C1917] group-hover:text-brand transition-colors leading-none">
                  MODERN MAHARANI
                </span>
                <span className="text-[9px] uppercase tracking-widest text-[#78716C] font-semibold pt-0.5">
                  KPHB Kukatpally
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Inline 1-Line Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 relative">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const hasDropdown = link.name === 'Shop' || link.name === 'Collections';
              return (
                <div key={link.name} className="relative group" onMouseEnter={() => hasDropdown && setActiveDropdown(link.name)} onMouseLeave={() => hasDropdown && setActiveDropdown(null)}>
                  <Link
                    href={link.href}
                    className={`text-xs uppercase tracking-widest font-semibold transition-all py-1 ${
                      isActive ? 'text-brand font-bold border-b-2 border-brand' : 'text-[#1C1917] hover:text-brand'
                    }`}
                  >
                    {link.name}
                  </Link>
                  
                  {/* Mega Menu Dropdown */}
                  {hasDropdown && activeDropdown === link.name && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[920px] z-50">
                      <div className="bg-white border border-[#E7E5E4] shadow-2xl p-6 grid grid-cols-4 gap-6">
                        {link.name === 'Shop' && categories.map(cat => {
                          const subCats = allCategories.filter(c => c.parentSlug === cat.slug);
                          return (
                            <div key={cat.slug} className="space-y-3">
                              <Link
                                href={`/shop?category=${encodeURIComponent(cat.slug)}`}
                                className="font-serif text-sm font-bold text-[#1C1917] hover:text-brand block pb-1 border-b border-[#E7E5E4]"
                              >
                                {cat.name}
                              </Link>
                              <ul className="space-y-1.5">
                                {subCats.map(sub => (
                                  <li key={sub.slug}>
                                    <Link
                                      href={`/shop?category=${encodeURIComponent(sub.slug)}`}
                                      className="text-xs text-[#78716C] hover:text-brand block transition-colors truncate"
                                    >
                                      {sub.name}
                                    </Link>
                                  </li>
                                ))}
                                <li>
                                  <Link
                                    href={`/shop?category=${encodeURIComponent(cat.slug)}`}
                                    className="text-[10px] font-bold text-brand uppercase tracking-wider hover:underline block pt-1"
                                  >
                                    View All →
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          );
                        })}
                        {link.name === 'Collections' && (
                          <div className="col-span-4 space-y-2">
                             <p className="text-xs text-[#78716C]">Explore curated seasonal collections and showroom edits.</p>
                             <Link href="/collections" className="text-brand text-xs font-bold uppercase inline-block">View All Collections →</Link>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right: Search, Wishlist, Cart Drawer & Admin Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-[#1C1917] hover:text-brand p-1.5 transition-colors"
              aria-label="Search Collection"
            >
              <Search size={19} />
            </button>

            <Link
              href="/shop?wishlist=true"
              className="relative text-[#1C1917] hover:text-brand p-1.5 transition-colors"
              aria-label="View Wishlist"
            >
              <Heart size={19} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-[#1C1917] hover:text-brand p-1.5 transition-colors flex items-center gap-1"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="bg-brand text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

          </div>
        </div>

        {/* Live Predictive Search Overlay */}
        {searchOpen && (
          <div className="bg-white border-b border-[#E7E5E4] py-4 px-4 shadow-xl transition-all animate-fadeIn relative z-50">
            <div className="max-w-3xl mx-auto space-y-4">
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 border-b border-[#E7E5E4] pb-2">
                <Search size={18} className="text-brand shrink-0" />
                <input
                  type="text"
                  placeholder="Type any character to search categories & outfits..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-sm font-medium bg-transparent border-none focus:outline-none text-[#1C1917]"
                  autoFocus
                />
                <button
                  type="submit"
                  className="bg-[#1C1917] text-white text-xs uppercase tracking-wider px-4 py-1.5 font-bold hover:bg-brand transition-colors shrink-0"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="text-[#78716C] hover:text-[#1C1917] p-1 shrink-0"
                >
                  <X size={20} />
                </button>
              </form>

              {/* Instant Predictive Results Dropdown */}
              {searchQ.length > 0 && (
                <div className="space-y-4 pt-2 max-h-[60vh] overflow-y-auto">
                  {/* Category Suggestions */}
                  {matchingCategories.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#78716C] block">
                        Matching Categories ({matchingCategories.length})
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {matchingCategories.map((cat) => (
                          <Link
                            key={cat.slug}
                            href={`/shop?category=${encodeURIComponent(cat.slug)}`}
                            onClick={() => setSearchOpen(false)}
                            className="bg-[#FAF8F5] hover:bg-brand hover:text-white text-[#1C1917] text-xs font-semibold px-3 py-1.5 border border-[#E7E5E4] transition-colors flex items-center gap-1.5"
                          >
                            <span>📁</span> {cat.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Outfit Suggestions */}
                  {matchingProducts.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-[#E7E5E4]">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#78716C] block">
                        Matching Outfits ({matchingProducts.length})
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {matchingProducts.map((prod) => (
                          <Link
                            key={prod.id}
                            href={`/product/${prod.slug}`}
                            onClick={() => setSearchOpen(false)}
                            className="flex items-center gap-3 p-2 border border-[#E7E5E4] hover:border-brand bg-white hover:bg-[#FAF8F5] transition-all group"
                          >
                            <img
                              src={prod.images?.[0] || '/images/hero_banner.jpg'}
                              alt={prod.name}
                              className="w-12 h-14 object-cover border border-[#E7E5E4] shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-[#1C1917] group-hover:text-brand truncate">
                                {prod.name}
                              </h4>
                              <p className="text-[10px] text-[#78716C] truncate">
                                {prod.categories?.[0]} • {prod.fabric || 'Ethnic'}
                              </p>
                              <span className="text-xs font-bold text-brand block mt-0.5">
                                ₹{(prod.salePrice || prod.price || 0).toLocaleString('en-IN')}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {matchingCategories.length === 0 && matchingProducts.length === 0 && (
                    <div className="text-center py-6 text-xs text-[#78716C]">
                      No categories or outfits found matching "{searchQuery}".
                    </div>
                  )}
                </div>
              )}
            </div>
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
                <div className="flex items-center gap-2">
                  <img src="/images/logo.png" alt="Logo" className="h-8 w-auto" />
                  <div>
                    <h2 className="font-serif text-lg font-bold text-[#1C1917]">MODERN MAHARANI</h2>
                    <p className="text-[10px] uppercase tracking-widest text-[#78716C]">KPHB Kukatpally</p>
                  </div>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-[#1C1917]">
                  <X size={22} />
                </button>
              </div>

              <div className="mt-6 flex flex-col space-y-2">
                {navLinks.map((link) => {
                  const hasDropdown = link.name === 'Shop';
                  return (
                    <div key={link.name}>
                      <div className="flex items-center justify-between">
                        <Link
                          href={link.href}
                          onClick={() => !hasDropdown && setMobileMenuOpen(false)}
                          className={`text-xs uppercase tracking-widest font-semibold py-2 transition-colors block flex-grow ${
                            pathname === link.href ? 'text-brand font-bold' : 'text-[#1C1917]'
                          }`}
                        >
                          {link.name}
                        </Link>
                        {hasDropdown && (
                          <button onClick={() => setExpandedMobileMenu(expandedMobileMenu === link.name ? null : link.name)} className="p-2">
                            <span className="text-xl leading-none">{expandedMobileMenu === link.name ? '-' : '+'}</span>
                          </button>
                        )}
                      </div>
                      {hasDropdown && expandedMobileMenu === link.name && (
                        <div className="pl-4 py-2 border-l-2 border-brand space-y-3">
                          {categories.map(cat => (
                            <Link 
                              key={cat.slug} 
                              href={`/shop?category=${cat.slug}`} 
                              onClick={() => setMobileMenuOpen(false)}
                              className="block text-xs uppercase text-[#78716C] hover:text-brand"
                            >
                              {cat.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E7E5E4] space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 bg-brand text-white py-3 text-xs uppercase tracking-widest font-bold"
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
