import React, { useState, useEffect } from 'react';
import { ALL_PROJECTS, FILTERS, TOTAL_PROJETOS } from '../data/constants';
import { AcidSquares } from '../components/ui/AcidSquares';
import { ProjectsHero } from './components/ProjectsHero';
import { ProjectsFilterBar } from './components/ProjectsFilterBar';
import { ProjectGridCard } from './components/ProjectGridCard';
import './ProjectsPage.css';

export const ProjectsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [visibleCount, setVisibleCount] = useState(TOTAL_PROJETOS);

  const filteredProjects = ALL_PROJECTS.filter(p => 
    activeFilter === 'Todos' || p.tags.some(t => t[0] === activeFilter)
  );

  useEffect(() => {
    setVisibleCount(filteredProjects.length);
  }, [filteredProjects.length]);

  return (
    <>
      <AcidSquares />
      
      <main style={{ minHeight: '100vh', position: 'relative', zIndex: 2 }}>
        <div className="wrap">
          <ProjectsHero totalProjects={TOTAL_PROJETOS} />
        </div>

        <section id="projetos-list" style={{ padding: '32px 0 96px', position: 'relative', zIndex: 2 }}>
          <div className="wrap">
            <ProjectsFilterBar
              filters={FILTERS}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              visibleCount={visibleCount}
              totalCount={TOTAL_PROJETOS}
            />
            
            <div className="pp-grid">
              {filteredProjects.map((p, i) => (
                <ProjectGridCard 
                  key={p.slug} 
                  project={p} 
                  delayMs={(i % 3) * 80} 
                />
              ))}
            </div>
            
            <div className="cta" style={{ marginTop: '40px', display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'flex-start' }}>
              <a className="btn primary" href="https://github.com/AugustoBrunoo" target="_blank" rel="noopener noreferrer">Ver todos no GitHub</a>
              <a className="btn" href="/">← Voltar ao portfólio</a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
