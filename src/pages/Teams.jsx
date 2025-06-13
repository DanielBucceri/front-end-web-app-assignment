import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../provider/authProvider';
import api from '../services/api';
import '../styles/Teams.css';

const Teams = () => {
  const { token } = useAuth();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        setError(null);

        // Configure auth header
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Fetch teams from API
        const response = await api.get('/teams');
        setTeams(response.data.data);
      } catch (err) {
        console.error('Error fetching teams:', err);
        setError('Failed to load your Pokémon teams');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [token]);

  // Delete a team
  const handleDeleteTeam = async (teamId) => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      try {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await api.delete(`/teams/${teamId}`);
        setTeams(teams.filter((team) => team._id !== teamId));
      } catch (err) {
        console.error('Error deleting team:', err);
        alert('Failed to delete team. Please try again.');
      }
    }
  };

  // Helper to get Pokémon sprite URL
  const getSpriteUrl = (species) =>
    `https://play.pokemonshowdown.com/sprites/ani/${species.toLowerCase()}.gif`;

  return (
    <div className="teams-container">
      <div className="teams-header">
        <div>
          <h1>My Pokémon Teams</h1>
          <p>View and manage your custom Pokémon teams</p>
        </div>
        <Link to="/teams/create" className="create-team-btn">Create New Team</Link>
      </div>

      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your teams...</p>
        </div>
      )}

      {!loading && error && (
        <div className="empty-teams error-state">
          <h3>{error}</h3>
          <p>There was a problem loading your teams. Please try again later.</p>
        </div>
      )}

      {!loading && !error && teams.length === 0 && (
        <div className="empty-teams">
          <h3>You don't have any Pokémon teams yet!</h3>
          <p>Create your first team to get started!</p>
          <Link to="/teams/create" className="create-team-btn">Create New Team</Link>
        </div>
      )}

      {!loading && !error && teams.length > 0 && (
        <div className="team-grid">
          {teams.map((team) => (
            <div key={team._id} className="team-card">
              <h3 className="team-name">{team.name}</h3>
              <div className="team-pokemon">
                {[...Array(6)].map((_, idx) => {
                  const build = team.pokemonBuilds[idx];
                  return (
                    <div key={idx} className="team-slot">
                      {build ? (
                        <img
                          className="team-pokemon-image"
                          src={getSpriteUrl(build.species)}
                          alt={build.species}
                        />
                      ) : (
                        <div className="empty-slot">+</div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="team-buttons">
                <Link to={`/teams/${team._id}/edit`} className="edit-button">
                  Edit
                </Link>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteTeam(team._id)}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Teams;
