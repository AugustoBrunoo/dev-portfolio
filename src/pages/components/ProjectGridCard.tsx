import React, { useRef, useEffect } from 'react';

interface ProjectGridCardProps {
  project: {
    slug: string;
    title: string;
    feat: boolean;
    desc: string;
    tags: string[][];
    repo?: string;
    demo?: string;
  };
  delayMs: number;
}

export const ProjectGridCard: React.FC<ProjectGridCardProps> = ({ project, delayMs }) => {
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    el.style.transitionDelay = `${delayMs}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in');
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [delayMs]);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <article
      ref={cardRef}
      className={`glass pp-card${project.feat ? ' feat' : ''}`}
      onPointerMove={handlePointerMove}
    >
      <div className="p">
        <span>~/projetos/<b>{project.slug}</b></span>
      </div>
      <h3>{project.title}</h3>
      <p className="d">{project.desc}</p>
      
      <div className="pp-tags">
        {project.tags.map(t => (
          <span key={t[0]} className="pp-tag" data-k={t[1]}>
            {t[0]}
          </span>
        ))}
      </div>
      
      {(project.repo || project.demo) && (
        <div className="pp-links">
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noopener noreferrer">
              código
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer">
              demo
            </a>
          )}
        </div>
      )}
    </article>
  );
};
