import React from 'react'
import Products from './components/Products/ProductGrid'
import './index.css'

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-title-row">
          <i className="fi fi-br-shopping-bag"></i>
          <h1>Infinite Scroll Product Grid</h1>
        </div>
        <p>A modern React implementation using IntersectionObserver</p>
      </header>
      <main>
        <Products />
      </main>
    </div>
  )
}

export default App
