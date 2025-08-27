import { useState, useEffect } from 'react';
import { marked } from 'marked';
import { useTranslation } from 'react-i18next';

interface PageContent {
  title: string;
  content: string;
  [key: string]: any;
}

// Vlastní frontmatter parser (stejný jako v markdown.ts)
function parseFrontmatter(content: string) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content };
  }
  
  const [, frontmatter, mainContent] = match;
  const data: any = {};
  
  frontmatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      data[key] = value;
    }
  });
  
  return { data, content: mainContent };
}

const pageModules = import.meta.glob('/src/content/pages/**/*.md', { 
  query: '?raw',
  import: 'default'
});

export function usePageContent(pageName: string): PageContent | null {
  const { i18n } = useTranslation();
  const [content, setContent] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPage = async () => {
      const pagePath = `/src/content/pages/${i18n.language}/${pageName}.md`;
      const loadModule = pageModules[pagePath];
      
      if (!loadModule) {
        console.error(`Page not found: ${pagePath}`);
        setContent(null);
        setLoading(false);
        return;
      }
      
      try {
        const rawContent = await loadModule() as string;
        const { data, content: markdownContent } = parseFrontmatter(rawContent);
        const htmlContent = marked(markdownContent);
        
        setContent({
          ...data,
          content: htmlContent
        });
      } catch (error) {
        console.error(`Error loading page ${pageName}:`, error);
        setContent(null);
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, [pageName, i18n.language]);

  return loading ? null : content;
}
