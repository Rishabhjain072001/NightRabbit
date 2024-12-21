import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getVideos } from '../api/videoApi';
import VideoCard from '../components/VideoCard';
import _ from "lodash";

import '../styles/HomePage.css';

const HomePage = () => {
  const { query } = useOutletContext(); 
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch videos based on the current page and search query
  const fetchVideos = useCallback(async (pageToFetch, searchQuery) => {
    try {
      setLoading(true);
      const data = await getVideos(pageToFetch, searchQuery);
      if (pageToFetch === 1) {
        setVideos(data); // Replace videos on new search
      } else {
        setVideos((prevVideos) => [...prevVideos, ...data]);
      }
      setHasMore(data.length > 0);
    } catch (err) {
      console.error('Error fetching videos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchVideos(page, query);
  }, [query]);

  useEffect(() => {
    if (hasMore) {
      fetchVideos(page, query);
    }
  }, [page, hasMore]);

  // Throttled scroll handler to detect when the user reaches the bottom
  const handleScroll = useRef(
    _.throttle(() => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
        hasMore &&
        !loading
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    }, 300)
  ).current;

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, [handleScroll]);

  return (
    <>
      <div className="home-page">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
        {loading && <div>Loading...</div>}
      </div>
    </>
  );
};

export default HomePage;
