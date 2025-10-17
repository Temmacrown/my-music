import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, Music2 } from "lucide-react";

export default function PlayerBar({ track }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // When a new track is selected, load and play it automatically
  useEffect(() => {
    if (track && audioRef.current) {
      audioRef.current.src = track.preview;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [track]);

  // Update progress bar
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const { currentTime, duration } = audioRef.current;
      if (duration > 0) {
        setProgress((currentTime / duration) * 100);
      }
    }
  };

  // Play/Pause toggle
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Reset progress when track ends
  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-green-900 text-white p-4 flex items-center justify-between shadow-lg">
      {/* Track Info */}
      <div className="flex items-center gap-3">
        <Music2 className="w-8 h-8 text-yellow-400" />
        {track ? (
          <div>
            <h2 className="text-lg font-semibold">{track.title}</h2>
            <p className="text-sm text-gray-300">
              {track.artist} • {track.isLocal ? "Local File" : "Online"}
            </p>
          </div>
        ) : (
          <p className="text-gray-400 italic">No track selected</p>
        )}
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center w-1/3">
        <button
          onClick={togglePlay}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-full"
          disabled={!track}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        {/* Progress Bar */}
        <div className="w-full mt-2 h-2 bg-gray-600 rounded">
          <div
            className="h-2 bg-yellow-400 rounded"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
    </div>
  );
}
