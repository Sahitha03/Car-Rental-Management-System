import React from 'react'
import {
    Car,
    CarFront,
    Truck as TruckIcon,
    Bike,
    Cable,
    Timer,
    Warehouse,
    CarTaxiFront,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Mail,
    Phone,
    MapPin,
  } from 'lucide-react';
const Footer = () => {
  return (
    <div style={{paddingTop:"60px"}}>
      <footer className="bg-gray-900 text-gray-300" style={{paddingTop:"30px"}}>
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">About Us</h3>
              <p className="text-gray-400 mb-6">
                We provide premium car rental services with a wide range of vehicles to choose from. Experience the freedom of the road with our reliable fleet.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="hover:text-white transition-colors">About Us</a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">Services</a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">Pricing</a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">Contact</a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  <span>123 Car Street, Auto City, AC 12345</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-500" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-500" />
                  <span>info@carrentals.com</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">Subscribe to our newsletter for updates and special offers.</p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-blue-500 text-white"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-800 text-center md:flex md:justify-between md:text-left">
            <p>&copy; 2025 Car Rentals. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors mx-3">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors mx-3">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors mx-3">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
