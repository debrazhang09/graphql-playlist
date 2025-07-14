import {useQuery, useMutation} from '@apollo/client';
import React, {useState} from 'react';
import {GET_Authors, GET_BOOKS, ADD_BOOK} from '../querys/querys';
function AddBook() {
  const [newBook,setNewBook] = useState({
    name: '',
    genre: '',
    authorId: ''
  })
  const {loading, error, data} = useQuery(GET_Authors);
  const [addBook, { loading: newBookLoading, error: newBookError}] = useMutation(ADD_BOOK, {
    update(cache, {data: {addBook}}) {
      const existBooks = cache.readQuery({query: GET_BOOKS});
      cache.writeQuery({
        query: GET_BOOKS,
        data: {
          books: [...(existBooks?.books || null), addBook]
        }
      })

    }
  })
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error:{error.message}</p>
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBook({
        variables: {
          name : newBook.name,
          genre: newBook.genre,
          authorId: newBook.authorId
        }
      })
      setNewBook({name: '', genre: '', authorId: ''});

    } catch (err) {
      console.error('error adding book:', err.message);

    }

  }
  const handleChange = (e) => {
    const {name, value} = e.target;
    setNewBook({...newBook, [name] : value});
  }
  return (
    <div>
      <form id="add-book" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="name">Book name: </label>
          <input type="text" id="name" name="name" value={newBook.name} onChange={handleChange}/>
        </div>
        <div className="field">
          <label htmlFor="genre">Genre: </label>
          <input type="text" id="genre" name="genre" value={newBook.genre} onChange={handleChange}/>
        </div>
        <div className="field">
          <label htmlFor="author">Author: </label>
          <select name="authorId" id="author" value={newBook.authorId} onChange={handleChange}>
            <option value="">Select author</option>
            {
              data.authors.map(author => (
                <option key={author.id} value={author.id}>{author.name}</option>
              ))
            }
          </select>
        </div>
        <button type="submit" disabled={newBookLoading}>{newBookLoading ? 'Saving ...' : 'Add Book'}</button>
        {newBookError && <p style={{color: "red"}}>New book save error : {newBookError.message}</p>}
      </form>

    </div>
  );
}

export default AddBook;