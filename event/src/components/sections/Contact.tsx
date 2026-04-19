import { useState } from "react";
import { Send, Mail, MessageSquare, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Contact = () => {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      toast.success("Message sent — we'll get back within 24h.");
      (e.target as HTMLFormElement).reset();
      setSending(false);
    }, 900);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-neon-cyan">// contact</div>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-semibold tracking-tight">
              Say <span className="text-gradient">hello</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-md">
              Questions, partnership ideas, or want to host an event? Drop us a line and a real human will reply.
            </p>

            <ul className="mt-8 space-y-4">
              <li className="flex items-center gap-3 text-sm">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg glass-strong border border-border/40">
                  <Mail className="h-4 w-4 text-neon-cyan" />
                </span>
                hello@calmai.edu
              </li>
              <li className="flex items-center gap-3 text-sm">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg glass-strong border border-border/40">
                  <MessageSquare className="h-4 w-4 text-neon-purple" />
                </span>
                Live chat, weekdays 9–18
              </li>
              <li className="flex items-center gap-3 text-sm">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg glass-strong border border-border/40">
                  <MapPin className="h-4 w-4 text-neon-pink" />
                </span>
                Student Union, Building C
              </li>
            </ul>
          </div>

          <form onSubmit={onSubmit} className="glass rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="float-field">
              <input type="text" id="name" placeholder=" " required />
              <label htmlFor="name">Your name</label>
            </div>
            <div className="float-field">
              <input type="email" id="email" placeholder=" " required />
              <label htmlFor="email">Email address</label>
            </div>
            <div className="float-field">
              <textarea id="message" rows={5} placeholder=" " required />
              <label htmlFor="message">How can we help?</label>
            </div>
            <Button type="submit" disabled={sending} className="w-full rounded-full bg-gradient-aurora text-white shadow-glow hover:shadow-neon h-11" style={{ backgroundSize: "200% 200%" }}>
              {sending ? "Sending…" : (<>Send message <Send className="ml-1 h-4 w-4" /></>)}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
