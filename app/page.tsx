import { getRepos } from "@/lib/github";
import TopBar from "@/components/TopBar";
import Hero from "@/components/Hero";
import Flagships from "@/components/Flagships";
import ProjectLedger from "@/components/ProjectLedger";
import Toolbox from "@/components/Toolbox";
import Footer from "@/components/Footer";

export default async function Home() {
  const repos = await getRepos();

  return (
    <>
      <TopBar />
      <main className="flex-1">
        <Hero />
        <Flagships />
        <ProjectLedger repos={repos} />
        <Toolbox />
      </main>
      <Footer />
    </>
  );
}
