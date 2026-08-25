'use client';

import React, { useEffect } from 'react';

export default function ThemeInjector() {
  useEffect(() => {
    async function applyTheme() {
      try {
        const res = await fetch('/api/data');
        const data = await res.json();
        if (data.siteSettings && data.siteSettings.primaryColor) {
          const color = data.siteSettings.primaryColor;
          document.documentElement.style.setProperty('--primary-brand', color);
          document.documentElement.style.setProperty('--accent-wine', color);
        }
      } catch (e) {}
    }
    applyTheme();
  }, []);

  return null;
}
