import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import Register from './components/Registration';
import Header from './components/user/Header/Header';
import Footer from './components/user/Footer/Footer';
import Body from './components/user/Home/Body';
import AllProducts from './components/user/AllProducts/AllProducts';
import ProductDetails from './components/user/ProductDetails/ProductDetails';
import MenProducts from './components/user/Men/MenProducts';
import WomenProducts from './components/user/Women/WomenProducts';
import KidsProducts from './components/user/Kids/KidsProducts';
import Cart from './components/user/cart/cart';
import Payment from './components/user/PayMent/PayMent';
import Search from './components/user/Search/Search';
import Orders from './components/user/Orders/Orders';

import AdminDashboard from './components/admin/AdminDashboard/AdminDashboard';
import ProductManager from './components/admin/AdminProducts/AdminProducts';
import AdminUsers from './components/admin/ManageUsers/ManageUsers';
import AdminLayout from './components/admin/SideBar/AdminLayout';

import Login from './components/LogIn';
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute';

const UserLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <Routes>

        
        <Route path="/admin" element={
          <ProtectedAdminRoute>
            <AdminLayout />
          </ProtectedAdminRoute>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="productmanager" element={<ProductManager />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>

       
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

     
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Body />} />
          <Route path="allproducts" element={<AllProducts />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="menproducts" element={<MenProducts />} />
          <Route path="womenproducts" element={<WomenProducts />} />
          <Route path="kidsproducts" element={<KidsProducts />} />
          <Route path="cart" element={<Cart />} />
          <Route path="payment/:orderId" element={<Payment />} />
          <Route path="search" element={<Search />} />
          <Route path="orders" element={<Orders />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;