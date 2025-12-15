import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AlertMsg from "../Components/Services/AlertMsg";
import {
  getCartItems,
  addToCart,
  removeCartItem,
  getUserProfile,
  setUserAddress,
} from "./Services/UserServices";
import {useForm} from "react-hook-form";

const Cart = () => {
  const navigate = useNavigate();
  const { serverMsg, status, showAlert } = AlertMsg(2);
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    username: "",
    address: "",
    pincode: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Submitting the form
  const onSubmit = async (data) => {
    try {
      const response = await setUserAddress(data);
      setOpen(false)
      showAlert(response, "success", "error");
    } catch (error) {
      showAlert(error.response||error, "success", "error");
    }
  };

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

  // Function to place order
  const buyNow = (i) => {
    navigate(`/payment/${i.product._id}?qty=${i.quantity}`);
  }

  return (
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
            onClick={() => setOpen(!open)}
            className="px-3 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition text-sm"
          >
            Change Address
          </button>
        </div>
        {/* open a form to set up address */}
        {open && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-xl w-[90%] sm:w-[400px]">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Update Address
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Address */}
                <div>
                  <label className="text-sm text-gray-700">Address</label>
                  <input
                    type="text"
                    {...register("address", {
                      required: "Address is required",
                    })}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                {/* Pincode */}
                <div>
                  <label className="text-sm text-gray-700">Pincode</label>
                  <input
                    type="text"
                    {...register("pincode", {
                      required: "Pincode is required", minLength: {value: 6, message: "set correct pincode"}
                    })}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.pincode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.pincode.message}
                    </p>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit" 
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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
                      <div className="flex justify-items-start items-center gap-5 mt-2">
                        <span className="text-sm text-gray-700 mt-1 line-through">
                          ₹ {i.product.price}
                        </span>
                        <span className="text-md font-medium text-gray-100 bg-cyan-600 rounded-full px-2 py-1">
                          {i.product.discount}% Off
                        </span>
                        <span className="text-xl text-gray-700 text-shadow-md font-bold">
                          ₹ {finalprice}
                        </span>
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
                      <div className="flex flex-col justify-end text-right">
                        <span className="text-md font-medium text-gray-500">
                          Total
                        </span>
                        <span className="text-xl font-bold text-gray-600 text-shadow-md">
                          ₹ {finalprice * i.quantity}
                        </span>
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
                        onClick={() => buyNow(i)}
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
  );
};

export default Cart;
