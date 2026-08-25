'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  Layers,
  Tag,
  MessageSquare,
  MessageCircle,
  Image as ImageIcon,
  Star,
  Video,
  Store,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: ShoppingBag },
    { name: 'Collections', href: '/admin/collections', icon: Layers },
    { name: 'Categories', href: '/admin/categories', icon: Tag },
    { name: 'Enquiries', href: '/admin/enquiries', icon: MessageSquare },
    { name: 'WhatsApp Leads', href: '/admin/leads', icon: MessageCircle },
    { name: 'Homepage Banners', href: '/admin/banners', icon: ImageIcon },
    { name: 'Reviews', href: '/admin/reviews', icon: Star },
    { name: 'Store Content & Info', href: '/admin/store', icon: Store },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F4] flex flex-col md:flex-row text-[#1C1917]">
      {/* Admin Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#1C1917] text-white flex-shrink-0 flex flex-col justify-between p-6">
        <div className="space-y-8">
          {/* Admin Header */}
          <div className="space-y-1 pb-6 border-b border-[#292524]">
            <div className="flex items-center gap-2 text-[#7A1C30] font-semibold text-xs uppercase tracking-wider">
              <ShieldCheck size={16} /> CMS Dashboard
            </div>
            <h2 className="font-serif text-xl font-bold tracking-wider text-white">MODERN MAHARANI</h2>
            <p className="text-[10px] text-[#A8A29E] uppercase tracking-widest">KPHB Showroom Control</p>
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
                  className={`flex items-center gap-3 px-3.5 py-2.5 text-xs font-medium uppercase tracking-wider transition-colors ${
                    isActive
                      ? 'bg-[#7A1C30] text-white font-bold'
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
        </div>
      </aside>

      {/* Main Admin Content Container */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
