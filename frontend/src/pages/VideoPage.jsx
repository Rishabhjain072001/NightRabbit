import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import VideoGrid from '../components/VideoGrid';
import _ from "lodash";
import { getSuggestions, getVideoById } from '../api/videoApi';

import '../styles/VideoPage.css';
import { Placeholder } from 'react-bootstrap';

const VideoPage = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [suggestedVideos, setSuggestedVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchVideoDetails = async () => {
    setVideoLoading(true);
    const data = await getVideoById(videoId);
    setVideo(data);
    setVideoLoading(false);
  };

  const fetchSuggestions = useCallback(async (pageToFetch) => {
    try {
      setLoading(true);
      const data = await getSuggestions(videoId, pageToFetch);
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
    setSuggestedVideos([]);
    fetchSuggestions(1);
  }, [videoId]);

  useEffect(() => {
    if (page > 1 && hasMore) fetchSuggestions(page);
  }, [page]);

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
      <div className="video-page">
        <div className="video-player-container">
          <VideoPlayer video={video} videoLoading={videoLoading}/>
          {video ? 
            <h1 className="video-play-title">{video?.title}</h1>
            :
            <Placeholder animation="glow">
              <Placeholder xs={8} className="video-play-title-placeholder" />
            </Placeholder>
          }
        </div>

        <div className="video-grid-container">
          <h2>More Videos</h2>
          <VideoGrid videos={suggestedVideos} loading={loading} hasMore={hasMore} />
        </div>
      </div>
    </>
  );
};

export default VideoPage;
