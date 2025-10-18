import React from "react";

const Subnavbar = ({setActivePage,setOpen}) => {

  const handleClick = (page) => {
    setActivePage(page)
    setOpen(true)
  }

  return (
    <div>
      <nav className="bg-yellow-50 flex list-none justify-between rounded-sm mx-5 my-2.5 px-4 py-4 h-[10vh]">
        <ul className='flex list-none justify-between w-full'>
          <button onClick={()=>handleClick("Grocery")} className="font-medium text-lg">Grocery</button>
          <button onClick={()=>handleClick("Electronics")} className="font-medium text-lg">Electronics</button>
          <button onClick={()=>handleClick("Beauty")} className="font-medium text-lg">Beauty & Fashion</button>
          <button onClick={()=>handleClick("Toys")} className="font-medium text-lg">Toys</button>
          <button onClick={()=>handleClick("Paintings")} className="font-medium text-lg">Paintings</button>
        </ul>
      </nav>
    </div>
  );
};

export default Subnavbar;
