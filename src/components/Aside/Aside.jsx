import React, { useContext } from "react";
import { FaCaretDown } from "react-icons/fa6";
import checked from "../../assets/checked.svg";
import { LanguageContext } from "../LanguageProvider";

const Aside = ({
  toggleAccordion,
  brands,
  setBrandsOpen,
  brandsOpen,
  setSelectedBrand,
  selectedBrand,
  colors,
  setColorsOpen,
  colorsOpen,
  setSelectedColor,
  selectedColor,
}) => {
  const { language } = useContext(LanguageContext);

  return (
    <aside className="bg-gray-50 p-6 rounded-lg">
      <div
        className="
        border-t-2 border-b-2 border-[#454444CC] border-dashed py-4"
      >
        <div
          className="flex justify-between items-center cursor-pointer  "
          onClick={() => {
            toggleAccordion(brandsOpen, setBrandsOpen);
          }}
        >
          {language === "en" && (
            <h3 className="font-hammersmith-one font-bold text-[#190D26] text-base">
              BRAND
            </h3>
          )}

          {language === "es" && (
            <h3 className="font-hammersmith-one font-bold text-[#190D26] text-base">
              MARCA
            </h3>
          )}

          {language === "uz" && (
            <h3 className="font-hammersmith-one font-bold text-[#190D26] text-base">
              BREND
            </h3>
          )}
          <FaCaretDown
            className={` transition-transform duration-300 ease-in-out text-[#0BA42D] size-5 ${
              brandsOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>

        {brandsOpen && (
          <>
            <ul className="flex flex-col gap-5 my-7">
              {brands.map((brand, index) => (
                <li key={index} className="flex gap-4 items-center ">
                  <input
                    type="radio"
                    value={brand}
                    name="brands"
                    id={brand}
                    className="appearance-none w-5 h-5 border-2 border-[#0BA42D] rounded-md checked:bg-[#0BA42D]  cursor-pointer"
                    style={{
                      backgroundImage: `url(${checked})`,
                      backgroundSize: "16px",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    checked={brand === selectedBrand}
                    onChange={(e) => {
                      setSelectedBrand(e.target.value);
                    }}
                  />
                  <label
                    htmlFor={brand}
                    className="text-[#190D26] font-readex-pro font-light text-lg cursor-pointer "
                  >
                    {brand}
                  </label>
                </li>
              ))}
            </ul>

            <button
              className="py-3 px-10 bg-[#D5F8CF] rounded-lg text-lg font-medium text-[#190D26]"
              onClick={() => {
                setSelectedBrand("");
              }}
            >
              {language === "en" && "Clear"}
              {language === "es" && "Claro"}
              {language === "uz" && "Tozalash"}
            </button>
          </>
        )}
      </div>

      <div className="border-b-2 border-[#454444CC] border-dashed py-4">
        <div
          className="flex justify-between items-center cursor-pointer  "
          onClick={() => {
            toggleAccordion(colorsOpen, setColorsOpen);
          }}
        >
          {language === "en" && (
            <h3 className="font-hammersmith-one font-bold text-[#190D26] text-base">
              COLORS
            </h3>
          )}
          {language === "es" && (
            <h3 className="font-hammersmith-one font-bold text-[#190D26] text-base">
              COLORES
            </h3>
          )}
          {language === "uz" && (
            <h3 className="font-hammersmith-one font-bold text-[#190D26] text-base">
              RANGLAR
            </h3>
          )}
          <FaCaretDown
            className={` transition-transform duration-300 ease-in-out text-[#0BA42D] size-5 ${
              colorsOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>

        {colorsOpen && (
          <>
            <ul className="flex flex-wrap gap-5 my-7">
              {colors.map((color, index) => (
                <li key={index} className="flex items-center ">
                  <input
                    type="radio"
                    value={color}
                    name="colors"
                    id={color}
                    className="appearance-none w-6 h-6 border border-black rounded-full cursor-pointer checked:border-2 checked:scale-125"
                    style={{
                      backgroundColor: color,
                    }}
                    checked={color === selectedColor}
                    onChange={(e) => {
                      setSelectedColor(e.target.value);
                    }}
                  />

                  <label htmlFor={color}></label>
                </li>
              ))}
            </ul>

            <button
              className="py-3 px-10 bg-[#D5F8CF] rounded-lg text-lg font-medium text-[#190D26]"
              onClick={() => {
                setSelectedColor("");
              }}
            >
              {language === "en" && "Clear"}
              {language === "es" && "Claro"}
              {language === "uz" && "Tozalash"}
            </button>
          </>
        )}
      </div>
    </aside>
  );
};

export default Aside;
