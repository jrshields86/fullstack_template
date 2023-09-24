import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios'
import AddMovieForm from './AddMovieForm';

const App = ()=> {
  const [movies, setMovies] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchMovies = async () => {
      const {data} = await axios.get('/api/movies')
      setMovies(data)
      console.log(movies)
    }
    fetchMovies()
  }, []);

  const increaseRating = async(movie) => {
    try {
      setError('')
      const newRating = movie.stars + 1
      const {data} = await axios.put(`/api/movies/${movie.id}`, {title: movie.title, stars: newRating})
    
      const newMovies = movies.map((movieMap) => {
        if(movieMap.id === movie.id){
          return data
        }else{
          return movieMap
        }
    })
    setMovies(newMovies)

    } catch (error) {
      console.log(error.response.data)
      setError(error.response.data)
    }
    
  }

  const decreaseRating = async(movie) => {
    try {
      setError("")
      const newRating = movie.stars - 1
      const {data} = await axios.put(`/api/movies/${movie.id}`, {title: movie.title, stars: newRating})
       
      const newMovies = movies.map((movieMap) => {
        if(movieMap.id === movie.id){
          return data
        } else{
            return movieMap
        }
    })
    setMovies(newMovies)
    } catch (error) {
      setError(error.response.data)
    }
    
  }

  const deleteMovie = async (movie) => {
    const data = await axios.delete(`/api/movies/${movie.id}`)
    const updatedMovieList = movies.filter((movieFilt) => {
      return movieFilt.id !== movie.id
    })
    setMovies(updatedMovieList)
  }

  return (
    <div>
      <h1>My Movies</h1>
      <p>{error}</p>
      <AddMovieForm movies={movies} setMovies={setMovies}/>
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
                <button onClick={() =>{deleteMovie(movie)}}>Delete</button>
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
