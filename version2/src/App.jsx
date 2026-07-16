import React from 'react'
import { useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar'
import Home from './pages/Home'
import DashBoard from './pages/DashBoard'
import Auth from './pages/Auth';
import Services from './pages/Services'
import Ambulance from './components/Services/Ambulance'
import ProtectedRoute from './components/common/ProtectedRoute';
import Hospital from './components/Services/Hospital';
import Doctor from './components/Services/Doctor'
import BloodBanks from './components/Services/BloodBanks';
import BloodDonors from './components/Services/BloodDonors';
const AppContent = () => {
  const sentinelRef = useRef(null);
  const pageContentRef = useRef(null);
  const location = useLocation();

  const hideNavbarRoutes = ['/login', '/signup', '/dashboard'];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname.toLowerCase());

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!pageContentRef.current) return;
        pageContentRef.current.style.WebkitMaskImage = entry.isIntersecting
          ? 'none'
          : 'linear-gradient(to bottom, transparent 0px, black 80px)';
        pageContentRef.current.style.maskImage = entry.isIntersecting
          ? 'none'
          : 'linear-gradient(to bottom, transparent 0px, black 80px)';
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#0A0B10] min-h-full">
      {showNavbar && (
        <>
          <div className="relative pt-13 px-4 sm:px-0">
            <Navbar />
          </div>
          <div ref={sentinelRef} className="h-px w-full" />
        </>
      )}

      <div ref={pageContentRef} id="page-content" className="transition-all duration-300">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/ambulance" element={<Ambulance />} />
          <Route path="/services/blooddonors" element={
            <ProtectedRoute><BloodDonors /></ProtectedRoute>
          } />
          <Route path="/services/bloodbanks" element={
            <ProtectedRoute><BloodBanks /></ProtectedRoute>
          } />
          <Route path="/services/hospitals" element={
            <ProtectedRoute><Hospital /></ProtectedRoute>
          } />
          <Route path="/services/doctor" element={
            <ProtectedRoute><Doctor /></ProtectedRoute>
          } />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;