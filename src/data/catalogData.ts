import { CatalogProduct, TaxonomyCategory } from '../types/catalog';

export const TAXONOMY_CATEGORIES: TaxonomyCategory[] = [
  {
    "id": "cat-dm",
    "slug": "dress-materials",
    "label": "Dress Materials (Unstitched)",
    "description": "Bespoke unstitched dress materials inKota, Raw Silk, Jute, Tussar, and Ajrakh prints.",
    "image": "/images/cat_dress_materials.jpg",
    "featuredCard": {
      "title": "Handloom Kota & Silk Edit",
      "description": "Explore Kutch embroidery, Jamdani booties, and Ajrakh block prints.",
      "image": "/images/inventory/Embroidered_beige_tussar_silk_fa…_202609082126.jpeg"
    }
  },
  {
    "id": "sub-dm-1",
    "parentSlug": "dress-materials",
    "slug": "kota-cottons",
    "label": "Kota & Cottons",
    "description": "Lightweight Kota Doria and breathable pure cotton unstitched sets.",
    "image": "/images/inventory/Cotton_dress_material_set_displayed_202609082126.jpeg"
  },
  {
    "id": "sub-dm-2",
    "parentSlug": "dress-materials",
    "slug": "silks-blends",
    "label": "Silks & Handloom Blends",
    "description": "Royal raw silk, jute silk with maggam work, Tussar and shimmering tissue silk.",
    "image": "/images/inventory/Embroidered_beige_tussar_silk_fa…_202609082126.jpeg"
  },
  {
    "id": "sub-dm-3",
    "parentSlug": "dress-materials",
    "slug": "traditional-crafts",
    "label": "Traditional Prints & Crafts",
    "description": "Heritage natural dye Ajrakh block prints, Kalamkari pen-work, and Sanganeri theme prints.",
    "image": "/images/inventory/Ajrakh_dress_material_flat-lay_a…_202609082126.jpeg"
  },
  {
    "id": "cat-re",
    "slug": "readymade-ethnic",
    "label": "Readymades & Kurtas",
    "description": "Pre-stitched 3-piece suit sets, flared Anarkalis, co-ords, and formal office kurtis.",
    "image": "/images/cat_readymades.jpg",
    "featuredCard": {
      "title": "Lucknowi Chikankari & Anarkalis",
      "description": "Tailored ready-to-wear silhouettes crafted for modern elegance.",
      "image": "/images/inventory/Gadwal_silk_saree_back_view_202609082126.jpeg"
    }
  },
  {
    "id": "sub-re-1",
    "parentSlug": "readymade-ethnic",
    "slug": "three-piece-sets",
    "label": "3-Piece Stitched Suit Sets",
    "description": "Complete stitched sets featuring Kurta, Pant, and Dupatta.",
    "image": "/images/inventory/Cotton_suit_set_with_dupatta_202609082126.jpeg"
  },
  {
    "id": "sub-re-2",
    "parentSlug": "readymade-ethnic",
    "slug": "frocks-anarkalis",
    "label": "Frocks & Flared Anarkalis",
    "description": "Breezy Jaipur cotton tiered frocks and grand festive floor-length Anarkalis.",
    "image": "/images/inventory/Crop_top_and_flared_skirt_202609082126.jpeg"
  },
  {
    "id": "sub-re-3",
    "parentSlug": "readymade-ethnic",
    "slug": "indo-western",
    "label": "Modern & Indo-Western",
    "description": "Contemporary co-ord sets, tunic-palazzo pairings, and fusion midi tunics.",
    "image": "/images/inventory/Co-ord_set_back_view_202609082126.jpeg"
  },
  {
    "id": "sub-re-4",
    "parentSlug": "readymade-ethnic",
    "slug": "partywear",
    "label": "Occasion & Partywear",
    "description": "Velvet crop top lehengas with organza cape shrugs for weddings and galas.",
    "image": "/images/inventory/Crop_top_and_flared_skirt_202609082126.jpeg"
  },
  {
    "id": "sub-re-5",
    "parentSlug": "readymade-ethnic",
    "slug": "daily-kurtis",
    "label": "Daily & Workwear Kurtis",
    "description": "Comfortable slub rayon office kurtis and A-line casual everyday wear.",
    "image": "/images/inventory/Kurti_hanging_on_wooden_hanger_202609082126.jpeg"
  },
  {
    "id": "cat-sr",
    "slug": "sarees",
    "label": "Sarees",
    "description": "Handloom Kota Doria, Muslin Jamdani, Gadwal Silk Pattu, and Kalamkari georgettes.",
    "image": "/images/cat_sarees.jpg",
    "featuredCard": {
      "title": "Gadwal Pattu & Jamdani Weaves",
      "description": "Traditional Kuttu borders and featherweight drapes for grand occasions.",
      "image": "/images/cat_dress_materials.jpg"
    }
  },
  {
    "id": "sub-sr-1",
    "parentSlug": "sarees",
    "slug": "handloom-sarees",
    "label": "Handloom & Lightweight Drapes",
    "description": "Pure Kota Doria with zari borders and Muslin Jamdani woven drapes.",
    "image": "/images/inventory/Folded_Jamdani_saree_with_flowers_202609082126.jpeg"
  },
  {
    "id": "sub-sr-2",
    "parentSlug": "sarees",
    "slug": "silk-sarees",
    "label": "Silk & Festive Sarees",
    "description": "Authentic Gadwal Pattu with temple borders and dual-tone soft silks.",
    "image": "/images/inventory/Gadwal_silk_saree_back_view_202609082126.jpeg"
  },
  {
    "id": "sub-sr-3",
    "parentSlug": "sarees",
    "slug": "casual-sarees",
    "label": "Casual & Printed Sarees",
    "description": "Flowing Kalamkari chiffon drapes and daily-wear organic linen-cotton sarees.",
    "image": "/images/inventory/Kalamkari_printed_saree_draped_202609082126.jpeg"
  },
  {
    "id": "cat-bs",
    "slug": "budget-store",
    "label": "Budget Store",
    "description": "Wholesale value tiers under ₹899 and ₹1,199 with free shipping perks.",
    "image": "/images/cat_budget.jpg",
    "featuredCard": {
      "title": "Under ₹899 & ₹1,199 Value Bundles",
      "description": "Unbeatable prices on daily office suits, kurtis, and semi-kota sets.",
      "image": "/images/cat_readymades.jpg"
    }
  },
  {
    "id": "sub-bs-1",
    "parentSlug": "budget-store",
    "slug": "under-899",
    "label": "Under ₹899 Store",
    "description": "Wholesale value sets and daily kurti multi-packs under ₹899.",
    "image": "/images/inventory/Green_and_brown_cotton_suit_202609082126.jpeg"
  },
  {
    "id": "sub-bs-2",
    "parentSlug": "budget-store",
    "slug": "under-1199",
    "label": "Under ₹1,199 Store",
    "description": "Premium cotton printed suit sets and budget semi-kota mirror work sets.",
    "image": "/images/inventory/Maroon_and_mustard_dress_material_202609082126.jpeg"
  },
  {
    "id": "sub-bs-3",
    "parentSlug": "budget-store",
    "slug": "store-perks",
    "label": "Special Perks & Wholesale",
    "description": "Free shipping eligible items, ready to dispatch, and wholesale bulk lots.",
    "image": "/images/inventory/Cotton_salwar_suit_material_disp…_202609082126.jpeg"
  }
];

