import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";
import { AuthenticationError } from "apollo-server-micro";

export const typeDef = `
  scalar Date

  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

export const resolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.getTime();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value);
      }
      return null;
    }
  })
};

export const authenticated = next => (root, args, context, info) => {
  if (!context.currentUserId) {
    throw new AuthenticationError("No user detected, please log in.");
  }

  return next(root, args, context, info);
};
