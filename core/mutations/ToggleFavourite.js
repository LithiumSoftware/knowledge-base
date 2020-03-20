import gql from "graphql-tag";

export default gql`
  mutation toggleFavourite($articleId: ID!) {
    isFavourite(articleId: $articleId)
  }
`;
