import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../Services/ProductServices";

const ToysCards = () => {
  const navigate = useNavigate();
  const [kids, setKids] = useState([]);
  const [randomKids, setRandomKids] = useState([]);

  // hook to fetch grocery products
  useEffect(() => {
    const images = async () => {
      const response = await getAllProducts();
      const img = response.data.filter(
        (item) => item.category === "kids"
      );
      setKids(img);
    };
    images();
  }, []);

  // generate 4 random unique products
  useEffect(() => {
    if (kids.length >= 4) {
      const shuffled = [...kids].sort(() => 0.5 - Math.random());
      setRandomKids(shuffled.slice(0, 4));
    }
  }, [kids]);

  return (
    <div
      onClick={() => navigate("/toys")}
      className="w-full flex h-full gap-2 flex-row justify-evenly"
    >
      {randomKids &&
        randomKids.map((item, index) => (
          <div key={item._id || index} className="w-[23%] max-h-full py-2">
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

export default ToysCards;
