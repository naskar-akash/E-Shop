import React from 'react'
import { assets } from '../../assets/assets'


const DailyNeeds = () => {
  return (
    <div className='w-full flex h-full gap-2 flex-row justify-evenly'>
      <div className='w-[23%] max-h-full py-2'><img src={assets.vegApple} alt="" className='w-full h-full object-fill rounded-sm'/></div>
      <div className='w-[23%] max-h-full py-2'><img src={assets.vegFruit3} alt="" className='w-full h-full object-fill rounded-sm'/></div>
      <div className='w-[23%] max-h-full py-2'><img src={assets.vegCombo1} alt="" className='w-full h-full object-fill rounded-sm'/></div>
      <div className='w-[23%] max-h-full py-2'><img src={assets.vegFruit1} alt="" className='w-full h-full object-fill rounded-sm'/></div>
    </div>
  )
}

export default DailyNeeds
