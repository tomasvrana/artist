import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const FooterWrap = styled.footer`
padding:0 40px;

.wrap{
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
}

@media screen and (max-width:1000px){
.wrap{

  display: block;
  p, .made{
    text-align:center;
  }

}

}
`;

export const Footer = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <FooterWrap>
      <div className='content'>
        <div className='wrap'>
          <p>&copy; 2025 {t('common.title')}, {t('common.allrights')}</p>
          <p className="made">{t('common.made')}</p>
        </div>
      </div>
    </FooterWrap>
  );
};
