import gql from "graphql-tag";

export default gql`
  mutation Signup($username: String, $email: String!, $password: String!) {
    signup(userInput: { username: $username, email: $email, password: $password }) {
      id
    }
  }
`;
