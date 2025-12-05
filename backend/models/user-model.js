import { Schema, model } from "mongoose";
import dateTime from "../utils/dateTime.js";
const { date, time } = dateTime();

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    default: "Your Address"
  },
  pincode: {
    type: String,
    default: "Pincode"
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  profilePic: {
    type: String,
  },
  cart: [
    {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, default: 1 },
    addedAt: { type: String, default: date },
    },
  ],
  
  orders: [
    {
      items:[
        {
          product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
          quantity: {type: Number, default: 1},
        },
      ],
      totalAmount: Number,
      paymentMode: {
        type: String,
        enum: ["cash", "UPI", "card"],
        default: "cash",
      },
      orderDate: {type: String, default: date,},
      deliveryDate: {type: String, required: true,},
    },
  ],

  joinedDate: {
    type: String,
    default: date,
  },
  joinedTime: {
    type: String,
    default: time,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

export default model("User", userSchema);
