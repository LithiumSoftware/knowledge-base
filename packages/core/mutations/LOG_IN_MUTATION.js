import gql from "graphql-tag";

export default gql`
  mutation Login($identifier: String!, $password: String!) {
    login(userInput: { identifier: $identifier, password: $password }) {
      id
    }
  }
`;
