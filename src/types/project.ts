export interface Project {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  available?: string;
  image?: string;
  content: string;
  gallery?: Array<{
    image: string;
    link?: string;
    alt?: string;
  }>;
  links?: {
    demo?: string;
    github?: string;
    [key: string]: string | undefined;
  };
}
