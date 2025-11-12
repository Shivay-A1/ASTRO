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
 <div className="flex flex-col min-h-screen">

      {/* 🔮 Hero Section - Clean Style */}
      <section className="relative w-full flex justify-center items-center py-16 bg-[#f3e5c0] dark:bg-gray-950 overflow-visible">
        
        {/* 🌿 Left Decorative Line with Icons */}
        <div className="absolute left-[5%] top-[8%] bottom-[8%] flex flex-col justify-between items-center">
          <Image src="/icons/leaf-top.png" alt="Top Left Decoration" width={65} height={65} className="opacity-100" />
          <div className="w-[3px] flex-1 bg-[#5a4423]" />
          <Image src="/icons/leaf-bottom.png" alt="Bottom Left Decoration" width={65} height={65} className="opacity-100" />
        </div>

        {/* 🌿 Right Decorative Line with Icons */}
        <div className="absolute right-[5%] top-[8%] bottom-[8%] flex flex-col justify-between items-center">
          <Image src="/icons/leaf-top1.png" alt="Top Right Decoration" width={65} height={65} className="opacity-100" />
          <div className="w-[3px] flex-1 bg-[#5a4423]" />
          <Image src="/icons/bottom.png" alt="Bottom Right Decoration" width={65} height={65} className="opacity-100" />
        </div>

        {/* 🪔 Main Image Area */}
        <div className="relative w-[80%] md:w-[87%] lg:w-[80%] h-[55vh] rounded-3xl overflow-hidden shadow-2xl z-10">
          <Image
            src="/images/r.png"
            alt="Astro Ritual Banner"
            fill
            className="object-cover object-center rounded-3xl"
            priority
          />

          {/* 🕉️ Left Content: Heading + Icons */}
          <div className="absolute inset-0 flex flex-col justify-center items-start pl-10 md:pl-16 space-y-8 z-10">
            <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
              Begin Your Ritual
            </h1>

            {/* 🔯 Ritual Steps Icons */}
            <div className="flex flex-row items-center space-x-10 mt-2">
              <div className="flex flex-col items-center text-center">
                <Image src="/icons/qr.png" alt="Scan your QR" width={48} height={48} />
                <p className="mt-2 text-white text-sm font-semibold">Scan your QR</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Image src="/icons/essence.png" alt="Choose your Essence" width={48} height={48} />
                <p className="mt-2 text-white text-sm font-semibold">Choose your Essence</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Image src="/icons/ritual.png" alt="Play your Ritual" width={48} height={48} />
                <p className="mt-2 text-white text-sm font-semibold">Play your Ritual</p>
              </div>
            </div>

            <Button
              asChild
              size="lg"
              className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Link href="/products">Explore The Cosmos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 🌠 Auto-Sliding Product Categories */}
      <section className="py-12 md:py-20 bg-gray-50 dark:bg-gray-900">
        <h2 className="text-center text-3xl font-bold mb-8 text-gray-800 dark:text-white">
          Explore Our Categories
        </h2>
      </section>

      {/* 🌟 Featured Products */}
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
              <p className="text-muted-foreground">
                Featured products will appear here soon.
              </p>
            </div>
          )}

          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* 🌟 Premium Features Section */}
      <section className="relative w-full py-20 bg-gradient-to-r from-[#f3e5c0] via-[#f8edcc] to-[#fffaf0]">
        <div className="relative max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#4B2E2E] mb-12">
            Why Choose Us
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="flex flex-col items-center justify-start p-6 rounded-3xl bg-white/30 border border-white/40 shadow-md transform transition-transform duration-300 hover:-translate-y-3 hover:shadow-2xl h-[180px]">
              <div className="w-16 h-16 mb-3 flex-shrink-0">
                <Image src="/icons/logo-genuine.png" alt="Genuine Logo" width={64} height={64} />
              </div>
              <h3 className="text-xl font-bold text-[#4B2E2E] mb-1 text-center">100% Genuine Products</h3>
              <p className="text-sm text-[#4B2E2E] text-center">
                Fully inspected by experts and authorized labs.
              </p>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-center justify-start p-6 rounded-3xl bg-white/30 border border-white/40 shadow-md transform transition-transform duration-300 hover:-translate-y-3 hover:shadow-2xl h-[180px]">
              <div className="w-16 h-16 mb-3 flex-shrink-0">
                <Image src="/icons/logo-energized.png" alt="Energized Logo" width={64} height={64} />
              </div>
              <h3 className="text-xl font-bold text-[#4B2E2E] mb-1 text-center">Energized Rudraksha</h3>
              <p className="text-sm text-[#4B2E2E] text-center">
                Provided with Rudraabhishek Pooja in Shri Daksheshawar Mahadev Temple.
              </p>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-center justify-start p-6 rounded-3xl bg-white/30 border border-white/40 shadow-md transform transition-transform duration-300 hover:-translate-y-3 hover:shadow-2xl h-[180px]">
              <div className="w-16 h-16 mb-3 flex-shrink-0">
                <Image src="/icons/logo-returns.png" alt="Returns Logo" width={64} height={64} />
              </div>
              <h3 className="text-xl font-bold text-[#4B2E2E] mb-1 text-center">Easy Returns & Shopping</h3>
              <p className="text-sm text-[#4B2E2E] text-center">
                Return within 7 days if unsatisfied.
              </p>
            </div>

            {/* Card 4 */}
            <div className="flex flex-col items-center justify-start p-6 rounded-3xl bg-white/30 border border-white/40 shadow-md transform transition-transform duration-300 hover:-translate-y-3 hover:shadow-2xl h-[180px]">
              <div className="w-16 h-16 mb-3 flex-shrink-0">
                <Image src="/icons/logo-shipping.png" alt="Shipping Logo" width={64} height={64} />
              </div>
              <h3 className="text-xl font-bold text-[#4B2E2E] mb-1 text-center">Fastest Shipping Network</h3>
              <p className="text-sm text-[#4B2E2E] text-center">
                Delivered in 4-5 working days with fastest shipping.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
