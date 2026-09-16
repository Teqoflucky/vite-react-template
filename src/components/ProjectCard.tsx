import type { Project } from '../data/projects';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <a href={project.href} className="project-card">
      <div className="project-card-header">
        <h3>{project.title}</h3>
        <span className={`status status-${project.status.replace(' ', '-')}`}>{project.status}</span>
      </div>
      <p>{project.description}</p>
      <div className="project-tags">
        {project.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
      </div>
    </a>
  );
}
