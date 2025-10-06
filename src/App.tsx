import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Portfolio } from './pages/Portfolio';
import { Contact } from './pages/Contact';
import { Project } from './pages/Project';
import { Nft } from './pages/Nft';
import { Events } from './pages/Events';
import { Event } from './pages/Event';
import { Suspense, useEffect } from 'react';
import { initGA, trackPage } from './analytics';

// obal pro page tracking
const GAListener = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    trackPage(location.pathname + location.search);
  }, [location]);

  return children;
};

const AppRoutes = () => {
  const { i18n } = useTranslation();

  return (
    <Routes>
      <Route 
        path="/" 
        element={<Navigate to={`/${i18n.language}`} replace />} 
      />
      
      {['en', 'cs'].map((lang) => (
        <Route key={lang} path={`/${lang}`} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="portfolio/:slug" element={<Project />} />
          <Route path="contact" element={<Contact />} />
          <Route path="nft" element={<Nft />} />
          <Route path="events" element={<Events />} />
          <Route path="event/:slug" element={<Event />} />
        </Route>
      ))}
    </Routes>
  );
};

export const App = () => {
  useEffect(() => {
    initGA(); // spustí GA při startu
  }, []);

  return (
    <Suspense fallback={<div className='text-center'>Loading...</div>}>
      <HashRouter>
        <GAListener>
          <AppRoutes />
        </GAListener>
      </HashRouter>
    </Suspense>
  );
};

export default App;
