import { Link } from 'react-router-dom';
import { useAuth } from "../provider/authProvider";
import "../styles/header.css";

const Header = () => {
  const { token } = useAuth();
  
  return (
    <header className="app-header">
      <div className="logo">
        <img src="/pokemon-logo.svg" alt="Pokemon Logo" />
        <span>Pokémon Team Builder</span>
      </div>
      
      <nav className="main-nav">
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/teams">Teams</Link></li>
          <li><Link to="/builds">Builds</Link></li>
          {token && <li><Link to="/logout">Logout</Link></li>}
        </ul>
      </nav>
    </header>
  );
};

export default Header;