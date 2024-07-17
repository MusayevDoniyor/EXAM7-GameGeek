import React from "react";
import { useState } from "react";
import PriceSorting from "../../components/productsPriceSorting/PriceSorting";

const Products = () => {
  const [sortOrder, setSortOrder] = useState("asc");

  const toggleSortOrder = () => {
    setSortOrder(sortOrder == "asc" ? "desc" : "asc");
  };

  return (
    <PriceSorting sortOrder={sortOrder} toggleSortOrder={toggleSortOrder} />
  );
};

export default Products;
