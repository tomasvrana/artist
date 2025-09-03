import { useState, useEffect } from 'react';
import { marked } from 'marked';
import { useTranslation } from 'react-i18next';
import yaml from "js-yaml";

interface PageContent {
  title: string;
  content: string;
  [key: string]: any;
}

// Vlastní frontmatter parser (stejný jako v markdown.ts)
function parseFrontmatter(content: string) {
  // najdeme první blok oddělený ---
  if (!content.startsWith("---")) {
    return { data: {}, content };
  }

  const end = content.indexOf("\n---", 3);
  if (end === -1) {
    return { data: {}, content };
  }

  const frontmatter = content.slice(3, end).trim();
  const mainContent = content.slice(end + 4).trim();

  try {
    const data = yaml.load(frontmatter) as any;
    return { data, content: mainContent };
  } catch (error) {
    console.error("Error parsing frontmatter:", error);
    return { data: {}, content: mainContent };
  }
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
