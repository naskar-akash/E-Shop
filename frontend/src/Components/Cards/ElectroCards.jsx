import React from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from "react-router-dom";

const ElectroCards = () => {
  const navigate = useNavigate();


  return (
    <div onClick={()=>navigate("/electronics")} className='w-full flex h-full flex-col justify-center gap-2 p-2'>
      <div className='w-full h-1/2 flex flex-row justify-evenly'>
        <div className='w-[48%]'><img src={assets.electCamera} alt="" className='w-full h-full object-fill rounded-sm'/></div>
        <div className='w-[48%]'><img src={assets.electEarbud2} alt="" className='w-full h-full object-fill rounded-sm'/></div>
      </div>
      <div className='w-full h-1/2 flex flex-row justify-evenly'>
        <div className='w-[48%]'><img src={assets.electLaptop2} alt="" className='w-full h-full object-fill rounded-sm'/></div>
        <div className='w-[48%]'><img src={assets.electPhone3} alt="" className='w-full h-full object-fill rounded-sm'/></div>
      </div>
    </div>
  )
}

export default ElectroCards
