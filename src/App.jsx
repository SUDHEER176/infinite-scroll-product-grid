import React, { useState, useCallback } from 'react';
import ProductGrid from './components/Products/ProductGrid';
import Navbar from './components/Navbar/Navbar';
import FilterSortBar from './components/FilterSortBar/FilterSortBar';
import WishlistDrawer from './components/WishlistDrawer/WishlistDrawer';
import CartDrawer from './components/CartDrawer/CartDrawer';
import Toast from './components/Toast/Toast';
import useWishlist from './hooks/useWishlist';
import useCart from './hooks/useCart';
import './index.css';

export default function App() {
  const { wishlist, toggle: toggleWishlist, isWishlisted } = useWishlist();
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    totalItems: cartCount,
    totalPrice,
  } = useCart();

  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [resultCount, setResultCount] = useState(0);
  const [toast, setToast] = useState({ visible: false, message: '' });

  const handleAddToCart = useCallback((product) => {
    addToCart(product);
    setToast({ visible: true, message: `${product.title} added to bag!` });
  }, [addToCart]);

  const handleHideToast = useCallback(() => {
    setToast(prev => ({ ...prev, visible: false }));
  }, []);

  return (
    <div className="app-container">
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="app-main">
        <div className="layout-grid">
          <FilterSortBar
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            resultCount={resultCount}
          />

          <div className="products-area">
            <ProductGrid
              searchQuery={searchQuery}
              activeCategory={activeCategory}
              sortBy={sortBy}
              isWishlisted={isWishlisted}
              onToggleWishlist={toggleWishlist}
              onAddToCart={handleAddToCart}
              onResultCountChange={setResultCount}
            />
          </div>
        </div>
      </main>

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemove={toggleWishlist}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemove={removeFromCart}
        onUpdateQty={updateQuantity}
        totalPrice={totalPrice}
      />

      <Toast
        message={toast.message}
        isVisible={toast.visible}
        onHide={handleHideToast}
      />
    </div>
  );
}
