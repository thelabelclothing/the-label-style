import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Heart } from "lucide-react";
import { priceLabel, type Product } from "@/lib/products";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { QuickView } from "./QuickView";

export function ProductCard({ product }: { product: Product }) {
  const { toggleWishlist, isWishlisted } = useStore();
  const [quickOpen, setQuickOpen] = useState(false);
  const wished = isWishlisted(product.id);

  return (
    <article className="group relative">
      <div className="relative overflow-hidden bg-secondary">
        <Link to="/product/$slug" params={{ slug: product.slug }} aria-label={product.name}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={900}
            height={1125}
            className="aspect-[4/5] w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
          />
          <img
            src={product.hoverImage}
            alt=""
            aria-hidden
            loading="lazy"
            width={900}
            height={1125}
            className="absolute inset-0 aspect-[4/5] w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </Link>

        <div className="pointer-events-none absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && <span className="label-xs bg-background px-2 py-1">New</span>}
          {product.compareAt && (
            <span className="label-xs bg-sale px-2 py-1 text-background">Sale</span>
          )}
          {!product.inStock && (
            <span className="label-xs bg-background px-2 py-1 text-muted-foreground">Sold out</span>
          )}
        </div>

        <button
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-3 right-3 grid h-9 w-9 place-items-center bg-background/80 backdrop-blur transition-colors hover:bg-background"
        >
          <Heart
            className={cn("h-4 w-4", wished && "fill-current")}
            strokeWidth={1.25}
          />
        </button>

        <div className="absolute inset-x-0 bottom-0 hidden translate-y-full gap-px transition-transform duration-300 group-hover:translate-y-0 md:grid md:grid-cols-2">
          <button
            onClick={() => setQuickOpen(true)}
            className="label-xs bg-background/95 py-3 backdrop-blur transition-colors hover:bg-background"
          >
            Quick View
          </button>
          <button
            onClick={() => setQuickOpen(true)}
            className="label-xs bg-ink py-3 text-background transition-opacity hover:opacity-90"
          >
            Add to Bag
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-sm">
            <Link to="/product/$slug" params={{ slug: product.slug }} className="link-underline">
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {product.colors.map((c) => c.name).join(" / ")}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className={cn("text-sm", product.compareAt && "text-sale")}>
            {priceLabel(product.price)}
          </p>
          {product.compareAt && (
            <p className="mt-1 text-xs text-muted-foreground line-through">
              £{product.compareAt.toFixed(2)}
            </p>
          )}
        </div>
      </div>

      <button
        onClick={() => setQuickOpen(true)}
        className="label-xs mt-3 w-full border border-ink py-3 md:hidden"
      >
        Add to Bag
      </button>

      <QuickView product={product} open={quickOpen} onOpenChange={setQuickOpen} />
    </article>
  );
}