import React, { useEffect, useState } from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      toast.error("Please log in to view your cart.");
      navigate('/login');
      return;
    }

    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cartData);
  }, [navigate]);

 
  const updateCart = (updatedItems) => {
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  
  const handleRemove = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    updateCart(updatedCart);
    toast.success("Item removed from cart");
  };

  
  const handleIncrement = (id) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );
    updateCart(updatedCart);
  };


  const handleDecrement = (id) => {
    const updatedCart = cartItems.map(item =>
      item.id === id && (item.quantity || 1) > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    updateCart(updatedCart);
  };

 
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const qty = item.quantity || 1;
      const price = item.newPrice || item.price || 0;
      return total + price * qty;
    }, 0);
  };

 
  const handlePlaceOrder = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      toast.error("Please login to place an order");
      return;
    }

    const order = {
      userId: user.id,
      items: cartItems,
      isPaid: false, 
      orderDate: new Date().toISOString()
    };

    try {
      const res = await axios.post("http://localhost:5000/orders", order);
      const orderId = res.data.id;

      toast.success("Order created, redirecting to payment...");
      setCartItems([]);
      localStorage.removeItem('cart');

      
      navigate(`/payment/${orderId}`);
    } catch (error) {
      console.error("Order error:", error);
      toast.error("Failed to place order");
    }
  };

  return (
    <div className="cart-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map(item => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-img" />
                <div className="cart-details">
                  <h4>{item.name}</h4>
                  <p>Price: ₹ {item.newPrice || item.price}</p>
                  <div className="quantity-controls">
                    <button onClick={() => handleDecrement(item.id)}>-</button>
                    <span>{item.quantity || 1}</span>
                    <button onClick={() => handleIncrement(item.id)}>+</button>
                  </div>
                  <button className="remove-button" onClick={() => handleRemove(item.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <h3>Total: ₹ {getTotalPrice()}</h3>
            <button className="payment-button" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
