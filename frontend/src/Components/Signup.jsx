import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerUser } from "./Services/UserServices";
import AlertMsg from "./Services/AlertMsg";

const Signup = () => {
  const navigate = useNavigate();
  const { serverMsg, status, showAlert } = AlertMsg(2);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);
      console.log(response);
      
      if(response.user) {
        return alert(`${response.user.name}, your account has been created!`);
      }
      showAlert(response, "success", "error");
      reset();
      navigate("/login");
    } catch (error) {
      showAlert(error || error.response, "success", "error");
    }
  };

  return (
    <div className="w-full flex justify-center">

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

      <div className="w-[60%] h-[78vh] flex flex-col justify-center mt-6 bg-white/80 px-10 py-4">
        <h2 className="text-3xl text-blue-700 font-bold mb-8">
          Create Your Account
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          method="post"
          className="flex flex-col gap-4"
        >
          <input
            {...register("name", { required: true })}
            type="text"
            className="w-full px-3 py-2 outline-none font-semibold  bg-gray-200 text-stone-500 rounded-sm"
            placeholder="Name"
          />
          {errors.name && (
            <span className="text-red-500 text-[14px] font-semibold">
              Name is required
            </span>
          )}
          <input
            {...register("email", { required: true })}
            type="text"
            className="w-full px-3 py-2 outline-none font-semibold bg-gray-200 text-stone-500 rounded-sm"
            placeholder="Email"
          />
          {errors.email && (
            <span className="text-red-500 text-[14px] font-semibold">
              Email is required
            </span>
          )}
          <input
            {...register("password", {
              required: { value: true, message: "Password is required" },
              minLength: {
                value: 8,
                message: "Password should contain 8 characters",
              },
            })}
            type="password"
            className="w-full px-3 py-2 outline-none font-semibold bg-gray-200 text-stone-500 rounded-sm"
            placeholder="********"
          />
          {errors.password && (
            <span className="text-red-500 text-[14px] font-semibold">
              Password is required
            </span>
          )}
          <input
            type="submit"
            value="Sign Up"
            className="w-full px-2 py-3 bg-amber-500 text-white font-bold mt-3 hover:cursor-pointer rounded-sm"
          />
        </form>
      </div>
    </div>
  );
};

export default Signup;
