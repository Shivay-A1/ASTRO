import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { getProducts, type Product } from '@/lib/products';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import Image from 'next/image';

export default async function Home() {
  let products: Product[] = [];
  let featuredProducts: Product[] = [];
  try {
    products = await getProducts();
    featuredProducts = products.slice(0, 4);
  } catch (error) {
    products = [];
    featuredProducts = [];
  }
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] md:h-[70vh] text-primary-foreground overflow-hidden">
        {heroImage && (
           <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-primary/60" />
        <div className="relative h-full flex flex-col items-center justify-center text-center p-4">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight drop-shadow-md">
            Discover Your Cosmic Connection
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl">
            Authentic rudraksha, powerful gemstones, and celestial tools to align your spirit with the stars.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/products">Explore The Cosmos</Link>
          </Button>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold flex items-center justify-center gap-2">
              <Sparkles className="text-accent" />
              Featured Products
              <Sparkles className="text-accent" />
            </h2>
            <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
              Handpicked celestial treasures to begin your astrological journey.
            </p>
          </div>
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Featured products will appear here soon.</p>
            </div>
          )}
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
