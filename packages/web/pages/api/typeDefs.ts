import { gql } from "apollo-server-micro";

const typeDefs = gql`
  scalar Date
  type Query {
    sayHello: String
  }
`;

export default typeDefs;
