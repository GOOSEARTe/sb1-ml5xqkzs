import { Gift } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-14 items-center">
        <div className="flex items-center gap-2 mr-4">
          <Gift className="h-6 w-6" />
          <span className="font-semibold">Gift Genie</span>
        </div>
        <div className="flex-1" />
        <ThemeToggle />
      </div>
    </header>
  );
}