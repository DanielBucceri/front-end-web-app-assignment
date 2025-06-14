import { useState, useEffect } from 'react';
import { useAuth } from '../provider/authProvider';
import '../styles/dashboard.css';

const Dashboard = () => {
  const { token } = useAuth();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getRandomPokemonId = () => Math.floor(Math.random() * 898) + 1;
  
  const fetchRandomPokemon = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${import.meta.env.VITE_POKEMON_API_URL}/${getRandomPokemonId()}`);
      if (!response.ok) throw new Error('Failed to fetch Pokémon');
      
      const data = await response.json();
      setPokemon(data);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to load Pokémon');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  // Capitalize first letter of string
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Pokémon Team Builder Dashboard</h1>
        <p>Welcome to your personal Pokémon team manager!</p>
      </div>

      <div className="dashboard-grid">
        {/* Instructions Card */}
        <div className="dashboard-card instructions-card">
          <h2>Getting Started</h2>
          <ol>
            <li>Browse through random Pokémon to find inspiration</li>
            <li>Create a new team by clicking the "Teams" link above</li>
            <li>Add Pokémon to your teams and customize their builds</li>
            <li>View your teams and builds in their respective sections</li>
          </ol>
        </div>

        {/* Pokemon Card */}
        <div className="dashboard-card pokemon-card">
          <h2>Featured Pokémon</h2>
          
          {loading && <div className="pokemon-loading">Loading Pokémon...</div>}
          {error && <div className="pokemon-error">{error}</div>}
          
          {pokemon && !loading && (
            <div className="pokemon-display">
              <div className="pokemon-image-container">
                <img 
                  src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default} 
                  alt={pokemon.name} 
                  className="pokemon-image"
                />
              </div>
              
              <div className="pokemon-info">
                <h3>{capitalize(pokemon.name)} #{pokemon.id}</h3>
                
                {/* Pokemon Types */}
                <div className="pokemon-types">
                  {pokemon.types.map(type => (
                    <span key={type.type.name} className={`type-badge ${type.type.name}`}>
                      {capitalize(type.type.name)}
                    </span>
                  ))}
                </div>
                
                {/* Pokemon Stats */}
                <div className="pokemon-stats">
                  {pokemon.stats.map(stat => (
                    <div key={stat.stat.name} className="stat-bar">
                      <span className="stat-name">{stat.stat.name.replace('-', ' ')}:</span>
                      <div className="stat-bar-container">
                        <div 
                          className="stat-bar-fill" 
                          style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                        ></div>
                      </div>
                      <span className="stat-value">{stat.base_stat}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <button className="refresh-button" onClick={fetchRandomPokemon}>
                Get Another Pokémon
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;