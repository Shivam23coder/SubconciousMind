import React, {useState} from 'react';
import {addItem} from '../api.js';

export default function AddItem() {
    const [query,setQuery] = useState('');
    const [message, setMessage] = useState('');
    const [result, setResult] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await addItem({query});
            setResult(res.data);
        } catch(err) {
            setMessage("Error searching item");
        }
    };

return (
    <div>
        <h3>Semantic Search</h3>
        <form onSubmit={handleSearch}>
            <input
                type="text"
                placeholder='Search for an item'
                value={query}
                onchange={(e) => setQuery(e.target.value)}
                required
            />
            <button type='submit'>Search</button>
            </form>
            {message && <p>{message}</p>}
            {result && (
                <div style={{marginTop: '20px'}}>
                    <h4>Best Match:</h4>
                    <p><strong>Name:</strong> {result.name}</p>
                    <p><strong>Location:</strong> {result.location}</p>
                </div>
            )}
    </div>
    );
}