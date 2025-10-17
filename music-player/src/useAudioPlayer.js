// src/useAudioPlayer.js
import { useState, useRef, useEffect } from "react";

function useAudioPlayer(tracks) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());

  // Play or pause current track
  const togglePlayPause = () => {
    if (currentTrackIndex === null) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Play selected track
  const playTrack = (index) => {
    if (index < 0 || index >= tracks.length) return;

    setCurrentTrackIndex(index);
    audioRef.current.src = tracks[index].previewUrl;
    audioRef.current.play();
    setIsPlaying(true);
  };

  // Go to next track
  const playNext = () => {
    if (currentTrackIndex === null) return;
    const nextIndex = (currentTrackIndex + 1) % tracks.length;
    playTrack(nextIndex);
  };

  // Go to previous track
  const playPrev = () => {
    if (currentTrackIndex === null) return;
    const prevIndex =
      (currentTrackIndex - 1 + tracks.length) % tracks.length;
    playTrack(prevIndex);
  };

  // Cleanup audio when track ends
  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      playNext();
    };

    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentTrackIndex, tracks]);

  return {
    currentTrack: currentTrackIndex !== null ? tracks[currentTrackIndex] : null,
    isPlaying,
    playTrack,
    togglePlayPause,
    playNext,
    playPrev,
  };
}

export default useAudioPlayer;
