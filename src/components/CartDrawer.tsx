'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/lib/cartContext';
import CheckoutModal from './CheckoutModal';
import { Offer } from '@/lib/types';
import { X, ShoppingBag, Plus, Minus, Trash2, Tag, ArrowRight } from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    totalAmount,
    appliedOffer,
    applyCoupon,
    removeCoupon,
    isCartOpen,
    setIsCartOpen
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ success: boolean; text: string } | null>(null);
  const [availableOffers, setAvailableOffers] = useState<Offer[]>([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    async function fetchOffers() {
      try {
        const res = await fetch('/api/data');
        const data = await res.json();
        if (data.offers) setAvailableOffers(data.offers);
      } catch (e) {}
    }
    fetchOffers();
  }, []);

  if (!isCartOpen) return null;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode) return;
    const res = applyCoupon(couponCode, availableOffers);
    setCouponMsg({ success: res.success, text: res.message });
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setIsCartOpen(false)}
        />

        {/* Drawer */}
        <div className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col justify-between p-6 overflow-y-auto animate-fadeIn border-l border-[#E7E5E4]">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4]">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-[#7A1C30]" />
                <h2 className="font-serif text-xl font-bold text-[#1C1917]">Your Shopping Cart</h2>
                <span className="bg-[#7A1C30] text-white text-[10px] px-2 py-0.5 font-bold rounded-full">
                  {cart.length}
                </span>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-1 text-[#78716C] hover:text-[#1C1917]">
                <X size={20} />
              </button>
            </div>

            {/* Cart Items List */}
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-4 text-[#78716C]">
                <ShoppingBag size={48} className="mx-auto text-stone-300 stroke-[1.5]" />
                <p className="font-serif text-lg text-[#1C1917]">Your cart is currently empty.</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-[#7A1C30] text-white text-xs uppercase tracking-widest px-6 py-2.5 font-semibold"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4 my-6">
                {cart.map((item, idx) => (
                  <div key={`${item.productId}-${item.selectedSize}-${idx}`} className="flex gap-4 p-3 bg-[#FAF8F5] border border-[#E7E5E4] luxury-card-shadow">
                    <div className="w-16 h-20 bg-stone-200 overflow-hidden shrink-0 border border-[#E7E5E4]">
                      <img src={item.image} alt={item.productName} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 flex flex-col justify-between text-xs">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif font-bold text-[#1C1917] line-clamp-1">{item.productName}</h4>
                          <button
                            onClick={() => removeFromCart(item.productId, item.selectedSize)}
                            className="text-[#78716C] hover:text-red-600 p-0.5"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-[10px] text-[#78716C] uppercase pt-0.5">Size: <span className="font-semibold text-[#1C1917]">{item.selectedSize}</span></p>
                        <p className="font-bold text-[#7A1C30] pt-1">₹{item.price.toLocaleString('en-IN')}</p>
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <button
                          onClick={() => updateQuantity(item.productId, item.selectedSize, item.quantity - 1)}
                          className="w-6 h-6 border border-[#E7E5E4] bg-white flex items-center justify-center text-[#1C1917] hover:bg-[#7A1C30] hover:text-white transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-semibold text-xs min-w-[16px] text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.selectedSize, item.quantity + 1)}
                          className="w-6 h-6 border border-[#E7E5E4] bg-white flex items-center justify-center text-[#1C1917] hover:bg-[#7A1C30] hover:text-white transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {cart.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-[#E7E5E4] text-xs">
              {/* Coupon Code Input */}
              <div>
                {appliedOffer ? (
                  <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold">
                    <span className="flex items-center gap-1">
                      <Tag size={13} /> {appliedOffer.code} ({appliedOffer.discountPercentage}% OFF)
                    </span>
                    <button onClick={removeCoupon} className="text-emerald-900 underline text-[10px]">Remove</button>
                  </div>
                ) : (
                  <form onSubmit={handleApply} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. FESTIVE15)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full text-xs p-2 bg-[#FAF8F5] border border-[#E7E5E4] uppercase font-semibold"
                    />
                    <button
                      type="submit"
                      className="bg-[#1C1917] text-white px-3 py-2 uppercase font-bold text-[10px] shrink-0"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponMsg && (
                  <p className={`text-[10px] pt-1 font-medium ${couponMsg.success ? 'text-emerald-700' : 'text-red-600'}`}>
                    {couponMsg.text}
                  </p>
                )}
              </div>

              {/* Subtotal Calculation */}
              <div className="space-y-1 text-[#78716C]">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-[#1C1917] font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount ({appliedOffer?.code}):</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-[#7A1C30] pt-2 border-t border-[#E7E5E4]">
                  <span>Total Amount:</span>
                  <span>₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setCheckoutOpen(true);
                }}
                className="w-full bg-[#7A1C30] hover:bg-[#5F1524] text-white text-xs uppercase tracking-widest py-3.5 font-bold transition-all shadow-md flex items-center justify-center gap-2"
              >
                Proceed to Checkout <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </>
  );
}
