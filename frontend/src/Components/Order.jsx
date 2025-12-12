import React, { useState, useEffect } from "react";
import { viewOrder } from "./Services/UserServices";
import AlertMsg from "./Services/AlertMsg";
import {assets} from "../assets/assets";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const { serverMsg, status, showAlert } = AlertMsg(2);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await viewOrder();
        const ord = response?.data?.orders || [];
        console.log(ord);
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
        return <img src={assets.payCash} alt="Cash" className="w-6 h-5" />;
      case "card":
        return <img src={assets.payCard} alt="Card" className="w-6 h-5" />;
      case "UPI":
        return <img src={assets.payOnline} alt="Online" className="w-6 h-5" />;
      default:
        return '---';
    }
  }

  return (
    <div className="flex flex-col px-4 py-6 max-w-7xl mx-auto">
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
                className="w-full bg-white rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all flex flex-row gap-4"
              >
                {/* Product Image */}
                <div className="flex flex-col justify-evenly">
                <div className="w-[120px] h-[120px] bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden border border-gray-200">
                  <img
                    src={i.product.image}
                    alt={i.product.name}
                    className="object-contain w-full h-full p-3"
                  />
                </div>
                <button
                      onClick={() => console.log("remove")}
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

                    <div className="grid grid-cols-3 text-sm">
                      <div className="flex flex-row gap-3">
                        <span className="text-gray-500">Qty:</span>
                        <p className="font-semibold text-gray-800">
                          {i.quantity}
                        </p>
                      </div>

                      <div className="flex flex-row gap-3">
                        <span className="text-gray-500">Total Pay:</span>
                        <p className="font-semibold text-gray-800">
                          ₹{finalprice * i.quantity}
                        </p>
                      </div>

                      <div className="flex flex-row gap-3">
                        <span className="text-gray-500">Payment:</span>
                        <div className="font-semibold text-gray-800">
                         {payMode(i.paymentMode)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dates + Remove */}
                  <div className="flex justify-between items-center mt-3 text-sm px-4">
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
