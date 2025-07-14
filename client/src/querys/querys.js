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

const GET_BOOK_DETAIL= gql`
  query GETBook($id: ID!) {
    book(id:$id) {
      id
      name
      genre
      author {
        name
        age
      }
    }
  }
`;
export {GET_BOOKS, GET_Authors, ADD_BOOK, GET_BOOK_DETAIL};
