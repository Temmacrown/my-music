// src/PlayerBar.jsx
import React from "react";
import { Play, Pause } from "lucide-react";

function PlayerBar({ currentTrack, isPlaying, onPlayPause, isDemo }) {
  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 p-4 flex items-center justify-between border-t border-gray-700">
      {/* Track Info */}
      <div className="flex items-center gap-4">
        <img
          src={currentTrack.artworkUrl100}
          alt={currentTrack.title}
          className="w-12 h-12 rounded-md"
        />
        <div>
          <h3 className="font-semibold text-white">{currentTrack.title}</h3>
          <p className="text-sm text-gray-400">
            {currentTrack.artist}{" "}
            {isDemo && (
              <span className="ml-2 text-xs text-yellow-400">(Demo Track)</span>
            )}
          </p>
        </div>
      </div>

      {/* Controls */}
      <button
        onClick={onPlayPause}
        className="bg-blue-600 hover:bg-blue-500 p-3 rounded-full transition"
      >
        {isPlaying ? (
          <Pause size={20} className="text-white" />
        ) : (
          <Play size={20} className="text-white" />
        )}
      </button>
    </div>
  );
}

export default PlayerBar;
