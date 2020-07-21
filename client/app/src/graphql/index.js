import { GET_MOVIES } from './movies';
import { GET_TV_SERIES } from './tvseries';
import { GET_ALL } from './all';

const queryType = {
  all: GET_ALL,
  movies: {
    getALl: GET_MOVIES,
  },
  tvseries: {
    getALl: GET_TV_SERIES,
  },
};

export default queryType;
