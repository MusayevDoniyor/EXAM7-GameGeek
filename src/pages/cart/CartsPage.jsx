import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LiaLongArrowAltLeftSolid } from "react-icons/lia";
import { RxCross2 } from "react-icons/rx";
import { FaMinus, FaPlus } from "react-icons/fa6";

const CartsPage = ({ carts }) => {
  const navigate = useNavigate();
  const products = useSelector((store) => store.productsReducer.products);

  const [counts, setCounts] = useState(
    carts.reduce((acc, cartId) => {
      const product = products.find((p) => p.id === cartId);
      acc[product.id] = 1;
      return acc;
    }, {})
  );

  const [cartIds, setCartIds] = useState(carts);

  const cartProducts = cartIds.map((cartId) =>
    products.find((p) => p.id === cartId)
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
    setCartIds((prevCartIds) => prevCartIds.filter((id) => id !== productId));
    setCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      delete newCounts[productId];
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
            Back to Shopping
          </span>
        </p>

        <h3 className="text-[#0D2612] font-hammersmith-one text-3xl font-semibold mt-12 ">
          SHOPPING CART
        </h3>
      </section>

      <div className="flex flex-col md:flex-row">
        <section className="mt-12 gap-7 border-r-2 pr-7 border-[#E9E7E7] flex-grow">
          <div className="border-t-2 border-b-2 border-dashed border-[#6A6969] px-7 py-3 flex justify-between">
            <div className="font-hammersmith-one font-medium text-[#0D2612] text-2xl">
              Product
            </div>

            <div className="w-2/5 flex justify-between">
              <span className="font-hammersmith-one font-medium text-[#0D2612] text-2xl">
                Quantity
              </span>

              <span className="font-hammersmith-one font-medium text-[#0D2612] text-2xl">
                Price
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
                      {product.name}
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

        {cartProducts.length > 0 ? (
          <section className="mt-12 pl-7 md:ml-7">
            <div className="flex justify-between items-center">
              <h4 className="text-[#0D2612] font-hammersmith-one text-3xl font-medium border-b-2 border-dashed border-[#6A6969] pb-4">
                Cart Totals
              </h4>
            </div>

            <ul className="border-b-2 border-[#6A6969] border-dashed py-7 ">
              <li className="flex justify-between font-readex-pro font-normal text-lg text-[#190D26] ">
                Items in Cart{" "}
                <span className="font-semibold">{totalItems}</span>
              </li>

              <li className="py-5 flex justify-between font-readex-pro font-normal text-lg text-[#190D26]">
                Shipping (3-5 Business Days){" "}
                <span className="font-semibold">Free</span>
              </li>

              <li className="py-5 flex justify-between font-readex-pro font-normal text-lg text-[#190D26]">
                TAX (estimated for the United States (US)){" "}
                <span className="font-semibold">$0</span>
              </li>

              <li className="flex justify-between font-readex-pro font-normal text-lg text-[#190D26]">
                Subtotal{" "}
                <span className="font-semibold">${totalPrice.toFixed(2)}</span>
              </li>
            </ul>

            <div className="flex justify-between font-readex-pro font-semibold text-lg text-[#190D26] mt-7 mb-10">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <div>
              <button className="bg-[#0BA42D] hover:bg-[#0BB91D] text-white font-medium px-6 py-2 md:px-8 md:py-3 rounded-md text-base md:text-lg w-full mt-4">
                Proceed to Checkout
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
                Back to Shopping
              </span>
            </p>
          </section>
        ) : (
          <p className="mt-12 pl-7 md:ml-7 text-[#0D2612] font-hammersmith-one text-3xl font-medium">
            No Products in Cart :(
          </p>
        )}
      </div>
    </div>
  );
};

export default CartsPage;
