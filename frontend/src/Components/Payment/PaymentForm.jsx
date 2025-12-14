import React, { useState, useEffect } from "react";
import { useNavigate,useParams, useSearchParams } from "react-router-dom";
import { set, useForm } from "react-hook-form";
import { assets } from "../../assets/assets";
import { productById } from "../Services/ProductServices";
import { getUserProfile, placeOrder } from "../Services/UserServices";

const PaymentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [userProfile, setUserProfile] = useState({
    username: "",
    address: "",
    pincode: "",
  });
  const qty = Number(searchParams.get("qty"));
  const [paymentMode, setPaymentMode] = useState("cash");
  const [product, setProduct] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Hook to render product details
  useEffect(() => {
    const fetchProductDetails = async (id, qty) => {
      const response = await productById(id);
      setProduct(response.data);
    };
    fetchProductDetails(id, qty);
  }, []);

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

  // Calculate total price
  const totalPrice =
    (product.price - product.price * (product.discount / 100)) * qty;
  // Delivery charge
  const deliveryCharge =
    totalPrice >= 500
      ? 0
      : totalPrice >= 300 && totalPrice < 500
      ? totalPrice * 0.05
      : 15;

      // Function to place order
  const onSubmit = async (data) => {
    const finalData = {
      paymentMode,
      ...data,
    };
    try {
      const dataToSend = {
        id: id,
        quantity: qty,
        totalAmount: totalPrice + deliveryCharge + 25,
        paymentMode: finalData.paymentMode,
        addDay: 7,
      };
      const response = await placeOrder(dataToSend);
      alert(`${response.data.message}`);
      navigate("/cart")
    } catch (error) {
      alert("Order placement failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      {/* PAGE HEADING */}
      <div className="max-w-5xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 text-shadow-md">
          Payment
        </h1>
      </div>
      {/* Main Card */}
      <div className="flex items-center justify-center">
        <div className="max-w-5xl p-4 w-full bg-white rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">
          {/* LEFT: ORDER SUMMARY */}
          <div className="p-6 border-r">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-contain"
                />
              </div>
              <div className="flex flex-col justify-start">
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-gray-500">Qty: {qty}</p>
              </div>
            </div>

            <div className="border-t pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span>₹{deliveryCharge}</span>
              </div>
              <div className="flex justify-between">
                <span>Platform fee</span>
                <span>₹25</span>
              </div>
              <div className="flex justify-between font-semibold text-base">
                <span>Total</span>
                <span>₹{totalPrice + deliveryCharge + 25}</span>
              </div>
            </div>
          </div>

          {/* RIGHT: PAYMENT */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            <h2 className="text-xl font-semibold">Payment Method</h2>

            {/* PAYMENT OPTIONS */}
            <div className="space-y-3">
              <label className="flex items-center gap-3 border rounded-xl p-3 cursor-pointer">
                <input
                  type="radio"
                  value="cash"
                  checked={paymentMode === "cash"}
                  onChange={(e) => setPaymentMode(e.target.value)}
                />
                <img src={assets.payCash} className="w-6 h-6" />
                <span>Cash on Delivery</span>
              </label>

              <label className="flex items-center gap-3 border rounded-xl p-3 cursor-pointer">
                <input
                  type="radio"
                  value="card"
                  checked={paymentMode === "card"}
                  onChange={(e) => setPaymentMode(e.target.value)}
                />
                <img src={assets.payCard} className="w-6 h-6" />
                <span>Credit / Debit Card</span>
              </label>

              <label className="flex items-center gap-3 border rounded-xl p-3 cursor-pointer">
                <input
                  type="radio"
                  value="online"
                  checked={paymentMode === "online"}
                  onChange={(e) => setPaymentMode(e.target.value)}
                />
                <img src={assets.payOnline} className="w-6 h-6" />
                <span>UPI / Net Banking</span>
              </label>
            </div>

            {/* CONDITIONAL FORMS */}

            {/* CASH */}
            {paymentMode === "cash" && (
              <div className="flex flex-col justify-start">
                <p className="text-lg text-gray-600 font-semibold">
                  Delivered to: {userProfile.username}
                </p>
                <p className="text-md font-medium text-stone-500">
                  {userProfile.address}, Pin - {userProfile.pincode}
                </p>
              </div>
            )}

            {/* CARD */}
            {paymentMode === "card" && (
              <div className="space-y-3">
                <input
                  {...register("cardNumber", {
                    required: "Card number required",
                    minLength: {
                      value: 16,
                      message: "Card number must be 16 digits",
                    },
                  })}
                  placeholder="Card Number"
                  className="w-full border rounded-lg p-2"
                />
                {errors.cardNumber && (
                  <p className="text-red-500 text-xs">
                    {errors.cardNumber.message}
                  </p>
                )}
                <div className="flex gap-3">
                  <input
                    {...register("expiry", { required: true })}
                    placeholder="Expiry mm/yy"
                    className="w-1/2 border rounded-lg p-2"
                  />
                  <div className="flex flex-col">
                    <input
                      {...register("cvv", {
                        required: true,
                        minLength: {
                          value: 3,
                          message: "CVV must be 3 digits",
                        },
                        maxLength: {
                          value: 3,
                          message: "CVV must be 3 digits",
                        },
                      })}
                      placeholder="CVV"
                      className="w-1/2 border rounded-lg p-2"
                    />
                    {errors.cvv && (
                      <p className="text-red-500 text-xs">
                        {errors.cvv.message}
                      </p>
                    )}
                  </div>
                </div>
                <input
                  {...register("cardHolder", { required: true })}
                  placeholder="Card Holder Name"
                  className="w-full border rounded-lg p-2"
                />
              </div>
            )}

            {/* ONLINE */}
            {paymentMode === "online" && (
              <div className="space-y-3">
                <input
                  {...register("upiId", { required: "UPI ID required" })}
                  placeholder="UPI ID (example@upi)"
                  className="w-full border rounded-lg p-2"
                />
                {errors.upiId && (
                  <p className="text-red-500 text-xs">{errors.upiId.message}</p>
                )}

                <select
                  {...register("bank")}
                  className="w-full border rounded-lg p-2"
                >
                  <option value="">Select Bank</option>
                  <option value="SBI">SBI</option>
                  <option value="HDFC">HDFC</option>
                  <option value="ICICI">Indian Bank</option>
                </select>
              </div>
            )}

            {/* PAY BUTTON */}
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
            >
              ₹{totalPrice + deliveryCharge + 25}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
