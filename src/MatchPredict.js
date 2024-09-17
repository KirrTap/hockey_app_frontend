import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Logos from './Logos';

function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scores, setScores] = useState({});

  useEffect(() => {
    const loadMatches = async () => {
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

    loadMatches(); // Zavolanie funkcie pri načítaní komponentu
  }, []);

  // Funkcia na aktualizáciu skóre pre daný zápas
  const handleScoreChange = (matchId, team, value) => {
    setScores((prevScores) => ({
      ...prevScores,
      [matchId]: {
        ...prevScores[matchId],
        [team]: value,
      },
    }));
  };

  // Funkcia na odoslanie výsledkov na server
  const handleSubmit = async (matchId) => {
    const matchScores = scores[matchId];
    if (matchScores) {
      try {
        // Príklad POST požiadavky na odoslanie údajov
        const response = await axios.post('https://hockey-app-backend.up.railway.app/save-match-result', {
          matchId: matchId,
          homeScore: matchScores.home || 0, // domáci tím skóre
          awayScore: matchScores.away || 0, // hosťujúci tím skóre
        });

        if (response.status === 200) {
          console.log('Výsledok bol úspešne uložený');
        } else {
          console.error('Chyba pri ukladaní výsledku');
        }
      } catch (error) {
        console.error('Chyba pri komunikácii so serverom:', error);
      }
    }
  };

  if (loading) return <div>Načítavam zápasy...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <ul>
        {matches.length > 0 ? (
          matches.map((match) => (
            <div key={match.id} className="matchBox">
              <div>
                <div className="matchDate">
                  {new Date(match.datum).toLocaleString('sk-SK', {
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit',
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </div>
                <div>
                  <img
                    src={Logos[match.hometeam]}
                    alt={`${match.hometeam} logo`}
                    className="matchLogo"
                  />
                  <input
                    type="text"
                    className="scoreInput"
                    value={scores[match.id]?.home || ''}
                    onChange={(e) =>
                      handleScoreChange(match.id, 'home', e.target.value)
                    }
                  />
                  <span className="versus">:</span>
                  <input
                    type="text"
                    className="scoreInput"
                    value={scores[match.id]?.away || ''}
                    onChange={(e) =>
                      handleScoreChange(match.id, 'away', e.target.value)
                    }
                  />
                  <img
                    src={Logos[match.awayteam]}
                    alt={`${match.awayteam} logo`}
                    className="matchLogo"
                  />
                </div>
                <button
                  className="submitButton"
                  onClick={() => handleSubmit(match.id)}
                >
                  Odoslať výsledok
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Žiadne zápasy v tomto období</p>
        )}
      </ul>
    </div>
  );
}

export default App;
