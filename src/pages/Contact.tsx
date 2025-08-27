import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePageContent } from '../hooks/usePageContent';
import Heading from '../components/Heading';
import Content from '../components/Content';
import { PageMeta } from '../components/PageMeta';

export const Contact = () => {
  const { t } = useTranslation();
  const pageContent = usePageContent('contact');

  if (!pageContent) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PageMeta 
        title={`${t('navigation.contact')} - ${t('common.title')}`}
        description={`${t('navigation.contact')} - ${t('common.title')}`}
      />
      <div>
        <Heading>{pageContent.title}</Heading>
        <Content>
          <div dangerouslySetInnerHTML={{ __html: pageContent.content }} />
        </Content>
      </div>
    </>
  );
};
