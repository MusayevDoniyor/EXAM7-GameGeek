import { Link } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import { useContext } from "react";
import { LanguageContext } from "../LanguageProvider";

const Card = ({ product, setCarts, setProducts, carts, products }) => {
  const { language } = useContext(LanguageContext);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-colors hover:bg-[#F4F4F4]">
      <div>
        <img
          src={product.image_url}
          alt={product.product_name}
          className="w-full h-48 md:h-72 object-cover"
        />
      </div>

      <div className="p-4 mt-3">
        <h4 className="text-lg md:text-xl font-semibold font-hammersmith-one text-[#190D26] hover:underline transition">
          <Link to={`/${product.id}`} className="inline-block">
            {product.name}
          </Link>
        </h4>

        <p className="text-[#190D26] mb-4 text-lg font-readex-pro font-light max-h-24 h-24 overflow-hidden mt-3">
          {product.description}
        </p>

        <div className="flex gap-3 mb-4">
          {product.color_options.map((color, index) => (
            <div
              key={index}
              style={{
                background: color,
              }}
              className="w-5 h-5 md:w-7 md:h-7 rounded-full mr-2 cursor-pointer outline-none outline border-2 border-black checked:ring-2 checked:ring-gray-800"
            />
          ))}
        </div>

        <strong className="text-black font-bold text-[18px] md:text-[20px] font-readex-pro">
          ${product.price}
        </strong>

        <div className="py-3">
          <button
            onClick={() => {
              setCarts([...carts, product.id]);
              setProducts([...products, product]);
            }}
            className="bg-[#0BA42D] hover:bg-[#0BB91D] text-white font-medium px-6 py-2 md:px-8 md:py-3 rounded-md text-base md:text-lg flex gap-3 items-center"
          >
            <BsCart2 className="size-5 font-bold" />
            {language === "en" && "Add to Cart"}
            {language === "es" && "Añadir al carrito"}
            {language === "uz" && "Savatchaga qo'shish"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
