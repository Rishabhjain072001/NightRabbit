import React, { useEffect, useState } from 'react';
import { getAllVideos } from '../api/videoApi';
import Navbar from '../components/Layout/Navbar';

const HomePage = () => {
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
    <div>
      <Navbar/>

      <h1>All Videos</h1>
      <ul>
        {videos.map((video) => (
          <li key={video.id}>
            <a href={`/video/${video.id}`}>{video.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
