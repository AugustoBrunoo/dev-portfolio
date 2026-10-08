import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export const Contact: React.FC = () => {
  return (
    <section id="contato">
      <div className="wrap">
        <h2>Vamos conversar</h2>
        <p className="sub">Aberto a vagas e projetos remotos ou híbridos, a partir do Rio de Janeiro.</p>
        <div className="cta" style={{ marginTop: '24px' }}>
          <a className="btn primary" href="https://github.com/AugustoBrunoo" target="_blank" rel="noopener noreferrer">
            <FaGithub size={16} /> Ver GitHub
          </a>
          <a className="btn" href="https://linkedin.com/in/augustobrunoo" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={16} /> Ver LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
};
