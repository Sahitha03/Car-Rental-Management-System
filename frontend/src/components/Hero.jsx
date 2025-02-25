import { Search } from 'lucide-react'
import React from 'react'
import SearchList from './Search'

const Hero = () => {
  return (
    <div>
      <div className='flex flex-col items-center p-10 py-20
      gap-6 h-[650px] w-full bg-[#eef0fc]'>
        <h2 className='text-lg'>Find cars for sale and for rent </h2>
        <h2 className='text-[60px] font-bold'>Find Your Dream Car</h2>
        {/* <SearchList/> */}
        <img src='/tesla.png' className='mt-10'/>
        </div>
    </div>
  )
}

export default Hero
