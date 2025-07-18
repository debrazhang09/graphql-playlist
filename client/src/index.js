import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import MockBookApp from './MockBookApp'
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

const client = new ApolloClient({
  /* the express-graphql server which can not be used
  because new version of graphql can not support the development of
  both apollo-server and express-server  */
  // uri: 'http://localhost:4000/graphql',
  /* this is the apollo-server which is the main project for real usage*/
  // uri: 'http://localhost:4001/',
  /* this is the mock simple book server prepared for interview */
  uri : 'http://localhost:4002/',
  cache: new InMemoryCache()
})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      {/* this is the whole booklists and addbooks with real db, server uri is http:localhost:4001/ */}
      {/* <App /> */}
      <MockBookApp />
    </ApolloProvider>
  </React.StrictMode>
);

