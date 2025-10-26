import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { MdOutlineLogin } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { FcShop } from "react-icons/fc";
import { CiShop } from "react-icons/ci";
import { logoutUser } from "./Services/UserServices";

const Navbar = () => {
  const [isDropDown, setIsDropDown] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

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
          <div
            className="relative"
            onMouseEnter={() => setIsDropDown(true)}
            onMouseLeave={() => setIsDropDown(false)}
          >
            <li className="flex gap-2 py-3 cursor-pointer list-none">
              <MdOutlineLogin className="size-6" />
              <p className="text-lg px-0.5">Login</p>
            </li>
            {/* Dropdown menu */}
            {isDropDown && (
              <div className="absolute top-12 left-0 bg-white shadow-md rounded-lg w-48 p-2 z-50">
                <div className="w-full flex flex-row justify-between">
                  <NavLink
                    to="/login/signup"
                    className="block px-3 py-2 text-gray-700 hover:bg-blue-600 hover:text-white rounded-md"
                  >
                    Signup
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="block px-3 py-2 text-gray-700 hover:bg-blue-600 hover:text-white rounded-md"
                  >
                    Login
                  </NavLink>
                </div>
                <NavLink
                  to="/profile"
                  className="block px-3 py-2 text-gray-700 hover:bg-blue-600 hover:text-white rounded-md"
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/orders"
                  className="block px-3 py-2 text-gray-700 hover:bg-blue-600 hover:text-white rounded-md"
                >
                  Orders
                </NavLink>
                <NavLink
                  to="/cart"
                  className="block px-3 py-2 text-gray-700 hover:bg-blue-600 hover:text-white rounded-md"
                >
                  Wishlist
                </NavLink>
                <p
                  onClick={handleLogout}
                  className="block px-3 py-2 text-gray-700 hover:bg-blue-600 hover:text-white rounded-md hover:cursor-pointer"
                >
                  Logout
                </p>
              </div>
            )}
          </div>
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
