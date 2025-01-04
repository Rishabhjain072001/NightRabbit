import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/VideoCard.css';

const VideoCard = ({ video, isHovered, setHoveredVideoId }) => {
  const navigate = useNavigate();

  const handleVideoClick = (videoId) => {
    navigate(`/video/${videoId}`);
  };

  const formatDuration = (duration) => {
    const seconds = parseInt(duration, 10);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    } else {
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
  };

  return (
    <div
      className="video-card"
      onClick={() => handleVideoClick(video.id)}
      onMouseEnter={() => setHoveredVideoId(video.id)}
      onMouseLeave={() => setHoveredVideoId(null)}
    >
      <div className="video-thumbnail-wrapper">
        {isHovered && video.metadata["trailerURL"] ? (
          <video className="video-trailer" autoPlay muted loop>
            <source src={video.metadata["trailerURL"]} type="video/mp4" />
          </video>
        ) : (
          <img src={video.image_url} alt={video.title} className="video-thumbnail" />
        )}

        {video.metadata["duration"] && (
          <div className="video-duration">
            {formatDuration(video.metadata["duration"])}
          </div>
        )}
      </div>

      <h4 className="video-title">{video.title}</h4>
    </div>
  );
};

export default VideoCard;
