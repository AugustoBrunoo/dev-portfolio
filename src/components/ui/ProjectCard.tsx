import React from 'react';

interface ProjectCardProps {
  title: string;
  kind: string;
  features: string[];
  chips: string[];
  tags: string[];
  hidden: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ title, kind, features, chips, hidden }) => {
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <article 
      className="glass card" 
      hidden={hidden}
      onPointerMove={handleMouseMove}
    >
      <h3>{title}</h3>
      <p className="kind">{kind}</p>
      <ul>
        {features.map((f, i) => <li key={i}>{f}</li>)}
      </ul>
      <div className="chips">
        {chips.map((c, i) => <span key={i} className="chip">{c}</span>)}
      </div>
    </article>
  );
};
