import gql from "graphql-tag";

export default gql`
  mutation Login($identifier: String!, $password: String!) {
    loggedUser(input: { identifier: $identifier, password: $password }) {
      id
    }
  }
`;
