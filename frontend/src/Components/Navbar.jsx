import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { MdOutlineLogin } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { FcShop } from "react-icons/fc";
import { CiShop } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { logoutUser } from "./Services/UserServices";
import AlertMsg from "./Services/AlertMsg";

const Navbar = () => {
  const navigate = useNavigate();
  const [loginDropDown, setLoginDropDown] = useState(false);
  const [sellerDropDown, setSellerDropDown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { serverMsg, status, showAlert } = AlertMsg(2);
  const [searchInput, setSearchInput] = useState("");

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      showAlert(response, "success", "error");
      navigate("/");
    } catch (error) {
      showAlert(error.response || error, "success", "error");
    }
  };

  const handleSearch = async (text) => {
    if (!text) return;
      navigate(`/search?q=${encodeURIComponent(text)}`)
  };

  const handleKeyDown = (e,text) => {
  if (e.key === "Enter") {
    handleSearch(text);
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

      <nav className="relative flex justify-evenly items-center py-3 px-4">
        {/*Logo section*/}
        <NavLink to="/" className="flex items-center gap-1">
          <FcShop className="size-5 lg:size-7" />
          <div className="flex flex-col leading-tight">
            <p className="text-lg lg:text-2xl text-indigo-900 font-bold italic">
              E-Store
            </p>
            <p className="text-xs italic text-yellow-300">Let's Shop ✨</p>
          </div>
        </NavLink>
        {/*Search section*/}
        <div className="flex w-[60%] lg:w-[45%] items-center">
          <button
            onClick={()=>handleSearch(searchInput)}
            className="bg-blue-100 p-2 rounded-l-xl hover:bg-blue-200"
          >
            <CiSearch className="size-6" />
          </button>
          <input
            type="text"
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e)=>handleKeyDown(e,searchInput)}
            className="bg-blue-100 pl-1 pr-3 py-2 rounded-r-xl w-full outline-none"
            placeholder="Search here"
          />
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden mx-4"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <AiOutlineClose className="size-6" />
          ) : (
            <GiHamburgerMenu className="size-6" />
          )}
        </button>
        {/*Login and Cart section*/}
        <div className="hidden lg:flex gap-6">
          <div
            className="relative"
            onMouseEnter={() => setLoginDropDown(true)}
            onMouseLeave={() => setLoginDropDown(false)}
          >
            <li className="flex gap-1 py-3 cursor-pointer list-none">
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
          <NavLink to="/cart">
            <li className="flex gap-1 py-3">
              <FaCartShopping className="size-6" />
              <p className="text-lg px-0.5">Cart</p>
            </li>
          </NavLink>
          {/* Admin's section to create, remove, update or get created items */}
          <div
            className="relative"
            onMouseEnter={() => setSellerDropDown(true)}
            onMouseLeave={() => setSellerDropDown(false)}
          >
            <li className="flex py-3 cursor-pointer list-none">
              <CiShop className="size-6" />
              <p className="text-lg px-0.5">Become seller</p>
            </li>
            {/*Dropdown menu*/}
            {sellerDropDown && (
              <div className="absolute top-12 left-0 bg-white shadow-md rounded-lg w-48 p-2 z-50">
                <NavLink
                  to="admin"
                  className="block px-3 py-2 text-gray-700 hover:bg-blue-600 hover:text-white rounded-md"
                >
                  View
                </NavLink>
                <NavLink
                  to="/admin/create"
                  className="block px-3 py-2 text-gray-700 hover:bg-blue-600 hover:text-white rounded-md"
                >
                  Create Products
                </NavLink>
              </div>
            )}
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileOpen && (
          <div className="lg:hidden absolute right-4 top-14 bg-white shadow-md rounded-lg w-50 z-40">
            <div className="flex flex-col gap-2 p-5">
              <div className="flex justify-between">
                <NavLink
                  to="/login/signup"
                  onClick={() => setMobileOpen(false)}
                  className="text-md"
                >
                  Signup
                </NavLink>
                <NavLink
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="text-md"
                >
                  Login
                </NavLink>
              </div>
              <NavLink
                to="/profile"
                onClick={() => setMobileOpen(false)}
                className="text-md"
              >
                Profile
              </NavLink>
              <NavLink
                to="/order"
                onClick={() => setMobileOpen(false)}
                className="text-md"
              >
                Orders
              </NavLink>
              <NavLink
                to="/cart"
                onClick={() => setMobileOpen(false)}
                className="text-md"
              >
                Cart
              </NavLink>
              <div className="border-y py-2">
                <p className="text-gray-500 text-sm">Become Seller</p>
                <div className="flex flex-col gap-2 mt-1">
                  <NavLink
                    to="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="text-md"
                  >
                    View
                  </NavLink>
                  <NavLink
                    to="/admin/create"
                    onClick={() => setMobileOpen(false)}
                    className="text-md"
                  >
                    Create Products
                  </NavLink>
                </div>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileOpen(false);
                }}
                className="text-md mt-2 text-red-500 font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
