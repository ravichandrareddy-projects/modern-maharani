'use client';

import React, { useState, useEffect } from 'react';
import { StoreData, Order, OrderStatus } from '@/lib/types';
import { PackageCheck, Clock, Phone, Mail, MapPin, Truck, Store, Check, Save, User, ShoppingBag, MessageCircle, Send } from 'lucide-react';

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

  const getWhatsAppOrderLink = (ord: Order) => {
    const rawPhone = ord.phone.replace(/[^0-9]/g, '');
    const phoneWithCountry = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone;
    const firstItem = ord.items[0];
    const itemSummary = firstItem
      ? `${firstItem.productName} (Size: ${firstItem.selectedSize})`
      : 'your outfits';

    const text = `Hello ${ord.customerName}! 🌸\nThis is Modern Maharani Showroom, KPHB Kukatpally.\n\nWe have updated your Order *${ord.orderNumber}* (${itemSummary}).\n\n📌 *Order Status*: ${ord.status}\n📍 *Delivery/Pickup*: ${ord.deliveryType}\n💰 *Total Amount*: ₹${ord.totalAmount.toLocaleString('en-IN')}\n\nThank you for choosing Modern Maharani!`;

    return `https://wa.me/${phoneWithCountry}?text=${encodeURIComponent(text)}`;
  };

  if (loading || !storeData) {
    return <div className="text-center py-20 text-sm uppercase tracking-widest text-[#78716C]">Loading Store Orders...</div>;
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E7E5E4]">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917]">Store Customer Orders</h1>
          <p className="text-sm text-[#78716C] mt-1">
            Manage incoming orders, customer WhatsApp contacts, pickup dates, and delivery addresses.
          </p>
        </div>

        {/* Filter Status Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedStatus('All')}
            className={`text-xs uppercase tracking-wider px-4 py-2 font-bold border transition-colors ${
              selectedStatus === 'All'
                ? 'bg-brand text-white border-transparent'
                : 'bg-white text-[#1C1917] border-[#E7E5E4] hover:border-[#1C1917]'
            }`}
          >
            All Orders ({ordersList.length})
          </button>
          {orderStatuses.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`text-xs uppercase tracking-wider px-4 py-2 font-bold border transition-colors ${
                selectedStatus === st
                  ? 'bg-brand text-white border-transparent'
                  : 'bg-white text-[#1C1917] border-[#E7E5E4] hover:border-[#1C1917]'
              }`}
            >
              {st} ({ordersList.filter((o) => o.status === st).length})
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white p-16 text-center text-[#78716C] border border-[#E7E5E4] shadow-sm">
          <PackageCheck size={48} className="mx-auto text-stone-300 mb-3" />
          <p className="font-serif text-xl text-[#1C1917]">No orders found for status "{selectedStatus}".</p>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredOrders.map((ord) => (
            <div
              key={ord.id}
              className="bg-white p-6 sm:p-8 border-2 border-[#E7E5E4] rounded-lg shadow-md space-y-6 transition-all hover:border-[#1C1917]"
            >
              {/* Top Banner: Prominent Order ID & Status */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b-2 border-[#FAF8F5]">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Large Readable Order ID */}
                    <span className="font-mono text-2xl sm:text-3xl font-black text-brand bg-brand/10 px-4 py-1.5 rounded border border-brand/20">
                      {ord.orderNumber}
                    </span>

                    {/* Delivery Badge */}
                    <span className="bg-[#1C1917] text-white text-xs font-bold px-3 py-1.5 uppercase tracking-wider rounded flex items-center gap-1.5">
                      {ord.deliveryType.includes('Pickup') ? <Store size={14} /> : <Truck size={14} />}
                      {ord.deliveryType}
                    </span>
                  </div>

                  <p className="text-xs text-[#78716C] flex items-center gap-1.5 pt-1">
                    <Clock size={14} /> Order Date: <span className="font-semibold text-[#1C1917]">{ord.createdAt}</span>
                  </p>
                </div>

                {/* Status Dropdown & 1-Click WhatsApp CTA */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 bg-[#FAF8F5] p-3 border border-[#E7E5E4] rounded-md">
                    <span className="text-xs uppercase font-bold text-[#1C1917]">Status:</span>
                    <select
                      value={ord.status}
                      onChange={(e) => handleUpdateOrder(ord.id, e.target.value as OrderStatus)}
                      className="text-sm font-bold p-2 bg-white border border-[#E7E5E4] text-brand focus:outline-none cursor-pointer"
                    >
                      {orderStatuses.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  <a
                    href={getWhatsAppOrderLink(ord)}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider px-4 py-3 rounded flex items-center gap-2 transition-colors shadow"
                  >
                    <MessageCircle size={16} /> WhatsApp Customer
                  </a>
                </div>
              </div>

              {/* Customer Contact Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#FAF8F5] p-5 border border-[#E7E5E4] rounded-md text-sm">
                <div className="space-y-1">
                  <span className="text-xs uppercase font-bold text-[#78716C] flex items-center gap-1">
                    <User size={14} className="text-brand" /> Customer Name:
                  </span>
                  <p className="font-serif text-lg font-bold text-[#1C1917]">{ord.customerName}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs uppercase font-bold text-[#78716C] flex items-center gap-1">
                    <Phone size={14} className="text-brand" /> Phone Number:
                  </span>
                  <p className="font-mono text-base font-bold text-[#1C1917] flex items-center gap-2">
                    <a href={`tel:${ord.phone}`} className="hover:text-brand hover:underline">{ord.phone}</a>
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs uppercase font-bold text-[#78716C]">Payment Choice:</span>
                  <p className="font-bold text-emerald-800 text-sm bg-emerald-100/80 px-2.5 py-1 inline-block border border-emerald-300 rounded">
                    {ord.paymentMethod}
                  </p>
                </div>
              </div>

              {/* Shipping Address (If Delivery) */}
              {ord.deliveryType === 'Home Delivery' && ord.shippingAddress && (
                <div className="p-4 bg-[#FAF8F5] border border-[#E7E5E4] rounded-md text-sm space-y-1">
                  <span className="font-bold uppercase text-xs text-brand flex items-center gap-1.5">
                    <MapPin size={15} /> Delivery Shipping Address:
                  </span>
                  <p className="text-[#1C1917] font-medium text-base leading-relaxed">{ord.shippingAddress}</p>
                </div>
              )}

              {/* Ordered Items Table */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#1C1917] flex items-center gap-2">
                  <ShoppingBag size={16} className="text-brand" /> Ordered Outfits & Sizes ({ord.items.length}):
                </h4>

                <div className="space-y-3">
                  {ord.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#FAF8F5] border border-[#E7E5E4] rounded-md gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-16 h-20 object-cover border border-[#E7E5E4] rounded shrink-0"
                        />
                        <div className="space-y-1">
                          <h5 className="font-serif text-lg font-bold text-[#1C1917]">{item.productName}</h5>
                          <div className="flex items-center gap-3 text-sm">
                            <span className="bg-brand text-white font-bold px-3 py-1 text-xs uppercase tracking-wider rounded">
                              Selected Size: {item.selectedSize}
                            </span>
                            <span className="font-bold text-[#1C1917]">Qty: {item.quantity}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs text-[#78716C] block">Unit Price: ₹{item.price.toLocaleString('en-IN')}</span>
                        <span className="font-bold text-xl text-brand block">
                          Total: ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Notes & Total Summary */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t-2 border-[#FAF8F5]">
                <div className="flex-1 w-full max-w-lg">
                  <label className="block text-xs uppercase font-bold text-[#78716C] mb-1">
                    Store Staff Internal Note (e.g. Pickup time / Courier Tracking):
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add note e.g. Customer picking up at 5 PM / Sent via Swiggy..."
                      defaultValue={ord.notes || ''}
                      onBlur={(e) => handleUpdateOrder(ord.id, ord.status, e.target.value)}
                      className="w-full text-sm p-3 bg-[#FAF8F5] border border-[#E7E5E4] text-[#1C1917] focus:outline-none focus:border-brand"
                    />
                  </div>
                  {savingId === ord.id && <span className="text-xs text-emerald-600 font-bold mt-1 block">Saved!</span>}
                </div>

                <div className="text-right space-y-1 shrink-0 bg-[#FAF8F5] p-4 border border-[#E7E5E4] rounded-md min-w-[240px]">
                  <div className="flex justify-between text-xs text-[#78716C]">
                    <span>Subtotal:</span>
                    <span>₹{ord.subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {ord.discountAmount > 0 && (
                    <div className="flex justify-between text-xs text-emerald-700 font-semibold">
                      <span>Discount ({ord.appliedCoupon}):</span>
                      <span>-₹{ord.discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold text-brand pt-2 border-t border-[#E7E5E4]">
                    <span>Order Total:</span>
                    <span>₹{ord.totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
