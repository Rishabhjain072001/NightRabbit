import React, { useEffect, useState } from 'react';
import '../styles/VideoPlayer.css';

const useScript = (url) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.onload = () => {
      console.log("PlayerJS script loaded.");
      setIsLoaded(true);
    };
    script.onerror = (err) => console.error("Error loading PlayerJS script:", err);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);

  return isLoaded;
}

const VideoPlayer = ({ video, playerId = "player" }) => {
  const isPlayerJsLoaded = useScript("/playerjs.js");

  useEffect(() => {
    const initializePlayer = () => {
      if (window.Playerjs) {
        const fileString = video?.video_data?.map(item => `[${item.resolution}]${item.link}`)?.join('|');
        new window.Playerjs({ id: playerId, file: fileString });
      }
    };

    if (isPlayerJsLoaded) {
      initializePlayer();
    }
  }, [video, playerId, isPlayerJsLoaded]);

  return (
    <div className="video-player">
      <div id={playerId}></div>
    </div>
  );
};

export default VideoPlayer;
