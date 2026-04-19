import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

const items = [
  { src: g1, label: "Hackathon Night", span: "md:col-span-2 md:row-span-2" },
  { src: g2, label: "Sunset Basketball", span: "" },
  { src: g3, label: "Cultural Dance", span: "" },
  { src: g4, label: "Hilltop Picnic", span: "md:col-span-2" },
  { src: g5, label: "Painting Workshop", span: "" },
  { src: g6, label: "Sunrise Hike", span: "" },
];

const Gallery = () => (
  <section id="gallery" className="relative py-24 md:py-32 px-4">
    <div className="container mx-auto">
      <div className="mx-auto max-w-2xl text-center mb-12">
        <div className="text-xs font-mono uppercase tracking-[0.2em] text-neon-cyan">// gallery</div>
        <h2 className="mt-3 font-display text-4xl sm:text-5xl font-semibold tracking-tight">
          Moments worth <span className="text-gradient">stepping out for</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] sm:auto-rows-[220px] gap-3 sm:gap-4">
        {items.map((it, i) => (
          <figure
            key={it.label}
            className={`group relative overflow-hidden rounded-2xl glass animate-fade-in-up ${it.span}`}
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <img
              src={it.src}
              alt={it.label}
              loading="lazy"
              width={800}
              height={800}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-70 group-hover:opacity-90 transition" />
            <figcaption className="absolute bottom-3 left-4 right-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <span className="text-xs font-mono uppercase tracking-widest text-neon-cyan">moment</span>
              <div className="font-display text-lg font-semibold">{it.label}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

export default Gallery;
