import React, { useState, useEffect } from "react";
import { viewOrder } from "./Services/UserServices";

const Order = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const renderOrders = async () => {
      const response = await viewOrder();
      setOrders(response.data.orders)
    };
    renderOrders();
  }, []);

  return (
  <div className="max-w-6xl min-h-screen flex justify-center items-center">
    <div className="flex flex-col gap-2">
        <h2>Your Orders</h2>
        <div>
            {!orders ? (
                <div>No orders to diisplay</div>
            ) : (
                orders.map((i) => {
                    <div>{i}</div>
                })
            )}
        </div>
    </div>
  </div>
);
};

export default Order;
