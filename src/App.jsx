import React, { useState } from 'react';
import ProductList from './ProductList';
import './App.css';
import AboutUs from './AboutUs';
import CartItem from './CartItem'; // ✅ import your cart

function App() {
  const [view, setView] = useState('home'); 
  // possible values: 'home', 'products', 'cart'

  // handlers
  const handleGetStartedClick = () => setView('products');
  const handleHomeClick = () => setView('home');
  const handleViewCart = () => setView('cart');
  const handleContinueShopping = () => setView('products');

  return (
    <div className="app-container">
      {view === 'home' && (
        <div className="landing-page">
          <div className="background-image"></div>
          <div className="content">
            <div className="landing_content">
              <h1>Welcome To Paradise Nursery</h1>
              <div className="divider"></div>
              <p>Where Green Meets Serenity</p>
              <button className="get-started-button" onClick={handleGetStartedClick}>
                Get Started
              </button>
            </div>
            <div className="aboutus_container">
              <AboutUs />
            </div>
          </div>
        </div>
      )}

      {view === 'products' && (
        <ProductList
          onHomeClick={handleHomeClick}
          onViewCart={handleViewCart} // 👈 pass this down
        />
      )}

      {view === 'cart' && (
        <CartItem
          onContinueShopping={handleContinueShopping} // 👈 go back to products
        />
      )}
    </div>
  );
}

export default App;
