import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import api from "../services/api";
import "../styles/EditBuild.css"; 

// List of Pokémon natures
const NATURES = [
    "Hardy","Lonely","Brave","Adamant","Naughty",
    "Bold","Docile","Relaxed","Impish","Lax",
    "Timid","Hasty","Serious","Jolly","Naive",
    "Modest","Mild","Quiet","Bashful","Rash",
    "Calm","Gentle","Sassy","Careful","Quirky"
  ];

const EditBuild = () => {
    const { token } = useAuth();
    const navigate = useNavigate();

    const [nickname, setNickname] = useState("");
    const [nature, setNature] = useState("");
    const [item, setItem] = useState("");
    const [ability, setAbility] = useState("");
    const [moves, setMoves] = useState([]);
    const [stats, setStats] = useState(null); // object used for backend submission
  const [displayStats, setDisplayStats] = useState([]); // array for rendering stat bars
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [species, setSpecies] = useState("");
    const [spriteUrl, setSpriteUrl] = useState(null);
    const [showImage, setShowImage] = useState(false);
    const [types, setTypes] = useState([]);

    //data fetched from pokeAPI
    const [availableAbilities, setAvailableAbilities] = useState([]);
    const [availableMoves, setAvailableMoves] = useState([]);
    const [heldItems, setHeldItems] = useState([]);
    const { id} = useParams();


    useEffect(() => {
      const fetchBuild = async () => {
        try {
          setLoading(true);
          setError("");
  
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const res = await api.get(`/builds/${id}`);
          const build = res.data.data;
  
          setNickname(build.nickname || "");
          setNature(build.nature || "");
          setItem(build.item || "");
          setAbility(build.ability || "");
          setMoves(build.moves || []);
          setStats(build.stats || {});
          setSpecies(build.species || "");
  
          // Fetch Pokémon data for abilities, moves, stats
          await fetchPokemon(build.species);
        } catch (e) {
          setError("Failed to load build. Please try again.");
        } finally {
          setLoading(false);
        }
      };
      
      fetchBuild();
    }, [id]);

    //fetch pokemon data from pokeAPI
    const fetchPokemon = async (species) => {
        if (!species) return;
        try {
            setLoading(true);
            setError("");
            const res = await fetch(`${import.meta.env.VITE_POKEMON_API_URL}/${species.toLowerCase()}`);
            if (!res.ok) throw new Error("Pokémon not found!");
            const data = await res.json();
            
            //set returned pokemon data
            setSpecies(data.species.name);
            setAvailableAbilities(data.abilities.map((a) => a.ability.name));
            setAvailableMoves(data.moves.map((m) => m.move.name).sort());
            setHeldItems(data.held_items.map((h) => h.item.name));
            setShowImage(true);
            setSpriteUrl(data.sprites.other.showdown.front_default)
            setTypes(data.types.map((t) => t.type.name));

            // Map stats to schema
            const statObj = {};
            data.stats.forEach((s) => {
        switch (s.stat.name) {
          case "hp":
            statObj.hp = s.base_stat;
            break;
          case "attack":
            statObj.attack = s.base_stat;
            break;
          case "defense":
            statObj.defense = s.base_stat;
            break;
          case "special-attack":
            statObj.specialAttack = s.base_stat;
            break;
          case "special-defense":
            statObj.specialDefense = s.base_stat;
            break;
          case "speed":
            statObj.speed = s.base_stat;
            break;
          default:
            break;
        }
      });

      setStats(statObj);
      setDisplayStats(data.stats);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

    // Toggle move selection (max 4)
    const handleMoveToggle = (moveName) => {
        setMoves((prevMoves) => {
          if (prevMoves.includes(moveName)) {
            return prevMoves.filter((m) => m !== moveName);
          }
          if (prevMoves.length >= 4) return prevMoves; // max 4 moves
          return [...prevMoves, moveName];
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
          setLoading(true);
          setError("");
          
          // Configure auth header
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Send build data to API
          await api.put(`/builds/${id}`, {
            nickname,
            species,
            nature,
            item,
            ability,
            moves,
            stats,
            pokemonTypes: types
            
          });
          
          // Redirect to builds page
          navigate('/builds');
        } catch (e) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
      }

return (
    <div className="auth-container">
  <div className="auth-card">
    <h2>Edit {nickname}</h2>
    {showImage && (
    <div className="pokedex-image-container">
    <img
      className="pokemon-image"
      src={spriteUrl}
      alt={'image of ' + species}
    />
  </div>
    )}
  <div className="pokemon-types">
          {types.map(type => (
            <span key={type} className={`type-badge ${type}`}>
              {type}
            </span>
          ))}
        </div>
    <form className="auth-form" onSubmit={handleSubmit}>
        <div className="error-message">{error}</div>
      <div className="form-group">
        <label htmlFor="species">Species</label>
        <input id="species" placeholder="e.g. pikachu" value={species} onChange={(e) => setSpecies(e.target.value)} />
      </div>

      <div className="form-group">
        <label htmlFor="nickname">Nickname</label>
        <input id="nickname" name="nickname" placeholder="Optional" value={nickname} onChange={(e) => setNickname(e.target.value)}/>
      </div>
      <div className="form-group">
        <label htmlFor="nature">Nature *</label>
        <select id="nature" name="nature" required value={nature} onChange={(e) => setNature(e.target.value)}>
            <option value="">Select nature</option>
        {NATURES.map((nature) => (
          <option key={nature} value={nature}>{nature}</option>
        ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="ability">Ability *</label>
        <select id="ability" name="ability" required value={ability} onChange={(e) => setAbility(e.target.value)}>
          <option value="">Select ability</option>
          {availableAbilities.map((ability) => (
            <option key={ability} value={ability}>{ability}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="item">Held Item</label>
        <select id="item" name="item" value={item} onChange={(e) => setItem(e.target.value)}>
          <option value="">None</option>
          {heldItems.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <p className="form-group-label">Moves (max 4) *</p>
        <div id="moves" name="moves" style={{ maxHeight: '150px', maxWidth: '300px', overflow: 'auto', border: '1px solid #ccc', padding: '0.5rem' }}>
          {availableMoves.map((move) => (
            <label key={move} htmlFor={`move-${move}`}>
              <input id={`move-${move}`} type="checkbox"
              checked={moves.includes(move)} 
              disabled={moves.length >= 4 && !moves.includes(move)}
              onChange={(e) => handleMoveToggle(move)} />
              {move}
            </label>
          ))}
        </div>
      </div>
      <div className="pokemon-stats">
                  {displayStats.map(stat => (
                    <div key={stat.name} className="stat-bar">
                      <span className={"stat-name"}>{stat.stat.name}:</span>
                      <div className="stat-bar-container">
                        <div 
                          className={`stat-fill stat-fill-${stat.stat.name}`} 
                          style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                        ></div>
                      </div>
                      <span className="stat-value">{stat.base_stat}</span>
                    </div>
                  ))}
                </div>
      <button type="submit" className="submit-button">Save Build</button>
    </form>

    <div className="auth-footer">
      <a href="/builds" onClick={() => navigate("/builds")}>← Back to Builds</a>
    </div>
  </div>
</div>

  );

}

export default EditBuild;
