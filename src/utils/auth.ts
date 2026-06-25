import { AuthResponse, AuthTokens, Role, User } from "@/types";

export const AUTH_STORAGE_KEY = "ecommerce-auth";

export function normalizeRole(role: string): Role {
  const normalized = role.toUpperCase();
  if (normalized === "ADMIN" || normalized === "SELLER" || normalized === "CUSTOMER") return normalized;
  return "CUSTOMER";
}

export function normalizeUser(user: User): User {
  return { ...user, role: normalizeRole(user.role) };
}

export function extractTokens(response: AuthResponse): AuthTokens {
  return {
    accessToken: response.accessToken || response.token || "",
    refreshToken: response.refreshToken
  };
}

export function getAuthRedirect(pathname: string) {
  return pathname ? `/login?redirect=${encodeURIComponent(pathname)}` : "/login";
}
