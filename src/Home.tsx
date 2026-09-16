import NavButtons from './components/NavButtons';
import ProjectCard from './components/ProjectCard';
import { projects } from './data/projects';

export default function Home() {
  return (
    <main className="home">
      <header className="home-header">
        <p className="eyebrow">Calgary, AB</p>
        <h1>Lucky Patel</h1>
        <p className="role">Security &amp; data-focused engineer — SOC Analyst / Threat Detection track</p>
        <NavButtons />
      </header>

      <section className="projects" aria-labelledby="building-title">
        <h2 id="building-title">Building</h2>
        {projects.map((project) => <ProjectCard key={project.title} project={project} />)}
      </section>
    </main>
  );
}
