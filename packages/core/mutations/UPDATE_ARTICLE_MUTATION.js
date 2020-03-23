import gql from "graphql-tag";

export default gql`
  mutation UpdateArticle($id: ID, $title: String, $body: String) {
    updateArticle(articleInput: { id: $id, title: $title, body: $body }) {
      updatedAt
    }
  }
`;
