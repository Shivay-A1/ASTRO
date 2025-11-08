import type { User } from "firebase/auth";

export interface UserAccount {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  provider: string;
  createdAt: string;
  lastLoginAt: string;
}

/**
 * Save user account details to localStorage
 */
export function saveUserAccount(user: User): void {
  if (typeof window === "undefined") return;

  try {
    const account: UserAccount = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      provider: user.providerData[0]?.providerId || "unknown",
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };

    // Check if user already exists
    const existingAccounts = getUserAccounts();
    const existingIndex = existingAccounts.findIndex((acc) => acc.uid === user.uid);

    if (existingIndex >= 0) {
      // Update existing account
      existingAccounts[existingIndex] = {
        ...existingAccounts[existingIndex],
        ...account,
        createdAt: existingAccounts[existingIndex].createdAt, // Preserve original creation date
      };
    } else {
      // Add new account
      existingAccounts.push(account);
    }

    localStorage.setItem("astro_user_accounts", JSON.stringify(existingAccounts));
    
    // Also save current user
    localStorage.setItem("astro_current_user", JSON.stringify(account));
  } catch (error) {
    console.error("Failed to save user account:", error);
  }
}

/**
 * Get all saved user accounts
 */
export function getUserAccounts(): UserAccount[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem("astro_user_accounts");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to get user accounts:", error);
    return [];
  }
}

/**
 * Get current user account
 */
export function getCurrentUserAccount(): UserAccount | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem("astro_current_user");
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("Failed to get current user account:", error);
    return null;
  }
}

/**
 * Update last login time
 */
export function updateLastLogin(uid: string): void {
  if (typeof window === "undefined") return;

  try {
    const accounts = getUserAccounts();
    const accountIndex = accounts.findIndex((acc) => acc.uid === uid);

    if (accountIndex >= 0) {
      accounts[accountIndex].lastLoginAt = new Date().toISOString();
      localStorage.setItem("astro_user_accounts", JSON.stringify(accounts));

      // Update current user
      const currentUser = getCurrentUserAccount();
      if (currentUser && currentUser.uid === uid) {
        currentUser.lastLoginAt = new Date().toISOString();
        localStorage.setItem("astro_current_user", JSON.stringify(currentUser));
      }
    }
  } catch (error) {
    console.error("Failed to update last login:", error);
  }
}

/**
 * Clear current user
 */
export function clearCurrentUser(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem("astro_current_user");
  } catch (error) {
    console.error("Failed to clear current user:", error);
  }
}

