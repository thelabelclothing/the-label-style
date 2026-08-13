import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Lock } from "lucide-react";
import { Btn } from "@/components/site/Btn";
import { FREE_SHIPPING_THRESHOLD, formatEUR, formatGBP } from "@/lib/products";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const TITLE = "Checkout — The Label Clothing";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: "Secure checkout for your Label Clothing order." },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: "Secure checkout for your Label Clothing order." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

const SHIPPING_METHODS = [
  { id: "standard", label: "Standard delivery", detail: "2–4 working days", price: 6.95 },
  { id: "express", label: "Express delivery", detail: "Next working day", price: 12.95 },
  { id: "collect", label: "Collect in store", detail: "Ready in 2 hours", price: 0 },
];

function field(label: string) {
  return (
    <label className="block">
      <span className="label-xs text-muted-foreground">{label}</span>
    </label>
  );
}

function CheckoutPage() {
  const { bagDetailed, subtotal, clearBag } = useStore();
  const navigate = useNavigate();
  const [method, setMethod] = useState("standard");
  const [placing, setPlacing] = useState(false);

  const selected = SHIPPING_METHODS.find((m) => m.id === method)!;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : selected.price;
  const total = subtotal + shipping;

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setPlacing(true);
    clearBag();
    navigate({ to: "/order-confirmed" });
  };

  const input =
    "mt-2 h-12 w-full border border-input bg-background px-4 text-sm outline-none focus:border-ink";

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 md:px-8 md:py-14">
      <h1 className="display text-4xl md:text-5xl">Checkout</h1>

      <form
        onSubmit={placeOrder}
        className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.7fr)] lg:gap-20"
      >
        <div className="space-y-12">
          <section>
            <h2 className="label-sm border-b border-border pb-4">Contact Information</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                {field("Email")}
                <input required type="email" className={input} placeholder="you@email.com" />
              </div>
              <div>
                {field("Phone")}
                <input required type="tel" className={input} placeholder="+44 7700 900000" />
              </div>
            </div>
          </section>

          <section>
            <h2 className="label-sm border-b border-border pb-4">Delivery Address</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                {field("First name")}
                <input required className={input} />
              </div>
              <div>
                {field("Last name")}
                <input required className={input} />
              </div>
              <div className="sm:col-span-2">
                {field("Address")}
                <input required className={input} />
              </div>
              <div>
                {field("City")}
                <input required className={input} />
              </div>
              <div>
                {field("Postcode")}
                <input required className={input} />
              </div>
              <div className="sm:col-span-2">
                {field("Country")}
                <select className={input} defaultValue="United Kingdom">
                  {[
                    "United Kingdom",
                    "Ireland",
                    "Germany",
                    "France",
                    "Netherlands",
                    "Spain",
                    "Italy",
                    "Pakistan",
                  ].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <section>
            <h2 className="label-sm border-b border-border pb-4">Shipping Method</h2>
            <div className="mt-6 space-y-3">
              {SHIPPING_METHODS.map((m) => (
                <label
                  key={m.id}
                  className={cn(
                    "flex cursor-pointer items-center justify-between border border-border p-4 transition-colors",
                    method === m.id && "border-ink",
                  )}
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={method === m.id}
                      onChange={() => setMethod(m.id)}
                      className="h-4 w-4 accent-[var(--ink)]"
                    />
                    <span>
                      <span className="block text-sm">{m.label}</span>
                      <span className="block text-xs text-muted-foreground">{m.detail}</span>
                    </span>
                  </span>
                  <span className="text-sm">
                    {subtotal >= FREE_SHIPPING_THRESHOLD || m.price === 0
                      ? "Free"
                      : formatGBP(m.price)}
                  </span>
                </label>
              ))}
            </div>
          </section>

          <section>
            <h2 className="label-sm border-b border-border pb-4">Payment</h2>
            <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="h-3.5 w-3.5" strokeWidth={1.25} /> All transactions are encrypted
              and secure.
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                {field("Card number")}
                <input required className={input} placeholder="0000 0000 0000 0000" />
              </div>
              <div>
                {field("Expiry")}
                <input required className={input} placeholder="MM / YY" />
              </div>
              <div>
                {field("CVC")}
                <input required className={input} placeholder="123" />
              </div>
              <div className="sm:col-span-2">
                {field("Name on card")}
                <input required className={input} />
              </div>
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-32 lg:self-start">
          <div className="border border-border p-6 md:p-8">
            <h2 className="label-sm border-b border-border pb-4">Order Summary</h2>
            <ul className="mt-6 space-y-5">
              {bagDetailed.map(({ item, product }) => (
                <li key={item.key} className="flex gap-4">
                  <img
                    src={product.image}
                    alt=""
                    loading="lazy"
                    className="h-20 w-16 shrink-0 object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">{product.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.size} · {item.color} · Qty {item.qty}
                    </p>
                  </div>
                  <p className="text-sm">{formatGBP(product.price * item.qty)}</p>
                </li>
              ))}
              {bagDetailed.length === 0 && (
                <li className="text-sm text-muted-foreground">Your bag is empty.</li>
              )}
            </ul>
            <dl className="mt-8 space-y-4 border-t border-border pt-6 text-sm">
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
                  {formatGBP(total)}
                  <span className="ml-2 text-xs text-muted-foreground">{formatEUR(total)}</span>
                </dd>
              </div>
            </dl>
            <Btn
              type="submit"
              size="block"
              className="mt-8"
              disabled={placing || bagDetailed.length === 0}
            >
              Place Order
            </Btn>
          </div>
        </aside>
      </form>
    </div>
  );
}