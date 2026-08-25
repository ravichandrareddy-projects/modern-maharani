'use client';

import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('New Arrivals');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: name,
          phone,
          email,
          categoryInterested: category,
          message
        })
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setName('');
        setPhone('');
        setEmail('');
        setMessage('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 pb-6 border-b border-[#E7E5E4]">
        <span className="text-xs uppercase tracking-[0.25em] text-[#7A1C30] font-semibold">Get In Touch</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1C1917]">We'd Love To Hear From You</h1>
        <p className="text-xs sm:text-sm text-[#78716C] max-w-lg mx-auto">
          Have a question about outfit availability, custom sizing, or visiting our KPHB showroom? Send us an enquiry.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: Contact Form */}
        <div className="bg-white p-8 border border-[#E7E5E4] luxury-card-shadow space-y-6">
          <h2 className="font-serif text-2xl font-bold text-[#1C1917]">Send Showroom Enquiry</h2>

          {success ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 text-center space-y-2">
              <CheckCircle2 size={32} className="mx-auto text-emerald-600" />
              <h3 className="font-serif text-xl font-bold">Enquiry Submitted!</h3>
              <p className="text-xs">Thank you for contacting Modern Maharani. Our KPHB showroom team will respond shortly.</p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-4 bg-[#7A1C30] text-white text-xs uppercase tracking-widest px-4 py-2"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs p-3 bg-[#FAF8F5] border border-[#E7E5E4] focus:outline-none focus:border-[#7A1C30]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs p-3 bg-[#FAF8F5] border border-[#E7E5E4] focus:outline-none focus:border-[#7A1C30]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs p-3 bg-[#FAF8F5] border border-[#E7E5E4] focus:outline-none focus:border-[#7A1C30]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-1">
                  What are you looking for?
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-xs p-3 bg-[#FAF8F5] border border-[#E7E5E4] focus:outline-none focus:border-[#7A1C30]"
                >
                  <option value="New Arrivals">New Arrivals</option>
                  <option value="Kurtis">Kurtis</option>
                  <option value="Dresses">Dresses</option>
                  <option value="Occasion Wear">Occasion Wear</option>
                  <option value="Other">Other / Store Visit Enquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-1">
                  Message / Outfit Details
                </label>
                <textarea
                  rows={4}
                  placeholder="Share details about what you're looking for..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full text-xs p-3 bg-[#FAF8F5] border border-[#E7E5E4] focus:outline-none focus:border-[#7A1C30] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#7A1C30] hover:bg-[#5F1524] text-white text-xs uppercase tracking-widest py-4 font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Send size={15} /> {submitting ? 'Sending...' : 'Send Enquiry'}
              </button>
            </form>
          )}
        </div>

        {/* Right: Quick Contacts & Map */}
        <div className="space-y-6">
          <div className="bg-[#FAF8F5] p-8 border border-[#E7E5E4] space-y-6">
            <h2 className="font-serif text-2xl font-bold text-[#1C1917]">Direct Contact Channels</h2>

            <div className="space-y-4 text-xs text-[#78716C]">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 bg-white border border-[#E7E5E4] hover:border-[#25D366] transition-colors"
              >
                <MessageCircle size={20} className="text-[#25D366]" />
                <div>
                  <p className="font-semibold text-[#1C1917]">Instant WhatsApp Enquiry</p>
                  <p>Fastest way to get availability & pricing</p>
                </div>
              </a>

              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 p-3 bg-white border border-[#E7E5E4] hover:border-[#7A1C30] transition-colors"
              >
                <Phone size={20} className="text-[#7A1C30]" />
                <div>
                  <p className="font-semibold text-[#1C1917]">Call Showroom Desk</p>
                  <p>+91 98765 43210</p>
                </div>
              </a>

              <div className="flex items-start gap-3 p-3 bg-white border border-[#E7E5E4]">
                <MapPin size={20} className="text-[#7A1C30] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#1C1917]">Physical Showroom Address</p>
                  <p>Flat-101, MIG-37, Road Number 1, opposite Global Eye Hospital, beside Swiss Castle Line, KPHB Phase 1, Kukatpally, Hyderabad 500072</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white border border-[#E7E5E4]">
                <Clock size={20} className="text-[#7A1C30]" />
                <div>
                  <p className="font-semibold text-[#1C1917]">Operating Hours</p>
                  <p>Mon - Sun: 10:30 AM - 9:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
