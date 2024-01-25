import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import CartPage from "./pages/CartPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Header from "./components/header/Header.jsx"
import Footer from "./components/Footer.jsx"
import ProductDetalisPage from "./pages/ProductDetalisPage.jsx";
function App() {
  return (
    <div className="App ">
      <BrowserRouter>
    <Header className=""/>
        <Routes>

          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:Id" element={<ProductDetalisPage/>}></Route>
        </Routes>
  
      </BrowserRouter>
    </div>
  );
}

export default App;
