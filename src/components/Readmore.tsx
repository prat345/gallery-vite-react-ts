import React, { useEffect, useRef, useState } from "react";

interface ReadmoreProps {
  text: String;
}
const Readmore: React.FC<ReadmoreProps> = ({ text }) => {
  // text = "-".repeat(100);
  const [lessThanThree, setLessThanThree] = useState(true);
  const [showReadMore, setShowReadMore] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      console.log(ref.current.scrollHeight, ref.current.clientHeight);
      // if line > 3, show readmore btn (line-height 22)
      if (ref.current.clientHeight >= 22 * 3) {
        setShowReadMore(true);
      }
    }
  }, [lessThanThree, showReadMore]);

  return (
    <p>
      <span
        className={lessThanThree ? "line-clamp-3" : "line-clamp-5"}
        ref={ref}
      >
        {text}
      </span>
      {showReadMore && (
        <span
          className="text-blue-500 font-medium cursor-pointer hover:text-gray-600 transition-colors duration-300"
          onClick={() => setLessThanThree(!lessThanThree)}
        >
          {lessThanThree ? " Read more" : "  Close"}
        </span>
      )}
    </p>
  );
};

export default Readmore;
