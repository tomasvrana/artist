import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';
import styled from 'styled-components';

const Wrapper = styled.header`
letter-spacing: .2em;
margin-top: 100px;

h1{
  font-size: 100%;
  font-weight: 600;
  text-transform: uppercase;
}
h1 a{
  font-weight: 600;
  text-decoration: none;
  color:black;
}
.nav-links a{
  font-size: 12px;
  font-weight: 400;
  text-transform: uppercase;
}
.nav-links button{
  font-size: 12px;
  font-weight: 400;
  text-transform: uppercase;
  padding: 5px 10px;
  line-height: 1.7;
  background: transparent;
  border: 1px solid #999;
}
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav-links {
  display: flex;
  gap: 1rem;
}
.nav-links a {
  color: black;
  text-decoration: none;
}
.nav-links a {
  color: #666;
  text-decoration: none;
  padding: 0.5rem 1rem;
  transition: color 0.3s ease;
}
.nav-links a:hover {
  color: #333;
}
.nav-links a.active {
  color: #000;
  font-weight: 600;
  border-bottom: 2px solid #000;
}
`;

export const Header = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <Wrapper>
      <nav>
        <h1>
          <Link to={`/${currentLang}`}>{(currentLang == 'cs') ? 'Tomáš Vrána' : 'Tomas Vrana'}</Link>
        </h1>
        <div className="nav-links">
          <Link to={`/${currentLang}`}>{t('navigation.home')}</Link>
          <Link to={`/${currentLang}/about`}>{t('navigation.about')}</Link>
          <Link to={`/${currentLang}/portfolio`}>{t('navigation.portfolio')}</Link>
          <Link to={`/${currentLang}/contact`}>{t('navigation.contact')}</Link>
          <LanguageSwitcher />
        </div>
      </nav>
    </Wrapper>
  );
};
