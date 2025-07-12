const graphql = require('graphql');
const Book = require('../models/books');
const Author = require('../models/authors');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;
const _= require('lodash');
//dummy data
// var books = [
//   { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
//   { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
//   { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
//   { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
//   { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
//   { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },

// ];
// var authors = [
//   {name: 'Patrick Rothfull', age: 44, id: '1'},
//   {name: 'Brandon Sanderson', age: 42, id: '2'},
//   {name: 'Terry Pratchett', age: 66, id:'3'}
// ];
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    author: {
      type: AuthorType,
      async resolve(parent, args) {
        // return _.find(authors, {id: parent.authorId})
        try {
          return await Author.findById(parent.authorId)
        } catch (err) {
          console.error('Error:', err.message)
        }
      }
    }
  })
});
const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books: {
      type: new GraphQLList(BookType),
      async resolve(parent, args) {
        // return _.filter(books, {authorId: parent.id})
        try {
          return await Book.find({authorId: parent.id})
        } catch(err) {
          console.error('Error:', err.message)
        }
      }
    }
  })
});


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {id: {type: GraphQLID}},
      async resolve(parent, args) {
        //code to get data from db/other source
        // return _.find(books, {id: args.id});
        try {
          return await Book.findById(args.id);
        } catch(err) {
          console.error('Error:', err.message)
        }

      }
    },
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      async resolve(parent, args) {
        // return _.find(authors, {id:args.id})
        try {
          return await Author.findById(args.id)
        } catch(err) {
          console.error('Error:', err.message)
        }
      }
    },
    books: {
      type: new GraphQLList(BookType),
      async resolve(parent, args) {
        // return books
        try {
          return await Book.find({});
        } catch (err) {
          console.error('Error:', err.message)
        }
      }
    },
    authors : {
      type: new GraphQLList(AuthorType),
      async resolve(parent, args) {
        // return authors
        try {
          return await Author.find({});
        } catch(err) {
          console.error('Error', err.message)
        }
      }
    }
  }
})
const Mutation = new GraphQLObjectType({
  name:'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: {type:  new GraphQLNonNull(GraphQLInt)}
      },
      async resolve(parent, args) {
        try {
          let author = new Author({
            name : args.name,
            age: args.age
          });
          return await author.save();
        } catch (err) {
          console.error('Error:', err.message);
        }
      }
    },
    addBook: {
      type: BookType,
      args: {
        name:  {type: new GraphQLNonNull(GraphQLString)},
        genre: {type: new GraphQLNonNull(GraphQLString)},
        authorId: {type: new GraphQLNonNull(GraphQLID)}
      },
      async resolve(parent, args) {
        try {

          let book = new Book({
            name: args.name,
            genre:args.genre,
            authorId: args.authorId
          });
          return await book.save();
        } catch (err) {
          console.error('Error:', err.message)
        }
      }
    }
  }
})
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})