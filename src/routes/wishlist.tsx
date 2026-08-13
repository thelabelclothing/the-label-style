import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/site/ProductCard";
import { BtnLink } from "@/components/site/Btn";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { products } from "@/lib/products";
import { useStore } from "@/lib/store";

const TITLE = "Wishlist — The Label Clothing";
const DESCRIPTION = "The pieces you've saved from The Label Clothing collection.";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useStore();
  const saved = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-10 md:px-8 md:py-14">
      <Breadcrumbs trail={[{ label: "Wishlist" }]} />
      <h1 className="display mt-8 text-4xl md:text-5xl">Wishlist</h1>

      {saved.length === 0 ? (
        <div className="mt-10 border-t border-border py-24 text-center">
          <p className="text-sm text-muted-foreground">You haven&rsquo;t saved anything yet.</p>
          <BtnLink to="/shop" className="mt-8">
            Start Shopping
          </BtnLink>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 xl:grid-cols-4">
          {saved.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}