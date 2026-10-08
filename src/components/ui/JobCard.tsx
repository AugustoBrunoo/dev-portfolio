import React from 'react';

interface JobCardProps {
  id: string;
  role: string;
  period: string;
  org: string;
  responsibilities: string[];
  isOpen: boolean;
  onToggle: (id: string) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ id, role, period, org, responsibilities, isOpen, onToggle }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle(id);
    }
  };

  return (
    <article
      className={`glass job ${isOpen ? 'open' : ''}`}
      tabIndex={0}
      role="button"
      aria-expanded={isOpen}
      onClick={() => onToggle(id)}
      onKeyDown={handleKeyDown}
    >
      <header>
        <h3>{role}</h3>
        <time>{period}</time>
      </header>
      <p className="org">{org}</p>
      <div className="more">
        <div>
          <ul>
            {responsibilities.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      </div>
      <p className="hint">+ ver mais</p>
    </article>
  );
};
