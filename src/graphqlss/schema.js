import { gql } from '@apollo/client';
import { getAllProjects, getProjectBySlug } from '../lib/markdown';

// Definice typů pomocí gql template literal
export const typeDefs = gql`
  type Project {
    id: ID!
    title: String!
    date: String!
    tags: [String!]!
    description: String!
    content: String!
    lang: String!
    slug: String!
  }

  type Query {
    projects(lang: String): [Project!]!
    project(slug: String!): Project
  }
`;

// Resolvers implementace
export const resolvers = {
  Query: {
    projects: (_, { lang }) => getAllProjects(lang),
    project: (_, { slug }) => getProjectBySlug(slug),
  },
};

// Export schématu pro použití v Apollo Serveru
export const schema = {
  typeDefs,
  resolvers,
};
