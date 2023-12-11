// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoPlayer from './Vp';
import './App.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedVideoId, setSelectedVideoId] = useState('');

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?q=${searchQuery}&part=snippet&key=AIzaSyCG_dSWh6gW4vp8qNEqNdGD99oU9hpd_os`
      );

      setSearchResults(response.data.items);
    } catch (error) {
      console.error('Error searching for videos:', error);
    }
  };

  const handleVideoSelect = (videoId) => {
    setSelectedVideoId(videoId);
  };

  useEffect(() => {
    if (selectedVideoId) {
      // You can perform additional actions when a video is selected, e.g., play the video
      console.log(`Selected video ID: ${selectedVideoId}`);
    }
  }, [selectedVideoId]);

  return (
    <div className="container">
      <h1>YouTube Song Search</h1>
      <div>
        <label>
          Search for a Song:
          <input type="text" value={searchQuery} onChange={handleInputChange} />
        </label>
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <h2>Search Results:</h2>
        <ul>
          {searchResults.map((result) => (
            <li key={result.id.videoId}>
              <button onClick={() => handleVideoSelect(result.id.videoId)}>
                {result.snippet.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {selectedVideoId && <VideoPlayer videoId={selectedVideoId} />}
    </div>
  );
};

export default App;
