import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePageContent } from '../hooks/usePageContent';
import Heading from '../components/Heading';
import Content from '../components/Content';

export const Contact = () => {
  const { t } = useTranslation();
  const pageContent = usePageContent('contact');

  if (!pageContent) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Heading>{pageContent.title}</Heading>
      <Content>
        <div dangerouslySetInnerHTML={{ __html: pageContent.content }} />
      </Content>
    </div>
  );
};
