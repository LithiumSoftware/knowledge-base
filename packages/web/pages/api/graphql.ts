import { ApolloServer } from 'apollo-server-micro';
import resolvers from './resolvers';
import typeDefs from './typeDefs';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
