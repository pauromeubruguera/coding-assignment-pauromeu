import ReactPlayer from 'react-player'

const YoutubePlayer = ({ isOpen, onClose, videoKey }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-body">
          {videoKey ? (
            <ReactPlayer
              className="video-player"
              url={`https://www.youtube.com/watch?v=${videoKey}`}
              controls={true}
              playing={true}
              data-testid="youtube-player"
              width='100%'
              height='100%'
            />
          ) : (
            <div style={{ padding: "30px" }}><h6>no trailer available. Try another movie</h6></div>
          )}
        </div>
      </div>
    </div>
  )
};

export default YoutubePlayer;