import { Gift, Sparkles, Stars } from "lucide-react";

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-background pt-14">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-secondary/5 to-accent/10" />
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 mx-auto max-w-4xl pt-20 pb-16 sm:pt-24">
          <div className="text-center">
            <div className="flex justify-center items-center gap-4 mb-8">
              <Gift className="h-16 w-16 text-primary animate-float" />
              <Stars className="h-8 w-8 text-secondary animate-sparkle" />
              <Sparkles className="h-12 w-12 text-accent animate-pulse-slow" />
            </div>
            <h1 className="text-5xl font-bold tracking-tight gradient-text sm:text-7xl mb-6">
              Gift Genie
            </h1>
            <p className="mt-6 text-xl leading-8 text-muted-foreground">
              Your personal AI-powered gift recommendation assistant. Let us help
              you find the perfect gift for your loved ones based on their
              interests and preferences.
            </p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}