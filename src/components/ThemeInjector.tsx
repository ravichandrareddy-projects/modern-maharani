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
          
          let styleEl = document.getElementById('dynamic-theme-style');
          if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = 'dynamic-theme-style';
            document.head.appendChild(styleEl);
          }
          
          styleEl.innerHTML = `
            :root {
              --primary-brand: ${color} !important;
              --accent-wine: ${color} !important;
            }
            .bg-\\[\\#7A1C30\\], [class*="bg-[#7A1C30]"], .bg-[#7A1C30] {
              background-color: ${color} !important;
            }
            .text-\\[\\#7A1C30\\], [class*="text-[#7A1C30]"], .text-[#7A1C30] {
              color: ${color} !important;
            }
            .border-\\[\\#7A1C30\\], [class*="border-[#7A1C30]"], .border-[#7A1C30] {
              border-color: ${color} !important;
            }
            .hover\\:bg-\\[\\#5F1524\\]:hover, .hover\\:bg-\\[\\#7A1C30\\]:hover, [class*="hover:bg-[#7A1C30]"]:hover {
              background-color: ${color} !important;
              filter: brightness(0.88);
            }
            .hover\\:text-\\[\\#7A1C30\\]:hover, [class*="hover:text-[#7A1C30]"]:hover {
              color: ${color} !important;
            }
          `;
        }
      } catch (e) {}
    }
    applyTheme();

    const interval = setInterval(applyTheme, 2000);
    return () => clearInterval(interval);
  }, []);

  return null;
}
