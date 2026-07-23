# 🛍️ Infinite Scroll Product Grid

A modern, performant E-Commerce application built with **React 18** and **Vite**, featuring native infinite scroll pagination using the **IntersectionObserver API** and a full suite of unique E-Commerce features.

---

## 🌐 Live Demo & Repository

| Resource | Link |
|---|---|
| 🚀 **Live Demo** | [https://infinite-scroll-product-grid.vercel.app](https://infinite-scroll-product-grid.vercel.app) |
| 📦 **GitHub Repository** | [https://github.com/SUDHEER176/infinite-scroll-product-grid](https://github.com/SUDHEER176/infinite-scroll-product-grid) |

---

## 🎯 Primary Problem Statement Requirements (Core Features)

These core requirements fulfill the assignment specification using the [DummyJSON Products API](https://dummyjson.com/products?limit=20&skip=):

| Requirement | Implementation Details | Status |
|---|---|---|
| **IntersectionObserver Infinite Scroll** | Uses native browser `IntersectionObserver` sentinel element to trigger automated paginated fetches as the user scrolls near the bottom — **zero scroll event listeners used**. | ✅ Complete |
| **Duplicate Fetch Prevention** | Guarded by `isFetchingRef` (`useRef`) to prevent redundant or duplicate network requests when the observer fires repeatedly during inflight API requests. | ✅ Complete |
| **Correct Pagination Math** | Accurately calculates `skip` offsets (`page × limit`, `limit=20`) to fetch all 194 products seamlessly from `https://dummyjson.com/products?limit=20&skip=`. | ✅ Complete |
| **Scroll Position Preservation** | Appends new product batches without jumping or resetting the window scroll position. | ✅ Complete |
| **End-of-List State** | Displays a distinct `"🎉 You've reached the end! Showing all 194 products."` banner when all available items are loaded. | ✅ Complete |
| **Manual "Load More" Fallback** | Feature-detects `IntersectionObserver` support. If unsupported by an older browser, gracefully degrades to a manual **"Load More"** button. | ✅ Complete |

---

## ✨ Added Unique Features (Custom Enhancements)

Beyond the core assignment requirements, the following unique features were added to deliver a complete, high-end e-commerce experience:

### 1. 🔍 Real-Time Live Search
- Integrated search bar in the sticky navigation header.
- Instant live search that matches product titles, brand names, and category keywords.
- One-click clear (`×`) button to reset search queries.

### 2. 🏷️ Vertical Flaticon Category Sidebar
- Sticky left vertical navigation bar featuring custom **Flaticon UIcons** for every product category:
  - **All**: `fi-rr-border-all`
  - **Beauty**: `fi-rr-sparkles`
  - **Smartphones**: `fi-rr-mobile-hand`
  - **Laptops**: `fi-rs-laptop`
  - **Fragrances**: `fi-rr-flower-tulip`
  - **Skin Care**: `fi-rr-cream`
  - **Groceries**: `fi-ts-grocery-basket`
  - **Home Decor**: `fi-rr-couch`
  - **Tops**: `fi-rr-shirt-tank-top`
  - **Shoes**: `fi-rs-hiking-boot`
  - **Watches**: `fi-rr-watch-smart`
  - **Sports**: `fi-rr-volleyball`
- Real-time result counter pill showing loaded & filtered product counts.

### 3. 🔀 Multi-Option Sorting Engine
- Dynamic product sorting dropdown options:
  - **Featured** (Default API order)
  - **Price: Low → High**
  - **Price: High → Low**
  - **Highest Rated**
  - **Most Discounted**

### 4. ❤️ Persistent Wishlist Drawer
- Quick-toggle ♡ heart button on product cards (`fi-rs-heart` / `fi-ss-heart`).
- Slide-in side Wishlist Drawer showing saved items.
- Live total wishlist value calculation formatted in USD (`$`).
- Full **`localStorage` persistence** across page reloads.

### 5. 🛒 Shopping Bag Cart Drawer with Item Removal
- **"Add to Bag"** hover overlay button on product cards.
- Slide-in Shopping Bag Drawer showing item counts, unit prices, and subtotal.
- **Quantity controls (`+` / `-`)** and **Item Removal buttons** inside the drawer.
- Full **`localStorage` persistence**.

### 6. 🔔 Animated Toast Notifications
- Slide-up notification toast giving visual feedback whenever a product is added to the shopping bag.
- Automatic 3-second dismissal or manual close.

---

## 🗂️ Project Structure

```
frontend/
├── index.html                            # HTML entry point with Flaticon CDN links
├── vercel.json                           # Vercel deployment & SPA routing rules
├── package.json
└── src/
    ├── main.jsx                          # React DOM entry point
    ├── App.jsx                           # Root layout & drawer state manager
    ├── index.css                         # Design tokens, variables & reset styles
    ├── hooks/
    │   ├── useInfiniteProducts.js        # Core pagination & fetch hook
    │   ├── useWishlist.js                # Wishlist state & localStorage sync
    │   └── useCart.js                    # Shopping bag state & localStorage sync
    └── components/
        ├── Navbar/                       # Sticky header with search & drawer badges
        ├── FilterSortBar/                # Vertical Flaticon sidebar & sort list
        ├── Products/                     # Grid container & IntersectionObserver sentinel
        ├── ProductCard/                  # Product card with hover action & wishlist heart
        ├── WishlistDrawer/               # Slide-in wishlist drawer panel
        ├── CartDrawer/                   # Slide-in cart drawer with remove & qty controls
        ├── Toast/                        # Notification toast
        ├── Spinner/                      # Loading spinner
        └── MessageBox/                   # End-of-list banner component
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- npm v9+

### Installation & Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/SUDHEER176/infinite-scroll-product-grid.git
cd frontend

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

The application will be running at **http://localhost:5173**.

### Production Build

```bash
npm run build
```

---

## 📡 API Endpoint

Data is dynamically fetched from the [DummyJSON API](https://dummyjson.com/docs/products):

```http
GET https://dummyjson.com/products?limit=20&skip={skip}
```

---

## 🛠️ Built With

- **React 18**
- **Vite 5**
- **Vanilla CSS Modules**
- **IntersectionObserver API**
- **Flaticon UIcons**
- **HTML5 Web Storage (localStorage)**

---

## 📄 License

This project is open-source under the MIT License.

<img width="1147" height="706" alt="image" src="https://github.com/user-attachments/assets/560d01d7-9701-4903-b1de-e3faadefcb01" />

