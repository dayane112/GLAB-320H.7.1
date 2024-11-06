import { useState, useEffect } from 'react';
import "./App.css";

// Import our components
import MovieDisplay from "./component/MovieDisplay";
import Form from "./component/Form";

function App() {

  // Constant with your API Key
  const apikey = '98e3fb1f'

  // State to hold movie data
  const [movie, setMovie] = useState(null);

  // Function to get movies
  const getMovie = async (searchTerm) => {
    try {

      // Make fetch request and store the response
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apikey}&t=${searchTerm}`
      );
      // Parse JSON response into a JavaScript object
      const data = await response.json();
      // Set the Movie state to the received data
      setMovie(data);

    } catch (err) {
      console.error(err)
    }
  };

  // This will run on the first render but not on subsquent renders
  useEffect(() => {

    const movies = `http://www.omdbapi.com/?apikey=${apikey}&`

    const random = Math.floor(Math.random() * movies.length);

    getMovie(random);
  }, []);


  // We pass the getMovie function as a prop called moviesearch
  // We pass movie as props to movie display
  return (
    <div className="App">
      <Form moviesearch={getMovie} />
      <MovieDisplay movie={movie} />
    </div>
  );
}

export default App
