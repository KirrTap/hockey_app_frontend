import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  // const [text, setText] = useState('');
  // const [message, setMessage] = useState('');

  const [matches, setMatches] = useState([]);
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('https://hockey-app-backend.up.railway.app/api/text', { text });
  //     setText('');
  //     setMessage(`Úspešne uložené: ${response.data.content}`);
  //   } catch (error) {
  //     console.error(error);
  //     setMessage('Nastala chyba pri ukladaní.');
  //   }
 
  // };
  useEffect(() => {
    // Načítanie dát pri načítaní komponentu
    const fetchMatches = async () => {
      try {
        const response = await axios.get('https://hockey-app-backend.up.railway.app/api/kolo1'); // Zmena URL na backendový endpoint
        setMatches(response.data);
      } catch (error) {
        console.error('Chyba pri načítaní dát', error);
      }
    };

    fetchMatches();
  }, []);


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('https://hockey-app-backend.up.railway.app/api/text', { text });
  //     setText('');
  //     setMessage(`Úspešne uložené: ${response.data.content}`);
  //   } catch (error) {
  //     console.error(error);
  //     setMessage('Nastala chyba pri ukladaní.');
  //   }
 
  

  // return (
  //   <div className="App">
  //     <h1>Jednoduchý formulár</h1>
  //     <form onSubmit={handleSubmit}>
  //       <input
  //         type="text"
  //         value={text}
  //         onChange={(e) => setText(e.target.value)}
  //         placeholder="Zadajte text"
  //       />
  //       <button type="submit">Odoslať</button>
  //     </form>
  //     {message && <p>{message}</p>}
  //   </div>
  // );

  eturn (
    <div>
      <h1>Kolo 1: Zápasy</h1>
      {matches.length === 0 ? (
        <p>Načítavam zápasy...</p>
      ) : (
        <ul>
          {matches.map((match, index) => (
            <li key={index}>
              {match.hometeam} vs {match.awayteam}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;