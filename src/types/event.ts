export interface Event {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  image?: string;
  content: string;
  gallery?: Array<{
    image: string;
    link?: string;
    alt?: string;
  }>;
}
