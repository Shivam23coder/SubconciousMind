import React, { useState } from 'react';
import { addItem } from '../api.js';
import './AddItem.css'; // Optional: style the form
export default function AddItem() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !location.trim()) {
      setMessage('Please fill in both fields');
      return;
    }

    setLoading(true);
    setMessage('');
    try {
      await addItem({ name, location });
      setMessage('Item added successfully!');
      setName('');
      setLocation('');
    } catch (err) {
      setMessage('Error adding item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-item-form">
      <h3>Add Item</h3>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
        className="input-field"
      />
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
        required
        className="input-field"
      />
      <button type="submit" disabled={loading} className="btn-submit">
        {loading ? 'Adding...' : 'Add'}
      </button>
      {message && <p className="message">{message}</p>}
    </form>
  );
}
