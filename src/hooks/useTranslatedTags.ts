import { useTranslation } from 'react-i18next';

export const useTranslatedTags = () => {
  const { t } = useTranslation();

  const translateTag = (tag: string): string => {
    // Převeď tag na lowercase pro konzistenci
    const tagKey = tag.toLowerCase();
    
    // Zkus najít překlad
    const translationKey = `tags.${tagKey}`;
    const translated = t(translationKey);
    
    // Pokud překlad neexistuje, vrať původní tag
    return translated === translationKey ? tag : translated;
  };

  const translateTags = (tags: string[]): string[] => {
    return tags.map(translateTag);
  };

  return { translateTag, translateTags };
};
