import React, { useState, useEffect } from 'react';
import VideoCard from './VideoCard';
import { Placeholder } from 'react-bootstrap';
import '../styles/VideoGrid.css';

const VideoGrid = ({ videos, loading, hasMore, numberOfPlaceholder=8 }) => {
  const [videoLoadingState, setVideoLoadingState] = useState([]);
  const [hoveredVideoId, setHoveredVideoId] = useState(null);

  useEffect(() => {
    if (loading && hasMore) {
      setVideoLoadingState((prevState) => [
        ...prevState,
        ...Array(numberOfPlaceholder).fill(true),
      ]);
    }
  }, [loading, videos.length]);

  useEffect(() => {
    if (!loading) {
      setVideoLoadingState((prevState) =>
        prevState.map((_, index) => (index < videos.length ? false : true))
      );
    }
  }, [videos, loading]);

  const showPlaceholderForNewVideos = () => {
    return videoLoadingState.map((isLoading, index) =>
      isLoading ? (
        <div key={`placeholder-${index}`} className="placeholder-card">
          <Placeholder animation="glow">
            <Placeholder className="video-placeholder" />
            <Placeholder xs={8} className="title-placeholder mt-2" />
          </Placeholder>
        </div>
      ) : null
    );
  };

  return (
    <div className="video-grid">
      {videos.length > 0 &&
        videos.map((video) => (
          <VideoCard 
            key={video.id}
            video={video} 
            isHovered={hoveredVideoId === video.id}
            setHoveredVideoId={setHoveredVideoId}
          />
        ))}

      {loading && showPlaceholderForNewVideos()}

      {!loading && videos.length === 0 && (
        <p className="no-videos">No results available!</p>
      )}
    </div>
  );
};

export default VideoGrid;
