import React, { useEffect, useState } from 'react';
import VideoPlayer from '../components/VideoPlayer';

const VideoPage = ({ videoId, onSuggestionClick }) => {
  const [video, setVideo] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch(`/api/videos/${videoId}`)
    .then((res) => res.json())
    .then((data) => {
        setVideo(data.video);
        setSuggestions(data.suggestions);
    });
  }, [videoId]);

  return (
    video && (
    <VideoPlayer
        video={video}
        suggestions={suggestions}
        onSuggestionClick={onSuggestionClick}
    />
    )
  );
}

export default VideoPage;
