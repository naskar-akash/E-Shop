import React, { useState, useEffect } from "react";
import AlertMsg from "../Components/Services/AlertMsg";
import { getCartItems } from "./Services/UserServices";

const Cart = () => {
  const { serverMsg, status, showAlert } = AlertMsg(2);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getCartItems();
        setItems(response.data.cart);
      } catch (error) {
        showAlert(error.response || error, "success", "error");
      }
    };
    fetchCart();
  }, []);

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
      <div className="w-full mt-2 bg-white shadow-md rounded-2xl p-4 border border-gray-200">
        <div className="flex flex-row gap-1">
          <p className="text-lg text-gray-600 font-semibold">
            Delivered to: Akash Naskar, Pin - 700084
          </p>
          <p className="text-md">
            , Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam,
            in.
          </p>
        </div>
        <button className="mt-4 px-3 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition text-sm">
          Change Address
        </button>
      </div>
      {/* Cards */}
      <div className="w-full min-h-screen mt-4 flex flex-col gap-3">
        {Array.isArray(items) && items.length > 0 ? ( items.map((item) => (
          <div key={item._id} className="w-full min-h-[200px] bg-white shadow-xl rounded-2xl p-4 border border-gray-200 flex flex-row gap-4 hover:shadow-2xl transition-all">
            {/* Product Image */}
            <div className="w-[20%] flex items-center justify-center bg-gray-100 rounded-xl overflow-hidden">
              <img
                className="object-contain w-full h-full p-2"
                src={item.image}
                alt=""
              />
            </div>

            <div className="w-[78%] flex flex-col justify-between gap-1 px-4 py-2">
              {/* Name and price */}
              <div className="mb-2">
                <h3 className="text-lg font-semibold truncate">{item.name}</h3>
                <p className="text-base text-gray-700 mt-1">₹ {item.price}</p>
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
                      // onClick={() => updateQty(item.id, -1)}
                      className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 transition"
                    >
                      −
                    </button>
                    <div className="px-3 py-1 text-sm font-medium">1</div>
                    <button
                      // onClick={() => updateQty(item.id, +1)}
                      className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 transition"
                    >
                      +
                    </button>
                  </div>
                </div>
                {/* Total priice */}
                <div className="text-right">
                  <p className="text-md text-gray-500">Total</p>
                  <p className="text-lg font-bold">₹ 2000</p>
                </div>
              </div>
              {/* button */}
              <div className="w-full flex justify-content-center items-center gap-2">
                <button
                  // onClick={() => removeItem(item.id)}
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
        ))):
        (
          <div className="w-full bg-white p-4 border border-gray-200 rounded-xl text-center text-gray-500">
            Your cart is empty.
          </div>
        ) }
      </div>
    </div>
  );
};

export default Cart;
