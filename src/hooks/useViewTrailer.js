import { useState } from 'react';
import { ENDPOINT, API_KEY } from '../constants';

const useViewTrailer = () => {
  const [videoKey, setVideoKey] = useState(null);
  const [isOpen, setOpen] = useState(false);

  const getMovie = async (id) => {
    const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`;
    setVideoKey(null)
    const videoData = await fetch(URL).then((response) => response.json());
    setOpen(true)

    if (videoData.videos && videoData.videos.results.length) {
      const trailer = videoData.videos.results.find((vid) => vid.type === 'Trailer');
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key);
    }
  };

  const viewTrailer = (movie) => {
    getMovie(movie.id);
  };

  const closeModal = () => setOpen(false);

  return { videoKey, isOpen, viewTrailer, closeModal };
};

export default useViewTrailer;
