import gql from "graphql-tag";

export default gql`
  {
    articles {
      id
      title
      parent {
        id
      }
    }
  }
`;
