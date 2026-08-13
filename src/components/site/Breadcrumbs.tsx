import { Link } from "@tanstack/react-router";

export function Breadcrumbs({ trail }: { trail: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="label-xs flex flex-wrap items-center gap-2 text-muted-foreground">
      <Link to="/" className="hover:text-foreground">
        Home
      </Link>
      {trail.map((c) => (
        <span key={c.label} className="flex items-center gap-2">
          <span aria-hidden>/</span>
          {c.to ? (
            <Link to={c.to} className="hover:text-foreground">
              {c.label}
            </Link>
          ) : (
            <span className="text-foreground">{c.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}