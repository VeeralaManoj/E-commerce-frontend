import { api, publicApi } from "@/lib/api/client";
import { AuthResponse, User } from "@/types";

type ApiResponse<T> = {
  success: boolean;
} & T;

export type LoginPayload = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type RegisterPayload = {
  name: string;
  email: string;
  phone: string;
  password: string;
  role?: "CUSTOMER" | "SELLER" | "ADMIN";
};

export type ResetPasswordPayload = {
  token: string;
  password: string;
};

export type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

export const authService = {
  register: (payload: RegisterPayload) => publicApi.post<AuthResponse>("/auth/register", payload),
  login: (payload: LoginPayload) => publicApi.post<AuthResponse>("/auth/login", payload),
  logout: (refreshToken?: string | null) => api.post("/auth/logout", { refreshToken }),
  refresh: (refreshToken: string) => publicApi.post<AuthResponse>("/auth/refresh", { refreshToken }),
  forgotPassword: (email: string) => publicApi.post("/auth/forgot-password", { email }),
  resetPassword: (payload: ResetPasswordPayload) => publicApi.post("/auth/reset-password", payload),
  changePassword: (payload: ChangePasswordPayload) => api.post("/auth/change-password", payload),
  me: () => api.get<ApiResponse<{ user: User }>>("/auth/me")
};
