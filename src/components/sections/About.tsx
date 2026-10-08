import React from 'react';
import { BentoCard } from '../ui/BentoCard';

export const About: React.FC = () => {
  return (
    <section id="sobre">
      <div className="wrap">
        <h2>Quem sou eu e o que faço</h2>
        <p className="sub">Estudante de Sistemas de Informação na UNIRIO. Trabalho com interfaces que transformam dados públicos em telas que as pessoas conseguem usar.</p>
        <div className="bento">
          <BentoCard
            className="c1"
            title="O núcleo da engenharia"
            description="JavaScript moderno (ES6+), TypeScript, Vue 3 com Pinia e Vue Router, React e Vite. Componentes pequenos, tipados e fáceis de reaproveitar."
            chips={['JavaScript ES6+', 'TypeScript', 'Vue 3', 'Java', 'Vue Router', 'React', 'Vite', 'Tailwind CSS']}
          />
          <BentoCard
            className="c2"
            title="Experiência"
            description="2 anos de experiência sólida com desenvolvimento de software e criação de produtos digitais."
            header={<div className="big">2 Anos</div>}
          />
          <BentoCard
            className="c3"
            title="Dados e infraestrutura municipal"
            description="Experiência prática com pipelines de dados de saúde pública e plataformas cívicas integradas a PostgreSQL, Supabase e Google BigQuery."
            chips={['PostgreSQL', 'Supabase', 'BigQuery']}
          />
          <BentoCard
            className="c4"
            title="Filosofia de código"
            description="Modularidade, componentização limpa e Mobile-First. Consumo de APIs REST/JSON assíncronas e estado que escala sem virar gambiarra."
            chips={['REST / JSON', 'Mobile-First', 'Gestão de estado']}
          />
        </div>
      </div>
    </section>
  );
};
