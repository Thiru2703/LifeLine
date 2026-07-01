import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import "./NavBar.css";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        ❤️ LifeLine
      </div>

      <div className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/donors">Donors</Link>
        </li>

        <li>
          <Link to="/requests">Requests</Link>
        </li>

        <li>
          <Link to="/donate">Donate Blood</Link>
        </li>

        <li>
          <Link to="/request-blood">Request Blood</Link>
        </li>

        <li>
          <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
        </li>
      </ul>

      <div className={`auth-buttons ${menuOpen ? 'active' : ''}`}>
        {isAuthenticated ? (
          <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="logout-btn">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="login-btn" onClick={() => setMenuOpen(false)}>
              Login
            </Link>

            <Link to="/register" className="register-btn" onClick={() => setMenuOpen(false)}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;