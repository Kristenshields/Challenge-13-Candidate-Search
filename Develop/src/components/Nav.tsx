import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
  const location = useLocation(); // Get the current location (URL)

  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className={`nav-item ${location.pathname === '/SavedCandidates' ? 'active' : ''}`}>
          <Link to="/SavedCandidates" className="nav-link">Potential Candidates</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;