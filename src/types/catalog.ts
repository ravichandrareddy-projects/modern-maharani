export interface CatalogInclusions {
  top?: string;
  bottom?: string;
  dupatta?: string;
}

export type AvailabilityStatus =
  | 'Available'
  | 'Limited Stock'
  | 'Out of Stock'
  | 'Coming Soon'
  | 'Check Availability';

export interface CatalogProduct {
  id: string;
  slug: string;
  title: string;
  sku: string;
  rootCategory: string; // e.g. 'dress-materials'
  subCategory: string;  // e.g. 'kota-cottons'
  leafCategory: string; // e.g. 'pure-handloom-kota-cotton'
  price: number;
  compareAtPrice?: number;
  stockQuantity: number;
  sizes: string[];
  fabrics: string[];
  crafts: string[];
  inclusions?: CatalogInclusions | string;
  images: string[];
  availability: AvailabilityStatus;
  isFreeShippingEligible: boolean;
  badges: string[];
  description: string;
  createdAt: string;
}

export interface TaxonomyCategory {
  id: string;
  slug: string;
  label: string;
  parentSlug?: string;
  description: string;
  image: string;
  featuredCard?: {
    title: string;
    description: string;
    image: string;
  };
}
