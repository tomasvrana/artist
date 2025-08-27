import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { usePageContent } from '../hooks/usePageContent';

export const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const pageContent = usePageContent('home');

  if (!pageContent) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home">
      <section className="hero">
        <h1>{pageContent.title}</h1>
        <p>{pageContent.subtitle}</p>
        <button onClick={() => navigate('/portfolio')}>
          {pageContent.cta}
        </button>
      </section>
      
      <section className="content">
        <div dangerouslySetInnerHTML={{ __html: pageContent.content }} />
      </section>
    </div>
  );
};
