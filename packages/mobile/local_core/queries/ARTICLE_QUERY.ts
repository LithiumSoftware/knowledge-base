import gql from "graphql-tag";

export default gql`
  query Article($id: ID!) {
    article(id: $id) {
      id
      title
      body
      favourited
      rootPath
      author {
        id
        username
      }
      children {
        id
        title
      }
      parent {
        id
        title
      }
      updatedAt
      createdAt
    }
  }
`;
