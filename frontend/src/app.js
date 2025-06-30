import React from 'react';
import AddItem from './components/AddItem';
import SearchItem from './components/searchItem.js';

function App() {
  return (
    <div className="App">
      <h1>Subconscious Mind App</h1>
      <AddItem />
      <hr/>
      <SearchItem />
    </div>
  );
}

export default App;
