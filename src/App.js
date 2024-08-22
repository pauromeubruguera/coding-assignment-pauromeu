import { useEffect, useRef, useState } from 'react'
import { Routes, Route, createSearchParams, useSearchParams, useNavigate } from "react-router-dom"
import 'reactjs-popup/dist/index.css'
import { useSelector } from 'react-redux';
import Header from './components/Header'
import Movies from './components/Movies'
import Starred from './components/Starred'
import WatchLater from './components/WatchLater'
import YouTubePlayer from './components/YoutubePlayer'
import './app.scss'

import useSearchMovies from './hooks/useSearchMovies.js';
import useViewTrailer from './hooks/useViewTrailer.js';
import useInfiniteScrollMovies from './hooks/useInfiniteScrollMovies';

const App = () => {
  const { movies } = useSelector((state) => state);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const { searchMovies } = useSearchMovies(setSearchParams);
  const { videoKey, isOpen, viewTrailer, closeModal } = useViewTrailer();

  useInfiniteScrollMovies(searchQuery);

  useEffect(() => {
    searchMovies('')
  }, [])

  return (
    <div className="App">
      <Header searchMovies={searchMovies} searchParams={searchParams} setSearchParams={setSearchParams} />
      <YouTubePlayer isOpen={isOpen} onClose={closeModal} videoKey={videoKey} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Movies movies={movies} viewTrailer={viewTrailer} />} />
          <Route path="/starred" element={<Starred viewTrailer={viewTrailer} />} />
          <Route path="/watch-later" element={<WatchLater viewTrailer={viewTrailer} />} />
          <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
