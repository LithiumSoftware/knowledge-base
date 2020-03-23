import gql from "graphql-tag";

export default gql`
  mutation MoveArticle($id: ID!, $parentId: ID!) {
    moveArticle(id: $id, parentId: $parentId)
  }
`;
