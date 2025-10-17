import React, { useState } from "react";
import SearchBar from "./SearchBar.jsx";
import TrackList from "./TrackList.jsx";
import PlayerBar from "./PlayerBar.jsx";
import { PlayCircle } from "lucide-react";

const DEMO_MP3 =
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; // fallback demo

const App = () => {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [localTracks, setLocalTracks] = useState([]);

  // 🔍 Handle online search (Deezer API via CORS proxy)
  const handleSearch = async (query) => {
    try {
      const proxy = "https://corsproxy.io/?";
      const apiUrl = `https://api.deezer.com/search?q=${encodeURIComponent(query)}`;

      const res = await fetch(`${proxy}${apiUrl}`);
      const data = await res.json();

      if (data.data) {
        const formattedTracks = data.data.map((track) => ({
          id: track.id,
          title: track.title,
          artist: track.artist.name,
          albumCover: track.album.cover_medium,
          preview: track.preview || DEMO_MP3, // ✅ fallback demo if no preview
        }));
        setTracks(formattedTracks);
      } else {
        setTracks([]);
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  // 🎵 Handle local upload
  const handleLocalUpload = (event) => {
    const files = Array.from(event.target.files);
    const uploaded = files.map((file) => ({
      id: URL.createObjectURL(file),
      title: file.name.replace(/\.[^/.]+$/, ""),
      artist: "Local File",
      albumCover: "https://via.placeholder.com/150?text=Local+Track",
      preview: URL.createObjectURL(file),
    }));
    setLocalTracks((prev) => [...prev, ...uploaded]);
  };

  // ▶️ Handle play
  const handlePlay = (track) => {
    setCurrentTrack(track);
  };

  // Combine local + online
  const combinedTracks = [...localTracks, ...tracks];

  return (
    <div className="min-h-screen bg-[#4B5320] text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <PlayCircle className="w-8 h-8" /> MyALX Music Player
      </h1>

      {/* 🔍 Search Section */}
      <SearchBar onSearch={handleSearch} />

      {/* 🎧 Local Upload */}
      <div className="my-4 text-center">
        <label className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg cursor-pointer">
          Upload Local Music
          <input
            type="file"
            accept="audio/*"
            multiple
            onChange={handleLocalUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* 🎵 Track List */}
      <TrackList tracks={combinedTracks} onPlay={handlePlay} />

      {/* 🎶 Player */}
      <PlayerBar track={currentTrack} />
    </div>
  );
};

export default App;
