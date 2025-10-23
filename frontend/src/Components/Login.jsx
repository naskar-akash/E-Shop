import React from "react";
import { useForm } from "react-hook-form";
import { assets } from "../assets/assets";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-[60%] h-[75vh] flex flex-row justify-center mt-6">
        <div className="w-2/5 bg-blue-500 flex flex-col justify-between p-8">
          <div className="flex justify-center flex-col gap-2">
            <h2 className="text-white text-3xl font-semibold">Looks like you're new here!</h2>
            <h3 className="text-gray-200 text-xl">Sign up with your email or mobile number to get started</h3>
          </div>
          <div className="w-full flex justify-center align-middle">
            <img src={assets.logoLogin} alt="" className="w-[20vh] h-[20vh]" />
            </div>
        </div>
        <div className="w-3/5 bg-white/80 flex flex-col justify-between">
          <div className="flex flex-col px-8 py-10">
            <span className="text-sm text-stone-500 font-semibold">
              Enter Email/Mobile number
            </span>
            <form onSubmit={handleSubmit(onSubmit)} method="post">
              <input
                {...register("mobile", { required: true })}
                className="w-full p-1 border-b-1 border-blue-500 outline-none"
              />
              {errors.mobile && (
                <span className="text-red-500 text-[14px] font-semibold">
                  Please enter a valid email/mobile number
                </span>
              )}
              <p className="text-stone-600 text-[12px] font-semibold mt-4">
                By continuing, you agree to E-Shop's{" "}
                <span className="text-blue-600 hover:cursor-pointer">
                  Terms of Use
                </span>{" "}
                and{" "}
                <span className="text-blue-600 hover:cursor-pointer">
                  Privacy{" "}
                </span>
                Policy.
              </p>
              <input
                type="submit"
                value="Login"
                className="w-full px-2 py-3 bg-orange-600 text-white font-bold mt-3 hover:cursor-pointer"
              />
            </form>
          </div>
          <div className="w-full flex justify-center align-middle">
            <p className="text-blue-600 font-semibold text-md py-8 hover:cursor-pointer">
              New to E-Shop? Create an account
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
