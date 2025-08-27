import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { getAllProjects, getProjectBySlug } from '@/lib/markdown';
import { readFileSync } from 'fs';
import { join } from 'path';

const typeDefs = readFileSync(
  join(process.cwd(), 'schema.graphql'),
  'utf-8'
);

const resolvers = {
  Query: {
    projects: (_, { lang }) => getAllProjects(lang),
    project: (_, { slug }) => getProjectBySlug(slug),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export default startServerAndCreateNextHandler(server);
