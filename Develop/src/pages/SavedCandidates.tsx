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
      <div>
        <h1>Saved Candidates</h1>
        <ul>
          {candidates.map((candidate) => (
            <li key={candidate.login}>
              {candidate.name} ({candidate.login})
              <button onClick={() => deleteCandidate(candidate.login)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

   
  export default SavedCandidates;
  