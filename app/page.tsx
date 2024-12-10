"use client";

import { Header } from "@/components/header";
import { GiftForm } from "@/components/gift-form";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
        <Hero />
        <div className="container mx-auto px-4 py-12">
          <GiftForm />
        </div>
      </main>
    </>
  );
}