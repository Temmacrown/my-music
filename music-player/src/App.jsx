// src/App.jsx
import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar.jsx";
import TrackItem from "./TrackItem.jsx";
import TrackList from "./TrackList.jsx";
import PlayerBar from "./PlayerBar.jsx";
import playlists from "./playlists";

const FALLBACK_MP3 =
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

function App() {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [mode, setMode] = useState("search");
  const [allPlaylists, setAllPlaylists] = useState({
    ...playlists,
    "Local Files": [],
  });

  // load favorites from localStorage
  useEffect(() => {
    const savedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavs);
  }, []);

  // save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleSelectPlaylist = (name) => {
    setMode("playlist");
    setTracks(allPlaylists[name]);
  };

  const handleAddToPlaylist = (playlistName, track) => {
    setAllPlaylists((prev) => ({
      ...prev,
      [playlistName]: [...(prev[playlistName] || []), track],
    }));
    if (mode === "playlist" && playlistName in allPlaylists) {
      setTracks((prev) => [...prev, track]);
    }
  };

  const handlePlay = (track) => {
    if (audio) audio.pause();
    const previewUrl = track.previewUrl || track.preview || FALLBACK_MP3;
    const newAudio = new Audio(previewUrl);
    newAudio.play();
    setAudio(newAudio);
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleToggleFavorite = (track) => {
    if (favorites.some((fav) => fav.id === track.id)) {
      setFavorites(favorites.filter((fav) => fav.id !== track.id));
    } else {
      setFavorites([...favorites, track]);
    }
  };

  return (
    <div
      className="h-screen w-screen flex flex-col text-white overflow-hidden"
      style={{ backgroundColor: "#2b1311" }} // deep dark background
    >
      {/* Centered Content */}
      <div className="flex flex-col items-center justify-center flex-1 text-center p-6 space-y-6">
        {/* Header */}
        <h1 className="text-5xl font-bold flex items-center gap-2 text-red-600">
          <h1 style={{ color: "lime", fontSize: "50px" }}>BelovedCrown</h1>
          <span role="img" aria-label="music">🎵</span> My Music Player
        </h1>

        {/* Buttons row with multiple colors */}
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setMode("search")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              mode === "search"
                ? "bg-blue-500"
                : "bg-blue-700 hover:bg-blue-600"
            }`}
          >
            Search
          </button>

          <button
            onClick={() => setMode("favorites")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              mode === "favorites"
                ? "bg-green-500"
                : "bg-green-700 hover:bg-green-600"
            }`}
          >
            Favorites
          </button>

          {Object.keys(allPlaylists).map((name, idx) => {
            const colors = [
              "bg-purple-700 hover:bg-purple-600",
              "bg-red-700 hover:bg-red-600",
              "bg-yellow-600 hover:bg-yellow-500 text-black",
              "bg-pink-600 hover:bg-pink-500",
            ];
            return (
              <button
                key={name}
                onClick={() => handleSelectPlaylist(name)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  mode === "playlist" && tracks === allPlaylists[name]
                    ? "bg-purple-500"
                    : colors[idx % colors.length]
                }`}
              >
                {name}
              </button>
            );
          })}
        </div>

        {/* Search bar */}
        {mode === "search" && (
          <div className="w-full max-w-md space-x-2 flex justify-center">
            <SearchBar onResults={setTracks} />
          </div>
        )}

        {/* Upload local files */}
        <div className="flex flex-col items-center space-y-3">
          <label className="block font-semibold text-xl text-red-500">
            Upload Local Music:
          </label>
          <input
            type="file"
            accept="audio/*"
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files);
              const newTracks = files.map((file, idx) => ({
                id: Date.now() + idx,
                title: file.name.replace(/\.[^/.]+$/, ""),
                artist: "Local File",
                preview: URL.createObjectURL(file),
                cover: "https://via.placeholder.com/150",
              }));
              newTracks.forEach((track) =>
                handleAddToPlaylist("Local Files", track)
              );
            }}
            className="block text-lg text-gray-200 border border-gray-400 rounded-lg cursor-pointer bg-gray-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Player Bar fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <PlayerBar
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
        />
      </div>
    </div>
  );
}

export default App;
