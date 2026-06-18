# Commerce Frontend

Production-ready ecommerce frontend built with Next.js 14 App Router, TypeScript, Tailwind CSS, Zustand, React Hook Form, Zod, Axios, JWT interceptors, toast notifications, and loading-ready reusable UI.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_replace_me
```

3. Start development:

```bash
npm run dev
```

## Backend Contract

The frontend expects REST endpoints under `NEXT_PUBLIC_API_URL`.

- `POST /auth/login`, `POST /auth/register`, `GET /auth/me`
- `GET /products`, `GET /products/:slug`
- `GET /categories`
- `POST /cart/sync`
- `POST /orders`, `GET /orders/my`
- `GET /admin/stats`, `/admin/products`, `/admin/categories`, `/admin/orders`, `/admin/users`

When the backend is unavailable, product/category/admin read screens use local fallback data so the UI remains reviewable.

## Demo Auth

If login/register API calls fail, the app creates a demo JWT session locally. Use an email containing `admin` to enter the admin area.

## Structure

- `src/app` App Router pages and route groups
- `src/components` reusable layout, UI, product, auth, and admin components
- `src/lib/api` Axios client and service layer
- `src/lib/validations` Zod schemas
- `src/stores` Zustand auth, cart, wishlist, and UI stores
- `src/types` shared TypeScript domain types
- `src/data/mock.ts` development fallback data

## Quality Checks

```bash
npm run typecheck
npm run build
```
