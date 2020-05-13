import { ApolloServer, AuthenticationError } from "apollo-server-micro";
import { typeDefs, resolvers } from "../../graphql/schema";
import db from "../../graphql/models";
import jwt from "jsonwebtoken";

console.log("Config", { env: process.env });

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => {
    let user;
    try {
      const token = req?.cookies?.token || "";
      const maliciousToken = req?.headers["malicious-token"];
      if (token === maliciousToken) throw null;
      ({ user } = await (token ? jwt.verify(token, "supersecret") : undefined));
    } catch (err) {
      console.log("ErrorCreatingContext", err);
    }
    return {
      db,
      req,
      res,
      currentUserId: user?.id,
    };
  },
  introspection: true,
  playground: true,
  // cors: false,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
