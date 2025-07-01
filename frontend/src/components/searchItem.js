import React, { useState } from 'react';
import { searchItem } from '../api';
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
      <form onSubmit={handleSearch} className='search-form'>
        <input
          type="text"
          className = "search-input"
          placeholder="Enter item name"
          value={query}
          onChange={(e) => setQuery(e.target.value)} // ✅ important
          required
        />
        <button type="submit" className='search-button '>Search</button>
      </form>

      {message && <p className='messsage'>{message}</p>}
      {result && (
        <div className='result-box'>
          <h4>Found:</h4>
          <p><strong>Name:</strong> {result.name}</p>
          <p><strong>Location:</strong> {result.location}</p>
        </div>
      )}
    </div>
  );
}