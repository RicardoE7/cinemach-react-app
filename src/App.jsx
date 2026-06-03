import { useEffect, useState } from 'react'
import Search from './components/Search.jsx'
import Spinner from './components/Spinner.jsx'
import MovieCard from './components/MovieCard.jsx'
import { updateSearchCount, getTrendingMovies } from './appwrite.js'

const API_BASE_URL = import.meta.env.VITE_TMDB_API_URL || 'https://api.themoviedb.org/3'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const getApiOptions = () => ({
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
})

const App = () => {

  const [searchTerm, setSearchTerm] = useState('');

  const [movies, setMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim());
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchMovies = async (query = '') => {
    if (!API_KEY) {
      setErrorMessage(
        'TMDB API key is missing. Add VITE_TMDB_API_KEY in Vercel environment variables and redeploy.'
      )
      return
    }

    setIsLoading(true)
    setErrorMessage('')
    try {
      const trimmedQuery = query.trim()
      const endpoint = trimmedQuery
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(trimmedQuery)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
      const response = await fetch(endpoint, getApiOptions())

      if (!response.ok) {
        throw new Error(`TMDB request failed (${response.status})`)
      }

      const data = await response.json()
      setMovies(data.results || [])

      if (trimmedQuery && data.results.length > 0) {
        await updateSearchCount(trimmedQuery, data.results[0])
      }
    } catch (error) {
      console.error('Error fetching movies:', error)
      setErrorMessage('Error fetching movies. Please try again later.')
      setMovies([])
    } finally {
      setIsLoading(false)
    }
  }

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error('Error fetching trending movies:', error)
    }
  }

  useEffect(() => {
    loadTrendingMovies();
  }, []);
  
  useEffect(() => {
    fetchMovies(debouncedSearchTerm)
  }, [debouncedSearchTerm])
  return (
    <main>
      <div className='pattern' />
      <div className='wrapper'>
        <header>
          <img src="/hero.png" alt="Hero Banner" />
          <h1>Because Choosing A <span className='text-gradient'>Movie</span> Shouldn't Take Longer Than Watching One</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        
        {trendingMovies.length > 0 && (
          <section className='trending'>
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.searchTerm} />
                </li>
              ))}
            </ul>
          </section>

        )}


        <section className='all-movies'>
          <h2>All Movies</h2>

          {isLoading ? 
          <Spinner />
          : errorMessage ? 
          <p className='text-red-500'>{errorMessage}</p>
          : (
            <ul>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App