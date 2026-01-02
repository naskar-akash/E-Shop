import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../Services/ProductServices";

const ElectroCards = () => {
  const navigate = useNavigate();
  const [electro, setElectro] = useState([]);
  const [randomElectro, setRandomElectro] = useState([]);

  useEffect(() => {
    const fetchElectro = async () => {
      const response = await getAllProducts();
      const items = response.data.filter(
        (item) => item.category === "electronics"
      );
      setElectro(items);
    };
    fetchElectro();
  }, []);

  // pick 4 random unique electronics
  useEffect(() => {
    if (electro.length >= 4) {
      const shuffled = [...electro].sort(() => 0.5 - Math.random());
      setRandomElectro(shuffled.slice(0, 4));
    }
  }, [electro]);

  return (
    <div
      onClick={() => navigate("/electronics")}
      className="w-full h-auto flex flex-col justify-center gap-4 p-2"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        {randomElectro &&
          randomElectro.slice(0, 4).map((item) => (
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

export default ElectroCards;
