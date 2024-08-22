import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../data/moviesSlice';
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER } from '../constants';

const useInfiniteScrollMovies = (searchQuery) => {
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state);
  const previousSearch = useRef('');

  const loadMoreMovies = () => {
    if (searchQuery) {
      if (`${ENDPOINT_SEARCH}&query=${searchQuery}&page=${movies.page}` === previousSearch.current) return;
      previousSearch.current = `${ENDPOINT_SEARCH}&query=${searchQuery}&page=${movies.page}`;
      dispatch(fetchMovies({ apiUrl: `${ENDPOINT_SEARCH}&query=${searchQuery}`, page: movies.page + 1 }));
    } else {
      if (`${ENDPOINT_DISCOVER}&page=${movies.page}` === previousSearch.current) return;
      previousSearch.current = `${ENDPOINT_DISCOVER}&page=${movies.page}`;
      dispatch(fetchMovies({ apiUrl: ENDPOINT_DISCOVER, page: movies.page + 1 }));
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      loadMoreMovies();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [searchQuery, movies]);

  return { loadMoreMovies };
};

export default useInfiniteScrollMovies;
