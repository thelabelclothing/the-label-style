import { createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, Minus, Plus, RefreshCw, ShieldCheck, Star, Truck } from "lucide-react";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ProductCard } from "@/components/site/ProductCard";
import { Btn } from "@/components/site/Btn";
import { getProduct, priceLabel, products, relatedProducts } from "@/lib/products";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.product.name} — The Label Clothing`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.product.description },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.product.description },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToBag, toggleWishlist, isWishlisted, markViewed, recentlyViewed } = useStore();
  const [color, setColor] = useState(product.colors[0]?.name ?? "");
  const [size, setSize] = useState(product.sizes.length === 1 ? (product.sizes[0] ?? "") : "");
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);

  useEffect(() => {
    setColor(product.colors[0]?.name ?? "");
    setSize(product.sizes.length === 1 ? (product.sizes[0] ?? "") : "");
    setQty(1);
    setActive(0);
    markViewed(product.id);
  }, [product, markViewed]);

  const related = relatedProducts(product);
  const recent = recentlyViewed
    .filter((id) => id !== product.id)
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean)
    .slice(0, 4);

  const add = () => {
    if (!size) {
      toast.error("Please select a size.");
      return;
    }
    addToBag(product, size, color, qty);
    toast.success(`${product.name} added to your bag.`);
  };

  const wished = isWishlisted(product.id);

  return (
    <div>
      <div className="mx-auto max-w-[1600px] px-4 py-8 md:px-8">
        <Breadcrumbs
          trail={[{ label: "Shop", to: "/shop" }, { label: product.name }]}
        />
      </div>

      <div className="mx-auto grid max-w-[1600px] gap-10 px-4 pb-20 md:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
        <div>
          <div className="bg-secondary">
            <img
              src={product.gallery[active] ?? product.image}
              alt={product.name}
              width={900}
              height={1125}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {product.gallery.map((src, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
                className={cn("bg-secondary", active === i && "ring-1 ring-ink")}
              >
                <img src={src} alt="" loading="lazy" className="aspect-[4/5] w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-32 lg:self-start">
          <h1 className="display text-3xl md:text-4xl">{product.name}</h1>
          <p className="mt-3 text-base">{priceLabel(product.price)}</p>

          <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3.5 w-3.5",
                    i < Math.round(product.rating) ? "fill-current text-foreground" : "",
                  )}
                  strokeWidth={1}
                />
              ))}
            </span>
            <span>
              {product.rating.toFixed(1)} · {product.reviews} reviews
            </span>
          </div>

          <p className="label-xs mt-10 text-muted-foreground">Colour — {color}</p>
          <div className="mt-3 flex gap-2">
            {product.colors.map((c) => (
              <button
                key={c.name}
                aria-label={c.name}
                onClick={() => setColor(c.name)}
                style={{ backgroundColor: c.hex }}
                className={cn(
                  "h-8 w-8 border border-border",
                  color === c.name && "ring-1 ring-ink ring-offset-2 ring-offset-background",
                )}
              />
            ))}
          </div>

          <div className="mt-10 flex items-center justify-between">
            <p className="label-xs text-muted-foreground">Select size</p>
            <button
              onClick={() => toast("Size guide", { description: product.fit })}
              className="label-xs underline underline-offset-4"
            >
              Size Guide
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={cn(
                  "label-xs min-w-14 border border-border px-3 py-3 transition-colors hover:border-ink",
                  size === s && "border-ink bg-ink text-background",
                )}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="mt-10 flex items-center gap-6">
            <p className="label-xs text-muted-foreground">Quantity</p>
            <div className="flex items-center border border-border">
              <button
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid h-11 w-11 place-items-center"
              >
                <Minus className="h-3.5 w-3.5" strokeWidth={1.25} />
              </button>
              <span className="w-8 text-center text-sm">{qty}</span>
              <button
                aria-label="Increase quantity"
                onClick={() => setQty((q) => q + 1)}
                className="grid h-11 w-11 place-items-center"
              >
                <Plus className="h-3.5 w-3.5" strokeWidth={1.25} />
              </button>
            </div>
          </div>

          <Btn size="block" className="mt-8" onClick={add} disabled={!product.inStock}>
            {product.inStock ? "Add to Bag" : "Sold Out"}
          </Btn>
          <Btn
            variant="outline"
            size="block"
            className="mt-3"
            onClick={() => toggleWishlist(product.id)}
          >
            <Heart className={cn("h-4 w-4", wished && "fill-current")} strokeWidth={1.25} />
            {wished ? "Saved to Wishlist" : "Add to Wishlist"}
          </Btn>

          <ul className="mt-8 grid gap-3 border-y border-border py-6 text-xs text-muted-foreground sm:grid-cols-3">
            <li className="flex items-center gap-2">
              <Truck className="h-4 w-4 shrink-0" strokeWidth={1.25} /> Free delivery over €100
            </li>
            <li className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 shrink-0" strokeWidth={1.25} /> Easy returns
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 shrink-0" strokeWidth={1.25} /> Secure checkout
            </li>
          </ul>

          <Accordion type="single" collapsible className="mt-4" defaultValue="description">
            <AccordionItem value="description">
              <AccordionTrigger className="label-xs">Description</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="details">
              <AccordionTrigger className="label-xs">Details &amp; Care</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {product.details.map((d) => (
                    <li key={d}>— {d}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="fit">
              <AccordionTrigger className="label-xs">Size &amp; Fit</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {product.fit}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="delivery">
              <AccordionTrigger className="label-xs">Delivery &amp; Returns</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                Standard delivery in 2–4 working days across Europe, free on orders over €100.
                Express delivery available at checkout. Returns are accepted within 30 days of
                receipt in original condition.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <section className="border-t border-border">
        <div className="mx-auto max-w-[1600px] px-4 py-20 md:px-8">
          <h2 className="display text-3xl">You May Also Like</h2>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 xl:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {recent.length > 0 && (
        <section className="border-t border-border">
          <div className="mx-auto max-w-[1600px] px-4 py-20 md:px-8">
            <h2 className="display text-3xl">Recently Viewed</h2>
            <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 xl:grid-cols-4">
              {recent.map((p) => (
                <ProductCard key={p!.id} product={p!} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}