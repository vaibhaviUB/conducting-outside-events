import { useEffect, useState } from "react";
import { Quote } from "lucide-react";

const quotes = [
  { q: "I went from doomscrolling at midnight to sunrise hikes with people I now call friends. PlanAI gently nudged me, no pressure.", n: "Aarav S.", r: "CS, 3rd year" },
  { q: "The stress slider sounds silly until you actually use it for two weeks. The event suggestions just hit different.", n: "Mei L.", r: "Architecture" },
  { q: "Honestly didn't expect a wellness app to feel this beautiful. Joined a pottery workshop on a whim and stayed for the people.", n: "Diego R.", r: "Mechanical Eng" },
  { q: "Three picnics, one open mic, zero anxiety attacks this month. I'll take it.", n: "Priya K.", r: "Design" },
];

const Testimonials = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % quotes.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative py-24 md:py-32 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-neon-cyan">// voices</div>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-semibold tracking-tight">
            What students <span className="text-gradient">actually say</span>
          </h2>
        </div>

        <div className="relative glass rounded-3xl p-8 sm:p-12 overflow-hidden">
          <Quote className="absolute top-6 right-6 h-16 w-16 text-neon-purple/15" />
          <div className="relative min-h-[180px]">
            {quotes.map((q, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-all duration-700 ${
                  idx === i ? "opacity-100 translate-x-0" : idx < i ? "opacity-0 -translate-x-6" : "opacity-0 translate-x-6"
                }`}
              >
                <p className="font-display text-xl sm:text-2xl leading-relaxed">"{q.q}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-aurora flex items-center justify-center font-display font-semibold text-white" style={{ backgroundSize: "200% 200%" }}>
                    {q.n[0]}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{q.n}</div>
                    <div className="text-xs text-muted-foreground">{q.r}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-2 justify-center">
            {quotes.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Go to quote ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-gradient-aurora" : "w-2 bg-border"}`}
                style={idx === i ? { backgroundSize: "200% 200%" } : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
