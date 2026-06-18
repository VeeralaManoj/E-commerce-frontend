import { api } from "@/lib/api/client";
import { categories, orders, products, reviews, users } from "@/data/mock";
import { OrderStatus, Paginated, Product, ProductQuery, ShippingAddress, User } from "@/types";

async function fallback<T>(request: Promise<{ data: T }>, data: T) {
  try {
    return (await request).data;
  } catch {
    return data;
  }
}

export const productService = {
  async list(query: ProductQuery = {}): Promise<Paginated<Product>> {
    const filtered = products
      .filter((product) => !query.q || product.name.toLowerCase().includes(query.q.toLowerCase()))
      .filter((product) => !query.category || product.category.slug === query.category)
      .filter((product) => !query.min || product.price >= Number(query.min))
      .filter((product) => !query.max || product.price <= Number(query.max))
      .sort((a, b) => (query.sort === "price-asc" ? a.price - b.price : query.sort === "price-desc" ? b.price - a.price : b.rating - a.rating));
    const page = Number(query.page || 1);
    const perPage = 9;
    const data = filtered.slice((page - 1) * perPage, page * perPage);
    return fallback(api.get("/products", { params: query }), { data, page, pages: Math.ceil(filtered.length / perPage), total: filtered.length });
  },
  async details(slug: string) {
    return fallback(api.get(`/products/${slug}`), { product: products.find((p) => p.slug === slug) || products[0], reviews, related: products.slice(0, 4) });
  },
  create: (payload: Partial<Product>) => api.post("/admin/products", payload),
  update: (id: string, payload: Partial<Product>) => api.put(`/admin/products/${id}`, payload),
  remove: (id: string) => api.delete(`/admin/products/${id}`)
};

export const categoryService = {
  list: () => fallback(api.get("/categories"), categories),
  create: (payload: unknown) => api.post("/admin/categories", payload),
  update: (id: string, payload: unknown) => api.put(`/admin/categories/${id}`, payload),
  remove: (id: string) => api.delete(`/admin/categories/${id}`)
};

export const authService = {
  login: (email: string, password: string) => api.post<{ user: User; token: string }>("/auth/login", { email, password }),
  register: (payload: unknown) => api.post<{ user: User; token: string }>("/auth/register", payload),
  forgotPassword: (email: string) => api.post("/auth/forgot-password", { email }),
  resetPassword: (token: string, password: string) => api.post("/auth/reset-password", { token, password }),
  me: () => api.get<User>("/auth/me")
};

export const cartService = {
  sync: (items: unknown) => api.post("/cart/sync", { items })
};

export const orderService = {
  create: (shippingAddress: ShippingAddress, items: unknown) => api.post("/orders", { shippingAddress, items }),
  mine: () => fallback(api.get("/orders/my"), orders),
  all: () => fallback(api.get("/admin/orders"), orders),
  updateStatus: (id: string, status: OrderStatus) => api.patch(`/admin/orders/${id}`, { status })
};

export const adminService = {
  stats: () => fallback(api.get("/admin/stats"), { revenue: 42890, orders: 318, users: 1240, products: products.length }),
  users: () => fallback(api.get("/admin/users"), users),
  updateUserRole: (id: string, role: string) => api.patch(`/admin/users/${id}/role`, { role })
};
