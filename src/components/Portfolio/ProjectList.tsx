import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAllProjects } from '../../lib/markdown';
import type { Project } from '../../types/project';
import { useTranslatedTags } from '../../hooks/useTranslatedTags';

const ProjectsGrid = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
gap: 3rem 1rem;
margin:auto;
@media screen and (max-width:1000px){
gap:3rem 0;
}
`;

const ProjectCard = styled.article<{ $rotx?: number; $roty?: number; }>`
  border: 0px solid #ddd;
  padding:0px 0 20px 0;
  border-radius: 0px;
  text-align:center;
  perspective-origin: 150% 150%;
  transform-style: preserve-3d;
  perspective:300px;
  width:100%;
  
  .thumbnail{
    transform:rotateX(${props => props.$rotx}deg) rotateY(${props => props.$roty}deg);
    display: block;
    margin:auto;
    width:300px;
    .thumb{
      width:100%;
      height:300px;
      object-fit: cover;
    }
    .status{
      text-align:right;
      width:310px;
      position:absolute;
      margin-top:-300px;

      &.status-3,&.status-4{
        margin-top:-80px;
      }
      p {
        text-transform:uppercase;
        background:#0f0;
        display:inline-block;
        font-size:.85rem;
        line-height:1.5;
        padding:5px 15px;
        letter-spacing:.2em;
        &::after{
          display:block;
          content:"";
          width:0;
          height:0;
          position: absolute;
          z-index:999;
          border-left: 7px solid transparent;
          border-right: 7px solid transparent;
          border-bottom: 7px solid #0f0;
          rotate:-45deg;
          right:0;
          margin-top:5px;
        }
        &.available::after{
        }
        &.sold{
          background:red;
          color:white;
          font-weight:600;
          &::after{
            border-left: 7px solid transparent;
            border-right: 7px solid transparent;
            border-bottom: 7px solid red;
          }
        }
        &.public{
          background:cyan;
          color:#333;
          font-weight:600;
          &::after{
            border-left: 7px solid transparent;
            border-right: 7px solid transparent;
            border-bottom: 7px solid cyan;
          }
        }
        &.removed{
          background:white;
          color:#333;
          font-weight:600;
          &::after{
            border-left: 7px solid transparent;
            border-right: 7px solid transparent;
            border-bottom: 7px solid white;
          }
        }
        &.over{
          background:#333;
          color:white;
          font-weight:600;
          &::after{
            border-left: 7px solid transparent;
            border-right: 7px solid transparent;
            border-bottom: 7px solid #333;
          }
        }
      }
    }
    .nft{
      position:absolute;
      top:16%;
      right:5%;
      width:70px;
      height:70px;
    }
  }
  .info{
    transform:rotateX(${props => props.$rotx}deg) rotateY(${props => props.$roty}deg);
    width:300px;
    background:rgba(255,255,255,0.6);
    padding:10px 0;
    h2{
      font-size:160%;
      font-weight:200;
      margin:.1em 0 0 0;
      line-height:1;
    }
    .year{
      font-size:80%;
      line-height:2;
      margin:0 0 .1em 0;
      letter-spacing:.3em;
    }
  }


`;

export const ProjectList = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const { translateTag } = useTranslatedTags();

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        const projectsData = await getAllProjects(i18n.language);
        setProjects(projectsData);
      } catch (error) {
        console.error('Error loading projects:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [i18n.language]);

  const uniqueTags = Array.from(
    new Set(projects.flatMap(project => project.tags))
  ).sort();

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.tags.includes(filter));

  if (loading) {
    return <div className="loading text-center">
      <p>{t('common.loading')} ...</p>
      <div className="loader"></div>
      </div>;
  }

  return (
    <div className="project-list">
      {uniqueTags.length > 0 && (
        <div className="filter-tags">
          <button 
            className={`filter-tag ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            {t('portfolio.allProjects')}
          </button>
          {uniqueTags.map(tag => (
            <button
              key={tag}
              className={`filter-tag ${filter === tag ? 'active' : ''}`}
              onClick={() => setFilter(tag)}
            >
              {translateTag(tag)}
            </button>
          ))}
        </div>
      )}

      <ProjectsGrid className="projects-grid">
        {filteredProjects.length === 0 ? (
          <p className="no-projects">{t('portfolio.noProjects')}</p>
        ) : (
          filteredProjects.map((project) => (
            <ProjectCard 
              key={project.slug} 
              className="project-card"
              onClick={() => navigate(`/${i18n.language}/portfolio/${project.slug}`)}
              $rotx={`${(Math.floor(Math.random() * 50) - 25) / 20}`} 
              $roty={`${(Math.floor(Math.random() * 50) - 25) / 10}`}
            >
              <div className="thumbnail">
                {project.thumb &&
                  <img src={project.thumb} className='thumb' alt={''} />
                }
                {project.nft &&
                  <img src="/nft-icon-small.png" className='nft' alt="NFT" />
                }
                <div className={`status status-${project.available}`}>
                  {(project.available == 0) && 
                    <p className="sold">{t('portfolio.sold')}</p>
                  }
                  {(project.available == 1) && 
                    <p className="available">{t('portfolio.available')}</p>
                  }
                  {(project.available == 2) && 
                    <p className="public">{t('portfolio.public')}</p>
                  }
                  {(project.available == 3) && 
                    <p className="removed">{t('portfolio.removed')}</p>
                  }
                  {(project.available == 4) && 
                    <p className="over">{t('portfolio.over')}</p>
                  }
                </div>
                <div className="info">
                  <h2>{project.title}</h2>
                  <div className="year">{project.year}</div>
                </div>
              </div>

            </ProjectCard>
          ))
        )}
      </ProjectsGrid>
    </div>
  );
};
