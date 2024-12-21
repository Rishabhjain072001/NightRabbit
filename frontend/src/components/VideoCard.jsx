import React from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/VideoCard.css';

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

  const handleVideoClick = (videoId) => {
    navigate(`/video/${videoId}`);
  };

  return (
    <div className="video-card" onClick={()=>{handleVideoClick(video.id)}}>
      <img src={video.image_url} alt={video.title} className="video-thumbnail" />
      <h4 className="video-title">{video.title}</h4>
    </div>
  );
};

export default VideoCard;
