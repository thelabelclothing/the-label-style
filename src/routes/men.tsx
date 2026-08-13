import { createFileRoute } from "@tanstack/react-router";
import { CollectionView } from "@/components/site/CollectionView";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { products, type Category } from "@/lib/products";

const TITLE = "Men — The Label Clothing";
const DESCRIPTION =
  "Clean menswear essentials: t-shirts, shirts, denim, trousers, overshirts and outerwear in modern fits.";

export const Route = createFileRoute("/men")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: MenPage,
});

const TABS: (Category | "all")[] = [
  "all",
  "t-shirts",
  "shirts",
  "tops",
  "denim",
  "trousers",
  "outerwear",
  "accessories",
];

function MenPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 py-10 md:px-8 md:py-14">
      <Breadcrumbs trail={[{ label: "Men" }]} />
      <header className="mt-8 max-w-xl border-b border-border pb-10">
        <h1 className="display text-4xl md:text-5xl">Men</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Clean essentials. Modern fits. Everyday confidence.
        </p>
      </header>
      <div className="mt-10">
        <CollectionView source={products} tabs={TABS} gender="men" pageSize={12} />
      </div>
    </div>
  );
}