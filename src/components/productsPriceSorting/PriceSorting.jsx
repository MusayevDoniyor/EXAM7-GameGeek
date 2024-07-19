import React, { useContext } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { LanguageContext } from "../LanguageProvider";

const PriceSorting = ({ sortOrder, toggleSortOrder }) => {
  const { language } = useContext(LanguageContext);

  return (
    <div className="flex justify-between px-16 py-7 bg-[#D5F8CF] mt-10 text-[#0BA42D] items-center font-hammersmith-one font-normal text-xl">
      {language === "en" && (
        <>
          <div>Filter By:</div>

          <div className="items-center">
            <span
              className="flex items-center gap-3 cursor-pointer"
              onClick={toggleSortOrder}
            >
              <FaChevronDown
                className={`transition-transform duration-300 ease-in-out ${
                  sortOrder == "asc" ? "rotate-180" : "rotate-0"
                }`}
              />
              Sort By Price
            </span>
          </div>
        </>
      )}

      {language === "es" && (
        <>
          <div>Filtrado por:</div>

          <div className="items-center">
            <span
              className="flex items-center gap-3 cursor-pointer"
              onClick={toggleSortOrder}
            >
              <FaChevronDown
                className={`transition-transform duration-300 ease-in-out ${
                  sortOrder == "asc" ? "rotate-180" : "rotate-0"
                }`}
              />
              Ordenar por precio
            </span>
          </div>
        </>
      )}

      {language === "uz" && (
        <>
          <div>Filtr:</div>

          <div className="items-center">
            <span
              className="flex items-center gap-3 cursor-pointer"
              onClick={toggleSortOrder}
            >
              <FaChevronDown
                className={`transition-transform duration-300 ease-in-out ${
                  sortOrder == "asc" ? "rotate-180" : "rotate-0"
                }`}
              />
              Narx bo'yicha saralash
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default PriceSorting;
