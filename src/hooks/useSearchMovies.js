import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { fetchMovies, clearMovies } from '../data/moviesSlice';
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER } from '../constants';
import { useRef } from 'react';

const useSearchMovies = (setSearchParams) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { movies } = useSelector((state) => state);
    const previousSearch = useRef(null);
    const getSearchResults = (query) => {
        dispatch(clearMovies());
        if (query !== '') {
            if (`${ENDPOINT_SEARCH}&query=${query}&page=${movies.page}` === previousSearch.current) return
            previousSearch.current = `${ENDPOINT_SEARCH}&query=${query}&page=${movies.page}`
            dispatch(fetchMovies({ apiUrl: `${ENDPOINT_SEARCH}&query=${query}`, page: 1 }));
            setSearchParams(createSearchParams({ search: query }));
        } else {
            if (`${ENDPOINT_DISCOVER}&page=${movies.page}` === previousSearch.current) return;
            previousSearch.current = `${ENDPOINT_DISCOVER}&page=${movies.page}`;
            dispatch(fetchMovies({ apiUrl: ENDPOINT_DISCOVER, page: 1 }));
            setSearchParams();
        }
    };

    const searchMovies = (query) => {
        navigate('/');
        getSearchResults(query);
    };

    return { searchMovies, getSearchResults };
};

export default useSearchMovies;
