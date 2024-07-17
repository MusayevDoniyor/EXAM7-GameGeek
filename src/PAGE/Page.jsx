import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "../components/header/Header";
import Products from "../pages/products/Products";

const Page = () => {
  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/:productId" />
          <Route path="/cart" />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Page;
