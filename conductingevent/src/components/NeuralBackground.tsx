import { useEffect, useRef } from "react";
import eventBg from "@/assets/event-bg.jpg";

/**
 * AI Neural Network animated background.
 * - Floating glowing nodes connected by neural lines
 * - Soft mouse interaction (nearest particles drift toward cursor)
 * - Drifting gradient blobs + subtle grid (handled in parent overlay)
 * - Calm, slow movement; respects prefers-reduced-motion
 */
const NeuralBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = (canvas.width = window.innerWidth * window.devicePixelRatio);
    let height = (canvas.height = window.innerHeight * window.devicePixelRatio);
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    const dpr = window.devicePixelRatio || 1;

    type P = { x: number; y: number; vx: number; vy: number; r: number; hue: number };
    const count = Math.min(90, Math.floor((window.innerWidth * window.innerHeight) / 22000));
    const particles: P[] = Array.from({ length: count }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25 * dpr,
      vy: (Math.random() - 0.5) * 0.25 * dpr,
      r: (Math.random() * 1.5 + 0.6) * dpr,
      hue: Math.random() < 0.5 ? 215 : Math.random() < 0.5 ? 280 : 190,
    }));

    const onResize = () => {
      width = canvas.width = window.innerWidth * dpr;
      height = canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    };

    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX * dpr;
      mouseRef.current.y = e.clientY * dpr;
    };
    const onLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);

    const linkDist = 140 * dpr;
    const mouseDist = 180 * dpr;

    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      // Soft vignette / glow underlay
      const grad = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height) / 1.2);
      grad.addColorStop(0, "rgba(40, 60, 180, 0.08)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // mouse attraction
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const ddx = mx - p.x;
        const ddy = my - p.y;
        const md = Math.hypot(ddx, ddy);
        if (md < mouseDist) {
          const force = (1 - md / mouseDist) * 0.05;
          p.vx += (ddx / (md || 1)) * force;
          p.vy += (ddy / (md || 1)) * force;
        }

        // gentle damping
        p.vx *= 0.985;
        p.vy *= 0.985;

        if (!reduce) {
          p.x += p.vx;
          p.y += p.vy;
        }

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, 0.85)`;
        ctx.shadowBlur = 14;
        ctx.shadowColor = `hsla(${p.hue}, 100%, 60%, 0.9)`;
        ctx.fill();
        ctx.shadowBlur = 0;

        // links
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d = Math.hypot(dx, dy);
          if (d < linkDist) {
            const a = (1 - d / linkDist) * 0.35;
            ctx.strokeStyle = `hsla(${(p.hue + q.hue) / 2}, 100%, 65%, ${a})`;
            ctx.lineWidth = 0.6 * dpr;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base color */}
      <div className="absolute inset-0 bg-background" />

      {/* event photo backdrop */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-90"
        style={{ backgroundImage: `url(${eventBg})` }}
      />
      <div className="absolute inset-0 bg-background/20" />

      {/* aurora gradient blobs */}
      <div className="absolute -top-1/3 -left-1/4 h-[80vh] w-[80vh] rounded-full opacity-40 blur-3xl bg-gradient-aurora animate-aurora" style={{ backgroundSize: "200% 200%" }} />
      <div className="absolute -bottom-1/3 -right-1/4 h-[80vh] w-[80vh] rounded-full opacity-30 blur-3xl bg-gradient-hero animate-aurora" style={{ backgroundSize: "200% 200%", animationDelay: "-4s" }} />
      <div className="absolute top-1/3 left-1/2 h-[40vh] w-[40vh] -translate-x-1/2 rounded-full opacity-25 blur-3xl bg-neon-purple/40 animate-pulse-glow" />

      {/* subtle grid */}
      <div className="absolute inset-0 bg-grid mask-fade opacity-40" />

      {/* light beams */}
      <div className="absolute left-[10%] top-0 h-full w-px bg-gradient-to-b from-transparent via-neon-cyan/30 to-transparent" />
      <div className="absolute right-[18%] top-0 h-full w-px bg-gradient-to-b from-transparent via-neon-purple/30 to-transparent" />

      {/* neural canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* top vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/80" />
    </div>
  );
};

export default NeuralBackground;
