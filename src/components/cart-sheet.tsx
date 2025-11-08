"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/use-cart";
import { ScrollArea } from "./ui/scroll-area";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { useState } from "react";

export function CartSheet({ children }: { children: React.ReactNode }) {
    const { cartItems, cartCount, cartTotal, updateQuantity, removeFromCart } = useCart();
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle className="font-headline">Your Celestial Cart ({cartCount})</SheetTitle>
                </SheetHeader>
                <Separator className="my-2" />
                {cartCount > 0 ? (
                    <>
                        <ScrollArea className="flex-grow pr-4">
                            <div className="flex flex-col gap-6">
                                {cartItems.map(item => (
                                    <div key={item.product.id} className="flex gap-4 items-center">
                                        <div className="relative h-20 w-20 rounded-md overflow-hidden">
                                            <Image
                                                src={item.product.image.src}
                                                alt={item.product.image.alt}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <p className="font-semibold">{item.product.name}</p>
                                            <p className="text-sm text-muted-foreground">${item.product.price.toFixed(2)}</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                                                    <Minus className="h-3 w-3" />
                                                </Button>
                                                <span className="w-6 text-center">{item.quantity}</span>
                                                <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.product.id)}>
                                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                        <SheetFooter className="mt-auto pt-4 border-t">
                            <div className="w-full space-y-4">
                                <div className="flex justify-between font-semibold">
                                    <span>Subtotal</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <Button asChild size="lg" className="w-full" onClick={() => setOpen(false)}>
                                    <Link href="/checkout">Proceed to Checkout</Link>
                                </Button>
                                <Button asChild variant="outline" className="w-full" onClick={() => setOpen(false)}>
                                    <Link href="/cart">View Cart</Link>
                                </Button>
                            </div>
                        </SheetFooter>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <ShoppingCart className="h-16 w-16 text-muted-foreground/50 mb-4" />
                        <h3 className="font-headline text-xl">Your Cart is Empty</h3>
                        <p className="text-muted-foreground mt-2">Find your cosmic connection in our shop.</p>
                        <Button asChild className="mt-6" onClick={() => setOpen(false)}>
                            <Link href="/products">Start Shopping</Link>
                        </Button>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}
