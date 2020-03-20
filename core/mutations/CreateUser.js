import gql from "graphql-tag";

export default gql`
  mutation signup($username: String, $email: String!, $password: String!) {
    signedUser(
      userInput: { username: $username, email: $email, password: $password }
    ) {
      id
    }
  }
`;
