import { createFileRoute } from "@tanstack/react-router";
import { BtnLink } from "@/components/site/Btn";

const TITLE = "Thank You For Your Order — The Label Clothing";

export const Route = createFileRoute("/order-confirmed")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: "Your Label Clothing order has been received." },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: "Your Label Clothing order has been received." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrderConfirmed,
});

function OrderConfirmed() {
  const reference = "TLC-" + String(Math.floor(100000 + Math.random() * 899999));
  return (
    <div className="mx-auto max-w-xl px-4 py-28 text-center md:py-40">
      <p className="label-xs text-muted-foreground">Order {reference}</p>
      <h1 className="display mt-6 text-4xl md:text-5xl">Thank you for your order</h1>
      <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
        Your order has been received. We&rsquo;ve sent your confirmation to your email.
      </p>
      <div className="mt-12 flex flex-wrap justify-center gap-3">
        <BtnLink to="/shop">Continue Shopping</BtnLink>
        <BtnLink to="/" variant="outline">
          Back to Home
        </BtnLink>
      </div>
    </div>
  );
}