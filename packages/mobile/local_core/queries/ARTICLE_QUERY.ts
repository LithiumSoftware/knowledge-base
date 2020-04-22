import gql from "graphql-tag";

export default gql`
  query Article($id: ID!) {
    article(id: $id) {
      id
      title
      body
      rootPath
      author {
        id
        username
      }
      children {
        id
        title
      }
      updatedAt
      createdAt
    }
  }
`;
