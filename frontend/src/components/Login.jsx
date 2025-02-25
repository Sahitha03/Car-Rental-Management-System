import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ setUser }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
        credentials: "include",
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Login successful!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("userId", data.user._id);
        setUser(data.user);
        setRedirectToHome(true);
      } else {
        toast.error(data.message || 'Login failed. Please try again.', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
      }
    } catch (error) {
      toast.error('Login failed. Please try again later.', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
      console.error("Error during login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (redirectToHome) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-stretch bg-white" style={{paddingTop:"65px"}}>
      {/* Left Panel - Illustration */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white/80 z-10" />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgATVgyGeFkT47FIXNJl0h0gZ4Lu7edDlvMQ&s"
            alt="Abstract architecture"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 max-w-lg p-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Welcome Back</h2>
            <p className="text-blue-600 text-xl mb-8 leading-relaxed">
            Join our premium car rental platform and experience the road like never before
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-white to-blue-50">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
          <div className="text-center mb-10">
            <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
            >
              <LogIn className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Sign In</h2>
            <p className="text-blue-600">Welcome back to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              {[
                { id: 'username', Icon: Mail, placeholder: 'Username', type: 'text' },
                { id: 'password', Icon: Lock, placeholder: 'Password', type: 'password' }
              ].map(({ id, Icon, placeholder, type }, i) => (
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
                      value={credentials[id]}
                      onChange={handleChange}
                      required
                      className="block w-full pl-12 pr-4 py-3.5 bg-white text-gray-900 placeholder-gray-400 rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-200 hover:border-blue-400"
                      placeholder={placeholder}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-600 hover:text-gray-800 cursor-pointer transition-colors duration-200">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-200 focus:ring-offset-0 bg-white"
                />
                <span className="ml-2">Remember me</span>
              </label>
              <a href="/forgot-password" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
                Forgot password?
              </a>
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
                'Sign In'
              )}
            </motion.button>

            <p className="mt-8 text-center text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200">
                Create Account
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;