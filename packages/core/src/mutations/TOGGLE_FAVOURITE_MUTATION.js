import gql from "graphql-tag";

export default gql`
  mutation ToggleFavourite($articleId: ID!) {
    toggleFavourite(articleId: $articleId)
  }
`;
