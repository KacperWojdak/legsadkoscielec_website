import Hero from "./components/Hero"; 
import StatsBar from "./components/StatsBar";
import NextMatch from "./components/NextMatch";
import RecentResults from "./components/RecentResults";

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsBar />
      <NextMatch />
      <RecentResults />
    </main>
  );
}