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
      if (candidates.length === 0) {
        setError("No candidates available.");
        setIsLoading(false);
        return;
      }

      const candidateData = await searchGithubUser(login);
      setCandidate(candidateData);
    } catch (error) {
      setError("An error occurred while fetching the candidate.");
    } finally {
      setIsLoading(false);
    }
  };

  const saveCandidate = () => {
    if (!candidate) return;

    const savedCandidates == JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    savedCandidates.push(candidate);
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
    fetchCandidate();
  };
  
  useEffect(() => {
    fetchCandidate();
  }, []);

  return {candidate, isLoading, error, fetchCandidate, saveCandidate};
};

const CandidateSearch = () => {
  const { candidate, isLoading, error, fetchCandidate, saveCandidate } = useCandidateSearch();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

};


  


export default CandidateSearch;
