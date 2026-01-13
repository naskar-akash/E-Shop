import { Schema, model } from "mongoose";
import dateTime from "../utils/dateTime.js";
import base64Image  from '../utils/convertToBase64.js'
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
    default: "Your Address",
  },
  pincode: {
    type: String,
    default: "Pincode",
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  profilePic: {
    data: {
      type: Buffer,
      default: Buffer.from(base64Image.user, "base64"),
    },
    contentType: {
      type: String,
      default: "image/jpeg",
    },
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
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, default: 1 },
      totalAmount: { type: Number, required: true },
      paymentMode: {
        type: String,
        enum: ["cash", "online", "card"],
        default: "cash",
      },
      orderDate: String,
      deliveryDate: { type: String, required: true },
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
