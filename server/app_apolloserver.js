const {ApolloServer}  = require('@apollo/server');
const {startStandaloneServer} = require('@apollo/server/standalone');
const mongoose = require('mongoose');
const {typeDefs, resolvers} =  require('./schema/schema_apolloserver');

const startServer = async() => {
  try {
    await mongoose.connect('mongodb://localhost:27017/graphql_playground')
    console.log('connected to mongodb')
  } catch (error) {
    console.error('Error connect to mongodb', error.message);
  }
  const server = new ApolloServer({
    typeDefs,
    resolvers
  })
  const {url} = await startStandaloneServer(server, {
    listen: {port: 4001},
    context: async({req}) => ({}),
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    }
  })
  console.log('Apollo server ready at: ', url)
};
startServer();