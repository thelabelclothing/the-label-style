import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { BtnLink } from "@/components/site/Btn";
import { FREE_SHIPPING_THRESHOLD, formatEUR, formatGBP } from "@/lib/products";
import { useStore } from "@/lib/store";

const TITLE = "Your Bag — The Label Clothing";
const DESCRIPTION = "Review the pieces in your shopping bag and continue to secure checkout.";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { bagDetailed, subtotal, setQty, removeFromBag } = useStore();
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 6.95;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-10 md:px-8 md:py-14">
      <Breadcrumbs trail={[{ label: "Your Bag" }]} />
      <h1 className="display mt-8 text-4xl md:text-5xl">Your Bag</h1>

      {bagDetailed.length === 0 ? (
        <div className="border-t border-border py-24 text-center">
          <p className="text-sm text-muted-foreground">Your bag is currently empty.</p>
          <BtnLink to="/shop" className="mt-8">
            Continue Shopping
          </BtnLink>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.65fr)] lg:gap-20">
          <div className="border-t border-border">
            {bagDetailed.map(({ item, product }) => (
              <div
                key={item.key}
                className="grid grid-cols-[96px_minmax(0,1fr)] gap-4 border-b border-border py-6 sm:grid-cols-[120px_minmax(0,1fr)] sm:gap-6"
              >
                <Link to="/product/$slug" params={{ slug: product.slug }} className="bg-secondary">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover"
                  />
                </Link>
                <div className="flex min-w-0 flex-col">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4">
                    <div className="min-w-0">
                      <h2 className="truncate text-sm">
                        <Link to="/product/$slug" params={{ slug: product.slug }}>
                          {product.name}
                        </Link>
                      </h2>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Size: {item.size} · Colour: {item.color}
                      </p>
                    </div>
                    <button
                      aria-label="Remove item"
                      onClick={() => removeFromBag(item.key)}
                      className="shrink-0 self-start p-1 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" strokeWidth={1.25} />
                    </button>
                  </div>
                  <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                    <div className="flex items-center border border-border">
                      <button
                        aria-label="Decrease quantity"
                        onClick={() => setQty(item.key, item.qty - 1)}
                        className="grid h-9 w-9 place-items-center"
                      >
                        <Minus className="h-3 w-3" strokeWidth={1.25} />
                      </button>
                      <span className="w-8 text-center text-sm">{item.qty}</span>
                      <button
                        aria-label="Increase quantity"
                        onClick={() => setQty(item.key, item.qty + 1)}
                        className="grid h-9 w-9 place-items-center"
                      >
                        <Plus className="h-3 w-3" strokeWidth={1.25} />
                      </button>
                    </div>
                    <p className="text-sm">
                      {formatGBP(product.price * item.qty)}
                      <span className="ml-2 text-xs text-muted-foreground">
                        {formatEUR(product.price * item.qty)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="border border-border p-6 md:p-8">
              <h2 className="label-sm border-b border-border pb-4">Order Summary</h2>
              <dl className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd>{formatGBP(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Shipping</dt>
                  <dd>{shipping === 0 ? "Free" : formatGBP(shipping)}</dd>
                </div>
                <div className="flex justify-between border-t border-border pt-4 text-base">
                  <dt>Total</dt>
                  <dd>
                    {formatGBP(subtotal + shipping)}
                    <span className="ml-2 text-xs text-muted-foreground">
                      {formatEUR(subtotal + shipping)}
                    </span>
                  </dd>
                </div>
              </dl>

              {remaining > 0 ? (
                <div className="mt-6">
                  <p className="text-xs text-muted-foreground">
                    You&rsquo;re {formatEUR(remaining)} away from free delivery.
                  </p>
                  <div className="mt-3 h-px w-full bg-border">
                    <div
                      className="h-px bg-ink"
                      style={{
                        width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ) : (
                <p className="mt-6 text-xs text-muted-foreground">
                  You qualify for free delivery.
                </p>
              )}

              <BtnLink to="/checkout" size="block" className="mt-8">
                Checkout
              </BtnLink>
              <Link
                to="/shop"
                className="label-xs link-underline mt-6 inline-block text-muted-foreground"
              >
                Continue shopping
              </Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}