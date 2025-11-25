import InteractiveBackground from "../components/layout/InteractiveBackground";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import TerminalSection from "../containers/about/TerminalSection";

export default function AboutPage() {
  return (
    <InteractiveBackground>
      <Navbar />
      <main>
        <TerminalSection />
      </main>
      <Footer />
    </InteractiveBackground>
  );
}
