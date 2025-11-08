"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { logoutAdmin } from "@/lib/auth";
import Link from "next/link";
import { LogOut, Package, ShoppingBag, Home } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Don't check auth on login page
    if (pathname !== "/admin/login" && !isAdminAuthenticated()) {
      router.push("/admin/login");
    }
  }, [router, pathname]);

  // Don't show layout on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  function handleLogout() {
    logoutAdmin();
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-card">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/admin/orders" className="flex items-center gap-2">
                <Package className="h-6 w-6 text-primary" />
                <span className="font-headline text-xl font-bold">Admin Panel</span>
              </Link>
              <div className="flex gap-4">
                <Button
                  variant={pathname === "/admin/orders" ? "default" : "ghost"}
                  asChild
                  size="sm"
                >
                  <Link href="/admin/orders">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Orders
                  </Link>
                </Button>
                <Button
                  variant={pathname === "/admin/stock" ? "default" : "ghost"}
                  asChild
                  size="sm"
                >
                  <Link href="/admin/stock">
                    <Package className="mr-2 h-4 w-4" />
                    Stock
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Store
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}

