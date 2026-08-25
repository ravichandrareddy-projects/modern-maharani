import fs from 'fs';
import path from 'path';
import { StoreData, Product, CustomerEnquiry, Order, Offer, Banner, Review, Category, Collection, StoreInfo, SiteSettings } from './types';

declare global {
  var _mm_store_data: StoreData | undefined;
}

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const DATA_FILE = path.join(DATA_DIR, 'store.json');
const TMP_DATA_FILE = path.join('/tmp', 'modern_maharani_store.json');

const INITIAL_STORE_DATA: StoreData = {
  storeInfo: {
    name: "Modern Maharani",
    tagline: "Contemporary Women's Fashion Showroom",
    addressLine: "Flat-101, MIG-37, Road Number 1",
    landmark: "opposite Global Eye Hospital, beside Swiss Castle Line",
    area: "KPHB Phase 1, Kukatpally",
    city: "Hyderabad, Telangana",
    pincode: "500072",
    phone: "+91 98765 43210",
    whatsappNumber: "919876543210",
    email: "enquire@modernmaharani.com",
    googleMapsUrl: "https://maps.google.com/?q=Modern+Maharani+KPHB+Phase+1+Kukatpally+Hyderabad",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.289417849646!2d78.397082!3d17.488921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb917d0a28a385%3A0x86b039474776b38c!2sKPHB%20Phase%201%2C%20Kukatpally%2C%20Hyderabad%2C%20Telangana%20500072!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    openingHours: "Mon - Sun: 10:30 AM - 9:00 PM"
  },
  siteSettings: {
    heroHeadline: "Style That Feels Like You.",
    heroAlternativeHeadline: "Discover Your Modern Maharani.",
    heroSupportingText: "Explore contemporary women's fashion at Modern Maharani, KPHB.",
    heroPrimaryCtaText: "Shop Collection",
    heroSecondaryCtaText: "Visit Showroom",
    introHeading: "Modern Fashion. Your Style.",
    introCopy: "Modern Maharani brings together contemporary women's fashion for women who want to feel confident, stylish and effortlessly themselves.",
    storeSectionHeading: "Come See It. Feel It. Try It.",
    storeSectionCopy: "Some outfits just look better when you see them in person. Visit Modern Maharani at KPHB and explore the collection for yourself.",
    metaTitle: "Modern Maharani | Women's Fashion Store in KPHB, Kukatpally, Hyderabad",
    metaDescription: "Shop contemporary Kurtis, dresses, shirts, and occasion wear at Modern Maharani in KPHB Phase 1, Kukatpally, Hyderabad. Order online or visit our showroom.",
    primaryColor: "#7A1C30",
    accentColor: "#C5A059",
    backgroundColor: "#FAF8F5",
    cardBackgroundColor: "#FFFFFF",
    textColor: "#1C1917",
    adminPasswordHash: "maharani2026"
  },
  offers: [
    {
      id: "off-1",
      code: "FESTIVE15",
      title: "Festive Season Special",
      description: "Get 15% OFF on all Kurtis & Occasion Wear",
      discountPercentage: 15,
      active: true,
      bannerText: "🎉 FESTIVE SALE: 15% OFF ON KURTIS & OCCASION WEAR — CODE: FESTIVE15"
    },
    {
      id: "off-2",
      code: "WELCOME10",
      title: "First Order Offer",
      description: "Get 10% OFF on your first showroom online order",
      discountPercentage: 10,
      active: true,
      bannerText: "✨ WELCOME OFFER: 10% OFF YOUR FIRST ORDER — CODE: WELCOME10"
    }
  ],
  categories: [
    {
      id: "cat-1",
      slug: "kurtis",
      name: "Kurtis",
      description: "Contemporary and everyday styles crafted with effortless elegance.",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "cat-2",
      slug: "dresses",
      name: "Dresses",
      description: "Modern silhouettes and chic cuts for every occasion.",
      image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "cat-3",
      slug: "occasion-wear",
      name: "Occasion Wear",
      description: "Statement looks crafted for celebrations and unforgettable moments.",
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "cat-4",
      slug: "shirts-tops",
      name: "Shirts & Tops",
      description: "Chic contemporary shirts, fusion tunics, and modern stylish tops.",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "cat-5",
      slug: "new-arrivals",
      name: "New Arrivals",
      description: "Fresh styles and seasonal edits hot off our showroom racks.",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop"
    }
  ],
  collections: [
    {
      id: "col-1",
      slug: "festive-edit-2026",
      title: "Festive Edit",
      description: "Vibrant hues, intricate embellishments, and graceful drapes for upcoming celebrations.",
      heroImage: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1200&auto=format&fit=crop",
      isFeatured: true,
      isPublished: true,
      startDate: "2026-01-01"
    },
    {
      id: "col-2",
      slug: "everyday-elegance",
      title: "Everyday Edit",
      description: "Breathable fabrics, tailored silhouettes, and understated elegance for daily wear.",
      heroImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
      isFeatured: true,
      isPublished: true,
      startDate: "2026-02-01"
    },
    {
      id: "col-3",
      slug: "occasion-edit",
      title: "Occasion Edit",
      description: "Sophisticated ensembles designed to make every evening memorable.",
      heroImage: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1200&auto=format&fit=crop",
      isFeatured: true,
      isPublished: true,
      startDate: "2026-02-15"
    }
  ],
  products: [
    {
      id: "prod-1",
      slug: "wine-embroidery-kurti-set",
      name: "Wine Embroidered Tunic & Trouser Set",
      category: "Kurtis",
      collectionSlug: "festive-edit-2026",
      price: 3490,
      salePrice: 2990,
      description: "A gorgeous deep wine tunic set with delicate golden threadwork and straight-cut trousers. Perfect for festive gatherings and intimate celebrations at Modern Maharani KPHB.",
      fabric: "Silk Blend",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Wine", "Burgundy"],
      images: [
        "/images/hero_banner.jpg",
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop"
      ],
      availability: "Available",
      isNewArrival: true,
      isFeatured: true,
      tags: ["Elegant", "Festive", "Statement"],
      seoTitle: "Wine Embroidered Kurti Set | Modern Maharani KPHB",
      seoDescription: "Shop deep wine embroidered kurti set at Modern Maharani showroom in KPHB Phase 1 Kukatpally.",
      createdAt: "2026-08-10"
    },
    {
      id: "prod-2",
      slug: "rose-chanderi-straight-kurti",
      name: "Rose Pink Chanderi Straight Kurti",
      category: "Kurtis",
      collectionSlug: "everyday-elegance",
      price: 2450,
      description: "Lightweight rose pink Chanderi kurti with delicate neck embroidery. Ideal for effortless day-to-evening dressing.",
      fabric: "Chanderi Cotton",
      sizes: ["M", "L", "XL"],
      colors: ["Rose Pink", "Soft Blush"],
      images: [
        "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop"
      ],
      availability: "Available",
      isNewArrival: true,
      isFeatured: false,
      tags: ["Minimal", "Contemporary", "Elegant"],
      seoTitle: "Rose Pink Chanderi Kurti | Modern Maharani KPHB",
      seoDescription: "Discover Rose Pink Chanderi Kurti in KPHB Kukatpally at Modern Maharani fashion showroom.",
      createdAt: "2026-08-12"
    },
    {
      id: "prod-3",
      slug: "champagne-tiered-anarkali-dress",
      name: "Champagne Tiered Anarkali Indo-Western Dress",
      category: "Dresses",
      collectionSlug: "occasion-edit",
      price: 4990,
      salePrice: 4490,
      description: "Modern tiered silhouette in champagne tone featuring subtle sequin highlight and breathable flowy fabric.",
      fabric: "Georgette",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Champagne", "Soft Gold"],
      images: [
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop"
      ],
      availability: "Limited Stock",
      isNewArrival: true,
      isFeatured: true,
      tags: ["Contemporary", "Statement", "Festive"],
      seoTitle: "Champagne Tiered Indo-Western Dress | Modern Maharani KPHB",
      seoDescription: "Shop Champagne Tiered Anarkali Dress at Modern Maharani fashion showroom in KPHB Kukatpally Hyderabad.",
      createdAt: "2026-08-14"
    },
    {
      id: "prod-4",
      slug: "emerald-velvet-occasion-suit",
      name: "Emerald Green Zari Embroidered Velvet Suit",
      category: "Occasion Wear",
      collectionSlug: "festive-edit-2026",
      price: 7200,
      description: "Royal emerald green velvet ensemble with gold zari neckline and scalloped dupatta.",
      fabric: "Micro Velvet & Organza",
      sizes: ["M", "L", "XL"],
      colors: ["Emerald Green"],
      images: [
        "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop"
      ],
      availability: "Available",
      isNewArrival: false,
      isFeatured: true,
      tags: ["Statement", "Festive", "Elegant"],
      seoTitle: "Emerald Velvet Occasion Suit | Modern Maharani KPHB",
      seoDescription: "Royal Emerald Velvet Suit at Modern Maharani Hyderabad Kukatpally.",
      createdAt: "2026-08-01"
    },
    {
      id: "prod-5",
      slug: "mustard-floral-fusion-dress",
      name: "Mustard Floral Print Fusion Dress",
      category: "Dresses",
      collectionSlug: "everyday-elegance",
      price: 3200,
      description: "Chic contemporary fusion dress with subtle gathers and belt detail for modern women.",
      fabric: "Crepe Silk",
      sizes: ["S", "M", "L"],
      colors: ["Mustard Yellow", "Warm Ochre"],
      images: [
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop"
      ],
      availability: "Available",
      isNewArrival: true,
      isFeatured: false,
      tags: ["Minimal", "Contemporary"],
      seoTitle: "Mustard Fusion Dress | Modern Maharani Kukatpally",
      seoDescription: "Contemporary Mustard Floral Fusion Dress available at Modern Maharani KPHB Hyderabad.",
      createdAt: "2026-08-16"
    },
    {
      id: "prod-6",
      slug: "powder-blue-georgette-flared-kurti",
      name: "Powder Blue Flared Georgette Kurti with Dupatta",
      category: "Kurtis",
      collectionSlug: "everyday-elegance",
      price: 2990,
      description: "Soft powder blue flared kurti set accented with subtle mirror embroidery and lightweight organza dupatta.",
      fabric: "Georgette & Organza",
      sizes: ["M", "L", "XL", "XXL"],
      colors: ["Powder Blue"],
      images: [
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop"
      ],
      availability: "Available",
      isNewArrival: true,
      isFeatured: true,
      tags: ["Elegant", "Minimal", "Contemporary"],
      seoTitle: "Powder Blue Georgette Kurti | Modern Maharani KPHB",
      seoDescription: "Flared Powder Blue Georgette Kurti set at Modern Maharani fashion store Kukatpally.",
      createdAt: "2026-08-17"
    },
    {
      id: "prod-7",
      slug: "silk-button-down-contemporary-shirt",
      name: "Contemporary Silk Button-Down Shirt",
      category: "Shirts & Tops",
      collectionSlug: "everyday-elegance",
      price: 2190,
      description: "Premium silk blend button-down shirt with mandarin collar. Designed for modern work and leisure styling.",
      fabric: "Raw Silk Blend",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Ivory White", "Rose Gold"],
      images: [
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop"
      ],
      availability: "Available",
      isNewArrival: true,
      isFeatured: true,
      tags: ["Contemporary", "Minimal"],
      seoTitle: "Silk Button-Down Shirt | Modern Maharani KPHB",
      seoDescription: "Shop contemporary Silk Button-Down Shirt at Modern Maharani KPHB Kukatpally Hyderabad.",
      createdAt: "2026-08-25"
    }
  ],
  banners: [
    {
      id: "ban-1",
      headline: "Style That Feels Like You.",
      subheadline: "Explore contemporary women's fashion at Modern Maharani, KPHB.",
      image: "/images/hero_banner.jpg",
      ctaText: "Shop Collection",
      ctaDestination: "/shop",
      active: true
    }
  ],
  orders: [
    {
      id: "ord-1",
      orderNumber: "MM-1001",
      customerName: "Radhika K.",
      phone: "+91 98490 12345",
      email: "radhika@example.com",
      deliveryType: "Store Pickup at KPHB Showroom",
      paymentMethod: "Pay at KPHB Showroom",
      items: [
        {
          productId: "prod-1",
          productName: "Wine Embroidered Tunic & Trouser Set",
          productSlug: "wine-embroidery-kurti-set",
          image: "/images/hero_banner.jpg",
          selectedSize: "XL",
          price: 2990,
          quantity: 1
        }
      ],
      subtotal: 2990,
      discountAmount: 448.5,
      appliedCoupon: "FESTIVE15",
      totalAmount: 2541.5,
      status: "Confirmed",
      notes: "Customer will pick up on Saturday 4 PM.",
      createdAt: "2026-08-25 11:30"
    }
  ],
  enquiries: [
    {
      id: "enq-1",
      customerName: "Sravanthi M.",
      phone: "+91 97001 88990",
      email: "sravanthi@example.com",
      productName: "Champagne Tiered Anarkali Indo-Western Dress",
      productSlug: "champagne-tiered-anarkali-dress",
      categoryInterested: "Dresses",
      message: "Could you share the size chart for the Champagne dress?",
      status: "Contacted",
      adminNotes: "Sent size details via SMS/Phone.",
      createdAt: "2026-08-24 14:15"
    }
  ],
  reviews: [
    {
      id: "rev-1",
      customerName: "Ananya Reddy",
      rating: 5,
      reviewText: "Modern Maharani at KPHB has the best contemporary Kurti and Dress collections! Ordering online and picking up at the store was super smooth.",
      date: "2026-08-05",
      approved: true
    },
    {
      id: "rev-2",
      customerName: "Priya Sharma",
      rating: 5,
      reviewText: "Visited the store opposite Global Eye Hospital last week. Beautiful ambiance and lovely occasion wear!",
      date: "2026-08-11",
      approved: true
    },
    {
      id: "rev-3",
      customerName: "Sneha Rao",
      rating: 5,
      reviewText: "Super stylish dresses and daily wear Kurtis. Loved the online store experience.",
      date: "2026-08-15",
      approved: true
    }
  ],
  analytics: {
    totalProducts: 7,
    newArrivalsCount: 6,
    enquiriesCount: 1,
    ordersCount: 1,
    totalRevenue: 2541.5,
    pageViews: 1850,
    topCategory: "Kurtis",
    topProduct: "Wine Embroidered Tunic & Trouser Set"
  }
};

export function getStoreData(): StoreData {
  if (globalThis._mm_store_data) {
    return globalThis._mm_store_data;
  }

  // Check /tmp file first
  try {
    if (fs.existsSync(TMP_DATA_FILE)) {
      const raw = fs.readFileSync(TMP_DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw) as StoreData;
      globalThis._mm_store_data = parsed;
      return parsed;
    }
  } catch (e) {}

  // Check workspace file
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw) as StoreData;
      globalThis._mm_store_data = parsed;
      return parsed;
    }
  } catch (e) {}

  globalThis._mm_store_data = INITIAL_STORE_DATA;
  return INITIAL_STORE_DATA;
}

export function saveStoreData(data: StoreData): void {
  globalThis._mm_store_data = data;
  try {
    fs.writeFileSync(TMP_DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {}
  try {
    if (fs.existsSync(DATA_DIR)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    }
  } catch (e) {}
}
