import React, { useState } from 'react';
import { addItem } from '../api.js';

export default function AddItem() {
  const [name, setName] = useState(''); //State for item name.What are state?
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addItem({ name, location });
      setMessage("Item added!");
      setName('');
      setLocation('');
    } catch (err) {
      setMessage("Error adding item");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Item</h3>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
      <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" required />
      <button type="submit">Add</button>
      {message && <p>{message}</p>}
    </form>
  );
}
