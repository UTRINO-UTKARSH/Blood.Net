import { useState, useEffect } from "react";

const useTypewriter = ({
  sentences = [],
  speed = 100,
  pause = 2000,
  deleteText = false,
  loop = false,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState("typing");

  const currentSentence = sentences[currentIndex] || "";

  useEffect(() => {
    if (!currentSentence) return;

    let timer;

    switch (phase) {
      case "typing":
        if (displayText.length < currentSentence.length) {
          timer = setTimeout(() => {
            setDisplayText(
              currentSentence.substring(0, displayText.length + 1)
            );
          }, speed);
        } else {
          timer = setTimeout(() => {
            setPhase("paused");
          }, 0);
        }
        break;

      case "paused":
        timer = setTimeout(() => {
          if (deleteText) {
            setPhase("deleting");
          } else {
            setPhase("finished");
          }
        }, pause);
        break;

      case "deleting":
        if (displayText.length > 0) {
          timer = setTimeout(() => {
            setDisplayText(
              currentSentence.substring(0, displayText.length - 1)
            );
          }, speed / 2.2);
        } else {
          timer = setTimeout(() => {
            if (loop) {
              setCurrentIndex((prev) => (prev + 1) % sentences.length);
              setPhase("typing");
            } else {
              setPhase("finished");
            }
          }, 0);
        }
        break;

      default:
        break;
    }

    return () => clearTimeout(timer);
  }, [
    displayText,
    currentSentence,
    phase,
    speed,
    pause,
    deleteText,
    loop,
    sentences.length,
  ]);

  const next = () => {
    if (currentIndex < sentences.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setDisplayText("");
      setPhase("typing");
    } else if (loop) {
      setCurrentIndex(0);
      setDisplayText("");
      setPhase("typing");
    }
  };

  const reset = () => {
    setCurrentIndex(0);
    setDisplayText("");
    setPhase("typing");
  };

  return {
    displayText,
    phase,
    currentIndex,
    next,
    reset,
  };
};

const Typewriter = ({
  sentences = [],
  speed,
  pause,
  deleteText,
  loop,
  className = "",
}) => {
  const { displayText } = useTypewriter({
    sentences,
    speed,
    pause,
    deleteText,
    loop,
  });

  return (
    <div
      className={` ${className}`}
    >
      {displayText}
      <span className="animate-pulse">|</span>
    </div>
  );
};

export default Typewriter;