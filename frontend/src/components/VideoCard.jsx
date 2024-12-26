import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/VideoCard.css';

const VideoCard = ({ video }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleVideoClick = (videoId) => {
    navigate(`/video/${videoId}`);
  };

  return (
    <div
      className="video-card"
      onClick={() => handleVideoClick(video.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && video.metadata["trailerURL"] && (
        <video className="video-trailer" autoPlay muted loop>
          <source src={video.metadata["trailerURL"]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <img src={video.image_url} alt={video.title} className="video-thumbnail" />
      <h4 className="video-title">{video.title}</h4>
    </div>
  );
};

export default VideoCard;
