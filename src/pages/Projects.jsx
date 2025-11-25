import InteractiveBackground from "../components/layout/InteractiveBackground";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProjectsCard from "../containers/projects/ProjectCard";

export default function ProjectsPage() {
  return (
    <InteractiveBackground>
      <Navbar />
      <main>
        <ProjectsCard />
      </main>
      <Footer />
    </InteractiveBackground>
  );
}
