import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
    const [candidates, setCandidates] = useState<Candidate[]>([]);

    useEffect(() => {
      const candidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      setCandidates(candidates);

    }, []);

    const deleteCandidate = (login: string) => {
      const updatedCandidates = candidates.filter(
        (candidate) => candidate.login !== login
      );
      setCandidates(updatedCandidates);
      localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
    };

    return (
      <div className="container py-5">
      <h1 className="mb-4 text-center text-primary">Saved Candidates</h1>
      {candidates.length === 0 ? (
        <p className="text-center text-muted">No saved candidates yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Location</th>
                <th scope="col">Email</th>
                <th scope="col">Company</th>
                <th scope="col">Bio</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate) => (
                <tr key={candidate.login}>
                  <td>
                    <img
                      src={candidate.image}
                      alt={`${candidate.name}'s avatar`}
                      className="img-thumbnail"
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                  </td>
                  <td>{candidate.name}</td>
                  <td>{candidate.location}</td>
                  <td>
                    <a href={`mailto:${candidate.email}`} className="text-decoration-none">
                      {candidate.email}
                    </a>
                  </td>
                  <td>{candidate.company}</td>
                  <td>{candidate.bio}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteCandidate(candidate.login)}
                    >
                      <i className="bi bi-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    );
  };
   
   
  export default SavedCandidates;
  