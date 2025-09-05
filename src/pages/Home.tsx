import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { usePageContent } from '../hooks/usePageContent';
import { PageMeta } from '../components/PageMeta';
import GallerySlideshow from '../components/Slider'
import styled from 'styled-components';

const Hero = styled.div`
color:white;
.hero{
  top:50%;
  position:absolute;
  width:90%;
  left:0;
  z-index:80;
  margin-top:-250px;
  text-transform:uppercase;
  letter-spacing:.2em;
  padding:0 5%;
  @media screen and (max-width:1000px) {
    margin-top:-50px;
  }
  @media screen and (max-width:700px) {
    margin-top:0px;
  }
    
  h1{
    font-size:800%;
    letter-spacing:.02em;
    color:white;
    max-width:1400px;
    line-height:1.2;
    margin:auto;
    @media screen and (max-width:1400px) {
      font-size:500%;
    }
    @media screen and (max-width:1000px) {
      font-size:350%;
    }
    @media screen and (max-width:700px) {
      font-size:200%;
    }
    
  }
  button{
    font-size:100%;
    padding:.7em 1em;
    background:transparent;
    color:white;
    border:1px solid white;
    border-radius:5px;
    text-transform:uppercase;
    font-weight:600;
    letter-spacing:.1em;
    margin-top:30px;
  }
}
`;

export const Home = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const navigate = useNavigate();
  const pageContent = usePageContent('home');

  if (!pageContent) {
    return <div className='text-center'></div>;
  }

  return (
    <>
      <PageMeta 
        title={`${t('common.title')}`}
        description={`${t('common.title')}`}
      />
      <Hero className="home text-center">
        <GallerySlideshow gallery={pageContent.gallery} interval={4000}  />
        <section className="hero">

          <h1>{pageContent.title}</h1>
          <p>{pageContent.subtitle}</p>
          <button onClick={() => navigate('/'+currentLang+'/portfolio')}>
            {pageContent.cta}
          </button>
        </section>
      </Hero>
    </>
  );
};
