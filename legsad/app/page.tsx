import Hero from "./components/Hero"; 
import StatsBar from "./components/StatsBar";
import NextMatch from "./components/NextMatch";
import RecentResults from "./components/RecentResults";
import Sponsors from "./components/Sponsors";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-linear-to-b from-brand-black via-brand-crimson/10 to-brand-black">
      <Hero />
      <StatsBar />
      <NextMatch />
      <RecentResults />
      <Sponsors />
      <Footer />
    </main>
  );
}