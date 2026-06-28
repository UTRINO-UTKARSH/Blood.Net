import React, { useEffect, useRef, useState } from "react";
import Typewriter from "./Typewriter";
import StoryScreen from "./StoryScreen";
const Problem = () => {
  // const [isTyping, setisTyping] = useState(false)
  //start here
  //fix or make the check for the scroll and typing for option C
  // const [isScrolled, setisScrolled] = useState(false)
  const sentinelRef = useRef(null);
  const [currentScreen, setScreen] = useState(0);
  const sectionRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [inView, setInView] = useState(false);
  const handleText = () => {
    // setisTyping(true)
    setScreen(currentScreen => currentScreen + 1)
  }
  // useEffect(() => {

  //   if (isTyping && isScrolled == true) {
  //     setScreen(prev)

  //   }

  // }, [])
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
        threshold: 0.5
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const story = [
    "Medical emergencies\nnever come with\na warning.",

    "One moment...\n\neverything feels\nnormal.",

    "Then suddenly...\n\nsomeone you love\nneeds immediate help.",

    "You call\nfor help.\n\nAn ambulance\nis already\non its way.",

    "But while\nhelp is coming...\n\nyour mind\nstarts racing.",

    "Which hospital\nshould we go to?",

    "Will they have\nthe blood\nthat's needed?",

    "What should\nI do\nright now?",

    "How can I help\nbefore\nprofessionals arrive?",

    "Am I making\nthe right\ndecisions?",

    "The hardest moments\naren't always\nabout waiting.",

    "Sometimes...\n\nit's simply\nnot knowing\nwhat to do next."
  ];

  return (
    <div className="intro relative text-white px-4 sm:px-6">
      <div
        className={`sticky flex flex-col top-9 z-50 items-center justify-center transition-all duration-500 ease-out mx-auto w-full px-8 ${scrolled
          ? "py-5 bg-black rounded-3xl shadow-2xl"
          : "py-6 sm:py-14 bg-transparent"
          }`}
      >
        <span
          className={`font-bold tracking-tight text-center transition-all duration-500 ${scrolled ? "text-4xl md:text-6xl" : "text-6xl md:text-7xl"
            }`}
        >
          When Every
        </span>
        <span
          className={`font-semibold text-center transition-all duration-500 ${scrolled ? "text-lg md:text-2xl" : "text-2xl md:text-4xl"
            }`}
        >
          Second Matters...
        </span>
      </div>
      <div ref={sentinelRef} className="h-px w-full" aria-hidden="true" />
      <div
        ref={sectionRef}
        className="whitespace-pre-wrap intro justify-center items-center  gap-5 flex-col flex py-2 h-1/10"
      >
        {inView && (
          <StoryScreen
            key={currentScreen}
            cursor="_"
            className=' text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl py-15 storyScreen-intro'
            text={story[currentScreen]}
            onComplete={handleText}
          />
          //map logic heavy option B
          //option A just was heavy as fuck so changed it...🥲
          // story.map((item,index) => (
          //   <StoryScreen
          //     key={index}
          //     cursor="_"
          //     className=' text-3xl text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl py-15 storyScreen-intro'
          //     text={item}
          //     onComplete={handleText}
          //   />
          // ))
        )}
      </div>
    </div>
  );
};
export default Problem;