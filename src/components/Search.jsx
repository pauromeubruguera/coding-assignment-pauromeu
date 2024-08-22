import { Link } from "react-router-dom"
import { useState } from 'react'
export const Search = ({ searchMovies }) => {
    const [searchValue, setSearchValue] = useState('');

    const handleClick = (e) => {
        setSearchValue('');
        searchMovies('')
    }
    const handleChange = (e) => {
        setSearchValue(e.target.value);
        searchMovies(e.target.value)
    }

    return (
        <Link to="/" onClick={handleClick} className="search-link" >
            <input
                type="search"
                data-testid="search-movies"
                value={searchValue}
                onChange={handleChange}
                className="form-control rounded"
                placeholder="Search movies..."
                aria-label="Search movies"
                aria-describedby="search-addon"
            />
        </Link>
    )
};