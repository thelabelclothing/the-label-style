import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Btn } from "@/components/site/Btn";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

const TITLE = "Get in Touch — The Label Clothing";
const DESCRIPTION =
  "Contact The Label Clothing customer care team about orders, delivery, returns and sizing.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: ContactPage,
});

const FAQS = [
  {
    q: "How long does delivery take?",
    a: "Standard delivery arrives in 2–4 working days across Europe and 3–6 working days internationally.",
  },
  {
    q: "How do I return an item?",
    a: "Returns are accepted within 30 days. Use the prepaid label included in your parcel or request one from customer care.",
  },
  {
    q: "How should I choose my size?",
    a: "Each product page lists the model's measurements and the fit of the piece. Between sizes, we recommend sizing up for relaxed styles.",
  },
];

function ContactPage() {
  const [sent, setSent] = useState(false);
  const input =
    "mt-2 h-12 w-full border border-input bg-background px-4 text-sm outline-none focus:border-ink";

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.reset();
    setSent(true);
    toast.success("Message sent. We'll be in touch within 24 hours.");
  };

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 md:px-8 md:py-14">
      <Breadcrumbs trail={[{ label: "Contact" }]} />
      <h1 className="display mt-8 text-4xl md:text-5xl">Get in Touch</h1>

      <div className="mt-12 grid gap-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-24">
        <form onSubmit={submit} className="max-w-xl">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="label-xs text-muted-foreground">Name</span>
              <input required className={input} />
            </label>
            <label className="block">
              <span className="label-xs text-muted-foreground">Email</span>
              <input required type="email" className={input} />
            </label>
            <label className="block sm:col-span-2">
              <span className="label-xs text-muted-foreground">Order number (optional)</span>
              <input className={input} placeholder="TLC-000000" />
            </label>
            <label className="block sm:col-span-2">
              <span className="label-xs text-muted-foreground">Message</span>
              <textarea
                required
                rows={6}
                className="mt-2 w-full border border-input bg-background p-4 text-sm outline-none focus:border-ink"
              />
            </label>
          </div>
          <Btn type="submit" size="lg" className="mt-8">
            Send Message
          </Btn>
          {sent && (
            <p className="mt-5 text-xs text-muted-foreground">
              Thank you — your message is with our customer care team.
            </p>
          )}
        </form>

        <aside className="space-y-10">
          <div>
            <h2 className="label-xs text-muted-foreground">Customer Care</h2>
            <p className="mt-4 text-sm leading-relaxed">
              care@thelabelclothing.com
              <br />
              +44 20 7946 0102
            </p>
          </div>
          <div>
            <h2 className="label-xs text-muted-foreground">Opening Hours</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Monday – Friday, 09:00 – 18:00 CET
              <br />
              Saturday, 10:00 – 16:00 CET
              <br />
              Sunday, closed
            </p>
          </div>
          <div>
            <h2 className="label-xs text-muted-foreground">FAQs</h2>
            <dl className="mt-4 space-y-5">
              {FAQS.map((f) => (
                <div key={f.q}>
                  <dt className="text-sm">{f.q}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}