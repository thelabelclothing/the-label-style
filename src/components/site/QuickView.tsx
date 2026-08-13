import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { priceLabel, type Product } from "@/lib/products";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Btn } from "./Btn";

export function QuickView({
  product,
  open,
  onOpenChange,
}: {
  product: Product;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { addToBag } = useStore();
  const [size, setSize] = useState(product.sizes.length === 1 ? product.sizes[0] : "");
  const [color, setColor] = useState(product.colors[0].name);

  const add = () => {
    if (!size) {
      toast.error("Please select a size.");
      return;
    }
    addToBag(product, size, color);
    onOpenChange(false);
    toast.success(`${product.name} added to your bag.`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl gap-0 overflow-hidden rounded-none border-border p-0 sm:rounded-none">
        <div className="grid max-h-[85vh] overflow-y-auto md:grid-cols-2">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="aspect-[4/5] w-full object-cover"
          />
          <div className="p-6 md:p-8">
            <DialogTitle className="display text-2xl font-normal">{product.name}</DialogTitle>
            <p className="mt-2 text-sm">{priceLabel(product.price)}</p>

            <p className="label-xs mt-8 text-muted-foreground">Colour — {color}</p>
            <div className="mt-3 flex gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  aria-label={c.name}
                  onClick={() => setColor(c.name)}
                  style={{ backgroundColor: c.hex }}
                  className={cn(
                    "h-7 w-7 border border-border",
                    color === c.name && "ring-1 ring-ink ring-offset-2 ring-offset-background",
                  )}
                />
              ))}
            </div>

            <p className="label-xs mt-8 text-muted-foreground">Select size</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={cn(
                    "label-xs min-w-12 border border-border px-3 py-2 transition-colors hover:border-ink",
                    size === s && "border-ink bg-ink text-background",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>

            <Btn size="block" className="mt-8" onClick={add} disabled={!product.inStock}>
              {product.inStock ? "Add to Bag" : "Sold Out"}
            </Btn>
            <Link
              to="/product/$slug"
              params={{ slug: product.slug }}
              onClick={() => onOpenChange(false)}
              className="label-xs link-underline mt-5 inline-block text-muted-foreground"
            >
              View full details
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}