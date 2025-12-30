import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { FaCaretSquareLeft } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const Subnavbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <nav className="hidden bg-yellow-50 md:flex list-none justify-between rounded-sm mx-5 my-2.5 px-4 py-4 h-[10vh]">
        <ul className='md:flex list-none justify-between w-full'>
          <button onClick={()=>navigate("/grocery")} className="font-medium text-lg">Grocery</button>
          <button onClick={()=>navigate("/electronics")} className="font-medium text-lg">Electronics</button>
          <button onClick={()=>navigate("/beauty")} className="font-medium text-lg">Beauty & Fashion</button>
          <button onClick={()=>navigate("/kids")} className="font-medium text-lg">Kids</button>
          <button onClick={()=>navigate("/paintings")} className="font-medium text-lg">Paintings</button>
        </ul>
      </nav>
      {/* Mobile View */}
      <button className="md:hidden text-blue-500 p-2 text-lg" onClick={()=>{setOpen(!open)}}><FaCaretSquareLeft /></button>
      {open && (<div className="md:hidden absolute z-10 bg-yellow-50 w-1/2 h-full top-20 left-0 shadow-lg p-5">
        <ul className='flex flex-col list-none space-y-5'>
          <button className="text-blue-700 text-lg pl-30" onClick={()=>{setOpen(!open)}}><RxCross2 /></button>
          <button onClick={()=>{navigate("/grocery"); setOpen(false);}} className="font-medium text-lg">Grocery</button>
          <button onClick={()=>{navigate("/electronics"); setOpen(false);}} className="font-medium text-lg">Electronics</button>
          <button onClick={()=>{navigate("/beauty"); setOpen(false);}} className="font-medium text-lg">Beauty & Fashion</button>
          <button onClick={()=>{navigate("/kids"); setOpen(false);}} className="font-medium text-lg">Kids</button>
          <button onClick={()=>{navigate("/paintings"); setOpen(false);}} className="font-medium text-lg">Paintings</button>
        </ul>
      </div>)}  
    </div>
  );
};

export default Subnavbar;
