'use client';

import React, { useState, useEffect } from 'react';
import { StoreData, Order, OrderStatus } from '@/lib/types';
import { ShoppingBag, Clock, Phone, Mail, MapPin, Truck, Store, Check, Save } from 'lucide-react';

export default function AdminOrdersPage() {
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
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

  const handleUpdateOrder = async (orderId: string, newStatus: OrderStatus, notes?: string) => {
    if (!storeData) return;
    setSavingId(orderId);

    const updatedOrders = (storeData.orders || []).map((ord) => {
      if (ord.id === orderId) {
        return {
          ...ord,
          status: newStatus,
          notes: notes !== undefined ? notes : ord.notes
        };
      }
      return ord;
    });

    const newStore = { ...storeData, orders: updatedOrders };

    try {
      await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus, notes })
      });
      setStoreData(newStore);
    } catch (e) {
      console.error(e);
    } finally {
      setSavingId(null);
    }
  };

  if (loading || !storeData) {
    return <div className="text-center py-20 text-xs uppercase tracking-widest text-[#78716C]">Loading Received Orders...</div>;
  }

  const ordersList = storeData.orders || [];
  const filteredOrders = ordersList.filter((ord) => {
    if (selectedStatus !== 'All' && ord.status !== selectedStatus) return false;
    return true;
  });

  const orderStatuses: OrderStatus[] = [
    'Pending',
    'Confirmed',
    'Processing',
    'Ready for Pickup / Out for Delivery',
    'Completed',
    'Cancelled'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E5E4]">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#1C1917]">Store Orders Management</h1>
          <p className="text-xs text-[#78716C]">View and manage incoming customer orders, delivery types, and payment statuses.</p>
        </div>

        {/* Filter Status Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedStatus('All')}
            className={`text-xs uppercase tracking-wider px-3 py-1.5 font-semibold border ${
              selectedStatus === 'All' ? 'bg-[#7A1C30] text-white border-[#7A1C30]' : 'bg-white text-[#1C1917]'
            }`}
          >
            All ({ordersList.length})
          </button>
          {orderStatuses.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`text-xs uppercase tracking-wider px-3 py-1.5 font-semibold border ${
                selectedStatus === st ? 'bg-[#7A1C30] text-white border-[#7A1C30]' : 'bg-white text-[#1C1917]'
              }`}
            >
              {st} ({ordersList.filter((o) => o.status === st).length})
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white p-12 text-center text-[#78716C] border border-[#E7E5E4]">
          No customer orders found matching this status filter.
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((ord) => (
            <div key={ord.id} className="bg-white p-6 border border-[#E7E5E4] shadow-sm space-y-4">
              {/* Order Top Summary */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E7E5E4]">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-xl font-bold text-[#7A1C30]">{ord.orderNumber}</span>
                    <span className="bg-stone-100 text-[#1C1917] text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider border border-[#E7E5E4]">
                      {ord.deliveryType}
                    </span>
                    <span className="text-[10px] text-[#78716C] flex items-center gap-1">
                      <Clock size={12} /> {ord.createdAt}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#78716C] pt-2">
                    <span className="font-bold text-[#1C1917]">{ord.customerName}</span>
                    <span className="flex items-center gap-1 font-semibold text-[#1C1917]">
                      <Phone size={13} className="text-[#7A1C30]" />
                      <a href={`tel:${ord.phone}`} className="hover:underline">{ord.phone}</a>
                    </span>
                    {ord.email && <span>Mail: {ord.email}</span>}
                    <span className="bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 border border-emerald-200">
                      Payment: {ord.paymentMethod}
                    </span>
                  </div>
                </div>

                {/* Status Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold text-[#78716C]">Order Status:</span>
                  <select
                    value={ord.status}
                    onChange={(e) => handleUpdateOrder(ord.id, e.target.value as OrderStatus)}
                    className="text-xs p-2 bg-[#FAF8F5] border border-[#E7E5E4] font-bold text-[#7A1C30]"
                  >
                    {orderStatuses.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Delivery Address (If Home Delivery) */}
              {ord.deliveryType === 'Home Delivery' && ord.shippingAddress && (
                <div className="p-3 bg-[#FAF8F5] border border-[#E7E5E4] text-xs space-y-1">
                  <span className="font-bold uppercase text-[#7A1C30] flex items-center gap-1">
                    <MapPin size={14} /> Shipping Address:
                  </span>
                  <p className="text-[#1C1917]">{ord.shippingAddress}</p>
                </div>
              )}

              {/* Items Table */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1917]">Ordered Items:</h4>
                <div className="space-y-2">
                  {ord.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 bg-[#FAF8F5] border border-[#E7E5E4] text-xs">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.productName} className="w-10 h-12 object-cover border border-[#E7E5E4]" />
                        <div>
                          <span className="font-bold text-[#1C1917] block">{item.productName}</span>
                          <span className="text-[10px] text-[#78716C]">Size: {item.selectedSize} | Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <span className="font-bold text-[#7A1C30]">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amount Breakdown & Staff Notes */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t border-[#E7E5E4] text-xs">
                <div className="flex-1 w-full">
                  <input
                    type="text"
                    placeholder="Add internal staff note (e.g. Dispatched via Swiggy/Courier)..."
                    defaultValue={ord.notes || ''}
                    onBlur={(e) => handleUpdateOrder(ord.id, ord.status, e.target.value)}
                    className="w-full text-xs p-2 bg-[#FAF8F5] border border-[#E7E5E4] text-[#1C1917]"
                  />
                  {savingId === ord.id && <span className="text-[10px] text-emerald-600 font-bold">Saved!</span>}
                </div>

                <div className="text-right space-y-1 shrink-0">
                  {ord.discountAmount > 0 && (
                    <span className="text-[11px] text-emerald-700 font-medium block">
                      Coupon ({ord.appliedCoupon}): -₹{ord.discountAmount.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="font-bold text-base text-[#7A1C30] block">
                    Total: ₹{ord.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
