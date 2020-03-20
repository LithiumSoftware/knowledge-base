import gql from "graphql-tag";

export default gql`
  query getArticleModifications($id: ID!) {
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
