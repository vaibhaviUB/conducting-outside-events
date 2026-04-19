import { HeartPulse, Users, Trophy, Handshake } from "lucide-react";

const items = [
  { icon: HeartPulse, title: "Stress Relief", desc: "Step away from screens. Breathe, move, and reset your nervous system through guided outdoor experiences." },
  { icon: Users, title: "Social Life", desc: "Find your people. Outside events make it effortless to meet students who match your vibe." },
  { icon: Trophy, title: "Confidence", desc: "Small wins compound. Each event is a low-pressure way to grow comfortable being yourself." },
  { icon: Handshake, title: "Teamwork", desc: "Collaborate without grades. Learn to lead, listen, and trust through shared experiences." },
];

const About = () => (
  <section id="about" className="relative py-24 md:py-32 px-4">
    <div className="container mx-auto">
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-xs font-mono uppercase tracking-[0.2em] text-neon-cyan">// about</div>
        <h2 className="mt-3 font-display text-4xl sm:text-5xl font-semibold tracking-tight">
          Why <span className="text-gradient">stepping outside</span> matters
        </h2>
        <p className="mt-4 text-muted-foreground">
          Real connection happens beyond the lecture hall. Here's what an hour outside actually does for you.
        </p>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <div
            key={it.title}
            className="glass glow-hover rounded-2xl p-6 group animate-fade-in-up"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-aurora shadow-glow" style={{ backgroundSize: "200% 200%" }}>
              <it.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold">{it.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
            <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
            <div className="mt-3 text-xs font-mono text-muted-foreground/60">0{i + 1} / 04</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default About;
