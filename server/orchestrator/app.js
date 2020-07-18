if(process.env.NODE_ENV == 'development'){
    require('dotenv').config();
}
const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server');
const movieSchema = require('./schema/movieSchema');
const tvseriesSchema = require('./schema/tvseriesSchema');

const typeDefs = gql`
    type Query
    type Mutation
`

const schema = makeExecutableSchema({
    typeDefs: [
        typeDefs,
        movieSchema.typeDefs,
        tvseriesSchema.typeDefs
    ],
    resolvers: [
        movieSchema.resolvers,
        tvseriesSchema.resolvers
    ]
})

const server = new ApolloServer({
    schema
})

server.listen().then(({ url }) => {
    console.log(`orchestrator graphql running at ${url}`);
})