import React from 'react'
import { useNavigate } from "react-router-dom";

const Beauty = () => {
  const navigate = useNavigate();

  return (
    <div className='w-full'>
      <button onClick={()=>{navigate("/")}} className='bg-blue-400 text-white px-3 py-2 text-sm rounded-md'>back</button>
      beauty
    </div>
  )
}

export default Beauty
