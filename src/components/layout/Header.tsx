import React, { useState, useEffect, useRef } from 'react';
import { NAV_ITEMS } from '../../data/constants';

export const Header: React.FC = () => {
  const [activeSection, setActiveSection] = useState('topo');
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: '-40% 0px -40% 0px' });

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const index = NAV_ITEMS.findIndex(item => item.id === activeSection);
    const activeLink = navRefs.current[index];
    
    if (activeLink) {
      setIndicatorStyle({
        left: activeLink.offsetLeft,
        width: activeLink.offsetWidth,
        opacity: 1
      });
    }
  }, [activeSection]);

  return (
    <header className="top">
      <div className="wrap">
        <nav aria-label="Seções">
          {NAV_ITEMS.map((item, i) => (
            <a 
              key={item.id}
              href={`#${item.id}`}
              ref={(el) => { navRefs.current[i] = el; }}
              className={activeSection === item.id ? 'active' : ''}
              onClick={() => setActiveSection(item.id)}
            >
              {item.label}
            </a>
          ))}
          <div 
            className="nav-indicator" 
            style={{ 
              transform: `translateX(${indicatorStyle.left}px)`, 
              width: `${indicatorStyle.width}px`, 
              opacity: indicatorStyle.opacity 
            }} 
          />
        </nav>
      </div>
    </header>
  );
};
