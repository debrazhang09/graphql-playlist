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
  const [newBook, setNewBook] = useState({
    name: '',
    authorName:'',
    publishedYear: ''
  })
  const[fetchBooks, {data, loading ,error}] = useLazyQuery(GET_BOOKS);
  const [addBook, {loading: loadingNewBook, error: newBookError}] = useMutation(ADD_BOOK, {
    refetchQueries : [{
      query: GET_BOOKS,
      variables: {
          authorName: book.authorName.trim() || null,
          publishedYear: book.publishedYear ? parseInt(book.publishedYear) : null
        }
    }],
  })
  const handleSubmit =  async (e) => {
    e.preventDefault();
    try {
      await fetchBooks({
        variables: {
          authorName: book.authorName.trim() || null,
          publishedYear: book.publishedYear ? parseInt(book.publishedYear) : null
        }
      })
      setAuthor({'authorName' : '','publishedYear' : ''})
    } catch (error) {
      console.error('Error happened during search', error.message);
    }

  }
  const handleChange = (e) => {
    const {name, value} = e.target;
    setAuthor({...book, [name] : value});

  }
  const handleNewBookSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBook({
        variables:{
          name: newBook.name.trim(),
          authorName: newBook.authorName.trim(),
          publishedYear: parseInt(newBook.publishedYear)

        }})
        setNewBook({
          name: '',
          authorName:'',
          publishedYear: ''
        })
    } catch (error) {
      console.error('Error happened during adding a book', error.message);
    }

  }
  const handleNewBookChange = (e) => {
    const {name, value} = e.target;
    setNewBook({...newBook, [name] : value});

  }
   return (
    <>
    <h1>Book Demo</h1>

    <form className="add-book" onSubmit={handleNewBookSubmit}>
      <div className='field'>
        <label htmlFor='book'>Book Name: </label>
        <input id='book' name='name' value={newBook.name} onChange={handleNewBookChange} type='text'required></input>
      </div>
      <div className='field'>
        <label htmlFor='author'>Author Name: </label>
        <input id='author' name='authorName' value={newBook.authorName} onChange={handleNewBookChange} type='text' required></input>
      </div>
      <div className='field'>
        <label htmlFor='published_year'>Published Year: </label>
        <input id='published_year' name='publishedYear' value={newBook.publishedYear} onChange={handleNewBookChange} type='number' min='1900' max='2025' required></input>
      </div>
      <button type='submit' >Add new book</button>

    </form>
    {loadingNewBook && <p>loading new book...</p>}
    {newBookError && <p style={{color: 'red'}}>Error: {newBookError.message}</p>}

    <form className='search-book' onSubmit={handleSubmit}>
      <div className='field'>
        <label htmlFor='author'>Author Name: </label>
        <input id='author' name="authorName" value={book.authorName} onChange={handleChange}></input>
      </div>
      <div className='field'>
        <label htmlFor='published_year'>Published Year: </label>
        <input id='published_year' name="publishedYear" value={book.publishedYear} onChange={handleChange}></input>
      </div>
      <button type='submit' >Search book</button>

    </form>
    {loading && <p>Loading...</p>}
    {error && <p style={{color: 'red'}}>Error: {error.message}</p>}
    <ul>
      {data?.getBooks.map(({id, author, name, publishedYear}) => (
        <li key={id}> Name: {name}, Author: {author}, Published Year: {publishedYear}</li>

      ))}

    </ul>



    </>
  )



}