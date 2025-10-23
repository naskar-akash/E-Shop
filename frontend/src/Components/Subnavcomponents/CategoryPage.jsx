import React from 'react'
import { getImagesByPrefix } from "./ImageService"; 

const CategoryPage = ({ prefix, title }) => {
  const grocImages = getImagesByPrefix(prefix);

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-[96%] flex flex-row justify-center gap-4 mt-6">
        <div className="w-1/4 bg-white/80">
          <div>{title} filters</div>
        </div>
        <div className="w-3/4 min-h-[100vh] bg-white/80 flex flex-col">
          {grocImages.map((img, index) => (
            <div key={index} className="w-full h-[20%] flex flex-row justify-between gap-6 px-4 pt-4">
              <div className="w-1/3 bg-amber-300">
              <img src={img} alt={`${prefix}-${index}`} className="w-full h-full object-fill" />
              </div>
              <div className="w-1/3 bg-amber-300">desc</div>
              <div className="w-1/3 bg-amber-300">price</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage
