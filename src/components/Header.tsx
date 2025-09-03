import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';
import styled from 'styled-components';

const Wrapper = styled.header`
padding:0 40px;
position: relative;
z-index: 99;


.hamburger-menu {
  display:none;
  width: 35px;
  height: 30px;
  position: absolute;
  top:30px;
  right:30px;
  
  cursor: pointer;
  z-index:110;
  @media screen and (max-width:1000px) {
    display:block;
  }
}

.hamburger-menu div {
  width: 100%;
  height:3px;
  transition-property: transform, opacity, top, bottom;
  transition-duration: .3s, .3s, .3s, .3s;
}

.hamburger-menu div:nth-child(1) {
   position: absolute;
   top:5px;
}

.hamburger-menu div:nth-child(2), 
.hamburger-menu div:nth-child(3) {
   position:absolute; 
}

.hamburger-menu div:nth-child(2) { 
   top :14px; 
} 

/* Spodní linka u hamburger ikony */
.hamburger-menu div:nth-child(3) { 
    top: 23px;
}

/* Přechod na křížek */
.hamburger-menu.expanded div:nth-child(1),
.hamburger-menu.expanded div:nth-child(3) {
   transform: rotate(-45deg);
}

.hamburger-menu.expanded div:nth-child(2) {
  opacity: 0;
}

.hamburger-menu.expanded div:nth-child(3) {
  transform: rotate(-135deg);
}


@media screen and (max-width:1000px){
  .nav-links{
    display:none;
  }
  &.nav-expanded{
    nav{
      display:block;
      a,button{
        color:white;
        border-color:white;
      }
    }
    background:blue;
    animation: mobileMenuBg 5s linear infinite;

    position:fixed;
    width:100%;
    height:100%;
    overflow:hidden;
    z-index:100;
    .hamburger-menu {
      position:fixed;
    }
    .hamburger-menu div:nth-child(1) {
      top:17px;
    }
    .hamburger-menu div:nth-child(3) {
      top:18px;
    }

    .nav-links{
      display:block;
      a, .language-switcher{
        display:block;
        margin:0;
        padding:1.5em 0;
        text-align:center;
        color:white;
      }
      .language-switcher{
        margin-top:2em;
      }
    }

  }

}

@keyframes mobileMenuBg {
  0%   { background-color: #c3c342ff; } 
  16%  { background-color: #c272c2ff; }
  33%  { background-color: #46d1d1ff; }
  50%  { background-color: #c555cdff; }
  66%  { background-color: #f06363ff; } 
  83%  { background-color: #51e551ff; }  
  100% { background-color: #c3c342ff; }  
}

`;


export const Header = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [expanded, setExpanded] = useState(false);

  return (
    <Wrapper className={`${expanded ? 'nav-expanded' : ''}`}>
      <nav>
        <h1>
          <Link to={`/${currentLang}`}>{(currentLang == 'cs') ? 'Tomáš Vrána' : 'Tomas Vrana'}</Link>
        </h1>
        <div className={`nav-links`}>
          <Link to={`/${currentLang}`} onClick={() => setExpanded(!expanded)}>{t('navigation.home')}</Link>
          <Link to={`/${currentLang}/about`} onClick={() => setExpanded(!expanded)}>{t('navigation.about')}</Link>
          <Link to={`/${currentLang}/portfolio`} onClick={() => setExpanded(!expanded)}>{t('navigation.portfolio')}</Link>
          <Link to={`/${currentLang}/contact`} onClick={() => setExpanded(!expanded)}>{t('navigation.contact')}</Link>
          <LanguageSwitcher />
        </div>
        <div className={`hamburger-menu ${expanded ? 'expanded' : ''}`} onClick={() => setExpanded(!expanded)}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </nav>
    </Wrapper>
  );
};
