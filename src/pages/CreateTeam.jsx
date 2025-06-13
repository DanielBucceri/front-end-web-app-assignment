import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../provider/authProvider';
import api from '../services/api';
import '../styles/CreateTeam.css';
import '../styles/Builds.css';

const CreateTeam = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [availableBuilds, setAvailableBuilds] = useState([]);
  const [selectedBuilds, setSelectedBuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBuilds = async () => {
      try {
        setLoading(true);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const res = await api.get('/builds');
        setAvailableBuilds(res.data.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load your builds');
      } finally {
        setLoading(false);
      }
    };

    fetchBuilds();
  }, [token]);

  const toggleSelect = (buildId) => {
    setSelectedBuilds((prev) => {
      if (prev.includes(buildId)) {
        return prev.filter((id) => id !== buildId);
      }
      if (prev.length >= 6) return prev; // max 6
      return [...prev, buildId];
    });
  };

  const getSpriteUrl = (species) =>
    `https://play.pokemonshowdown.com/sprites/ani/${species.toLowerCase()}.gif`;

  // Capitalize helper
  const capitalize = (str) => {
    if (!str) return 'Unknown';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Team name required');
      return;
    }
    if (selectedBuilds.length === 0) {
      alert('Select at least one Pokémon build');
      return;
    }
    try {
      setLoading(true);
      await api.post('/teams', {
        name,
        pokemonBuilds: selectedBuilds,
      });
      navigate('/teams');
    } catch (err) {
      console.error(err);
      setError('Failed to create team');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="create-team-container">
      <h2>Create New Team</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="team-name">Team Name *</label>
          <input
            id="team-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <p>Select up to 6 Pokémon builds</p>
        {availableBuilds.length === 0 ? (
          <p>You have no builds available. Create one first.</p>
        ) : (
          <div className="pokedex-grid select-builds-grid">
            {availableBuilds.map((build) => {
              const selected = selectedBuilds.includes(build._id);
              return (
                <div
                  key={build._id}
                  className={`pokedex-card selectable ${selected ? 'selected' : ''}`}
                  onClick={() => toggleSelect(build._id)}
                >
                  <div className="pokedex-image-container">
                    <img
                      className="pokemon-image"
                      src={getSpriteUrl(build.species)}
                      alt={build.species}
                    />
                  </div>
                  <div className="pokedex-info">
                    <h3 className="pokemon-nickname">{build.nickname || 'Unnamed Build'}</h3>
                    <h4 className="pokemon-species">{capitalize(build.species)}</h4>

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
                </div>
              );
            })}
          </div>
        )}

        <button type="submit" className="submit-button">
          Save Team
        </button>
      </form>
    </div>
  );
};

export default CreateTeam;
