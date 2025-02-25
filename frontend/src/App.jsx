import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import CarListing from "./components/CarListing";
import NewListing from "./components/NewListing";
import CarDetails from "./components/CarDetails";
import MyBookings from "./components/MyBookings";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/Admindashboard";
import AdminListings from "./components/AdminListings";
import AdminPayments from "./components/AdminPayments";
import AdminListingDetails from "./components/AdminListingDetails";
import EditCarListing from "./components/EditCarListing";
import PaymentDetails from "./components/PaymentDetails";
import UsersList from "./components/UsersList";
import ReviewsList from "./components/ReviewsList";
import Header from "./components/Header";
import { Button } from "@/components/ui/button"

import "./App.css";
import Profile from "./components/Profile";



function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  return (
    <>
    <div className="App">
      <BrowserRouter>
         <Header/>
        {/* <Navbar />  */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/carlistings" element={<CarListing />} />
          <Route path="/carlistings/:id" element={<CarDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />
  
          {/* Admin Routes */}
          <Route
            path="/admin"
            element={isAdmin ? <AdminDashboard /> : <AdminLogin onLogin={() => setIsAdmin(true)} />}
          />
          <Route 
          path="/newlisting" 
          element={isAdmin ? <NewListing />:<AdminLogin onLogin={() => setIsAdmin(true)} />} 
          />
          <Route 
          path="/editlisting/:id" 
          element={isAdmin ?<EditCarListing /> : <AdminLogin onLogin={() => setIsAdmin(true)} />} />
           <Route 
           path="/admin/users" 
           element={isAdmin ?<UsersList />: <AdminLogin onLogin={() => setIsAdmin(true)} />} />
           <Route 
           path="/admin/reviews" 
           element={isAdmin ?<ReviewsList />:<AdminLogin onLogin={() => setIsAdmin(true)} />} />
          <Route 
          path="/admin/dashboard"
           element={isAdmin ?<AdminDashboard />:<AdminLogin onLogin={() => setIsAdmin(true)} />}/>
        <Route 
        path="/admin/listings" 
        element={isAdmin ?<AdminListings />:<AdminLogin onLogin={() => setIsAdmin(true)} />} />
        <Route 
        path="/admin/payments" 
        element={isAdmin ?<AdminPayments />:<AdminLogin onLogin={() => setIsAdmin(true)} />} />
        <Route 
        path="/admin/payments/:id" 
        element={isAdmin ?<PaymentDetails />:<AdminLogin onLogin={() => setIsAdmin(true)} />} />
        <Route path="/listing/:id"
         element={isAdmin ?<AdminListingDetails />:<AdminLogin onLogin={() => setIsAdmin(true)} />} />
        </Routes>
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;
