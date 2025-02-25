import React from 'react'
import {Button} from './ui/button'
import Header from './Header'
import Hero from './Hero'
import Category from './Category'
import MostSearchedCar from './MostSearchedCar'
import { Search, Calendar, CreditCard } from "lucide-react";
import Footer from './Footer'
const HomePage = () => {
  return (
    <div>
      {/* Header */}
      <Hero/>
      <Category/>
        {/* How It Works Section */}
        <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Search Cars</h3>
              <p className="text-gray-600">Browse our extensive collection of vehicles and find your perfect match</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Choose Dates</h3>
              <p className="text-gray-600">Select your pickup and return dates that work best for you</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CreditCard className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Book & Pay</h3>
              <p className="text-gray-600">Secure your booking with our easy payment process</p>
            </div>
          </div>
        </div>
      </div>
      <MostSearchedCar/>
      <Footer/>
    </div>
  )
}

export default HomePage