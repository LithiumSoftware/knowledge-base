import gql from "graphql-tag";

export default gql`
  mutation Signup($username: String, $email: String!, $password: String!) {
    signedUser(input: { username: $username, email: $email, password: $password }) {
      id
    }
  }
`;
