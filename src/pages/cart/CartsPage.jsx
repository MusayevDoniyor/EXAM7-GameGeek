import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LiaLongArrowAltLeftSolid } from "react-icons/lia";
import { RxCross2 } from "react-icons/rx";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { LanguageContext } from "../../components/LanguageProvider";
import emptyCart from "../../assets/emptyCart.svg";

const CartsPage = ({ carts }) => {
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();
  const products = useSelector((store) => store.productsReducer.products);

  const [counts, setCounts] = useState(
    carts.reduce((acc, cartId) => {
      const product = products.find((p) => p.id === cartId);
      acc[product.id] = (acc[product.id] || 0) + 1;
      return acc;
    }, {})
  );

  const [cartIds, setCartIds] = useState(carts);

  const cartProducts = Object.keys(counts).map((productId) =>
    products.find((p) => p.id === productId)
  );

  const totalPrice = cartProducts.reduce((acc, product) => {
    return acc + product.price * counts[product.id];
  }, 0);

  const totalItems = cartProducts.length;

  const handleCountChange = (productId, delta) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [productId]: Math.max(prevCounts[productId] + delta, 1),
    }));
  };

  const handleRemoveProduct = (productId) => {
    setCartIds((prevCartIds) =>
      prevCartIds.filter((id) => id !== productId || counts[productId] === 1)
    );
    setCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      if (newCounts[productId] === 1) {
        delete newCounts[productId];
      } else {
        newCounts[productId]--;
      }
      return newCounts;
    });
  };

  return (
    <div className="px-4 py-7 md:px-16">
      <section>
        <p className="items-center font-readex-pro font-semibold text-[#0D2612] text-base">
          <span
            onClick={() => {
              navigate(-1);
            }}
            className="flex gap-5 items-center cursor-pointer"
          >
            <LiaLongArrowAltLeftSolid className="size-6 text-[#0D2612]" />
            {language === "en" && "Back to Shopping"}
            {language === "es" && "Volver a Comprar"}
            {language === "uz" && "Xaridga Qaytish"}
          </span>
        </p>

        <h3 className="text-[#0D2612] font-hammersmith-one text-3xl font-semibold mt-12 ">
          {language === "en" && "SHOPPING CART"}
          {language === "es" && "CARRITO DE COMPRAS"}
          {language === "uz" && "SAVATCHA"}
        </h3>
      </section>

      <div className="flex flex-col md:flex-row">
        {cartProducts.length > 0 ? (
          <>
            <section className="mt-12 gap-7 border-r-2 pr-7 border-[#E9E7E7] flex-grow">
              <div className="border-t-2 border-b-2 border-dashed border-[#6A6969] px-7 py-3 flex justify-between">
                <div className="font-hammersmith-one font-medium text-[#0D2612] text-2xl">
                  {language === "en" && "Product"}
                  {language === "es" && "Producto"}
                  {language === "uz" && "Mahsulot"}
                </div>

                <div className="w-2/5 flex justify-between">
                  <span className="font-hammersmith-one font-medium text-[#0D2612] text-2xl">
                    {language === "en" && "Quantity"}
                    {language === "es" && "Cantidad"}
                    {language === "uz" && "Miqdor"}
                  </span>

                  <span className="font-hammersmith-one font-medium text-[#0D2612] text-2xl">
                    {language === "en" && "Price"}
                    {language === "es" && "Precio"}
                    {language === "uz" && "Narx"}
                  </span>
                </div>
              </div>

              <div className="flex flex-col">
                {cartProducts.map((product) => (
                  <div
                    key={product.id}
                    className="border-b-2 border-dashed border-[#6A6969] py-4 flex flex-col md:flex-row justify-between items-start"
                  >
                    <div className="flex gap-4 items-start">
                      <RxCross2
                        className="cursor-pointer size-5"
                        onClick={() => handleRemoveProduct(product.id)}
                      />
                      <img
                        src={product.image_url}
                        alt="product image"
                        className="size-36 border-2 rounded-md"
                      />

                      <div className="flex flex-col items-start ml-10">
                        <h4 className="font-hammersmith-one font-semibold text-xl text-[#0D2612]">
                          {product.brand_name}
                        </h4>
                        <p className="font-readex-pro font-normal text-[#190D26] text-lg">
                          {language === "en" && product.name}
                          {language === "es" && product.name_es}
                          {language === "uz" && product.name_uz}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-7 bg-[#F5F5F5] rounded-3xl px-8 py-4 items-center mt-4 md:mt-0">
                      <FaMinus
                        className="cursor-pointer "
                        onClick={() => handleCountChange(product.id, -1)}
                      />

                      <span className="font-inter font-semibold text-xl text-[#0D2612]">
                        {counts[product.id]}
                      </span>

                      <FaPlus
                        className="cursor-pointer"
                        onClick={() => handleCountChange(product.id, 1)}
                      />
                    </div>

                    <span className="font-readex-pro font-bold text-[#0D2612] text-xl mt-4 md:mt-0">
                      ${(product.price * counts[product.id]).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-12 pl-7 md:ml-7">
              <div className="flex justify-between items-center">
                <h4 className="text-[#0D2612] font-hammersmith-one text-3xl font-medium border-b-2 border-dashed border-[#6A6969] pb-4">
                  {language === "en" && "Cart Totals"}
                  {language === "es" && "Total del Carrito"}
                  {language === "uz" && "Savatcha Jami"}
                </h4>
              </div>

              <ul className="border-b-2 border-[#6A6969] border-dashed py-7 ">
                <li className="flex justify-between font-readex-pro font-normal text-lg text-[#190D26] ">
                  {language === "en" && "Items in Cart"}
                  {language === "es" && "Artículos en el Carrito"}
                  {language === "uz" && "Savatchadagi Mahsulotlar"}{" "}
                  <span className="font-semibold">{totalItems}</span>
                </li>

                <li className="py-5 flex justify-between font-readex-pro font-normal text-lg text-[#190D26]">
                  {language === "en" && "Shipping (3-5 Business Days)"}
                  {language === "es" && "Envío (3-5 días hábiles)"}
                  {language === "uz" && "Yetkazib berish (3-5 ish kuni)"}{" "}
                  <span className="font-semibold">Free</span>
                </li>

                <li className="py-5 flex justify-between font-readex-pro font-normal text-lg text-[#190D26]">
                  {language === "en" &&
                    "TAX (estimated for the United States (US))"}
                  {language === "es" &&
                    "IMPUESTOS (estimado para los Estados Unidos (EE. UU.))"}
                  {language === "uz" && "SOLIQ (AQSh uchun taxminiy)"}{" "}
                  <span className="font-semibold">$0</span>
                </li>

                <li className="flex justify-between font-readex-pro font-normal text-lg text-[#190D26]">
                  {language === "en" && "Subtotal"}
                  {language === "es" && "Subtotal"}
                  {language === "uz" && "Jami"}{" "}
                  <span className="font-semibold">
                    ${totalPrice.toFixed(2)}
                  </span>
                </li>
              </ul>

              <div className="flex justify-between font-readex-pro font-semibold text-lg text-[#190D26] mt-7 mb-10">
                <span>
                  {language === "en" && "Total"}
                  {language === "es" && "Total"}
                  {language === "uz" && "Jami"}
                </span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <div>
                <button className="bg-[#0BA42D] hover:bg-[#0BB91D] text-white font-medium px-6 py-2 md:px-8 md:py-3 rounded-md text-base md:text-lg w-full mt-4">
                  {language === "en" && "Proceed to Checkout"}
                  {language === "es" && "Ir a Pagar"}
                  {language === "uz" && "Rasmiylashtirish"}
                </button>
              </div>

              <p className="items-center font-readex-pro font-semibold mt-7 ml-20 text-[#0D2612] text-base">
                <span
                  onClick={() => {
                    navigate(-1);
                  }}
                  className="flex gap-5 items-center cursor-pointer"
                >
                  <LiaLongArrowAltLeftSolid className="size-6 text-[#0D2612]" />
                  {language === "en" && "Back to Shopping"}
                  {language === "es" && "Volver a Comprar"}
                  {language === "uz" && "Xaridga Qaytish"}
                </span>
              </p>
            </section>
          </>
        ) : (
          <div className="mx-auto flex flex-col items-center gap-8 p-5">
            <img src={emptyCart} alt="emptyCart" className="w-3/4 max-w-lg" />
            <p className="text-[#0D2612] font-hammersmith-one text-3xl font-medium text-center mt-8">
              {language === "en" && "No Products in Cart :("}
              {language === "es" && "¡No hay productos en el carrito! :("}
              {language === "uz" && "Savatchada mahsulot yo'q :("}
            </p>

            <button
              className="bg-[#0BA42D] hover:bg-[#0BB91D] text-white font-bold px-10 py-3 rounded-lg text-xl flex justify-center items-center gap-4 font-inter sm:w-3/4 w-full max-w-sm"
              onClick={() => navigate(-1)}
            >
              {language === "en" && "Back to Shopping"}
              {language === "es" && "Volver a Comprar"}
              {language === "uz" && "Xaridga Qaytish"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartsPage;
