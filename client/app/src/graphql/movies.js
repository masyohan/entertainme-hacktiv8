import { gql } from '@apollo/client';

const GET_MOVIES = gql`
  query {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export { GET_MOVIES };
