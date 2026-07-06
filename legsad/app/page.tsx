import Hero from "./components/Hero"; 
import StatsBar from "./components/StatsBar";
import NextMatch from "./components/NextMatch";

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsBar />
      <NextMatch />
    </main>
  );
}