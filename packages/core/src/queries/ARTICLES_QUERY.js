import gql from "graphql-tag";

export default gql`
  query Articles {
    articles {
      id
      title
      parent {
        id
      }
    }
  }
`;
