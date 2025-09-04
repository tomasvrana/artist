import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePageContent } from '../hooks/usePageContent';
import Heading from '../components/Heading';
import Content from '../components/Content';
import { PageMeta } from '../components/PageMeta';
import { Link } from 'react-router-dom';

export const Contact = () => {
  const { t } = useTranslation();
  const pageContent = usePageContent('contact');

  if (!pageContent) {
    return <div className='text-center'><p>{t('common.loading')} ...</p></div>;
  }

  return (
    <>
      <PageMeta 
        title={`${t('navigation.contact')} - ${t('common.title')}`}
        description={`${t('navigation.contact')} - ${t('common.title')}`}
      />
      <div className="content contact">
        <Heading>{pageContent.title}</Heading>
        <Content>
          <div dangerouslySetInnerHTML={{ __html: pageContent.content }} />
        </Content>
        <ul className='networks'>
          {pageContent.links.map((link, i) => (
            <li><Link to={link.url}>{link.title}</Link></li>
          ))}
        </ul>
      </div>
    </>
  );
};
