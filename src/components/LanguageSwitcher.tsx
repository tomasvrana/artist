import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const changeLanguage = (newLang: string) => {
    const currentLang = i18n.language;
    
    // Pokud je to stejný jazyk, nic nedělej
    if (currentLang === newLang) return;
    
    // Změň jazyk v i18n
    i18n.changeLanguage(newLang);
    
    // Vytvoř novou cestu
    let newPath = location.pathname;
    
    // Nahraď jazyk v cestě
    if (newPath.startsWith(`/${currentLang}`)) {
      newPath = newPath.replace(`/${currentLang}`, `/${newLang}`);
    } else {
      // Pokud cesta nezačíná jazykem, přidej ho
      newPath = `/${newLang}${newPath}`;
    }
    
    // Naviguj na novou cestu
    navigate(newPath);
  };

  return (
    <div className="language-switcher">
      {(i18n.language === 'cs') &&
        <button
            onClick={() => changeLanguage('en')}
            className={i18n.language === 'en' ? 'active' : ''}
            aria-label="Switch to English"
        >
            EN
        </button>
      }
      {(i18n.language === 'en') &&
        <button
            onClick={() => changeLanguage('cs')}
            className={i18n.language === 'cs' ? 'active' : ''}
            aria-label="Přepnout do češtiny"
        >
            CS
        </button>
        }
    </div>
  );
};
