import gql from "graphql-tag";

export default gql`
  query ArticleModifications($id: ID!) {
    articleModifications(id: $id) {
      id
      user {
        id
        username
      }
      title
      body
      author {
        id
        username
      }
      updatedAt
    }
  }
`;
