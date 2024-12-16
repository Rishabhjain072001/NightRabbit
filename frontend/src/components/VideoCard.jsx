import React from 'react';
import '../styles/VideoCard.css';

const VideoCard = ({ video, onClick }) => {
  return (
    <div className="video-card" onClick={() => onClick(video.id)}>
      <img src={video.image_url} alt={video.title} className="video-thumbnail" />
      <h4 className="video-title">{video.title}</h4>
    </div>
  );
};

export default VideoCard;
