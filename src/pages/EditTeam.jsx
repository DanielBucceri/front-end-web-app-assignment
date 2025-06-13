import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../provider/authProvider';
import api from '../services/api';
import '../styles/EditTeam.css';

const EditTeam = () => {
  const { id } = useParams(); // team id
  const { token } = useAuth();
  const navigate = useNavigate();

  const [team, setTeam] = useState(null);
  const [availableBuilds, setAvailableBuilds] = useState([]);
  const [selectedBuild, setSelectedBuild] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper to fetch latest team and available builds
  const fetchData = async () => {
    try {
      setLoading(true);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Fetch team details
      const teamRes = await api.get(`/teams/${id}`);
      setTeam(teamRes.data.data);

      // Fetch builds not already in team
      const availRes = await api.get(`/teams/${id}/available-builds`);
      setAvailableBuilds(availRes.data.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load team data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleAdd = async () => {
    if (!selectedBuild) return;
    try {
      setLoading(true);
      await api.post(`/teams/${id}/pokemon/${selectedBuild}`);
      setSelectedBuild('');
      await fetchData();
    } catch (err) {
      console.error(err);
      alert('Failed to add Pokémon to team');
    } finally {
      setLoading(false);
    }
  };

  // Remove build from team
  const handleRemove = async (buildId) => {
    if (window.confirm('Remove this Pokémon from the team?')) {
      try {
        setLoading(true);
        await api.delete(`/teams/${id}/pokemon/${buildId}`);
        await fetchData();
      } catch (err) {
        console.error(err);
        alert('Failed to remove Pokémon from team');
      } finally {
        setLoading(false);
      }
    }
  };

  const getSpriteUrl = (species) =>
    `https://play.pokemonshowdown.com/sprites/ani/${species.toLowerCase()}.gif`;

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading team...</p>
      </div>
    );
  }

  if (error) return <p className="error">{error}</p>;
  if (!team) return null;

  return (
    <div className="edit-team-container">
      <h2>Edit Team – {team.name}</h2>

      <div className="team-pokemon">
        {team.pokemonBuilds.map((build) => (
          <div key={build._id} className="team-slot">
            <img
              className="team-pokemon-image"
              src={getSpriteUrl(build.species)}
              alt={build.species}
            />
            <button
              className="remove-button"
              onClick={() => handleRemove(build._id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {team.pokemonBuilds.length < 6 && (
        <div className="add-section">
          <select
            value={selectedBuild}
            onChange={(e) => setSelectedBuild(e.target.value)}
          >
            <option value="">Select build to add</option>
            {availableBuilds.map((build) => (
              <option key={build._id} value={build._id}>
                {build.nickname || build.species}
              </option>
            ))}
          </select>
          <button className="add-button" onClick={handleAdd} disabled={!selectedBuild}>
            Add
          </button>
        </div>
      )}

      <button className="back-button" onClick={() => navigate('/teams')}>
        ← Back to Teams
      </button>
    </div>
  );
};

export default EditTeam;
