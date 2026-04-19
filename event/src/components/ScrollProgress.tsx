import { useEffect, useState } from "react";

const ScrollProgress = () => {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-50 h-0.5 w-full bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple shadow-glow transition-[width] duration-100"
        style={{ width: `${p}%` }}
      />
    </div>
  );
};

export default ScrollProgress;
