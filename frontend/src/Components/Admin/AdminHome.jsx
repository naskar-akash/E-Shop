import React from 'react'

const AdminHome = () => {
  return (
    <div className='w-full p-4 flex justify-center items-center'>
      <div className='w-[98%] h-[70vh] bg-white/80 flex flex-col gap-2 p-2'>
        <div className='w-full h-[20vh] bg-amber-200 flex flex-row'>
          <div className='w-1/5 h-full p-2'>
          <img src="" alt="" />
          </div>
          <div className='w-3/5 p-2 h-full flex flex-col justify-between'>
          <p>name</p>
          <p>desc</p>
          <div className='w-full flex flex-row justify-between'>
            <p>cat</p>
            <p>price</p>
            <p>discount</p>
          </div>
          </div>
          <div className='w-1/5 h-full'></div>
        </div>
      </div>
    </div>
  )
}

export default AdminHome
