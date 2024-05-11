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
import ShippingPage from "./pages/orderPage/ShippingPage.jsx";
import ConfirmOrderPage from "./pages/orderPage/ConfirmOrderPage.jsx";
import OrderDetalisPage from "./pages/orderPage/OrderDetalisPage.jsx";
import OrderPage from "./pages/orderPage/OrderPage.jsx";
import SucessOrderPage from "./pages/orderPage/SucessOrderPage.jsx";
import PaymentPage from "./pages/orderPage/PaymentPage.jsx";
import ProductsPage from "./pages/productPage/ProductsPage.jsx";
import AdminPage from "./pages/adminPage/AdminPage.jsx";
import DashboardPage from "./pages/adminPage/DashboardPage.jsx";
import AllProduct from "./pages/adminPage/AllProduct.jsx";
import CreateProduct from "./pages/adminPage/CreateProduct.jsx";
import AllOrderPage from "./pages/adminPage/AllOrderPage.jsx";
import AllUserPage from "./pages/adminPage/AllUserPage.jsx";
import { useDispatch, useSelector } from "react-redux";
import { userDetalisThunk } from "./redux/slice/userSlice.js";
import Protected from "./components/Protected.jsx";
import { CircularProgress } from "@mui/material";
import { Toaster } from "sonner";
import { clearError } from "./redux/slice/userSlice.js";

function App() {
  const dispatch = useDispatch();

  var allcookies = document.cookie;
  var arrayb = allcookies.split(";");

  arrayb.forEach((item) => {
    if (item.startsWith(" userToken=")) {
      dispatch(userDetalisThunk());
    }
  });

  return (
    <div className="App ">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:Id" element={<ProductDetalisPage />} />
          <Route path="/Products" element={<ProductsPage />} />
          <Route path="/Products/Scearch/:keyword" element={<ProductsPage />} />
          <Route element={<Protected isadmin={false} />}>
            <Route path="/user/account" element={<AccountDetalispage />} />
            {/* <Route path="/user/order" element={<OrderPage />} />*/}
          </Route>
          <Route element={<Protected isadmin={false} />}>
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/order/confirm" element={<ConfirmOrderPage />} />
            <Route path="/order/sucess" element={<SucessOrderPage />} />
            <Route path="/order/me" element={<OrderPage />} />
            <Route path="/order/:Id" element={<OrderDetalisPage />} />
          </Route>

          <Route element={<Protected isadmin={true} />}>
            <Route path="/admin" element={<AdminPage />}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="products" element={<AllProduct />} />
              <Route path="product" element={<CreateProduct />} />
              <Route path="product/:Id" element={<CreateProduct />} />
              <Route path="order" element={<AllOrderPage />} />
              <Route path="user" element={<AllUserPage />} />
            </Route>
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
      <Toaster richColors position="top-center" />
    </div>
  );
}

export default App;
