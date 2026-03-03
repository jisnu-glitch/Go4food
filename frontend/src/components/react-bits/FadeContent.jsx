import { useEffect, useRef, useState } from 'react';

const FadeContent = ({ children, blur = false, duration = 1000, easing = 'ease-out', initialOpacity = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once it fades in
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : initialOpacity,
        filter: blur ? (isVisible ? 'blur(0px)' : 'blur(10px)') : 'none',
        transition: `opacity ${duration}ms ${easing}, filter ${duration}ms ${easing}, transform ${duration}ms ${easing}`,
        transform: isVisible ? 'translateY(0px)' : 'translateY(30px)'
      }}
    >
      {children}
    </div>
  );
};

export default FadeContent;