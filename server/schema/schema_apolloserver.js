const Book = require('../models/books');
const Author = require('../models/authors');

const typeDefs = `#graphql
  type Book {
    id: ID!
    name: String!
    genre: String!
    author: Author
  }
  type Author {
    id: ID!
    name: String!
    age: Int!
    books: [Book!]!
  }
  type Query {
    book(id: ID!) : Book
    author(id: ID!) : Author
    books: [Book!]!
    authors: [Author!]!
  }
  type Mutation {
    addAuthor(name: String!, age: Int!): Author
    addBook(name: String!, genre: String!, authorId:ID!) : Book
  }
`;

const resolvers = {
  Query: {
    book: async(_, {id}) => await Book.findById(id),
    author:async(_, {id}) => await Author.findById(id),
    books: async() => await Book.find({}),
    authors: async() => await Author.find({}),
  },
  Book: {
    author: async(book) => await Author.findById(book.authorId)
  },
  Author: {
    books : async(author) => await Book.find({authorId: author.id})
  },
  Mutation : {
    addAuthor: async(_, {name, age}) => {
      const author = new Author({name, age});
      return await author.save();
    },
    addBook: async(_, {name, genre, authorId})=> {
      const book = new Book({name, genre, authorId});
      return await book.save();
    }
  }

}
module.exports = {typeDefs, resolvers}
