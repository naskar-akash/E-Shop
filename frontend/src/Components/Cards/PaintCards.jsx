import React from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const Paint = () => {
  const navigate = useNavigate();

  return (
    <div onClick={()=> navigate("/paintings")} className="w-full flex h-full flex-row justify-center gap-2 p-2">
      <div className="w-[40%] h-full flex flex-col justify-center gap-2">
        <div className="w-full h-1/2">
          <img
            src={assets.paint9}
            alt=""
            className="w-full h-full object-fill rounded-sm"
          />
        </div>
        <div className="w-full h-1/2">
          <img
            src={assets.paint2}
            alt=""
            className="w-full h-full object-fill rounded-sm"
          />
        </div>
      </div>
      <div className="w-[48%] h-full">
        <div className="w-full h-full">
          <img
            src={assets.paint4}
            alt=""
            className="w-full h-full object-fill rounded-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default Paint;
