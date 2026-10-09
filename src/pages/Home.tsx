import React from 'react';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Experience } from '../components/sections/Experience';
import { Projects } from '../components/sections/Projects';
import { Contact } from '../components/sections/Contact';

export const Home: React.FC = () => {
  return (
    <main>
      <section id="topo">
        <div className="wrap">
          <Hero />
        </div>
      </section>
      <About />
      <Experience />
      <Projects />
      <Contact />
    </main>
  );
};
