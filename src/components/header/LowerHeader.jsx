import React from "react";
import { Link, NavLink } from "react-router-dom";
import GameGeek from "../../assets/GameGeek.svg";
import { FiSearch, FiUser } from "react-icons/fi";
import { BsCart2 } from "react-icons/bs";

const LowerHeader = () => {
  return (
    <div className="text-black bg-transparent items-center px-16 py-7 flex justify-between font-inter border-b-2 border-[#0D2613]">
      <div className="items-center">
        <Link to="/">
          <img src={GameGeek} alt="Site main logo" />
        </Link>
      </div>

      <nav className="items-center">
        <ul className="flex gap-9 items-center font-medium">
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

      <div className="items-center">
        <ul className="flex gap-10 items-center ">
          <li className="cursor-pointer ">
            <FiSearch className="size-5" />
          </li>

          <li className="cursor-pointer">
            <FiUser className="size-5" />
          </li>

          <li>
            <NavLink to="/cart">
              <BsCart2 className="size-5" />
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LowerHeader;
