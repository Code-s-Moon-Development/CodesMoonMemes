import { useState, useEffect, useRef } from "react";

export default function useOnScreen(ref) {
    const [isOnScreen, setIsOnScreen] = useState(false);
    const observerRef = useRef(null);
  
    useEffect(() => {
      observerRef.current = new IntersectionObserver(([entry]) =>
        setIsOnScreen(entry.isIntersecting)
      );
    }, []);
  
    useEffect(() => {
      if (ref.current) observerRef.current.observe(ref.current);
  
      return () => {
        observerRef.current.disconnect();
      };
    }, [ref]);
  
    return isOnScreen;
}
