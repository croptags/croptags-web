import { Navbar } from "@/pages/landing/components/Navbar";
import { Hero } from "@/pages/landing/sections/Hero";

export const Landing = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  );
};
