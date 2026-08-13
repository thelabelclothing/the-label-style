import { createFileRoute } from "@tanstack/react-router";
import { CollectionView, type SortKey } from "@/components/site/CollectionView";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { products, type Category } from "@/lib/products";

const TITLE = "Shop All — The Label Clothing";
const DESCRIPTION =
  "Shop contemporary essentials for women and men. Filter by category, size, colour and price across the full Label Clothing collection.";

interface ShopSearch {
  q?: string | undefined;
  category?: Category | "all" | undefined;
  sort?: SortKey | undefined;
  sale?: boolean | undefined;
}

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    q: typeof search["q"] === "string" ? search["q"] : undefined,
    category: (search["category"] as ShopSearch["category"]) ?? undefined,
    sort: (search["sort"] as SortKey) ?? undefined,
    sale: search["sale"] === true || search["sale"] === "true" ? true : undefined,
  }),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: ShopPage,
});

const TABS: (Category | "all")[] = [
  "all",
  "tops",
  "shirts",
  "t-shirts",
  "trousers",
  "denim",
  "outerwear",
  "dresses",
  "accessories",
];

function ShopPage() {
  const search = Route.useSearch();
  const key = `${search.q ?? ""}-${search.category ?? ""}-${search.sort ?? ""}-${search.sale ?? ""}`;

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-10 md:px-8 md:py-14">
      <Breadcrumbs trail={[{ label: search.sale ? "Sale" : "Shop All" }]} />
      <header className="mt-8 max-w-xl border-b border-border pb-10">
        <h1 className="display text-4xl md:text-5xl">{search.sale ? "Sale" : "Shop All"}</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Discover contemporary essentials for women and men, designed with comfort, versatility
          and modern style in mind.
        </p>
      </header>
      <div className="mt-10">
        <CollectionView
          key={key}
          source={products}
          tabs={TABS}
          initialCategory={search.category ?? "all"}
          initialSort={search.sort ?? "featured"}
          initialQuery={search.q ?? ""}
          saleOnly={Boolean(search.sale)}
          pageSize={8}
        />
      </div>
    </div>
  );
}