import { createFileRoute } from "@tanstack/react-router";
import { BtnLink } from "@/components/site/Btn";
import aboutHero from "@/assets/about-hero.jpg";
import editorial from "@/assets/editorial.jpg";
import journal1 from "@/assets/journal-1.jpg";

const TITLE = "Our Story — The Label Clothing";
const DESCRIPTION =
  "The Label Clothing designs modern wardrobe essentials that balance clean silhouettes, everyday comfort and timeless style.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: AboutPage,
});

const SECTIONS = [
  {
    title: "Designed for everyday",
    copy: "We start with how a piece will be worn: on the commute, at the desk, at dinner. Silhouettes are refined until they feel easy, not effortful, and every fit is tested on real bodies before it reaches the collection.",
    image: journal1,
  },
  {
    title: "Quality in the details",
    copy: "Fabric is chosen for how it behaves after the fiftieth wash, not the first. Seams are reinforced where they take strain, hems weighted so they hang true, trims specified to outlast the garment they sit on.",
    image: editorial,
  },
];

function AboutPage() {
  return (
    <div>
      <section className="relative">
        <img
          src={aboutHero}
          alt="The Label Clothing design atelier"
          width={1920}
          height={1000}
          className="h-[46vh] min-h-[320px] w-full object-cover md:h-[62vh]"
        />
        <div className="absolute inset-0 bg-ink/30" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-[1600px] px-4 pb-10 md:px-8 md:pb-16">
            <h1 className="display text-5xl text-background md:text-7xl">Our Story</h1>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 md:py-28">
        <div className="space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          <p>
            The Label Clothing was created around a simple idea: great clothes should feel
            effortless.
          </p>
          <p>
            We design modern wardrobe essentials that balance clean silhouettes, everyday comfort
            and timeless style.
          </p>
          <p>
            From the first sketch to the final piece, every detail is considered to create clothing
            that belongs in your wardrobe — not just for one season, but for years to come.
          </p>
        </div>
      </section>

      {SECTIONS.map((s, i) => (
        <section key={s.title} className="border-t border-border">
          <div className="mx-auto grid max-w-[1600px] items-center gap-10 px-4 py-16 md:grid-cols-2 md:gap-20 md:px-8 md:py-24">
            <img
              src={s.image}
              alt={s.title}
              loading="lazy"
              className={`aspect-[4/3] w-full object-cover ${i % 2 ? "md:order-2" : ""}`}
            />
            <div className="max-w-md">
              <h2 className="display text-3xl md:text-4xl">{s.title}</h2>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
            </div>
          </div>
        </section>
      ))}

      <section className="border-t border-border bg-sand">
        <div className="mx-auto max-w-2xl px-4 py-24 text-center md:py-32">
          <h2 className="display text-3xl md:text-4xl">Style without the noise</h2>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            No seasonal churn, no shouting logos. We release small collections built to layer with
            what you already own, and we keep the pieces you love in production.
          </p>
          <BtnLink to="/shop" className="mt-10">
            Explore the Collection
          </BtnLink>
        </div>
      </section>
    </div>
  );
}