import React from "react";
import { useState, useEffect } from "react";

import groceryHome from "./Images/beautyHome.jpg";
import phoneHome from "./Images/groceryHome.jpg";
import beautyHome from "./Images/phoneHome.jpg";

const images = [groceryHome, phoneHome, beautyHome];

const Imageslider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % images.length);
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full flex justify-center items-center px-4">
      <div className="w-full flex flex-col max-w-6xl h-[40vh] pt-2 bg-blue-300 shadow-lg rounded-xl overflow-hidden">
        <img
          src={images[currentIndex]}
          alt="slider"
          className="w-[95%] h-[90%] object-contain rounded transition-all duration-700"
        />
        <div className="flex justify-center gap-2 mt-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-3 h-3 rounded-full ${
                currentIndex == i ? "bg-blue-700" : "bg-gray-200"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Imageslider;
