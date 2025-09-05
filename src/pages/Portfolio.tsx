import { useTranslation } from 'react-i18next';
import { ProjectList } from '../components/Portfolio/ProjectList';
import Heading from '../components/Heading';
import { PageMeta } from '../components/PageMeta';

export const Portfolio = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageMeta 
        title={`${t('portfolio.title')} - ${t('common.title')}`}
        description={`${t('portfolio.title')} - ${t('common.title')}`}
      />
      <div className="content portfolio">
        <Heading>{t('portfolio.title')}</Heading>
        <ProjectList />
      </div>
    </>
  );
};
