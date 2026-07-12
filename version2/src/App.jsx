import React from 'react'
import { useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar'
import Home from './pages/Home'
import Donate from './pages/Donate'

const AppContent = () => {
  const sentinelRef = useRef(null);
  const pageContentRef = useRef(null);
  const location = useLocation();

  const hideNavbarRoutes = ['/login', '/signup'];
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
        <div className="relative pt-13 px-4 sm:px-0">
          <Navbar />
        </div>
      )}

      <div ref={sentinelRef} className="h-px w-full" />

      <div ref={pageContentRef} id="page-content" className="transition-all duration-300">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/donate" element={<Donate />} />
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

export default App