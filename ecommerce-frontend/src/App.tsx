import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

import Login from "./pages/client/Login";
import Register from "./pages/client/Register";
import ProductList from "./pages/client/ProductList";
import Product from "./pages/client/Product";
import Cart from "./pages/client/Cart";

import AdminDashboard from "./pages/admin/AdminDashboard";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product-list" element={<ProductList />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
