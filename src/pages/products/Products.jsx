import React, { useState, useEffect } from "react";
import api from "../../api/api";
import PriceSorting from "../../components/productsPriceSorting/PriceSorting";
import Aside from "../../components/Aside/Aside";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../../store/productsSlice";
import Spinner from "../../components/spinner/Spinner";
import Card from "../../components/card/Card";

const Products = ({ carts, setCarts, setProducts }) => {
  const dispatch = useDispatch();
  const products = useSelector((store) => store.productsReducer.products);

  // * Sorting
  const [sortOrder, setSortOrder] = useState("asc");

  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [brandsOpen, setBrandsOpen] = useState(false);

  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [colorsOpen, setColorsOpen] = useState(false);

  // ? Loading
  const [loading, setLoading] = useState(true);

  const baseUrl = `${import.meta.env.VITE_BASE_URL}`;

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await api.get("/brands");
        setBrands(response.data);
      } catch (error) {
        console.error("Brands fetch error:", error);
      }
    };

    const fetchColors = async () => {
      try {
        const response = await api.get("/colors");
        setColors(response.data);
      } catch (error) {
        console.error("Colors fetch error:", error);
      }
    };

    fetchBrands();
    fetchColors();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      let query = `${baseUrl}/products`;
      const params = [];

      if (selectedColor) {
        params.push(`color_options_like=${encodeURIComponent(selectedColor)}`);
      }
      if (selectedBrand) {
        params.push(`brand_name=${encodeURIComponent(selectedBrand)}`);
      }

      if (params.length > 0) {
        query += `?${params.join("&")}`;
      }

      try {
        const response = await api.get(query);
        const sortedProducts = [...response.data].sort((a, b) => {
          if (sortOrder === "asc") {
            return parseFloat(a.price) - parseFloat(b.price);
          } else {
            return parseFloat(b.price) - parseFloat(a.price);
          }
        });

        dispatch(addProducts(sortedProducts));
        console.log(response.data);
      } catch (error) {
        console.error("Products fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedBrand, selectedColor, sortOrder, dispatch, baseUrl]);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const toggleAccordion = (currentState, setFunction) => {
    setFunction(!currentState);
  };

  return (
    <>
      <PriceSorting sortOrder={sortOrder} toggleSortOrder={toggleSortOrder} />

      <div className="grid mt-7 h-screen grid-cols-1 lg:grid-cols-[275px,1fr] gap-6 p-6">
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

        <main>
          {loading ? (
            <Spinner />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
              {products.map((product) => (
                <Card
                  key={product.id}
                  product={product}
                  products={products}
                  setProducts={setProducts}
                  carts={carts}
                  setCarts={setCarts}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Products;
