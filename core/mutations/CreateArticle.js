import gql from "graphql-tag";

export default gql`
  mutation createArticle($title: String!, $parentId: ID) {
    createdArticle(articleInput: { title: $title, parentId: $parentId }) {
      id
      title
    }
  }
`;
