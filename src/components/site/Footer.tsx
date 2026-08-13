import { Link } from "@tanstack/react-router";
import { Newsletter } from "./Newsletter";

const COLUMNS: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "Women", to: "/women" },
      { label: "Men", to: "/men" },
      { label: "New In", to: "/shop" },
      { label: "Clothing", to: "/shop" },
      { label: "Accessories", to: "/shop" },
      { label: "Sale", to: "/shop" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Contact Us", to: "/contact" },
      { label: "Delivery", to: "/contact" },
      { label: "Returns", to: "/contact" },
      { label: "Size Guide", to: "/contact" },
      { label: "FAQs", to: "/contact" },
      { label: "Track Order", to: "/contact" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our Story", to: "/about" },
      { label: "The Label Journal", to: "/journal" },
      { label: "Careers", to: "/about" },
      { label: "Sustainability", to: "/about" },
    ],
  },
];

const SOCIAL = ["Instagram", "Facebook", "Pinterest", "TikTok"];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1600px] px-4 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.2fr_repeat(4,1fr)]">
          <div className="max-w-sm">
            <span className="block text-base tracking-[0.3em]">THE LABEL</span>
            <span className="mt-1 block text-[9px] tracking-[0.42em] text-muted-foreground">
              CLOTHING
            </span>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Modern essentials. Made for every day.
            </p>
            <div className="mt-8">
              <p className="label-xs mb-4 text-muted-foreground">Newsletter</p>
              <Newsletter compact />
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="label-xs text-muted-foreground">{col.title}</h3>
              <ul className="mt-6 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="link-underline text-sm text-foreground">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="label-xs text-muted-foreground">Follow</h3>
            <ul className="mt-6 space-y-3">
              {SOCIAL.map((s) => (
                <li key={s}>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-underline text-sm"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 The Label Clothing</p>
          <div className="flex flex-wrap gap-6">
            <span>Privacy Policy</span>
            <span>Terms &amp; Conditions</span>
            <span>Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}