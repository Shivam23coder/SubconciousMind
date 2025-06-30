import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Home from './components/Home.js';
import AddPage from './components/AddItem.js';
import SearchPage from './components/searchItem.js';
import ListPage from './components/ItemList.js';
import './App.css'; 

function App() {
  return (
    <Router>
      <div className="App">
         <div className="header-container">
          <h1>Subconscious Mind App</h1>
          <Navbar />
        </div>
        <hr />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/list" element={<ListPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
