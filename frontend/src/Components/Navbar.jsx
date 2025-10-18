import React from "react";
import { NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { MdOutlineLogin } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { FcShop } from "react-icons/fc";
import { CiShop } from "react-icons/ci";


const Navbar = () => {
  return (
    <div className="sticky top-0 shadow-md bg-white/90 mx-auto z-50 w-full">
      <nav className="flex justify-center gap-8 items-center py-3 px-6">
        {/*Logo section*/}
        <NavLink to="/" className="flex items-center gap-2">
          <FcShop className="size-7" />
          <div className="flex flex-col leading-tight">
            <p className="text-2xl text-indigo-900 font-bold italic">E-Store</p>
            <p className="text-xs italic text-yellow-300">Let's Shop ✨</p>
          </div>
        </NavLink>
        {/*Search section*/}
        <div className="flex w-[50%] items-center">
          <button className="bg-blue-100 px-3 py-2 rounded-l-xl">
            <CiSearch className="size-6" />
          </button>
          <input
            type="text"
            className="bg-blue-100 px-4 py-2 rounded-r-xl w-full outline-none"
            placeholder="Search for Brands, Products and More"
          />
        </div>
        {/*Login and Cart section*/}
        <div className="flex gap-8">
          <NavLink to="Login">
            <li className="flex gap-2 py-3">
              <MdOutlineLogin className="size-6" />
              <p className="text-lg px-0.5">Login</p>
            </li>
          </NavLink>
          <NavLink to="Cart">
            <li className="flex gap-2 py-3">
              <FaCartShopping className="size-6" />
              <p className="text-lg px-0.5">Cart</p>
            </li>
          </NavLink>
          <NavLink to="Cart">
            <li className="flex gap-2 py-3">
              <CiShop className="size-6" />
              <p className="text-lg px-0.5">Become seller</p>
            </li>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
