export type AvailabilityStatus = 
  | 'Available' 
  | 'Limited Stock' 
  | 'Out of Stock' 
  | 'Coming Soon' 
  | 'Check Availability';

export type EnquiryStatus = 
  | 'New' 
  | 'Contacted' 
  | 'Interested' 
  | 'Visit Planned' 
  | 'Purchased' 
  | 'Not Interested' 
  | 'Closed';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string; // e.g. "Kurtis", "Dresses", "Occasion Wear", "New Arrivals"
  collectionSlug?: string; // e.g. "festive-edit-2026"
  price?: number;
  salePrice?: number;
  description: string;
  fabric?: string;
  sizes: string[]; // e.g. ["S", "M", "L", "XL", "XXL"]
  colors: string[];
  images: string[];
  availability: AvailabilityStatus;
  isNewArrival: boolean;
  isFeatured: boolean;
  tags: string[]; // e.g. ["Elegant", "Minimal", "Festive", "Contemporary", "Statement"]
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  description: string;
  heroImage: string;
  isFeatured: boolean;
  isPublished: boolean;
  startDate?: string;
  endDate?: string;
}

export interface Banner {
  id: string;
  headline: string;
  subheadline: string;
  image: string;
  ctaText: string;
  ctaDestination: string;
  active: boolean;
}

export interface CustomerEnquiry {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  productName?: string;
  productSlug?: string;
  categoryInterested?: string;
  message: string;
  status: EnquiryStatus;
  adminNotes?: string;
  createdAt: string;
}

export interface WhatsAppLead {
  id: string;
  productName?: string;
  productSlug?: string;
  sourcePage: string; // e.g. "Product Detail", "New Arrivals", "Catalog"
  ctaClicked: string; // e.g. "WhatsApp Enquire Button", "Sticky Mobile CTA"
  timestamp: string;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number; // 1 to 5
  reviewText: string;
  date: string;
  approved: boolean;
}

export interface VideoItem {
  id: string;
  title: string;
  youtubeUrl: string;
  embedId: string;
  thumbnail: string;
  featured: boolean;
}

export interface StoreInfo {
  name: string;
  tagline: string;
  addressLine: string;
  area: string;
  city: string;
  pincode: string;
  landmark: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
  openingHours: string;
}

export interface SiteSettings {
  heroHeadline: string;
  heroAlternativeHeadline: string;
  heroSupportingText: string;
  heroPrimaryCtaText: string;
  heroSecondaryCtaText: string;
  introHeading: string;
  introCopy: string;
  storeSectionHeading: string;
  storeSectionCopy: string;
  metaTitle: string;
  metaDescription: string;
}

export interface AnalyticsSummary {
  totalProducts: number;
  newArrivalsCount: number;
  enquiriesCount: number;
  whatsAppLeadsCount: number;
  pageViews: number;
  topCategory: string;
  topProduct: string;
}

export interface StoreData {
  products: Product[];
  categories: Category[];
  collections: Collection[];
  banners: Banner[];
  enquiries: CustomerEnquiry[];
  whatsAppLeads: WhatsAppLead[];
  reviews: Review[];
  videos: VideoItem[];
  storeInfo: StoreInfo;
  siteSettings: SiteSettings;
  analytics: AnalyticsSummary;
}
