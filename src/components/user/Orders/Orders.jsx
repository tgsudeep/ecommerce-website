import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Orders.css';
import { useNavigate } from 'react-router-dom';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
      return;
    }

    
    axios.get(`http://localhost:5000/orders?userId=${user.id}`)
      .then((res) => {
        const paidOrders = res.data.filter(order => order.isPaid === true); 
        const uniqueOrders = Array.from(
          new Map(paidOrders.map(order => [order.id, order])).values()
        );
        setOrders(uniqueOrders);
      })
      .catch((err) => {
        console.error("Failed to fetch orders", err);
      });

    axios.get('http://localhost:5000/users')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch users", err);
      });
  }, [navigate]);

  // const handlePayment = (orderId) => {
  //   navigate(`/payment/${orderId}`);
  // };

  const getUsernameById = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? user.username : 'Unknown User';
  };

  return (
    <div className="orders-page">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
            <p><strong>Username:</strong> {getUsernameById(order.userId)}</p>

            <div className="order-items">
              {order.items && order.items.map((item, index) => (
                <div key={index} className="order-item">
                  <img src={item.image} alt={item.name} className="order-item-image" />
                  <div className="order-item-details">
                    <h4>{item.name}</h4>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                    <p>Price: ${item.newPrice}</p>
                  </div>
                </div>
              ))}
            </div>

           
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;