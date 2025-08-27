import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAllProjects } from '../../lib/markdown';
import type { Project } from '../../types/project';


const MasonryGrid = styled.div`
  column-count: 3;
  column-gap: 1.5rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 900px) {
    column-count: 2;
  }
  @media (max-width: 600px) {
    column-count: 1;
    column-gap: 1rem;
  }
`;

const MasonryItem = styled.div`
  background: #fff;
  margin-bottom: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.07);
  display: inline-block;
  width: 100%;
  overflow: hidden;
  
  img {
    width: 100%;
    display: block;
    border-radius: 12px 12px 0 0;
    object-fit: cover;
    /* Výška obrázku je různá pro efekt masonry */
    height: auto;
    max-height: 350px;
    min-height: 180px;
    aspect-ratio: auto;
    transition: transform .2s;
    &:hover {
      transform: scale(1.03);
    }
  }

  .info {
    padding: 1rem;
    font-size: 1.1rem;
    font-weight: bold;
    color: #222;
    text-align: center;
    background: #f7f7f7;
    border-radius: 0 0 12px 12px;
    letter-spacing: .02em;
    min-height: 48px;
    display:flex; align-items:center; justify-content:center;
  }
`;

export const MasonryProjectList = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>('all');
  
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
      return <div className="loading">{t('common.loading')}</div>;
    }
  
    return (
      <MasonryGrid>
        {projects.map((project) => (
          <MasonryItem key={project.id}>
            <img src={project.gallery[0].image} alt={project.title} />
            <div className="info">{project.title}</div>
          </MasonryItem>
        ))}
      </MasonryGrid>
    );
}
