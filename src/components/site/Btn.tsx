import { cva, type VariantProps } from "class-variance-authority";
import { Link } from "@tanstack/react-router";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const btnVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap border transition-colors duration-300 disabled:pointer-events-none disabled:opacity-40 label-xs",
  {
    variants: {
      variant: {
        solid: "border-ink bg-ink text-background hover:bg-transparent hover:text-ink",
        outline: "border-ink bg-transparent text-ink hover:bg-ink hover:text-background",
        light:
          "border-background bg-background text-ink hover:bg-transparent hover:text-background",
        ghost: "border-transparent bg-transparent text-ink hover:border-ink",
        muted: "border-border bg-secondary text-foreground hover:bg-accent",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-7",
        lg: "h-14 px-10",
        block: "h-14 w-full px-6",
      },
    },
    defaultVariants: { variant: "solid", size: "md" },
  },
);

type BtnProps = ComponentProps<"button"> & VariantProps<typeof btnVariants>;

export function Btn({ className, variant, size, ...props }: BtnProps) {
  return <button className={cn(btnVariants({ variant, size }), className)} {...props} />;
}

type BtnLinkProps = ComponentProps<typeof Link> & VariantProps<typeof btnVariants>;

export function BtnLink({ className, variant, size, ...props }: BtnLinkProps) {
  return <Link className={cn(btnVariants({ variant, size }), className)} {...props} />;
}