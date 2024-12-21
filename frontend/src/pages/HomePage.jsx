import React, { useEffect, useRef, useState } from 'react';
import { getAllVideos } from '../api/videoApi';
import VideoCard from '../components/VideoCard';
import Header from '../components/Header';
import _ from "lodash";

import '../styles/HomePage.css';

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [query, setQuery] = useState(''); 
  const initialFetchDone = useRef(false);

  // Fetch videos based on the current page
  const fetchVideos = async (pageToFetch, searchQuery = "") => {
    try {
      setLoading(true);
      const data = await getAllVideos(pageToFetch, searchQuery);
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
  };

  // Trigger fetching videos on page change or on the initial load
  useEffect(() => {
    if (!initialFetchDone.current || (hasMore && (page > 1 || query))) {
      initialFetchDone.current = true;
      fetchVideos(page, query);
    }
  }, [page, query, hasMore]);

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

  const handleSearchSubmit = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    setHasMore(true);
  };

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, [handleScroll]);

  return (
    <>
      <Header query={query} onSearch={handleSearchSubmit } />
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
