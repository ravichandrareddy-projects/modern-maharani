'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { StoreData } from '@/lib/types';
import {
  ShoppingBag,
  PackageCheck,
  Tag,
  MessageSquare,
  DollarSign,
  TrendingUp,
  Clock,
  Plus,
  ArrowUpRight
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

  const { products, enquiries, orders, offers, analytics } = data;

  const totalProducts = products.length;
  const totalOrders = (orders || []).length;
  const totalRevenue = (orders || []).reduce((sum, o) => sum + o.totalAmount, 0);
  const activeOffersCount = (offers || []).filter((o) => o.active).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E5E4]">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#1C1917]">Store Control Dashboard</h1>
          <p className="text-xs text-[#78716C]">Real-time e-commerce analytics, received orders, and store statistics for Modern Maharani KPHB.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="bg-[#7A1C30] hover:bg-[#5F1524] text-white text-xs uppercase tracking-widest px-4 py-2.5 font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Plus size={15} /> Add Product
          </Link>
          <Link
            href="/admin/orders"
            className="bg-[#1C1917] hover:bg-[#7A1C30] text-white text-xs uppercase tracking-widest px-4 py-2.5 font-semibold flex items-center gap-1.5 transition-colors"
          >
            <PackageCheck size={15} /> View Orders ({totalOrders})
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 border border-[#E7E5E4] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-[#78716C]">
            <span className="text-xs uppercase tracking-widest font-semibold">Total Revenue</span>
            <DollarSign size={18} className="text-emerald-600" />
          </div>
          <p className="font-serif text-3xl font-bold text-[#7A1C30]">₹{totalRevenue.toLocaleString('en-IN')}</p>
          <p className="text-[11px] text-[#78716C]">From store online orders</p>
        </div>

        <div className="bg-white p-6 border border-[#E7E5E4] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-[#78716C]">
            <span className="text-xs uppercase tracking-widest font-semibold">Customer Orders</span>
            <PackageCheck size={18} className="text-[#7A1C30]" />
          </div>
          <p className="font-serif text-3xl font-bold text-[#1C1917]">{totalOrders}</p>
          <p className="text-[11px] text-emerald-700 font-medium">Active & Completed Orders</p>
        </div>

        <div className="bg-white p-6 border border-[#E7E5E4] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-[#78716C]">
            <span className="text-xs uppercase tracking-widest font-semibold">Active Outfits</span>
            <ShoppingBag size={18} className="text-[#7A1C30]" />
          </div>
          <p className="font-serif text-3xl font-bold text-[#1C1917]">{totalProducts}</p>
          <p className="text-[11px] text-[#78716C]">In digital catalog</p>
        </div>

        <div className="bg-white p-6 border border-[#E7E5E4] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-[#78716C]">
            <span className="text-xs uppercase tracking-widest font-semibold">Promotions</span>
            <Tag size={18} className="text-amber-600" />
          </div>
          <p className="font-serif text-3xl font-bold text-[#1C1917]">{activeOffersCount}</p>
          <p className="text-[11px] text-[#78716C]">Active Coupon Codes</p>
        </div>
      </div>

      {/* Main Grid: Orders & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders List */}
        <div className="lg:col-span-2 bg-white p-6 border border-[#E7E5E4] shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#FAF8F5]">
            <h2 className="font-serif text-xl font-bold text-[#1C1917]">Recent Received Orders</h2>
            <Link href="/admin/orders" className="text-xs uppercase tracking-widest text-[#7A1C30] font-semibold hover:underline">
              Manage All Orders
            </Link>
          </div>

          {(orders || []).length === 0 ? (
            <p className="text-xs text-[#78716C] py-8 text-center">No orders received yet.</p>
          ) : (
            <div className="space-y-4">
              {(orders || []).slice(0, 5).map((ord) => (
                <div key={ord.id} className="p-4 bg-[#FAF8F5] border border-[#E7E5E4] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-[#7A1C30] text-sm">{ord.orderNumber}</span>
                      <span className="font-semibold text-[#1C1917]">{ord.customerName}</span>
                      <span className="text-[10px] bg-[#7A1C30] text-white px-2 py-0.5 uppercase font-medium">{ord.status}</span>
                    </div>
                    <p className="text-[#78716C]">Phone: <a href={`tel:${ord.phone}`} className="text-[#1C1917] font-semibold hover:underline">{ord.phone}</a> | {ord.deliveryType}</p>
                    <p className="font-bold text-[#1C1917]">Total: ₹{ord.totalAmount.toLocaleString('en-IN')}</p>
                  </div>
                  <span className="text-[10px] text-[#78716C] flex items-center gap-1 shrink-0">
                    <Clock size={12} /> {ord.createdAt}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Store Performance */}
        <div className="bg-white p-6 border border-[#E7E5E4] shadow-sm space-y-6">
          <h2 className="font-serif text-xl font-bold text-[#1C1917]">Catalog Performance</h2>

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
              <span className="text-[10px] uppercase tracking-wider text-[#78716C]">Most Popular Outfit</span>
              <p className="font-serif text-sm font-bold text-[#1C1917]">{analytics.topProduct}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
