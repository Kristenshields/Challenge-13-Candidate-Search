import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    // Fetch saved candidates from an API or local storage
    const fetchCandidates = async () => {
      // Replace with your data fetching logic
      const response = await fetch('/api/saved-candidates');
      const data: Candidate[] = await response.json();
      setCandidates(data);
    };

    fetchCandidates();
  }, []);

  return (
    <div>
      <h1>Saved Candidates</h1>
      <ul>
        {candidates.map((candidate, index) => (
          <li key={index}>
            {candidate.name} - {candidate.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedCandidates;