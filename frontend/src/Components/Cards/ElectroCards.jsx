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
      className="w-full h-full flex flex-col gap-2 p-2"
    >
      <div className="flex gap-2 h-1/2">
        {randomElectro.slice(0, 2).map((item) => (
          <div key={item._id} className="w-1/2">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-fill rounded-sm"
            />
          </div>
        ))}
      </div>

      <div className="flex gap-2 h-1/2">
        {randomElectro.slice(2, 4).map((item) => (
          <div key={item._id} className="w-1/2">
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
