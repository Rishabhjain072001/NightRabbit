import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import VideoGrid from '../components/VideoGrid';
import _ from "lodash";

import { getVideoById, getVideos } from '../api/videoApi';

const VideoPage = () => {
  const { videoId } = useParams(); 
  const [video, setVideo] = useState(null);
  const [suggestedVideos, setSuggestedVideos]= useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchVideoDetails = async () => {
    const data = await getVideoById(videoId);
    setVideo(data);
  };

  const fetchSuggestions = useCallback(async (pageToFetch) => {
    try {
      setLoading(true);
      const data = await getVideos(pageToFetch, '');
      if (pageToFetch === 1) {
        setSuggestedVideos(data); // Replace videos on new search
      } else {
        setSuggestedVideos((prevVideos) => [...prevVideos, ...data]);
      }
      setHasMore(data.length > 0);
    } catch (err) {
      console.error('Error fetching videos:', err);
    } finally {
      setLoading(false);
    }
  }, [videoId]);

  useEffect(() => {
    fetchVideoDetails();
    fetchSuggestions(1);
  }, [videoId]);

  useEffect(() => {
    if (hasMore) fetchSuggestions(page);
  }, [page]);

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
      <div className="video-page">
        <div className="video-player-container">
          <VideoPlayer video={video} />
        </div>

        <h2>Suggestions</h2>
        <VideoGrid videos={suggestedVideos} />
        {loading && <p>Loading more...</p>}
      </div>
    </>
  );
}

export default VideoPage;
