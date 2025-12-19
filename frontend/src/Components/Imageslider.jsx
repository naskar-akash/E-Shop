import React from "react";
import { useState, useEffect } from "react";
import { getAllProducts } from "./Services/ProductServices.jsx";

const Imageslider = () => {
  const [images, setImages] = useState([]);
  const [randomImages, setRandomImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Hook to render images from database
  useEffect(() => {
    const fetchImages = async () => {
      const response = await getAllProducts();
      const img = response.data.map((item) => item.image);
      setImages(img);
    };
    fetchImages();
  }, []);

  // Hook to get 5 random images
  useEffect(() => {
    if (images.length >= 5) {
      const shuffled = [...images].sort(() => 0.5 - Math.random());
      setRandomImages(shuffled.slice(0, 5));
      setCurrentIndex(0);
    }
  }, [images]);

  // Auto slide every 2 seconds
  useEffect(() => {
    if (randomImages.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % randomImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [randomImages]);

  return (
    <div className="w-full flex justify-center items-center px-4">
      <div className="w-full max-w-6xl h-[45vh] flex flex-col justify-content-center items-center pt-2 overflow-hidden relative">
        {/*Slider container*/}
        <div className="w-[80%] py-2 h-full flex items-center justify-center overflow-hidden bg-sky-200 rounded-xl ">
          {randomImages.length > 0 && (
            <img
              src={randomImages[currentIndex]}
              alt="slider"
              className="w-[60%] h-[95%] object-fill transition-all duration-500 rounded-xl shadow-gray-600 shadow-lg"
            />
          )}
        </div>
        {/*Dots navigation*/}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
          {randomImages.map((_, i) => (
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
