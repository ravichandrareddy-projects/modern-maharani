'use client';

import React, { useState, useEffect } from 'react';
import { StoreData } from '@/lib/types';
import { ShoppingBag, Clock } from 'lucide-react';

export default function AdminLeadsPage() {
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStore() {
      try {
        const res = await fetch('/api/data');
        const data = await res.json();
        setStoreData(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadStore();
  }, []);

  if (loading || !storeData) {
    return <div className="text-center py-20 text-xs uppercase tracking-widest text-[#78716C]">Loading Order Lead Insights...</div>;
  }

  const orders = storeData.orders || [];

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E7E5E4]">
        <h1 className="font-serif text-3xl font-bold text-[#1C1917]">Order Lead Insights</h1>
        <p className="text-xs text-[#78716C]">Track direct customer orders and showroom visit requests.</p>
      </div>

      <div className="bg-white border border-[#E7E5E4] overflow-x-auto shadow-sm">
        <table className="w-full text-left text-xs text-[#1C1917]">
          <thead className="bg-[#FAF8F5] text-[#78716C] uppercase tracking-wider text-[10px] border-b border-[#E7E5E4]">
            <tr>
              <th className="py-3 px-4">Order #</th>
              <th className="py-3 px-4">Customer Name</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Delivery Option</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E7E5E4]">
            {orders.map((lead) => (
              <tr key={lead.id} className="hover:bg-[#FAF8F5]">
                <td className="py-3 px-4 font-mono font-bold text-[#7A1C30]">{lead.orderNumber}</td>
                <td className="py-3 px-4 font-medium">{lead.customerName}</td>
                <td className="py-3 px-4 font-semibold">{lead.phone}</td>
                <td className="py-3 px-4">{lead.deliveryType}</td>
                <td className="py-3 px-4">
                  <span className="bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 border border-emerald-200">
                    {lead.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
