import { getRepos } from "@/lib/github";
import TopBar from "@/components/TopBar";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Flagships from "@/components/Flagships";
import ProjectLedger from "@/components/ProjectLedger";
import Toolbox from "@/components/Toolbox";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default async function Home() {
  const repos = await getRepos();

  return (
    <>
      <TopBar />
      <main className="flex-1">
        <Hero />
        <Experience />
        <Flagships />
        <ProjectLedger repos={repos} />
        <Toolbox />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
