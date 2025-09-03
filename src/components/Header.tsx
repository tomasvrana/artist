import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Header = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <header>
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
    </header>
  );
};
