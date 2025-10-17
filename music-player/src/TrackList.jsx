function TrackList({ tracks, onPlay, onAddToPlaylist }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {tracks.map((track) => (
        <div
          key={track.id}
          className="bg-gray-800 p-3 rounded-xl shadow-md hover:scale-105 transition-transform"
        >
          <img
            src={track.cover || "https://via.placeholder.com/150"}
            alt={track.title}
            className="w-full h-40 object-cover rounded-md"
          />
          <h3 className="mt-2 font-semibold">{track.title}</h3>
          <p className="text-sm text-gray-400">{track.artist}</p>
          <div className="mt-2 flex space-x-2">
            <button
              onClick={() => onPlay(track)}
              className="px-2 py-1 bg-green-500 rounded"
            >
              ▶ Play
            </button>
            {onAddToPlaylist && (
              <button
                onClick={() => onAddToPlaylist(track)}
                className="px-2 py-1 bg-blue-500 rounded"
              >
                + Add
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TrackList;
