import InteractiveBackground from "../components/layout/InteractiveBackground";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ExperienceSection from "../containers/experience/Experience";

export default function ExperiencePage() {
  return (
    <InteractiveBackground>
      <Navbar />
      <main className="pt-24">
        <ExperienceSection />
      </main>
      <Footer />
    </InteractiveBackground>
  );
}
