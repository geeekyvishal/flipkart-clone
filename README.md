# 🛒 Flipkart Clone — Full-Stack E-Commerce Assignment

> A pixel-perfect, full-stack e-commerce web application inspired by Flipkart, built as part of an **SDE Intern Fullstack Assignment**. Features a complete shopping experience — from product browsing to order placement — powered by a modern Next.js App Router architecture.

![Next.js](https://img.shields.io/badge/Next.js-16.2.3-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=flat-square&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-7.7.0-2D3748?style=flat-square&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-latest-4169E1?style=flat-square&logo=postgresql)
![Zustand](https://img.shields.io/badge/Zustand-5.x-FF6F00?style=flat-square)

---

## 🌐 Live Demo

> 🚧 **Coming Soon** — Deployment in progress.
>
> Live URL: `https://your-live-demo-link-here.vercel.app`

---

## 📸 Screenshots

> _Add your screenshots here once deployed or via local dev screenshots._

| Page | Preview |
|------|---------|
| 🏠 Homepage | _(screenshot placeholder)_ |
| 📦 Product Listing | _(screenshot placeholder)_ |
| 🔍 Product Detail | _(screenshot placeholder)_ |
| 🛍️ Cart | _(screenshot placeholder)_ |
| 📋 Checkout | _(screenshot placeholder)_ |
| ✅ Order Success | _(screenshot placeholder)_ |

---

## ✨ Features

### 🖥️ UI & UX
- **Flipkart-inspired responsive UI** — navbar, category nav, hero carousel, and product grid
- **Scroll-aware category navigation** — collapses on scroll for a native app feel
- **Profile dropdown** — hover-triggered account menu in the navbar
- **Fully responsive design** — works across desktop, tablet, and mobile

### 📦 Product Experience
- **Product listing page** — browse all products with a clean grid layout
- **Product detail page** — images, specs, ratings, pricing, and availability
- **Search** — real-time search by product name/title
- **Category filtering** — filter products by category
- **Sort by price** — ascending/descending price sorting

### 🛒 Cart & Checkout
- **Add to Cart / Buy Now** — from both listing and detail pages
- **Persistent cart** — cart state preserved across page refreshes via Zustand + localStorage
- **Cart page** — update quantity, remove items, see running total
- **Checkout page** — collect delivery details (name, phone, address, pincode, city)
- **Order placement** — creates a real order record in the database with a generated Order ID
- **Order success page** — confirmation screen with order summary

### 🔧 Technical
- **API Routes** — Next.js Route Handlers for products and orders (`/api/products`, `/api/orders`)
- **Database persistence** — all products and orders stored in PostgreSQL via Prisma
- **Price snapshot on order** — `pricePaid` field records the exact price at time of purchase
- **Clean, reusable component architecture** — separated by feature domain

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **State Management** | [Zustand 5](https://zustand-demo.pmnd.rs/) |
| **ORM** | [Prisma 7](https://www.prisma.io/) |
| **Database** | [PostgreSQL](https://www.postgresql.org/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **DB Adapter** | `@prisma/adapter-pg` (via `pg`) |

---

## 📁 Folder Structure

```
flipkart-clone/
├── prisma/
│   ├── schema.prisma          # Database models: Product, Order, OrderItem
│   ├── seed.ts                # Database seeder (populates sample products)
│   └── migrations/            # Prisma migration history
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── layout.tsx         # Root layout (Navbar, Footer)
│   │   ├── page.tsx           # Homepage
│   │   ├── products/          # Product listing page
│   │   ├── product/[id]/      # Product detail page (dynamic route)
│   │   ├── cart/              # Cart page
│   │   ├── checkout/          # Checkout page
│   │   ├── order-success/     # Order confirmation page
│   │   └── api/
│   │       ├── products/      # GET all products, GET product by ID
│   │       └── orders/        # POST create order
│   ├── components/
│   │   ├── layout/            # Navbar, CategoryNav, Footer, SearchBar, PageContainer
│   │   ├── home/              # HeroBanner, ProductGrid, RecommendationSection
│   │   ├── product/           # ProductActions, ProductSpecs, etc.
│   │   ├── products/          # Product listing & filter components
│   │   ├── cart/              # Cart item components
│   │   ├── checkout/          # Checkout form components
│   │   └── shared/            # Reusable UI primitives
│   ├── lib/
│   │   ├── prisma.ts          # Prisma client singleton
│   │   ├── utils.ts           # Utility helpers
│   │   └── dummy-data.ts      # Fallback mock data
│   └── store/
│       └── useCartStore.ts    # Zustand cart store (with localStorage persistence)
├── .env                       # Environment variables (DATABASE_URL)
├── prisma.config.ts           # Prisma config (loads env, points to schema)
├── next.config.ts             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- **PostgreSQL** database (local, Prisma Postgres, or cloud)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/flipkart-clone.git
cd flipkart-clone
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Then edit `.env` and fill in your database URL (see [Environment Variables](#-environment-variables) below).

### 4. Set Up the Database

Run Prisma migrations to create the database schema:

```bash
npx prisma migrate dev --name init
```

Generate the Prisma client:

```bash
npx prisma generate
```

Seed the database with sample products:

```bash
npx prisma db seed
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Environment Variables

Create a `.env` file in the root of your project with the following variables:

```env
# PostgreSQL connection string
# Format for standard Postgres:
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# Format for Prisma Postgres (local dev proxy):
# DATABASE_URL="prisma+postgres://localhost:PORT/?api_key=YOUR_API_KEY"
```

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | Full PostgreSQL connection string | ✅ Yes |

> **Note:** The `.env` file is listed in `.gitignore` and should **never** be committed to version control.

---

## 🗄️ Database Setup

The database schema consists of three models:

```
Product      → stores all product catalog data (title, price, images, specs, category, etc.)
Order        → stores placed orders (customer info, total, status, generated Order ID)
OrderItem    → join table linking orders to products with quantity and historic price snapshot
```

### Prisma Commands Reference

```bash
# Apply migrations in development
npx prisma migrate dev

# Apply migrations in production (no shadow DB)
npx prisma migrate deploy

# Reset database (⚠️ destructive — drops all data)
npx prisma migrate reset

# Open Prisma Studio (visual database browser)
npx prisma studio

# Re-generate the Prisma client after schema changes
npx prisma generate

# Seed the database
npx prisma db seed
```

---

## 📜 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| Dev server | `npm run dev` | Starts Next.js in development mode with hot reload |
| Production build | `npm run build` | Creates an optimized production build |
| Start production | `npm run start` | Runs the production build |
| Lint | `npm run lint` | Runs ESLint across the project |
| DB Seed | `npx prisma db seed` | Seeds the database with sample product data |
| Prisma Studio | `npx prisma studio` | Opens a visual browser for your database |

---

## 🎨 Design Inspiration

This project is a faithful UI clone of **[Flipkart](https://www.flipkart.com/)**, India's leading e-commerce platform.

Key design elements replicated:
- **Flipkart Blue** (`#2874F0`) brand color scheme
- **Top navbar** with search bar, categories, and user menu
- **Scroll-aware category nav bar** that compresses on scroll
- **Hero banner carousel** with promotional content
- **Product card grid** with ratings, pricing, and discount badges
- **Cart, checkout, and order confirmation** flows mirroring the Flipkart UX

> This project is built purely for **educational and assignment purposes**. All trademarks belong to their respective owners.

---

## 🧠 Assumptions Made

1. **Authentication is mocked** — No real login/signup flow. The navbar shows a static "Vishal" profile with a dummy dropdown, as the focus is on the shopping flow.
2. **Payment is simulated** — The checkout flow captures delivery details and places an order in the DB, but no real payment gateway is integrated.
3. **Product data is seeded** — Products are pre-loaded via `prisma/seed.ts`; there is no admin panel for product management.
4. **Single currency** — All prices are in Indian Rupees (₹) with no multi-currency support.
5. **No user accounts** — The cart is persisted per-browser via `localStorage`; there is no server-side cart or order history by user.
6. **Stock management is static** — `inStock` is a boolean flag on the product; inventory counting is not implemented.
7. **Order IDs are generated** — Orders receive a human-readable ID (e.g., `OD-XXXX`) generated server-side, not a UUID.

---

## 🔮 Future Improvements

- [ ] **Authentication** — JWT or NextAuth.js-based sign-up/login
- [ ] **User order history** — View past orders tied to an account
- [ ] **Payment integration** — Razorpay or Stripe for real transactions
- [ ] **Admin dashboard** — Manage products, view all orders, update order status
- [ ] **Reviews & ratings** — Allow users to submit product reviews
- [ ] **Wishlist** — Save products for later
- [ ] **Advanced search** — Full-text search with Postgres `tsvector` or Elasticsearch
- [ ] **Email notifications** — Send order confirmation emails via Resend/Nodemailer
- [ ] **Image uploads** — Product image management via Cloudinary or S3
- [ ] **Stock tracking** — Real inventory management with low-stock alerts
- [ ] **Offer engine** — Coupon codes and promotional discounts

---

## 🚢 Deployment

### Deploying to Vercel (Recommended)

1. Push your code to a GitHub repository.
2. Import the repository at [vercel.com/new](https://vercel.com/new).
3. Add your environment variable `DATABASE_URL` in the Vercel project settings under **Settings → Environment Variables**.
4. Deploy — Vercel auto-detects Next.js and configures the build.

### Post-Deployment Database Migration

After deploying, run migrations against your production database:

```bash
# Using Vercel CLI
vercel env pull .env.production.local
npx prisma migrate deploy
```

Or run it as part of your build command in `package.json`:

```json
"scripts": {
  "build": "prisma migrate deploy && next build"
}
```

### Recommended Hosting for PostgreSQL

| Option | Notes |
|--------|-------|
| [Prisma Postgres](https://www.prisma.io/postgres) | Zero-config, built for Prisma |
| [Neon](https://neon.tech/) | Serverless Postgres, generous free tier |
| [Supabase](https://supabase.com/) | Postgres + extras (auth, storage) |
| [Railway](https://railway.app/) | Simple container-based Postgres |

---

## 👨‍💻 Author

**Vishal Singh**

- GitHub: [@your-github-username](https://github.com/your-github-username)
- LinkedIn: [linkedin.com/in/your-profile](https://linkedin.com/in/your-profile)
- Email: your.email@example.com

---

> Built with ❤️ as part of an SDE Intern Fullstack Assignment · April 2026
