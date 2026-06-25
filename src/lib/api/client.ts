import axios from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "@/stores/authStore";
import { extractTokens } from "@/utils/auth";
import { AuthResponse } from "@/types";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" }
});

export const publicApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" }
});

type RetryableRequest = Parameters<typeof api.request>[0] & { _retry?: boolean };

let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken() {
  const refreshToken = useAuthStore.getState().refreshToken;
  if (!refreshToken) throw new Error("Missing refresh token");

  const { data } = await publicApi.post<AuthResponse>("/auth/refresh", { refreshToken });
  const tokens = extractTokens(data);
  if (!tokens.accessToken) throw new Error("Missing access token");

  if (data.user) useAuthStore.getState().setAuth(data.user, tokens.accessToken, tokens.refreshToken ?? refreshToken);
  else useAuthStore.getState().setTokens(tokens.accessToken, tokens.refreshToken ?? refreshToken);

  return tokens.accessToken;
}

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as RetryableRequest | undefined;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry && !originalRequest.url?.includes("/auth/refresh")) {
      originalRequest._retry = true;

      try {
        refreshPromise = refreshPromise ?? refreshAccessToken();
        const accessToken = await refreshPromise;
        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api.request(originalRequest);
      } catch {
        useAuthStore.getState().logout();
        toast.error("Session expired. Please sign in again.");
      } finally {
        refreshPromise = null;
      }
    }

    return Promise.reject(error);
  }
);
