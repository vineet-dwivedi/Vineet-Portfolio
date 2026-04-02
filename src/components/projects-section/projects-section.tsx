import { ArrowUpRight } from 'lucide-react';
import { buildProjectMeta, getProjectLiveUrl } from '../../lib/github';
import type { GitHubRepo } from '../../types/portfolio';
import { SectionHeader } from '../section-header/section-header';

type ProjectsSectionProps = {
  areProjectsLoading: boolean;
  githubStarsUrl: string;
  hasGithubUsername: boolean;
  projectsError: string;
  starredRepos: GitHubRepo[];
};

export function ProjectsSection({
  areProjectsLoading,
  githubStarsUrl,
  hasGithubUsername,
  projectsError,
  starredRepos,
}: ProjectsSectionProps) {
  const sectionAction = hasGithubUsername ? (
    <a
      className="section-link"
      href={githubStarsUrl}
      target="_blank"
      rel="noreferrer"
    >
      <span>Starred repos</span>
      <ArrowUpRight size={16} strokeWidth={1.9} />
    </a>
  ) : null;

  return (
    <section
      className="projects-section"
      id="projects"
      aria-labelledby="projects-title"
    >
      <SectionHeader id="projects-title" title="Projects" action={sectionAction} />

      {hasGithubUsername ? (
        starredRepos.length > 0 ? (
          <div className="project-list">
            {starredRepos.map((repo) => {
              const liveUrl = getProjectLiveUrl(repo.homepage);

              return (
                <article className="project-card" key={repo.id}>
                  <div className="project-copy">
                    <h3>{repo.name}</h3>
                    <p className="project-description">
                      {repo.description ??
                        `Starred repository from ${repo.owner.login}.`}
                    </p>
                    <p className="project-meta">{buildProjectMeta(repo)}</p>
                  </div>

                  <div className="project-actions">
                    {liveUrl ? (
                      <a
                        className="project-live-link"
                        href={liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open live project for ${repo.full_name}`}
                      >
                        <span>Live</span>
                      </a>
                    ) : null}

                    <a
                      className="project-link"
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open code for ${repo.full_name}`}
                    >
                      <span>Code</span>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="project-empty">
            {areProjectsLoading
              ? 'Syncing your starred repositories...'
              : (projectsError || 'No starred repositories found for this profile.')}
          </div>
        )
      ) : (
        <div className="project-empty">
          Add <code>VITE_GITHUB_USERNAME</code> to <code>.env.local</code> to
          sync starred repositories here.
        </div>
      )}
    </section>
  );
}
