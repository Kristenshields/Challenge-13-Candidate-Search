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
      <h1 className="mb-4 text-center">Saved Candidates</h1>
      {candidates.length === 0 ? (
        <p className="text-center">No saved candidates yet.</p>
      ) : (
        <ul className="list-group">
          {candidates.map((candidate) => (
            <li
              key={candidate.login}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{candidate.name}</strong> ({candidate.login})
              </div>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => deleteCandidate(candidate.login)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

   
  export default SavedCandidates;
  