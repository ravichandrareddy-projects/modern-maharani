'use client';

import React, { useState, useEffect } from 'react';
import { StoreData, CustomerEnquiry, EnquiryStatus } from '@/lib/types';
import { MessageSquare, Check, Phone, Mail, Clock, Save } from 'lucide-react';

export default function AdminEnquiriesPage() {
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    loadStore();
  }, []);

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

  const handleStatusChange = async (enquiryId: string, newStatus: EnquiryStatus, notes?: string) => {
    if (!storeData) return;
    setSavingId(enquiryId);

    const updatedEnquiries = storeData.enquiries.map((enq) => {
      if (enq.id === enquiryId) {
        return {
          ...enq,
          status: newStatus,
          adminNotes: notes !== undefined ? notes : enq.adminNotes
        };
      }
      return enq;
    });

    const newStore = { ...storeData, enquiries: updatedEnquiries };

    try {
      await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStore)
      });
      setStoreData(newStore);
    } catch (e) {
      console.error(e);
    } finally {
      setSavingId(null);
    }
  };

  if (loading || !storeData) {
    return <div className="text-center py-20 text-xs uppercase tracking-widest text-[#78716C]">Loading Customer Enquiries...</div>;
  }

  const statusOptions: EnquiryStatus[] = [
    'New',
    'Contacted',
    'Interested',
    'Visit Planned',
    'Purchased',
    'Not Interested',
    'Closed'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-[#E7E5E4]">
        <h1 className="font-serif text-3xl font-bold text-[#1C1917]">Customer Enquiry Management</h1>
        <p className="text-xs text-[#78716C]">View incoming customer requests, update visit statuses and add staff notes.</p>
      </div>

      {/* Enquiry List */}
      {storeData.enquiries.length === 0 ? (
        <div className="bg-white p-12 text-center text-[#78716C] border border-[#E7E5E4]">
          No enquiries received yet. Form submissions will appear here.
        </div>
      ) : (
        <div className="space-y-4">
          {storeData.enquiries.map((enq) => (
            <div key={enq.id} className="bg-white p-6 border border-[#E7E5E4] shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#FAF8F5]">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-lg font-bold text-[#1C1917]">{enq.customerName}</h3>
                    <span className="text-[10px] text-[#78716C] flex items-center gap-1">
                      <Clock size={11} /> {enq.createdAt}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[#78716C] pt-1">
                    <span className="flex items-center gap-1 font-medium text-[#1C1917]">
                      <Phone size={13} className="text-[#7A1C30]" /> <a href={`tel:${enq.phone}`} className="hover:underline">{enq.phone}</a>
                    </span>
                    {enq.email && (
                      <span className="flex items-center gap-1">
                        <Mail size={13} /> {enq.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Status Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-semibold text-[#78716C]">Status:</span>
                  <select
                    value={enq.status}
                    onChange={(e) => handleStatusChange(enq.id, e.target.value as EnquiryStatus)}
                    className="text-xs p-2 bg-[#FAF8F5] border border-[#E7E5E4] font-semibold text-[#7A1C30]"
                  >
                    {statusOptions.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message Details */}
              <div className="space-y-2 text-xs">
                {enq.productName && (
                  <p className="font-semibold text-[#7A1C30]">
                    Interested Product: <span className="text-[#1C1917] font-normal">{enq.productName}</span>
                  </p>
                )}
                {enq.categoryInterested && (
                  <p className="font-semibold text-[#7A1C30]">
                    Category: <span className="text-[#1C1917] font-normal">{enq.categoryInterested}</span>
                  </p>
                )}
                <div className="p-3 bg-[#FAF8F5] border border-[#E7E5E4] text-[#1C1917]">
                  <p className="font-semibold text-[10px] uppercase text-[#78716C] mb-1">Customer Message:</p>
                  <p className="italic">"{enq.message}"</p>
                </div>
              </div>

              {/* Admin Staff Notes */}
              <div className="pt-2 flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Add internal staff note (e.g. Visit scheduled for Saturday 4 PM)..."
                  defaultValue={enq.adminNotes || ''}
                  onBlur={(e) => handleStatusChange(enq.id, enq.status, e.target.value)}
                  className="w-full text-xs p-2 bg-[#FAF8F5] border border-[#E7E5E4] text-[#1C1917]"
                />
                {savingId === enq.id && <span className="text-[10px] text-emerald-600 font-bold shrink-0">Saved!</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
