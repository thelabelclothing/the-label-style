import { createFileRoute } from "@tanstack/react-router";
import { journal } from "@/lib/journal";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Newsletter } from "@/components/site/Newsletter";

const TITLE = "The Label Journal — Styling Notes & Wardrobe Ideas";
const DESCRIPTION =
  "Styling notes, capsule wardrobe guides and everyday dressing ideas from The Label Clothing.";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: JournalPage,
});

function JournalPage() {
  const [lead, ...rest] = journal;

  return (
    <div>
      <div className="mx-auto max-w-[1600px] px-4 py-10 md:px-8 md:py-14">
        <Breadcrumbs trail={[{ label: "Journal" }]} />
        <h1 className="display mt-8 text-4xl md:text-5xl">The Label Journal</h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          Notes on dressing well with less — styling, fit and the pieces worth keeping.
        </p>

        {lead && (
          <article className="mt-14 grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <img
              src={lead.image}
              alt={lead.title}
              width={1200}
              height={900}
              className="aspect-[4/3] w-full object-cover"
            />
            <div>
              <p className="label-xs text-muted-foreground">
                {lead.category} · {lead.readTime}
              </p>
              <h2 className="display mt-4 text-3xl md:text-4xl">{lead.title}</h2>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{lead.excerpt}</p>
            </div>
          </article>
        )}

        <div className="mt-20 grid gap-10 md:grid-cols-2">
          {rest.map((entry) => (
            <article key={entry.slug}>
              <img
                src={entry.image}
                alt={entry.title}
                loading="lazy"
                width={1200}
                height={900}
                className="aspect-[4/3] w-full object-cover"
              />
              <p className="label-xs mt-6 text-muted-foreground">
                {entry.category} · {entry.readTime}
              </p>
              <h2 className="display mt-3 text-2xl">{entry.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{entry.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
      <Newsletter />
    </div>
  );
}