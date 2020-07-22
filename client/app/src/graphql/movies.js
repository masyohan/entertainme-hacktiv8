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

const ADD_MOVIES = gql`
  mutation($data: MovieInput) {
    addMovie(movie: $data) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

const EDIT_MOVIES = gql`
  mutation($id: ID, $data: MovieInput) {
    updateMovie(id: $id, movie: $data) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

const DELETE_MOVIES = gql`
  mutation($id: ID) {
    deleteMovie(id: $id) {
      message
    }
  }
`;

const GET_MOVIE_BY_ID = gql`
  query($id: ID) {
    movie(id: $id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export {
  GET_MOVIES,
  ADD_MOVIES,
  GET_MOVIE_BY_ID,
  EDIT_MOVIES,
  DELETE_MOVIES,
};
