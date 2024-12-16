import React from 'react';
import '../styles/VideoPlayer.css';

const VideoPlayer = ({ video, suggestions, onSuggestionClick }) => {
    return (
    <div className="video-player-container">
        <div className="video-player">
        <video controls src={video.url} />
        <h3>{video.title}</h3>
        <p>{video.description}</p>
        </div>
        <div className="video-suggestions">
        <h4>Suggestions</h4>
        {suggestions.map((suggestion) => (
            <div
            key={suggestion.id}
            className="suggestion-card"
            onClick={() => onSuggestionClick(suggestion.id)}
            >
            <img src={suggestion.thumbnail} alt={suggestion.title} />
            <p>{suggestion.title}</p>
            </div>
        ))}
        </div>
    </div>
    );
}


export default VideoPlayer;
