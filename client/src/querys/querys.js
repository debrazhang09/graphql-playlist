import {gql} from '@apollo/client';


const GET_BOOKS = gql`
{
  books {
    name
    id
  }
}
`;
const GET_Authors = gql`
{
  authors {
    name
    id
  }
}
`;
const ADD_BOOK = gql`
  mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      id
      name
    }
  }
`;
export {GET_BOOKS, GET_Authors, ADD_BOOK};
