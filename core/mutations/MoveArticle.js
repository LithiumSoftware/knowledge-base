import gql from "graphql-tag";

export default gql`
  mutation moveArticle($id: ID!, $parentId: ID!) {
    movedArticle(id: $id, parentId: $parentId)
  }
`;
