
import Background from './components/Background';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { Contact } from './components/sections/Contact';

function App() {
  return (
    <>
      <Background />
      <div className="veil" aria-hidden="true"></div>

      <Header />

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

      <Footer />
    </>
  );
}

export default App;
