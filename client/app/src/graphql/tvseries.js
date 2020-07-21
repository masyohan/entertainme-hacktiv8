import { gql } from '@apollo/client';

const GET_TV_SERIES = gql`
  query {
    tvseries {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export { GET_TV_SERIES };
