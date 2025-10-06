import { useTranslation } from 'react-i18next';
import { EventsList } from '../components/Events/EventsList';
import Heading from '../components/Heading';
import { PageMeta } from '../components/PageMeta';

export const Events = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageMeta 
        title={`${t('events.title')} - ${t('common.title')}`}
        description={`${t('events.title')} - ${t('common.title')}`}
      />
      <div className="content events">
        <Heading>{t('events.title')}</Heading>
        <EventsList />
      </div>
    </>
  );
};
