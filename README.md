# 🛍️ Infinite Scroll Product Grid

A modern, performant React application that renders a product grid with infinite scrolling powered by the native **IntersectionObserver API** — no third-party scroll libraries required.

---

## 🌐 Live Demo & Repository

| | Link |
|---|---|
| 🚀 **Live Demo** | [https://infinite-scroll-product-grid-crd54eqlh.vercel.app](https://infinite-scroll-product-grid-crd54eqlh.vercel.app) |
| 📦 **Repository** | [https://github.com/SUDHEER176/infinite-scroll-product-grid](https://github.com/SUDHEER176/infinite-scroll-product-grid) |

> Deploy on [Vercel](https://vercel.com/) in one click — just connect your GitHub repo.

---

## ✨ Features

- ♾️ **Infinite Scroll** — Automatically loads more products as the user scrolls to the bottom
- 🔭 **IntersectionObserver API** — Lightweight, native browser API; no heavy dependencies
- ⚡ **Vite + React 18** — Blazing-fast development and build tooling
- 🔄 **Duplicate Guard** — Filters out duplicate products across paginated fetches
- 🌀 **Loading Spinner** — Visual feedback while fetching the next page
- 📭 **End-of-List Message** — Notifies users when all products have been loaded
- 🖼️ **Product Cards** — Displays thumbnail, title, category, price, and rating
- 📱 **Responsive Layout** — Grid adapts to all screen sizes

---

## 🗂️ Project Structure

```
frontend/
├── index.html                        # HTML entry point
├── vite.config.js                    # Vite configuration
├── package.json
└── src/
    ├── main.jsx                      # React DOM root
    ├── App.jsx                       # Root app component
    ├── index.css                     # Global styles
    ├── hooks/
    │   └── useInfiniteProducts.js    # Custom hook — fetch & pagination logic
    └── components/
        ├── Products/
        │   └── ProductGrid.jsx       # Grid container + IntersectionObserver
        ├── ProductCard/
        │   └── ProductCard.jsx       # Individual product card
        ├── Spinner/
        │   └── Spinner.jsx           # Loading spinner
        └── MessageBox/
            └── MessageBox.jsx        # End-of-list / error messages
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm v9 or later

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd frontend

# Install dependencies
npm install
```

### Running Locally

```bash
npm run dev
```

The app will be available at **http://localhost:5173** by default.

### Build for Production

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 🔧 How It Works

### `useInfiniteProducts` Hook

The core logic lives in [`src/hooks/useInfiniteProducts.js`](src/hooks/useInfiniteProducts.js).

| State / Ref | Purpose |
|---|---|
| `items` | Accumulated list of all fetched products |
| `page` | Current page index (0-based) |
| `loading` | Boolean — true while a fetch is in-flight |
| `hasMore` | False when all products have been loaded |
| `fetchingRef` | Ref guard to prevent concurrent duplicate fetches |

**Pagination** is handled by passing `limit` (20) and `skip` (`page × 20`) to the [DummyJSON Products API](https://dummyjson.com/docs/products).

### IntersectionObserver

The `Products` grid component attaches an `IntersectionObserver` to a sentinel element at the bottom of the list. When the sentinel enters the viewport, `loadMore()` is called to fetch the next page.

### Load More Fallback

If `IntersectionObserver` is **not supported** by the browser, a manual **"Load More"** button is rendered instead, ensuring the app works in all environments:

```jsx
// ProductGrid.jsx
const isSupported = typeof window !== "undefined" && "IntersectionObserver" in window;

{hasMore && !isSupported && !loading && (
  <button onClick={loadMore} className={styles.loadMoreBtn}>
    Load More
  </button>
)}

---

## 📡 API

Data is fetched from the free [DummyJSON](https://dummyjson.com) public API.

```
GET https://dummyjson.com/products?limit=20&skip={skip}&select=title,price,category,rating,thumbnail
```

Only the fields needed for display (`title`, `price`, `category`, `rating`, `thumbnail`) are selected to keep payloads small.

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev/) | 18.2 | UI framework |
| [Vite](https://vitejs.dev/) | 5.2 | Build tool & dev server |
| [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) | 4.2 | JSX + Fast Refresh support |
| [DummyJSON](https://dummyjson.com/) | — | Mock product REST API |

---

## 📸 Screenshots

> Add screenshots to a `screenshots/` folder and update the paths below.

| Home Page | End of List |
|---|---|
| ![Home Page](./screenshots/home.png) | ![End State](./screenshots/end.png) |

---

## ✅ Assignment Requirements Covered

| Requirement | Status |
|---|---|
| Infinite scroll using IntersectionObserver | ✅ |
| No scroll event listeners used | ✅ |
| Duplicate request prevention via `fetchingRef` guard | ✅ |
| Correct pagination (`limit` / `skip`) | ✅ |
| End-of-list state with message | ✅ |
| Responsive product grid | ✅ |
| Loading indicator (spinner) | ✅ |
| Manual "Load More" button fallback when IntersectionObserver is unsupported | ✅ |

---

## 📋 Final Submission Checklist

- [ ] Public GitHub repository
- [ ] README.md with setup instructions
- [ ] Working infinite scroll
- [ ] No duplicate fetches
- [ ] End-of-list message
- [ ] "Load More" fallback button
- [ ] Responsive UI
- [ ] `npm install` and `npm run dev` work correctly
- [ ] (Optional) Deployed to Vercel with live link

---

## 📄 License

This project is for assignment/demonstration purposes.
