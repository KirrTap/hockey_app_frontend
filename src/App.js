import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  // const [text, setText] = useState('');
  // const [message, setMessage] = useState('');

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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


  // useEffect(() => {
  //   // Načítanie dát pri načítaní komponentu
  //   const fetchMatches = async () => {
  //     try {
  //       const response = await axios.get('https://hockey-app-backend.up.railway.app/api/kolo1'); // Zmena URL na backendový endpoint
  //       setMatches(response.data);
  //     } catch (error) {
  //       console.error('Chyba pri načítaní dát', error);
  //     }
  //   };

  //   fetchMatches();
  // }, []);
 
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

  useEffect(() => {
    // Funkcia na načítanie zápasov z backendu
    const fetchMatches = async () => {
      try {
        const response = await axios.get('https://hockey-app-backend.up.railway.app/matches'); // API URL
        setMatches(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Chyba pri načítaní zápasov:', err);
        setError('Nepodarilo sa načítať zápasy');
        setLoading(false);
      }
    };

    fetchMatches(); // Zavolanie funkcie pri načítaní komponentu
  }, []);

  if (loading) return <div>Načítavam zápasy...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="App">
      <h1>Zápasy medzi dnešným dátumom a o 30 dní</h1>
      <ul>
        {matches.length > 0 ? (
          matches.map((match) => (
            <li key={match.id}>
              {match.datum} : {match.hometeam} vs {match.awayteam}
            </li>
          ))
        ) : (
          <p>Žiadne zápasy v tomto období</p>
        )}
      </ul>
    </div>
  );
}

export default App;