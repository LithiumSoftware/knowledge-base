import gql from "graphql-tag";

export default gql`
  mutation CreateArticle($title: String! = "Untitled", $parentId: ID) {
    createArticle(input: { title: $title, parentId: $parentId }) {
      id
      title
      parent {
        id
      }
    }
  }
`;
