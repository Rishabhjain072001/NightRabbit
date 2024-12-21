import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import VideoCard from '../components/VideoCard';

import { getVideoById } from '../api/videoApi';

const VideoPage = () => {
  const { videoId } = useParams(); 
  const [video, setVideo] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchVideoDetails = async () => {
//       try {
//         const response = await getVideoById(videoId);
//         setVideo(response.video);
//         setSuggestions(response.suggestions);
//       } catch (err) {
//         console.error('Error fetching video details:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVideoDetails();
//   }, [videoId]);
// }


  return (
    // video && (
    // <VideoPlayer
    //     video={video}
    //     suggestions={suggestions}
    //     onSuggestionClick={onSuggestionClick}
    // />
    <>
      TEST
    </>
    
  );
}

export default VideoPage;
