import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import {
  ALL_SIZES,
  CATEGORY_LABELS,
  type Category,
  type Gender,
  type Product,
} from "@/lib/products";
import { cn } from "@/lib/utils";
import { ProductCard } from "./ProductCard";
import { Btn } from "./Btn";

export type SortKey = "featured" | "newest" | "price-asc" | "price-desc";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "newest", label: "Newest" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
];

export interface CollectionFilters {
  category: Category | "all";
  sizes: string[];
  colors: string[];
  maxPrice: number;
  inStockOnly: boolean;
  sort: SortKey;
  query: string;
}

export function CollectionView({
  source,
  tabs,
  gender,
  initialCategory = "all",
  initialSort = "featured",
  initialQuery = "",
  saleOnly = false,
  pageSize = 8,
}: {
  source: Product[];
  tabs: (Category | "all")[];
  gender?: Gender;
  initialCategory?: Category | "all";
  initialSort?: SortKey;
  initialQuery?: string;
  saleOnly?: boolean;
  pageSize?: number;
}) {
  const [filters, setFilters] = useState<CollectionFilters>({
    category: initialCategory,
    sizes: [],
    colors: [],
    maxPrice: 300,
    inStockOnly: false,
    sort: initialSort,
    query: initialQuery,
  });
  const [visible, setVisible] = useState(pageSize);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const colorNames = useMemo(
    () => Array.from(new Set(source.flatMap((p) => p.colors.map((c) => c.name)))).sort(),
    [source],
  );

  const results = useMemo(() => {
    let list = source.filter((p) => {
      if (gender && !p.gender.includes(gender)) return false;
      if (saleOnly && !p.compareAt) return false;
      if (filters.category !== "all" && p.category !== filters.category) return false;
      if (filters.sizes.length && !p.sizes.some((s) => filters.sizes.includes(s))) return false;
      if (filters.colors.length && !p.colors.some((c) => filters.colors.includes(c.name)))
        return false;
      if (p.price > filters.maxPrice) return false;
      if (filters.inStockOnly && !p.inStock) return false;
      if (filters.query && !p.name.toLowerCase().includes(filters.query.toLowerCase()))
        return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      switch (filters.sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "newest":
          return Number(Boolean(b.isNew)) - Number(Boolean(a.isNew));
        default:
          return Number(Boolean(b.trending)) - Number(Boolean(a.trending));
      }
    });
    return list;
  }, [source, gender, saleOnly, filters]);

  const update = (patch: Partial<CollectionFilters>) => {
    setFilters((f) => ({ ...f, ...patch }));
    setVisible(pageSize);
  };

  const toggleIn = (arr: string[], value: string) =>
    arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

  const sidebar = (
    <div className="space-y-10">
      <div>
        <h3 className="label-xs mb-4">Category</h3>
        <ul className="space-y-2">
          {tabs.map((t) => (
            <li key={t}>
              <button
                onClick={() => update({ category: t })}
                className={cn(
                  "text-sm text-muted-foreground transition-colors hover:text-foreground",
                  filters.category === t && "text-foreground underline underline-offset-4",
                )}
              >
                {t === "all" ? "All" : CATEGORY_LABELS[t]}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="label-xs mb-4">Size</h3>
        <div className="flex flex-wrap gap-2">
          {ALL_SIZES.map((s) => (
            <button
              key={s}
              onClick={() => update({ sizes: toggleIn(filters.sizes, s) })}
              className={cn(
                "label-xs border border-border px-3 py-2 transition-colors hover:border-ink",
                filters.sizes.includes(s) && "border-ink bg-ink text-background",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="label-xs mb-4">Colour</h3>
        <ul className="space-y-2">
          {colorNames.map((c) => (
            <li key={c}>
              <button
                onClick={() => update({ colors: toggleIn(filters.colors, c) })}
                className={cn(
                  "text-sm text-muted-foreground transition-colors hover:text-foreground",
                  filters.colors.includes(c) && "text-foreground underline underline-offset-4",
                )}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="label-xs mb-4">Price</h3>
        <input
          type="range"
          min={20}
          max={300}
          step={5}
          value={filters.maxPrice}
          onChange={(e) => update({ maxPrice: Number(e.target.value) })}
          className="w-full accent-[var(--ink)]"
        />
        <p className="mt-2 text-xs text-muted-foreground">Up to £{filters.maxPrice}</p>
      </div>

      <div>
        <h3 className="label-xs mb-4">Availability</h3>
        <label className="flex cursor-pointer items-center gap-3 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => update({ inStockOnly: e.target.checked })}
            className="h-4 w-4 accent-[var(--ink)]"
          />
          In stock only
        </label>
      </div>

      <button
        onClick={() =>
          update({
            category: "all",
            sizes: [],
            colors: [],
            maxPrice: 300,
            inStockOnly: false,
            query: "",
          })
        }
        className="label-xs text-muted-foreground underline underline-offset-4"
      >
        Clear all
      </button>
    </div>
  );

  return (
    <div>
      <div className="scrollbar-none -mx-4 mb-8 flex gap-6 overflow-x-auto px-4 md:mx-0 md:px-0">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => update({ category: t })}
            className={cn(
              "label-xs shrink-0 border-b py-3 transition-colors",
              filters.category === t
                ? "border-ink text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {t === "all" ? "All" : CATEGORY_LABELS[t]}
          </button>
        ))}
      </div>

      <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
        <aside className="hidden lg:block">
          <h2 className="label-sm mb-8 border-b border-border pb-4">Filter by</h2>
          {sidebar}
        </aside>

        <div>
          <div className="mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border pb-4">
            <p className="truncate text-xs text-muted-foreground">
              {results.length} {results.length === 1 ? "product" : "products"}
            </p>
            <div className="flex shrink-0 items-center gap-4">
              <button
                onClick={() => setFiltersOpen(true)}
                className="label-xs flex items-center gap-2 lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" strokeWidth={1.25} /> Filter
              </button>
              <label className="label-xs flex items-center gap-2">
                <span className="hidden text-muted-foreground sm:inline">Sort by:</span>
                <select
                  value={filters.sort}
                  onChange={(e) => update({ sort: e.target.value as SortKey })}
                  className="label-xs cursor-pointer bg-transparent outline-none"
                >
                  {SORTS.map((s) => (
                    <option key={s.key} value={s.key}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {results.length === 0 ? (
            <p className="py-20 text-center text-sm text-muted-foreground">
              No products match your selection.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 xl:grid-cols-4">
              {results.slice(0, visible).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          {visible < results.length && (
            <div className="mt-16 flex justify-center">
              <Btn variant="outline" size="lg" onClick={() => setVisible((v) => v + pageSize)}>
                Load More
              </Btn>
            </div>
          )}
        </div>
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background lg:hidden">
          <div className="flex h-16 items-center justify-between border-b border-border px-4">
            <span className="label-sm">Filter by</span>
            <button aria-label="Close filters" onClick={() => setFiltersOpen(false)}>
              <X className="h-5 w-5" strokeWidth={1.25} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">{sidebar}</div>
          <div className="border-t border-border p-4">
            <Btn size="block" onClick={() => setFiltersOpen(false)}>
              Show {results.length} products
            </Btn>
          </div>
        </div>
      )}
    </div>
  );
}