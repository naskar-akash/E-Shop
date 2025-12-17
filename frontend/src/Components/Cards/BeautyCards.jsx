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
      className="w-full flex h-full gap-2 flex-row justify-evenly"
    >
      {randomBeauty &&
        randomBeauty.map((item, index) => (
          <div key={item._id || index} className="w-[32%] max-h-full py-2">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-fill rounded-sm"
            />
          </div>
        ))}
    </div>
  );
};

export default BeautyCards;
