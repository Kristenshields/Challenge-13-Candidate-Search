import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const candidates = JSON.parse(localStorage.getItem('candidates') || '[]');
      setCandidates(candidates);
    } catch (err) {
      setError('Failed to load candidates from local storage');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRemove = (index: number) => {
    const updatedCandidates = candidates.filter((_, i) => i !== index);
    setCandidates(updatedCandidates);
    localStorage.setItem('candidates', JSON.stringify(updatedCandidates));
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  if (candidates.length === 0) {
    return <h1>No saved candidates</h1>;
  }

  return (
    <>
      <h1>Potential Candidates</h1>
      <ul>
        {candidates.map((candidate, index) => (
          <li key={index}>
            <img src={candidate.avatar} alt={candidate.name} />
            <p>{candidate.name}</p>
            <p>{candidate.location}</p>
            <p>{candidate.company}</p>
            <button onClick={() => handleRemove(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SavedCandidates;

  