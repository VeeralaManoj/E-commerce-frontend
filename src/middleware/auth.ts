import { Role } from "@/types";

export const authRoutes = ["/login", "/register"];
export const protectedRoutes = ["/profile", "/change-password", "/checkout"];
export const roleRoutes: Record<string, Role[]> = {
  "/admin": ["ADMIN"]
};
