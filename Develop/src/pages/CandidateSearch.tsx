import React, { useState } from 'react';
import { searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';


const CandidateSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Candidate[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const data = await searchGithubUser(searchTerm);
      setSearchResults([data]);
    } catch (error) {
      console.error('Error searching for candidates:', error);
    }
  };

  //   const token = 'VITE_GITHUB_TOKEN';
  //   const response = await fetch(`https://api.github.com/users/${searchTerm}`, {
  //     headers: {
  //       'Authorization': `Bearer ${token}`
  //     }
  //   });
    
  //   if (response.status === 401) {
  //     console.error('Unauthorized: Invalid token or missing credentials');
  //     return;
  //   }

  //   const data = await response.json();
  //   setSearchResults([data]);
  // };

  return (
    <div>  
        <input
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search for a candidate"     
        />
        <button onClick={handleSearch}>Search</button>
      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>{result.name}</li>   
        ))}
      </ul>
    </div>
  );
};

export default CandidateSearch;