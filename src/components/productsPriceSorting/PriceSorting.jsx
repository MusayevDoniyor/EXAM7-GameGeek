import React from "react";
import { FaChevronDown } from "react-icons/fa6";

const PriceSorting = ({ sortOrder, toggleSortOrder }) => {
  return (
    <div className="flex justify-between px-16 py-7 bg-[#D5F8CF] my-10 text-[#0BA42D] items-center font-hammersmith-one font-normal text-xl">
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
    </div>
  );
};

export default PriceSorting;
