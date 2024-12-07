import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Search Bar to the Left */}
        <form className="d-flex align-items-center me-auto">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search..."
            aria-label="Search"
          />
          <button type="submit" className="btn btn-outline-light">
            Search
          </button>
        </form>

        {/* Header Title */}
        <Link to="/" className="navbar-brand ms-3">
          Candidate Search
        </Link>

        {/* Responsive Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/SavedCandidates" className="nav-link">
                Saved Candidates
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
  