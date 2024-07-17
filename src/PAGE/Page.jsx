import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "../components/header/Header";
import Products from "../pages/products/Products";
import CartsPage from "../pages/cart/CartsPage";

const Page = () => {
  const [carts, setCarts] = useState([]);
  const [products, setProducts] = useState([]);

  return (
    <>
      <BrowserRouter>
        <Header carts={carts} setCarts={setCarts} />

        <Routes>
          <Route
            path="/"
            element={
              <Products
                carts={carts}
                setCarts={setCarts}
                products={products}
                setProducts={setProducts}
              />
            }
          />
          <Route
            path="/cart"
            element={<CartsPage carts={carts} setCarts={setCarts} />}
          />
          <Route path="/:productId" />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Page;
