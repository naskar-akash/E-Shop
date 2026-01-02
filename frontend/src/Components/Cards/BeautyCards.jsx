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
    <div
      onClick={() => navigate("/beauty")}
      className="w-full h-auto flex flex-col justify-center gap-4 p-2"
    >
      <div className="grid grid-cols-3 gap-4 w-full">
        {randomBeauty &&
          randomBeauty.slice(0, 3).map((item) => (
            <div
              key={item._id}
              className="w-full h-40 sm:h-52 md:h-44 overflow-hidden flex items-center justify-center"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-fill rounded-sm"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default BeautyCards;
