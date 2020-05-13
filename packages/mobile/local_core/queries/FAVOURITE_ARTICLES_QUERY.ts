import gql from "graphql-tag";

export default gql`
  query FavouriteArticles {
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
