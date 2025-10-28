import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import AlertMsg from "../Services/AlertMsg";
import { createProducts } from "../Services/ProductServices";

const CreateProduct = () => {
  const [preview, setPreview] = useState(null);
  const { serverMsg, status, showAlert } = AlertMsg(2);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const imageFile = watch("image");

  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0];
      const url = URL.createObjectURL(file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreview(null);
    }
  }, [imageFile]);

  const onSubmit = async (data) => {
    try {
      const response = await createProducts(data);
      showAlert(response, "success", "error");
      reset();
      setPreview(null);
    } catch (error) {
      showAlert(error || error.response, "success", "error");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-start justify-center py-10">
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

      <div className="w-[95%] max-w-5xl mt-5 bg-white/80 shadow-xl p-8">
        <h1 className="text-blue-700 text-center text-3xl font-bold text-shadow-md mb-6">
          Create Products here
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          method="post"
          className="grid grid-cols-3 gap-6"
        >
          {/*Image+Preview*/}
          <div className="col-span-1 flex flex-col items-start gap-4">
            <label className="w-full">
              <span className="block text-sm font-medium text-gray-700 mb-2">
                Product Image
              </span>
              <input
                {...register("image")}
                type="file"
                accept="image/*"
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white cursor-pointer"
              />
            </label>
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-44 h-44 object-cover rounded-md border"
              />
            ) : (
              <div className="w-44 h-44 flex justify-center items-center rounded-md border border-dashed text-sm text-gray-400">
                Preview
              </div>
            )}
          </div>

          {/*Other inputs*/}
          <div className="col-span-2 grid grid-col-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                {...register("name", {
                  required: {
                    value: true,
                    message: "Product name is necessary",
                  },
                })}
                type="text"
                className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-3 focus:border-blue-400 focus:ring-blue-200"
                placeholder="Product name"
              />
              {errors.name && (
                <p
                  className="
          text-red-500 font-semibold text-[12px]"
                >
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                {...register("description", {
                  required: {
                    value: true,
                    message: "Description is necessary",
                  },
                })}
                rows="3"
                className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-3 focus:border-blue-400 focus:ring-blue-200"
                placeholder="Short description"
              />
              {errors.description && (
                <p
                  className="
          text-red-500 font-semibold text-[12px]"
                >
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <input
                  {...register("category", {
                    required: { value: true, message: "Mention category" },
                  })}
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-3 focus:border-blue-400 focus:ring-blue-200"
                  placeholder="e.g., electronics"
                />
                {errors.category && (
                  <p
                    className="
          text-red-500 font-semibold text-[12px]"
                  >
                    {errors.category.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="block text-sm font-medium text-gray-700">
                  Price (₹)
                </label>
                <input
                  {...register("price", {
                    required: { value: true, message: "Price is required" },
                  })}
                  type="number"
                  step="0.01"
                  className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-3 focus:border-blue-400 focus:ring-blue-200"
                  placeholder="Price"
                />
                {errors.price && (
                  <p
                    className="
          text-red-500 font-semibold text-[12px]"
                  >
                    {errors.price.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="w-1/2 flex flex-col gap-1">
                <label className="block text-sm font-medium text-gray-700">
                  Discount (%)
                </label>
                <input
                  {...register("discount", {
                    min: { value: 0, message: "Min 0%" },
                    max: { value: 100, message: "Max 100%" },
                  })}
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-3 focus:border-blue-400 focus:ring-blue-200"
                  placeholder="0%"
                />
                {errors.discount && (
                  <p
                    className="
          text-red-500 font-semibold text-[12px]"
                  >
                    {errors.discount.message}
                  </p>
                )}
              </div>
              <div className="w-1/2 flex items-end justify-end">
                <input
                  type="submit"
                  value="Create"
                  className="bg-blue-500 rounded-md text-white font-semibold text-lg px-6 py-3 hover:cursor-pointer hover:bg-blue-600"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
