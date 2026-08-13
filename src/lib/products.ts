import teeEcru from "@/assets/p-tee-ecru.jpg";
import teeBlack from "@/assets/p-tee-black.jpg";
import teeWhite from "@/assets/p-tee-white.jpg";
import shirtWhite from "@/assets/p-shirt-white.jpg";
import overshirtStone from "@/assets/p-overshirt-stone.jpg";
import jeansBlue from "@/assets/p-jeans-blue.jpg";
import wideLegCream from "@/assets/p-wideleg-cream.jpg";
import cargoOlive from "@/assets/p-cargo-olive.jpg";
import ribbedTaupe from "@/assets/p-ribbed-taupe.jpg";
import knitGrey from "@/assets/p-knit-grey.jpg";
import coatCamel from "@/assets/p-coat-camel.jpg";
import dressBlack from "@/assets/p-dress-black.jpg";
import bagBlack from "@/assets/p-bag-black.jpg";
import trousersCharcoal from "@/assets/p-trousers-charcoal.jpg";
import scarfGrey from "@/assets/p-scarf-grey.jpg";
import blazerBlack from "@/assets/p-blazer-black.jpg";

export type Gender = "women" | "men";

export type Category =
  | "tops"
  | "shirts"
  | "t-shirts"
  | "trousers"
  | "denim"
  | "outerwear"
  | "accessories"
  | "dresses";

export interface ColorOption {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAt?: number;
  gender: Gender[];
  category: Category;
  colors: ColorOption[];
  sizes: string[];
  image: string;
  hoverImage: string;
  gallery: string[];
  isNew?: boolean;
  trending?: boolean;
  inStock: boolean;
  rating: number;
  reviews: number;
  description: string;
  details: string[];
  fit: string;
}

const APPAREL_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const ONE_SIZE = ["ONE SIZE"];

const C = {
  ecru: { name: "Ecru", hex: "#efe7db" },
  black: { name: "Black", hex: "#151515" },
  white: { name: "White", hex: "#f7f6f3" },
  stone: { name: "Stone", hex: "#cbbfae" },
  taupe: { name: "Taupe", hex: "#9a8a7b" },
  charcoal: { name: "Charcoal", hex: "#3c3c3e" },
  indigo: { name: "Mid Indigo", hex: "#4a628a" },
  olive: { name: "Olive", hex: "#6b6b45" },
  camel: { name: "Camel", hex: "#b5764a" },
  grey: { name: "Soft Grey", hex: "#b9b9b7" },
  cream: { name: "Cream", hex: "#eee2c8" },
} satisfies Record<string, ColorOption>;

function make(
  p: Omit<Product, "gallery" | "rating" | "reviews" | "inStock" | "details" | "fit"> &
    Partial<Pick<Product, "gallery" | "rating" | "reviews" | "inStock" | "details" | "fit">>,
): Product {
  return {
    gallery: [p.image, p.hoverImage, p.image, p.hoverImage],
    rating: 4.6,
    reviews: 48,
    inStock: true,
    details: [
      "Cut from responsibly sourced fabric",
      "Machine wash cold with like colours",
      "Do not tumble dry — reshape and dry flat",
      "Warm iron on reverse if needed",
    ],
    fit: "True to size. Our model is 178cm and wears a size S.",
    ...p,
  } as Product;
}

