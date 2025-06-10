import { useState, useEffect } from 'react';
import { useAuth } from '../provider/authProvider';
import api from '../services/api';

const Builds = () => {
  const { token } = useAuth();
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBuilds = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Configure auth header
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Get builds from API
        const response = await api.get('/builds');
        setBuilds(response.data.data);
      } catch (err) {
        console.error('Error fetching builds:', err);
        setError('Failed to load your Pokémon builds');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBuilds();
  }, [token]);
  
  // Capitalize first letter of string with null check
  const capitalize = (str) => {
    if (!str) return 'Unknown';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="builds-container">
      <div className="builds-header">
        <h1>My Pokémon Builds</h1>
        <p>View and manage your custom Pokémon builds</p>
      </div>
      
      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your builds...</p>
        </div>
      )}
      
      {!loading && !error && builds.length > 0 && (
        <div className="pokedex-grid">
          {/* Map through builds and display each as a card */}
          {builds.map(build => (
            <div key={build._id} className="pokedex-card">         
              <div className="pokedex-image-container">
                {/* Pokemon image?? */}
                <div className="pokedex-image-placeholder">
                  <div className="pokemon-silhouette"></div>
                </div>
              </div>
              
              <div className="pokedex-info">
                <h3 className="pokemon-nickname">{build.nickname || 'Unnamed Build'}</h3>
                <h4 className="pokemon-species">{capitalize(build.species)}</h4>
                
                <div className="pokedex-details">
                  <div className="pokedex-types">
                    <span className="pokemon-nature">{capitalize(build.nature || '')}</span>
                    <span className="pokemon-ability">{capitalize(build.ability || '')}</span>
                  </div>
                  
                  <div className="pokedex-stats">
                    <div className="stat-bar">
                      <span className="stat-label">HP</span>
                      <div className="stat-bar-container">
                        <div className="stat-fill" style={{width: `${(build.stats.hp / 255) * 100}%`}}></div>  
                      </div>
                    </div>
                    <div className="stat-bar">
                      <span className="stat-label">ATK</span>
                      <div className="stat-bar-container">
                        <div className="stat-fill" style={{width: `${(build.stats.attack / 255) * 100}%`}}></div>
                      </div>
                    </div>
                    <div className="stat-bar">
                      <span className="stat-label">DEF</span>
                      <div className="stat-bar-container">
                        <div className="stat-fill" style={{width: `${(build.stats.defense / 255) * 100}%`}}></div>
                      </div>
                    </div>
                    <div className="stat-bar">
                      <span className="stat-label">SP-A</span>
                      <div className="stat-bar-container">
                        <div className="stat-fill" style={{width: `${(build.stats.specialAttack / 255) * 100}%`}}></div>
                      </div>
                    </div>
                    <div className="stat-bar">
                      <span className="stat-label">SP-D</span>
                      <div className="stat-bar-container">
                        <div className="stat-fill" style={{width: `${(build.stats.specialDefense / 255) * 100}%`}}></div>
                      </div>
                    </div>
                    <div className="stat-bar">
                      <span className="stat-label">SPEED</span>
                      <div className="stat-bar-container">
                        <div className="stat-fill" style={{width: `${(build.stats.speed / 255) * 100}%`}}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pokedex-moves">
                  {/* Map through moves and display */}
                  {build.moves && build.moves.length > 0 && (
                    <div className="move-list">
                      {build.moves.map((move, index) => (
                        <span key={index} className="move-tag">
                          {move ? capitalize(move) : 'Unknown Move'}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="pokedex-buttons">
                <button className="edit-button">Edit</button>
                <button className="delete-button">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Builds;
