import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NAV_ITEMS } from '../../data/constants';

export const Header: React.FC = () => {
  const [activeSection, setActiveSection] = useState('topo');
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection('');
      return;
    }

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
  }, [pathname]);

  useEffect(() => {
    if (pathname !== '/' || !activeSection) {
      setIndicatorStyle({ left: 0, width: 0, opacity: 0 });
      return;
    }
    const index = NAV_ITEMS.findIndex(item => item.id === activeSection);
    const activeLink = navRefs.current[index];
    
    if (activeLink) {
      setIndicatorStyle({
        left: activeLink.offsetLeft,
        width: activeLink.offsetWidth,
        opacity: 1
      });
    }
  }, [activeSection, pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="top">
      <div className="wrap">
        {pathname === '/projetos' ? (
          <nav aria-label="Voltar">
            <a 
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
                window.scrollTo(0, 0);
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 19-7-7 7-7"/>
                <path d="M19 12H5"/>
              </svg>
              Voltar ao Portfólio
            </a>
          </nav>
        ) : (
          <nav aria-label="Seções">
            {NAV_ITEMS.map((item, i) => (
              <a 
                key={item.id}
                href={`/#${item.id}`}
                ref={(el) => { navRefs.current[i] = el; }}
                className={activeSection === item.id && pathname === '/' ? 'active' : ''}
                onClick={(e) => handleNavClick(e, item.id)}
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
        )}
      </div>
    </header>
  );
};
