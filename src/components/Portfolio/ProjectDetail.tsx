import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { getProjectBySlug } from '../../lib/markdown';
import type { Project } from '../../types/project';
import styled from 'styled-components';
import Content from '../Content';
import Status from '../Status';
import Label from '../Label';
import { CurrencyProvider, useCurrency } from "../../context/CurrencyContext";

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
.project-content .dash{
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
    .project-details{
      min-width:220px;
      border-left:1px solid #999;
      padding:30px 0 1em 35px;
      p{
        margin:0 0 5px 0;
        &.height{
          margin-bottom:15px;
        }
      }
    }
    .project-content{
      padding:20px 30px 0 0;
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
  old?: number;
}

function formatVal(val){
  const { value, setValue } = useCurrency();
  return new Intl.NumberFormat(value === "CZK" ? "cs-CZ" : "en-US").format(val);
}


function CurrencySelect({ array }: { array: CurrencyItem[] }) {
  const { t, i18n } = useTranslation();
  const { value, setValue } = useCurrency();
  const current = array.find((el) => el.currency === value);

  return (
    <div className="price-details">
      {current.old ? (
        <div>
          <p><Label>{t('portfolio.oldprice')}</Label>: <span className="oldprice">&nbsp;{formatVal(current.old)}&nbsp;</span> {value}</p>
          <p><Label>{t('portfolio.sale')}</Label>:<br /><strong className="price">{formatVal(current.value)}</strong> {value}</p>
        </div>
      ) : (
        <p>{t('portfolio.price')}: <strong className="price">{current.value}</strong> {value}</p>
      )}
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

export const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      if (!slug) return;
      
      setLoading(true);
      try {
        const projectData = await getProjectBySlug(slug, i18n.language);
        setProject(projectData);
      } catch (error) {
        console.error('Error loading project:', error);
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [slug, i18n.language]);

  if (loading) {
    return <div className="loading">{t('common.loading')}</div>;
  }
  
  if (!project) {
    return (
      <div className="content error-page">
        <h1>{t('portfolio.projectNotFound')}</h1>
        <button onClick={() => navigate(`/${i18n.language}/portfolio`)}>
          {t('common.back')}
        </button>
      </div>
    );
  }

  return (
    <CurrencyProvider>
      <Detail className="project-detail">
        <Content>

          <div className="top text-center">
            <button 
              className="back-button" 
              onClick={() => navigate(`/${i18n.language}/portfolio`)}
            >
              {t('common.back')}<br />←
            </button>
            
            <div className="heading">
              <h1>{project.title}</h1>
            </div>
            <span className="year">{project.year}</span>

          </div>

          <div className="featured">
            {project.image ? (
              <div className="images">
                <img src={project.image} />
              </div>
            ) : (
              <div>
                {project.gallery.map((item, index) => (
                  <div className="images" key={index}>
                    <img src={item.image} />
                  </div>
                ))}
              </div>
            )}
          </div>

          
          <div className="information">
            <div className="top">
              <div className="project-content">
                <div className="text" dangerouslySetInnerHTML={{ __html: project.content }} />
              </div>
              <div className="project-details">
                {project.width &&
                  <p className="width"><Label>{t('portfolio.width')}: </Label> {project.width} cm</p>
                }
                {project.height &&
                  <p className="height"><Label>{t('portfolio.height')}: </Label> {project.height} cm</p>
                }
                {project.media &&
                  <p className="technique"><Label>{t('portfolio.technique')}: </Label> {project.media}</p>
                }
                {project.location &&
                  <p className="location"><Label>{t('portfolio.location')}: </Label> {project.location}</p>
                }
              </div>
            </div>
            <div className="status-details">
              <Status available={project.available} />
              {project.price &&
                <CurrencySelect array={project.price} />
              }
            </div>
          </div>

          <div className="images gallery">
            {project.gallery.map((item, index) => (
              <div className="image" key={index}>
                <img src={item.image} />
              </div>
            ))}
          </div>

        </Content>
      </Detail>
    </CurrencyProvider>
  );
};
