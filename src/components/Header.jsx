import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from "../provider/authProvider";
import "../styles/header.css";

const Header = () => {
  const { token } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className="app-header">
      <div className="logo">
        <img src="/pokemon-logo.svg" alt="Pokemon Logo" />
        <span>Pokémon Team Builder</span>
      </div>
      
      <button className="hamburger-menu" onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={isMenuOpen}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav className={`main-nav ${isMenuOpen ? 'mobile-menu-active' : ''}`}>
        <ul className={isMenuOpen ? 'menu-open' : ''}>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/teams">Teams</Link></li>
          <li><Link to="/builds">Builds</Link></li>
          {token && <li><Link to="/logout">Logout</Link></li>}
        </ul>
      </nav>
    </header>
  );
};

export default Header;