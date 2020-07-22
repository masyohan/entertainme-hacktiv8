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

const GET_TV_BY_ID = gql`
  query($id: ID) {
    tv(id: $id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export { GET_TV_SERIES, GET_TV_BY_ID };
