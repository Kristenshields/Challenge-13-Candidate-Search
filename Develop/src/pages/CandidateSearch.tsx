import React, { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    searchGithub().then((data) => {
      setCandidates(data);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
      searchGithubUser(searchTerm).then((data) => {
      setSearchResults(Array.isArray(data) ? data : [data]);
      }).catch(error => {
        console.error('Error fetching user:', error);
      });
    };

  return (
    <div>  
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search for a candidate"     
        />
        <button onClick={handleSearch}>Search</button>
      <ul>
        {Array.isArray(searchResults) && searchResults.map((result, index) => (
          <li key={index}>{result.name}</li>   
        ))}
      </ul>
    </div>
  );
};

export default CandidateSearch;