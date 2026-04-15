import { motion } from "framer-motion";
import { Trophy, Users, Music, Palette, TreePine, Gamepad2 } from "lucide-react";

const features = [
  {
    icon: Trophy,
    title: "Sports & Competitions",
    description: "Cricket, football, relay races, and fun sports challenges to get moving.",
  },
  {
    icon: Music,
    title: "Cultural Programs",
    description: "Music performances, dance shows, and open mic nights to express yourself.",
  },
  {
    icon: TreePine,
    title: "Picnics & Outings",
    description: "Nature walks, campus picnics, and outdoor movie nights under the stars.",
  },
  {
    icon: Palette,
    title: "Creative Workshops",
    description: "Art jams, photography walks, and DIY craft sessions to spark creativity.",
  },
  {
    icon: Users,
    title: "Team Building",
    description: "Group challenges and icebreakers that strengthen friendships and teamwork.",
  },
  {
    icon: Gamepad2,
    title: "Fun & Games",
    description: "Treasure hunts, trivia, and carnival-style games for pure enjoyment.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold">
            Events That <span className="text-gradient">Energize</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            From adrenaline-pumping sports to calming creative workshops — there's something for everyone.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="group rounded-2xl border border-border bg-card p-8 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center mb-5">
                <feature.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
