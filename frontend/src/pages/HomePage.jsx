import React, { useEffect, useState } from 'react';
import { getAllVideos } from '../api/videoApi';
import VideoCard from '../components/VideoCard';
import Header from '../components/Header';

import '../styles/HomePage.css';

const HomePage = ({ onVideoClick }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getAllVideos();
        setVideos(data);
      } catch (err) {
        console.error('Error fetching videos:', err);
      }
    };

    fetchVideos();
  }, []);

  return (
    <>
      <Header />
      <div className="home-page">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} onClick={onVideoClick} />
        ))}
      </div>
    </>
  );
};

export default HomePage;
