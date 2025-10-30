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
  orders: {
    type: Array,
    default: [],
  },
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
