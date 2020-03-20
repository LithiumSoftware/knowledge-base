import gql from "graphql-tag";

export default gql`
  mutation updateArticle($id: ID, $title: String, $body: String) {
    updatedArticle(articleInput: { id: $id, title: $title, body: $body }) {
      updatedAt
    }
  }
`;
