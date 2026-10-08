import React from 'react';

interface BentoCardProps {
  className: string;
  title: string;
  description: string;
  chips?: string[];
  header?: React.ReactNode;
}

export const BentoCard: React.FC<BentoCardProps> = ({ className, title, description, chips, header }) => {
  return (
    <article className={`glass cell ${className}`}>
      {header}
      <h3>{title}</h3>
      <p>{description}</p>
      {chips && (
        <div className="chips">
          {chips.map((c, i) => (
            <span key={i} className="chip">{c}</span>
          ))}
        </div>
      )}
    </article>
  );
};
