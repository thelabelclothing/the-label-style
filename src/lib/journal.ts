import journal1 from "@/assets/journal-1.jpg";
import journal2 from "@/assets/journal-2.jpg";
import journal3 from "@/assets/journal-3.jpg";

export interface JournalEntry {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
}

export const journal: JournalEntry[] = [
  {
    slug: "the-art-of-everyday-dressing",
    title: "The Art of Everyday Dressing",
    excerpt: "Simple styling ideas for your everyday wardrobe.",
    category: "Styling",
    readTime: "4 min read",
    image: journal1,
  },
  {
    slug: "how-to-build-a-capsule-wardrobe",
    title: "How to Build a Capsule Wardrobe",
    excerpt: "Essential pieces that work harder together.",
    category: "Wardrobe",
    readTime: "6 min read",
    image: journal2,
  },
  {
    slug: "from-day-to-night",
    title: "From Day to Night",
    excerpt: "Easy ways to transform your look.",
    category: "Styling",
    readTime: "3 min read",
    image: journal3,
  },
];