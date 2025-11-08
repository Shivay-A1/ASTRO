// Simple admin authentication (in production, use proper authentication)
const ADMIN_PASSWORD = "admin123"; // Change this in production!

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  
  try {
    const auth = sessionStorage.getItem("admin_auth");
    return auth === "authenticated";
  } catch {
    return false;
  }
}

export function loginAdmin(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    try {
      sessionStorage.setItem("admin_auth", "authenticated");
      return true;
    } catch {
      return false;
    }
  }
  return false;
}

export function logoutAdmin(): void {
  try {
    sessionStorage.removeItem("admin_auth");
  } catch {
    // Silently handle errors
  }
}

