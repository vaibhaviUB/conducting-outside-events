import { Calendar } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-heading text-lg font-bold">
          <Calendar className="h-5 w-5 text-primary" />
          <span>CampusVibe</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} CampusVibe. Making college life vibrant.
        </p>
      </div>
    </footer>
  );
}
