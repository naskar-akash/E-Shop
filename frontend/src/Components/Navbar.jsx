import React from "react";
import { NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { MdOutlineLogin } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { FcShop } from "react-icons/fc";

const Navbar = () => {
  return (
    <div className="sticky top-0 flex px-4 py-2 bg-amber-50 min-w-[100vh] h-[15%]">
      <nav className="flex justify-center align-middle list-none gap-5 w-full">
        <NavLink to="/">
          <li className="flex gap-2 px-4">
            <FcShop className="size-7 my-3"/>
            <div className="flex flex-col gap-0"><p className="text-xl font-bold text-blue-500">E-Store</p>
            <p className="text-sm font-medium text-yellow-500">$Let's Shop</p></div>
          </li>
        </NavLink>
        <div className="flex py-2 w-[50%]">
          <button className="bg-blue-100 px-3 py-1 rounded-l-xl">
            <CiSearch className="size-6" />
          </button>
          <input
            type="text"
            className="bg-blue-50 px-4 py-2 rounded-r-xl min-w-[90%]"
            placeholder="Search for Brands, Products and More"
          />
        </div>
        <div className="flex gap-10">
          <NavLink to="Login">
            <li className="flex gap-2 py-3">
              <MdOutlineLogin className="size-6 my-0.5" />
              <p className="text-lg px-2">Login</p>
            </li>
          </NavLink>
          <NavLink to="Cart">
            <li className="flex gap-2 py-3">
              <FaCartShopping className="size-6 my-0.5" />
              <p className="text-lg px-2">Cart</p>
            </li>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
