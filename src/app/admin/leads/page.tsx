'use client';

import React, { useState, useEffect } from 'react';
import { StoreData } from '@/lib/types';
import { MessageCircle, Clock, ExternalLink } from 'lucide-react';

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
    return <div className="text-center py-20 text-xs uppercase tracking-widest text-[#78716C]">Loading WhatsApp Lead Data...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E7E5E4]">
        <h1 className="font-serif text-3xl font-bold text-[#1C1917]">WhatsApp Lead Analytics</h1>
        <p className="text-xs text-[#78716C]">Track which products and pages generate direct WhatsApp enquiry clicks.</p>
      </div>

      <div className="bg-white border border-[#E7E5E4] overflow-x-auto shadow-sm">
        <table className="w-full text-left text-xs text-[#1C1917]">
          <thead className="bg-[#FAF8F5] text-[#78716C] uppercase tracking-wider text-[10px] border-b border-[#E7E5E4]">
            <tr>
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4">Source Page</th>
              <th className="py-3 px-4">CTA Clicked</th>
              <th className="py-3 px-4">Product Name</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E7E5E4]">
            {storeData.whatsAppLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-[#FAF8F5]">
                <td className="py-3 px-4 font-mono text-[#78716C]">{lead.timestamp}</td>
                <td className="py-3 px-4 font-medium">{lead.sourcePage}</td>
                <td className="py-3 px-4">
                  <span className="bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 border border-emerald-200">
                    {lead.ctaClicked}
                  </span>
                </td>
                <td className="py-3 px-4 font-bold text-[#7A1C30]">{lead.productName || 'General Store Enquiry'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
