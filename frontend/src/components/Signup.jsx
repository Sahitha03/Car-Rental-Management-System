import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/signup', user);
      toast.success('Account created successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create account. Please try again.', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-stretch bg-white" style={{paddingTop:"65px"}}>
      {/* Left Panel - Illustration */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white/80 z-10" />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgATVgyGeFkT47FIXNJl0h0gZ4Lu7edDlvMQ&s"
            alt="Luxury Car Rental"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 max-w-lg p-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Drive in Style</h2>
            <p className="text-blue-600 text-xl mb-8 leading-relaxed">
            Join our premium car rental platform and experience the road like never before.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Sign Up Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-white to-blue-50">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
          <div className="text-center mb-10">
            <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
            >
              <UserPlus className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Sign Up for Car Rentals</h2>
            <p className="text-blue-600">Get access to a wide range of luxury and budget-friendly cars.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              {[
                { id: 'username', Icon: User, placeholder: 'Username' },
                { id: 'email', Icon: Mail, placeholder: 'Email address', type: 'email' },
                { id: 'password', Icon: Lock, placeholder: 'Password', type: 'password' }
              ].map(({ id, Icon, placeholder, type = 'text' }, i) => (
                <motion.div 
                  key={id} 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: i * 0.1 }} 
                  className="relative"
                >
                  <div className="relative group">
                    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 group-focus-within:text-blue-700 transition-colors duration-200 w-5 h-5" />
                    <input
                      type={type}
                      id={id}
                      name={id}
                      value={user[id]}
                      onChange={handleChange}
                      required
                      className="block w-full pl-12 pr-4 py-3.5 bg-white text-gray-900 placeholder-gray-400 rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-200 hover:border-blue-400"
                      placeholder={placeholder}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }} 
              type="submit" 
              disabled={isLoading}
              className={`relative w-full flex items-center justify-center px-6 py-4 text-lg font-medium rounded-xl text-white shadow-lg
                ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}
                transition-all duration-200 ease-in-out mt-8 focus:ring-2 focus:ring-blue-200 focus:outline-none`}
            >
              {isLoading ? (
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }} 
                  className="w-6 h-6 border-2 border-white border-t-transparent rounded-full" 
                />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </motion.button>

            <p className="mt-8 text-center text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200">
                Sign in
              </a>
            </p>
          </form>
        </motion.div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;