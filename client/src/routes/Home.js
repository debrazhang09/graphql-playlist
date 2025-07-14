import AddBook from '../components/AddBook';
import BookList from '../components/BookList';

export default function HomePageRoute() {
  return (
    <div className="home">
      <BookList />
      <AddBook />
    </div>
  )
}