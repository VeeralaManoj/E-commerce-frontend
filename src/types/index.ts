export type Role = "CUSTOMER" | "SELLER" | "ADMIN";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt?: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken?: string;
};

export type AuthResponse = {
  user: User;
  accessToken?: string;
  refreshToken?: string;
  token?: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  image?: string;
  description?: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  rating: number;
  reviewCount: number;
  category: Category;
  images: string[];
  isFeatured?: boolean;
  isNew?: boolean;
  createdAt?: string;
};

export type Review = {
  id: string;
  user: Pick<User, "id" | "name">;
  rating: number;
  comment: string;
  createdAt: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type OrderStatus = "pending" | "paid" | "processing" | "shipped" | "delivered" | "cancelled";

export type Order = {
  id: string;
  user?: User;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  shippingAddress: ShippingAddress;
  createdAt: string;
};

export type ShippingAddress = {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type Paginated<T> = {
  data: T[];
  page: number;
  pages: number;
  total: number;
};

export type ProductQuery = {
  q?: string;
  category?: string;
  min?: string;
  max?: string;
  sort?: string;
  page?: string;
};
