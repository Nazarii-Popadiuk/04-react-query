
import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import SearchBar from "../SearchBar/SearchBar";
import { fetchMovies } from '../../services/movieService';
import MovieGrid from '../MovieGrid/MovieGrid';
import type { Movie } from '../../types/movie';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';



export default function App() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
    const handleSearch = async (query: string) => {
        if (!query) return;
        setMovies([]);
        setError(false);
        setLoading(true);
        try {
            const results = await fetchMovies(query);

            if (results.length === 0) {
                toast.error('No movies found fro your request.')
                return
            }
            setMovies(results);
        } catch {
            toast.error('Error fetching movies.')
            setError(true);
        }
        setLoading(false);
    }

    const handleSelect = (movie: Movie) => {
        setSelectedMovie(movie);
    }
    const handleCloseModal = () => {
        setSelectedMovie(null);
    }

    return (
        <>
            <Toaster position="top-right" />
            <SearchBar onSubmit={handleSearch} />
            {loading && <Loader />}
            {error && !loading && <ErrorMessage />}
            {!loading && !error && <MovieGrid movies={movies} onSelect={handleSelect} />}
            {selectedMovie && (<MovieModal movie={selectedMovie} onClose={handleCloseModal}/>)}
        </>
    )
}