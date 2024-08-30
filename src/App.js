import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from './pages/signUpPage';
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <Routes>
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path='/wishlist' element={<WishlistPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home/:category" element={<HomePage />} /> {/* Route with category */}
      <Route path="/home" element={<HomePage />} /> {/* Route without category */}
      <Route path="/" element={<HomePage />} /> {/* Default Route */}
      <Route path="/order-history" element={<OrderHistoryPage />} />
      <Route path='*' element={<ErrorPage/>}/>
    </Routes>
  );
}

export default App;
