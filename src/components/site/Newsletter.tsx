import { useState } from "react";
import { toast } from "sonner";
import { Btn } from "./Btn";

export function Newsletter({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setEmail("");
    toast.success("Welcome to The Label. Check your inbox to confirm.");
  };

  if (compact) {
    return (
      <form onSubmit={submit} className="flex max-w-sm items-center border-b border-input pb-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        <button type="submit" className="label-xs shrink-0 pl-4">
          Subscribe
        </button>
      </form>
    );
  }

  return (
    <section className="border-t border-border bg-sand">
      <div className="mx-auto max-w-2xl px-4 py-20 text-center md:py-28">
        <h2 className="display text-4xl md:text-5xl">Join The Label</h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          Be the first to discover new collections, exclusive offers and stories from The Label.
        </p>
        <form onSubmit={submit} className="mt-10 flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="h-14 flex-1 border border-input bg-background px-4 text-sm outline-none placeholder:text-muted-foreground focus:border-ink"
          />
          <Btn type="submit" size="lg">
            Subscribe
          </Btn>
        </form>
        <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
          By subscribing, you agree to receive marketing communications from The Label Clothing.
        </p>
      </div>
    </section>
  );
}