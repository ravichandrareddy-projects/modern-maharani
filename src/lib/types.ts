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

export type OrderStatus = 
  | 'Pending' 
  | 'Confirmed' 
  | 'Processing' 
  | 'Ready for Pickup / Out for Delivery' 
  | 'Completed' 
  | 'Cancelled';

export type PaymentMethod = 
  | 'Cash on Delivery (COD)' 
  | 'Pay at KPHB Showroom' 
  | 'UPI / Online Payment';

export type DeliveryType = 
  | 'Home Delivery' 
  | 'Store Pickup at KPHB Showroom';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  collectionSlug?: string;
  price?: number;
  salePrice?: number;
  description: string;
  fabric?: string;
  sizes: string[];
  colors: string[];
  images: string[];
  availability: AvailabilityStatus;
  isNewArrival: boolean;
  isFeatured: boolean;
  tags: string[];
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

export interface OrderItem {
  productId: string;
  productName: string;
  productSlug: string;
  image: string;
  selectedSize: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. "MM-1001"
  customerName: string;
  phone: string;
  email?: string;
  deliveryType: DeliveryType;
  shippingAddress?: string;
  paymentMethod: PaymentMethod;
  items: OrderItem[];
  subtotal: number;
  discountAmount: number;
  appliedCoupon?: string;
  totalAmount: number;
  status: OrderStatus;
  notes?: string;
  createdAt: string;
}

export interface Offer {
  id: string;
  code: string;
  title: string;
  description: string;
  discountPercentage: number;
  active: boolean;
  bannerText: string;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  reviewText: string;
  date: string;
  approved: boolean;
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
  primaryColor: string;
  accentColor: string;
  adminPasswordHash: string; // Default password
}

export interface AnalyticsSummary {
  totalProducts: number;
  newArrivalsCount: number;
  enquiriesCount: number;
  ordersCount: number;
  totalRevenue: number;
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
  orders: Order[];
  offers: Offer[];
  reviews: Review[];
  storeInfo: StoreInfo;
  siteSettings: SiteSettings;
  analytics: AnalyticsSummary;
}
