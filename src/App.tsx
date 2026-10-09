
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import Background from './components/Background';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

import { Home } from './pages/Home';
import { ProjectsPage } from './pages/ProjectsPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Background />
      <div className="veil" aria-hidden="true"></div>

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projetos" element={<ProjectsPage />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
