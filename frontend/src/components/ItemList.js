import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ItemList.css'; // ✅ Import external styles

function ItemList() {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: '', location: '' });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/apex/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setEditData({ name: item.name, location: item.location });
  };

  const handleUpdate = async (Id) => {
    try {
      await axios.put(`http://localhost:5000/apex/items/update/${Id}`, {
        name: editData.name,
        location: editData.location,
      });
      setEditingId(null);
      fetchItems();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/apex/items/delete/${id}`);
      fetchItems();
    } catch (error) {
      console.log('Error deleting item:', error);
    }
  };

  return (
    <div className="item-list-container">
      <h2 className="item-list-title">Stored Items</h2>

      {items.length === 0 ? (
        <p className="item-list-empty">No items found.</p>
      ) : (
        <div className="item-list-scroll">
          {items.map((item) => (
            <div key={item._id} className="item-card">
              {editingId === item._id ? (
                <>
                  <input
                    type="text"
                    className="input-field"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    className="input-field"
                    value={editData.location}
                    onChange={(e) =>
                      setEditData({ ...editData, location: e.target.value })
                    }
                  />
                  <div className="button-group">
                    <button
                      onClick={() => handleUpdate(item._id)}
                      className="btn btn-save"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="btn btn-cancel"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="item-title">{item.name}</h2>
                  <p className="item-location">Location: {item.location}</p>
                  <p className="item-id">ID: {item._id}</p>
                  <div className="button-group">
                    <button
                      onClick={() => handleEdit(item)}
                      className="btn btn-edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-delete"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ItemList;
