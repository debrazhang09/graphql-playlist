const {ApolloServer} = require('@apollo/server');
const {startStandaloneServer} = require('@apollo/server/standalone');

// mock data
const books = [
  {id: '0', name :'Harry Porter', author: 'J.K. Rowling', publishedYear: 1997},
  {id:'1', name: '1984', author: 'George Orwell', publishedYear: 1925},
  { id: "2", name: "The Hobbit", author: "J.R.R. Tolkien", publishedYear: 1937 },
]
// implement a graphql query with filtering
const typeDefs = `#graphql
  type Book {
    id: ID!
    name: String!
    author: String!
    publishedYear: Int!
  }
  type Query {
    getBooks(authorName: String, publishedYear: Int) : [Book!]!
  }
  type Mutation {
    addBook(name: String!, authorName: String!, publishedYear: Int! ) : Book!
  }
`;
const resolvers = {
  Query: {
    // implement the filter resolver using mock data instead of real db
    getBooks: (_, {authorName, publishedYear}) => {
      // no authorName || published return all books
      return books.filter((book) => {
        const matchAuthorName = !authorName || book.author.toLowerCase() === authorName.toLowerCase();
        const matchPublished = !publishedYear || book.publishedYear >= publishedYear;
        return matchAuthorName && matchPublished;
      })
    }
  },
  Mutation: {
    //implement add a book using mock data instead of real db
    addBook : (_, {name, authorName, publishedYear}) => {
      //check the name whether it's repeated
      const isDuplicate = books.some((book) => {
        return (
        name.toLowerCase() === book.name.toLowerCase() &&
        authorName.toLowerCase() === book.author.toLowerCase() &&
        publishedYear === book.publishedYear
        )
      })
      if (isDuplicate) {
        throw new Error("Book alread exist")
      }

      const newBook = {
        id: books.length.toString(),
        name,
        author :authorName,
        publishedYear
      }
      books.push(newBook);
      return newBook;
    }
  }

}
const startServer = async () => {
  const server = new ApolloServer({
      typeDefs,
      resolvers
    });
  const {url} = await startStandaloneServer(server, {
    listen: {port: 4002},
    context: async({req}) => ({}),
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    }
  })
  console.log('Apollo server ready at: ', url)
};
startServer();