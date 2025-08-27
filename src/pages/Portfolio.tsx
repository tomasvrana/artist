import { useTranslation } from 'react-i18next';
import { ProjectList } from '../components/Portfolio/ProjectList';
import Heading from '../components/Heading';
import styled from 'styled-components';
import { PageMeta } from '../components/PageMeta';

const Wrapper = styled.div`
h1{
  font-size: 600%;
  font-weight: 100;
  letter-spacing: -.04em;
  text-align: center;
  line-height:2;
  margin:0;
}
`;

export const Portfolio = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageMeta 
        title={`${t('portfolio.title')} - ${t('common.title')}`}
        description={`${t('portfolio.title')} - ${t('common.title')}`}
      />
    
      <Wrapper className="content portfolio">
        <Heading>{t('portfolio.title')}</Heading>
        <ProjectList />
      </Wrapper>
    </>
  );
};
