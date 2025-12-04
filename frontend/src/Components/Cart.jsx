import React, { useState, useEffect } from "react";
import AlertMsg from "../Components/Services/AlertMsg";
import {
  getCartItems,
  addToCart,
  removeCartItem,
  getUserProfile,
} from "./Services/UserServices";

const Cart = () => {
  const { serverMsg, status, showAlert } = AlertMsg(2);
  const [products, setProducts] = useState([]);
  const [userProfile, setUserProfile] = useState({
    username: "",
    address: "",
    pincode: "",
  });

  // Function to set user address
  const handleUserAddress = () => {};

  // Hook to get user address
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await getUserProfile();
        setUserProfile({
          username: response.data.name,
          address: response.data.address,
          pincode: response.data.pincode,
        });
      } catch (error) {
        showAlert(error.response || response, "success", "error");
      }
    };
    getUser();
  }, []);

  // Hook to render all carted items
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getCartItems();
        const prod = response.data.cart || [];
        setProducts(prod);
      } catch (error) {
        showAlert(error.response || error, "success", "error");
      }
    };
    fetchCart();
  }, []);

  // Function to update the quantity of products
  const updateQty = async (id, val) => {
    console.log(id, val);
    try {
      const response = await addToCart(id, val);
      showAlert(response.data.message, "success", "error");
    } catch (error) {
      showAlert(error.response || error, "success", "error");
    }
  };

  // Function to handle remove cart products
  const handleRemoveCartItems = async (id) => {
    try {
      const response = await removeCartItem(id);
      showAlert(response, "success", "error");
    } catch (error) {
      showAlert(error.response || error, "success", "error");
    }
  };

  return (
    <>
      <div className="flex flex-col px-4 py-6 max-w-7xl mx-auto">
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
        <h2 className="w-full text-3xl font-bold text-center mb-4">My Cart</h2>
        {/* Address */}
        <div className="w-full flex justify-between items-center mt-2 bg-white shadow-md rounded-2xl p-4 border border-gray-200">
          <div className="flex flex-row gap-1">
            <p className="text-lg text-gray-600 font-semibold">
              Delivered to: {userProfile.username}, Pin - {userProfile.pincode}
            </p>
            <p className="text-md font-medium text-stone-500">
              , {userProfile.address}
            </p>
          </div>
          <button
            onClick={() => handleUserAddress()}
            className="px-3 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition text-sm"
          >
            Change Address
          </button>
        </div>
        {/* Cards */}
        <div className="w-full min-h-screen my-4 flex flex-col gap-3">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((i, idx) => {
              const finalprice =
                i.product.price - (i.product.price * i.product.discount) / 100;
              return (
                <div
                  key={idx}
                  className="w-full h-[250px] bg-white shadow-xl rounded-2xl p-4 border border-gray-200 flex flex-row gap-4 hover:shadow-2xl transition-all"
                >
                  {/* Product Image */}
                  <div className="w-[20%] flex items-center justify-center bg-gray-100 rounded-xl overflow-hidden">
                    <img
                      className="object-contain w-full h-full p-2"
                      src={i.image}
                      alt={i.product.name}
                    />
                  </div>

                  <div className="w-[78%] flex flex-col justify-between gap-1 px-4 py-2">
                    {/* Name and price */}
                    <div className="mb-2">
                      <h3 className="text-lg font-semibold truncate">
                        {i.product.name}
                      </h3>
                      <div className="flex items-center gap-3 mt-2">
                        <p className="text-sm text-gray-700 mt-1 line-through">
                          ₹ {i.product.price}
                        </p>
                        <p className="text-xl text-gray-800 font-semibold">
                          ₹ {finalprice}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      {/* Quantity */}
                      <div className="flex items-center gap-2">
                        <span className="text-md font-semibold text-gray-700">
                          Quantity
                        </span>

                        {/* Quantity stepper */}
                        <div className="inline-flex items-center bg-gray-100 rounded-lg border border-gray-200 overflow-hidden">
                          <button
                            onClick={() => updateQty(i.product._id, -1)}
                            className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 transition"
                          >
                            −
                          </button>
                          <div className="px-3 py-1 text-sm font-medium">
                            {i.quantity}
                          </div>
                          <button
                            onClick={() => updateQty(i.product._id, +1)}
                            className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 transition"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      {/* Total price */}
                      <div className="text-right">
                        <p className="text-md text-gray-500">Total</p>
                        <p className="text-lg font-bold">
                          ₹ {finalprice * i.quantity}
                        </p>
                      </div>
                    </div>
                    {/* button */}
                    <div className="w-full flex justify-content-center items-center gap-2">
                      <button
                        onClick={() => handleRemoveCartItems(i._id)}
                        className="w-1/2 py-2 bg-red-500 text-white rounded-lg text-sm font-medium shadow-sm hover:bg-red-600 transition"
                      >
                        Remove
                      </button>
                      <button
                        // onClick={() => buyNow(item)}
                        className="w-1/2 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium shadow-sm hover:bg-blue-700 transition"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="w-full bg-white p-4 border border-gray-200 rounded-xl text-center text-gray-500">
              Your cart is empty.
            </div>
          )}
        </div>
      </div>
      {/* display total */}
      <div className="sticky bottom-0 left-0  w-full flex justify-between px-6 py-4 bg-gray-700 mt-4">
        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg text-sm font-medium shadow-sm hover:bg-blue-700 transition">
          Buy Now
        </button>
        <div className="flex justify-center items-center gap-8">
          <p className="text-2xl font-bold text-stone-50">Total:</p>
          <p className="text-2xl font-bold text-stone-100">₹ 12000</p>
        </div>
      </div>
    </>
  );
};

export default Cart;