export const products: Product[] = [
  make({
    id: "1",
    slug: "essential-oversized-tee",
    name: "Essential Oversized Tee",
    price: 39,
    gender: ["women", "men"],
    category: "t-shirts",
    colors: [C.ecru, C.black, C.white],
    sizes: APPAREL_SIZES,
    image: teeEcru,
    hoverImage: teeWhite,
    isNew: true,
    trending: true,
    rating: 4.8,
    reviews: 214,
    description:
      "A heavyweight cotton tee with dropped shoulders and a softly boxy body. Garment-washed for an immediate lived-in handle that only improves with wear.",
  }),
  make({
    id: "2",
    slug: "relaxed-cotton-shirt",
    name: "Relaxed Cotton Shirt",
    price: 69,
    gender: ["women", "men"],
    category: "shirts",
    colors: [C.white, C.stone],
    sizes: APPAREL_SIZES,
    image: shirtWhite,
    hoverImage: overshirtStone,
    isNew: true,
    rating: 4.7,
    reviews: 132,
    description:
      "An easy shirt in crisp cotton poplin, cut with a relaxed body, a soft collar and a curved hem designed to be worn in or out.",
  }),
  make({
    id: "3",
    slug: "everyday-straight-jeans",
    name: "Everyday Straight Jeans",
    price: 89,
    gender: ["women", "men"],
    category: "denim",
    colors: [C.indigo, C.black],
    sizes: ["24", "25", "26", "27", "28", "30", "32"],
    image: jeansBlue,
    hoverImage: trousersCharcoal,
    isNew: true,
    trending: true,
    rating: 4.6,
    reviews: 301,
    description:
      "A clean straight leg in rigid Italian denim with a mid rise and a considered break at the ankle. Made to be the pair you reach for first.",
  }),
  make({
    id: "4",
    slug: "signature-ribbed-top",
    name: "Signature Ribbed Top",
    price: 45,
    gender: ["women"],
    category: "tops",
    colors: [C.taupe, C.black, C.ecru],
    sizes: APPAREL_SIZES,
    image: ribbedTaupe,
    hoverImage: knitGrey,
    isNew: true,
    trending: true,
    rating: 4.9,
    reviews: 187,
    description:
      "A fine-gauge ribbed knit that follows the body without clinging. Long sleeves, a neat crew neck and enough stretch to move all day.",
  }),
  make({
    id: "5",
    slug: "relaxed-cargo-trousers",
    name: "Relaxed Cargo Trousers",
    price: 79,
    gender: ["men", "women"],
    category: "trousers",
    colors: [C.olive, C.charcoal],
    sizes: APPAREL_SIZES,
    image: cargoOlive,
    hoverImage: trousersCharcoal,
    isNew: true,
    rating: 4.5,
    reviews: 96,
    description:
      "Washed cotton twill cargos with a relaxed leg, clean utility pockets and a soft, broken-in finish.",
  }),
  make({
    id: "6",
    slug: "lightweight-overshirt",
    name: "Lightweight Overshirt",
    price: 79,
    gender: ["men", "women"],
    category: "outerwear",
    colors: [C.stone, C.charcoal],
    sizes: APPAREL_SIZES,
    image: overshirtStone,
    hoverImage: shirtWhite,
    isNew: true,
    trending: true,
    rating: 4.8,
    reviews: 158,
    description:
      "The layer between seasons. A linen-blend overshirt with a soft shoulder, patch pocket and a shape that works open or buttoned.",
  }),
  make({
    id: "7",
    slug: "classic-boxy-tee",
    name: "Classic Boxy Tee",
    price: 35,
    gender: ["women", "men"],
    category: "t-shirts",
    colors: [C.black, C.white],
    sizes: APPAREL_SIZES,
    image: teeBlack,
    hoverImage: teeEcru,
    isNew: true,
    rating: 4.7,
    reviews: 264,
    description:
      "A compact boxy tee in dense organic cotton with a ribbed neckline that holds its shape wash after wash.",
  }),
  make({
    id: "8",
    slug: "essential-wide-leg-pants",
    name: "Essential Wide Leg Pants",
    price: 85,
    gender: ["women"],
    category: "trousers",
    colors: [C.cream, C.charcoal, C.black],
    sizes: APPAREL_SIZES,
    image: wideLegCream,
    hoverImage: trousersCharcoal,
    isNew: true,
    trending: true,
    rating: 4.8,
    reviews: 143,
    description:
      "Fluid wide leg trousers with a single front pleat and a high, clean waistband. Tailored enough for work, soft enough for Sunday.",
  }),
  make({
    id: "9",
    slug: "merino-crew-knit",
    name: "Merino Crew Knit",
    price: 95,
    gender: ["men", "women"],
    category: "tops",
    colors: [C.grey, C.black, C.stone],
    sizes: APPAREL_SIZES,
    image: knitGrey,
    hoverImage: ribbedTaupe,
    trending: true,
    rating: 4.9,
    reviews: 121,
    description:
      "Extra-fine merino knitted to a smooth, even gauge. Light enough to layer, warm enough to wear alone.",
  }),
  make({
    id: "10",
    slug: "tailored-wool-coat",
    name: "Tailored Wool Coat",
    price: 249,
    compareAt: 320,
    gender: ["women"],
    category: "outerwear",
    colors: [C.camel, C.charcoal],
    sizes: APPAREL_SIZES,
    image: coatCamel,
    hoverImage: blazerBlack,
    rating: 4.9,
    reviews: 64,
    description:
      "A longline wool-blend coat with a soft notch lapel, a self tie belt and a considered drape through the body.",
  }),
  make({
    id: "11",
    slug: "bias-cut-slip-dress",
    name: "Bias Cut Slip Dress",
    price: 99,
    gender: ["women"],
    category: "dresses",
    colors: [C.black, C.stone],
    sizes: APPAREL_SIZES,
    image: dressBlack,
    hoverImage: blazerBlack,
    trending: true,
    rating: 4.6,
    reviews: 78,
    description:
      "A fluid bias-cut midi with fine adjustable straps and a low scoop back. Wears alone in summer and layered all winter.",
  }),
  make({
    id: "12",
    slug: "structured-leather-tote",
    name: "Structured Leather Tote",
    price: 179,
    gender: ["women", "men"],
    category: "accessories",
    colors: [C.black],
    sizes: ONE_SIZE,
    image: bagBlack,
    hoverImage: scarfGrey,
    rating: 4.8,
    reviews: 52,
    description:
      "A clean-lined tote in full grain leather, unlined and softly structured so it settles with use. Fits a 14\" laptop.",
    fit: "H 34cm x W 30cm x D 12cm. Handle drop 22cm.",
  }),
  make({
    id: "13",
    slug: "pleated-tailored-trousers",
    name: "Pleated Tailored Trousers",
    price: 89,
    gender: ["men"],
    category: "trousers",
    colors: [C.charcoal, C.black],
    sizes: APPAREL_SIZES,
    image: trousersCharcoal,
    hoverImage: cargoOlive,
    rating: 4.5,
    reviews: 88,
    description:
      "Soft tailoring in a fluid wool blend with a single pleat, a straight leg and no lining for easy everyday wear.",
  }),
  make({
    id: "14",
    slug: "heavyweight-crew-tee",
    name: "Heavyweight Crew Tee",
    price: 35,
    gender: ["men"],
    category: "t-shirts",
    colors: [C.white, C.black, C.ecru],
    sizes: APPAREL_SIZES,
    image: teeWhite,
    hoverImage: teeBlack,
    trending: true,
    rating: 4.7,
    reviews: 342,
    description:
      "A 240gsm cotton crew with a firm ribbed collar and a straight body. The foundation of the wardrobe.",
  }),
  make({
    id: "15",
    slug: "wool-blend-scarf",
    name: "Wool Blend Scarf",
    price: 49,
    gender: ["women", "men"],
    category: "accessories",
    colors: [C.grey, C.camel],
    sizes: ONE_SIZE,
    image: scarfGrey,
    hoverImage: knitGrey,
    rating: 4.7,
    reviews: 41,
    description:
      "A generously sized brushed wool scarf with hand-knotted fringing and a soft, weightless handle.",
    fit: "200cm x 65cm.",
  }),
  make({
    id: "16",
    slug: "relaxed-single-breasted-blazer",
    name: "Relaxed Single Breasted Blazer",
    price: 165,
    gender: ["women"],
    category: "outerwear",
    colors: [C.black, C.stone],
    sizes: APPAREL_SIZES,
    image: blazerBlack,
    hoverImage: coatCamel,
    rating: 4.8,
    reviews: 73,
    description:
      "An unstructured blazer with a low one-button fastening and a soft shoulder. Cut long and easy over everything.",
  }),
  make({
    id: "17",
    slug: "washed-poplin-shirt",
    name: "Washed Poplin Shirt",
    price: 65,
    gender: ["men"],
    category: "shirts",
    colors: [C.white, C.stone],
    sizes: APPAREL_SIZES,
    image: shirtWhite,
    hoverImage: teeWhite,
    rating: 4.5,
    reviews: 110,
    description:
      "Cotton poplin, washed soft, with a short placket and a neat point collar. An everyday shirt with no fuss.",
  }),
  make({
    id: "18",
    slug: "loose-fit-denim",
    name: "Loose Fit Denim",
    price: 95,
    gender: ["men"],
    category: "denim",
    colors: [C.indigo],
    sizes: ["28", "30", "32", "34", "36"],
    image: jeansBlue,
    hoverImage: cargoOlive,
    rating: 4.4,
    reviews: 87,
    description:
      "A generous straight leg in rigid denim with a mid rise and a full, honest fit through the thigh.",
  }),
  make({
    id: "19",
    slug: "cropped-ribbed-tank",
    name: "Cropped Ribbed Tank",
    price: 29,
    compareAt: 39,
    gender: ["women"],
    category: "tops",
    colors: [C.ecru, C.black],
    sizes: APPAREL_SIZES,
    image: ribbedTaupe,
    hoverImage: teeEcru,
    rating: 4.3,
    reviews: 59,
    description:
      "A slim ribbed tank with narrow straps and a neat cropped length designed to sit at the waistband.",
  }),
  make({
    id: "20",
    slug: "linen-blend-overshirt-charcoal",
    name: "Linen Blend Overshirt",
    price: 85,
    gender: ["men"],
    category: "outerwear",
    colors: [C.charcoal, C.stone],
    sizes: APPAREL_SIZES,
    image: overshirtStone,
    hoverImage: blazerBlack,
    rating: 4.6,
    reviews: 66,
    description:
      "A breathable linen-blend overshirt with a squared hem and roomy chest pocket. The easiest third piece.",
  }),
  make({
    id: "21",
    slug: "straight-leg-black-jeans",
    name: "Straight Leg Black Jeans",
    price: 89,
    gender: ["women"],
    category: "denim",
    colors: [C.black],
    sizes: ["24", "25", "26", "27", "28", "30"],
    image: jeansBlue,
    hoverImage: wideLegCream,
    rating: 4.6,
    reviews: 94,
    description:
      "High rise, straight through the leg and cut in a deep-dyed rigid denim that holds its colour.",
  }),
  make({
    id: "22",
    slug: "oversized-cotton-jumper",
    name: "Oversized Cotton Jumper",
    price: 75,
    compareAt: 99,
    gender: ["women", "men"],
    category: "tops",
    colors: [C.grey, C.ecru],
    sizes: APPAREL_SIZES,
    image: knitGrey,
    hoverImage: teeEcru,
    rating: 4.5,
    reviews: 71,
    description:
      "A roomy cotton jumper with deep ribbing at the cuff and hem, knitted to hold a generous shape.",
  }),
  make({
    id: "23",
    slug: "tailored-wide-trousers-black",
    name: "Tailored Wide Trousers",
    price: 89,
    gender: ["women"],
    category: "trousers",
    colors: [C.black, C.cream],
    sizes: APPAREL_SIZES,
    image: wideLegCream,
    hoverImage: trousersCharcoal,
    inStock: false,
    rating: 4.7,
    reviews: 55,
    description:
      "Wide, weighted and quietly formal, with a clean waistband and a floor-skimming leg.",
  }),
  make({
    id: "24",
    slug: "everyday-cotton-scarf",
    name: "Everyday Cotton Scarf",
    price: 35,
    gender: ["women", "men"],
    category: "accessories",
    colors: [C.stone, C.grey],
    sizes: ONE_SIZE,
    image: scarfGrey,
    hoverImage: bagBlack,
    rating: 4.4,
    reviews: 33,
    description:
      "A lightweight woven cotton scarf that folds down to nothing and works from spring through autumn.",
    fit: "180cm x 55cm.",
  }),
];

export const EUR_RATE = 1.17;
export const FREE_SHIPPING_THRESHOLD = 100;

export function formatGBP(value: number) {
  return `£${value.toFixed(2)}`;
}

export function formatEUR(value: number) {
  return `€${(value * EUR_RATE).toFixed(2)}`;
}

export function priceLabel(value: number) {
  return `${formatGBP(value)} / ${formatEUR(value)}`;
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export const CATEGORY_LABELS: Record<Category, string> = {
  tops: "Tops",
  shirts: "Shirts",
  "t-shirts": "T-Shirts",
  trousers: "Trousers",
  denim: "Denim",
  outerwear: "Outerwear",
  accessories: "Accessories",
  dresses: "Dresses",
};

export const ALL_COLORS: ColorOption[] = Object.values(C);

export const ALL_SIZES = [...APPAREL_SIZES, "ONE SIZE"];

export function relatedProducts(product: Product, count = 4) {
  return products
    .filter((p) => p.id !== product.id)
    .sort((a, b) => {
      const score = (p: Product) =>
        (p.category === product.category ? 2 : 0) +
        (p.gender.some((g) => product.gender.includes(g)) ? 1 : 0);
      return score(b) - score(a);
    })
    .slice(0, count);
}