"use client";

import { useEffect, useState } from "react";
import { getStock, updateStock, type StockItem } from "@/lib/stock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Package, RefreshCw, AlertTriangle } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AdminStockPage() {
  const [stock, setStock] = useState<StockItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<StockItem | null>(null);
  const [quantity, setQuantity] = useState("");
  const [threshold, setThreshold] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  async function loadStock() {
    setIsLoading(true);
    try {
      const allStock = await getStock();
      setStock(allStock);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load stock. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadStock();
  }, []);

  function openEditDialog(item: StockItem) {
    setEditingItem(item);
    setQuantity(item.quantity.toString());
    setThreshold(item.lowStockThreshold.toString());
    setIsDialogOpen(true);
  }

  async function handleSave() {
    if (!editingItem) return;

    try {
      await updateStock(
        editingItem.productId,
        parseInt(quantity) || 0,
        parseInt(threshold) || 10
      );
      await loadStock();
      setIsDialogOpen(false);
      setEditingItem(null);
      toast({
        title: "Stock Updated",
        description: "Stock has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update stock. Please try again.",
        variant: "destructive",
      });
    }
  }

  function isLowStock(item: StockItem) {
    return item.quantity <= item.lowStockThreshold;
  }

  function isOutOfStock(item: StockItem) {
    return item.quantity === 0;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-headline text-3xl md:text-4xl font-bold flex items-center gap-2">
            <Package className="h-8 w-8 text-primary" />
            Stock Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage inventory and stock levels for all products
          </p>
        </div>
        <Button onClick={loadStock} variant="outline" disabled={isLoading}>
          <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading stock...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stock.map((item) => (
            <Card key={item.productId} className="overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src={item.product.image.src}
                  alt={item.product.image.alt}
                  fill
                  className="object-cover"
                />
                {isOutOfStock(item) && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="destructive" className="text-lg px-4 py-2">
                      OUT OF STOCK
                    </Badge>
                  </div>
                )}
                {isLowStock(item) && !isOutOfStock(item) && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      Low Stock
                    </Badge>
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-lg">
                  {item.product.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {item.product.description}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Current Stock</span>
                    <span className={`text-2xl font-bold ${
                      isOutOfStock(item)
                        ? "text-red-500"
                        : isLowStock(item)
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}>
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Low Stock Threshold</span>
                    <span>{item.lowStockThreshold}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm mt-2">
                    <span className="text-muted-foreground">Price</span>
                    <span className="font-semibold">${item.product.price.toFixed(2)}</span>
                  </div>
                </div>
                <Button
                  className="w-full"
                  onClick={() => openEditDialog(item)}
                  variant={isLowStock(item) ? "destructive" : "default"}
                >
                  Update Stock
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Stock</DialogTitle>
            <DialogDescription>
              Update the stock quantity and low stock threshold for{" "}
              {editingItem?.product.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Current Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="threshold">Low Stock Threshold</Label>
              <Input
                id="threshold"
                type="number"
                min="0"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
                placeholder="Enter threshold"
              />
              <p className="text-xs text-muted-foreground">
                Alert will show when stock falls below this number
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

