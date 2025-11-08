import type { Product } from "./products";
import { getProducts } from "./products";

export interface StockItem {
  productId: string;
  product: Product;
  quantity: number;
  lowStockThreshold: number;
  lastUpdated: string;
}

// In-memory storage for stock (in production, use a database)
let stock: StockItem[] = [];

// Initialize stock from products
async function initializeStock(): Promise<void> {
  if (stock.length === 0) {
    const products = await getProducts();
    stock = products.map((product) => ({
      productId: product.id,
      product,
      quantity: 100, // Default stock
      lowStockThreshold: 10,
      lastUpdated: new Date().toISOString(),
    }));

    // Persist to localStorage
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("astro_stock", JSON.stringify(stock));
      }
    } catch (error) {
      // Silently handle localStorage errors
    }
  }
}

export async function getStock(): Promise<StockItem[]> {
  // Try to load from localStorage first
  try {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("astro_stock");
      if (stored) {
        stock = JSON.parse(stored);
      } else {
        await initializeStock();
      }
    } else {
      await initializeStock();
    }
  } catch (error) {
    await initializeStock();
  }

  return stock;
}

export async function getStockItem(productId: string): Promise<StockItem | undefined> {
  await getStock();
  return stock.find((s) => s.productId === productId);
}

export async function updateStock(
  productId: string,
  quantity: number,
  lowStockThreshold?: number
): Promise<StockItem | null> {
  await getStock();
  let item = stock.find((s) => s.productId === productId);

  if (!item) {
    // Create new stock item
    const products = await getProducts();
    const product = products.find((p) => p.id === productId);
    if (!product) {
      return null;
    }

    item = {
      productId,
      product,
      quantity: 0,
      lowStockThreshold: lowStockThreshold || 10,
      lastUpdated: new Date().toISOString(),
    };
    stock.push(item);
  }

  item.quantity = Math.max(0, quantity);
  if (lowStockThreshold !== undefined) {
    item.lowStockThreshold = lowStockThreshold;
  }
  item.lastUpdated = new Date().toISOString();

  // Persist to localStorage
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem("astro_stock", JSON.stringify(stock));
    }
  } catch (error) {
    // Silently handle localStorage errors
  }

  return item;
}

export async function decreaseStock(
  productId: string,
  quantity: number
): Promise<StockItem | null> {
  const item = await getStockItem(productId);
  if (!item) {
    return null;
  }

  return updateStock(productId, item.quantity - quantity);
}

export async function increaseStock(
  productId: string,
  quantity: number
): Promise<StockItem | null> {
  const item = await getStockItem(productId);
  if (!item) {
    return null;
  }

  return updateStock(productId, item.quantity + quantity);
}

// Initialize stock on module load (client-side only)
if (typeof window !== "undefined") {
  initializeStock();
}

