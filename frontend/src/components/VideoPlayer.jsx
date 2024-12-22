import React from 'react';
import '../styles/VideoPlayer.css';

const VideoPlayer = ({ video }) => {
  return (
    <div className="video-player">
      <video controls autoPlay>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
