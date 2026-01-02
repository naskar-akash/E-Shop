import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../Services/ProductServices";

const DailyCards = () => {
  const navigate = useNavigate();
  const [grocery, setGrocery] = useState([]);
  const [randomGrocery, setRandomGrocery] = useState(null);

  // hook to fetch grocery products
  useEffect(() => {
    const images = async () => {
      const response = await getAllProducts();
      const img = response.data.filter((item) => item.category === "grocery");
      setGrocery(img);
    };
    images();
  }, []);

  // generate 4 random unique products
  useEffect(() => {
    if (grocery.length >= 4) {
      const shuffled = [...grocery].sort(() => 0.5 - Math.random());
      setRandomGrocery(shuffled.slice(0, 4));
    }
  }, [grocery]);

  return (
    <div
      onClick={() => navigate("/grocery")}
      className="w-full h-auto flex flex-col justify-center gap-4 p-2"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        {randomGrocery &&
          randomGrocery.slice(0, 4).map((item) => (
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

export default DailyCards;
