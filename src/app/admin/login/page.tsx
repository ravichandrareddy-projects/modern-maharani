'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, ArrowRight, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await res.json();
      if (data.success) {
        localStorage.setItem('mm_admin_auth', 'true');
        router.push('/admin');
      } else {
        setErrorMsg(data.message || 'Invalid Admin Password');
      }
    } catch (err) {
      setErrorMsg('Failed to connect to server');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1C1917] flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full p-8 shadow-2xl space-y-6 border border-[#E7E5E4]">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-[#7A1C30]/10 text-[#7A1C30] flex items-center justify-center mx-auto">
            <ShieldCheck size={24} />
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#1C1917]">MODERN MAHARANI</h1>
          <p className="text-xs text-[#78716C] uppercase tracking-widest font-semibold">Store Admin Login</p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 text-xs flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold uppercase tracking-wider text-[#1C1917] mb-1">
              Admin Password *
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-3 text-[#78716C]" />
              <input
                type="password"
                required
                placeholder="Enter admin password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-[#FAF8F5] border border-[#E7E5E4] focus:outline-none focus:border-[#7A1C30]"
              />
            </div>
            <p className="text-[10px] text-[#78716C] mt-1">Default Password: <code className="bg-stone-100 px-1 py-0.5 font-mono text-[#7A1C30]">maharani2026</code></p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#7A1C30] hover:bg-[#5F1524] text-white text-xs uppercase tracking-widest py-3.5 font-bold transition-colors flex items-center justify-center gap-2"
          >
            <span>{submitting ? 'Authenticating...' : 'Login to Admin CMS'}</span>
            <ArrowRight size={15} />
          </button>
        </form>
      </div>
    </div>
  );
}
