import './css/App.css'
//import MovieCard from './components/MovieCard';
import Home from './pages/home';
import Favorites from './pages/favorites';
import {Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import MovieDetails from './pages/MovieDetails';
import { MovieProvider } from './contexts/MovieContext';

function App() {

  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </main>
    </MovieProvider>
  );


    /*
    <MovieCard movie={{ url: "https://example.com/poster.jpg", title: "Example Movie", release_Date: "2023-01-01" }} />
    <div>hello</div>
    <Text display="Hello, World!" />
    <Text display="Hello, World2!" />
    */

}

{/* function Text({display}){
  return(
    <div>text
      <p>
        {display}
      </p>
    </div>
}
  ) */}


export default App;
