import { ArrowUpRight } from 'lucide-react';
import { buildProjectMeta, getProjectLiveUrl } from '../../lib/github';
import type { GitHubRepo } from '../../types/portfolio';
import { GithubIcon } from '../icons/social-icons';
import { SectionHeader } from '../section-header/section-header';

type ProjectsSectionProps = {
  areProjectsLoading: boolean;
  githubProfileUrl: string;
  hasGithubUsername: boolean;
  projectsError: string;
  userRepos: GitHubRepo[];
};

export function ProjectsSection({
  areProjectsLoading,
  githubProfileUrl,
  hasGithubUsername,
  projectsError,
  userRepos,
}: ProjectsSectionProps) {
  const sectionAction = hasGithubUsername ? (
    <a
      className="section-link"
      href={`${githubProfileUrl}?tab=repositories`}
      target="_blank"
      rel="noreferrer"
    >
      <span>All repositories</span>
      <ArrowUpRight size={16} strokeWidth={1.9} />
    </a>
  ) : null;

  return (
    <section
      className="projects-section"
      id="projects"
      aria-labelledby="projects-title"
    >
      <SectionHeader id="projects-title" title="GitHub & Projects" action={sectionAction} />

      {hasGithubUsername ? (
        userRepos.length > 0 ? (
          <div className="project-list">
            {userRepos.map((repo) => {
              const liveUrl = getProjectLiveUrl(repo.homepage);

              return (
                <article className="project-card" key={repo.id}>
                  <div className="project-copy">
                    <div className="project-card-header">
                      <h3>{repo.name}</h3>
                    </div>
                    <p className="project-description">
                      {repo.description ?? 'Public GitHub repository.'}
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
                      <GithubIcon style={{ width: 14, height: 14 }} />
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
              ? 'Syncing repositories from GitHub...'
              : (projectsError || 'No repositories found for this profile.')}
          </div>
        )
      ) : (
        <div className="project-empty">
          Add <code>VITE_GITHUB_USERNAME</code> to <code>.env.local</code> to
          sync repositories here.
        </div>
      )}
    </section>
  );
}
