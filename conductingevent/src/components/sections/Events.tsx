import { Activity, Music2, TreePine, Wrench, Trophy } from "lucide-react";
import sportsImg from "@/assets/event-sports.jpg";
import culturalImg from "@/assets/event-cultural.jpg";
import picnicImg from "@/assets/event-picnic.jpg";
import workshopImg from "@/assets/event-workshop.jpg";
import competitionImg from "@/assets/event-competition.jpg";

const events = [
  { icon: Activity, title: "Sports", desc: "Pickup games, runs, yoga in the park.", tag: "Daily", img: sportsImg },
  { icon: Music2, title: "Cultural", desc: "Open mics, dance nights, film clubs.", tag: "Weekly", img: culturalImg },
  { icon: TreePine, title: "Picnics", desc: "Sunset hangouts and lakeside chill.", tag: "Weekend", img: picnicImg },
  { icon: Wrench, title: "Workshops", desc: "Pottery, journaling, sound baths.", tag: "Monthly", img: workshopImg },
  { icon: Trophy, title: "Competitions", desc: "Hackathons, quizzes, debates.", tag: "Quarterly", img: competitionImg },
];

const Events = () => (
  <section id="events" className="relative py-24 md:py-32 px-4">
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
        <div>
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-neon-cyan">// events</div>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-semibold tracking-tight max-w-xl">
            Pick a vibe.<br />
            <span className="text-gradient">We'll handle the rest.</span>
          </h2>
        </div>
        <p className="text-muted-foreground max-w-md">
          Five tracks, hundreds of events. From quiet morning hikes to loud open mics — there's something
          for every mood and energy level.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((e, i) => (
          <div
            key={e.title}
            className="group relative overflow-hidden rounded-2xl glass min-h-[340px] sm:min-h-[380px] glow-hover animate-fade-in-up"
            style={{ animationDelay: `${i * 0.07}s` }}
          >
            {/* photo */}
            <img
              src={e.img}
              alt={`${e.title} event`}
              loading="lazy"
              width={1024}
              height={800}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* dark gradient overlay for legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/10" />

            {/* hover neon glow */}
            <div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-neon-purple/40 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-neon-blue/40 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* content */}
            <div className="relative h-full flex flex-col justify-between p-6 sm:p-7">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl glass-strong border border-border/40 group-hover:shadow-glow transition">
                  <e.icon className="h-6 w-6 text-neon-cyan" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-foreground/80 rounded-full glass-strong border border-border/40 px-2.5 py-1">
                  {e.tag}
                </span>
              </div>

              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold">{e.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{e.desc}</p>
                <div className="mt-5 inline-flex items-center text-sm font-medium text-neon-cyan group-hover:gap-2 transition-all gap-1">
                  Browse {e.title.toLowerCase()}
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Events;
