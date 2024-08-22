import { Link, NavLink } from "react-router-dom"
import { useSelector } from 'react-redux'

import '../styles/header.scss'
import { Search } from "./Search"

const Header = ({ searchMovies }) => {

  const { starredMovies } = useSelector((state) => state.starred)

  return (
    <header>
      <Link to="/" data-testid="home" onClick={() => searchMovies('')}>
        <i className="bi bi-film" />
      </Link>

      <nav>
        <NavLink to="/starred" data-testid="nav-starred" className="nav-starred">
          {starredMovies.length > 0 ? (
            <>
              <i className="bi bi-star-fill bi-star-fill-white" />
              <sup className="star-number">{starredMovies.length}</sup>
            </>
          ) : (
            <i className="bi bi-star" />
          )}
        </NavLink>
        <NavLink to="/watch-later" className="nav-fav">
          watch later
        </NavLink>
      </nav>

      <div className="input-group rounded">
        <Search searchMovies={searchMovies} />
      </div>
    </header>
  )
}

export default Header
