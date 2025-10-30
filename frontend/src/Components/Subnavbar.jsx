import React from "react";
import { useNavigate } from "react-router-dom";

const Subnavbar = () => {
  const navigate = useNavigate();

  return (
    <div>
      <nav className="bg-yellow-50 flex list-none justify-between rounded-sm mx-5 my-2.5 px-4 py-4 h-[10vh]">
        <ul className='flex list-none justify-between w-full'>
          <button onClick={()=>navigate("/grocery")} className="font-medium text-lg">Grocery</button>
          <button onClick={()=>navigate("/electronics")} className="font-medium text-lg">Electronics</button>
          <button onClick={()=>navigate("/beauty")} className="font-medium text-lg">Beauty & Fashion</button>
          <button onClick={()=>navigate("/kids")} className="font-medium text-lg">Kids</button>
          <button onClick={()=>navigate("/paintings")} className="font-medium text-lg">Paintings</button>
        </ul>
      </nav>
    </div>
  );
};

export default Subnavbar;
