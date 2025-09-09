import { useTranslation } from 'react-i18next';
import { usePageContent } from '../hooks/usePageContent';
import Card from '../components/Card';
import { PageMeta } from '../components/PageMeta';

export const About = () => {
  const { t } = useTranslation();
  const pageContent = usePageContent('about');

  if (!pageContent) {
    return <div className='text-center'><p>{t('common.loading')} ...</p></div>;
  }

  return (
    <>
      <PageMeta 
        title={`${t('navigation.about')} - ${t('common.title')}`}
        description={`${t('navigation.about')} - ${t('common.title')}`}
      />
    
      <div className="content about">
        <Card title={pageContent.title} rotx={`${(Math.floor(Math.random() * 50) - 25) / 20}`} roty={`${(Math.floor(Math.random() * 50) - 25) / 10}`} bgimg='white url(/tv.jpg) no-repeat right top' padright="280px">
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
        </Card>
      </div>
    </>
  );
};
