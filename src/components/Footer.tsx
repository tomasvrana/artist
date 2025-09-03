import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const FooterGrid = styled.div`
font-size:70%;
text-transform:uppercase;
display: flex;
letter-spacing:.1em;
justify-content:space-between;
gap: 1rem;
width:100%;
margin:50px 0 5px 0;
padding:20px 0;
.made{
  text-align:right;
}
`;

export const Footer = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <footer>
      <div className='content'>
        <FooterGrid className='wrap'>
          <p>&copy; 2025 {t('common.title')}, {t('common.allrights')}</p>
          <p className="made">{t('common.made')}</p>
        </FooterGrid>
      </div>
    </footer>
  );
};
