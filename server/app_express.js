const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/graphql_playground')
.then(() => console.log('Connected to MongoDB locally'))
.catch(err => console.error('Connection error:', err));

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
app.use('/graphql',graphqlHTTP({
  schema,
  graphiql: true,
  customFormatErrorFn: (err) => {
    console.error('GraphQL error:', err.message);
    return {message: err.message, statusCode: 500}
  }

}));

app.listen(4000, () => {
  console.log('now listening for requests on port 4000')
})