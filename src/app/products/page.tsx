"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { getProducts, getProductsByCategory, CATEGORIES, type Product, type ProductCategory } from "@/lib/products";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") as ProductCategory | null;
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(categoryParam);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, [selectedCategory]);

  async function loadProducts() {
    setIsLoading(true);
    try {
      if (selectedCategory) {
        const filtered = await getProductsByCategory(selectedCategory);
        setProducts(filtered);
      } else {
        const all = await getProducts();
        setProducts(all);
      }
    } catch (error) {
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleCategoryClick(category: ProductCategory | null) {
    setSelectedCategory(category);
    // Update URL without page reload
    const url = category ? `/products?category=${encodeURIComponent(category)}` : '/products';
    window.history.pushState({}, '', url);
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

      <div className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategoryClick(null)}
          >
            All Products
          </Button>
          {CATEGORIES.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        {selectedCategory && (
          <div className="text-center mt-4">
            <Badge variant="secondary" className="text-sm">
              {products.length} {products.length === 1 ? "product" : "products"} in {selectedCategory}
            </Badge>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      ) : products.length > 0 ? (
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

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
