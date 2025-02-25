import React from 'react';
import FakeData from './Shared/FakeData';
import CarItem from './CarItem';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const MostSearchedCar = () => {
  return (
    <div className="container mx-auto">
      <h2 className="font-bold text-3xl text-center mt-16 mb-7">Most Searched Cars</h2>
      {FakeData?.carList?.length > 0 ? (
        <Carousel>
          <CarouselContent>
            {FakeData.carList.map((car, index) => (
              <CarouselItem 
                key={car.id || index} 
                className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <CarItem car={car} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <p className="text-center text-gray-500">No cars available.</p>
      )}
    </div>
  );
};

export default MostSearchedCar;
