import React from 'react';
import { CountUp } from '../../components/ui/CountUp';

interface ProjectsHeroProps {
  totalProjects: number;
}

export const ProjectsHero: React.FC<ProjectsHeroProps> = ({ totalProjects }) => {
  return (
    <div className="pp-hero">
      <div>
        <p className="pp-path">~/augusto/projetos</p>
        <h1 className="pp-h1">Projetos</h1>
        <p className="pp-lead">
          Interfaces, dashboards e plataformas que conectam dados reais a telas rápidas, modulares e fáceis de usar.
        </p>
      </div>
      <div className="glass pp-counter" role="group" aria-label={`${totalProjects} projetos realizados`}>
        <CountUp to={totalProjects} duration={2} delay={0.4} />
        <span className="lbl">projetos realizados</span>
        <span className="sm">total acumulado</span>
      </div>
    </div>
  );
};
