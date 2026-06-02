import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Donate from './pages/Donate'
const App = () => {
  const sentinelRef = useRef(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When sentinel is out of view, add fade class to content
        document.getElementById('page-content').style.WebkitMaskImage = entry.isIntersecting
          ? 'none'
          : 'linear-gradient(to bottom, transparent 0px, black 80px)';
        document.getElementById('page-content').style.maskImage = entry.isIntersecting
          ? 'none'
          : 'linear-gradient(to bottom, transparent 0px, black 80px)';
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);
  return (
    <BrowserRouter>
      <div className="bg-[#121212] min-h-full">

        {/* Navbar is HERE — outside Routes, so it shows on every page */}
        <div className="relative z-10 pt-13 px-4 sm:px-0">
          <Navbar />
        </div>
        <div ref={sentinelRef} className="h-px w-full" /> 
       <div id="page-content" className="transition-all duration-300">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Donate" element={<Donate />} />
            <Route path="/donate" element={<Donate />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App