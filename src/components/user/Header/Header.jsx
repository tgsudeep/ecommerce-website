// ... existing imports
import React, { useEffect, useState } from 'react';
import './Header.css';
import logos from '../../../assets/logos.png';
import cart from '../../../assets/cart.png';
import favicon from '../../../assets/favicon.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);

    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(cartItems.length);
  }, [location]);

  const goToLogin = () => navigate('/login');

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const goToAllProducts = () => navigate('/AllProducts');

  const goToCart = () => {
    if (!isLoggedIn) {
      alert('Please log in to view your cart.');
      navigate('/login');
    } else {
      navigate('/cart');
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  return (
    <div>
      <link rel="icon" type="image/png" href="/favicon.png"></link>
      <header className='header'>
        <div className='left'>
          <img src={logos} alt="logos" className='logo' />
          <h2>Daffodils</h2>
        </div>
          
        <div className='center'>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}><h3>Home</h3></Link>
          <h3 onClick={goToAllProducts} style={{ cursor: 'pointer' }}>All Products</h3>
          <Link to="/menproducts"><h3>Men</h3></Link>
          <Link to="/womenproducts"><h3>Women</h3></Link>
          <Link to="/kidsproducts"><h3>Kids</h3></Link>

         
          {isLoggedIn && (
            <Link to="/orders"><h3>Orders</h3></Link>
          )}
        </div>

        <div className='search-section'>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <div className='right'>
          {isLoggedIn ? (
            <button className='log-in' onClick={handleLogout}>Logout</button>
          ) : (
            <button className='log-in' onClick={goToLogin}>Login</button>
          )}

          <div className="cart-wrapper" onClick={goToCart}>
            <img src={cart} alt="cart" className='cart1' />
            {cartCount > 0 && (
              <span className="cart-count">{cartCount}</span>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;