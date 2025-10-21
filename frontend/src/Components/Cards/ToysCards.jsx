import React from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const ToysCards = () => {
  const navigate = useNavigate();

  return (
    <div onClick={()=> navigate("/toys")} className="w-full flex h-full gap-2 flex-row justify-evenly">
          <div className="w-[23%] max-h-full py-2">
            <img
              src={assets.toyCar}
              alt=""
              className="w-full h-full object-fill rounded-sm"
            />
          </div>
          <div className="w-[23%] max-h-full py-2">
            <img
              src={assets.toyHelicopter}
              alt=""
              className="w-full h-full object-fill rounded-sm"
            />
          </div>
          <div className="w-[23%] max-h-full py-2">
            <img
              src={assets.toySoft}
              alt=""
              className="w-full h-full object-fill rounded-sm"
            />
          </div>
          <div className="w-[23%] max-h-full py-2">
            <img
              src={assets.toyPlane}
              alt=""
              className="w-full h-full object-fill rounded-sm"
            />
          </div>
        </div>
  )
}

export default ToysCards
