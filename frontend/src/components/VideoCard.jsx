import React from 'react';
import '../styles/VideoCard.css';

const VideoCard = ({ video }) => {
  return (
    <div className="video-card" >
      <img src={video.image_url} alt={video.title} className="video-thumbnail" />
      <h4 className="video-title">{video.title}</h4>
    </div>
  );
};

export default VideoCard;
