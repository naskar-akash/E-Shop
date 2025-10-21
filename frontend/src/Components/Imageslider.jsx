import React from "react";
import { useState, useEffect } from "react";
import { assets } from "../assets/assets";

const images = [assets.vegCombo1, assets.electPhone1, assets.beautyLipstick, assets.paint11];

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
      <div className="w-full max-w-6xl h-[40vh] flex flex-col pt-2 overflow-hidden relative">
        {/*Slider container*/}
        <div
          className="w-full h-full flex items-center justify-center overflow-hidden">
            <img
              src={images[currentIndex]}
              alt="slider"
              className="w-full h-full object-fill transition-all duration-500 rounded-xl shadow-lg"
            />
        </div>
        {/*Dots navigation*/}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === i ? "bg-blue-700 scale-110" : "bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Imageslider;
