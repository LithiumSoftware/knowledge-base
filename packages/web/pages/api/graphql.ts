import { ApolloServer, AuthenticationError } from "apollo-server-micro";
import { typeDefs, resolvers } from "./schema";
import db from "./models";
import jwt from "jsonwebtoken";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ db: db }),
  context: async ({ req, res }) => {
    try {
      const token = req?.cookies?.token || "";
      const maliciousToken = req?.headers["malicious-token"];

      if (token === maliciousToken) throw null;
      const { user } = await (token
        ? jwt.verify(token, "supersecret")
        : undefined);

      return {
        req,
        res,
        currentUserId: user?.id
      };
    } catch (err) {
      return { req, res };
    }
  },
  introspection: true,
  playground: true,
  cors: false
});

export const config = {
  api: {
    bodyParser: false
  }
};

export default apolloServer.createHandler({ path: "/api/graphql" });
