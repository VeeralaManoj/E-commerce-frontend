import { Category, Order, Product, Review, User } from "@/types";

export const categories: Category[] = [
  { id: "cat-1", name: "Essentials", slug: "essentials", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop" },
  { id: "cat-2", name: "Accessories", slug: "accessories", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1200&auto=format&fit=crop" },
  { id: "cat-3", name: "Home", slug: "home", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop" }
];

export const products: Product[] = Array.from({ length: 18 }, (_, index) => {
  const category = categories[index % categories.length];
  return {
    id: `prod-${index + 1}`,
    name: ["Linen Utility Shirt", "Everyday Canvas Tote", "Ceramic Pour Over", "Merino Travel Hoodie", "Desk Organizer", "Minimal Watch"][index % 6],
    slug: `product-${index + 1}`,
    description: "A durable, well-finished product designed for daily use with thoughtful materials and practical details.",
    price: 39 + index * 6,
    compareAtPrice: index % 3 === 0 ? 69 + index * 6 : undefined,
    stock: 8 + index,
    rating: 4 + (index % 10) / 10,
    reviewCount: 12 + index * 3,
    category,
    images: [
      `https://images.unsplash.com/photo-${["1523275335684-37898b6baf30", "1441986300917-64674bd600d8", "1503602642458-232111445657", "1515886657613-9f3515b0c78f"][index % 4]}?q=80&w=1200&auto=format&fit=crop`,
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1200&auto=format&fit=crop"
    ],
    isFeatured: index < 6,
    isNew: index > 11,
    createdAt: new Date(Date.now() - index * 86400000).toISOString()
  };
});

export const reviews: Review[] = [
  { id: "rev-1", user: { id: "u1", name: "Anika" }, rating: 5, comment: "Excellent quality and fast delivery.", createdAt: "2026-05-19" },
  { id: "rev-2", user: { id: "u2", name: "Jordan" }, rating: 4, comment: "Clean design, exactly as described.", createdAt: "2026-05-12" }
];

export const users: User[] = [
  { id: "u1", name: "Admin User", email: "admin@example.com", role: "admin", createdAt: "2026-01-10" },
  { id: "u2", name: "Customer User", email: "customer@example.com", role: "customer", createdAt: "2026-02-14" }
];

export const orders: Order[] = [
  {
    id: "ord-1001",
    items: [{ product: products[0], quantity: 2 }],
    total: products[0].price * 2,
    status: "processing",
    createdAt: "2026-06-01",
    shippingAddress: { fullName: "Customer User", phone: "5551234567", address: "12 Market Street", city: "Austin", state: "TX", postalCode: "73301", country: "US" }
  }
];
