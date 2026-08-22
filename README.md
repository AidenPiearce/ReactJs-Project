# Aiden's Ecommerce Project

A full-stack ecommerce web application built with **React 19**, **Vite 6**, **React Router 8**, and **Axios**. Features a complete shopping experience with product browsing, cart management, checkout, order tracking, and order history.

## Tech Stack

### Frontend
- **React 19** - UI library with concurrent features
- **Vite 6** - Lightning-fast build tool and dev server
- **React Router 8** - Client-side routing
- **Axios** - HTTP client for API communication
- **Day.js** - Lightweight date formatting
- **ESLint 9** - Code linting with React hooks plugin

### Backend (separate repo)
- **Node.js + Express** - REST API
- **SQLite** - Database
- **Custom image serving** - Product images via `/images` endpoint

---

## Features

- **Home Page** - Product grid with search functionality
- **Shopping Cart** - Persistent cart with quantity management
- **Checkout** - Delivery options, payment summary, order placement
- **Orders Page** - Order history with status tracking
- **Order Tracking** - Real-time delivery status per order
- **404 Page** - Friendly not-found handling
- **Responsive Design** - Mobile-first CSS with custom properties

---

## Project Structure

```
ecommerce-project-aiden/
├── public/
│   ├── images/          # Product images, icons, ratings (served by backend)
│   └── Local/           # Local development assets
├── src/
│   ├── components/
│   │   └── Header.jsx   # Navigation header with cart count
│   ├── pages/
│   │   ├── home/
│   │   │   ├── HomePage.jsx       # Main product listing
│   │   │   ├── ProductsGrid.jsx   # Product card grid
│   │   │   └── Product.jsx        # Individual product card
│   │   ├── checkout/
│   │   │   ├── CheckoutPage.jsx
│   │   │   ├── CheckoutHeader.jsx
│   │   │   ├── DeliveryOptions.jsx
│   │   │   ├── OrderSummary.jsx
│   │   │   └── PaymentSummary.jsx
│   │   ├── OrdersPage.jsx         # Order history
│   │   ├── TrackingPage.jsx       # Order tracking detail
│   │   └── NotFound404.jsx        # 404 page
│   ├── utils/
│   │   └── money.js      # Price formatting utilities
│   ├── App.jsx           # Route definitions
│   ├── main.jsx          # Entry point
│   ├── index.css         # Global styles
│   └── App.css           # App-level styles
├── Starting-code/        # Reference implementation
├── dist/                 # Production build output (gitignored locally, deployed to gh-pages)
├── vite.config.js        # Vite config with GitHub Pages base path
├── eslint.config.js      # ESLint flat config
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- Backend API running on `http://localhost:3000` (see [ecommerce-backend](../ecommerce-backend))

### Installation
```bash
cd ecommerce-project-aiden
npm install
```

### Development
```bash
npm run dev
```
- Opens at `http://localhost:5173`
- Proxies `/api` and `/images` to `http://localhost:3000`

### Production Build
```bash
npm run build
```
- Outputs to `/dist` with `base: '/ReactJs-Project/'` for GitHub Pages

### Preview Production Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

---

## GitHub Pages Deployment

The `gh-pages` branch contains the production build.

**Live site:** https://AidenPiearce.github.io/ReactJs-Project/

### Manual Deploy
```bash
npm run build
cd dist
git init
git remote add origin https://github.com/AidenPiearce/ReactJs-Project.git
git add .
git commit -m "Deploy"
git branch -M gh-pages
git push -u origin gh-pages --force
```

### Repo Settings
- Settings → Pages → Source: **gh-pages branch** / **/(root)**

---

## API Endpoints (Backend)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List all products |
| GET | `/api/products?search=` | Search products |
| GET | `/api/products/:id` | Get single product |
| GET | `/api/cart-items?expand=product` | Get cart with product details |
| POST | `/api/cart-items` | Add to cart |
| DELETE | `/api/cart-items/:productId` | Remove from cart |
| POST | `/api/orders` | Place order |
| GET | `/api/orders` | Get order history |
| GET | `/api/orders/:id` | Get order details |
| GET | `/images/:filename` | Serve product images |

---

## Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `vite` | Start dev server with HMR |
| `build` | `vite build` | Production build to `/dist` |
| `lint` | `eslint .` | Lint all source files |
| `preview` | `vite preview` | Preview production build locally |

---

## Languages & Technologies

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2024-F7DF1E?logo=javascript&logoColor=black)
![JSX](https://img.shields.io/badge/JSX-React-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-8-CA4245?logo=react-router&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-HTTP-5A29E4?logo=axios&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-9-4B32C3?logo=eslint&logoColor=white)
![Day.js](https://img.shields.io/badge/Day.js-1.11-FF6B6B?logo=dayjs&logoColor=white)

---

## Author

**Aiden** — Electrical Engineering Student (121/142 units)

---

## License

MIT — Free for learning and portfolio use.