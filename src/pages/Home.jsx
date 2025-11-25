import InteractiveBackground from "../components/layout/InteractiveBackground";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroSection from "../containers/home/Hero";
import ScrollVelocity from "../components/ui/ScrollVelocity";
import ResourceShowcase from "../containers/home/ResourceShowcase";
import LogoLoopSection from "../containers/home/LogoLoopSection";
import Resume from "../assets/pdf/NoppolResume.pdf";

export default function HomePage() {
  return (
    <InteractiveBackground>
      <Navbar />
      <main className="md:pt-10">
        <HeroSection />
        <ScrollVelocity
          texts={["Creative UX/UI & AI-Driven Developer •", "Custom Website •"]}
          velocity={30}
          className="custom-scroll-text text-white"
        />
        <ResourceShowcase
          resumeUrl={Resume}
          playlistUrl="https://open.spotify.com/embed/playlist/5TSfenXxavLFApk28OsSV6?utm_source=generator&theme=0"
        />
        <LogoLoopSection />
      </main>
      <Footer />
    </InteractiveBackground>
  );
}
