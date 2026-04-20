import { forwardRef, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/lib/supabase";
import {
  LayoutDashboard, CalendarDays, Compass, Bell, User, LogOut, Search,
  TrendingUp, Sparkles, Zap, Target, ChevronRight, Smile, Meh, Frown,
  MapPin, Clock, Heart, MessageCircle, Award, Mail, Settings, Check, Plus,
} from "lucide-react";
import planaiIcon from "@/assets/planai-icon.png";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ThemeToggle from "@/components/ThemeToggle";
import { toast } from "@/hooks/use-toast";

type TabId = "dashboard" | "events" | "explore" | "notifications" | "profile";

const navItems: { id: TabId; icon: any; label: string }[] = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "events", icon: CalendarDays, label: "My Events" },
  { id: "explore", icon: Compass, label: "Explore" },
  { id: "notifications", icon: Bell, label: "Notifications" },
  { id: "profile", icon: User, label: "Profile" },
];

const initialSuggestions = [
  { id: "s1", title: "Sunset Lakeside Yoga", time: "Today · 18:30", match: 96, tag: "wellness" },
  { id: "s2", title: "Open Mic Night", time: "Fri · 19:00", match: 88, tag: "cultural" },
  { id: "s3", title: "Morning Trail Run", time: "Sat · 07:00", match: 82, tag: "sports" },
];

const moods = [
  { icon: Smile, label: "Calm", value: 20 },
  { icon: Meh, label: "Okay", value: 50 },
  { icon: Frown, label: "Stressed", value: 80 },
];

const initialNotifications = [
  { id: "n1", icon: Heart, color: "text-neon-pink", title: "Priya liked your check-in", time: "2m ago", unread: true },
  { id: "n2", icon: CalendarDays, color: "text-neon-cyan", title: "Sunset Yoga starts in 2 hours", time: "1h ago", unread: true },
  { id: "n3", icon: MessageCircle, color: "text-neon-purple", title: "New comment on Hackathon thread", time: "3h ago", unread: true },
  { id: "n4", icon: Award, color: "text-neon-cyan", title: "You unlocked a 12-day streak 🔥", time: "Yesterday", unread: false },
  { id: "n5", icon: Mail, color: "text-neon-blue", title: "Weekly wellness digest is ready", time: "2 days ago", unread: false },
];

const initialMyEvents = [
  { id: "e1", title: "Sunset Lakeside Yoga", date: "Today", time: "18:30", place: "Lake Pavilion", status: "Going" as const },
  { id: "e2", title: "Hackathon Night", date: "Thu", time: "20:00", place: "CS Block", status: "Going" as const },
  { id: "e3", title: "Open Mic Night", date: "Fri", time: "19:00", place: "Auditorium", status: "Maybe" as const },
  { id: "e4", title: "Sunrise Trail Run", date: "Sat", time: "07:00", place: "Hilltop Gate", status: "Going" as const },
];

