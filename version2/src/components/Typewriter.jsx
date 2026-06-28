import { useTypewriter } from "../hooks/useTypewriter";
const Typewriter = ({
  cursor,
  sentences = [],
  speed,
  pause,
  deleteText,
  loop,
  className = "",
}) => {
  const { displayText } = useTypewriter({
    cursor,
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
      <span className="animate-pulse">{cursor}</span>
    </div>
  );
};
export default Typewriter;