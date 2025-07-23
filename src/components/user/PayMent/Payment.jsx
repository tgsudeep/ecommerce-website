import React, { useState, useEffect } from 'react';
import './Payment.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Payment() {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const [card, setCard] = useState({
    name: '',
    number: '',
    expiry: '',
    cvv: ''
  });

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      axios.get(`http://localhost:5000/orders/${orderId}`)
        .then(res => {
          setOrder(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to fetch order details', err);
          setLoading(false);
        });
    }
  }, [orderId]);

  const handleChange = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const updateOrderPaymentStatus = async () => {
    try {
      await axios.patch(`http://localhost:5000/orders/${orderId}`, {
        isPaid: true
      });
      alert('Payment successful! Thank you for your purchase.');
      localStorage.removeItem('cart');
      navigate('/orders');
    } catch (err) {
      console.error("Failed to update payment status", err);
      alert(" Payment completed, but updating order failed.");
    }
  };

  const validateCard = () => {
    const { name, number, expiry, cvv } = card;
    if (!name || !number || !expiry || !cvv) {
      alert("❗Please fill in all card details.");
      return false;
    }
    if (number.length !== 16 || isNaN(number)) {
      alert("❗Card number must be 16 digits.");
      return false;
    }
    if (cvv.length !== 3 || isNaN(cvv)) {
      alert("❗CVV must be 3 digits.");
      return false;
    }
    return true;
  };

  const handleCardPayment = () => {
    if (validateCard()) {
      updateOrderPaymentStatus();
    }
  };

  const handleGPayPayment = () => {
   
    const confirmGPay = window.confirm("Simulate GPay Payment?");
    if (confirmGPay) {
      updateOrderPaymentStatus();
    }
  };

  if (loading) {
    return <div className="payment-container"><h2>Loading payment details...</h2></div>;
  }

  return (
    <div className="payment-container">
      <h2>Payment Page</h2>
      <p><strong>Order ID:</strong> {orderId}</p>

      <div className="payment-form">
        <input
          type="text"
          name="name"
          placeholder="Cardholder Name"
          value={card.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="number"
          placeholder="Card Number (16 digits)"
          maxLength="16"
          value={card.number}
          onChange={handleChange}
        />
        <div className="row">
          <input
            type="text"
            name="expiry"
            placeholder="MM/YY"
            value={card.expiry}
            onChange={handleChange}
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV (3 digits)"
            maxLength="3"
            value={card.cvv}
            onChange={handleChange}
          />
        </div>

        <button className="card-button" onClick={handleCardPayment}> Pay with Card</button>

        <div className="gpay-divider">or</div>

        <button className="gpay-button" onClick={handleGPayPayment}>🪙 Pay with GPay</button>
      </div>
    </div>
  );
}

export default Payment;