import gql from "graphql-tag";

export default gql`
  mutation login($identifier: String!, $password: String!) {
    loggedUser(userInput: { identifier: $identifier, password: $password }) {
      id
    }
  }
`;
