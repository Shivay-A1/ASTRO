"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { searchProducts, type Product } from "@/lib/products";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  async function handleSearch(searchQuery: string) {
    if (!searchQuery.trim()) {
      setProducts([]);
      return;
    }

    setIsLoading(true);
    try {
      const results = await searchProducts(searchQuery);
      setProducts(results);
    } catch (error) {
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleSearch(query);
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto mb-8">
        <div className="text-center mb-8">
          <h1 className="font-headline text-3xl md:text-4xl font-bold flex items-center justify-center gap-2 mb-4">
            <Search className="h-8 w-8 text-primary" />
            Search Products
          </h1>
          <p className="text-muted-foreground">
            Find celestial treasures that align with your needs
          </p>
        </div>

        <form onSubmit={onSubmit} className="flex gap-2">
          <Input
            type="text"
            placeholder="Search for products, stones, or categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" disabled={isLoading}>
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </form>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Searching the cosmos...</p>
        </div>
      ) : products.length > 0 ? (
        <>
          <div className="mb-4">
            <p className="text-muted-foreground">
              Found {products.length} {products.length === 1 ? "product" : "products"} for "{query}"
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      ) : query ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Search className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <h2 className="font-headline text-2xl mb-2">No Products Found</h2>
            <p className="text-muted-foreground">
              We couldn't find any products matching "{query}". Try different keywords.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <Sparkles className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <h2 className="font-headline text-2xl mb-2">Start Your Search</h2>
            <p className="text-muted-foreground">
              Enter a search term above to find products in our celestial collection.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading search...</p>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}

