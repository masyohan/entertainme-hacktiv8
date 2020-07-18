const { gql } = require('apollo-server');
const axios = require('axios');
const baseURL = process.env.TV_SERIES_SERVICES_PATH

const typeDefs = gql`
type TvSeries{
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
    message: String
}
extend type Query{
    tvseries: [TvSeries]
    tv(id: ID) : TvSeries
}

input TvInput {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
}

extend type Mutation{
    addTvSeries(tv: TvInput) : TvSeries
    updateTvSeries(id: ID, tv: TvInput) : TvSeries
    deleteTvSeries(id: ID) : TvSeries
}

`

const resolvers = {
    Query: {
        tvseries: async () => {
            const { data } = await axios.get(baseURL);
            return data;
        },
        tv: async (parent, args, context, info) => {
            const { id } = args;
            const { data } = await axios.get(`${baseURL}/${id}`);
            return data
        }
    },
    Mutation: {
        addTvSeries: async (_, args) => {
            const { tv } = args;
            const { data } = await axios.post(baseURL, tv);
            return data;
        },
        updateTvSeries: async (_, args) => {
            const { id, tv } = args;
            const { data } = await axios.put(`${baseURL}/${id}`, tv);
            return data.tv_series;
        },
        deleteTvSeries: async (_, args) => {
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