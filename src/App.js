import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://hockey-app-backend.up.railway.app/api/text', { text });
      setText(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Jednoduchý formulár</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Zadajte text"
          value={text}
          onChange={(e) => setText(e.target.value)}   
        />
        <button type="submit">Odoslať</button>
      </form>
    </div>
  );
}

export default App;