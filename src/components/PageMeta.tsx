import { useEffect } from 'react';

interface PageMetaProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
}

export const PageMeta: React.FC<PageMetaProps> = ({ 
  title, 
  description, 
  image,
  url 
}) => {
  useEffect(() => {
    // Update title
    document.title = title;
    
    // Update meta tags
    const updateMetaTag = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`) || 
                    document.querySelector(`meta[property="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        if (name.startsWith('og:')) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };
    
    if (description) {
      updateMetaTag('description', description);
      updateMetaTag('og:description', description);
    }
    
    if (image) {
      updateMetaTag('og:image', image);
    }
    
    if (url) {
      updateMetaTag('og:url', url);
    }
    
    updateMetaTag('og:title', title);
    
  }, [title, description, image, url]);
  
  return null;
};
