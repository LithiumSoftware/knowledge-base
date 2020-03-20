import gql from "graphql-tag";

export default gql`
  query getArticle($id: ID!) {
    article(id: $id) {
      id
      title
      body
      rootPath
      author {
        id
        username
      }
      updatedAt
    }
  }
`;
