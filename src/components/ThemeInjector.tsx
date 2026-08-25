'use client';

import React, { useEffect } from 'react';

export default function ThemeInjector() {
  useEffect(() => {
    async function applyTheme() {
      try {
        const res = await fetch('/api/data');
        const data = await res.json();
        if (data.siteSettings) {
          const primary = data.siteSettings.primaryColor || '#7A1C30';
          const bg = data.siteSettings.backgroundColor || '#FAF8F5';
          const cardBg = data.siteSettings.cardBackgroundColor || '#FFFFFF';
          const textCol = data.siteSettings.textColor || '#1C1917';

          let styleEl = document.getElementById('dynamic-theme-style');
          if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = 'dynamic-theme-style';
            document.head.appendChild(styleEl);
          }

          styleEl.innerHTML = `
            :root {
              --primary-brand: ${primary} !important;
              --accent-wine: ${primary} !important;
              --bg-ivory: ${bg} !important;
              --bg-white: ${cardBg} !important;
              --text-charcoal: ${textCol} !important;
            }

            body {
              background-color: ${bg} !important;
              color: ${textCol} !important;
            }

            .bg-brand, .bg-\\[\\#7A1C30\\], [class*="bg-[#7A1C30]"], .bg-[#7A1C30] {
              background-color: ${primary} !important;
            }

            .text-brand, .text-\\[\\#7A1C30\\], [class*="text-[#7A1C30]"], .text-[#7A1C30] {
              color: ${primary} !important;
            }

            .border-brand, .border-\\[\\#7A1C30\\], [class*="border-[#7A1C30]"], .border-[#7A1C30] {
              border-color: ${primary} !important;
            }

            .bg-\\[\\#FAF8F5\\], .bg-[#FAF8F5], [class*="bg-[#FAF8F5]"] {
              background-color: ${bg} !important;
            }

            .bg-white, [class*="bg-white"] {
              background-color: ${cardBg} !important;
            }

            .text-\\[\\#1C1917\\], .text-[#1C1917], [class*="text-[#1C1917]"] {
              color: ${textCol} !important;
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
