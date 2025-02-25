import React from 'react';
import {
  Car,
  CarFront,
  Truck as TruckIcon,
  Bike,
  Cable,
  Timer,
  Warehouse,
  CarTaxiFront,
} from 'lucide-react';

const vehicleTypes = [
  { label: 'Sedan', icon: CarFront },
  { label: 'SUV', icon: Car },
  { label: 'Truck', icon: TruckIcon },
  { label: 'Bike', icon: Bike },
  { label: 'Electric', icon: Cable },
  { label: 'Hybrid', icon: Timer },
  { label: 'Van', icon: Warehouse },
  { label: 'Taxi', icon: CarTaxiFront },
];

const Category = () => {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">Browse By Type</h2>

        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4">
          {vehicleTypes.map((type) => {
            const IconComponent = type.icon;
            return (
              <button
                key={type.label}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-white hover:bg-gray-50 transition-colors border border-gray-100 hover:border-gray-200 hover:shadow-sm"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 mb-3">
                  <IconComponent className="w-6 h-6 text-gray-700" />
                </div>
                <span
                  className={`text-sm font-medium ${
                    type.label === 'Electric' ? 'text-green-600' :
                    type.label === 'Hybrid' ? 'text-blue-600' :
                    'text-gray-700'
                  }`}
                >
                  {type.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Category;
