import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    searchGithub().then((data) => {
      setCandidates(data);
    });
  }, []);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchGithubUser(searchTerm).then((data) => {
      setSearchResults(data);
    });
  };

  return (
    <div>
      <h1>Candidate Search</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for a candidate"
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {searchResults.map((candidate) => (
          <li key={candidate.id}>
            <img src={candidate.avatar} alt={candidate.name} />
            <h2>{candidate.name}</h2>
            <p>{candidate.location}</p>
            <a href={candidate.html_url}>Github Profile</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateSearch;