import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCandidate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const candidates = await searchGithub();
      if (!Array.isArray(candidates) || candidates.length === 0) {
        setError("No candidates available or invalid API response.");
        setIsLoading(false);
        setIsLoading(false);
        return;
      }

      const login = candidates[0].login;
      try {
        const candidateData = await searchGithubUser(login);
        setCandidate(candidateData);
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          setError("Candidate not found.");
        } else {
          setError("An error occurred while fetching the candidate.");
        }
      }
    } catch (error: any) {
      setError("An error occurred while fetching the candidate.");
    } finally {
      setIsLoading(false);
    }
  };

  const saveCandidate = () => {
    if (!candidate) return;

    const savedCandidates: Candidate[] = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    savedCandidates.push(candidate);
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
    fetchCandidate();
  };
  
  useEffect(() => {
    fetchCandidate();
  }, []);

  return (
    <div
      className="vh-100 d-flex flex-column justify-content-center align-items-center text-white"
      style={{ background: "linear-gradient(to bottom, #001f3f, #001a36)" }}
    >
      {/* Error or Loading */}
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      {/* Header */}
      <header className="position-absolute top-0 start-0 m-3">
        <nav className="d-flex gap-3">
          <a href="/" className="text-white text-decoration-none">
            Home
          </a>
          <a href="/saved-candidates" className="text-white text-decoration-none">
            Saved Candidates
          </a>
        </nav>
      </header>

      {/* Candidate Card */}
      {candidate && (
        <div className="card text-center" style={{ width: "18rem", border: "none" }}>
          <img
            src={candidate.avatar_url}
            className="card-img-top bg-light p-3"
            alt={candidate.name}
          />
          <div className="card-body bg-dark text-white rounded-bottom">
            <h5 className="card-title">
              {candidate.name} <span className="fw-light">({candidate.login})</span>
            </h5>
            <p className="card-text">
              <strong>Location:</strong> {candidate.location || "N/A"}
            </p>
            <p className="card-text">
              <strong>Email:</strong>{" "}
              {candidate.email ? (
                <a href={`mailto:${candidate.email}`} className="text-info">
                  {candidate.email}
                </a>
              ) : (
                "N/A"
              )}
            </p>
            <p className="card-text">
              <strong>Company:</strong> {candidate.company || "N/A"}
            </p>
            <p className="card-text">
              <strong>Bio:</strong> {candidate.bio || "No bio available."}
            </p>
          </div>
        </div>
      )}

      {/* Buttons */}
      {candidate && (
        <div className="d-flex gap-3 mt-4">
          <button
            type="button"
            className="btn btn-danger rounded-circle p-2"
            style={{ width: "3rem", height: "3rem" }}
            onClick={fetchCandidate}
          >
            -
          </button>
          <button
            type="button"
            className="btn btn-success rounded-circle p-2"
            style={{ width: "3rem", height: "3rem" }}
            onClick={saveCandidate}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;
