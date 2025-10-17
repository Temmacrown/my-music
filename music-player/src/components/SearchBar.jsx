// src/components/SearchBar.jsx
import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 p-4 bg-gray-800 rounded-xl shadow-md"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for music..."
        className="flex-1 p-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
