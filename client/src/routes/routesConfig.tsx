import React from "react";
import { Routes, Route } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import ProductList from "../components/products/product-list";
import ProductDetail from "../components/product-detail/product-detail";
import Header from "../components/layouts/header/header";
import Footer from "../components/layouts/footer/footer";

const RouterConfig: React.FC = () => {
  return (
    <div>
      <Header />
      <Routes>
        {/* Public routes should be placed in here */}
        <Route path={"/"} element={<ProductList />} />
        <Route path={"/product/:id"} element={<ProductDetail />} />

        {/* 404 page */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default RouterConfig;