export const SEEDED_PRODUCTS: CatalogProduct[] = [
  {
    "id": "prod-dm-01",
    "slug": "pure-handloom-kota-cotton-kutch-mirror",
    "title": "Pure Handloom Kota Cotton (Kutch Work & Mirror Borders)",
    "sku": "MM-DM-KC-001",
    "rootCategory": "dress-materials",
    "subCategory": "kota-cottons",
    "leafCategory": "pure-handloom-kota-cotton",
    "price": 1890,
    "compareAtPrice": 2490,
    "stockQuantity": 12,
    "sizes": [
      "Unstitched"
    ],
    "fabrics": [
      "Kota Cotton",
      "Pure Handloom"
    ],
    "crafts": [
      "Kutch Embroidery",
      "Mirror Work"
    ],
    "inclusions": {
      "top": "2.5m",
      "bottom": "2.5m",
      "dupatta": "2.4m"
    },
    "images": [
      "/images/inventory/Cotton_dress_material_set_displayed_202609082126.jpeg",
      "/images/inventory/Cotton_fabric_with_elephant_print_202609082126.jpeg",
      "/images/inventory/Cotton_salwar_suit_fabric_202609082126.jpeg",
      "/images/inventory/Cotton_salwar_suit_material_disp…_202609082126.jpeg"
    ],
    "availability": "Available",
    "isFreeShippingEligible": true,
    "badges": [
      "Pure Handloom",
      "Mirror Work",
      "Kutch Craft"
    ],
    "description": "Pure Kota Doria cotton fabric with handcrafted Kutchi geometric threadwork along the neck yoke and real micro-mirror borders. Includes lightweight breathable dupatta.",
    "createdAt": "2026-09-09T18:00:00Z"
  },
  {
    "id": "prod-dm-02",
    "slug": "semi-kota-block-printed-suit-set",
    "title": "Semi-Kota Block Printed Suit Set",
    "sku": "MM-DM-KC-002",
    "rootCategory": "dress-materials",
    "subCategory": "kota-cottons",
    "leafCategory": "semi-kota-printed-sets",
    "price": 1290,
    "compareAtPrice": 1690,
    "stockQuantity": 15,
    "sizes": [
      "Unstitched"
    ],
    "fabrics": [
      "Semi-Kota",
      "Cotton Blend"
    ],
    "crafts": [
      "Hand Block Print"
    ],
    "inclusions": {
      "top": "2.5m",
      "bottom": "2.0m",
      "dupatta": "2.25m"
    },
    "images": [
      "/images/inventory/Cotton_dress_material_set_displayed_202609082126.jpeg",
      "/images/inventory/Cotton_fabric_with_elephant_print_202609082126.jpeg",
      "/images/inventory/Cotton_salwar_suit_fabric_202609082126.jpeg",
      "/images/inventory/Cotton_salwar_suit_material_disp…_202609082126.jpeg"
    ],
    "availability": "Available",
    "isFreeShippingEligible": true,
    "badges": [
      "Block Print",
      "Fast Moving"
    ],
    "description": "Semi-Kota blended fabric adorned with traditional floral block prints, paired with a printed matching cotton-blend dupatta.",
    "createdAt": "2026-09-09T17:55:00Z"
  },
  {
    "id": "prod-dm-03",
    "slug": "fine-chanderi-cotton-silk-suit-material",
    "title": "Fine Chanderi Cotton Silk Suit Material",
    "sku": "MM-DM-KC-003",
    "rootCategory": "dress-materials",
    "subCategory": "kota-cottons",
    "leafCategory": "fine-cotton-chanderi",
    "price": 2190,
    "compareAtPrice": 2890,
    "stockQuantity": 8,
    "sizes": [
      "Unstitched"
    ],
    "fabrics": [
      "Chanderi Silk",
      "Cotton Silk"
    ],
    "crafts": [
      "Zari Patti",
      "Banarasi Booti"
    ],
    "inclusions": {
      "top": "2.5m",
      "bottom": "2.5m",
      "dupatta": "2.4m"
    },
    "images": [
      "/images/inventory/Cotton_dress_material_set_displayed_202609082126.jpeg",
      "/images/inventory/Cotton_fabric_with_elephant_print_202609082126.jpeg",
      "/images/inventory/Cotton_salwar_suit_fabric_202609082126.jpeg",
      "/images/inventory/Cotton_salwar_suit_material_disp…_202609082126.jpeg"
    ],
    "availability": "Available",
    "isFreeShippingEligible": true,
    "badges": [
      "Chanderi Weave",
      "Zari Patti"
    ],
    "description": "Lightweight mercerized Chanderi weave top with fine zari patti borders, plain Shantoon bottom, and gold woven organza dupatta.",
    "createdAt": "2026-09-09T17:50:00Z"
  },
  {
    "id": "prod-dm-04",
    "slug": "raw-silk-suit-jamdani-woven-booties",
    "title": "Raw Silk Suit with Jamdani Woven Booties",
    "sku": "MM-DM-SB-004",
    "rootCategory": "dress-materials",
    "subCategory": "silks-blends",
    "leafCategory": "raw-silk-jamdani",
    "price": 2790,
    "compareAtPrice": 3490,
    "stockQuantity": 10,
    "sizes": [
      "Unstitched"
    ],
    "fabrics": [
      "Raw Silk",
      "Banarasi Silk"
    ],
    "crafts": [
      "Extra-Weft Jamdani"
    ],
    "inclusions": {
      "top": "2.5m",
      "bottom": "2.5m",
      "dupatta": "2.4m"
    },
    "images": [
      "/images/inventory/Folded_Jamdani_saree_with_flowers_202609082126.jpeg",
      "/images/inventory/Jamdani_saree_arrangement_displayed_202609082126.jpeg",
      "/images/inventory/Jamdani_saree_floral_pattern_macro_202609082126.jpeg",
      "/images/inventory/Jamdani_saree_on_studio_floor_202609082126.jpeg"
    ],
    "availability": "Available",
    "isFreeShippingEligible": true,
    "badges": [
      "Pure Raw Silk",
      "Jamdani Woven"
    ],
    "description": "100% natural Raw Silk top featuring authentic Jacquard/Jamdani extra-weft thread booties (not printed), matching raw silk bottom, and rich woven dupatta.",
    "createdAt": "2026-09-09T17:45:00Z"
  },
  {
    "id": "prod-dm-05",
    "slug": "jute-silk-suit-hand-maggam-zardozi-yoke",
    "title": "Jute Silk Suit with Hand Maggam & Zardozi Yoke",
    "sku": "MM-DM-SB-005",
    "rootCategory": "dress-materials",
    "subCategory": "silks-blends",
    "leafCategory": "jute-silk-maggam",
    "price": 3290,
    "compareAtPrice": 4200,
    "stockQuantity": 6,
    "sizes": [
      "Unstitched"
    ],
    "fabrics": [
      "Jute Silk",
      "Organza"
    ],
    "crafts": [
      "Maggam & Zardozi",
      "Cutwork Beads"
    ],
    "inclusions": {
      "top": "2.5m",
      "bottom": "2.5m",
      "dupatta": "2.4m"
    },
    "images": [
      "/images/inventory/Embroidered_beige_tussar_silk_fa…_202609082126.jpeg",
      "/images/inventory/Embroidered_silk_fabric_flat_lay_202609082126.jpeg",
      "/images/inventory/Embroidered_silk_fabric_set_display_202609082126.jpeg",
      "/images/inventory/Gadwal_silk_saree_back_view_202609082126.jpeg"
    ],
    "availability": "Available",
    "isFreeShippingEligible": true,
    "badges": [
      "Hand Maggam",
      "Zardozi Craft"
    ],
    "description": "Textured raw Jute Silk featuring antique gold zari embroidery, cutwork beads, micro-pearl Maggam craft on the neckline, accompanied by sheer organza dupatta.",
    "createdAt": "2026-09-09T17:40:00Z"
  },
  {
    "id": "prod-dm-06",
    "slug": "pure-tussar-silk-floral-thread-kantha",
    "title": "Pure Tussar Silk with Floral Thread Kantha Motifs",
    "sku": "MM-DM-SB-006",
    "rootCategory": "dress-materials",
    "subCategory": "silks-blends",
    "leafCategory": "tussar-silk-embroidered",
    "price": 3490,
    "compareAtPrice": 4500,
    "stockQuantity": 7,
    "sizes": [
      "Unstitched"
    ],
    "fabrics": [
      "Wild Tussar Silk"
    ],
    "crafts": [
      "Kantha Embroidery",
      "Resham Threadwork"
    ],
    "inclusions": {
      "top": "2.5m",
      "bottom": "2.5m",
      "dupatta": "2.4m"
    },
    "images": [
      "/images/inventory/Embroidered_beige_tussar_silk_fa…_202609082126.jpeg",
      "/images/inventory/Embroidered_silk_fabric_flat_lay_202609082126.jpeg",
      "/images/inventory/Embroidered_silk_fabric_set_display_202609082126.jpeg",
      "/images/inventory/Gadwal_silk_saree_back_view_202609082126.jpeg"
    ],
    "availability": "Available",
    "isFreeShippingEligible": true,
    "badges": [
      "Pure Tussar",
      "Kantha Work"
    ],
    "description": "Earthy textured wild Tussar silk top panel decorated with multi-colored thread embroidery, paired with solid silk bottom and matching embroidered Tussar dupatta.",
    "createdAt": "2026-09-09T17:35:00Z"
  },
  {
    "id": "prod-dm-07",
    "slug": "tissue-semi-tussar-festive-suit-set",
    "title": "Tissue & Semi-Tussar Festive Suit Set",
    "sku": "MM-DM-SB-007",
    "rootCategory": "dress-materials",
    "subCategory": "silks-blends",
    "leafCategory": "semi-tussar-tissue-silk",
    "price": 2490,
    "compareAtPrice": 3200,
    "stockQuantity": 9,
    "sizes": [
      "Unstitched"
    ],
    "fabrics": [
      "Tissue Silk",
      "Semi-Tussar"
    ],
    "crafts": [
      "Gold Zari Weave"
    ],
    "inclusions": {
      "top": "2.5m",
      "bottom": "2.5m",
      "dupatta": "2.4m"
    },
    "images": [
      "/images/inventory/Ajrakh_dress_material_flat-lay_a…_202609082126.jpeg",
      "/images/inventory/Ajrakh_hand_block-print_textile_202609082126.jpeg",
      "/images/inventory/Ajrakh_print_dress_material_disp…_202609082126.jpeg",
      "/images/inventory/Arranging_Ajrakh_dress_material_202609082126.jpeg"
    ],
    "availability": "Available",
    "isFreeShippingEligible": true,
    "badges": [
      "Tissue Silk",
      "Shimmer Luster"
    ],
    "description": "Metallic dual-tone sheen tissue weave with subtle gold zari borders and a printed tissue silk dupatta.",
    "createdAt": "2026-09-09T17:30:00Z"
  },
  {
    "id": "prod-dm-08",
    "slug": "authentic-ajrakh-natural-dye-block-print-set",
    "title": "Authentic Ajrakh Natural Dye Block Print Set",
    "sku": "MM-DM-TC-008",
    "rootCategory": "dress-materials",
    "subCategory": "traditional-crafts",
    "leafCategory": "authentic-ajrakh-block-prints",
    "price": 1890,
    "compareAtPrice": 2290,
    "stockQuantity": 14,
    "sizes": [
      "Unstitched"
    ],
    "fabrics": [
      "Modal Silk",
      "Chanderi"
    ],
    "crafts": [
      "Ajrakh Wooden Block Print",
      "Natural Dye"
    ],
    "inclusions": {
      "top": "2.5m",
      "bottom": "2.5m",
      "dupatta": "2.5m"
    },
    "images": [
      "/images/inventory/Ajrakh_dress_material_flat-lay_a…_202609082126.jpeg",
      "/images/inventory/Ajrakh_hand_block-print_textile_202609082126.jpeg",
      "/images/inventory/Ajrakh_print_dress_material_disp…_202609082126.jpeg",
      "/images/inventory/Arranging_Ajrakh_dress_material_202609082126.jpeg"
    ],
    "availability": "Available",
    "isFreeShippingEligible": true,
    "badges": [
      "Ajrakh Handloom",
      "Vegetable Dye"
    ],
    "description": "Hand-carved wooden block prints using indigo and madder red vegetable dyes on modal silk/chanderi with a large 2.5m Ajrakh dupatta.",
    "createdAt": "2026-09-09T17:25:00Z"
  },
  {
    "id": "prod-dm-09",
    "slug": "kalamkari-silk-suit-set",
    "title": "Kalamkari Silk Suit Set",
    "sku": "MM-DM-TC-009",
    "rootCategory": "dress-materials",
    "subCategory": "traditional-crafts",
    "leafCategory": "kalamkari-silk-sets",
    "price": 1990,
    "compareAtPrice": 2590,
    "stockQuantity": 11,
    "sizes": [
      "Unstitched"
    ],
    "fabrics": [
      "Soft Silk",
      "Cotton Silk"
    ],
    "crafts": [
      "Kalamkari Artwork"
    ],
    "inclusions": {
      "top": "2.5m",
      "bottom": "2.5m",
      "dupatta": "2.4m"
    },
    "images": [
      "/images/inventory/Kalamkari_printed_saree_draped_202609082126.jpeg",
      "/images/inventory/Kalamkari_printed_saree_fabric_202609082126.jpeg",
      "/images/inventory/Kalamkari_printed_saree_on_form_202609082126.jpeg",
      "/images/inventory/Kalamkari_saree_on_tailor_form_202609082126.jpeg"
    ],
    "availability": "Available",
    "isFreeShippingEligible": true,
    "badges": [
      "Kalamkari Craft",
      "Heritage Art"
    ],
    "description": "Traditional pen-work and screen-printed mythological and tree-of-life floral motifs on soft silk fabric.",
    "createdAt": "2026-09-09T17:20:00Z"
  },
  {
    "id": "prod-dm-10",
    "slug": "elephant-tropical-motif-sanganeri-print-suit",
    "title": "Elephant & Tropical Motif Sanganeri Print Suit",
    "sku": "MM-DM-TC-010",
    "rootCategory": "dress-materials",
    "subCategory": "traditional-crafts",
    "leafCategory": "theme-prints-elephant-tropical",
    "price": 1199,
    "compareAtPrice": 1599,
    "stockQuantity": 18,
    "sizes": [
      "Unstitched"
    ],
    "fabrics": [
      "Premium Cotton"
    ],
    "crafts": [
      "Sanganeri Theme Print"
    ],
    "inclusions": {
      "top": "2.5m",
      "bottom": "2.5m",
      "dupatta": "2.25m"
    },
    "images": [
      "/images/inventory/Ajrakh_dress_material_flat-lay_a…_202609082126.jpeg",
      "/images/inventory/Ajrakh_hand_block-print_textile_202609082126.jpeg",
      "/images/inventory/Ajrakh_print_dress_material_disp…_202609082126.jpeg",
      "/images/inventory/Arranging_Ajrakh_dress_material_202609082126.jpeg"
    ],
    "availability": "Available",
    "isFreeShippingEligible": true,
    "badges": [
      "Theme Print",
      "Under ₹1199"
    ],
    "description": "High-twist premium cotton featuring heritage elephant and coconut palm tree border designs with a dual-shade printed dupatta.",
    "createdAt": "2026-09-09T17:15:00Z"
  },
  {
    "id": "prod-re-11",
    "slug": "chikankari-embroidered-straight-kurta-pant-set",
    "title": "Chikankari Embroidered Straight Kurta-Pant Set",
    "sku": "MM-RE-3P-011",
    "rootCategory": "readymade-ethnic",
    "subCategory": "three-piece-sets",
    "leafCategory": "chikankari-threadwork-sets",
    "price": 2890,
    "compareAtPrice": 3590,
    "stockQuantity": 16,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "fabrics": [
      "Georgette",
      "Cotton Inner"
    ],
    "crafts": [
      "Lucknowi Chikankari",
      "Shadow Work"
    ],
    "images": [
      "/images/inventory/Ajrakh_dress_material_flat-lay_a…_202609082126.jpeg",
      "/images/inventory/Ajrakh_hand_block-print_textile_202609082126.jpeg",
      "/images/inventory/Ajrakh_print_dress_material_disp…_202609082126.jpeg",
      "/images/inventory/Arranging_Ajrakh_dress_material_202609082126.jpeg"
    ],
    "availability": "Available",
    "isFreeShippingEligible": true,
    "badges": [
      "Lucknowi Chikankari",
      "Stitched 3-Piece"
    ],
    "description": "Pre-stitched straight-fit cotton kurta with Lucknowi chikankari floral shadow-work, matching tapered cigarette pants, and soft chiffon dupatta.",
    "createdAt": "2026-09-09T17:10:00Z"
  },
  {
    "id": "prod-re-12",
    "slug": "festive-threadwork-anarkali-3piece-ensemble",
    "title": "Festive Threadwork Anarkali 3-Piece Ensemble",
    "sku": "MM-RE-3P-012",
    "rootCategory": "readymade-ethnic",
    "subCategory": "three-piece-sets",
    "leafCategory": "kurta-pant-dupatta-set",
    "price": 3690,
    "compareAtPrice": 4890,
    "stockQuantity": 12,
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "fabrics": [
      "Georgette",
      "Silk Blend"
    ],
    "crafts": [
      "Resham Threadwork",
      "Kalidar Flare"
    ],
    "images": [
      "/images/inventory/Woman_twirling_in_Anarkali_dress_202609082126.jpeg",
      "/images/inventory/Woman_wearing_Anarkali_dress_202609082126.jpeg",
      "/images/inventory/Ajrakh_dress_material_flat-lay_a…_202609082126.jpeg",
      "/images/inventory/Ajrakh_hand_block-print_textile_202609082126.jpeg"
    ],
    "availability": "Available",
    "isFreeShippingEligible": true,
    "badges": [
      "Festive Anarkali",
      "Resham Work"
    ],
    "description": "Georgette gathered flared kurta with intricate resham embroidery, churidar bottom, and border-finished dupatta.",
    "createdAt": "2026-09-09T17:05:00Z"
  },
  {
    "id": "prod-re-13",
    "slug": "tiered-jaipur-cotton-vacation-frock",
    "title": "Tiered Jaipur Cotton Vacation Frock",
    "sku": "MM-RE-FA-013",
    "rootCategory": "readymade-ethnic",
    "subCategory": "frocks-anarkalis",
    "leafCategory": "tiered-jaipur-cotton-frocks",
    "price": 1190,
    "compareAtPrice": 1590,
    "stockQuantity": 20,
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "fabrics": [
      "Cambric Cotton"
    ],
    "crafts": [
      "Jaipur Block Print"
    ],
    "images": [
      "/images/inventory/Cotton_dress_material_set_displayed_202609082126.jpeg",
      "/images/inventory/Cotton_fabric_with_elephant_print_202609082126.jpeg",
      "/images/inventory/Cotton_salwar_suit_fabric_202609082126.jpeg",
      "/images/inventory/Cotton_salwar_suit_material_disp…_202609082126.jpeg"
    ],
    "availability": "Available",
    "isFreeShippingEligible": true,
    "badges": [
      "Boho Frock",
      "Under ₹1199"
    ],
    "description": "Multi-tiered relaxed-fit maxi dress with bohemian block prints and tasseled tie-ups at neck. 100% breathable cambric cotton.",
    "createdAt": "2026-09-09T17:00:00Z"
  },
  {
    "id": "prod-re-14",
    "slug": "floor-length-festive-anarkali-gown",
    "title": "Floor-Length Festive Anarkali Gown",
    "sku": "MM-RE-FA-014",
    "rootCategory": "readymade-ethnic",
    "subCategory": "frocks-anarkalis",
    "leafCategory": "flared-long-festive-anarkalis",
    "price": 3990,
    "compareAtPrice": 5200,
    "stockQuantity": 5,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "fabrics": [
      "Art Silk",
      "Foil Print"
    ],
    "crafts": [
      "Kalidar Flare",
      "Gota Patti"
    ],
    "images": [
      "/images/inventory/Woman_twirling_in_Anarkali_dress_202609082126.jpeg",
      "/images/inventory/Woman_wearing_Anarkali_dress_202609082126.jpeg",
      "/images/inventory/Ajrakh_dress_material_flat-lay_a…_202609082126.jpeg",
      "/images/inventory/Ajrakh_hand_block-print_textile_202609082126.jpeg"
    ],
    "availability": "Available",
    "isFreeShippingEligible": true,
    "badges": [
      "Grand Flare",
      "Festive Gown"
    ],
    "description": "Heavy Kalidar flare floor-length gown featuring foil print borders and a padded bustier with side zip closure.",
    "createdAt": "2026-09-09T16:55:00Z"
  },
  {
    "id": "prod-re-15",
    "slug": "linen-blend-tunic-wide-leg-palazzo-coord-set",
    "title": "Linen-Blend Tunic & Wide-Leg Palazzo Co-ord Set",
    "sku": "MM-RE-IW-015",
    "rootCategory": "readymade-ethnic",
    "subCategory": "indo-western",
    "leafCategory": "coord-sets-tunic-palazzo",
    "price": 1990,
    "compareAtPrice": 2590,
    "stockQuantity": 14,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "fabrics": [
      "Linen Blend"
    ],
    "crafts": [
      "Ethnic Wooden Buttons"
    ],
    "images": [
      "/images/inventory/Co-ord_set_back_view_202609082126.jpeg",
      "/images/inventory/Co-ord_set_side-view_photo_202609082126.jpeg",
      "/images/inventory/Ethnic_co-ord_set_displayed_202609082126.jpeg",
      "/images/inventory/Modern_ethnic_co-ord_set_202609082126.jpeg"
    ],
    "availability": "Available",
    "isFreeShippingEligible": true,
    "badges": [
      "Co-ord Set",
      "Linen Indo-Western"
    ],
    "description": "Relaxed monochromatic co-ord silhouette featuring notched collar, 3/4 sleeves, and ethnic wooden button accents.",
    "createdAt": "2026-09-09T16:50:00Z"
  },
  {
    "id": "prod-re-16",
    "slug": "asymmetrical-fusion-high-low-midi-tunic",
    "title": "Asymmetrical Fusion High-Low Midi Tunic",
    "sku": "MM-RE-IW-016",
    "rootCategory": "readymade-ethnic",
    "subCategory": "indo-western",
    "leafCategory": "fusion-tunics-midis",
    "price": 1490,
    "compareAtPrice": 1890,
    "stockQuantity": 18,
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "fabrics": [
      "Rayon Cotton"
    ],
    "crafts": [
      "High-Low Cut"
    ],
    "images": [
      "/images/inventory/Ajrakh_dress_material_flat-lay_a…_202609082126.jpeg",
      "/images/inventory/Ajrakh_hand_block-print_textile_202609082126.jpeg",
      "/images/inventory/Ajrakh_print_dress_material_disp…_202609082126.jpeg",
      "/images/inventory/Arranging_Ajrakh_dress_material_202609082126.jpeg"
    ],
    "availability": "Available",
    "isFreeShippingEligible": true,
    "badges": [
      "High-Low Cut",
      "Midi Tunic"
    ],
    "description": "Slit-front modern Indo-Western kurti styled specifically for pairing with jeans or trousers.",
    "createdAt": "2026-09-09T16:45:00Z"
  },
  {
    "id": "prod-re-17",
    "slug": "velvet-crop-top-flared-skirt-lehenga-organza-shrug",
    "title": "Velvet Crop Top & Flared Skirt Lehenga Set with Organza Shrug",
    "sku": "MM-RE-PW-017",
    "rootCategory": "readymade-ethnic",
    "subCategory": "partywear",
    "leafCategory": "embellished-velvet-georgette-lehengas",
    "price": 4990,
    "compareAtPrice": 6500,
    "stockQuantity": 4,
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "fabrics": [
      "Micro Velvet",
      "Georgette",
      "Organza"
    ],
    "crafts": [
      "Sequin Work",
      "Can-Can Lining"
    ],
    "images": [
      "/images/inventory/Velvet_blouse_and_skirt_set_202609082126.jpeg",
      "/images/inventory/Velvet_crop_top_skirt_set_202609082126.jpeg",
      "/images/inventory/Velvet_crop_top_with_sequins_202609082126.jpeg",
      "/images/inventory/Ajrakh_dress_material_flat-lay_a…_202609082126.jpeg"
    ],
    "availability": "Available",
    "isFreeShippingEligible": true,
    "badges": [
      "Velvet Lehenga",
      "Organza Shrug"
    ],
    "description": "Heavy sequin work velvet blouse, digital floral printed georgette skirt with built-in can-can lining, and a sheer cape cover-up.",
    "createdAt": "2026-09-09T16:40:00Z"
  },
  {
    "id": "prod-re-18",
    "slug": "straight-cut-formal-office-kurti-rayon-slub",
    "title": "Straight-Cut Formal Office Kurti (Rayon Slub)",
    "sku": "MM-RE-DK-018",
    "rootCategory": "readymade-ethnic",
    "subCategory": "daily-kurtis",
    "leafCategory": "straight-cut-office-kurtis",
    "price": 799,
    "compareAtPrice": 1099,
    "stockQuantity": 25,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "fabrics": [
      "Rayon Slub"
    ],
    "crafts": [
      "Mandarin Collar",
      "Dual Side Pockets"
    ],
    "images": [
      "/images/inventory/Kurti_hanging_on_wooden_hanger_202609082126.jpeg",
      "/images/inventory/Kurti_on_hanger_on_wall_202609082126.jpeg",
      "/images/inventory/Kurti_on_wooden_hanger_202609082126.jpeg",
      "/images/inventory/Kurti_on_wooden_hanger_202609082126_2.jpeg"
    ],
    "availability": "Available",
    "isFreeShippingEligible": false,
    "badges": [
      "Under ₹899",
      "Office Wear"
    ],
    "description": "Minimalist mandarin collar, subtle geometric patti work, dual side pockets, and functional side slits.",
    "createdAt": "2026-09-09T16:35:00Z"
  },
  {
    "id": "prod-re-19",
    "slug": "aline-casual-everyday-cotton-kurti",
    "title": "A-Line Casual Everyday Cotton Kurti",
    "sku": "MM-RE-DK-019",
    "rootCategory": "readymade-ethnic",
    "subCategory": "daily-kurtis",
    "leafCategory": "aline-highlow-tunics",
    "price": 699,
    "compareAtPrice": 999,
    "stockQuantity": 30,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "fabrics": [
      "100% Cotton"
    ],
    "crafts": [
      "Neckline Piping"
    ],
    "images": [
      "/images/inventory/Cotton_dress_material_set_displayed_202609082126.jpeg",
      "/images/inventory/Cotton_fabric_with_elephant_print_202609082126.jpeg",
      "/images/inventory/Cotton_salwar_suit_fabric_202609082126.jpeg",
      "/images/inventory/Cotton_salwar_suit_material_disp…_202609082126.jpeg"
    ],
    "availability": "Available",
    "isFreeShippingEligible": false,
    "badges": [
      "Under ₹899",
      "Daily Wear"
    ],
    "description": "Lightweight everyday comfort A-line fit with contrast piping along the neckline.",
    "createdAt": "2026-09-09T16:30:00Z"
  },
  {
    "id": "prod-sr-20",
    "slug": "pure-handloom-kota-doria-saree-zari-border",
    "title": "Pure Handloom Kota Doria Saree with Zari Border",
    "sku": "MM-SR-HL-020",
    "rootCategory": "sarees",
    "subCategory": "handloom-sarees",
    "leafCategory": "pure-handloom-kota-doria",
    "price": 2890,
    "compareAtPrice": 3600,
    "stockQuantity": 11,
    "sizes": [
      "Unstitched"
    ],
    "fabrics": [
      "Kota Doria",
      "Handloom Silk Cotton"
    ],
    "crafts": [
      "Khat Weave",
      "Zari Tissue Border"
    ],
    "images": [
      "/images/inventory/Cotton_dress_material_set_displayed_202609082126.jpeg",
      "/images/inventory/Cotton_fabric_with_elephant_print_202609082126.jpeg",
      "/images/inventory/Cotton_salwar_suit_fabric_202609082126.jpeg",
      "/images/inventory/Cotton_salwar_suit_material_disp…_202609082126.jpeg"
    ],
    "availability": "Available",
    "isFreeShippingEligible": true,
    "badges": [
      "Pure Handloom",
      "Kota Doria"
    ],
    "description": "6.3m drape including unstitched blouse piece. Signature square checkered khat weave with woven gold tissue border.",
    "createdAt": "2026-09-09T16:25:00Z"
  },
  {
    "id": "prod-sr-21",
    "slug": "muslin-jamdani-floral-weave-saree",
    "title": "Muslin Jamdani Floral Weave Saree",
    "sku": "MM-SR-HL-021",
    "rootCategory": "sarees",
    "subCategory": "handloom-sarees",
    "leafCategory": "muslin-jamdani-weave-sarees",
    "price": 3490,
    "compareAtPrice": 4200,
    "stockQuantity": 8,
    "sizes": [
      "Unstitched"
    ],
    "fabrics": [
      "Pure Muslin"
    ],
    "crafts": [
      "Supplementary Weft Jamdani"
    ],
    "images": [
      "/images/inventory/Folded_Jamdani_saree_with_flowers_202609082126.jpeg",
      "/images/inventory/Jamdani_saree_arrangement_displayed_202609082126.jpeg",
      "/images/inventory/Jamdani_saree_floral_pattern_macro_202609082126.jpeg",
      "/images/inventory/Jamdani_saree_on_studio_floor_202609082126.jpeg"
    ],
    "availability": "Available",
    "isFreeShippingEligible": true,
    "badges": [
      "Muslin Jamdani",
      "Featherweight"
    ],
    "description": "Featherweight transparent muslin weave with distinct supplementary weft floral patterns woven across the body and pallu.",
    "createdAt": "2026-09-09T16:20:00Z"
  },
  {
    "id": "prod-sr-22",
    "slug": "gadwal-pattu-saree-kuttu-temple-borders",
    "title": "Gadwal Pattu Saree with Kuttu Temple Borders",
    "sku": "MM-SR-SF-022",
    "rootCategory": "sarees",
    "subCategory": "silk-sarees",
    "leafCategory": "gadwal-silk-pattu",
    "price": 8990,
    "compareAtPrice": 10500,
    "stockQuantity": 5,
    "sizes": [
      "Unstitched"
    ],
    "fabrics": [
      "Pure Gadwal Pattu Silk"
    ],
    "crafts": [
      "Interlocked Kuttu Weave",
      "Temple Zari"
    ],
    "images": [
      "/images/inventory/Gadwal_silk_saree_back_view_202609082126.jpeg",
      "/images/inventory/Gadwal_silk_saree_displayed_202609082126.jpeg",
      "/images/inventory/Gadwal_silk_saree_drape_shot_202609082126.jpeg",
      "/images/inventory/Gadwal_silk_saree_drape_shot_202609082126_2.jpeg"
    ],
    "availability": "Available",
    "isFreeShippingEligible": true,
    "badges": [
      "Gadwal Pattu",
      "Kuttu Border"
    ],
    "description": "Contrast color silk body with hand-interlocked (Kuttu) golden zari borders and grand temple motifs woven on the pallu.",
    "createdAt": "2026-09-09T16:15:00Z"
  },
  {
    "id": "prod-sr-23",
    "slug": "dual-tone-soft-silk-saree-antique-silver-weave",
    "title": "Dual-Tone Soft Silk Saree with Antique Silver Weave",
    "sku": "MM-SR-SF-023",
    "rootCategory": "sarees",
    "subCategory": "silk-sarees",
    "leafCategory": "dual-tone-soft-silks",
    "price": 4290,
    "compareAtPrice": 5500,
    "stockQuantity": 9,
    "sizes": [
      "Unstitched"
    ],
    "fabrics": [
      "Soft Art Silk"
    ],
    "crafts": [
      "Brocade Weave",
      "Silver Zari"
    ],
    "images": [
      "/images/inventory/Embroidered_beige_tussar_silk_fa…_202609082126.jpeg",
      "/images/inventory/Embroidered_silk_fabric_flat_lay_202609082126.jpeg",
      "/images/inventory/Embroidered_silk_fabric_set_display_202609082126.jpeg",
      "/images/inventory/Gadwal_silk_saree_back_view_202609082126.jpeg"
    ],
    "availability": "Available",
    "isFreeShippingEligible": true,
    "badges": [
      "Dual-Tone Luster",
      "Silver Zari"
    ],
    "description": "Lightweight art silk with buttery soft drape, dual-shade cross-color luster, and all-over silver brocade weave.",
    "createdAt": "2026-09-09T16:10:00Z"
  },
  {
    "id": "prod-sr-24",
    "slug": "kalamkari-printed-flowing-chiffon-saree",
    "title": "Kalamkari Printed Flowing Chiffon Saree",
    "sku": "MM-SR-CS-024",
    "rootCategory": "sarees",
    "subCategory": "casual-sarees",
    "leafCategory": "kalamkari-printed-georgette",
    "price": 1099,
    "compareAtPrice": 1499,
    "stockQuantity": 15,
    "sizes": [
      "Unstitched"
    ],
    "fabrics": [
      "Poly Chiffon"
    ],
    "crafts": [
      "Kalamkari Artwork Print",
      "Satin Border"
    ],
    "images": [
      "/images/inventory/Kalamkari_printed_saree_draped_202609082126.jpeg",
      "/images/inventory/Kalamkari_printed_saree_fabric_202609082126.jpeg",
      "/images/inventory/Kalamkari_printed_saree_on_form_202609082126.jpeg",
      "/images/inventory/Kalamkari_saree_on_tailor_form_202609082126.jpeg"
    ],
    "availability": "Available",
    "isFreeShippingEligible": true,
    "badges": [
      "Under ₹1199",
      "Kalamkari Chiffon"
    ],
    "description": "Weightless chiffon fabric printed with heritage floral pen-style artwork and a contrasting satin border.",
    "createdAt": "2026-09-09T16:05:00Z"
  },
  {
    "id": "prod-sr-25",
    "slug": "daily-wear-organic-linen-cotton-saree",
    "title": "Daily-Wear Organic Linen-Cotton Saree",
    "sku": "MM-SR-CS-025",
    "rootCategory": "sarees",
    "subCategory": "casual-sarees",
    "leafCategory": "daily-wear-cotton-linen",
    "price": 1390,
    "compareAtPrice": 1790,
    "stockQuantity": 12,
    "sizes": [
      "Unstitched"
    ],
    "fabrics": [
      "Organic Linen",
      "Cotton Blend"
    ],
    "crafts": [
      "Yarn-Dyed Stripes",
      "Pom-Pom Tassels"
    ],
    "images": [
      "/images/inventory/Cotton_dress_material_set_displayed_202609082126.jpeg",
      "/images/inventory/Cotton_fabric_with_elephant_print_202609082126.jpeg",
      "/images/inventory/Cotton_salwar_suit_fabric_202609082126.jpeg",
      "/images/inventory/Cotton_salwar_suit_material_disp…_202609082126.jpeg"
    ],
    "availability": "Available",
    "isFreeShippingEligible": true,
    "badges": [
      "Organic Linen",
      "Hand-Knotted Tassels"
    ],
    "description": "Breathable textured drape with yarn-dyed stripes and hand-knotted pom-pom tassels on the pallu.",
    "createdAt": "2026-09-09T16:00:00Z"
  },
  {
    "id": "prod-bs-26",
    "slug": "budget-raw-silk-3piece-material-set",
    "title": "Budget Raw Silk 3-Piece Material Set",
    "sku": "MM-BS-899-026",
    "rootCategory": "budget-store",
    "subCategory": "under-899",
    "leafCategory": "budget-raw-silk-3piece",
    "price": 899,
    "compareAtPrice": 1299,
    "stockQuantity": 25,
    "sizes": [
      "Unstitched"
    ],
    "fabrics": [
      "Raw Silk Blend"
    ],
    "crafts": [
      "Woven Booties"
    ],
    "inclusions": {
      "top": "2.25m",
      "bottom": "2.0m",
      "dupatta": "2.1m"
    },
    "images": [
      "/images/inventory/Embroidered_beige_tussar_silk_fa…_202609082126.jpeg",
      "/images/inventory/Embroidered_silk_fabric_flat_lay_202609082126.jpeg",
      "/images/inventory/Embroidered_silk_fabric_set_display_202609082126.jpeg",
      "/images/inventory/Gadwal_silk_saree_back_view_202609082126.jpeg"
    ],
    "availability": "Available",
    "isFreeShippingEligible": false,
    "badges": [
      "Under ₹899",
      "Wholesale Value"
    ],
    "description": "Affordable woven booties raw silk top, plain matching bottom, and silk blend dupatta. Exceptional wholesale value.",
    "createdAt": "2026-09-09T15:55:00Z"
  },
  {
    "id": "prod-bs-27",
    "slug": "everyday-cotton-kurti-trio-pack",
    "title": "Everyday Cotton Kurti Trio Pack",
    "sku": "MM-BS-899-027",
    "rootCategory": "budget-store",
    "subCategory": "under-899",
    "leafCategory": "daily-cotton-kurti-multipacks",
    "price": 849,
    "compareAtPrice": 1200,
    "stockQuantity": 30,
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "fabrics": [
      "100% Soft Cotton"
    ],
    "crafts": [
      "Screen Print"
    ],
    "images": [
      "/images/inventory/Cotton_dress_material_set_displayed_202609082126.jpeg",
      "/images/inventory/Cotton_fabric_with_elephant_print_202609082126.jpeg",
      "/images/inventory/Cotton_salwar_suit_fabric_202609082126.jpeg",
      "/images/inventory/Cotton_salwar_suit_material_disp…_202609082126.jpeg"
    ],
    "availability": "Available",
    "isFreeShippingEligible": false,
    "badges": [
      "Under ₹899",
      "Trio Pack"
    ],
    "description": "Value bundle of 3 printed daily-wear straight cotton office kurtis in complementary colors.",
    "createdAt": "2026-09-09T15:50:00Z"
  },
  {
    "id": "prod-bs-28",
    "slug": "premium-cotton-elephant-themed-suit-set",
    "title": "Premium Cotton Elephant-Themed Suit Set",
    "sku": "MM-BS-1199-028",
    "rootCategory": "budget-store",
    "subCategory": "under-1199",
    "leafCategory": "premium-cotton-printed-suits",
    "price": 1099,
    "compareAtPrice": 1499,
    "stockQuantity": 18,
    "sizes": [
      "Unstitched"
    ],
    "fabrics": [
      "High-Twist Cotton"
    ],
    "crafts": [
      "Elephant Theme Print"
    ],
    "inclusions": {
      "top": "2.5m",
      "bottom": "2.5m",
      "dupatta": "2.25m"
    },
    "images": [
      "/images/inventory/Cotton_dress_material_set_displayed_202609082126.jpeg",
      "/images/inventory/Cotton_fabric_with_elephant_print_202609082126.jpeg",
      "/images/inventory/Cotton_salwar_suit_fabric_202609082126.jpeg",
      "/images/inventory/Cotton_salwar_suit_material_disp…_202609082126.jpeg"
    ],
    "availability": "Available",
    "isFreeShippingEligible": true,
    "badges": [
      "Under ₹1199",
      "Free Shipping"
    ],
    "description": "Includes free shipping badge, heavy floral/elephant border print, and contrasting printed dupatta.",
    "createdAt": "2026-09-09T15:45:00Z"
  },
  {
    "id": "prod-bs-29",
    "slug": "semi-kota-mirror-work-suit-set",
    "title": "Semi-Kota Mirror Work Suit Set",
    "sku": "MM-BS-1199-029",
    "rootCategory": "budget-store",
    "subCategory": "under-1199",
    "leafCategory": "budget-semi-kota-mirror-work",
    "price": 999,
    "compareAtPrice": 1399,
    "stockQuantity": 22,
    "sizes": [
      "Unstitched"
    ],
    "fabrics": [
      "Semi-Kota Blend"
    ],
    "crafts": [
      "Machine Mirror Work"
    ],
    "inclusions": {
      "top": "2.5m",
      "bottom": "2.0m",
      "dupatta": "2.25m"
    },
    "images": [
      "/images/inventory/Cotton_dress_material_set_displayed_202609082126.jpeg",
      "/images/inventory/Cotton_fabric_with_elephant_print_202609082126.jpeg",
      "/images/inventory/Cotton_salwar_suit_fabric_202609082126.jpeg",
      "/images/inventory/Cotton_salwar_suit_material_disp…_202609082126.jpeg"
    ],
    "availability": "Available",
    "isFreeShippingEligible": false,
    "badges": [
      "Under ₹1199",
      "Mirror Yoke"
    ],
    "description": "Budget-friendly festive suit featuring machine mirror work yoke embellishment on semi-kota fabric.",
    "createdAt": "2026-09-09T15:40:00Z"
  }
];
