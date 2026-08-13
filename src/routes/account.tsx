import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Btn } from "@/components/site/Btn";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

const TITLE = "Account — The Label Clothing";
const DESCRIPTION = "Sign in to your Label Clothing account to track orders and manage details.";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  const input =
    "mt-2 h-12 w-full border border-input bg-background px-4 text-sm outline-none focus:border-ink";

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 md:px-8 md:py-14">
      <Breadcrumbs trail={[{ label: "Account" }]} />
      <h1 className="display mt-8 text-4xl md:text-5xl">Account</h1>

      <div className="mt-12 grid max-w-4xl gap-14 md:grid-cols-2 md:gap-20">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Welcome back.");
          }}
        >
          <h2 className="label-sm border-b border-border pb-4">Sign In</h2>
          <label className="mt-6 block">
            <span className="label-xs text-muted-foreground">Email</span>
            <input required type="email" className={input} />
          </label>
          <label className="mt-5 block">
            <span className="label-xs text-muted-foreground">Password</span>
            <input required type="password" className={input} />
          </label>
          <Btn type="submit" size="block" className="mt-8">
            Sign In
          </Btn>
        </form>

        <div>
          <h2 className="label-sm border-b border-border pb-4">New Here</h2>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            Create an account to check out faster, follow your orders and save the pieces you love
            to your wishlist.
          </p>
          <Btn
            variant="outline"
            size="block"
            className="mt-8"
            onClick={() => toast("Account creation is coming soon.")}
          >
            Create Account
          </Btn>
        </div>
      </div>
    </div>
  );
}