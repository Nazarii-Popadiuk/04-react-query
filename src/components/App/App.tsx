import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import SearchBar from "../SearchBar/SearchBar";
import { fetchMovies } from '../../services/movieService';
import MovieGrid from '../MovieGrid/MovieGrid';
import type { Movie } from '../../types/movie';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import Pagination from '../ReactPaginate/ReactPaginate';
import type { TMDBInterface } from '../../services/movieService';




export default function App() {
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
    const handleSearch = (newQuery: string) => {
        if (!newQuery.trim()) return;
        if (newQuery === query) return;
        setQuery(newQuery);
        setPage(1);
    }

    const { data, isLoading, isError, isFetching, } = useQuery<TMDBInterface>({
        queryKey: ['movies', query, page],
        queryFn: () => fetchMovies(query, page),
        enabled: query.trim().length > 0,
        placeholderData: keepPreviousData
        
    })

        useEffect(() => {
        if (data?.results.length === 0 && !isLoading && !isError) {
        toast('There is no film matching your request')
    }
}, [data, isLoading, isError])

    const handleSelect = (movie: Movie) => {
        setSelectedMovie(movie);
        setPage(1);
    }
    const handleCloseModal = () => {
        setSelectedMovie(null);
    }


    const allPages = data?.total_pages ?? 0

    return (
        <>
            <Toaster position="top-right" />
            <SearchBar onSubmit={handleSearch} />
            {(isLoading || isFetching) && <Loader />}
            {isError && !isLoading && <ErrorMessage />}
            {!isLoading && !isError && data && <MovieGrid movies={data.results} onSelect={handleSelect} />}
            {data && allPages > 1 && (<Pagination pageCount={allPages} forcePage={page - 1} onPageChange={({ selected }) => setPage(selected + 1)} />)}
            {selectedMovie && (<MovieModal movie={selectedMovie} onClose={handleCloseModal} />)}
        </>
    )
}