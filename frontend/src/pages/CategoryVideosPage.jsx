import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoGrid from '../components/VideoGrid';
import { getVideosByCategory } from '../api/categoryApi';
import _ from "lodash";

import '../styles/CategoryVideosPage.css';
import { Placeholder } from 'react-bootstrap';

const CategoryVideosPage = () => {
  const { categoryId } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch videos based on the current page and search categoryId
  const fetchVideos = useCallback(async (pageToFetch, searchCategoryId) => {
    try {
      setLoading(true);
      const data = await getVideosByCategory(pageToFetch, searchCategoryId);
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
    setVideos([])
    setHasMore(true);
    fetchVideos(1, categoryId);
  }, [categoryId]);

  useEffect(() => {
    if (page > 1 && hasMore) {
      fetchVideos(page, categoryId);
    }
  }, [page, hasMore]);

  // Throttled scroll handler to detect when the user reaches the bottom
  const handleScroll = useRef(
    _.throttle(() => {
      const scrollPosition = window.scrollY + window.innerHeight; // current scroll position
      const middleOfPage = document.body.offsetHeight / 1.5; // middle of the page
      if (
        scrollPosition >= middleOfPage &&
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
      <div className="category-page">
        {videos.length > 0 ? 
            <h1 className="category-heading">{videos[0].category_name} Videos</h1>
            :
            <Placeholder animation="glow">
              <Placeholder xs={12} className="video-play-title-placeholder" />
            </Placeholder>
         }
        <VideoGrid videos={videos} loading={loading} />
      </div>
    </>
  );
};

export default CategoryVideosPage;
