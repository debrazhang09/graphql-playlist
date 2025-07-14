import {useQuery} from '@apollo/client';
import {GET_BOOKS} from '../querys/querys';
import {Link} from 'react-router-dom';
function BookList() {
  const {loading, error, data} = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error:{error.message}</p>
  return (
    <div>
      <ul id="book-list">
        {data.books.map((book) => (
          <li key={book.id}>
            <Link to={`/book/${book.id}`}>{book.name}</Link>
          </li>
        ))}

      </ul>
    </div>
  );
}

export default BookList;