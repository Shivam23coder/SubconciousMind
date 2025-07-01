import React, { useState } from 'react';
import { searchItem } from '../api.js';
import './searchItem.css';

export default function SearchItem() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await searchItem(query); // Axios POST
      setResult(res.data.item);
    } catch (err) {
      setResult(null);
      setMessage('No match found.');
    }
  };

  return (
    <div className = "search-container">
      <h3>Semantic Search</h3>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter item name"
          value={query}
          onChange={(e) => setQuery(e.target.value)} // ✅ important
          required
        />
        <button type="submit">Search</button>
      </form>

      {message && <p>{message}</p>}
      {result && (
        <div>
          <h4>Found:</h4>
          <p><strong>Name:</strong> {result.name}</p>
          <p><strong>Location:</strong> {result.location}</p>
        </div>
      )}
    </div>
  );
}