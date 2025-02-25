import React from "react";
import { FaSearch } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SearchList = ({ setFilters, handleSearch }) => {
  const updateFilter = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center p-4 bg-white-500 rounded-md md:rounded-full flex-col md:flex-row gap-6 w-[50%] shadow-lg shadow-[#0052D4]/50 border border-[#333]">
  {/* Car Make */}
<Select onValueChange={(value) => updateFilter("type", value)}>
  <SelectTrigger className="bg-white text-gray-700 rounded-lg w-full py-3 px-4 outline-none border-none shadow-none focus:ring-0 focus:border-none">
    <SelectValue placeholder="Car Make" />
  </SelectTrigger>
  <SelectContent className="bg-white">
    <SelectItem value="SUV">SUV</SelectItem>
    <SelectItem value="Sedan">Sedan</SelectItem>
  </SelectContent>
</Select>

{/* Location */}
<Select onValueChange={(value) => updateFilter("location", value)}>
  <SelectTrigger className="bg-white text-gray-700 rounded-lg w-full py-3 px-4 outline-none border-none shadow-none focus:ring-0 focus:border-none">
    <SelectValue placeholder="Location" />
  </SelectTrigger>
  <SelectContent className="bg-white">
    <SelectItem value="new-york">New York</SelectItem>
    <SelectItem value="los-angeles">Los Angeles</SelectItem>
    <SelectItem value="chicago">Chicago</SelectItem>
  </SelectContent>
</Select>

      {/* Search Button */}
      <div>
        <FaSearch
          className="text-[50px] bg-[#0052D4] rounded-full p-3 text-white hover:scale-110 hover:shadow-[0px_0px_15px_#4a9eff] transition-all cursor-pointer"
          onClick={handleSearch}
        />
      </div>
    </div>
  );
};

export default SearchList;
