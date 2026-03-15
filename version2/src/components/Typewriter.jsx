import { useState, useEffect } from 'react';

const useTypewriter = (words, speed = 100, pause = 2000) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(speed);

  useEffect(() => {
    const handleTyping = () => {
      const currentWordIndex = loopIndex % words.length;
      const fullWord = words[currentWordIndex];

      if (isDeleting) {
        // Remove a character
        setDisplayText(fullWord.substring(0, displayText.length - 1));
        setTypingSpeed(speed / 2); // Delete faster
      } else {
        // Add a character
        setDisplayText(fullWord.substring(0, displayText.length + 1));
        setTypingSpeed(speed);
      }

      // Logic: Word is fully typed
      if (!isDeleting && displayText === fullWord) {
        setTimeout(() => setIsDeleting(true), pause); // Wait before deleting
      } 
      // Logic: Word is fully deleted
      else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setLoopIndex(loopIndex + 1); // Move to next sentence
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopIndex, words, speed, pause,typingSpeed]);

  return displayText;
};

// Usage Component
const Typewriter = () => {
  const sentences = ["How Do we work. ", "What we offer", "Our Features"];
  const displayText = useTypewriter(sentences);

  return (
    <div className='text-7xl'>
      {displayText}
      <span className="cursor"> |</span>
    </div>
  );
};

export default Typewriter;