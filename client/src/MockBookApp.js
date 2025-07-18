import React, {useState} from 'react';
import {gql, useLazyQuery, useMutation} from '@apollo/client';

const GET_BOOKS = gql`
  query GetBooks($authorName: String, $publishedYear: Int) {
    getBooks(authorName: $authorName, publishedYear: $publishedYear) {
      id
      name
      author
      publishedYear
    }
  }
`;
const ADD_BOOK = gql`
  mutation AddBook($name: String!, $authorName: String!, $publishedYear: Int!) {
    addBook(name: $name, authorName: $authorName, publishedYear: $publishedYear) {
      name
    }
  }
`;


export default function MockBookApp () {
  const [book ,setAuthor] = useState({'authorName' : '','publishedYear' : ''});
  const[fetchBooks, {data, loading ,error}] = useLazyQuery(GET_BOOKS);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('befor call server', book)
    fetchBooks({
      variables: {
        authorName: book.authorName.trim() || null,
        publishedYear: book.publishedYear ? parseInt(book.publishedYear) : null
      }
    })
  }
  const handleChange = (e) => {
    const {name, value} = e.target;
    setAuthor({...book, [name] : value});

  }
  if (error) return <p>Error:{error.message}</p>
  return (
    <>
    <h1>Book Demo</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='author'>Author Name: </label>
        <input id='author' name="authorName" value={book.authorName} onChange={handleChange}></input>
      </div>
      <div>
        <label htmlFor='published_year'>Published Year: </label>
        <input id='published_year' name="publishedYear" value={book.published} onChange={handleChange}></input>
      </div>
      <button type='submit' >Search book</button>

    </form>
    {loading && <p>Loading...</p>}
    {error && <p>Error: {error.message}</p>}
    <ul>
      {data?.getBooks.map(({id, author, name, publishedYear}) => (
        <li key={id}> Name: {name}, Author: {author}, Published Year: {publishedYear}</li>

      ))}

    </ul>



    </>
  )



}