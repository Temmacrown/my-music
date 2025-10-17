import React from "react";
import { Play, Heart, HeartOff, Download } from "lucide-react";

export default function TrackItem({ track, onPlay, onToggleFavorite, onDownload, isFavorite }) {
  return (
    <div className="bg-gray-800 p-3 rounded-xl shadow-md flex flex-col items-center text-center hover:scale-105 transition-transform">
      <img
        src={track.artwork}
        alt={track.title}
        className="w-24 h-24 object-cover rounded-lg mb-2"
      />
      <h3 className="text-sm font-semibold">{track.title}</h3>
      <p className="text-xs text-gray-400">{track.artist}</p>

      <div className="flex justify-center gap-3 mt-3">
        <button
          onClick={onPlay}
          className="bg-green-600 p-2 rounded-full hover:bg-green-700 transition"
        >
          <Play size={18} />
        </button>

        <button
          onClick={onToggleFavorite}
          className={`p-2 rounded-full transition ${
            isFavorite ? "bg-red-600 hover:bg-red-700" : "bg-gray-600 hover:bg-gray-700"
          }`}
        >
          {isFavorite ? <HeartOff size={18} /> : <Heart size={18} />}
        </button>

        <button
          onClick={onDownload}
          className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition"
        >
          <Download size={18} />
        </button>
      </div>
    </div>
  );
}
