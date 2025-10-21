import React from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const BeautyCards = () => {
  const navigate = useNavigate();

  return (
    <div onClick={()=>navigate("/beauty")} className="w-full flex h-full gap-2 flex-row justify-evenly">
          <div className="w-[32%] max-h-full py-2">
            <img
              src={assets.beautyEyeshade}
              alt=""
              className="w-full h-full object-fill rounded-sm"
            />
          </div>
          <div className="w-[32%] max-h-full py-2">
            <img
              src={assets.beautyPerfume}
              alt=""
              className="w-full h-full object-fill rounded-sm"
            />
          </div>
          <div className="w-[32%] max-h-full py-2">
            <img
              src={assets.beautyCreame}
              alt=""
              className="w-full h-full object-fill rounded-sm"
            />
          </div>
        </div>
  )
}

export default BeautyCards
