import type { Movie } from "../types/movie";
import axios from "axios";

const API_URL = 'https://api.themoviedb.org/3/search/movie';

interface TMDBInterface {
    page: number,
    results: Movie[],
    total_pages: number,
    total_results: number
    
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
    const token = import.meta.env.VITE_TMDB_TOKEN;

    const response = await axios.get<TMDBInterface>(API_URL, {
        params: {
            query,
            include_adult: false,
            language: 'en-US',
            page: 1,
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data.results
}