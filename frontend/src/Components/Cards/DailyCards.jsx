import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllProducts } from '../Services/ProductServices';


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
    }
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
    <div onClick={()=>navigate("/grocery")} className="w-full flex h-full gap-2 flex-row justify-evenly">
      {randomGrocery &&
        randomGrocery.map((item, index) => (
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

export default DailyCards;
