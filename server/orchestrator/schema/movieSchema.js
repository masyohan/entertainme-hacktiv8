const { gql } = require('apollo-server');
const axios = require('axios');
const baseURL = process.env.MOVIES_SERVICES_PATH

const typeDefs = gql`
type Movie{
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
    message: String
}
extend type Query{
    movies: [Movie]
    movie(id: ID) : Movie
}

input MovieInput {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
}

extend type Mutation{
    addMovie(movie: MovieInput) : Movie
    updateMovie(id: ID, movie: MovieInput) : Movie
    deleteMovie(id: ID) : Movie
}

`

const resolvers = {
    Query: {
        movies: async () => {
            const { data } = await axios.get(baseURL);
            return data;
        },
        movie: async (parent, args, context, info) => {
            const { id } = args;
            const { data } = await axios.get(`${baseURL}/${id}`);
            return data
        }
    },
    Mutation: {
        addMovie: async (_, args) => {
            const { movie } = args;
            const { data } = await axios.post(baseURL, movie);
            return data;
        },
        updateMovie: async (_, args) => {
            const { id, movie } = args;
            const { data } = await axios.put(`${baseURL}/${id}`, movie);
            return data.movie;
        },
        deleteMovie: async (_, args) => {
            const { id } = args;
            const { data } = await axios.delete(`${baseURL}/${id}`);
            return data;
        }
    }
}

module.exports = {
    typeDefs,
    resolvers
}