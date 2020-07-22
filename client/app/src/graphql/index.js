import {
  GET_MOVIES,
  ADD_MOVIES,
  GET_MOVIE_BY_ID,
  EDIT_MOVIES,
  DELETE_MOVIES,
} from './movies';
import { GET_TV_SERIES, GET_TV_BY_ID } from './tvseries';
import { GET_ALL } from './all';

const queryType = {
  all: GET_ALL,
  movies: {
    getAll: GET_MOVIES,
    add: ADD_MOVIES,
    getById: GET_MOVIE_BY_ID,
    edit: EDIT_MOVIES,
    delete: DELETE_MOVIES,
  },
  tvseries: {
    getAll: GET_TV_SERIES,
    getById: GET_TV_BY_ID,
  },
};

export default queryType;
