import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "@/lib/products";
import { journal } from "@/lib/journal";
import { ProductCard } from "@/components/site/ProductCard";
import { BtnLink } from "@/components/site/Btn";
import { Newsletter } from "@/components/site/Newsletter";
import heroImg from "@/assets/hero.jpg";
import splitWomen from "@/assets/split-women.jpg";
import splitMen from "@/assets/split-men.jpg";
import editorialImg from "@/assets/editorial.jpg";

const TITLE = "The Label Clothing — Modern Essentials for Every Day";
const DESCRIPTION =
  "Discover contemporary wardrobe essentials for women and men. Clean silhouettes, everyday comfort and premium styling, shipped across Europe.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

const CATEGORIES: { label: string; to: string; search?: Record<string, string> }[] = [
  { label: "Women", to: "/women" },
  { label: "Men", to: "/men" },
  { label: "Tops", to: "/shop", search: { category: "tops" } },
  { label: "Shirts", to: "/shop", search: { category: "shirts" } },
  { label: "T-Shirts", to: "/shop", search: { category: "t-shirts" } },
  { label: "Trousers", to: "/shop", search: { category: "trousers" } },
  { label: "Denim", to: "/shop", search: { category: "denim" } },
  { label: "Outerwear", to: "/shop", search: { category: "outerwear" } },
  { label: "Accessories", to: "/shop", search: { category: "accessories" } },
];

function Index() {
  const newArrivals = products.filter((p) => p.isNew).slice(0, 8);
  const trending = products.filter((p) => p.trending).slice(0, 8);

  return (
    <div>
      {/* Hero */}
      <section className="relative">
        <img
          src={heroImg}
          alt="Two models wearing neutral everyday essentials from The Label Clothing"
          width={1920}
          height={1088}
          className="h-[72vh] min-h-[460px] w-full object-cover object-[70%_center] md:h-[88vh]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/40 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-[1600px] px-4 md:px-8">
            <div className="max-w-lg">
              <p className="label-xs text-muted-foreground">New Season</p>
              <h1 className="display mt-5 text-5xl leading-[0.95] sm:text-6xl md:text-7xl">
                The New Everyday
              </h1>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base">
                Modern wardrobe essentials designed for every day, everywhere.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <BtnLink to="/women" size="lg">
                  Shop Women
                </BtnLink>
                <BtnLink to="/men" variant="outline" size="lg">
                  Shop Men
                </BtnLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New arrivals */}
      <section className="mx-auto max-w-[1600px] px-4 py-20 md:px-8 md:py-28">
        <div className="grid gap-4 border-b border-border pb-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div>
            <h2 className="display text-3xl md:text-4xl">New Arrivals</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Fresh pieces. New season. Your wardrobe, updated.
            </p>
          </div>
          <Link to="/shop" className="label-xs link-underline justify-self-start md:justify-self-end">
            View all
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 xl:grid-cols-4">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Split editorial */}
      <section className="grid md:grid-cols-2">
        {[
          {
            img: splitWomen,
            title: "Women",
            copy: "Modern silhouettes. Everyday essentials.",
            to: "/women",
            cta: "Shop Women",
          },
          {
            img: splitMen,
            title: "Men",
            copy: "Clean cuts. Effortless style.",
            to: "/men",
            cta: "Shop Men",
          },
        ].map((panel) => (
          <div key={panel.title} className="group relative overflow-hidden">
            <img
              src={panel.img}
              alt={panel.title}
              loading="lazy"
              width={1024}
              height={1280}
              className="h-[520px] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03] md:h-[760px]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/55 to-transparent p-8 pt-24 md:p-12">
              <h2 className="display text-4xl text-background md:text-5xl">{panel.title}</h2>
              <p className="mt-3 text-sm text-background/85">{panel.copy}</p>
              <BtnLink to={panel.to} variant="light" className="mt-8">
                {panel.cta}
              </BtnLink>
            </div>
          </div>
        ))}
      </section>

      {/* Trending carousel */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1600px] px-4 md:px-8">
          <div className="flex items-end justify-between border-b border-border pb-8">
            <h2 className="display text-3xl md:text-4xl">Trending Now</h2>
            <p className="hidden text-xs text-muted-foreground sm:block">Scroll to explore</p>
          </div>
        </div>
        <div className="scrollbar-none mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:gap-6 md:px-8">
          {trending.map((p) => (
            <div key={p.id} className="w-[68vw] shrink-0 snap-start sm:w-[42vw] lg:w-[23vw]">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* Editorial banner */}
      <section className="relative">
        <img
          src={editorialImg}
          alt="Neutral garments in a sunlit minimal interior"
          loading="lazy"
          width={1920}
          height={1008}
          className="h-[420px] w-full object-cover md:h-[620px]"
        />
        <div className="absolute inset-0 bg-ink/25" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-[1600px] px-4 md:px-8">
            <div className="max-w-md text-background">
              <h2 className="display text-4xl md:text-6xl">Less, but better</h2>
              <p className="mt-5 text-sm leading-relaxed text-background/85">
                Timeless pieces designed to work together, season after season.
              </p>
              <BtnLink to="/shop" variant="light" size="lg" className="mt-10">
                Explore the Collection
              </BtnLink>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-[1600px] px-4 py-20 md:px-8 md:py-28">
        <h2 className="display text-3xl md:text-4xl">Shop by Category</h2>
        <div className="mt-10 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3 lg:grid-cols-3">
          {CATEGORIES.map((c) => (
            <Link
              key={c.label}
              to={c.to}
              search={c.search as never}
              className="label-sm group flex items-center justify-between bg-background px-6 py-10 transition-colors hover:bg-sand md:px-8 md:py-14"
            >
              {c.label}
              <span className="text-muted-foreground transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Journal */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1600px] px-4 py-20 md:px-8 md:py-28">
          <h2 className="display text-3xl md:text-4xl">The Label Journal</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {journal.map((entry) => (
              <Link key={entry.slug} to="/journal" className="group">
                <div className="overflow-hidden bg-secondary">
                  <img
                    src={entry.image}
                    alt={entry.title}
                    loading="lazy"
                    width={1200}
                    height={900}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <p className="label-xs mt-6 text-muted-foreground">
                  {entry.category} · {entry.readTime}
                </p>
                <h3 className="display mt-3 text-2xl">{entry.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{entry.excerpt}</p>
              </Link>
            ))}
          </div>
          <BtnLink to="/journal" variant="outline" className="mt-14">
            Read the Journal
          </BtnLink>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
