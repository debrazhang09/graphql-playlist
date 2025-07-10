const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/graphql_playground')
.then(() => console.log('Connected to MongoDB locally'))
.catch(err => console.error('Connection error:', err));

const app = express();
app.use('/graphql',graphqlHTTP({
  schema,
  graphiql: true

}));

app.listen(4000, () => {
  console.log('now listening for requests on port 4000')
})