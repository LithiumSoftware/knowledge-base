import gql from "graphql-tag";

export default gql`
  query FavouriteArticles($id: ID!) {
    me {
      id
      favourites {
        id
        title
        parent {
          id
        }
      }
    }
  }
`;
