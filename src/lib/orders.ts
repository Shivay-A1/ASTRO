import type { CartItem } from "./cart-types";
import type { Product } from "./products";

export interface Order {
  id: string;
  orderNumber: string;
  customerEmail: string;
  shippingName: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  items: CartItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

// In-memory storage for orders (in production, use a database)
let orders: Order[] = [];

// Generate order number
function generateOrderNumber(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `ORD-${timestamp}-${random}`;
}

export async function createOrder(
  customerInfo: {
    email: string;
    shippingName: string;
    shippingAddress: string;
    shippingCity: string;
    shippingState: string;
    shippingZip: string;
  },
  items: CartItem[],
  total: number
): Promise<Order> {
  const order: Order = {
    id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    orderNumber: generateOrderNumber(),
    customerEmail: customerInfo.email,
    shippingName: customerInfo.shippingName,
    shippingAddress: customerInfo.shippingAddress,
    shippingCity: customerInfo.shippingCity,
    shippingState: customerInfo.shippingState,
    shippingZip: customerInfo.shippingZip,
    items,
    total,
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  orders.push(order);
  
  // Persist to localStorage
  try {
    localStorage.setItem("astro_orders", JSON.stringify(orders));
  } catch (error) {
    // Silently handle localStorage errors
  }

  return order;
}

export async function getOrders(): Promise<Order[]> {
  // Try to load from localStorage first
  try {
    const stored = localStorage.getItem("astro_orders");
    if (stored) {
      orders = JSON.parse(stored);
    }
  } catch (error) {
    // Silently handle localStorage errors
  }
  
  return orders.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getOrder(id: string): Promise<Order | undefined> {
  await getOrders(); // Ensure we have latest data
  return orders.find((o) => o.id === id);
}

export async function updateOrderStatus(
  id: string,
  status: Order["status"]
): Promise<Order | null> {
  await getOrders(); // Ensure we have latest data
  const order = orders.find((o) => o.id === id);
  
  if (!order) {
    return null;
  }

  order.status = status;
  order.updatedAt = new Date().toISOString();

  // Persist to localStorage
  try {
    localStorage.setItem("astro_orders", JSON.stringify(orders));
  } catch (error) {
    // Silently handle localStorage errors
  }

  return order;
}

// Initialize orders from localStorage on module load (client-side only)
if (typeof window !== "undefined") {
  try {
    const stored = localStorage.getItem("astro_orders");
    if (stored) {
      orders = JSON.parse(stored);
    }
  } catch (error) {
    // Silently handle localStorage errors
  }
}

