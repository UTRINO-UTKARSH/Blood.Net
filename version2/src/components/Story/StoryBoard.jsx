import React, { useEffect, useRef, useState, useCallback } from "react";
import StoryScreen from "./StoryScreen";
// the code in the ../components/mid-refactors are refactored here again by claud to optimize it

const TOUCH_THRESHOLD_PX = 1;

const StoryBoard = ({ onStoryEnd,title1,title2,data }) => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [inView,        setInView]        = useState(false);
  const [scrolled,      setScrolled]      = useState(false);

  const waitingForAdvance = useRef(false);
  const isAtEnd           = useRef(false);
  const touchAnchor       = useRef(0);
  const sentinelRef       = useRef(null);
  const sectionRef        = useRef(null);

  // ── Advance story /sroll effect
  const advance = useCallback(() => {
    if (!waitingForAdvance.current || isAtEnd.current) return;
    waitingForAdvance.current = false;
    setCurrentScreen((prev) => {
      const next = prev + 1;
      if (next >= data.length) {
        isAtEnd.current = true;
        // document.body.style.overflow = "";
        onStoryEnd?.();
        return prev;
      }
      return next;
    });
  }, [onStoryEnd,data]);

  // ── Called when typewriter finishes 
  const handleTypingComplete = useCallback(() => {
    if (isAtEnd.current) return;
    waitingForAdvance.current = true;
  }, []);

  // ── Lock scroll when section fully enters view ────────────────────────────
  // Using sectionRef observer at 0.99 so the lock only fires when
  // the user has intentionally scrolled the section into full view.
  useEffect(() => {
    if (!inView || isAtEnd.current) return;
    // document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [inView]);

  // ── Desktop: wheel ────────────────────────────────────────────────────────
  useEffect(() => {
    const onWheel = (e) => {
      if (!waitingForAdvance.current) return;
      if (e.deltaY > 0) advance();
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [advance]);

  // ── Mobile: touch swipe-up ────────────────────────────────────────────────
  useEffect(() => {
    const onTouchStart = (e) => { touchAnchor.current = e.touches[0].clientY; };
    const onTouchEnd   = (e) => {
      if (!waitingForAdvance.current) return;
      if (touchAnchor.current - e.changedTouches[0].clientY > TOUCH_THRESHOLD_PX) advance();
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend",   onTouchEnd,   { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend",   onTouchEnd);
    };
  }, [advance]);

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
  // threshold: 0.99 = almost fully visible before locking scroll.
  // This prevents premature lock when section is only peeking into view.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
      },
      { root: null, threshold: 0.99 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="intro text-white px-4 sm:px-6">

      {/* ── relative wrapper: title sticks only within this boundary ── */}
      {/* <div className="relative"> */}

        <div
          className={`sticky flex flex-col top-9 z-50 items-center justify-center
            transition-all duration-500 ease-out mx-auto w-fit px-40
            ${scrolled ? "py-5 bg-black rounded-3xl shadow-2xl" : "py-6 sm:py-14 bg-transparent"}`}
        >
          <span className={`font-bold tracking-tight text-center transition-all duration-500
            ${scrolled ? "text-4xl md:text-6xl" : "text-6xl md:text-7xl"}`}>
            {title1}
          </span>
          <span className={`font-semibold text-center transition-all duration-500
            ${scrolled ? "text-lg md:text-2xl" : "text-2xl md:text-4xl"}`}>
            {title2}
          </span>
        </div>

        <div ref={sentinelRef} className="h-px w-full" aria-hidden="true" />

        <div
          ref={sectionRef}
          className="whitespace-pre-wrap justify-center items-center gap-5 flex-col flex py-2 min-h-screen"
        >
          {inView && (
            <StoryScreen
              key={currentScreen}
              cursor="_"
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl px-20 py-15 storyScreen-intro ${data[currentScreen].type == "question"
                ?"text-red-400 drop-shadow-[0_0_12px_rgba(220,38,38,0.8)] animate-pulse"
                :"text-white"}`}
              text={data[currentScreen].text}
              onComplete={handleTypingComplete}
            />
          )}
        </div>

      {/* </div> */}
    </div>
  );
};

export default StoryBoard;