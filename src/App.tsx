import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Layout } from './components/Layout';
import { Project } from './pages/Project';
import { Suspense } from 'react';
import { 
  Home, 
  Portfolio, 
  About, 
  Contact
} from './pages';

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
        </Route>
      ))}
      
    </Routes>
  );
};

export const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </Suspense>
  );
};

export default App;
