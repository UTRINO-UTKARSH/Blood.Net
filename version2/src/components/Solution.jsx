import React, { useEffect, useRef, useState } from "react";

const Solution = () => {
  const [inView,   setInView]   = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const sentinelRef = useRef(null);
  const sectionRef  = useRef(null);

  // ── Header shrink observer ────────────────────────────────────────────────
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { root: null, rootMargin: "-165px 0px 0px 0px", threshold: 0.3 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // ── Section entry observer ────────────────────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
      },
      { root: null, threshold: 0.5 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="intro text-white px-4 sm:px-6">

      {/* ── relative wrapper: title sticks only within this boundary ── */}
      <div className="relative">

        <div
          className={`sticky flex flex-col top-9 z-50 items-center justify-center
            transition-all duration-500 ease-out mx-auto w-full px-8
            ${scrolled ? "py-5 bg-black rounded-3xl shadow-2xl" : "py-6 sm:py-14 bg-transparent"}`}
        >
          <span className={`font-bold tracking-tight text-center transition-all duration-500
            ${scrolled ? "text-4xl md:text-6xl" : "text-6xl md:text-7xl"}`}>
            Blood.net
          </span>
          <span className={`font-semibold text-center transition-all duration-500
            ${scrolled ? "text-lg md:text-2xl" : "text-2xl md:text-4xl"}`}>
            The Solution.
          </span>
        </div>

        <div ref={sentinelRef} className="h-px w-full" aria-hidden="true" />

        {/* your solution content goes here, ref'd for entry animation */}
        <div
          ref={sectionRef}
          className="flex flex-col items-center justify-center py-2 h-screen"
        >
          {inView && (
            <p className="text-center text-2xl">
              {/* solution content */}
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default Solution;