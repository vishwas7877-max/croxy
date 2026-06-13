import Hero from "../components/Hero";
import WhyCroxy from "../components/WhyCroxy";
import EntertainmentScroll from "../components/EntertainmentScroll";
import AIOrbSection from "../components/AIOrbSection";
import DashboardPreview from "../components/DashboardPreview";
import AIAssistant from "../components/AIAssistant";
import CTAFooter from "../components/CTAFooter";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyCroxy />
      <EntertainmentScroll />
      <AIOrbSection />
      <DashboardPreview />
      <AIAssistant />
      <CTAFooter />
    </>
  );
}