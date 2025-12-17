import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../Services/ProductServices";

const Paint = () => {
  const navigate = useNavigate();
  const [paint, setPaint] = useState([]);
  const [randomPaint, setRandomPaint] = useState([]);

  // hook to fetch grocery products
  useEffect(() => {
    const images = async () => {
      const response = await getAllProducts();
      const img = response.data.filter((item) => item.category === "paintings");
      setPaint(img);
    };
    images();
  }, []);

  // generate 3 random unique products
  useEffect(() => {
    if (paint.length >= 3) {
      const shuffled = [...paint].sort(() => 0.5 - Math.random());
      setRandomPaint(shuffled.slice(0, 3));
    }
  }, [paint]);

  return (
    <div
      onClick={() => navigate("/paintings")}
      className="w-full flex h-full flex-row justify-center gap-2 p-2"
    >
      <div className="w-[40%] h-full flex flex-col justify-center gap-2">
        {randomPaint &&
          randomPaint.slice(0, 2).map((item) => (
            <div key={item._id} className="w-full h-1/2">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-fill rounded-sm"
              />
            </div>
          ))}
      </div>
      <div className="w-[48%] h-full">
        {randomPaint[2] &&
            <div className="w-full h-full">
              <img
                src={randomPaint[2].image}
                alt={randomPaint[2].name}
                className="w-full h-full object-fill rounded-sm"
              />
            </div>
          }
      </div>
    </div>
  );
};

export default Paint;
