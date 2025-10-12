// src/TrackItem.jsx
import React from "react";

function TrackItem({ track, onPlay, onToggleFavorite, isFavorite }) {
  return (
    <div className="bg-gray-800 p-3 rounded-xl shadow-md flex flex-col items-center text-center hover:scale-105 transition-transform">
      <img
        src={track.artworkUrl100 || "/default-art.png"}
        alt={track.title}
        className="w-32 h-32 rounded-lg mb-2"
      />
      <h4 className="font-bold text-white">{track.title}</h4>
      <p className="text-sm text-gray-400">{track.artist}</p>

      <div className="flex gap-4 mt-2">
        <button
          onClick={() => onPlay(track)}
          className="text-lg bg-green-600 px-3 py-1 rounded hover:bg-green-500"
        >
          ▶️ Play
        </button>
        <button
          onClick={() => onToggleFavorite(track)}
          className="text-lg bg-pink-600 px-3 py-1 rounded hover:bg-pink-500"
        >
          {isFavorite ? "💔" : "❤️"}
        </button>
      </div>
    </div>
  );
}

export default TrackItem;
