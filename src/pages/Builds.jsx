import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../provider/authProvider';
import api from '../services/api';
import '../styles/Builds.css';

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
  
  // Handle build deletion
  const handleDeleteBuild = async (buildId) => {
    if (window.confirm('Are you sure you want to delete this build?')) {
      try {
        
        // Configure auth header
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Send delete request to API
        await api.delete(`/builds/${buildId}`);
        
        // Remove the deleted build from state
        setBuilds(builds.filter(build => build._id !== buildId));
      } catch (err) {
        console.error('Error deleting build:', err);
        alert('Failed to delete build. Please try again.');
      }
    }
  };

  return (
    <div className="builds-container">
      <div className="builds-header">
        <div>
          <h1>My Pokémon Builds</h1>
          <p>View and manage your custom Pokémon builds</p>
        </div>
        <Link to="/builds/create" className="create-build-btn">Create New Build</Link>
      </div>
      
      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your builds...</p>
        </div>
      )}
      
      {!loading && error && (
        <div className="empty-builds error-state">
          <h3>{error}</h3>
          <p>There was a problem loading your builds. Please try again later.</p>
        </div>
      )}
      
      {!loading && !error && builds.length === 0 && (
        <div className="empty-builds">
          <h3>You don't have any Pokémon builds yet!</h3>
          <p>Create your first custom build to get started!</p>
          <Link to="/builds/create" className="create-build-btn">Create New Build</Link>
        </div>
      )}
      
      {!loading && !error && builds.length > 0 && (
        <div className="pokedex-grid">
          {/* Map through builds and display each as a card */}
          {builds.map(build => (
            <div key={build._id} className="pokedex-card">         
              <div className="pokedex-image-container">
                <img
                  className="pokemon-image"
                  src={`https://play.pokemonshowdown.com/sprites/ani/${build.species.toLowerCase()}.gif`}
                  alt={'image of ' + build.species}/>
              </div>
              
              <div className="pokedex-info">
                <h3 className="pokemon-nickname">{build.nickname || 'Unnamed Build'}</h3>
                <h4 className="pokemon-species">{capitalize(build.species)}</h4>
                <div className="card-types-container">
                  {build.pokemonTypes && build.pokemonTypes.map(type => (
                    <span key={type} className={`type-badge ${type}`}>
                      {capitalize(type)}
                    </span>
                  ))}
                </div>
                
                <div className="pokedex-details">
                  <div className="pokedex-types"> 
                    <span className="pokemon-nature">Nature: {capitalize(build.nature || '')}</span>
                    <span className="pokemon-ability">Ability: {capitalize(build.ability || '')}</span>
                  </div>
                  
                  <div className="pokedex-stats">
                  <div className="stat-bar">
                    <span className="stat-label">HP</span>
                    <div className="stat-bar-container">
                      <div className="stat-fill stat-fill-hp" style={{width: `${(build.stats.hp / 255) * 100}%`}}></div>
                      <span className="stat-value">{build.stats.hp}</span>
                    </div>
                  </div>
                  <div className="stat-bar">
                    <span className="stat-label">ATK</span>
                    <div className="stat-bar-container">
                      <div className="stat-fill stat-fill-attack" style={{width: `${(build.stats.attack / 255) * 100}%`}}></div>
                      <span className="stat-value">{build.stats.attack}</span>
                    </div>
                  </div>
                  <div className="stat-bar">
                    <span className="stat-label">DEF</span>
                    <div className="stat-bar-container">
                      <div className="stat-fill stat-fill-defense" style={{width: `${(build.stats.defense / 255) * 100}%`}}></div>
                      <span className="stat-value">{build.stats.defense}</span>
                    </div>
                  </div>
                    <div className="stat-bar">
                      <span className="stat-label">SP-A</span>
                      <div className="stat-bar-container">
                        <div className="stat-fill stat-fill-special-attack" style={{width: `${(build.stats.specialAttack / 255) * 100}%`}}></div>
                        <span className="stat-value">{build.stats.specialAttack}</span>
                      </div>
                    </div>
                    <div className="stat-bar">
                      <span className="stat-label">SP-D</span>
                      <div className="stat-bar-container">
                        <div className="stat-fill stat-fill-special-defense" style={{width: `${(build.stats.specialDefense / 255) * 100}%`}}></div>
                        <span className="stat-value">{build.stats.specialDefense}</span>
                      </div>
                    </div>
                    <div className="stat-bar">
                      <span className="stat-label">SPEED</span>
                      <div className="stat-bar-container">
                        <div className="stat-fill stat-fill-speed" style={{width: `${(build.stats.speed / 255) * 100}%`}}></div>
                        <span className="stat-value">{build.stats.speed}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pokedex-moves">
                  <h4>Moves</h4>
                  {build.moves && build.moves.length > 0 && (
                    <div className="move-list">
                      {build.moves.map((move, index) => (
                        <span key={index} className="move-tag">
                          {move ? capitalize(move) : 'Unknown'}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="pokedex-buttons">
                <Link to={`/builds/${build._id}/edit`} className="edit-button">Edit</Link>
                <button 
                  className="delete-button" 
                  onClick={() => handleDeleteBuild(build._id)} 
                >×</button>
              </div>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Builds;
