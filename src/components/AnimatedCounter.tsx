import { useEffect, useState, useRef } from "react";

interface AnimatedCounterProps {
  targetValue: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export function AnimatedCounter({ targetValue, prefix = "", suffix = "", duration = 2000 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTimestamp: number;
    let animationFrameId: number;
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeProgress * targetValue));
      
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };
    
    animationFrameId = window.requestAnimationFrame(step);
    
    return () => {
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, targetValue, duration]);

  // Convert English numerals to Arabic numerals if needed.
  // Using ar-EG format to get Eastern Arabic numerals (٠١٢٣٤٥٦٧٨٩).
  const formatter = new Intl.NumberFormat("ar-EG", { useGrouping: false });
  const formattedCount = formatter.format(count);

  return (
    <span ref={ref} dir="ltr" className="inline-block">
      {prefix}
      {formattedCount}
      {suffix}
    </span>
  );
}
