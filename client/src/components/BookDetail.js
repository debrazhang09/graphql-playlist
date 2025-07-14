import {GET_BOOK_DETAIL} from '../querys/querys'
import {useParams} from 'react-router-dom'
import {useQuery} from '@apollo/client'

export default function BookDetail() {
  const {id} = useParams();

  const {data, loading, error} = useQuery(GET_BOOK_DETAIL, {
    variables:{id}
  })
  if (loading) return <p>Loading book ...</p>
  if (error) return <p>Error loading book detail.</p>
  const {name, genre, author} = data.book;
  return (
    <div id='book-detail'>
      <h1>{name}</h1>
      <p>Genre: {genre}</p>
      <p>Author: {author.name} Age: {author.name}</p>
      <p>Books:</p>
      <ul>
        {author.books.map((book) => (<li key={book.id}>{book.name}</li>))
        }
      </ul>
    </div>
  )
}