const exploreItems = [
  { id: "x1", tag: "wellness", title: "Forest Bathing Walk", blurb: "Slow, sensory walk through the campus woods." },
  { id: "x2", tag: "cultural", title: "Indie Film Screening", blurb: "Short films from student directors + Q&A." },
  { id: "x3", tag: "sports", title: "Friday Football", blurb: "Casual 5-a-side. All skill levels welcome." },
  { id: "x4", tag: "workshop", title: "Pottery Basics", blurb: "Get your hands muddy and make a mug." },
  { id: "x5", tag: "wellness", title: "Guided Meditation", blurb: "20 minutes of stillness. Bring a cushion." },
  { id: "x6", tag: "cultural", title: "Poetry Slam", blurb: "Open stage. Bring words, leave lighter." },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { data: supabaseProfile } = useProfile();
  const [active, setActive] = useState<TabId>("dashboard");
  const [stress, setStress] = useState([42]);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState(initialSuggestions);
  const [myEvents, setMyEvents] = useState(initialMyEvents);
  const [notifs, setNotifs] = useState(initialNotifications);
  const [joinedExplore, setJoinedExplore] = useState<string[]>([]);
  const [addOpen, setAddOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", time: "", place: "" });
  const [profile, setProfile] = useState({
    name: "User",
    bio: "",
    interests: ["wellness", "cultural", "outdoor"],
  });
  const [editOpen, setEditOpen] = useState(false);

  // Sync real profile data from Supabase once loaded
  useEffect(() => {
    if (supabaseProfile) {
      setProfile((prev) => ({
        ...prev,
        name: supabaseProfile.name,
        bio: supabaseProfile.bio || prev.bio,
      }));
    }
  }, [supabaseProfile]);
  const [editProfile, setEditProfile] = useState(profile);
  const [interestsInput, setInterestsInput] = useState(profile.interests.join(", "));

  const openEditProfile = () => {
    setEditProfile(profile);
    setInterestsInput(profile.interests.join(", "));
    setEditOpen(true);
  };

  const handleSaveProfile = () => {
    const name = editProfile.name.trim();
    if (!name) {
      toast({ title: "Name required", description: "Please add your name." });
      return;
    }
    const interests = interestsInput
      .split(",")
      .map((t) => t.trim().toLowerCase().slice(0, 20))
      .filter(Boolean)
      .slice(0, 6);
    setProfile({
      name: name.slice(0, 60),
      bio: editProfile.bio.trim().slice(0, 120),
      interests,
    });
    toast({ title: "Profile updated", description: "Your changes have been saved." });
    setEditOpen(false);
  };

  const eventsAttended = 8;
  const eventsGoal = 12;
  const progress = (eventsAttended / eventsGoal) * 100;
  const unreadCount = notifs.filter((n) => n.unread).length;

  const handleJoinSuggestion = (id: string, title: string) => {
    setSuggestions((prev) => prev.filter((s) => s.id !== id));
    setMyEvents((prev) => [
      ...prev,
      { id: `e-${Date.now()}`, title, date: "New", time: "TBD", place: "Campus", status: "Going" },
    ]);
    toast({ title: "Joined!", description: `${title} added to My Events.` });
  };

  const handleToggleStatus = (id: string) => {
    setMyEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: e.status === "Going" ? "Maybe" : "Going" } : e)),
    );
  };

  const handleRemoveEvent = (id: string, title: string) => {
    setMyEvents((prev) => prev.filter((e) => e.id !== id));
    toast({ title: "Removed", description: `${title} removed from My Events.` });
  };

  const handleAddEvent = () => {
    const title = newEvent.title.trim();
    if (!title) {
      toast({ title: "Title required", description: "Please add an event title." });
      return;
    }
    setMyEvents((prev) => [
      ...prev,
      {
        id: `e-${Date.now()}`,
        title: title.slice(0, 100),
        date: newEvent.date.trim().slice(0, 20) || "Soon",
        time: newEvent.time.trim().slice(0, 20) || "TBD",
        place: newEvent.place.trim().slice(0, 60) || "Campus",
        status: "Going" as const,
      },
    ]);
    toast({ title: "Event added", description: `${title} added to My Events.` });
    setNewEvent({ title: "", date: "", time: "", place: "" });
    setAddOpen(false);
  };

  const handleExploreJoin = (id: string, title: string) => {
    if (joinedExplore.includes(id)) return;
    setJoinedExplore((prev) => [...prev, id]);
    setMyEvents((prev) => [
      ...prev,
      { id: `e-${Date.now()}`, title, date: "Soon", time: "TBD", place: "Campus", status: "Going" },
    ]);
    toast({ title: "Added to your plans", description: title });
  };

  const handleMarkRead = (id: string) => {
    setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));
  };

  const handleMarkAllRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, unread: false })));
    toast({ title: "Inbox cleared", description: "All notifications marked as read." });
  };

  const handleClearNotif = (id: string) => {
    setNotifs((prev) => prev.filter((n) => n.id !== id));
  };

  const filteredSearch = useMemo(() => {
    if (!search.trim()) return null;
    const q = search.toLowerCase();
    return [
      ...exploreItems.filter((e) => e.title.toLowerCase().includes(q) || e.tag.includes(q)),
      ...suggestions.filter((s) => s.title.toLowerCase().includes(q)),
    ];
  }, [search, suggestions]);

  return (
    <div className="relative min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border/30 backdrop-blur-xl bg-background/40 sticky top-0 h-screen">
        <div className="p-5 border-b border-border/30">
          <Link to="/" className="flex items-center gap-2 group" aria-label="PlanAI home">
            <img src={planaiIcon} alt="PlanAI logo" className="h-12 w-12 object-contain" />
            <span className="font-display text-2xl font-semibold text-white">
              Plan<span className="text-gradient">AI</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((it) => {
            const isActive = active === it.id;
            const badge = it.id === "notifications" ? unreadCount : 0;
            return (
              <button
                key={it.id}
                onClick={() => setActive(it.id)}
                className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition group ${
                  isActive
                    ? "bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 text-foreground shadow-glow border border-border/40"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                }`}
              >
                <it.icon className={`h-4 w-4 ${isActive ? "text-neon-cyan" : ""}`} />
                <span className="flex-1 text-left">{it.label}</span>
                {badge > 0 && (
                  <span className="text-[10px] font-mono rounded-full bg-neon-pink/20 text-neon-pink px-2 py-0.5">
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border/30">
          <Button
            variant="ghost"
            onClick={async () => {
              await supabase.auth.signOut();
              toast({ title: "Signed out", description: "See you soon 👋" });
              navigate("/");
            }}
            className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 pb-20 lg:pb-0">
        {/* Top bar */}
        <header className="sticky top-0 z-20 backdrop-blur-xl bg-background/50 border-b border-border/30">
          <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3">
            <div className="flex items-center gap-3 flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search events, people, vibes…"
                  className="w-full rounded-full glass border border-border/40 pl-9 pr-4 py-2 text-sm outline-none focus:shadow-glow transition"
                />
                {filteredSearch && (
                  <div className="absolute mt-2 w-full rounded-2xl glass-strong border border-border/40 p-2 shadow-glow z-30 max-h-72 overflow-auto">
                    {filteredSearch.length === 0 && (
                      <div className="px-3 py-2 text-xs text-muted-foreground">No matches</div>
                    )}
                    {filteredSearch.map((r: any) => (
                      <button
                        key={r.id}
                        onClick={() => {
                          setSearch("");
                          setActive("explore");
                          toast({ title: "Found", description: r.title });
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted/40 text-sm flex items-center justify-between"
                      >
                        <span className="truncate">{r.title}</span>
                        <span className="text-[10px] font-mono text-neon-cyan">{r.tag}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setActive("notifications")}
                className="relative flex h-9 w-9 items-center justify-center rounded-full glass border border-border/40 hover:shadow-glow transition"
                aria-label="Open notifications"
              >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-neon-pink animate-pulse" />
                )}
              </button>
              <button
                onClick={() => setActive("profile")}
                className="h-9 w-9 rounded-full bg-gradient-aurora flex items-center justify-center font-display font-semibold text-white hover:shadow-neon transition"
                style={{ backgroundSize: "200% 200%" }}
                aria-label="Open profile"
              >
                {(profile.name.trim().charAt(0) || "A").toUpperCase()}
              </button>
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
          {active === "dashboard" && (
            <DashboardView
              stress={stress}
              setStress={setStress}
              eventsAttended={eventsAttended}
              eventsGoal={eventsGoal}
              progress={progress}
              suggestions={suggestions}
              profileName={profile.name}
              onJoin={handleJoinSuggestion}
              onPlan={() => toast({ title: "Planning your week ✨", description: "AI is curating the best mix for you." })}
              onLog={() => toast({ title: "Logged", description: `Mood recorded at ${stress[0]}/100.` })}
              onSeeAll={() => setActive("explore")}
            />
          )}
          {active === "events" && (
            <MyEventsView
              events={myEvents}
              onToggleStatus={handleToggleStatus}
              onRemove={handleRemoveEvent}
              onAdd={() => setAddOpen(true)}
            />
          )}
          {active === "explore" && (
            <ExploreView
              joined={joinedExplore}
              onJoin={handleExploreJoin}
            />
          )}
          {active === "notifications" && (
            <NotificationsView
              items={notifs}
              onMarkRead={handleMarkRead}
              onMarkAllRead={handleMarkAllRead}
              onClear={handleClearNotif}
            />
          )}
          {active === "profile" && (
            <ProfileView
              profile={profile}
              onEdit={openEditProfile}
            />
          )}
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 backdrop-blur-xl bg-background/80 border-t border-border/30">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((it) => {
            const isActive = active === it.id;
            const badge = it.id === "notifications" ? unreadCount : 0;
            return (
              <button
                key={it.id}
                onClick={() => setActive(it.id)}
                className={`relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition ${
                  isActive ? "text-neon-cyan" : "text-muted-foreground"
                }`}
                aria-label={it.label}
              >
                <it.icon className="h-5 w-5" />
                <span className="text-[10px] font-mono">{it.label.split(" ")[0]}</span>
                {badge > 0 && (
                  <span className="absolute top-0 right-1 text-[9px] font-mono rounded-full bg-neon-pink/30 text-neon-pink px-1.5">
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Add Event Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="glass-strong border-border/40 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">Add a new event</DialogTitle>
            <DialogDescription>Drop the details and we'll pin it to your calendar.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="ev-title">Title</Label>
              <Input
                id="ev-title"
                value={newEvent.title}
                maxLength={100}
                onChange={(e) => setNewEvent((s) => ({ ...s, title: e.target.value }))}
                placeholder="Sunset Lakeside Yoga"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="ev-date">Date</Label>
                <Input
                  id="ev-date"
                  value={newEvent.date}
                  maxLength={20}
                  onChange={(e) => setNewEvent((s) => ({ ...s, date: e.target.value }))}
                  placeholder="Sat"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ev-time">Time</Label>
                <Input
                  id="ev-time"
                  value={newEvent.time}
                  maxLength={20}
                  onChange={(e) => setNewEvent((s) => ({ ...s, time: e.target.value }))}
                  placeholder="18:30"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ev-place">Location</Label>
              <Input
                id="ev-place"
                value={newEvent.place}
                maxLength={60}
                onChange={(e) => setNewEvent((s) => ({ ...s, place: e.target.value }))}
                placeholder="Lake Pavilion"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button
              onClick={handleAddEvent}
              className="rounded-full bg-gradient-aurora text-white shadow-glow hover:shadow-neon"
              style={{ backgroundSize: "200% 200%" }}
            >
              <Plus className="h-4 w-4 mr-1" /> Add event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Profile Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="glass-strong border-border/40 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">Edit your profile</DialogTitle>
            <DialogDescription>Tune your name, bio, and vibes.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="pf-name">Name</Label>
              <Input
                id="pf-name"
                value={editProfile.name}
                maxLength={60}
                onChange={(e) => setEditProfile((s) => ({ ...s, name: e.target.value }))}
                placeholder="Your name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pf-bio">Bio</Label>
              <Input
                id="pf-bio"
                value={editProfile.bio}
                maxLength={120}
                onChange={(e) => setEditProfile((s) => ({ ...s, bio: e.target.value }))}
                placeholder="Computer Science · Year 2"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pf-interests">Interests</Label>
              <Input
                id="pf-interests"
                value={interestsInput}
                maxLength={120}
                onChange={(e) => setInterestsInput(e.target.value)}
                placeholder="wellness, cultural, outdoor"
              />
              <p className="text-[11px] text-muted-foreground">Comma-separated, up to 6 tags.</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditOpen(false)}>Cancel</Button>
            <Button
              onClick={handleSaveProfile}
              className="rounded-full bg-gradient-aurora text-white shadow-glow hover:shadow-neon"
              style={{ backgroundSize: "200% 200%" }}
            >
              <Check className="h-4 w-4 mr-1" /> Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

/* ---------------- Views (forwardRef to silence ref warnings) ---------------- */

const DashboardView = forwardRef<HTMLDivElement, any>(({ stress, setStress, eventsAttended, eventsGoal, progress, suggestions, onJoin, onPlan, onLog, onSeeAll }, ref) => (
  <div ref={ref} className="space-y-6">
    <section className="glass rounded-3xl p-6 sm:p-8 relative overflow-hidden animate-fade-in-up">
      <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-neon-purple/20 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-neon-blue/20 blur-3xl" />
      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-neon-cyan">// today</div>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight">
            Welcome back, <span className="text-gradient bg-[length:200%_auto] animate-gradient-shift">Aarav</span> 👋
          </h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-lg">
            Your week looks balanced. Two events on the calendar, one quiet evening — go for that walk.
          </p>
        </div>
        <Button onClick={onPlan} className="rounded-full bg-gradient-aurora text-white shadow-glow hover:shadow-neon" style={{ backgroundSize: "200% 200%" }}>
          <Sparkles className="mr-1 h-4 w-4" /> Plan my week
        </Button>
      </div>
    </section>

    <div className="grid gap-6 lg:grid-cols-3">
      <section className="glass rounded-3xl p-6 lg:col-span-2 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-neon-cyan">// ai picks</div>
            <h2 className="mt-1 font-display text-xl font-semibold">Suggested for you</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onSeeAll} className="text-muted-foreground">
            See all <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        {suggestions.length === 0 ? (
          <p className="text-sm text-muted-foreground">All caught up — explore more to get new picks.</p>
        ) : (
          <ul className="space-y-3">
            {suggestions.map((s: any, i: number) => (
              <li key={s.id} className="group flex items-center gap-4 rounded-2xl glass-strong border border-border/30 px-4 py-3 transition hover:shadow-glow animate-fade-in-up" style={{ animationDelay: `${0.15 + i * 0.06}s` }}>
                <div className="relative h-12 w-12 shrink-0">
                  <svg viewBox="0 0 36 36" className="h-12 w-12 -rotate-90">
                    <circle cx="18" cy="18" r="15" fill="none" className="stroke-border" strokeWidth="3" />
                    <circle cx="18" cy="18" r="15" fill="none" stroke="url(#match-grad)" strokeWidth="3" strokeLinecap="round" strokeDasharray={`${(s.match / 100) * 94.2} 94.2`} />
                    <defs>
                      <linearGradient id="match-grad" x1="0" x2="1">
                        <stop offset="0" stopColor="hsl(var(--neon-cyan))" />
                        <stop offset="1" stopColor="hsl(var(--neon-purple))" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-semibold">{s.match}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display font-semibold truncate">{s.title}</div>
                  <div className="text-xs text-muted-foreground">{s.time} · <span className="text-neon-cyan">{s.tag}</span></div>
                </div>
                <Button size="sm" variant="outline" onClick={() => onJoin(s.id, s.title)} className="rounded-full glass border-border/40 group-hover:border-neon-purple/50">
                  Join
                </Button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="glass rounded-3xl p-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        <div className="text-xs font-mono uppercase tracking-[0.2em] text-neon-cyan">// check in</div>
        <h2 className="mt-1 font-display text-xl font-semibold">How are you, really?</h2>
        <div className="mt-5 flex justify-between items-center">
          {moods.map((m) => {
            const isClose = Math.abs(stress[0] - m.value) < 18;
            return (
              <button key={m.label} onClick={() => setStress([m.value])} className={`flex flex-col items-center gap-1 transition ${isClose ? "scale-110" : "opacity-50"}`}>
                <m.icon className={`h-7 w-7 ${isClose ? "text-neon-cyan" : ""}`} />
                <span className="text-[10px] font-mono uppercase">{m.label}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-6">
          <Slider value={stress} onValueChange={setStress} max={100} step={1} />
          <div className="mt-2 flex justify-between text-[10px] font-mono uppercase text-muted-foreground">
            <span>chill</span>
            <span className="text-neon-cyan">{stress[0]} / 100</span>
            <span>fried</span>
          </div>
        </div>
        <Button onClick={onLog} className="mt-5 w-full rounded-full bg-gradient-aurora text-white shadow-glow hover:shadow-neon" style={{ backgroundSize: "200% 200%" }}>
          Log today
        </Button>
      </section>

      <section className="glass rounded-3xl p-6 animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-neon-cyan" />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-neon-cyan">// goal</span>
        </div>
        <h2 className="mt-1 font-display text-xl font-semibold">Monthly events</h2>
        <div className="mt-6 flex items-end justify-between">
          <div>
            <div className="font-display text-5xl font-semibold text-gradient">{eventsAttended}</div>
            <div className="text-xs text-muted-foreground">of {eventsGoal} planned</div>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center gap-1 text-xs text-neon-cyan">
              <TrendingUp className="h-3 w-3" /> +3 vs last month
            </div>
          </div>
        </div>
        <div className="mt-5 h-2 rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-gradient-aurora animate-aurora" style={{ width: `${progress}%`, backgroundSize: "200% 200%" }} />
        </div>
      </section>

      <section className="glass rounded-3xl p-6 lg:col-span-2 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-neon-purple" />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-neon-cyan">// streak</span>
        </div>
        <h2 className="mt-1 font-display text-xl font-semibold">Wellness check-ins</h2>
        <div className="mt-5 grid grid-cols-7 gap-2">
          {Array.from({ length: 28 }).map((_, i) => {
            const intensity = Math.random();
            return (
              <div key={i} className="aspect-square rounded-md transition hover:scale-110" style={{
                background: intensity > 0.3 ? `hsl(var(--neon-blue) / ${intensity * 0.7 + 0.1})` : "hsl(var(--muted))",
                boxShadow: intensity > 0.7 ? "0 0 8px hsl(var(--neon-purple) / 0.5)" : undefined,
              }} />
            );
          })}
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>Last 4 weeks</span>
          <span>Current streak: <span className="text-neon-cyan font-medium">12 days</span></span>
        </div>
      </section>
    </div>
  </div>
));
DashboardView.displayName = "DashboardView";

const MyEventsView = forwardRef<HTMLElement, any>(({ events, onToggleStatus, onRemove, onAdd }, ref) => (
  <section ref={ref} className="glass rounded-3xl p-6 sm:p-8 animate-fade-in-up">
    <div className="flex items-start justify-between gap-4 flex-wrap">
      <div>
        <div className="text-xs font-mono uppercase tracking-[0.2em] text-neon-cyan">// my events</div>
        <h1 className="mt-2 font-display text-3xl font-semibold">Your upcoming plans</h1>
        <p className="mt-1 text-sm text-muted-foreground">{events.length} events on your calendar.</p>
      </div>
      <Button onClick={onAdd} className="rounded-full bg-gradient-aurora text-white shadow-glow hover:shadow-neon" style={{ backgroundSize: "200% 200%" }}>
        <Plus className="h-4 w-4 mr-1" /> Add event
      </Button>
    </div>

    {events.length === 0 ? (
      <p className="mt-6 text-sm text-muted-foreground">No events yet. Tap “Add event” or head to Explore.</p>
    ) : (
      <ul className="mt-6 space-y-3">
        {events.map((e: any, i: number) => (
          <li key={e.id} className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl glass-strong border border-border/30 p-4 hover:shadow-glow transition animate-fade-in-up" style={{ animationDelay: `${0.05 + i * 0.05}s` }}>
            <div className="w-16 shrink-0 text-center rounded-xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 border border-border/40 py-2">
              <div className="text-[10px] font-mono uppercase text-neon-cyan">{e.date}</div>
              <div className="font-display text-lg font-semibold">{e.time}</div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-display font-semibold">{e.title}</div>
              <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{e.place}</span>
                <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{e.time}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleStatus(e.id)}
                className={`text-[10px] font-mono uppercase rounded-full px-3 py-1 border transition hover:scale-105 ${
                  e.status === "Going"
                    ? "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30"
                    : "bg-neon-pink/10 text-neon-pink border-neon-pink/30"
                }`}
              >
                {e.status}
              </button>
              <Button variant="ghost" size="sm" onClick={() => onRemove(e.id, e.title)} className="text-muted-foreground hover:text-neon-pink">
                Remove
              </Button>
            </div>
          </li>
        ))}
      </ul>
    )}
  </section>
));
MyEventsView.displayName = "MyEventsView";

const ExploreView = forwardRef<HTMLElement, any>(({ joined, onJoin }, ref) => (
  <section ref={ref} className="animate-fade-in-up">
    <div className="text-xs font-mono uppercase tracking-[0.2em] text-neon-cyan">// explore</div>
    <h1 className="mt-2 font-display text-3xl font-semibold">Discover something new</h1>
    <p className="mt-1 text-sm text-muted-foreground">AI-curated based on your mood and history.</p>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {exploreItems.map((it, i) => {
        const isJoined = joined.includes(it.id);
        return (
          <div key={it.id} className="glass rounded-2xl p-5 hover:shadow-glow transition border border-border/30 animate-fade-in-up" style={{ animationDelay: `${0.05 + i * 0.04}s` }}>
            <div className="text-[10px] font-mono uppercase text-neon-cyan">{it.tag}</div>
            <h3 className="mt-2 font-display text-lg font-semibold">{it.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{it.blurb}</p>
            <Button
              size="sm"
              variant={isJoined ? "default" : "outline"}
              onClick={() => onJoin(it.id, it.title)}
              disabled={isJoined}
              className={`mt-4 rounded-full ${isJoined ? "bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30" : "glass border-border/40"}`}
            >
              {isJoined ? (<><Check className="h-3 w-3 mr-1" /> Joined</>) : (<>Join <ChevronRight className="h-3 w-3 ml-1" /></>)}
            </Button>
          </div>
        );
      })}
    </div>
  </section>
));
ExploreView.displayName = "ExploreView";

const NotificationsView = forwardRef<HTMLElement, any>(({ items, onMarkRead, onMarkAllRead, onClear }, ref) => {
  const unread = items.filter((n: any) => n.unread).length;
  return (
    <section ref={ref} className="glass rounded-3xl p-6 sm:p-8 animate-fade-in-up">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-neon-cyan">// inbox</div>
          <h1 className="mt-2 font-display text-3xl font-semibold">Notifications</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {unread > 0 ? `${unread} unread updates from your circle.` : "You're all caught up. ✨"}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={onMarkAllRead} disabled={unread === 0} className="rounded-full glass border-border/40">
          Mark all read
        </Button>
      </div>

      {items.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">Inbox empty.</p>
      ) : (
        <ul className="mt-6 space-y-2">
          {items.map((n: any, i: number) => (
            <li
              key={n.id}
              className={`flex items-center gap-4 rounded-2xl border px-4 py-3 transition hover:shadow-glow animate-fade-in-up ${
                n.unread ? "glass-strong border-neon-purple/30" : "glass border-border/30 opacity-70"
              }`}
              style={{ animationDelay: `${0.05 + i * 0.04}s` }}
            >
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl bg-muted/40 ${n.color}`}>
                <n.icon className="h-5 w-5" />
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{n.title}</div>
                <div className="text-xs text-muted-foreground">{n.time}</div>
              </div>
              {n.unread && (
                <Button variant="ghost" size="sm" onClick={() => onMarkRead(n.id)} className="text-xs text-neon-cyan">
                  Read
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={() => onClear(n.id)} className="text-muted-foreground hover:text-neon-pink">
                Clear
              </Button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
});
NotificationsView.displayName = "NotificationsView";

const tagStyles = [
  "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30",
  "bg-neon-purple/10 text-neon-purple border-neon-purple/30",
  "bg-neon-pink/10 text-neon-pink border-neon-pink/30",
  "bg-neon-blue/10 text-neon-blue border-neon-blue/30",
];

const ProfileView = forwardRef<HTMLDivElement, any>(({ profile, onEdit }, ref) => {
  const initial = (profile?.name?.trim()?.charAt(0) || "A").toUpperCase();
  const interests: string[] = profile?.interests ?? [];
  return (
  <div ref={ref} className="space-y-6">
    <section className="glass rounded-3xl p-6 sm:p-8 relative overflow-hidden animate-fade-in-up">
      <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-neon-purple/20 blur-3xl" />
      <div className="relative flex flex-col sm:flex-row sm:items-center gap-5">
        <div className="h-20 w-20 rounded-full bg-gradient-aurora flex items-center justify-center font-display text-3xl font-semibold text-white shadow-glow" style={{ backgroundSize: "200% 200%" }}>
          {initial}
        </div>
        <div className="flex-1">
          <h1 className="font-display text-2xl font-semibold">{profile?.name || "Your name"}</h1>
          <p className="text-sm text-muted-foreground">{profile?.bio || "Add a short bio"}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {interests.length === 0 && (
              <span className="text-[10px] font-mono uppercase text-muted-foreground">No interests yet</span>
            )}
            {interests.map((tag, i) => (
              <span
                key={`${tag}-${i}`}
                className={`text-[10px] font-mono uppercase rounded-full px-2 py-0.5 border ${tagStyles[i % tagStyles.length]}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <Button variant="outline" onClick={onEdit} className="rounded-full glass border-border/40">
          <Settings className="h-4 w-4 mr-2" /> Edit profile
        </Button>
      </div>
    </section>
...
  </div>
  );
});
ProfileView.displayName = "ProfileView";

export default Dashboard;
