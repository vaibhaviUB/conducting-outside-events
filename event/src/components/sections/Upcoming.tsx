import { Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import yogaImg from "@/assets/up-yoga.jpg";
import openmicImg from "@/assets/up-openmic.jpg";
import trailImg from "@/assets/up-trail.jpg";
import potteryImg from "@/assets/up-pottery.jpg";
import stargazingImg from "@/assets/up-stargazing.jpg";

const events = [
  { date: "Apr 24", time: "06:30", title: "Sunrise Lakeside Yoga", loc: "Northshore Park", track: "Wellness", img: yogaImg },
  { date: "Apr 27", time: "18:00", title: "Open Mic Night", loc: "Quad Lawn", track: "Cultural", img: openmicImg },
  { date: "Apr 30", time: "08:00", title: "Trail Run + Brunch", loc: "Cedar Ridge", track: "Sports", img: trailImg },
  { date: "May 03", time: "14:00", title: "Pottery Workshop", loc: "Studio B", track: "Workshop", img: potteryImg },
  { date: "May 07", time: "19:30", title: "Stargazing Picnic", loc: "Hillview Field", track: "Picnic", img: stargazingImg },
];

const Upcoming = () => (
  <section id="upcoming" className="relative py-24 md:py-32 px-4">
    <div className="container mx-auto max-w-5xl">
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-xs font-mono uppercase tracking-[0.2em] text-neon-cyan">// upcoming</div>
        <h2 className="mt-3 font-display text-4xl sm:text-5xl font-semibold tracking-tight">
          What's <span className="text-gradient">happening next</span>
        </h2>
      </div>

      <div className="mt-12 glass rounded-3xl p-2 sm:p-4">
        <ul className="divide-y divide-border/40">
          {events.map((e, i) => (
            <li
              key={e.title}
              className="group grid grid-cols-[auto_auto_1fr_auto] items-center gap-3 sm:gap-5 px-2 sm:px-4 py-4 rounded-2xl transition hover:bg-muted/30 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              {/* date pill */}
              <div className="flex flex-col items-center justify-center w-12 sm:w-16 rounded-xl glass-strong border border-border/40 py-2 group-hover:shadow-glow transition shrink-0">
                <span className="text-[9px] sm:text-[10px] font-mono uppercase text-neon-cyan">{e.date.split(" ")[0]}</span>
                <span className="font-display text-lg sm:text-xl font-semibold">{e.date.split(" ")[1]}</span>
              </div>

              {/* photo thumbnail */}
              <div className="relative h-14 w-14 sm:h-20 sm:w-28 overflow-hidden rounded-xl border border-border/40 shrink-0">
                <img
                  src={e.img}
                  alt={e.title}
                  loading="lazy"
                  width={600}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-display text-base sm:text-lg font-semibold truncate">{e.title}</h3>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground rounded-full border border-border/40 px-2 py-0.5 hidden sm:inline-block">
                    {e.track}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-2 sm:gap-3 text-xs text-muted-foreground flex-wrap">
                  <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{e.time}</span>
                  <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{e.loc}</span>
                  <span className="hidden sm:inline-flex items-center gap-1"><Calendar className="h-3 w-3" />2026</span>
                </div>
              </div>

              <Button size="sm" className="rounded-full bg-gradient-aurora text-white shadow-glow hover:shadow-neon shrink-0" style={{ backgroundSize: "200% 200%" }}>
                Register
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default Upcoming;
