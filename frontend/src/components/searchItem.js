import React, { useState } from 'react';
import { addItem } from '../api.js';
import './searchItem.css';

export default function SearchItem() {
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setMessage('');
    setResult(null);
    if (!query.trim()) {
      setMessage('Please enter a search query');
      return;
    }
    setLoading(true);
    try {
      const res = await addItem({ query });
      setResult(res.data);
    } catch (err) {
      setMessage('Error searching item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <h3>Semantic Search</h3>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for an item"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
          className="search-input"
          autoComplete="off"
        />
        <button type="submit" disabled={loading} className="search-button">
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {message && <p className="message">{message}</p>}
      {result && (
        <div className="result-box">
          <h4>Best Match:</h4>
          <p>
            <strong>Name:</strong> {result.name || 'N/A'}
          </p>
          <p>
            <strong>Location:</strong> {result.location || 'N/A'}
          </p>
        </div>
      )}
    </div>
  );
}
