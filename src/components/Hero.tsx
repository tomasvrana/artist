import { useTranslation } from 'react-i18next';

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="hero">
      <h2>{t('hero.title')}</h2>
      <p>{t('hero.description')}</p>
      <button onClick={() => window.location.href = '#portfolio'}>
        {t('hero.cta')}
      </button>
    </section>
  );
};
