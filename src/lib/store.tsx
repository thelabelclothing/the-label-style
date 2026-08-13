import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "./products";

export interface BagItem {
  key: string;
  productId: string;
  size: string;
  color: string;
  qty: number;
}

interface StoreValue {
  bag: BagItem[];
  wishlist: string[];
  recentlyViewed: string[];
  addToBag: (product: Product, size: string, color: string, qty?: number) => void;
  removeFromBag: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clearBag: () => void;
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  markViewed: (id: string) => void;
  bagCount: number;
  subtotal: number;
  bagDetailed: { item: BagItem; product: Product }[];
}

const StoreContext = createContext<StoreValue | null>(null);

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [bag, setBag] = useState<BagItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setBag(load<BagItem[]>("tlc.bag", []));
    setWishlist(load<string[]>("tlc.wishlist", []));
    setRecentlyViewed(load<string[]>("tlc.viewed", []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem("tlc.bag", JSON.stringify(bag));
  }, [bag, hydrated]);
  useEffect(() => {
    if (hydrated) window.localStorage.setItem("tlc.wishlist", JSON.stringify(wishlist));
  }, [wishlist, hydrated]);
  useEffect(() => {
    if (hydrated) window.localStorage.setItem("tlc.viewed", JSON.stringify(recentlyViewed));
  }, [recentlyViewed, hydrated]);

  const addToBag = useCallback(
    (product: Product, size: string, color: string, qty = 1) => {
      const key = `${product.id}-${size}-${color}`;
      setBag((prev) => {
        const existing = prev.find((i) => i.key === key);
        if (existing) {
          return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
        }
        return [...prev, { key, productId: product.id, size, color, qty }];
      });
    },
    [],
  );

  const removeFromBag = useCallback((key: string) => {
    setBag((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setBag((prev) =>
      qty <= 0
        ? prev.filter((i) => i.key !== key)
        : prev.map((i) => (i.key === key ? { ...i, qty } : i)),
    );
  }, []);

  const clearBag = useCallback(() => setBag([]), []);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  }, []);

  const markViewed = useCallback((id: string) => {
    setRecentlyViewed((prev) => [id, ...prev.filter((i) => i !== id)].slice(0, 8));
  }, []);

  const value = useMemo<StoreValue>(() => {
    const bagDetailed = bag
      .map((item) => ({ item, product: products.find((p) => p.id === item.productId)! }))
      .filter((r) => Boolean(r.product));
    return {
      bag,
      wishlist,
      recentlyViewed,
      addToBag,
      removeFromBag,
      setQty,
      clearBag,
      toggleWishlist,
      isWishlisted: (id: string) => wishlist.includes(id),
      markViewed,
      bagCount: bag.reduce((n, i) => n + i.qty, 0),
      subtotal: bagDetailed.reduce((n, r) => n + r.product.price * r.item.qty, 0),
      bagDetailed,
    };
  }, [bag, wishlist, recentlyViewed, addToBag, removeFromBag, setQty, clearBag, toggleWishlist, markViewed]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}