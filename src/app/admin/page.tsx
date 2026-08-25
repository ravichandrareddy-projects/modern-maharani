'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { StoreData } from '@/lib/types';
import {
  ShoppingBag,
  Sparkles,
  MessageSquare,
  MessageCircle,
  Eye,
  TrendingUp,
  ArrowUpRight,
  Clock,
  Plus
} from 'lucide-react';

export default function AdminOverviewPage() {
  const [data, setData] = useState<StoreData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStore() {
      try {
        const res = await fetch('/api/data');
        const store = await res.json();
        setData(store);
      } catch (err) {
        console.error('Error fetching admin data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadStore();
  }, []);

  if (loading || !data) {
    return <div className="text-center py-20 text-xs uppercase tracking-widest text-[#78716C]">Loading Admin Dashboard...</div>;
  }

  const { products, enquiries, whatsAppLeads, analytics } = data;

  const totalProducts = products.length;
  const newArrivalsCount = products.filter((p) => p.isNewArrival).length;
  const totalEnquiries = enquiries.length;
  const totalWhatsAppLeads = whatsAppLeads.length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E5E4]">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#1C1917]">Dashboard Overview</h1>
          <p className="text-xs text-[#78716C]">Real-time digital showroom statistics for Modern Maharani KPHB.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="bg-[#7A1C30] hover:bg-[#5F1524] text-white text-xs uppercase tracking-widest px-4 py-2.5 font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Plus size={15} /> Add New Product
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 border border-[#E7E5E4] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-[#78716C]">
            <span className="text-xs uppercase tracking-widest font-semibold">Total Outfits</span>
            <ShoppingBag size={18} className="text-[#7A1C30]" />
          </div>
          <p className="font-serif text-3xl font-bold text-[#1C1917]">{totalProducts}</p>
          <p className="text-[11px] text-[#78716C] flex items-center gap-1">
            <span>Active in catalog</span>
          </p>
        </div>

        <div className="bg-white p-6 border border-[#E7E5E4] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-[#78716C]">
            <span className="text-xs uppercase tracking-widest font-semibold">New Arrivals</span>
            <Sparkles size={18} className="text-amber-600" />
          </div>
          <p className="font-serif text-3xl font-bold text-[#1C1917]">{newArrivalsCount}</p>
          <p className="text-[11px] text-[#78716C]">Fresh Rack items</p>
        </div>

        <div className="bg-white p-6 border border-[#E7E5E4] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-[#78716C]">
            <span className="text-xs uppercase tracking-widest font-semibold">Enquiries</span>
            <MessageSquare size={18} className="text-[#7A1C30]" />
          </div>
          <p className="font-serif text-3xl font-bold text-[#1C1917]">{totalEnquiries}</p>
          <p className="text-[11px] text-emerald-700 font-medium">Form Customer Leads</p>
        </div>

        <div className="bg-white p-6 border border-[#E7E5E4] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-[#78716C]">
            <span className="text-xs uppercase tracking-widest font-semibold">WhatsApp Leads</span>
            <MessageCircle size={18} className="text-emerald-600" />
          </div>
          <p className="font-serif text-3xl font-bold text-[#1C1917]">{totalWhatsAppLeads}</p>
          <p className="text-[11px] text-[#78716C]">Direct WhatsApp Clicks</p>
        </div>
      </div>

      {/* Analytics Breakdown & Recent Enquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Enquiries List */}
        <div className="lg:col-span-2 bg-white p-6 border border-[#E7E5E4] shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#FAF8F5]">
            <h2 className="font-serif text-xl font-bold text-[#1C1917]">Recent Customer Enquiries</h2>
            <Link href="/admin/enquiries" className="text-xs uppercase tracking-widest text-[#7A1C30] font-semibold hover:underline">
              Manage All ({enquiries.length})
            </Link>
          </div>

          <div className="space-y-4">
            {enquiries.slice(0, 5).map((enq) => (
              <div key={enq.id} className="p-4 bg-[#FAF8F5] border border-[#E7E5E4] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#1C1917] text-sm">{enq.customerName}</span>
                    <span className="text-[10px] bg-[#7A1C30] text-white px-2 py-0.5 uppercase font-medium">{enq.status}</span>
                  </div>
                  <p className="text-[#78716C]">Phone: <a href={`tel:${enq.phone}`} className="text-[#1C1917] font-semibold hover:underline">{enq.phone}</a></p>
                  {enq.productName && <p className="text-[#7A1C30]">Product: {enq.productName}</p>}
                  <p className="text-[#78716C] italic">"{enq.message}"</p>
                </div>
                <span className="text-[10px] text-[#78716C] flex items-center gap-1 shrink-0">
                  <Clock size={12} /> {enq.createdAt}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics Summary */}
        <div className="bg-white p-6 border border-[#E7E5E4] shadow-sm space-y-6">
          <h2 className="font-serif text-xl font-bold text-[#1C1917]">Traffic & Performance</h2>

          <div className="space-y-4 text-xs">
            <div className="p-4 bg-[#FAF8F5] border border-[#E7E5E4] space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-[#78716C]">Total Showroom Page Views</span>
              <p className="font-serif text-2xl font-bold text-[#1C1917]">{analytics.pageViews.toLocaleString('en-IN')}</p>
            </div>

            <div className="p-4 bg-[#FAF8F5] border border-[#E7E5E4] space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-[#78716C]">Top Performing Category</span>
              <p className="font-serif text-lg font-bold text-[#7A1C30]">{analytics.topCategory}</p>
            </div>

            <div className="p-4 bg-[#FAF8F5] border border-[#E7E5E4] space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-[#78716C]">Most Enquired Outfit</span>
              <p className="font-serif text-sm font-bold text-[#1C1917]">{analytics.topProduct}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
