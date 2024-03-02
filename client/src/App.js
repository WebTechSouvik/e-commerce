import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import CartPage from "./pages/cartPage/CartPage.jsx";
import LoginPage from "./pages/userPage/LoginPage.jsx";
import RegisterPage from "./pages/userPage/RegisterPage.jsx";
import Header from "./components/header/Header.jsx";
import Footer from "./components/Footer.jsx";
import ProductDetalisPage from "./pages/productPage/ProductDetalisPage.jsx";
import AccountDetalispage from "./pages/userPage/AccountDetalispage.jsx";
import OrderPage from "./pages/orderPage/OrderPage.jsx";
import ShippingPage from "./pages/orderPage/ShippingPage.jsx"
import ConfirmOrderPage from "./pages/orderPage/ConfirmOrderPage.jsx"
import ProductsPage from "./pages/productPage/ProductsPage.jsx";
import AdminPage from "./pages/adminPage/AdminPage";
import DashboardPage from "./pages/adminPage/DashboardPage";
import AllProduct from "./pages/adminPage/AllProduct";
import CreateProduct from "./pages/adminPage/CreateProduct";
import AdminOrderPage from "./pages/adminPage/AdminOrderPage";
import AdminUserPage from "./pages/adminPage/AdminUserPage";
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
          <Route element={<Protected isadmin={false} />}>
            <Route path="/user/account" element={<AccountDetalispage />} />
            <Route path="/user/order" element={<OrderPage />} />
          </Route>
          <Route element={<Protected isadmin={false} />} >
          <Route path="/shipping" element={<ShippingPage/>}/>
            
           <Route path="/order/confirm" element={<ConfirmOrderPage/>}/>

          </Route>

          <Route element={<Protected isadmin={true} />}>
            <Route path="/admin" element={<AdminPage />}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="products" element={<AllProduct />} />
              <Route path="product" element={<CreateProduct />} />
              <Route path="order" element={<AdminOrderPage />} />
              <Route path="user" element={<AdminUserPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
