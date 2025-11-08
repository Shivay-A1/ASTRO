import { Sparkles } from "lucide-react";
import Link from "next/link";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Sparkles className="h-6 w-6 text-primary" />
          <p className="text-center text-sm leading-loose md:text-left">
            Built for the cosmos. &copy; {currentYear} Astro Emporium.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/products" className="hover:text-foreground">Shop</Link>
            <Link href="/recommendations" className="hover:text-foreground">Recommendations</Link>
            <Link href="/cart" className="hover:text-foreground">Cart</Link>
        </div>
      </div>
    </footer>
  );
}
