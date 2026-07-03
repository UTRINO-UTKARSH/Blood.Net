import React, { useEffect, useRef, useState } from "react";
import Typewriter from "./Typewriter";
import StoryScreen from "./StoryScreen";

const Problem = ({data,title1,title2}) => {
  const [currentScreen, setScreen] = useState(0);
  const sentinelRef = useRef(null);
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  const handleText = () => {
    setTimeout(() => {
      setScreen((prev) => (prev < data.length - 1 ? prev + 1 : prev));
    }, 2000);
  };

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
      { root: null, threshold: 0.5 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    // issue if remove justify-center then the typeing will start for the both the stories and the use will miss the second section content
    <div className="intro flex flex-col gap-4 min-h-screen h-screen relative mt-10 text-white  px-4 py-10 sm:px-6 overflow-hidden">
      <div className="relative flex flex-col top-9 z-50 items-center justify-center transition-all duration-500 ease-out mx-auto w-full px-8">
        <span className="text-8xl font-sans tracking-wider font-bold">{title1}</span>
        <span className="text-5xl font-semibold tracking-wider">{title2}</span>

        {/* <span
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
        </span> */}
      </div>

      <div ref={sentinelRef} className="h-px w-full" aria-hidden="true" />

      <div
        ref={sectionRef}
        className="whitespace-pre-wrap justify-center items-center gap-5 flex-col flex py-2 h-fit"
      >
        {inView && (
          <StoryScreen
            key={currentScreen}
            cursor="_"
           className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl px-20 py-15 storyScreen-intro ${data[currentScreen].type == "question"
                ?"text-red-400 drop-shadow-[0_0_12px_rgba(220,38,38,0.8)] animate-pulse"
                :"text-white"}`}
            text={data[currentScreen].text}
            onComplete={handleText}
          />
        )}
      </div>
    </div>
  );
};

export default Problem;