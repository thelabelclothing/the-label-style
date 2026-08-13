import { createFileRoute } from "@tanstack/react-router";
import { CollectionView } from "@/components/site/CollectionView";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { products, type Category } from "@/lib/products";

const TITLE = "Women — The Label Clothing";
const DESCRIPTION =
  "Contemporary womenswear essentials: tops, shirts, denim, trousers, dresses and outerwear made for everyday life.";

export const Route = createFileRoute("/women")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: WomenPage,
});

const TABS: (Category | "all")[] = [
  "all",
  "tops",
  "t-shirts",
  "shirts",
  "denim",
  "trousers",
  "dresses",
  "outerwear",
  "accessories",
];

function WomenPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 py-10 md:px-8 md:py-14">
      <Breadcrumbs trail={[{ label: "Women" }]} />
      <header className="mt-8 max-w-xl border-b border-border pb-10">
        <h1 className="display text-4xl md:text-5xl">Women</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Contemporary essentials made for everyday life.
        </p>
      </header>
      <div className="mt-10">
        <CollectionView source={products} tabs={TABS} gender="women" pageSize={12} />
      </div>
    </div>
  );
}