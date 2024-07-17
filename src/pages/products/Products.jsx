import React, { useState, useEffect } from "react";
import api from "../../api/api";
import PriceSorting from "../../components/productsPriceSorting/PriceSorting";
import Aside from "../../components/Aside/Aside";

const Products = () => {
  // * Sorting
  const [sortOrder, setSortOrder] = useState("asc");

  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [brandsOpen, setBrandsOpen] = useState(false);

  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [colorsOpen, setColorsOpen] = useState(false);

  // ? Loading
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchBrands() {
      try {
        const response = await api.get("/brands");
        setBrands(response.data);
      } catch (error) {
        console.error("Brands fetch error:", error);
      }
    }

    async function fetchColors() {
      try {
        const response = await api.get("/colors");
        setColors(response.data);
      } catch (error) {
        console.error("Colors fetch error:", error);
      }
    }

    fetchBrands();
    fetchColors();
  }, []);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder == "asc" ? "desc" : "asc");
  };

  const toggleAccordion = (currentState, setFunction) => {
    setFunction(!currentState);
  };

  return (
    <>
      <PriceSorting sortOrder={sortOrder} toggleSortOrder={toggleSortOrder} />

      <Aside
        toggleAccordion={toggleAccordion}
        brands={brands}
        setBrandsOpen={setBrandsOpen}
        brandsOpen={brandsOpen}
        setSelectedBrand={setSelectedBrand}
        selectedBrand={selectedBrand}
        colors={colors}
        setColorsOpen={setColorsOpen}
        colorsOpen={colorsOpen}
        setSelectedColor={setSelectedColor}
        selectedColor={selectedColor}
      />
    </>
  );
};

export default Products;
