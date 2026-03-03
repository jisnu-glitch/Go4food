import { useEffect, useRef, useState } from 'react';

const SplitText = ({ text, className, delay = 50, threshold = 0.2, rootMargin = '-50px' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  let charCount = 0; // Tracks global character index for sequential staggering

  return (
    <div ref={ref} className={className} style={{ display: 'inline-block', overflow: 'hidden' }}>
      {text.split(' ').map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.split('').map((char, charIndex) => {
            const currentIndex = charCount;
            charCount++;
            return (
              <span
                key={charIndex}
                style={{
                  display: 'inline-block',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  // Using a cubic-bezier easing for a premium, snappy feel
                  transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${currentIndex * delay}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${currentIndex * delay}ms`,
                }}
              >
                {char}
              </span>
            );
          })}
          {/* Add a space after each word */}
          <span style={{ display: 'inline-block', width: '0.3em' }}>&nbsp;</span>
        </span>
      ))}
    </div>
  );
};

export default SplitText;