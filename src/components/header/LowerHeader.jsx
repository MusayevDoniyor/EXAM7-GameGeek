import React from "react";
import { Link, NavLink } from "react-router-dom";
import GameGeek from "../../assets/GameGeek.svg";
import { FiSearch, FiUser } from "react-icons/fi";
import { BsCart2 } from "react-icons/bs";

const LowerHeader = ({ carts }) => {
  return (
    <div className="text-black bg-white bg-opacity-90 items-center px-4 md:px-16 py-3 md:py-7 flex flex-col md:flex-row justify-between font-inter border-b-2 border-[#0D2613]">
      <div className="mb-2 md:mb-0">
        <Link to="/">
          <img src={GameGeek} alt="Site main logo" />
        </Link>
      </div>

      <nav className="mb-2 md:mb-0">
        <ul className="flex flex-wrap gap-4 md:gap-9 items-center font-medium text-sm md:text-base">
          <li>
            <NavLink to="/">Products</NavLink>
          </li>
          <li className="cursor-pointer">Categories</li>
          <li className="cursor-pointer">Brands</li>
          <li className="cursor-pointer">What's new</li>
          <li className="cursor-pointer">Sales</li>
          <li className="cursor-pointer">Help</li>
          <li className="cursor-pointer">About</li>
        </ul>
      </nav>

      <div className="flex gap-4 md:gap-10 items-center">
        <FiSearch className="size-5 cursor-pointer" />
        <FiUser className="size-5 cursor-pointer" />
        <div className="relative">
          <NavLink to="/cart">
            {carts.length > 0 && (
              <span className="absolute bg-[#0D2613] text-white rounded-full text-center items-center py-[2px] px-[8px] text-xs md:text-sm bottom-4 left-3">
                {carts.length}
              </span>
            )}
            <BsCart2 className="size-5 cursor-pointer" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LowerHeader;
