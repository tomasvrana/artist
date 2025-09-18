import { marked } from 'marked';
import yaml from 'js-yaml';
import type { Project } from '../types/project';

// Nahraď parseFrontmatter funkcí tímto:
function parseFrontmatter(content: string) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content };
  }
  
  const [, frontmatter, mainContent] = match;
  
  try {
    // Použij js-yaml pro správné parsování
    const data = yaml.load(frontmatter) as any;
    return { data, content: mainContent };
  } catch (error) {
    console.error('Error parsing frontmatter:', error);
    return { data: {}, content: mainContent };
  }
}

const projectModules = import.meta.glob('/src/content/projects/**/*.md', { 
  query: '?raw',
  import: 'default'
});

type PriceItem = {
  currency: string;
  value: number;
  old?: number;
};

export async function getAllProjects(locale: string): Promise<Project[]> {
  const projects: Project[] = [];
  
  for (const [path, loadModule] of Object.entries(projectModules)) {
    const pathMatch = path.match(/\/src\/content\/projects\/(\w+)\/([\w-]+)\.md$/);
    
    if (!pathMatch) continue;
    
    const [, fileLocale, slug] = pathMatch;
    
    if (fileLocale !== locale) continue;
    
    try {
      const rawContent = await loadModule() as string;
      const { data, content } = parseFrontmatter(rawContent);
      
      const htmlContent = marked(content);
      
      projects.push({
        slug,
        title: data.title || slug,
        description: data.description || '',
        date: new Date(data.date),
        tags: Array.isArray(data.tags) ? data.tags : [],
        price: Array.isArray(data.price) ? data.price as PriceItem[] : [],
        thumb: data.thumb,
        location: data.location,
        media: data.media,
        image: data.image,
        year: data.year,
        nft: data.nft,
        sliderheight: data.sliderheight,
        width: data.width,
        height: data.height,
        available: data.available,
        gallery: data.gallery,
        content: htmlContent,
        links: data.links,
      });
    } catch (error) {
      console.error(`Error loading project ${path}:`, error);
    }
  }
  
  // Seřaď projekty podle data (nejnovější první)
  return projects.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export async function getProjectBySlug(slug: string, locale: string): Promise<Project | null> {
  const projectPath = `/src/content/projects/${locale}/${slug}.md`;
  const loadModule = projectModules[projectPath];
  
  if (!loadModule) {
    console.error(`Project not found: ${projectPath}`);
    return null;
  }
  
  try {
    const rawContent = await loadModule() as string;
    const { data, content } = parseFrontmatter(rawContent);
    
    const htmlContent = marked(content);
    
    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      date: data.date || new Date().toISOString(),
      tags: Array.isArray(data.tags) ? data.tags : [],
      price: Array.isArray(data.price) ? data.price as PriceItem[] : [],
      thumb: data.thumb,
      location: data.location,
      media: data.media,
      nft: data.nft,
      image: data.image,
      year: data.year,
      sliderheight: data.sliderheight,
      width: data.width,
      height: data.height,
      available: data.available,
      gallery: data.gallery,
      content: htmlContent,
      links: data.links,
    };
  } catch (error) {
    console.error(`Error loading project ${slug}:`, error);
    return null;
  }
}
