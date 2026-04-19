import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Brain, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";

type Mode = "login" | "signup";

const AuthForm = ({ mode }: { mode: Mode }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate("/dashboard"), 700);
  };

  const isSignup = mode === "signup";

  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="absolute top-5 left-5">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-aurora animate-aurora" style={{ backgroundSize: "200% 200%" }}>
            <Brain className="h-5 w-5 text-white" />
          </span>
          <span className="font-display text-lg font-semibold">
            Calm<span className="text-gradient">AI</span>
          </span>
        </Link>
      </div>
      <div className="absolute top-5 right-5">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md">
        <div className="glass rounded-3xl p-8 sm:p-10 animate-scale-in">
          <div className="text-center mb-8">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-neon-cyan">
              {isSignup ? "// create account" : "// welcome back"}
            </div>
            <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight">
              {isSignup ? <>Join the <span className="text-gradient">calm</span></> : <>Sign in to <span className="text-gradient">CalmAI</span></>}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {isSignup ? "Two minutes. Then never feel alone in your week again." : "Pick up right where you left off."}
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            {isSignup && (
              <div className="float-field">
                <input id="name" type="text" placeholder=" " required />
                <label htmlFor="name">Full name</label>
              </div>
            )}
            <div className="float-field">
              <input id="email" type="email" placeholder=" " required defaultValue="student@calmai.edu" />
              <label htmlFor="email">Email address</label>
            </div>
            <div className="float-field">
              <input id="password" type="password" placeholder=" " required defaultValue="••••••••" />
              <label htmlFor="password">Password</label>
            </div>

            {!isSignup && (
              <div className="flex justify-end">
                <a href="#" className="text-xs text-muted-foreground hover:text-neon-cyan transition">Forgot password?</a>
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full rounded-full bg-gradient-aurora text-white shadow-glow hover:shadow-neon h-11 text-base" style={{ backgroundSize: "200% 200%" }}>
              {loading ? "Just a sec…" : (<>{isSignup ? "Create account" : "Sign in"} <ArrowRight className="ml-1 h-4 w-4" /></>)}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="rounded-full glass border-border/40">Google</Button>
            <Button variant="outline" className="rounded-full glass border-border/40">Apple</Button>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            {isSignup ? (
              <>Already have one? <Link to="/login" className="text-neon-cyan hover:underline font-medium">Sign in</Link></>
            ) : (
              <>New here? <Link to="/signup" className="text-neon-cyan hover:underline font-medium">Create account</Link></>
            )}
          </p>
        </div>
      </div>
    </main>
  );
};

export default AuthForm;
