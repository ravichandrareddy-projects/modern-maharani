'use client';

import React, { useState } from 'react';
import { useCart } from '@/lib/cartContext';
import { DeliveryType, PaymentMethod } from '@/lib/types';
import { X, CheckCircle2, ShoppingBag, Truck, Store, CreditCard, ShieldCheck } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { cart, subtotal, discountAmount, totalAmount, appliedOffer, clearCart } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('Home Delivery');
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Cash on Delivery (COD)');
  const [submitting, setSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState<any>(null);

  if (!isOpen) return null;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim()) return;
    if (deliveryType === 'Home Delivery' && !shippingAddress.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          phone,
          email,
          deliveryType,
          shippingAddress,
          paymentMethod,
          items: cart,
          subtotal,
          discountAmount,
          appliedCoupon: appliedOffer ? appliedOffer.code : '',
          totalAmount
        })
      });

      const data = await res.json();
      if (data.success) {
        setOrderPlaced(data.order);
        clearCart();
      }
    } catch (err) {
      console.error('Checkout error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />

      <div className="relative bg-white max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#E7E5E4] z-10 space-y-6 max-h-[90vh] overflow-y-auto animate-fadeIn">
        <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4]">
          <div className="flex items-center gap-2">
            <ShoppingBag size={22} className="text-[#7A1C30]" />
            <h2 className="font-serif text-2xl font-bold text-[#1C1917]">Checkout & Order Placement</h2>
          </div>
          <button onClick={onClose} className="p-1 text-[#78716C] hover:text-[#1C1917]">
            <X size={22} />
          </button>
        </div>

        {orderPlaced ? (
          <div className="bg-emerald-50 border border-emerald-200 p-8 text-center space-y-4 text-emerald-900">
            <CheckCircle2 size={48} className="mx-auto text-emerald-600" />
            <h3 className="font-serif text-2xl font-bold">Order Successfully Placed!</h3>
            <p className="text-sm">
              Your Order ID: <span className="font-mono font-bold text-[#7A1C30] text-base">{orderPlaced.orderNumber}</span>
            </p>
            <p className="text-xs text-stone-600 max-w-md mx-auto">
              Thank you {orderPlaced.customerName}! Our Modern Maharani KPHB showroom team will contact you on <span className="font-bold">{orderPlaced.phone}</span> to confirm your order details.
            </p>
            <button
              onClick={onClose}
              className="mt-4 bg-[#7A1C30] text-white text-xs uppercase tracking-widest px-8 py-3 font-semibold hover:bg-[#5F1524] transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="space-y-6 text-xs">
            {/* Customer Contact */}
            <div className="space-y-3">
              <h3 className="font-semibold uppercase tracking-wider text-[#1C1917] border-b border-[#FAF8F5] pb-1">
                1. Customer Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E7E5E4] focus:outline-none focus:border-[#7A1C30]"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E7E5E4] focus:outline-none focus:border-[#7A1C30]"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Email Address (Optional)</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E7E5E4]"
                />
              </div>
            </div>

            {/* Delivery Option */}
            <div className="space-y-3">
              <h3 className="font-semibold uppercase tracking-wider text-[#1C1917] border-b border-[#FAF8F5] pb-1">
                2. Delivery / Pickup Option
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryType('Home Delivery')}
                  className={`p-3 border text-left flex items-center gap-2.5 transition-all ${
                    deliveryType === 'Home Delivery'
                      ? 'border-[#7A1C30] bg-[#7A1C30]/5 text-[#7A1C30] font-bold'
                      : 'border-[#E7E5E4] text-[#1C1917]'
                  }`}
                >
                  <Truck size={18} />
                  <div>
                    <p className="font-semibold">Home Delivery</p>
                    <p className="text-[10px] text-[#78716C] font-normal">Delivered to your address</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryType('Store Pickup at KPHB Showroom')}
                  className={`p-3 border text-left flex items-center gap-2.5 transition-all ${
                    deliveryType === 'Store Pickup at KPHB Showroom'
                      ? 'border-[#7A1C30] bg-[#7A1C30]/5 text-[#7A1C30] font-bold'
                      : 'border-[#E7E5E4] text-[#1C1917]'
                  }`}
                >
                  <Store size={18} />
                  <div>
                    <p className="font-semibold">Showroom Pickup</p>
                    <p className="text-[10px] text-[#78716C] font-normal">Pick up at KPHB Kukatpally</p>
                  </div>
                </button>
              </div>

              {deliveryType === 'Home Delivery' && (
                <div>
                  <label className="block font-semibold mb-1">Shipping Address *</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Enter complete house address, area, landmark, pincode..."
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E7E5E4] resize-none"
                  />
                </div>
              )}
            </div>

            {/* Payment Choice */}
            <div className="space-y-3">
              <h3 className="font-semibold uppercase tracking-wider text-[#1C1917] border-b border-[#FAF8F5] pb-1">
                3. Select Payment Method
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Cash on Delivery (COD)')}
                  className={`p-3 border text-center transition-all ${
                    paymentMethod === 'Cash on Delivery (COD)'
                      ? 'border-[#7A1C30] bg-[#7A1C30]/5 text-[#7A1C30] font-bold'
                      : 'border-[#E7E5E4] text-[#1C1917]'
                  }`}
                >
                  Cash on Delivery
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Pay at KPHB Showroom')}
                  className={`p-3 border text-center transition-all ${
                    paymentMethod === 'Pay at KPHB Showroom'
                      ? 'border-[#7A1C30] bg-[#7A1C30]/5 text-[#7A1C30] font-bold'
                      : 'border-[#E7E5E4] text-[#1C1917]'
                  }`}
                >
                  Pay at Showroom
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI / Online Payment')}
                  className={`p-3 border text-center transition-all ${
                    paymentMethod === 'UPI / Online Payment'
                      ? 'border-[#7A1C30] bg-[#7A1C30]/5 text-[#7A1C30] font-bold'
                      : 'border-[#E7E5E4] text-[#1C1917]'
                  }`}
                >
                  UPI / Pay on Call
                </button>
              </div>
            </div>

            {/* Order Summary Box */}
            <div className="bg-[#FAF8F5] p-4 border border-[#E7E5E4] space-y-2">
              <div className="flex justify-between">
                <span>Items Subtotal ({cart.length}):</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Discount ({appliedOffer?.code}):</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-[#7A1C30] pt-2 border-t border-[#E7E5E4]">
                <span>Total Amount Payable:</span>
                <span>₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#7A1C30] hover:bg-[#5F1524] text-white text-xs uppercase tracking-widest py-4 font-bold transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <ShieldCheck size={16} /> {submitting ? 'Placing Order...' : 'Confirm & Place Order'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
