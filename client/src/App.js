import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import CartPage from "./pages/CartPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Header from "./components/header/Header.jsx";
import Footer from "./components/Footer.jsx";
import ProductDetalisPage from "./pages/ProductDetalisPage.jsx";
import AccountDetalispage from "./pages/AccountDetalispage.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import AdminPage from "./pages/adminPage/AdminPage"
import DashboardPage from "./pages/adminPage/DashboardPage"
import AllProduct from "./pages/adminPage/AllProduct"
import CreateProduct from "./pages/adminPage/CreateProduct"
import AdminOrderPage from "./pages/adminPage/AdminOrderPage"
import AdminUserPage from "./pages/adminPage/AdminUserPage"
import { useDispatch, useSelector } from "react-redux";
import { userDetalisThunk } from "./redux/slice/userSlice.js";
import Protected from "./components/Protected.jsx";
import { CircularProgress } from "@mui/material";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userDetalisThunk());
  }, []);

  return (
    <div className="App ">
      <BrowserRouter>
        <Header className="" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:Id" element={<ProductDetalisPage />} />
          <Route path="/Products" element={<ProductsPage />} />
          <Route element={<Protected />}>
            <Route path="/user/account" element={<AccountDetalispage />} />
            <Route path="/user/order" element={<OrderPage />} />
          </Route>
          <Route path="/admin" element={<AdminPage />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="products" element={<AllProduct/>} />
            <Route path="product" element={<CreateProduct />} />
            <Route path="order" element={<AdminOrderPage />} />
            <Route path="user" element={<AdminUserPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
