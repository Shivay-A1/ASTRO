"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import { getProduct, type Product } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/hooks/use-cart";
import { Minus, Plus, ShoppingCart, Sparkles } from "lucide-react";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      setIsLoading(true);
      try {
        const fetchedProduct = await getProduct(id);
        setProduct(fetchedProduct || null);
      } catch (error) {
        // Error handled by showing "Product not found" message
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="font-headline text-2xl">Product not found</h1>
        <p className="text-muted-foreground">The celestial body you were looking for seems to have drifted away.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
        <div className="relative aspect-square w-full rounded-lg overflow-hidden shadow-lg">
          <Image
            src={product.image.src}
            alt={product.image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            data-ai-hint={product.image.aiHint}
          />
        </div>
        <div>
          <h1 className="font-headline text-3xl md:text-4xl font-bold">{product.name}</h1>
          <p className="text-2xl font-semibold mt-2 mb-4">${product.price.toFixed(2)}</p>
          <p className="text-muted-foreground leading-relaxed">{product.longDescription}</p>
          
          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center gap-2 border rounded-md p-1">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-bold text-lg">{quantity}</span>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setQuantity(q => q + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button size="lg" className="flex-grow" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5"/>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductDetailSkeleton() {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
            <div className="pt-4 flex items-center gap-4">
                <Skeleton className="h-12 w-32"/>
                <Skeleton className="h-12 flex-grow" />
            </div>
          </div>
        </div>
      </div>
    );
  }
