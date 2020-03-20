import gql from "graphql-tag";

export default gql`
  {
    verifiedUser {
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
