import React from 'react';

export default function LocalBusinessSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    "name": "Modern Maharani",
    "image": "https://modernmaharani.com/images/hero_banner.jpg",
    "@id": "https://modernmaharani.com/#showroom",
    "url": "https://modernmaharani.com",
    "telephone": "+919876543210",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Flat-101, MIG-37, Road Number 1, opposite Global Eye Hospital, beside Swiss Castle Line",
      "addressLocality": "KPHB Phase 1, Kukatpally",
      "addressRegion": "Telangana",
      "postalCode": "500072",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 17.488921,
      "longitude": 78.397082
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "10:30",
      "closes": "21:00"
    },
    "sameAs": [
      "https://instagram.com/modernmaharani_kphb",
      "https://youtube.com/@modernmaharani"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
