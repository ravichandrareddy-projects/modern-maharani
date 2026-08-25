'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  PackageCheck,
  Tag,
  Layers,
  MessageSquare,
  ImageIcon,
  Star,
  Store,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (pathname === '/admin/login') {
      setAuthenticated(true);
      return;
    }

    const auth = localStorage.getItem('mm_admin_auth');
    if (!auth) {
      router.push('/admin/login');
    } else {
      setAuthenticated(true);
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('mm_admin_auth');
    router.push('/admin/login');
  };

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (authenticated === null) {
    return <div className="min-h-screen bg-[#1C1917] flex items-center justify-center text-white text-xs uppercase tracking-widest">Verifying Admin Session...</div>;
  }

  const navItems = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Store Orders', href: '/admin/orders', icon: PackageCheck },
    { name: 'Products', href: '/admin/products', icon: ShoppingBag },
    { name: 'Promotions & Offers', href: '/admin/offers', icon: Tag },
    { name: 'Collections', href: '/admin/collections', icon: Layers },
    { name: 'Categories', href: '/admin/categories', icon: Sparkles },
    { name: 'Enquiries', href: '/admin/enquiries', icon: MessageSquare },
    { name: 'Hero Banners', href: '/admin/banners', icon: ImageIcon },
    { name: 'Customer Reviews', href: '/admin/reviews', icon: Star },
    { name: 'Store Info & Copy', href: '/admin/store', icon: Store },
    { name: 'Theme & Security', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F4] flex flex-col md:flex-row text-[#1C1917]">
      {/* Admin Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#1C1917] text-white flex-shrink-0 flex flex-col justify-between p-6">
        <div className="space-y-8">
          {/* Admin Header */}
          <div className="space-y-1 pb-6 border-b border-[#292524]">
            <div className="flex items-center gap-2 text-brand font-semibold text-xs uppercase tracking-wider">
              <ShieldCheck size={16} /> Store Control CMS
            </div>
            <h2 className="font-serif text-xl font-bold tracking-wider text-white">MODERN MAHARANI</h2>
            <p className="text-[10px] text-[#A8A29E] uppercase tracking-widest">KPHB Showroom Management</p>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    isActive
                      ? 'bg-brand text-white font-bold'
                      : 'text-[#A8A29E] hover:bg-[#292524] hover:text-white'
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-[#292524] space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 text-xs text-[#A8A29E] hover:text-white transition-colors"
          >
            <ExternalLink size={14} /> View Live Website
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs text-red-400 hover:text-red-300 transition-colors w-full text-left"
          >
            <LogOut size={14} /> Logout Session
          </button>
        </div>
      </aside>

      {/* Main Admin Content Container */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
