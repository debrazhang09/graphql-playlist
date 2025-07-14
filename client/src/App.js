import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import HomePageRoute from './routes/Home';
import BookDetailRoute from './routes/BookDetail';
import NotFound from './routes/NotFound'
function App() {
  return (
    <Router>
    <div id="main">
      <h1>Ninja's Reading List</h1>
      <div className='nav-bar'>
        <nav>
          <Link to='/'>Home</Link>
        </nav>
      </div>
        <Routes>
          <Route path='/' element={<HomePageRoute/>} />
          <Route path='/book/:id' element={<BookDetailRoute />}/>
          <Route path='/*' element={<NotFound />} />
        </Routes>
    </div>
  </Router>
  );
}

export default App;
