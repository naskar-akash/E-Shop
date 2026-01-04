import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../Services/ProductServices";

const BeautyCards = () => {
  const navigate = useNavigate();
  const [beauty, setBeauty] = useState([]);
  const [randomBeauty, setRandomBeauty] = useState([]);

  // hook to fetch beauty products
  useEffect(() => {
    const images = async () => {
      const response = await getAllProducts();
      const img = response.data.filter((item) => item.category === "beauty");
      setBeauty(img);
    };
    images();
  }, []);

  // generate 3 random unique products
  useEffect(() => {
    if (beauty.length >= 3) {
      const shuffled = [...beauty].sort(() => 0.5 - Math.random());
      setRandomBeauty(shuffled.slice(0, 3));
    }
  }, [beauty]);

  return (
    <div onClick={() => navigate("/beauty")} className="w-full p-2">
      <div className="grid grid-cols-2 gap-2">

        {/* Left column */}
        <div className="flex items-center justify-center">
          {randomBeauty[0] && (
            <img
              src={randomBeauty[0].image}
              alt={randomBeauty[0].name}
              className="w-full h-full md:h-60 object-fill rounded-sm"
            />
          )}
        </div>
          {/* Right column : two stacked images */}
        <div className="grid grid-rows-2 gap-2">
          {randomBeauty.slice(1, 3).map((item) => (
            <div key={item._id} className="w-auto h-40 md:h-52 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-fill rounded-sm"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BeautyCards;
