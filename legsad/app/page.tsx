import Hero from "./components/Hero"; 
import StatsBar from "./components/StatsBar";
import NextMatch from "./components/NextMatch";
import RecentResults from "./components/RecentResults";
import Sponsors from "./components/Sponsors";
import Footer from "./components/Footer";
import FadeInSection from "./components/FadeInSection";

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-linear-to-b from-brand-black via-brand-crimson/10 to-brand-black">
      <Hero />
      <FadeInSection>
        <StatsBar />
      </FadeInSection>
      <FadeInSection delay={0.1}>
        <NextMatch />
      </FadeInSection>
      <FadeInSection delay={0.1}>
        <RecentResults />
      </FadeInSection>
      <FadeInSection delay={0.1}>
        <Sponsors />
      </FadeInSection>
      <Footer />
    </main>
  );
}