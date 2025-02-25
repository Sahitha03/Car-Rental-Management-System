import { Separator } from "@/components/ui/separator";  
import React from 'react';
import { LuFuel } from "react-icons/lu";
import { IoSpeedometerOutline } from "react-icons/io5";
import { GoGear } from "react-icons/go";
import { IoOpen } from "react-icons/io5";
const CarItem = ({ car }) => {
  return (
    <div className="rounded-xl bg-white border hover:shadow-md cursor:pointer">
        <h2 className="absolute m-2 bg-green-500 px-2 rounded-full text-sm text-white">New</h2>
      <img 
        src={car?.image} 
        width={'100%'}height={250}
        className="w-full h-56 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h2 className="font-bold text-black text-lg mb-2 text-center">{car?.name}</h2>
        <Separator className="my-2" />
        
        <div className="grid grid-cols-3 gap-4 mt-5 text-center">
          <div className="flex flex-col items-center">
            <LuFuel className="text-lg mb-1"/>
            <h2 className="text-sm">{car.miles} Miles</h2>
          </div>
          <div className="flex flex-col items-center">
            <IoSpeedometerOutline className="text-lg mb-1"/>
            <h2 className="text-sm">{car.fuelType}</h2>
          </div>
          <div className="flex flex-col items-center">
            <GoGear className="text-lg mb-1"/>
            <h2 className="text-sm">{car.gearType}</h2>
          </div>
        </div>
        <Separator className="my-2"/>
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-xl">${car.price}</h2>
          <h2 className="text-primary text-sm flex gap-2 items-center"></h2>
          <h2>View Details <IoOpen /></h2>
        </div>
      </div>
    </div>
  );
};

export default CarItem;
