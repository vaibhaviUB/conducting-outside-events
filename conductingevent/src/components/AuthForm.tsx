import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import planaiIcon from "@/assets/planai-icon.png";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

type Mode = "login" | "signup";

const AuthForm = ({ mode }: { mode: Mode }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const name = nameRef.current?.value || "";

    try {
      if (mode === "signup") {
        const { error, data } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name },
          },
        });

        if (error) {
          toast.error(error.message);
          setLoading(false);
          return;
        }

        if (data.user) {
          const { error: profileError } = await supabase
            .from("profiles")
            .upsert({
              id: data.user.id,
              name,
            });

          if (profileError) {
            console.error("Profile creation error:", profileError);
            toast.error("Could not save profile name. Please update it later.");
          }
        }

        toast.success("Account created! Please check your email to confirm.");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          toast.error(error.message);
          setLoading(false);
          return;
        }

        toast.success("Signed in successfully!");
        setTimeout(() => navigate("/dashboard"), 700);
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      setLoading(false);
    }
  };

  const isSignup = mode === "signup";

  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="absolute top-5 left-5">
        <Link to="/" className="flex items-center gap-2 group" aria-label="PlanAI home">
          <img src={planaiIcon} alt="PlanAI logo" className="h-12 w-12 object-contain" />
          <span className="font-display text-2xl font-semibold text-white">
            Plan<span className="text-gradient">AI</span>
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
              {isSignup ? <>Join <span className="text-gradient">PlanAI</span></> : <>Sign in to <span className="text-gradient">PlanAI</span></>}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {isSignup ? "Two minutes. Then never feel alone in your week again." : "Pick up right where you left off."}
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            {isSignup && (
              <div className="float-field">
                <input id="name" type="text" placeholder=" " required ref={nameRef} />
                <label htmlFor="name">Full name</label>
              </div>
            )}
            <div className="float-field">
              <input id="email" type="email" placeholder=" " required defaultValue="student@planai.edu" ref={emailRef} />
              <label htmlFor="email">Email address</label>
            </div>
            <div className="float-field">
              <input id="password" type="password" placeholder=" " required defaultValue="••••••••" ref={passwordRef} />
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
