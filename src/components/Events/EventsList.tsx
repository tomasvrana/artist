import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAllEvents } from '../../lib/markdown';
import type { Event } from '../../types/event';
import { useTranslatedTags } from '../../hooks/useTranslatedTags';

const EventsGrid = styled.div`

`;

const EventCard = styled.article`
  border: 0px solid #ddd;
  padding:0px 0 0px 0;
  background:white;
  margin:40px auto 0 auto;
  display:flex;
  max-width:860px;

  .thumb{
    img{
      width:400px;
      height:300px;
      object-fit:cover;
      margin:0 0 -8px 0;
    }
  }
  .info{
    padding:0 0 0 30px;
    width:100%;
    .date{
      width:100px;
      background:yellow;
      line-height:1;
      text-align:center;
      padding:20px 0 10px 0;
      margin:-10px 0 10px 0;
      text-transform:uppercase;
      .d{
        display:block;
        font-size:200%;
        font-weight:600;
        line-height:0.5;
      }
      .m{
        display:block;
        font-weight:600;
      }
      .y{
        line-height:2;
      }
    }
  }
  &.over{
    .info{
      .date{
        background:#ccc;
        color:white;
      }
    }
  }
`;

export const EventsList = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const { translateTag } = useTranslatedTags();

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        const eventsData = await getAllEvents(i18n.language);
        setEvents(eventsData);
      } catch (error) {
        console.error('Error loading events:', error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [i18n.language]);

  const uniqueTags = Array.from(
    new Set(events.flatMap(event => event.tags))
  ).sort();

  const now = new Date();

  function datePart(date, lang, part){
    return date.toLocaleString(lang, part);
  }

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.tags.includes(filter));

  if (loading) {
    return <div className="loading text-center">
      <p>{t('common.loading')} ...</p>
      <div className="loader"></div>
      </div>;
  }

  return (
    <div className="event-list">
      <EventsGrid className="events-grid">
        {events.length === 0 ? (
          <p className="no-events">{t('portfolio.noEvents')}</p>
        ) : (
          events.map((event) => (
            <EventCard 
              key={event.slug} 
              className={(event.date > now) ? 'upcoming' : 'over'}
              onClick={() => navigate(`/${i18n.language}/event/${event.slug}`)}
            >
              <div className="info">
                <div className='date'>
                  <span className='d'>{datePart(event.date, i18n.language, { day: 'numeric' })}.</span>&nbsp;
                  <span className='m'>{datePart(event.date, i18n.language, { month: 'short' })}</span>&nbsp;
                  <span className='y'>{datePart(event.date, i18n.language, { year: 'numeric' })}</span>
                </div>
                <h2>{event.title}</h2>
                {(event.date > now) &&
                <p>{t('events.upcoming')}</p>
                }
                {(event.date < now) &&
                <p>{t('events.over')}</p>
                }
              </div>
              <div className="thumb">
                {event.image &&
                  <img src={event.image} className='thumb' alt={''} />
                }
              </div>

            </EventCard>
          ))
        )}
      </EventsGrid>
    </div>
  );
};
