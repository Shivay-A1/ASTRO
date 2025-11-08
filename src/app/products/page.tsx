import { ProductCard } from "@/components/product-card";
import { getProducts, type Product } from "@/lib/products";
import { Sparkles } from "lucide-react";

export default async function ProductsPage() {
  let products: Product[] = [];
  try {
    products = await getProducts();
  } catch (error) {
    products = [];
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold flex items-center justify-center gap-2">
            <Sparkles className="text-accent" />
            Our Celestial Collection
            <Sparkles className="text-accent" />
        </h1>
        <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
            Explore our curated selection of astrological tools and treasures.
        </p>
      </div>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">We're having trouble loading our celestial collection. Please try again later.</p>
        </div>
      )}
    </div>
  );
}
