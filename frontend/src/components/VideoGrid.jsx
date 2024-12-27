import React from 'react';
import VideoCard from './VideoCard';
import '../styles/VideoGrid.css';

const VideoGrid = ({ videos, loading}) => {
  return (
    <div className="video-grid">
      {videos.length > 0 ? (
        videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))
      ) : (
        <p className="no-videos"> {loading ? "Loading..." : "No results available!"}</p>
      )}
    </div>
  );
};

export default VideoGrid;
