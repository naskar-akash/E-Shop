import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { MdOutlineLogin } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { FcShop } from "react-icons/fc";
import { CiShop } from "react-icons/ci";
import { logoutUser } from "./Services/UserServices";
import AlertMsg from "./Services/AlertMsg";

const Navbar = () => {
  const navigate = useNavigate();
  const [loginDropDown, setLoginDropDown] = useState(false);
  const [sellerDropDown, setSellerDropDown] = useState(false);
  const { serverMsg, status, showAlert } = AlertMsg(2);

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      showAlert(response, "success", "error");
      navigate("/")
    } catch (error) {
      showAlert(error.response || error, "success", "error");
    }
  };

  return (
    <div className="sticky top-0 shadow-md bg-white/90 mx-auto z-50 w-full">

      {/*Showing flash message*/}
      {serverMsg && (
        <div
          className={`fixed top-1/2 left-1/2 p-6 rounded-lg shadow-lg shadow-zinc-500 text-white transition-transform duration-300 ${
            status === "success" ? "bg-green-500" : "bg-red-500"
          }`}
          style={{ transform: "translate(-50%, -50%)" }}
        >
          {serverMsg}
        </div>
      )}

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
            onMouseEnter={() => setLoginDropDown(true)}
            onMouseLeave={() => setLoginDropDown(false)}
          >
            <li className="flex gap-2 py-3 cursor-pointer list-none">
              <MdOutlineLogin className="size-6" />
              <p className="text-lg px-0.5">Login</p>
            </li>
            {/* Dropdown menu */}
            {loginDropDown && (
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
                  to="/order"
                  className="block px-3 py-2 text-gray-700 hover:bg-blue-600 hover:text-white rounded-md"
                >
                  Orders
                </NavLink>
                <NavLink
                  onClick={handleLogout}
                  className="block px-3 py-2 text-gray-700 hover:bg-blue-600 hover:text-white rounded-md hover:cursor-pointer"
                >
                  Logout
                </NavLink>
              </div>
            )}
          </div>
          <NavLink to="Cart">
            <li className="flex gap-2 py-3">
              <FaCartShopping className="size-6" />
              <p className="text-lg px-0.5">Cart</p>
            </li>
          </NavLink>
          {/* Admin's section to create, remove, update or get created items */}
          <div className="relative"
            onMouseEnter={() => setSellerDropDown(true)}
            onMouseLeave={() => setSellerDropDown(false)}>
              <li className="flex gap-2 py-3 cursor-pointer list-none">
              <CiShop className="size-6" />
              <p className="text-lg px-0.5">Become seller</p>
            </li>
            {/*Dropdown menu*/}
            {sellerDropDown && (
              <div className="absolute top-12 left-0 bg-white shadow-md rounded-lg w-48 p-2 z-50">
                <NavLink to="admin" className="block px-3 py-2 text-gray-700 hover:bg-blue-600 hover:text-white rounded-md">View</NavLink>
                <NavLink to="/admin/create" className="block px-3 py-2 text-gray-700 hover:bg-blue-600 hover:text-white rounded-md">Create Products</NavLink>
              </div>
            )}
            </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
