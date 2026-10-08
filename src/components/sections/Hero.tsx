import React, { useState, useEffect } from 'react';
import { FaFolderOpen, FaGithub, FaLinkedin } from 'react-icons/fa';

import augustoImg from '../../assets/augusto.jpeg';

export const Hero: React.FC = () => {
  const [nameText, setNameText] = useState('Augusto Bruno Menezes Silva');
  const targetName = 'Augusto Bruno Menezes Silva';

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const chars = '01<>/\\{}[]#$%&*+=?';
    let frame = 0;
    const total = 34;
    const t = setInterval(() => {
      frame++;
      setNameText(targetName.split('').map((c, i) =>
        c === ' ' ? ' ' : (i < (frame / total) * targetName.length * 1.15 ? c : chars[Math.floor(Math.random() * chars.length)])
      ).join(''));
      if (frame >= total + 6) {
        setNameText(targetName);
        clearInterval(t);
      }
    }, 40);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="hero">
      <div className="avatar has" id="avatar" aria-label="Foto de perfil de Augusto">
        <img id="avatar-img" src={augustoImg} alt="Foto de Augusto Bruno Menezes Silva" />
      </div>
      <h1 id="name" style={{ position: 'relative', wordBreak: 'break-word' }}>
        <span style={{ visibility: 'hidden', pointerEvents: 'none' }}>Augusto Bruno Menezes Silva</span>
        <span style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>{nameText}</span>
      </h1>
      <p className="role">Desenvolvedor Full-Stack | UI &amp; Data Applications</p>
      <p className="quote">Construindo a ponte entre dados complexos, arquitetura front-end modular e interfaces reativas de alto desempenho.</p>
      <div className="meta">
        <span>Rio de Janeiro - RJ</span>
        <span>UNIRIO · Sistemas de Informação</span>
      </div>
      <div className="cta">
        <a className="btn primary" href="#projetos">
          <FaFolderOpen size={16} /> Ver Projetos
        </a>
        <a className="btn" href="https://github.com/AugustoBrunoo" target="_blank" rel="noopener noreferrer">
          <FaGithub size={16} /> Ver GitHub
        </a>
        <a className="btn" href="https://linkedin.com/in/augustobrunoo" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={16} /> Ver LinkedIn
        </a>
      </div>
    </div>
  );
};
