import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";
import { useNavigate, Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
   
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, "", window.location.href);
    };

    axios.get("http://localhost:5000/orders").then((res) => setOrders(res.data));
    axios.get("http://localhost:5000/products").then((res) => setProducts(res.data));
    axios.get("http://localhost:5000/users").then((res) =>
      setUsers(res.data.filter((user) => !user.deleted))
    );
  }, []);

  // const handleLogout = () => {
  //   localStorage.removeItem("admin");
  //   navigate("/admin-login", { replace: true });
  // };

  const totalRevenue = orders.reduce((total, order) => {
    const orderTotal = order.items.reduce(
      (sum, item) => sum + item.newPrice * item.quantity,
      0
    );
    return total + orderTotal;
  }, 0);


  const monthlyRevenue = {};
  orders.forEach((order) => {
    const date = new Date(order.orderDate);
    const month = date.toLocaleString("default", { month: "short" });
    const total = order.items.reduce(
      (sum, item) => sum + item.newPrice * item.quantity,
      0
    );

    if (monthlyRevenue[month]) {
      monthlyRevenue[month] += total;
    } else {
      monthlyRevenue[month] = total;
    }
  });

  const chartData = Object.entries(monthlyRevenue).map(([month, revenue]) => ({
    month,
    revenue,
  }));

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
       
      </div>

      

      <div className="stats-container">
        <div className="stat-box">
          <h3>Total Orders</h3>
          <p>{orders.length}</p>
        </div>
        <div className="stat-box">
          <h3>Total Inventory</h3>
          <p>{products.length}</p>
        </div>
        <div className="stat-box">
          <h3>Customers</h3>
          <p>{users.length}</p>
        </div>
        <div className="stat-box">
          <h3>Total Revenue</h3>
          <p>${totalRevenue.toFixed(2)}</p>
        </div>
      </div>

      <div className="recent-orders">
        <h3>Recent Orders</h3>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Items</th>
              <th>Order Date</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.slice().reverse().slice(0, 5).map((order) => {
              const total = order.items.reduce(
                (sum, item) => sum + item.newPrice * item.quantity,
                0
              );
              return (
                <tr key={order.id}>
                  <td>{order.userId}</td>
                  <td>{order.items.map((i) => i.name).join(", ")}</td>
                  <td>{new Date(order.orderDate).toLocaleString()}</td>
                  <td>${total.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="graph-container">
        <h3>Monthly Revenue Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="revenue"
              fill="#4a90e2"
              name="Revenue"
              barSize={40} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AdminDashboard;