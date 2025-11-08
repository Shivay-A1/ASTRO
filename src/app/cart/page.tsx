"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";

export default function CartPage() {
  const { cartItems, cartCount, cartTotal, updateQuantity, removeFromCart } = useCart();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-headline text-3xl md:text-4xl font-bold mb-8 text-center">Your Cart</h1>
      {cartCount > 0 ? (
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-0">
                <div className="flex flex-col">
                  {cartItems.map((item, index) => (
                    <div key={item.product.id}>
                      <div className="flex items-center gap-4 p-4">
                        <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                          <Image src={item.product.image.src} alt={item.product.image.alt} fill className="object-cover" />
                        </div>
                        <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                            <div className="md:col-span-1">
                                <p className="font-semibold">{item.product.name}</p>
                                <p className="text-sm text-muted-foreground">${item.product.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex items-center justify-end gap-4">
                                <p className="font-semibold w-24 text-right">${(item.product.price * item.quantity).toFixed(2)}</p>
                                <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.product.id)}>
                                    <Trash2 className="h-5 w-5 text-muted-foreground hover:text-destructive" />
                                </Button>
                            </div>
                        </div>
                      </div>
                      {index < cartItems.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="font-headline">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Calculated at next step</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild size="lg" className="w-full">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <ShoppingCart className="h-20 w-20 text-muted-foreground/30 mx-auto mb-4" />
            <h2 className="font-headline text-2xl">Your celestial cart awaits.</h2>
            <p className="text-muted-foreground mt-2">Fill it with cosmic treasures from our shop.</p>
            <Button asChild className="mt-6">
                <Link href="/products">Start Shopping</Link>
            </Button>
        </div>
      )}
    </div>
  );
}
