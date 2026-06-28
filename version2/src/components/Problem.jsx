import React, { useEffect, useRef, useState } from "react";
import Typewriter from "./Typewriter";
import StoryScreen from "./StoryScreen";
const Problem = () => {
    const sentinelRef = useRef(null);
  const sectionRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "-165px 0px 0px ",
        threshold: 0.3,
      }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

 useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        threshold:0.3
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="intro relative text-white px-4 sm:px-6">
      <div
        className={`sticky flex flex-col top-8 z-50 items-center justify-center transition-all duration-500 ease-out mx-auto w-full px-8 ${
          scrolled
            ? "py-5 bg-black rounded-3xl shadow-2xl"
            : "py-6 sm:py-14 bg-transparent"
        }`}
      >
        <span
          className={`font-bold tracking-tight text-center transition-all duration-500 ${
            scrolled ? "text-4xl md:text-6xl" : "text-6xl md:text-7xl"
          }`}
        >
          When Every
        </span>
        <span
          className={`font-semibold text-center transition-all duration-500 ${
            scrolled ? "text-lg md:text-2xl" : "text-2xl md:text-4xl"
          }`}
        >
          Second Matters...
        </span>
      </div>
     <div ref={sentinelRef} className="h-px w-full" aria-hidden="true" />
      <div
        ref={sectionRef}
        className="whitespace-pre-wrap justify-center items-center gap-5 flex-col flex py-2 h-1/2"
      >
        {inView && (
          <StoryScreen 
           className=' text-4xl storyScreen-intro'  
           text={"Medical emergency never\n come told but sudden"} />
        )}
      </div>
      <div
        ref={sectionRef}
        className="whitespace-pre-wrap justify-center items-center gap-5 flex-col flex py-2 h-1/2"
      >
        {inView && (
          <StoryScreen 
           className=' text-4xl storyScreen-intro'  
           text={"Medical emergency never\n come told but sudden"} />
        )}
      </div>
      <div
        ref={sectionRef}
        className="whitespace-pre-wrap justify-center items-center gap-5 flex-col flex py-2 h-1/2"
      >
        {inView && (
          <StoryScreen 
           className=' text-4xl storyScreen-intro'  
           text={"Medical emergency never\n come told but sudden"} />
        )}
      </div>
    </div>
  );
};

export default Problem;