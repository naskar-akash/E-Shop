import React from "react";
import { useState } from "react";
import Subnavbar from "./Subnavbar";
import Grocery from "./Subnavcomponents/Grocery";
import Electronics from "./Subnavcomponents/Electronics";
import Beauty from "./Subnavcomponents/Beauty";
import Toys from "./Subnavcomponents/Toys";
import Paintings from "./Subnavcomponents/Paintings";
import Imageslider from "./Imageslider";
import DailyNeeds from "./Cards/DailyNeeds";
import Electro from "./Cards/Electro";
import Paint from "./Cards/Paint";

const Home = () => {
  const [activePage, setActivePage] = useState("Grocery");
  const [open, setOpen] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case "Grocery":
        return <Grocery />;
      case "Electronics":
        return <Electronics />;
      case "Beauty":
        return <Beauty />;
      case "Toys":
        return <Toys />;
      case "Paintings":
        return <Paintings />;
      default:
        return <Grocery />;
    }
  };

  return (
    <div className="min-h-[100vh]">
      {open ? (
        renderPage()
      ) : (
        <div className="flex flex-col gap-2">
          <Subnavbar setActivePage={setActivePage} setOpen={setOpen} />
          <Imageslider />
          <div className="flex flex-col justify-center gap-2 w-full mt-2">
            <div className="w-[98%] h-[20vh] bg-sky-200 mx-4"><DailyNeeds/></div>
            <div className="w-[98%] h-[50vh] bg-sky-200 mx-4">
              <Electro/>
            </div>
            <div className="w-[98%] h-[20vh] bg-blue-400 mx-4"><Paint/></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
