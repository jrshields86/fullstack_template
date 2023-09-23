import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios'

const App = ()=> {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const fetchMovies = async () => {
      const {data} = await axios.get('/api/movies')
      setMovies(data)
      console.log(movies)
    }
    fetchMovies()
  }, []);

  const increaseRating = async(movie) => {
    const newRating = movie.stars + 1
    const {data} = await axios.put(`/api/movies/${movie.id}`, {title: movie.title, stars: newRating})
    console.log(data)
    const newMovies = movies.map((movieMap) => {
        if(movieMap.id === movie.id){
          return data
        }else{
          return movieMap
        }
    })
    setMovies(newMovies)
  }

  const decreaseRating = async(movie) => {
    const newRating = movie.stars - 1
    const {data} = await axios.put(`/api/movies/${movie.id}`, {title: movie.title, stars: newRating})
    console.log(data)
    const newMovies = movies.map((movieMap) => {
        if(movieMap.id === movie.id){
          return data
        }else{
          return movieMap
        }
    })
    setMovies(newMovies)
  }

  return (
    <div>
      <h1>My Movies</h1>
      <ul>
        {
          movies.map((movie) => {
            return(
              <li key={movie.id}>
                <h2>{movie.title}</h2>
                <h3>
                  <span>
                    Rating: {movie.stars} Stars
                    <button onClick={() => {increaseRating(movie)}}>
                      +
                    </button>
                    <button onClick={() => {decreaseRating(movie)}}>
                      -
                    </button>
                  </span>
                </h3>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);

console.log('hello world')