import React from "react";
import { getImagesByPrefix } from "./ImageService";

const CategoryPage = ({ prefix, title }) => {
  const prodImages = getImagesByPrefix(prefix);

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-[96%] flex flex-row justify-center gap-4 mt-6">
        {/* Filter section */}
        <div className="w-1/5 bg-white/80">
          <div>{title} filters</div>
        </div>
        {/* Products grid section */}
        <div className="w-4/5 min-h-[100vh] bg-white/80 p-4">
        <div className="grid grid-cols-3 gap-5 justify-items-center">
          {prodImages.map((image, index) => (
            <div
              key={index}
              className="w-[330px] flex flex-col bg-white rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 overflow-hidden hover:scale-105 p-4"
            >
              <div className="w-full h-[200px] overflow-hidden">
                <img
                  src={image}
                  alt={`${prefix}-${index}`}
                  className="w-full h-full object-cover transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col justify-items-start py-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Product Name
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Brief product description goes here
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-blue-600">₹999</span>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="pb-4 flex flex-row justify-items-start gap-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  4.5 ★
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                  Free Delivery
                </span>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
