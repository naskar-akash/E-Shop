import React, { useState, useEffect } from "react";
import { viewOrder, removeOrder } from "../Services/UserServices";
import AlertMsg from "../Services/AlertMsg";
import { assets } from "../../assets/assets";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const { serverMsg, status, showAlert } = AlertMsg(2);

  // Hook to render orders on load
  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await viewOrder();
        const ord = response?.data?.orders || [];
        setOrders(ord);
      } catch (error) {
        showAlert(error.response || error, "success", "error");
      }
    };
    getOrders();
  }, []);

  // Function to set payment mode svgs
  const payMode = (mode) => {
    switch (mode) {
      case "cash":
        return (
          <div className="flex gap-2 items-center">
            <img src={assets.payCash} alt="Cash" className="w-6 h-5" />
            <span className="font-semibold text-xs">Cash</span>
          </div>
        );
      case "card":
        return (
          <div className="flex gap-2 items-center">
            <img src={assets.payCard} alt="Cash" className="w-6 h-5" />
            <span className="font-semibold text-xs">Card</span>
          </div>
        );
      case "online":
        return (
          <div className="flex gap-2 items-center">
            <img src={assets.payOnline} alt="Cash" className="w-6 h-5" />
            <span className="font-semibold text-xs">Online</span>
          </div>
        );
      default:
        return "---";
    }
  };

  // Function to handle order removal
  const handleRemoveOrder = async (id) => {
    try {
      const response = await removeOrder(id);
      showAlert(response.data.message, "success", "error");
    } catch (error) {
      showAlert(error.response || error, "success", "error");
    }
  };

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
      <h1 className="w-full text-3xl font-bold text-center mb-6">
        Your Orders
      </h1>
      <div className="w-full min-h-screen my-4 flex flex-col gap-3">
        {Array.isArray(orders) && orders.length > 0 ? (
          orders.map((i, idx) => {
            const finalprice =
              i.product.price - (i.product.price * i.product.discount) / 100;
            return (
              <div
                key={idx}
                className="w-full bg-white rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all flex flex-col sm:flex-row gap-4"
              >
                {/* Product Image */}
                <div className="flex flex-col justify-between sm:items-start gap-4">
                  <div className="w-full sm:w-[120px] sm:h-[120px] bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden border border-gray-200">
                    <img
                      src={i.product.image}
                      alt={i.product.name}
                      className="object-contain w-2/5 sm:w-full h-full p-3"
                    />
                  </div>
                  <button
                    onClick={() => handleRemoveOrder(i._id)}
                    className="px-3 py-2 bg-rose-600 text-sm text-white font-medium rounded-lg hover:bg-rose-500 transition"
                  >
                    Remove Order
                  </button>
                </div>

                {/* Right Section */}
                <div className="flex flex-col justify-between w-full">
                  {/* Product Name + Price */}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 leading-tight">
                      {i.product.name}
                    </h2>

                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-gray-500 line-through">
                        ₹{i.product.price}
                      </span>

                      <span className="text-xs font-semibold bg-cyan-600 text-white px-2 py-1 rounded-full">
                        {i.product.discount}% OFF
                      </span>

                      <span className="text-xl font-bold text-gray-800">
                        ₹{finalprice}
                      </span>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-gray-50 mt-3 p-3 rounded-xl border border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                      Order Summary
                    </h3>

                    <div className="flex flex-col sm:flex-row sm:justify-between text-sm gap-2">
                      <div className="w-full sm:w-1/2 flex justify-between items-center">
                        <div className="flex flex-row gap-1">
                          <span className="text-gray-500">Qty:</span>
                          <p className="font-semibold text-gray-800">
                            {i.quantity}
                          </p>
                        </div>

                        <div className="flex flex-row justify-end gap-1">
                          <span className="text-gray-500">Total Pay:</span>
                          <p className="font-semibold text-gray-800">
                            ₹{i.totalAmount}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-center items-center">
                        <div className="flex flex-row gap-1">
                          <span className="text-gray-500">Payment:</span>
                          <div className="font-semibold text-gray-800">
                            {payMode(i.paymentMode)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="flex flex-col gap-3 sm:flex-row justify-between items-center mt-3 text-sm px-4">
                    <div>
                      <span className="text-gray-500">Placed On:</span>{" "}
                      <span className="font-semibold text-gray-700">
                        {i.orderDate}
                      </span>
                    </div>

                    <div>
                      <span className="text-gray-500">Delivery:</span>{" "}
                      <span className="font-semibold text-gray-700">
                        {i.deliveryDate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="w-full bg-white p-4 border border-gray-200 rounded-xl text-center text-gray-500">
            No Orders found
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
