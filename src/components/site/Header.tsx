import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { products } from "@/lib/products";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Women", to: "/women" },
  { label: "Men", to: "/men" },
  { label: "New In", to: "/shop", search: { sort: "newest" } },
  { label: "Clothing", to: "/shop" },
  { label: "Accessories", to: "/shop", search: { category: "accessories" } },
  { label: "Sale", to: "/shop", search: { sale: true } },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { bagCount, wishlist } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const suggestions = query.trim()
    ? products
        .filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase()))
        .slice(0, 5)
    : [];

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchOpen(false);
    setMenuOpen(false);
    navigate({ to: "/shop", search: { q: query.trim() || undefined } });
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-ink px-4 py-2 text-center text-background">
        <p className="label-xs">Free shipping on orders over €100 &nbsp;|&nbsp; Easy returns</p>
      </div>

      <div
        className={cn(
          "border-b border-border bg-background/95 backdrop-blur transition-shadow duration-300",
          scrolled && "shadow-[0_1px_0_0_var(--border),0_8px_24px_-24px_rgb(0_0_0/0.5)]",
        )}
      >
        <div className="mx-auto grid h-16 max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 md:h-20 md:px-8">
          <div className="flex min-w-0 items-center gap-4 lg:hidden">
            <button
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="shrink-0 p-1"
            >
              <Menu className="h-5 w-5" strokeWidth={1.25} />
            </button>
            <button
              aria-label="Search"
              onClick={() => setSearchOpen((v) => !v)}
              className="hidden shrink-0 p-1 sm:block"
            >
              <Search className="h-5 w-5" strokeWidth={1.25} />
            </button>
          </div>

          <Link
            to="/"
            className="col-start-2 justify-self-center text-center lg:col-start-1 lg:justify-self-start"
          >
            <span className="block text-[15px] leading-none font-medium tracking-[0.3em] whitespace-nowrap md:text-lg">
              THE LABEL
            </span>
            <span className="mt-1 block text-[8px] leading-none tracking-[0.42em] text-muted-foreground md:text-[9px]">
              CLOTHING
            </span>
          </Link>

          <nav className="col-start-2 hidden items-center gap-8 justify-self-center lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                search={"search" in item ? (item.search as never) : undefined}
                className={cn(
                  "label-xs link-underline py-1",
                  item.label === "Sale" && "text-sale",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="col-start-3 flex items-center justify-end gap-4 md:gap-5">
            <button
              aria-label="Search"
              onClick={() => setSearchOpen((v) => !v)}
              className="hidden p-1 lg:block"
            >
              <Search className="h-5 w-5" strokeWidth={1.25} />
            </button>
            <Link to="/account" aria-label="Account" className="hidden p-1 sm:block">
              <User className="h-5 w-5" strokeWidth={1.25} />
            </Link>
            <Link to="/wishlist" aria-label="Wishlist" className="relative hidden p-1 sm:block">
              <Heart className="h-5 w-5" strokeWidth={1.25} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-1 min-w-4 rounded-full bg-ink px-1 text-center text-[9px] leading-4 text-background">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link to="/cart" aria-label="Shopping bag" className="relative p-1">
              <ShoppingBag className="h-5 w-5" strokeWidth={1.25} />
              {bagCount > 0 && (
                <span className="absolute -top-0.5 -right-1 min-w-4 rounded-full bg-ink px-1 text-center text-[9px] leading-4 text-background">
                  {bagCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-border bg-background px-4 py-5 md:px-8">
            <form onSubmit={submitSearch} className="mx-auto max-w-2xl">
              <div className="flex items-center gap-3 border-b border-input pb-2">
                <Search className="h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={1.25} />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for products"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                <button type="button" aria-label="Close search" onClick={() => setSearchOpen(false)}>
                  <X className="h-4 w-4" strokeWidth={1.25} />
                </button>
              </div>
              {suggestions.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {suggestions.map((p) => (
                    <li key={p.id}>
                      <Link
                        to="/product/$slug"
                        params={{ slug: p.slug }}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground"
                      >
                        <img src={p.image} alt="" loading="lazy" className="h-12 w-10 object-cover" />
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </form>
          </div>
        )}
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background lg:hidden">
          <div className="flex h-16 items-center justify-between border-b border-border px-4">
            <span className="label-sm">Menu</span>
            <button aria-label="Close menu" onClick={() => setMenuOpen(false)}>
              <X className="h-5 w-5" strokeWidth={1.25} />
            </button>
          </div>
          <form onSubmit={submitSearch} className="border-b border-border px-4 py-4">
            <div className="flex items-center gap-3">
              <Search className="h-4 w-4 text-muted-foreground" strokeWidth={1.25} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </form>
          <nav className="flex-1 overflow-y-auto px-4 py-6">
            <ul className="space-y-6">
              {NAV.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    search={"search" in item ? (item.search as never) : undefined}
                    onClick={() => setMenuOpen(false)}
                    className="display block text-3xl"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-10 space-y-4 border-t border-border pt-6">
              {[
                { label: "Wishlist", to: "/wishlist" },
                { label: "Account", to: "/account" },
                { label: "The Label Journal", to: "/journal" },
                { label: "Our Story", to: "/about" },
                { label: "Contact", to: "/contact" },
              ].map((l) => (
                <li key={l.label}>
                  <Link to={l.to} onClick={() => setMenuOpen(false)} className="label-sm">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}