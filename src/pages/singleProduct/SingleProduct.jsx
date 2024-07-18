import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import Spinner from "../../components/spinner/Spinner";
import star from "../../assets/star.svg";
import halfStar from "../../assets/halfStar.svg";
import emptyStar from "../../assets/emptyStar.svg";
import { FaMinus, FaPlus, FaRegHeart } from "react-icons/fa6";
import { BsCart2 } from "react-icons/bs";
import { PiTruck } from "react-icons/pi";
import { BiBox } from "react-icons/bi";

const SingleProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);

  const [selectedColor, setSelectedColor] = useState("");

  const navigate = useNavigate();

  const baseUrl = `${import.meta.env.VITE_BASE_URL}`;

  useEffect(() => {
    async function fetchProductById() {
      setError(null);
      try {
        const response = await api.get(`${baseUrl}/products/${productId}`);
        setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProductById();
  }, [productId]);

  const renderStars = (ratings_stars) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= ratings_stars) {
        stars.push(
          <i key={i} className="star">
            <img
              src={star}
              alt="star"
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
            />
          </i>
        );
      } else if (i === Math.ceil(ratings_stars) && ratings_stars % 1 !== 0) {
        stars.push(
          <i key={i}>
            <img
              src={halfStar}
              alt="HalfStar"
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
            />
          </i>
        );
      } else {
        stars.push(
          <i key={i}>
            <img
              src={emptyStar}
              alt="Empty Star"
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
            />
          </i>
        );
      }
    }
    return stars;
  };

  return (
    <div className="mt-20 px-16 py-7">
      {loading ? (
        <div>
          <Spinner />
        </div>
      ) : error ? (
        <div className="font-bold text-red-600 py-7 bg-red-300 font-inter flex justify-center gap-10 items-center">
          <p className=" text-xl">{error}</p>

          <button
            className="border rounded-lg py-2 px-7"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </button>
        </div>
      ) : product ? (
        <section className="flex flex-col gap-y-10">
          <div className="font-readex-pro font-400 text-xl text-[#454444] ">
            <span
              className="cursor-pointer pr-2"
              onClick={() => {
                navigate(-1);
              }}
            >
              Products
            </span>{" "}
            / <span className="px-2">{product.brand_name}</span> /{" "}
            <b className="pl-2 cursor-pointer">{product.name}</b>
          </div>

          <div className="flex gap-7">
            <div className="flex flex-col gap-y-28">
              <div className="border-2 rounded-lg inline-block w-[675px] h-[675px] items-center">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-[650px] h-[650px]"
                />
              </div>

              <div className="flex gap-8">
                {Array.from({ length: 5 }).map((_, index) => (
                  <img
                    key={index}
                    src={product.image_url}
                    alt={`product image ${index + 1}`}
                    className="size-28 border-2 rounded-lg cursor-pointer"
                  />
                ))}
              </div>
            </div>

            <div className="px-3 pt-2">
              <div className="border-b-2 border-dashed border-[#6A6969] pb-5">
                <h2 className="font-hammersmith-one font-normal text-4xl">
                  {product.name}
                </h2>

                <p className="font-readex-pro font-medium text-[#190D26] text-lg pt-3">
                  {product.description}
                </p>

                <div className="flex gap-2 mt-3 items-center">
                  {renderStars(product.ratings_stars)}

                  <span className="font-inter font-normal text-[#454444] text-base ">
                    ({product.rating_counts})
                  </span>
                </div>
              </div>

              <div className="border-b-2 border-dashed border-[#6A6969] py-5 items-center">
                <p className="flex flex-col gap-y-2 font-readex-pro">
                  <span className="font-bold text-4xl text-[#190D26]">
                    ${product.price} or {Math.round(product.price / 6)}/month
                  </span>

                  <span className="font-medium text-lg text-[#0D2612]">
                    Suggested payments with 6 month special financing
                  </span>
                </p>
              </div>

              <div className="border-b-2 border-dashed border-[#6A6969] py-5">
                <h4 className="font-readex-pro font-semibold text-2xl text-[#0E020C] pb-7 ">
                  Choose a color
                </h4>

                <div>
                  <ul className="flex gap-5">
                    {product.color_options.map((color, index) => (
                      <li key={index}>
                        <input
                          type="radio"
                          name="colors"
                          id={color}
                          value={color}
                          className="appearance-none size-10 border border-black rounded-full cursor-pointer checked:border-2 checked:scale-125"
                          style={{
                            backgroundColor: color,
                          }}
                          checked={color === selectedColor}
                          onChange={(e) => {
                            setSelectedColor(e.target.value);
                          }}
                        />
                        <label htmlFor="colors"></label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex gap-10 py-5 mt-1">
                <div className="flex gap-5 py-3 px-9 bg-[#F5F5F5] border-[3px] border-[#0BA42D] rounded-3xl items-center">
                  <span
                    onClick={() => {
                      setCount(count - 1);
                    }}
                  >
                    <FaMinus />
                  </span>

                  <span className="font-inter font-semibold text-2xl tetx-[#0D2612] ">
                    {count}
                  </span>

                  <span
                    onClick={() => {
                      setCount(count + 1);
                    }}
                  >
                    <FaPlus />
                  </span>
                </div>

                <div className="w-40">
                  <p className="font-inter font-semibold text-lg text-[#454444]">
                    Only <span className="text-[#0BA42D]">16 items</span> left!
                    Don't miss it
                  </p>
                </div>
              </div>

              <div className="w-full flex justify-between items-center mt-12">
                <button
                  className="w-4/5 bg-[#0BA42D] hover:bg-[#0BB91D] text-white font-bold
                 px-10 py-3 rounded-lg text-xl flex justify-center items-center gap-4 font-inter"
                >
                  <BsCart2 />
                  Add to Cart
                </button>

                <div
                  className={`border-2 rounded-lg border-[#0D2612] p-3 ${
                    liked
                      ? "bg-red-600 text-white border-none"
                      : "bg-transparent text-black"
                  } `}
                >
                  <FaRegHeart
                    className={`cursor-pointer size-6 `}
                    onClick={() => {
                      setLiked(!liked);
                    }}
                  />
                </div>
              </div>

              <div className="border-[3px] border-[#6A6969] border-dashed mt-12 rounded-lg py-3 px-5">
                <div className="flex items-center gap-6 py-3">
                  <span>
                    <PiTruck className="text-[#0BA42D] size-7" />
                  </span>

                  <span className="flex flex-col text-[#0D2612]">
                    <span className="font-readex-pro font-semibold text-lg">
                      Free Delivery
                    </span>

                    <span className="border-b-2 border-[#0D2612] font-inter font-medium text-base pt-1 cursor-pointer">
                      Enter your Postal Code for Delivery Availability
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-6 border-t-2 border-dashed border-[#6A6969] py-3">
                  <span>
                    <BiBox className="text-[#0BA42D] size-7" />
                  </span>

                  <span className="flex flex-col text-[#0D2612]">
                    <span className="font-readex-pro font-semibold text-lg">
                      Return Delivery
                    </span>

                    <span className="border-b-2 border-[#0D2612] font-inter font-medium text-base pt-1 cursor-pointer">
                      Free delivery 30 Days return
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default SingleProduct;
