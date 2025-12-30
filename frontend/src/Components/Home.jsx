import React from "react";
import Subnavbar from "./Subnavbar";
import Imageslider from "./Imageslider";
import DailyCards from "./Cards/DailyCards";
import ElectroCards from "./Cards/ElectroCards";
import PaintCards from "./Cards/PaintCards";
import BeautyCards from "./Cards/BeautyCards";
import ToysCards from "./Cards/ToysCards";

const Home = () => {

  return (
        <div className="flex flex-col gap-2">
          <Subnavbar />
          <Imageslider />
          <div className="flex flex-col justify-center gap-2 w-full mt-2">
            <div className="flex flex-col">
              <p className="text-3xl font-bold my-6 mx-4 text-cyan-800 font-sans">Daily Needs</p>
            <div className="w-[98%] h-[40vh] bg-blue-200 mx-4 py-2 rounded-sm">
              <DailyCards />
            </div>
            </div>
            <div className="flex flex-col">
              <p className="text-3xl font-bold my-6 mx-4 text-gray-800 font-sans">Best of Electronics</p>
            <div className="w-[98%] h-[55vh] bg-blue-200 mx-4 py-2 rounded-sm">
              <ElectroCards />
            </div>
            </div>
            <div className="flex flex-col">
              <p className="text-3xl font-bold my-6 mx-4 text-pink-800 font-sans">Beauty products</p>
            <div className="w-[98%] h-[40vh] bg-blue-200 mx-4 py-2 rounded-sm">
              <BeautyCards />
            </div>
            </div>
            <div className="flex flex-col">
              <p className="text-3xl font-bold my-6 mx-4 text-purple-800 font-sans">Best of Paintings</p>
            <div className="w-[98%] h-[50vh] bg-blue-200 mx-4 py-2 rounded-sm">
              <PaintCards />
            </div>
            </div>
            <div className="flex flex-col">
              <p className="text-3xl font-bold my-6 mx-4 text-blue-900 font-sans">Kids</p>
            <div className="w-[98%] h-[40vh] bg-blue-200 mx-4 py-2 rounded-sm">
              <ToysCards />
            </div>
            </div>
          </div>
        </div>
      )};

export default Home;
