import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePageContent } from '../hooks/usePageContent';
import Heading from '../components/Heading';

export const About = () => {
  const { t } = useTranslation();
  const pageContent = usePageContent('about');

  if (!pageContent) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content about">
      <Heading>{pageContent.title}</Heading>
      <div className="about-content">
        <div dangerouslySetInnerHTML={{ __html: pageContent.content }} />
        
        {pageContent.skills && (
          <div className="skills">
            <h2>{t('about.skills')}</h2>
            <ul>
              {pageContent.skills.split(',').map((skill: string) => (
                <li key={skill.trim()}>{skill.trim()}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
