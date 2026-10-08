import React from 'react';
import FolderFloat from '../ui/FolderFloat';

export const Projects: React.FC = () => {
  const projectItems = [
    'PrimeInvest',
    'Radar Territorial',
    'PET Saúde Digital',
    'Noda Solutions',
    'Cartilhas',
    'Vue & React'
  ];

  return (
    <section id="projetos">
      <div className="wrap">
        <h2>Projetos em destaque</h2>
        <p className="sub">Explore minhas principais entregas e soluções criadas.</p>

        <div
          className="glass"
          style={{
            display: 'flex',
            flexWrap: 'wrap-reverse',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '40px',
            gap: '40px',
            cursor: 'pointer',
            transition: 'border-color 0.25s, transform 0.25s'
          }}
          onClick={() => {
            // Placeholder for navigation
            alert('Navegando para a página de todos os projetos!');
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--line-strong)'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--line)'}
        >
          <div style={{ flex: '1 1 300px' }}>
            <h3 style={{ fontSize: '24px', marginBottom: '16px', color: 'var(--accent-soft)', fontWeight: 600 }}>
              Acervo de Projetos
            </h3>
            <p style={{ color: '#cfc6de', lineHeight: '1.6', fontSize: '15px' }}>
              Uma vitrine interativa com todas as minhas aplicações, sistemas web e componentes de interface. Clique aqui ou interaja com a pasta ao lado para explorar as tecnologias que utilizo.
            </p>
            <p className="hint" style={{ marginTop: '32px', color: 'var(--accent)' }}>+ acessar página de projetos</p>
          </div>

          <div style={{ flex: '1 1 300px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', minHeight: '220px' }}>
            <div onClick={() => {
              // Prevent immediate navigation if they are just dragging pills
              // but allow standard interaction
            }}>
              <FolderFloat
                items={projectItems}
                label="Meu Portfólio"
                sublabel="Passe o mouse!"
                tilt={12}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
