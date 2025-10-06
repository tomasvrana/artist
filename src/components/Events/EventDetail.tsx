import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { getEventBySlug } from '../../lib/markdown';
import type { Event } from '../../types/event';
import styled from 'styled-components';
import Content from '../Content';
import Status from '../Status';
import Label from '../Label';
import { CurrencyProvider, useCurrency } from "../../context/CurrencyContext";
import { PageMeta } from '../PageMeta';

const Detail = styled.article`
margin:50px auto 0 auto;
.top{
  margin:0px 0 40px 0;
}
.top .year{
  letter-spacing:.5em;
  font-size:90%;
  padding-left:10px;
}
.top h1{
  font-size:400%;
  margin:0;
  letter-spacing:-.05em;
  font-weight:200;
}
.images{
  margin:0px 0 0px 0;
  background:white;
  text-align:center;
}
.images img{
  max-width:100%;
}
.featured{
  img{
    width:100%;
  }
}
.gallery{
  .image+.image{
    margin:0 0 50px 0;
  }
}
.event-content .dash{
  margin:20px 0 20px 0;
  border-top:1px solid #999;
  width:100px;
}
.information{
  background:white;
  margin-top:-4px;
  padding:0px 40px 40px 40px;
  .top{
    display:flex;
    .event-details{
      min-width:35%;
      border-left:1px solid #999;
      padding:30px 0 1em 35px;
      p{
        margin:0 0 5px 0;
        &.height{
          margin-bottom:15px;
        }
      }
      @media screen and (max-width:1000px){
        width:100%;
¨      }
    }
    @media screen and (max-width:1000px){
      display:block;
    }
    .event-content{
      padding:20px 30px 0 0;
      min-width:65%;
      @media screen and (max-width:1000px){
        width:100%;
      }
    }
  }
  .price-details{
    p{
      margin:0;
    }
    .oldprice{
      text-decoration:line-through;
    }
    .price{
      font-size:250%;
      line-height:1.2;
    }
  }
}
`;

type CurrencyItem = {
  currency: string;
  value: number;
  old: number;
}

function formatVal(val){
  const { value, setValue } = useCurrency();
  return new Intl.NumberFormat(value === "CZK" ? "cs-CZ" : "en-US").format(val);
}


function CurrencySelect({ array }: { array: CurrencyItem[] }) {
  const { t, i18n } = useTranslation();
  const { value, setValue } = useCurrency();

  if(value == 'default'){
    setValue('CZK');
  }
  const current = array.find((el) => el.currency === value);
  
  if (!current) {
    return (
      <div className="price-details">
        <p>{t('portfolio.price')}: <strong className="price">-</strong></p>
      </div>
    );
  }

  return (
    <div className="price-details">
      <p>{t('portfolio.price')}:<br /><strong className="price">{current.value}</strong> {value}</p>
      <p>&nbsp;</p>
      <p>
        <Label>{t('portfolio.selectcurrency')}</Label><br />
        <select value={value} onChange={(e) => setValue(e.target.value)}>
          {array.map((item, idx) => (
            <option key={idx} value={item.currency}>{item.currency}</option>
          ))}
        </select>
      </p>
    </div>
  );
}
export const EventDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvent = async () => {
      if (!slug) return;
      
      setLoading(true);
      try {
        const eventData = await getEventBySlug(slug, i18n.language);
        setEvent(eventData);
      } catch (error) {
        console.error('Error loading event:', error);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [slug, i18n.language]);

  if (loading) {
    return <div className="loading text-center">{t('common.loading')}</div>;
  }
  
  if (!event) {
    return (
      <div className="content error-page">
        <h1>{t('portfolio.eventNotFound')}</h1>
        <button onClick={() => navigate(`/${i18n.language}/events`)}>
          {t('common.back')}
        </button>
      </div>
    );
  }
  function datePart(date, lang, part){
    return date.toLocaleString(lang, part);
  }

  return (
    <>
    {event && (
      <PageMeta 
        title={`${event.title} | ${t('navigation.events')} | ${t('common.title')}`}
        description={event.description}
        image={event.image}
        url={`https://dev2.vrana.org/#/${i18n.language}/event/${event.slug}`}
      />
    )}
    <CurrencyProvider>
      <Detail className="event-detail">
        <Content>

          <div className="top text-center">
            <button 
              className="back-button" 
              onClick={() => navigate(`/${i18n.language}/events`)}
            >
              {t('common.back')}<br />←
            </button>
            
            <div className="heading">
              <h1>{event.title}</h1>
            </div>
            <div className='date'>
              <span className='year'>{event.date.toLocaleString('default', { month: 'long' })}</span>
            </div>
          </div>

          <div className="featured">
            {event.image ? (
              <div className="images">
                <img src={event.image} />
              </div>
            ) : (
              <div>
                {event.gallery.map((item, index) => (
                  <div className="images" key={index}>
                    <img src={item.image} />
                  </div>
                ))}
              </div>
            )}
          </div>

          
          <div className="information">
            <div className="top">
              <div className="event-content">
                <div className="text" dangerouslySetInnerHTML={{ __html: event.content }} />
              </div>

            </div>

          </div>

          <div className="images gallery">
            {event.gallery.map((item, index) => (
              <div className="image" key={index}>
                <img src={item.image} />
              </div>
            ))}
          </div>

        </Content>
      </Detail>
    </CurrencyProvider>
    </>
  );
};
